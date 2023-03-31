import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "react-bootstrap";
import styles from './kontakt.module.css'
import OrderListItem from "../components/OrderListItem";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
 
import Header from "../components/Header";
import { useEffect,useState } from "react";
export default function OrderListPage() {
  const router = useRouter();
 
  
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

  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [filter,setFilter] = useState('all')

  const filterFunc = (el) => {
    if(filter ==='all')
    {
      return true
    }
    if(filter ===el.orderStatus)
    {
      return true
    }
  }
  
  const fetchOrderList = async () => {
    const response = await fetch('/api/orderslist');
    const data = await response.json();
    //console.log(data)
    setOrders(data)
    setFilteredOrders(data)
  }

 

  useEffect(  () => {
  
fetchOrderList()

  },[])

  useEffect(() =>{
    setFilteredOrders(orders.filter(filterFunc))
  },[filter])
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
        <p className="mt-3 mb-0">Zamówienia jakie złożono w naszym sklepie</p>
        < select value={filter}
        onChange = { (e) =>
          {
            setFilter(e.target.value)
        
          }

        }         
            
            
            >
                <option value={'all'}>Wszystkie</option>
                <option value={'otrzymano'}>Otrzymano</option>
                <option value={'w przygotowaniu'}>W przygotowaniu</option>
                <option value={'gotowe do wysyłki'}>Gotowe do wysyłki</option>
                <option value={'gotowe do odbioru'}>Gotowe do odbioru</option>
                <option value={'zapłacone'}>Zapłacone</option>
                <option value={'wysłane'}>Wysłane</option>
                
            </select>
       

         {
          filteredOrders.map(( el )=> {
            return(
           <OrderListItem 
            id= {el.id}
            key= {el.id}
            firstName= {el.firstName}
            familyName= {el.familyName}
            city= {el.city}
            price= {el.price}
            status={el.orderStatus}
            isAdmin= {true}
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
