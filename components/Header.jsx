import 'bootstrap/dist/css/bootstrap.min.css';

import classes from "./Header.module.css";

export default function Header () {


    return (
<div className={classes.header}>
       <div className='mx-auto'>
        
      <h1 className={classes.company_title} > -Stolarnia SZAFA-</h1>
      <h2 className={classes.company_title} > *****</h2>
      <h3 className={classes.company_title} >Meble i wyroby z drewna ( dąb, buk, sosna, orzech)-  na zamówienie i gotowe od ręki. </h3>
      <h2 className={classes.company_title} > *****</h2>
        </div>
        </div>
    )
}