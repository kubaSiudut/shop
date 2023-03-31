import classes from "./ContactForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignupForm(props) {

  const [emailExist,setEmailExist] = useState(false)
  const router = useRouter();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const postalCodeRegEx = /^[0-9]{2}-[0-9]{3}/

  const SignupSchema = yup.object().shape({
    firstName: yup.string().required("Proszę podać imię"),
    lastName: yup.string().required("Proszę podać nazwisko"),
    street: yup.string().required(" Proszę podać ulicę "),
    street: yup.string().required(" Proszę podać ulicę "),
    city: yup.string().required(" Proszę podać misto"),
    addInfo: yup.string(),
    company: yup.string(),
    regulamin: yup.bool().oneOf([true], 'Akceptacja regulaminu jest wymagana '),
    email: yup.string().email("prosze podac poprawny email np. jan.kowalski@gmail.com").required(" Proszę podać email").typeError(" Proszę podać email"),
    phoneNumber: yup.string().matches(phoneRegExp, " tel nr np 555-777-666"),
    postalCode: yup.string().matches(postalCodeRegEx, "Proszę podać kod pocztowy np. 32-823"),
    pass: yup
    .string()
    .min(8, 'Hasło musi zawierać co najmniej 8 znaków')
    .matches(/[0-9]/, 'Hasło musi zawierać liczbę')
    .matches(/[a-z]/, 'Hasło musi zawierać małą literę ')
    .matches(/[A-Z]/, 'Hasło musi zawierać wielką literę ')
    ,
    confirm: yup .string() .oneOf([yup.ref('pass'), null], 'Hasła musza być zgodne '),
 
   
    
    
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
  
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
  
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });

      console.log(response )
      if(response.status ===409)
      {
        setEmailExist(true);
      }
      if(response.status ===201)
      {
        router.push({
          pathname: "/signupSucces",
        });
      }
      
    } catch (error) {
      console.log('wystapił błąd podczas wysyłania na serwer ')
    }

 
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  return (
    <div className={classes.mainContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formContainer}>
          <div className={classes.userInfo}>
            <div className={classes.txtField}>
              <label>Imię </label>
              <input   {...register("firstName")} className={classes.txtInput} />
              {errors.firstName && <p className={classes.error}>{errors.firstName.message}</p>}
            </div>

            <div className={classes.txtField}>
              <label>Nazwisko </label>
              <input {...register("lastName")} className={classes.txtInput} />
              {errors.lastName && <p className={classes.error}>{errors.lastName.message}</p>}
            </div>

            <div className={classes.fullBar}>
              <div className={classes.txtField}>
                <label>Hasło</label>
                <input
                  type='password'
                  autocomplete="off"
                  {...register("pass")}
                  className={classes.txtInput}
                />
                     {errors.pass && <p className={classes.error}>{errors.pass.message}</p>}
              </div>
            </div>

            <div className={classes.fullBar}>
              <div className={classes.txtField}>
                <label>Powtórz hasło </label>
                <input
                autocomplete="off"
                type='password'
                  {...register("confirm")}
                  className={classes.txtInput}
                />
                     {errors.confirm && <p className={classes.error}>{errors.confirm .message}</p>}
              </div>
            </div>

            <div className={classes.fullBar}>
              <div className={classes.txtField}>
                <label>Email </label>
                <input
                  {...register("email")}
                  className={classes.txtInput}
                  onChange={() => { setEmailExist(false)}}
                />
               {errors.email && <p className={classes.error}>{errors.email.message}</p>}
               {emailExist && <p className={classes.error}>{'Podany email jest już w użyciu'}</p>}
              </div>
            </div>

            <div className={classes.fullBar}>
              <div className={classes.txtField}>
                <label>Telefon </label>
                <input
                  {...register("phoneNumber")}
                  className={classes.txtInput}
                />
                {errors.phoneNumber && <p className={classes.error}>{errors.phoneNumber.message}</p>}
              </div>
            </div>
          </div>
          <div className={classes.adressInfo}>
            <div className={classes.fullBar}>
              <div className={classes.txtField}>
                <label>Ulica </label>
                <input
                  {...register("street")}
                  className={classes.txtInput}
                />
                {errors.street && <p className={classes.error}>{errors.street.message}</p>}
              </div>
            </div>

            <div className={classes.fullBar}>
              <div className={classes.txtField}>
                <label>Kod pocztowy </label>
                <input
                  {...register("postalCode")}
                  className={classes.txtInput}
                />
                 {errors.postalCode && <p className={classes.error}>{errors.postalCode.message}</p>}
              </div>
            </div>

            <div className={classes.fullBar}>
              <div className={classes.txtField}>
                <label>Miasto </label>
                <input
                  {...register("city")}
                  className={classes.txtInput}
                />
               {errors.city && <p className={classes.error}>{errors.city.message}</p>}
              </div>
            </div>
          </div>
          <div className={classes.fullBar}>
            <div className={classes.checkBoxField}>
              <input
                type="checkbox"
                {...register("regulamin")}
                className={classes.checkBox}
               
              />
             
              <label> Zapoznałem/am się z treścią <span 
              className={classes.link}
              onClick={() =>{
                console.log("klikKlik")
                window.open("/regulamin", '_blank', 'noopener,noreferrer');
                
              }}>Regulaminu</span>   oraz <span 
              className={classes.link}
              onClick={() =>{
                console.log("klikKlik")
                window.open("/priv_politics", '_blank', 'noopener,noreferrer');
              }}>Polityki Prywatności</span> i akceptuję ich treść. </label>
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            {errors.regulamin && <p className={classes.error}>{errors.regulamin.message}</p>}
          </div>

       
        </div>
        <div
        className={classes.buttonBar}> 
    
        <button
        
        type="submit" 
        className={classes.buttonFwd}
        // onClick={() =>{
        //   props.forward()
        //  }}
        >Dalej
        </button>

            </div>
      </form>
    </div>
  );
}
