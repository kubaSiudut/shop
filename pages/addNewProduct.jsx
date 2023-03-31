import Head from "next/head";
import { useEffect, useState, useRef } from "react";
// import styles from "./kontakt.module.css";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar.jsx";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import Image from "next/image";
import classes from "./addNewProduct.module.css";


export default function Kontakt() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const lenRef = useRef();
  const widthRef = useRef();
  const highRef = useRef();
  const priceRef = useRef();
  const nameRef = useRef();
  const materialRef = useRef();
  const descriptionRef = useRef();

  const router = useRouter();

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

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    const rawPrice = parseFloat(priceRef.current.value);

    body.append("file", image);
 
    body.append("name", nameRef.current.value);
    body.append("material", materialRef.current.value);
    body.append("desc", descriptionRef.current.value);
    body.append("price", rawPrice.toFixed(2));
    body.append("height", highRef.current.value);
    body.append("lenght", lenRef.current.value);
    body.append("width", widthRef.current.value);
 
console.log(body)
    const response = await fetch("/api/addNewProduct", {
      method: "POST",
      body,
    });

    console.log(response); 
 
 
    if(response.status ===200)
    {

 
       router.push({
        pathname: "/user_panel",
      });
    }
 
  };

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
          <div className="d-flex flex-column align-items-center">
            <h2 className="mt-3 mb-0"> Dodawanie nowego produktu</h2>
          </div>

          <div className="d-flex flex-column align-items-center">
            <div className={classes.sizeBar}>
            <div className={classes.sizeSection}>
              <label>Nazwa</label>
              <input
                className={classes.sizeInputField}
                type="text"
                ref={nameRef}
              ></input>
       </div>
       <div className={classes.sizeSection}>
            <label>Materiał</label>
            <input
              className={classes.sizeInputField}
              type="text"
              ref={materialRef}
            ></input>
            </div>
            <div className={classes.sizeSection}>
                <label>Cena </label>
                <input
                  className={classes.sizeInputField}
                  type="number"
                  step="0.01"
                  ref={priceRef}
                ></input>
              </div>
            </div>


            <div className={classes.sizeBar}>
              <div className={classes.sizeSection}>
                <label>Wysokość </label>
                <input
                  className={classes.sizeInputField}
                  type="number"
                  ref={highRef}
                ></input>
              </div>
              <div className={classes.sizeSection}>
                <label>Długość </label>
                <input
                  className={classes.sizeInputField}
                  type="number"
                  ref={lenRef}
                ></input>
              </div>
              <div className={classes.sizeSection}>
                <label>Szerokość </label>
                <input
                  className={classes.sizeInputField}
                  type="number"
                  ref={widthRef}
                ></input>
              </div>
            </div>

            <label>Opis</label>
            <textarea
              className={classes.nameInputField}
              ref={descriptionRef}
            ></textarea>

            {createObjectURL && (
              <Image
                src={createObjectURL} // Route of the image file
                height={150} // Desired size with correct aspect ratio
                width={150} // Desired size with correct aspect ratio
                className="pb-5 mt-0"
              />
            )}
            <div className={classes.sizeBar}>
              <div className={classes.sizeSection}>
                <label>Obrazek </label>
                <input type="file" name="myImage" onChange={uploadToClient} />
              </div>

           
            </div>

            <button
              className={classes.addButton}
              type="submit"
              onClick={uploadToServer}
            >
              Dodaj produkt
            </button>
          </div>
        </Container>
      </main>
    </>
  );
}
