import classes from "./CartModal.module.css";
import { useDispatch, useSelector, useStore } from "react-redux";
import CartReadyProduct from "./CartRedyProduct";
import CartCustomizedProduct from "./CartCustomizedProduct";
import { useRouter } from "next/router";
export default function CartModal(props) {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCustamizedItems = useSelector(
    (state) => state.cart.customizedItems
  );
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const router = useRouter();

  return (
    <>
      <div className={classes.modalMainBlind}>
        <div
          className={classes.outArea}
          onClick={() => props.hideModal()}
        ></div>
        <div className={classes.contentContainer}>
          <div className={classes.contentContainerInner}>
            <div className={classes.title}>
              <h2>Twój koszyk:</h2>
            </div>
            <div className={classes.items}>
              <h3 className={classes.category}> Produkty gotowe od ręki: </h3>
              {cartItems.map((el) => {
                return (
                  <CartReadyProduct
                    name={el.name}
                    price={el.price}
                    amount={el.amount}
                    id={el.id}
                    imgSrc={el.imgSrc}
                  />
                );
              })}
              <h3 className={classes.category}> Produkty na zamówienie: </h3>
              {
              
       
          cartCustamizedItems&&   cartCustamizedItems.map((el) => {
                return (
                  <CartCustomizedProduct
                    name={el.name}
                    price={el.price}
                    amount={el.amount}
                    id={el.id}
                    imgSrc={el.imgSrc}
                    lenght={el.lenght}
                    width={el.width}
                    material={el.material}
                  />
                );
              })


              }
            </div>

            <div className={classes.control}>
              <div className={classes.sumary}>
                <h4>{`Koszt zakupów : ${cartTotalAmount} zł`}</h4>
              </div>

         {   (cartItems.lenght >0 || cartCustamizedItems.lenght>0 ) &&       <button
                className={classes.toCassButton}
                onClick={() => {
                  router.push({
                    pathname: "/order",
                  });
                }}
              >
                Do kasy
              </button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
