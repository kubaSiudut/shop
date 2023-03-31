
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
export default async function addOrder(req , res) {

    
   
    if(req.method === 'POST'){
        console.log("jest  ezapytanie POST")
        const db = await sqlite.open({
            filename: './mydb.sqlite',
            driver: sqlite3.Database
          })

        //        try {
        //     const result =await db.run("INSERT INTO Clients (firstName, familyNAme, company ,postalCode,street, city ,email,phone) VALUES(?,?,?,?,?,?,?,?)",
        //           req.body.contact.firstName,
        //           req.body.contact.lastName,
        //           req.body.contact.company,
        //           req.body.contact.postalCode,
        //           req.body.contact.street,
        //           req.body.contact.city,
        //           req.body.contact.email,
        //           req.body.contact.phoneNumber)
        
        // } catch (error) {
        //     console.log("jest  error")
        //     console.log(error)
        // }

        try {
            console.log("zaczynam dodawac do Orders")
            const result =await db.run("INSERT INTO Orders (price ,payment,delivery,orderDescription ,firstName, familyName,company,street,postalCode,city, email, phone, addInfo, orderStatus) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                  req.body.price,
                  req.body.payment,
                  req.body.delivery,
                  req.body.orderDescription,
                  req.body.contact.firstName,
                  req.body.contact.lastName,
                  req.body.contact.company,
                  req.body.contact.street,
                  req.body.contact.postalCode,
                  req.body.contact.city,
                  req.body.contact.email,
                  req.body.contact.phoneNumber,
                  req.body.contact.addInfo,
                  'otrzymano'
                  )
        
        } catch (error) {
            console.log("jest  error")
            console.log(error)
        }


       
                 res.json("dodano zamówienie ");
      
      
    }

 
} 