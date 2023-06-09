import Head from "next/head";

import classes from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar.jsx";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
 
import Header from "../components/Header";
import HeaderCartButton from "../components/HeaderCartButton";

import { useDispatch, useSelector, useStore } from "react-redux";
import { decrement, increment } from '../store/slices/counterSlice'
import {addToCart,clear,updateFromLocalStorage} from '../store/slices/cartSlice'
 
import { useEffect,useState } from "react";
import CartModal from "../components/CartModal";



export default function Home() {

  const [ShowCartModal,setShowCartModal] = useState(false)

  const count = useSelector((state) => state.counter.value)
  const cartItems = useSelector((state) => state.cart.items)
  const cartCustomizedItems = useSelector((state) => state.cart.customizedItems)
 
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
  const dispatch = useDispatch()

 const addChair = () =>{
  dispatch(addToCart({price: 3,item:'krzesło'}))
   
 }
 const addTable= () =>{
  dispatch(addToCart({price: 8,item:'stół'}))
  

 }
 const clearCart = () => {
  dispatch(clear());
 
 }
 useEffect(() =>{
  dispatch(updateFromLocalStorage())
 },[])
 

  return (
    <main className={classes.bg_custom}>

{ShowCartModal && <CartModal
hideModal={() => {setShowCartModal(false)}}
/>  }
    
    
       

     
      
      
      
   
      <Head>
        <title>Stolarnia</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/szafa.jpg" />
      </Head>

      <Container>
        <Header />
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

        <p className="py-3 w-75 mx-auto">
          Stolarnia Szafa- zajmujemy się produkcją mebli na wymiar i akcesoriów
          drewnianych. Posiadamy nowoczesny park maszynowy- obrabiarki CNC i
          tradycyjne. Dzięki doświadczeniu naszych fachowców możemy tworzyć
          niezwykłe przedmioty z drewna, również na zamówienie.
        </p>
        <Image
          src="/img/deska.jpg" // Route of the image file
          height={100} // Desired size with correct aspect ratio
          width={1490} // Desired size with correct aspect ratio
          alt="Piła"
          className="pb-5 mt-0"
        />
        <div className={classes.pic}>
          <div class="row">
            <div class="col-sm">
              <Image
                src="/img/frezarkac.jpg" // Route of the image file
                height={500} // Desired size with correct aspect ratio
                width={1000} // Desired size with correct aspect ratio
                alt="Piła"
                className="pb-5"
              />
            </div>
            <div class="col-sm">
              <Image
                src="/img/fachowiec.jpg" // Route of the image file
                height={500} // Desired size with correct aspect ratio
                width={1000} // Desired size with correct aspect ratio
                alt="Piła"
                className="pb-5"
              />
            </div>
            <div class="col-sm">
              <Image
                src="/img/saw.png" // Route of the image file
                height={500} // Desired size with correct aspect ratio
                width={1000} // Desired size with correct aspect ratio
                alt="Piła"
                className="pb-5"
              />
            </div>
          </div>
        </div>

        <div className={classes.pic}>
          <div class="row">
            <div class="col-sm">
              <Image
                src="/img/drewno.png" // Route of the image file
                height={500} // Desired size with correct aspect ratio
                width={1000} // Desired size with correct aspect ratio
                alt="Piła"
                className="pb-5"
              />
            </div>
            <div class="col-sm">
              <Image
                src="/img/szafa_drewniana.jpg" // Route of the image file
                height={500} // Desired size with correct aspect ratio
                width={1000} // Desired size with correct aspect ratio
                alt="Piła"
                className="pb-5"
              />
            </div>
            <div class="col-sm">
              <Image
                src="/img/tarczowa.jpg" // Route of the image file
                height={500} // Desired size with correct aspect ratio
                width={1000} // Desired size with correct aspect ratio
                alt="Piła"
                className="pb-5"
              />
            </div>
          </div>
        </div>
        <Image
          src="/img/deska.jpg" // Route of the image file
          height={100} // Desired size with correct aspect ratio
          width={1490} // Desired size with correct aspect ratio
          alt="Piła"
          className="pb-5 mt-0"
        />
      </Container>

      {/* <button
      onClick={async () =>
      {
        const response = await fetch('http://localhost:3000/api/clientslist');
        const data = await response.json();
        console.log(data)


      }}
      >
        Pokarz liste klientów 
      </button>
      <button
      onClick={async () =>
      {
        const response = await fetch('/api/orderslist');
        const data = await response.json();
        console.log(data)


      }}
      >
        Pokarz zamówienia
      </button>

      <button
      onClick={async () =>
      {
        const response = await fetch('/api/productsList');
        const data = await response.json();
        console.log(data)


      }}
      >
        Pokarz produkty
      </button> 
    */}
    </main>
  );
}


