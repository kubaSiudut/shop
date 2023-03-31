import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "react-bootstrap";
import styles from './kontakt.module.css'

import Navbar from "../components/Navbar.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "../components/LoginForm";

import Header from "../components/Header";
export default function Kontakt() {
  return (
    <>
    <main className={styles.bg_custom}>
      <Head>
        <title>Stolarnia kontakt</title>
        <link rel="icon" href="/img/szafa.jpg" />
      </Head>
      <Container>
     
     
     <Header/> 
     <div className="position-absolute top-0 end-0">
     
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
      <div className="d-flex flex-column align-items-center">
    
       
<LoginForm/>
      </div>
      </Container>
      </main>
    </>
  );
}
