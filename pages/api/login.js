const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
import { compare } from "bcrypt";
import {sign} from 'jsonwebtoken'
import { serialize } from "cookie";

const secret = process.env.SECRET;


export default async function login(req, res) {
  if (req.method === "POST") {
    // console.log("jest  zapytanie POST");
    // console.log(req.body);
    const db = await sqlite.open({
      filename: "./mydb.sqlite",
      driver: sqlite3.Database,
    });

  try {
    console.log('próba pobrania z bazy ')
    console.log(req.body.email)

    const ClientLoginAtempt = await db.get(`SELECT * FROM Clients WHERE email= ?`,req.body.email);

    console.log('pobrano z bazy')
    console.log(ClientLoginAtempt)
    if(ClientLoginAtempt === undefined){
      console.log('błędne dane ')
      res.status(409).json({ message: 'Błędne dane ', body: 'prosze podać poprawne dane ' })
    }


    const match = await compare(req.body.pass,ClientLoginAtempt.password)

    console.log("rezultat prównania ")
    console.log(match)
 
    if(match=== true)
    {
      
       console.log('udało się zalogować ')

       const  claims = {sub: ClientLoginAtempt.id,
        firstname: ClientLoginAtempt.firstName, 
        familyName: ClientLoginAtempt.familyName,
         email: ClientLoginAtempt.email,
         isAdmin: ClientLoginAtempt.id ===1,
         exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        };
       const jwt = sign(claims,  secret)
      //  res.status(200).json({authToken: jwt  })
       const serialised = serialize("OursiteJWT", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      console.log(serialised)
  
      res.setHeader("Set-Cookie", serialised);
  
      res.status(200).json({ message: "Success!",
    body:{
      firstName: ClientLoginAtempt.firstName,
      familyName: ClientLoginAtempt.familyName,
      email: ClientLoginAtempt.email,
      isAdmin: ClientLoginAtempt.id ===1
      
    }
    });


    }else{
        
        console.log('błędne dane ')
        res.status(409).json({ message: 'Błędne dane ', body: 'prosze podać poprawne dane ' })
    }

 
    
  } catch (error) {
    
  }
}
else{
    res.status(405).json({message: 'We only support POST'})
}
}
