import classes from "./RedyProduct.module.css";
import React from "react";
import { useContext,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

import { useDispatch, useSelector } from "react-redux";
import {addItem} from '../store/slices/cartSlice'
 


const ReadyProduct = (props) => {
  const Amount = useRef(null)
  const dispatch = useDispatch()
  const addToCartHandler = () => {
    dispatch(addItem({id:props.id,
    name: props.name,
    price: props.price,
    amount:Amount.current.value,
    imgSrc:props.imgSrc
    }))

  }


  return (
    <div className="d-flex justify-content-between align-items-start">

      <div className="pr-3">
      <div className={classes.pic_show}>
        <Image
          src={props.imgSrc} // Route of the image file
          height={200} // Desired size with correct aspect ratio
          width={200} // Desired size with correct aspect ratio
          alt={props.imgDesc}
          className="pb-5 mt-0"
        />
      </div>
      </div>
      <div className={classes.desc_show}>
        <Tippy
          placement={"top"}
          animation="perspective"
          theme={"light"}
          interactive={true}
          content={<p>Opis: {props.desc}</p>}
        >
          <div>
            <h1>{props.name}</h1>
            <div className="d-flex ">
              <div className="d-flex flex-column mx-1 py-1">
                <p1>Długość: {props.len} cm</p1>
                <p1>Wysokość: {props.height} cm</p1>
              </div>
              <div className="d-flex flex-column mx-1 py-1">
                <p1>Szerokość: {props.width} cm</p1>
                <p1>Materiał: {props.material}</p1>
              </div>
            </div>
          </div>
        </Tippy>
      </div>
      <div className={classes.price_show}>
      <div className= 'd-flex flex-column align-items-end'>
        <h3 className="px-5">
          <u>{props.price} zł</u>{" "}
        </h3>

        <div>
          <div className="d-flex flex-column py-2 px-5 align-items-end">
            <label>Ilość </label>
            <input
              type="number"
              min="1"
              max="10"
              step="1"
              defaultValue="1"
              className=" w-50 my-1"
              ref={Amount}
              
              
            />
            <button 
            className=" btn btn-primary h-50 w-50"
            onClick={addToCartHandler}
            >
               Dodaj</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ReadyProduct;
