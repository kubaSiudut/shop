import Head from "next/head";
import classes from "./user_panel.module.css";
import Navbar from "../components/Navbar.jsx";
import Container from "react-bootstrap/Container";
import OrderListItem from "../components/OrderListItem";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function UserPanel() {
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [userOrders,setUserOrders] = useState([])
  const [isAdmin, setIsAdmin] = useState(false);
  const [ordersFetched, setOrdersFetch] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const dataFetching = async () => {
      const response = await fetch("/api/userProtectedData");
      const data = await response.json();
      console.log("to dane użtkownika zaciągnięte z bazy");
      console.log(data);
      setName(data.body.firstName);
      setFamilyName(data.body.familyName);
      if (data.body.id === 1) setIsAdmin(true);
    };

    const userOrdersFetching = async () => {
      const response = await fetch("/api/userOrdersList");
      const data = await response.json();
      console.log("to dane użtkownika zaciągnięte z bazy");
      console.log(data);
      setUserOrders(data.body)
      setOrdersFetch(true)
      

         }
         dataFetching()
         if(!isAdmin)
         userOrdersFetching()
    dataFetching();
  }, []);
  return (
    <>
      <main className={classes.bg_custom}>
        <Head>
          <title>Stolarnia kontakt</title>
          <link rel="icon" href="/img/szafa.jpg" />
        </Head>
        <Container>
          <Header />
          <div className="position-absolute top-0 end-0"></div>

          <Navbar
            tabs={[
              { name: "O nas", path: "/" },
              { name: "Produkty gotowe", path: "/readyproducts" },
              { name: "Produkty na zamówienie", path: "/customizedproducts" },
              { name: "Kontakt", path: "/kontakt" },
              { name: "Panel użytkownika", path: "/user_panel" },
            ]}
          />
          <div className={classes.flexEndContainer}>
            <button
              className={classes.buttonLogOut}
              onClick={async function () {
                const response = await fetch("/api/logout");

                console.log(response);
                const data = await response.json();
                console.log(data);
                Cookies.remove('IsLoggedIn')
                router.push({
                  pathname: "/",
                });
              }}
            >
              Wyloguj się
            </button>
          </div>
          <div className="d-flex flex-column align-items-center">
            <h1 className="mt-3 mb-0">Panel użytkownika</h1>

            <h3 className="mt-3 mb-0">
              Witaj {name} {familyName}
            </h3>
            <p className="my-0">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
              voluptate iusto aspernatur dolores, quos quo temporibus nam nulla
              quia dolorumLorem ipsum dolor sit amet consectetur, adipisicing
              elit. Aut voluptate iusto aspernatur dolores, quos quo temporibus
              nam nulla quia dolorum quaerat fuga sit aliquid ducimus ab
              veritatis tempora excepturi! Repellendus! quaerat fuga sit aliquid
              ducimus ab veritatis tempora excepturi! Repellendus!
            </p>
            {isAdmin && (
              <p>
                Jesteś adminem tego zakładu produkcyjno handlowego. Musisz o
                niego zadbać!!!
              </p>
            )}

          {isAdmin && (    <div className={classes.flexContainer}>
              <button
                className={classes.button}
                onClick={() => {
                  router.push({
                    pathname: "/ordersListPage",
                  });
                }}
              >
                Lista zamówień
              </button>

              <button
                className={classes.button}
                onClick={() => {
                  router.push({
                    pathname: "/addNewProduct",
                  });
                }}
              >
                Dodaj nowy produkt
              </button>

              <button
                className={classes.button}
                onClick={() => {
                  router.push({
                    pathname: "/deleteProduct",
                  });
                }}
              >
           Usuń produkt
              </button>
            </div>         )}

            {!isAdmin && ( <div className={classes.flexStartContainer}>
              <p className={classes.akapit}> Twoje zamówienia: </p> 

           
              
           
              
              </div> )



              
              }

{
         ordersFetched && !isAdmin && userOrders.map(( el )=> {
            return(
           <OrderListItem 
            id= {el.id}
            key= {el.id}
            firstName= {el.firstName}
            familyName= {el.familyName}
            city= {el.city}
            price= {el.price}
            status={el.orderStatus}
            isAdmin= {false}
            />
            )
          })

         }


          </div>
          
        </Container>
      </main>
    </>
  );
}
