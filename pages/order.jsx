import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
 
import Header from "../components/Header";
import {addToCart,clear,updateFromLocalStorage} from '../store/slices/cartSlice'
import styles from './readyproducts.module.css'
import HeaderCartButton from "../components/HeaderCartButton";
import Navbar from "../components/Navbar.jsx";
import ReadyProduct from "../components/RedyProduct";
import { useDispatch, useSelector } from "react-redux";
import {  useState } from "react";
import CartModal from "../components/CartModal";
import OrderControl from "../components/OrderControl";

 
export default function order() {
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(updateFromLocalStorage())
   },[])
   
   


  return (
    <>


<div>

    </div>
    <main className={styles.bg_custom}> 
      <Head>
        <title>Zamówienie</title>
        <link rel="icon" href="/img/szafa.jpg" />
      </Head>

      <Container>
     
     
    <Header/> 
    <div className="position-absolute top-0 end-0 d-flex px-2">
          <div className=" px-2">
            
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
               <OrderControl/> 
        <Image
          src="/img/deska.jpg" // Route of the image file
          height={100} // Desired size with correct aspect ratio
          width={1490} // Desired size with correct aspect ratio
          alt="Piła"
          className="pb-5 mt-0"
        />
  

  


 
        
      </Container>
      </main>
    </>
  );
}
