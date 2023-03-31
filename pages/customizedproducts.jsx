import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
 
import Header from "../components/Header";
import styles from './customizedproducts.module.css'
import CustomProduct from "../components/CustomProduct";
import Navbar from "../components/Navbar.jsx";
import {  useState } from "react";
import HeaderCartButton from "../components/HeaderCartButton";
import CartModal from "../components/CartModal";

const DUMMY_PRODUCTS = [{
name:'Stół',
 factor:0.12,
minHeight:50,
maxHeight:150,
minWidth:50,
maxWidth:350,
minLen:50,
maxLen:350,
imgDesc:'stolik',
imgSrc:"/img/table.jpg",
id:11
},
{
  name:'Stolnica',
  factor:0.02,
  minHeight:0,
  maxHeight:150,
  minWidth:50,
  maxWidth:200,
  minLen:50,
  maxLen:200,
  imgDesc:'stolnica',
  imgSrc:"/img/stolnica.jpg",
  id:12,
  }

]
export default function Custumizeproducts() {
  const [ShowCartModal,setShowCartModal] = useState(false)
  return (
    <>
        {ShowCartModal && <CartModal
hideModal={() => {setShowCartModal(false)}}
/>  }

    <main className={styles.bg_custom}> 
      <Head>
        <title>Stolarnia kontakt</title>
        <link rel="icon" href="/img/szafa.jpg" />
      </Head>
      <Container>
     
     
     <Header/> 
     <div className="position-absolute top-0 end-0 d-flex px-2">
          <div className=" px-2">
            <HeaderCartButton 
            showCartModal={ () => {setShowCartModal(true)}}
            />
          </div>
 
        </div>

        <Navbar
          tabs={[
            { name: "O nas", path: "/" },
            { name: "Produkty gotowe", path: "/readyproducts" },
            { name: "Produkty na zamówienie", path: "/customizedproducts" },
            { name: "Kontakt", path: "/kontakt" },
            { name: "Panel użytkownika", path: "/user_panel" },
          ]}
        />
   
        <p className="py-3 w-50 mx-auto">
          Dostosuj wymiary mebli do własnych potrzeb, a jeżli potrzebyjesz czegoś bardziej nietypowego zapraszamy do kontaktu mailowego lub telefonicznego.
        </p>
        <Image
          src="/img/deska.jpg" // Route of the image file
          height={100} // Desired size with correct aspect ratio
          width={1490} // Desired size with correct aspect ratio
          alt="Piła"
          className="pb-5 mt-0"
        />


        {
          DUMMY_PRODUCTS.map((el) => {
            return ( 
              <CustomProduct
              name={el.name}
              minLen={el.minLen}
              maxLen={el.maxHeight}
              minWidth={el.minWidth}
              maxWidth={el.maxWidth}
              minHeight={el.minHeight}
              maxHeight={el.maxHeight}
              imgSrc={el.imgSrc}
              factor={el.factor}
              key={el.id}
              id={el.id}
              />
            )
          }
          
          )
        }
      </Container>
       </main>
    </>
  );
}
