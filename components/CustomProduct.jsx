import classes from "./CustomProduct.module.css";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomizedItem,
  updateFromLocalStorage,
} from "../store/slices/cartSlice";

export default function CustomProduct(props) {
  const cartCustomizedItems = useSelector(
    (state) => state.cart.customizedItems
  );

  const lenRef = useRef();
  const widthRef = useRef();
  const Amount = useRef(null);
const value =     Math.ceil(
  (props.minLen * 0.5 + props.maxLen * 0.5) *
    (props.minWidth * 0.5 + props.maxWidth * 0.5) *
    props.factor *
    100
) / 100
  const [Price, setPrice] = useState(
value.toFixed(2)
  );
  const [MaterialFactor, setMaterialFactor] = useState(1);
  const [Material, setMaterial] = useState("sosna");
  const [Height, setHeight] = useState(
    props.minHeight * 0.5 + props.maxHeight * 0.5
  );

  const changeSizeHandler = (e) => {
    if (lenRef.current.value > 0 && widthRef.current.value > 0) {
const value =     Math.ceil(
  lenRef.current.value *
    widthRef.current.value *
    props.factor *
    MaterialFactor *
    100
) / 100

      setPrice(
    value.toFixed(2)
      );
    } else {
    }
  };

  const heightChangeHandler = (e) => {
    setHeight(e.target.value);
  };
  const changeMaterialFactorHandler = (e) => {
    console.log(e);
    setMaterialFactor(e.target.value);
    setMaterial(e.target.selectedOptions[0].innerText);
    const value =      Math.ceil(
      lenRef.current.value *
        widthRef.current.value *
        props.factor *
        e.target.value *
        100
    ) / 100
    setPrice(
 value.toFixed(2)
    );
    console.log("wartość po zmianie");
    console.log(MaterialFactor);
  };

  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(
      addCustomizedItem({
        id: props.id,
        name: props.name,
        price: Price,
        amount: Amount.current.value,
        imgSrc: props.imgSrc,
        width: widthRef.current.value,
        lenght: lenRef.current.value,
        high: Height,
        material: Material,
        id: props.id,
      })
    );

    console.log(cartCustomizedItems);
  };

  useEffect(() => {
    dispatch(updateFromLocalStorage());
  }, []);

  return (
    <div>
      <div className={classes.container}>
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
 
            <h1>{props.name}</h1>
            <div className="d-flex  ">
              <div className="d-flex flex-column mx-1 py-1">
                <label>Długość cm</label>
                <input
                  type="text"
                  ref={lenRef}
                  className={classes.sizeInputField}
                  defaultValue={props.minLen * 0.5 + props.maxLen * 0.5}
                  min={parseInt(props.minLen)}
                  max={parseInt(props.maxLen)}
                  onChange={changeSizeHandler}
                ></input>

                <label>Szerokość cm</label>
                <input
                  type="text"
                  ref={widthRef}
                  className={classes.sizeInputField}
                  defaultValue={props.minWidth * 0.5 + props.maxWidth * 0.5}
                  min={parseInt(props.minWidth)}
                  max={parseInt(props.maxWidth)}
                  onChange={changeSizeHandler}
                ></input>
              </div>
              <div className="d-flex flex-column mx-1 py-1">
                {props.minHeight > 0 && (
                  <>
                    <label>Wysokość cm</label>
                    <input
                      type="text"
                      className={classes.sizeInputField}
                      defaultValue={
                        props.minHeight * 0.5 + props.maxHeight * 0.5
                      }
                      min={parseInt(props.minHeight)}
                      max={parseInt(props.maxHeight)}
                      onChange={heightChangeHandler}
                    ></input>
                  </>
                )}
 

                <p1>Materiał: </p1>
                <select
                  // className="form-select form-select-sm mb-3"
                  className={classes.materialInputField}
 
                  aria-label=".form-select-lg example"
                  onChange={changeMaterialFactorHandler}
                >
                  <option selected="selected" value={1}>
                    sosna
                  </option>
                  <option value={1.35}>dąb</option>
                  <option value={1.25}>buk</option>
                  <option value={1.5}>orzech</option>
                </select>
              </div>
            </div>
         
        </div>
        <div className={classes.price_show}>
          <div className="d-flex flex-column align-items-end">
            <h3 className="px-5">{Price > 0 && `Cena: ${Price}  zł`}</h3>
            <div>
              <div className="d-flex flex-column py-2 px-5 align-items-end">
                <label>Ilość </label>
                <input
                  className={classes.amountInputField}
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  defaultValue="1"
                  // className=" w-50 my-1"
                  ref={Amount}
                />
                <button
                  className=" btn btn-primary h-50 w-50"
                  onClick={addToCartHandler}
                >
                  Dodaj
                </button>
       
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
