import classes from "./OrderDatailView.module.css";
 
import { useEffect,useState } from "react";
import { useRouter } from 'next/router';


export default function  OrderDetailView  (props) {

    const router = useRouter();
const [order,setOrder] = useState({})
const [orderState,setOrderState] = useState()

    const fetchOrdeDetails = async (id) => {
        console.log('próba połączenia do bazy ')
        console.log( id)
        const response = await fetch(`/api/orders//orderDetails/${id }`);
        console.log('przetworzenie danych  ')

        const data = await response.json();
        setOrder(data)
        setOrderState(data.orderStatus)
        console.log(data)
      }
      
      useEffect(() =>{

        console.log('to jest  router **************')
        console.log(router)
        if(router.isReady){ 
             const orderId = router.query.id
            console.log(orderId)
            fetchOrdeDetails(orderId)
        }

      
    },[router.isReady])

    const saveStatusHandler = async(e) =>


    {

        e.preventDefault()
        console.log("Próba PUTa ")
        const updateOrder = {
            id: router.query.id,
            status: orderState
        }
        const response = fetch('/api/updateStatus', {
            method: 'PUT', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateOrder ),
          })


          router.push({
            pathname: `/ordersListPage`,
          })

    }



    return (
        <div className={classes.mainContainer} >
 
            <h5>Dane klienta:</h5>
            <div className={classes.group}>
            <p>{order.firstName} {order.familyName}, {order.postalCode} {order.city} ul. {order.street}</p>
            <p> tel. {order.phone}</p>
            <p> e-mail:  {order.email}</p>
            </div>

            <h5>Zamówienie:</h5>
            <div className={classes.group}>
            <p>{order.orderDescription}</p>
          
            </div>
            <p> Koszt: {order.price} zł</p>
            <div className={classes.deliveryPayment}>
             <div>   
            <h5>Forma dostawy :</h5>
            <p>{order.delivery}</p>
            </div>
            <div>
            <h5>Forma płatności</h5>
            <p>{order.payment==='atDelivery' ? 'Przy doręczeniu':
             order.payment==='Bank' ? 'Przy doręczeniu': "nie wiadomo "

            }</p>

            </div>
            </div>

            {order.addInfo && 
            <>
            <h5>Dodatkowe informacje:</h5> 
            <p> {order.addInfo}</p>
            </>

            }

            <div className={classes.buttonsGroup}>

            < select value={orderState}
            onChange= {
                (e) => {
                    console.log(e)
                  setOrderState(e.target.value)
                }
            }
            
            >
                <option value={'zapłacone'}>Zapłacone</option>
                <option value={'otrzymano'}>Otrzymano</option>
                <option value={'w przygotowaniu'}>W przygotowaniu</option>
                <option value={'gotowe do wysyłki'}>Gotowe do wysyłki</option>
                <option value={'gotowe do odbioru'}>Gotowe do odbioru</option>
                <option value={'wysłane'}>Wysłane</option>
                
            </select>

            <button
            className={classes.buttonFwd}
            onClick={saveStatusHandler}
            >
                Zapisz status
            </button>
            </div>

             
        </div>
    )




}