import Head from "next/head";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import {addToCart,clear,updateFromLocalStorage} from '../store/slices/cartSlice'
import styles from './readyproducts.module.css'
import HeaderCartButton from "../components/HeaderCartButton";
import Navbar from "../components/Navbar.jsx";
import ReadyProduct from "../components/RedyProduct";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect ,useState } from "react";
import CartModal from "../components/CartModal";

const DUMMY_PRODUCTS = [{        desc:' Solidne krzesło sosnowe do kuchni slonu lub na taras. A jak się znudzi można spalic w komniku lorem ipsum dolor sit ammet',
name:'Krzesło',
len:'50',
height:'100',
width:'50',
material:'sosna',
imgDesc:'Krzesełko',
imgSrc:"/img/chair.jpg",
price:'100.00',
id:1},
{        desc:' Solidny stół dębowy do kuchni  lorem ipsum dolor sit ammet',
name:'Stół',
len:'150',
height:'120',
width:'80',
material:'dąb',
imgDesc:'stolik',
imgSrc:"/img/table.jpg",
price:'1200.00',
id:2},
{        desc:'pojemna szafa na ubrania i nie tylko lorem ipsum dolor sit ammet',
name:'Szafa',
len:'120',
height:'180',
width:'80',
material:'buk',
imgDesc:'szafa',
imgSrc:"/img/szafa_drewniana.jpg",
price:'800.00',
id:3},
{        desc:'Stolnica do wyrabiania ciasta lorem ipsum dolor sit ammet',
name:'Stolnica',
len:'100',
height:'x',
width:'80',
material:'dąb',
imgDesc:'stolnica',
imgSrc:"/img/stolnica.jpg",
price:'60.00',
id:4},
]
export default function readyproduct() {
  
  const [ShowCartModal,setShowCartModal] = useState(false)
  const [productsList,setProductsList] = useState([])

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
   const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
  useEffect(() =>{
    dispatch(updateFromLocalStorage())

    const fetchProducts = async () => {
      const response = await fetch('/api/productsList');
      const data = await response.json();
      console.log(data)
      setProductsList(data)
    }
    fetchProducts()
  
   },[])
   


  return (
    <>
    {ShowCartModal && <CartModal
hideModal={() => {setShowCartModal(false)}}
/>  }

<div>
     
      
    </div>
    <main className={styles.bg_custom}> 
      <Head>
        <title>Produkty</title>
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
          Posiadamy szeroki wybór mebli i produktów drewnianych. Zamawiasz, a my wysyłamy!
        </p>
        <Image
          src="/img/deska.jpg" // Route of the image file
          height={100} // Desired size with correct aspect ratio
          width={1490} // Desired size with correct aspect ratio
          alt="Piła"
          className="pb-5 mt-0"
        />

  


{DUMMY_PRODUCTS.map((el) =>{
  
 return (<ReadyProduct 
  desc= {el.desc}
  name={el.name}
  len={el.len}
  height={el.height}
  width={el.width}
  material={el.material}
  imgDesc={el.imgDesc}
  imgSrc={el.imgSrc}
  price={el.price}
  id={el.id}
  key={el.id}

   ></ReadyProduct>)
})}

{productsList.map((el) =>{
  
  return (<ReadyProduct 
   desc= {el.tooltip}
   name={el.neme}
   len={el.len}
   height={el.height}
   width={el.width}
   material={el.material}
   imgDesc={el.tooltip}
   imgSrc= {`/uploads/${el.neme}`}
   price={el.price.toFixed(2)}
   id={el.id}
   key={el.id}
 
    ></ReadyProduct>)
 })}
        
      </Container>
      </main>
    </>
  );
}
