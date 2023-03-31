import classes from "./OrderListItem.module.css";
import { useRouter } from "next/router";


export default function (props){
    const router = useRouter()


    return(
        <div className={classes.mainContainer}
         
        onClick={() => {
          if(props.isAdmin)
       {   router.push({
            pathname: `/orderDetails/${props.id}`,
          });}
        }}
        >
           {props.isAdmin && <p>{props.id}</p>}
            <p className={classes.field}>{props.firstName} {props.familyName}</p>
            <p className={classes.field}>{props.city}</p>
            <p className={classes.field}>{props.price} zł</p>
            <p className={classes.lastField}>{props.status}</p>
         

        </div>
    )
}