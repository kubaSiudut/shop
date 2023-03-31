import classes from "./CartRedyProduct.module.css";

import React from "react";
import { useContext,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {modifyAmounCustomizedProdInCart} from '../store/slices/cartSlice'
import { useEffect } from "react";

const CartCustomizedProduct = (props) => {
    const Amount = useRef(null)
    const dispatch = useDispatch()

    useEffect(() =>{
        Amount.current.value = props.amount
    
      },[])

      const amountChangeHandler = () => {
        dispatch(modifyAmounCustomizedProdInCart({id:props.id, amount:Amount.current.value}))
      }

      const removeItemHamdler = () => {

        dispatch(modifyAmounCustomizedProdInCart({id:props.id, amount:0}))
        console.log("próba usunięcia przedmiotu ")
    
      }


    return (
        <div className="d-flex justify-content-between align-items-start">
    
          <div className="pr-3">
          <div className={classes.pic_show}>
            <Image
              src={props.imgSrc} // Route of the image file
              height={150} // Desired size with correct aspect ratio
              width={150} // Desired size with correct aspect ratio
               
              className="pb-5 mt-0"
            />
          </div>
          </div>
          <div className= {classes.title}>
            <h1 >{props.name}</h1>
            </div>
              
              <div> 
                <h4>Szerokość: {props.width} cm</h4>
                <h4>Długość: {props.lenght} cm</h4>
               
              </div>
              <h4>
                Materiał: {props.material}
              </h4>


              <h3>{props.price} zł</h3>{" "}
              
           
           
          <div className= 'd-flex flex-column align-items-end'>
           
          
    
          <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex flex-column py-2 px-5 align-items-end">
                 
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  defaultValue="1"
                  className=" w-50 my-1"
                  ref={Amount}
                  onChange={amountChangeHandler}
              
                  
                  
                />
    
    
               
              </div>
              <button
              onClick={removeItemHamdler}
              className={classes.deleteButton}
              >
            X
          </button>
              
            </div>
          </div>
        
           
        </div>
      );

}


export default CartCustomizedProduct;