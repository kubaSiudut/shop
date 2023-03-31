import classes from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react"
import Cookies from "js-cookie";

export default function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error,setError] = useState(false)
  const router = useRouter();
 

  const loginAuthHandler = async () => {
    const data = { email: email, password: pass };

    const result = await signIn('credentials', { email: email, password: pass,redirect: false })
    console.log(result)
    const session = await getSession()
    console.log(session)

    if(!result.error){
      router.push({
        pathname: "/readyproducts ",
      });

    }

   

  }

  const loginHandler = async () => {
    const data = { email: email, pass: pass };
 
     
    try {
      console.log("wysyłamy coś ");
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      console.log(response)
      const dataRes = await response.json()

      console.log(dataRes); 

      if(response.status ===200)
      {

        Cookies.set("IsLoggedIn",true)
         router.push({
          pathname: "/user_panel",
        });
      }

      if(response.status ===409)
      {
        console.log("Błędne dane logowania")
        setError(true)
      }
    } catch (error) {
      console.log("wystapił błąd podczas wysyłania na serwer ");
    }
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.txtField}>
        <label>Email </label>
        <input
          className={classes.txtInput}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className={classes.txtField}>
        <label>Hasło</label>
        <input
          type="password"
          autocomplete="off"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          className={classes.txtInput}
        />
      </div>
      {error&& <p className={classes.error}>Błędne dane, email lub hasło</p>}

      <button className={classes.buttonFwd} onClick={loginHandler}>
        Zaloguj się
      </button>

      <button
        className={classes.buttonRwd}
        onClick={() => {
          router.push({
            pathname: "/signup",
          });
        }}
      >
        Rejestracja
      </button>
    </div>
  );
}
