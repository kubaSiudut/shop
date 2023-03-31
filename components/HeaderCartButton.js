
import { useContext,useEffect,useState } from 'react';
import classes from './HeaderCartButton.module.css'
import CartIcon from './CartIcon';
import { useDispatch, useSelector, useStore } from "react-redux";
const HeaderCartButton = (props) => {

  const cartItems = useSelector((state) => state.cart.items);
  const cartCustamizedItems = useSelector(
    (state) => state.cart.customizedItems
  );
  
  const [size,setSize] = useState( cartCustamizedItems.length +  cartItems.length)

   const [btnIsHighlighted,setbtnIsHighlighted] = useState(false);
   useEffect(() =>{
    setSize(cartCustamizedItems.length +cartItems.length)
   },[cartItems, cartCustamizedItems])
   
    return (
      <>
    <button 
    className="w-5 btn-sm   my-1 btn btn-primary" 
    onClick={() => {
        props.showCartModal()
        
    }} >
      Twoje zakupy {size}
     
    </button>


    
    </>)

}
export default HeaderCartButton;