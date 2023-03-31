import classes from "./ProductToDelete.module.css";
 import { useContext,useRef,useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

import { useDispatch, useSelector } from "react-redux";
import {addItem} from '../store/slices/cartSlice'
 


const ProductToDelete = (props) => {
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
 
const [ backgroundStyle,setBackgroundStyle] = useState(classes.not_selected)
 //props.productsToDelete.includes(props.id) ?  setBackgroundStyle(classes.selected) :setBackgroundStyle(classes.not_selected)
const onClickHandler = () => { 

  if(props.productsToDelete.includes(props.id)){
    const newListToDelete = props.productsToDelete.filter((el) => {return el != props.id })
    props.eventClick(newListToDelete);
    setBackgroundStyle(classes.not_selected)
  }else{
    const newListToDelete = [...props.productsToDelete, props.id ];
    props.eventClick(newListToDelete);
    setBackgroundStyle(classes.selected)
  }
}

  return (
  
    <div className={classes.container} onClick={onClickHandler}>
  
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


      <div className={backgroundStyle} >
     
          <div className={classes.parameters} >
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
          <div className={classes.price_show}>
      <div className= 'd-flex flex-column align-items-end'>
        <h3 className="px-5">
          <u>{props.price} zł</u>{" "}
        </h3>

        <div>
    
        </div>
      </div>
      </div>
      </div>
     
    </div>
  );
};


export default ProductToDelete;
