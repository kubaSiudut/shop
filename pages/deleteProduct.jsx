import Head from "next/head";
import styles from "./deleteProduct.module.css";
import Navbar from "../components/Navbar.jsx";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import ProductToDelete from "../components/ProductToDelete";
import classes from "./deleteProduct.module.css";
import { useRouter } from "next/router";
export default function Kontakt() {
  const [productsList, setProductsList] = useState([]);
  const [productsToDelete, setProductsToDelete] = useState([]);

  useEffect(() => {
    const isAdminCheck = async () => {
      const response = await fetch("/api/userProtectedData");
      const data = await response.json();
      console.log("to dane użtkownika zaciągnięte z bazy");
      console.log(data);

      if (data.body.id !== 1)
        router.push({
          pathname: "/user_panel ",
        });
    };
    isAdminCheck();
  }, []);

  const router = useRouter();
  const sentDeleteReq = async () => {
    const response = await fetch("http://localhost:3000/api/deleteProducts", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",

      },

      body: JSON.stringify(productsToDelete), // body data type must match "Content-Type" header
    });

    router.push({
      pathname: "/user_panel",
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/productsList");
      const data = await response.json();

      console.log("lista produktów");
      console.log(data);
      setProductsList(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <main className={styles.bg_custom}>
        <Head>
          <title>Stolarnia </title>
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
          <div className="d-flex flex-column align-items-center">
            <h3 className="mt-3 mb-3">
              Wybierz produkty, które chcesz usunąć z oferty{" "}
            </h3>

            {productsList.map((el) => {
              return (
                <ProductToDelete
                  desc={el.tooltip}
                  name={el.neme}
                  len={el.len}
                  height={el.height}
                  width={el.width}
                  material={el.material}
                  imgDesc={el.tooltip}
                  imgSrc={`/uploads/${el.neme}`}
                  price={el.price}
                  id={el.id}
                  key={el.id}
                  productsToDelete={productsToDelete}
                  eventClick={(e) => {
                    console.log(e);
                    setProductsToDelete(e);
                  }}
                ></ProductToDelete>
              );
            })}

            <button className={classes.deleteButton} onClick={sentDeleteReq}>
              Usuń wybrane produkty
            </button>
          </div>
        </Container>
      </main>
    </>
  );
}
