
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
import { hash } from 'bcrypt';


export default async function signup(req , res) {

    
   
    if(req.method === 'POST'){
        console.log("jest  zapytanie POST")
        console.log(req.body)
        const db = await sqlite.open({
            filename: './mydb.sqlite',
            driver: sqlite3.Database
          })
         

          try {
        
            const emailExist = await db.get(`SELECT * FROM Clients WHERE email=?`,req.body.email);
            console.log('pobrano z bazy *********************   ')
            console.log(emailExist)
            if(emailExist=== undefined){
                console.log("zaczynam hashowanie")
                const hashedPassword = await hash(req.body.pass,10);
                console.log("hashowanie zrobione")
                try {

                    console.log("dodaje do bazy ")
                const result =await db.run("INSERT INTO Clients (firstName, familyName,postalCode,street, city ,email,phone,password) VALUES(?,?,?,?,?,?,?,?)",
                      req.body.firstName,
                      req.body.lastName,
                      req.body.postalCode,
                      req.body.street,
                      req.body.city,
                      req.body.email,
                      req.body.phoneNumber,
                      hashedPassword)
    
                      console.log("dodano do bazy")
                      res.status(201).json({message: 'Dodano do bazy '})
    
    
            
            } catch (error) {
                console.log("jest  error")
                console.log(error)
            }

            }else{
                console.log('email w bazie')
                res.status(409).json({message: 'eMail adress already exist in DB'})
            }
 
            
          } catch (error) {
            console.log("błąd przy pobieraniu z bazy ")
            console.log(error)
         
          }

    

          

      


       
           
      
      
    }
    else{
        res.status(405).json({message: 'We only support POST'})
    }

 
} 