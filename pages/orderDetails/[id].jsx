import { useRouter } from 'next/router';
import styles from '.././kontakt.module.css'
import Navbar from "../../components/Navbar.jsx";
import Container from "react-bootstrap/Container";
import Head from "next/head";
import { useEffect  } from "react";
import Header from "../../components/Header";
import OrderDetailView from '../../components/OrderDatailViev';


export default function OrderDetails() {
    const router = useRouter();
    console.log(router.query);
    useEffect(() => {
      const isAdminCheck = async () => {
        const response = await fetch("/api/userProtectedData");
        const data = await response.json();
        console.log("to dane użtkownika zaciągnięte z bazy");
        console.log(data);
    
        if (data.body.id !== 1)     router.push({
          pathname: "/user_panel ",
        });;
      };
      isAdminCheck();
    }, []);
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
          <OrderDetailView
          id={router.query.id}
          />
          </Container>
          </main>
        </>
      );


}