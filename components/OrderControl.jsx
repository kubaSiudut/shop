import { useState, useEffect } from "react";
import classes from "./OrderControl.module.css";
import ContactForm from "./ContactForm";
import { useDispatch, useSelector, useStore } from "react-redux";
import CartReadyProduct from "./CartRedyProduct";
import CartCustomizedProduct from "./CartCustomizedProduct";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { clear } from "../store/slices/cartSlice";

export default function OrderControl() {
  const [step, setStep] = useState(1);
  const [contactData, setContactData] = useState({});
  const [PaymentOption, setPaymentOption] = useState("Bank");
  const [DeliveryOption, setDeliveryOption] = useState("InPost");
  const [userData, setUserData] = useState({
    body: {
      firstName: "",
      familyName: "",
      street: "",
      city: "",
      phone: "",
      postalCode: "",
      email: "",
    },
  });

  const cartItems = useSelector((state) => state.cart.items);
  const cartCustamizedItems = useSelector(
    (state) => state.cart.customizedItems
  );
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const dataFetching = async () => {
      const response = await fetch("/api/userProtectedData");
      const data = await response.json();
      console.log("to dane użtkownika zaciągnięte z bazy");
      console.log(data);
      setUserData(data);
    };

    if (Cookies.get('IsLoggedIn')) {
      dataFetching();
    }
  }, []);

  const createOrderHandler = async () => {
    const order = {
      contact: contactData,
      payment: PaymentOption,
      delivery: DeliveryOption,
      price: cartTotalAmount,
      orderDescription: createList(),
    };
    console.log(order);
    const response = await fetch("http://localhost:3000/api/orders", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(order), // body data type must match "Content-Type" header
    });
    dispatch(clear());
    setContactData({});
    setPaymentOption("Bank");
    setDeliveryOption("InPost");

    router.push({
      pathname: "/orderSucces",
    });

    console.log(response);
  };
  const createList = () => {
    console.log(cartCustamizedItems);
    let items = "";
    if (cartItems.lenght !== 0) {
      items = "Zamówiono następujące pradukty gotowe:\n";
      cartItems.forEach((element) => {
        items += element.name + " " + element.amount + " szt.\n";
      });
    }

    if (cartCustamizedItems.lenght !== 0) {
      if (cartItems.lenght !== 0) {
        items += "Oraz następujące produkty parametryzowalne: \n";
        cartCustamizedItems.forEach((el) => {
          items +=
            el.name +
            " " +
            el.amount +
            " szt." +
            "o wymiarach " +
            el.lenght +
            " x " +
            el.width +
            ", materiał " +
            el.material +
            "\n";
        });
      } else {
        items += "Zamówiono  następujące produkty parametryzowalne: \n";
        cartCustamizedItems.forEach((el) => {
          items +=
            el.name +
            " " +
            el.amount +
            " szt." +
            "o wymiarach " +
            el.lenght +
            " x " +
            el.width +
            ", materiał " +
            el.material +
            "\n";
        });
      }
    }

    console.log(items);
    return items;
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <div className={classes.statusBar}>
            <div className={classes.stepDone}>
              <p>Podsumowanie Zmówienia</p>
            </div>
            <div className={classes.stepNotDone}>
              <p>Dane do wysyłki</p>
            </div>

            <div className={classes.stepNotDone}>
              <p>Forma płatności i dostawy</p>
            </div>
          </div>
          <div className={classes.productsContainer}>
          {cartItems.lenght >0 &&  <h3 className={classes.category}> Produkty gotowe od ręki: </h3>}
            {cartItems.map((el) => {
              return (
                <CartReadyProduct
                  name={el.name}
                  price={el.price}
                  amount={el.amount}
                  id={el.id}
                  key={el.id}
                  imgSrc={el.imgSrc}
                  className={classes.productsItem}
                />
              );
            })}
            {cartCustamizedItems.lenght>0 && <h3 className={classes.category}> Produkty na zamówienie: </h3>}
            {cartCustamizedItems &&
              cartCustamizedItems.map((el) => {
                return (
                  <CartCustomizedProduct
                    name={el.name}
                    price={el.price}
                    amount={el.amount}
                    id={el.id}
                    key={el.id}
                    imgSrc={el.imgSrc}
                    lenght={el.lenght}
                    width={el.width}
                    material={el.material}
                    className={classes.productsItem}
                  />
                );
              })}

          </div>
          <div className={classes.sumaryContainer}>
          <h4>{`Koszt zakupów : ${cartTotalAmount} zł`}</h4>
          </div>
          <div className={classes.buttonBar}>
            
{         <button
              className={classes.buttonFwd}
              onClick={() => {
                setStep(2);
              }}
            >
              Dalej
            </button>}
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <div className={classes.statusBar}>
            <div className={classes.stepDone}>
              <p>Podsumowanie Zmówienia</p>
            </div>
            <div className={classes.stepDone}>
              <p>Dane do wysyłki</p>
            </div>

            <div className={classes.stepNotDone}>
              <p>Forma płatności i dostawy</p>
            </div>
          </div>
          <ContactForm
            contactdata={contactData}
            back={() => {
              setStep(1);
            }}
            forward={() => {
              setStep(3);
            }}
            dataTransfer={(data) => {
              setContactData(data);
            }}
            loggedUserData={userData}
          />
        </div>
      )}
      {step === 3 && (
        <div>
          <div className={classes.statusBar}>
            <div className={classes.stepDone}>
              <p>Podsumowanie Zmówienia</p>
            </div>
            <div className={classes.stepDone}>
              <p>Dane do wysyłki</p>
            </div>

            <div className={classes.stepDone}>
              <p>Forma płatności i dostawy</p>
            </div>
          </div>

          <div className={classes.mainContainer}>
            <div
              onChange={(e) => {
                setPaymentOption(e.target.value);
              }}
              className={classes.radioButtonsField}
            >
              <h5>Forma płatności</h5>

              <input type="radio" value="atDelivery" name="payment" />
              <label className={classes.label}> Przy odbiorze</label>
              <input type="radio" value="Bank" name="payment" defaultChecked />
              <label className={classes.label}> Przelew</label>
            </div>

            <div
              onChange={(e) => {
                setDeliveryOption(e.target.value);
              }}
              className={classes.radioButtonsField}
            >
              <h5>Forma dostawy</h5>

              <input type="radio" value="atShop" name="delivery" />
              <label className={classes.label}>W sklepie</label>
              <input
                type="radio"
                value="InPost"
                name="delivery"
                defaultChecked
              />
              <label className={classes.label}> InPost</label>
              <input type="radio" value="PolishPost" name="delivery" />
              <label className={classes.label}> PocztaPolska</label>
            </div>

            <div className={classes.buttonBar}>
              <button
                className={classes.buttonRwd}
                onClick={() => {
                  setStep(2);
                }}
              >
                Cofnij
              </button>

              <button
                className={classes.buttonFwd}
                onClick={createOrderHandler}
              >
                Zamawiam!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
