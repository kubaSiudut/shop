import classes from "./Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";

export default function Navbar(props) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [burgerOpen,setBurgerOpen] = useState(true)
  const [width, setWindowWidth] = useState(0)   
  useEffect(() => { 

    updateDimensions();

    window.addEventListener("resize", updateDimensions);     return () => 
    window.removeEventListener("resize",updateDimensions);    }, []) 
    const updateDimensions = () => {
     const width = window.innerWidth
     setWindowWidth(width)
   }
  return (
    
      <div className={classes.img} >
          <nav className={ width > 780 ? classes.navContainerDesk :classes.navContainerMobile }>
            {props.tabs.map(({ name, path }, index) => (
              <div
                className={
                  currentRoute === path  ? classes.active : classes.nonActive
                }
              >
                <Link key={index} as={path} href={path}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: 30,
                       
                    }}
                  >
                    {name}
                  </a>
                </Link>
              </div>
            ))}
            <div className={burgerOpen ? classes.burgerOpen : classes.burgerClose}>

              <div className={classes.burgerLine} ></div>
              <div className={classes.burgerLine} ></div>
              <div className={classes.burgerLine} ></div>
              
            </div>
          </nav>
        </div>
      
    
  );
}
