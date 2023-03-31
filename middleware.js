import { NextResponse } from "next/server";
 
import * as jose from "jose";

// const jsonwebtoken = require("jsonwebtoken")

export default async function middleware(req) {
  console.log("midllewer dfghjkl");
  const secret = process.env.SECRET;
  const url = req.url;
  if (req.nextUrl.pathname.startsWith("/user_panel")) {
    const jwt = req.cookies.get("OursiteJWT");
    console.log("to jest nasz token jwt:");
    console.log(jwt);

    if (jwt === undefined) {
      console.log("proszę się zalogowac !!");
      const url = new URL("/login", req.url);
      url.searchParams.set("from_middleware", true);
      return NextResponse.redirect(url);
    }


    try {
      console.log("Przystępujemy do weryfikacji ");
      //   const user = verifyAuth(jwt, secret);

      // const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret)

      const { payload } = await jose.jwtVerify(
        jwt,
        new TextEncoder().encode(secret)
      );
      console.log("Użytkownik zweryfikowany");
      console.log(payload);
      return NextResponse.next();
    } catch (error) {
      console.log("proszę się zalogowac !");
      console.log(error);
      const url = new URL("/login", req.url);
      url.searchParams.set("from_middleware", true);
      return NextResponse.redirect(url);
    }
  }




  if (
    url.includes("/ordersListPage") ||
    url.includes("/orderDetails") ||
    url.includes("/deleteProduct") ||
    url.includes("/addNewProduct")
  ) {
    const jwt = req.cookies.get("OursiteJWT");
    console.log(" middleware *****to jest nasz token jwt: ");
    console.log(jwt);

 
  

    if (jwt === undefined  )  {
      console.log("proszę się zalogowac !!");
      const url = new URL("/login", req.url);
      url.searchParams.set("from_middleware", true);
      return NextResponse.redirect(url);
    }

 
    try {
      console.log("Przystępujemy do weryfikacji ");

      const { payload } = await jose.jwtVerify(
        jwt,
        new TextEncoder().encode(secret)
      );
      console.log("Użytkownik zweryfikowany");
      console.log(payload);
      return NextResponse.next();
    } catch (error) {
      console.log("proszę się zalogowac !");
      console.log(error);
      const url = new URL("/login", req.url);
      url.searchParams.set("from_middleware", true);
      return NextResponse.redirect(url);
    }
  }

  if (req.nextUrl.pathname.startsWith("/login")) {
  }
}

// export default function middleware(req) {
//   const secret = bestSecretKey69;
//   if (req.nextUrl.pathname.startsWith("/dashboard")) {
//     // This logic is only applied to /about
//     const { cookies } = req;
//     const jwt = cookies.OursiteJWT;
//     const url = req.url;
//     if (url.includes("/dashboard")) {
//       if (jwt === undefined) {
//         return NextResponse.redirect("/", req.url);
//       }
//       console.log(jwt);
//     }

//     try {
//       const user = verify(jwt, secret);
//       console.log(user);
//       // return NextResponse.next()
//     } catch (error) {
//       return NextResponse.redirect("/", req.url);
//     }
//   }
// }
export const config = {
  matcher: [
    "/user_panel",
    "/ordersListPage",
    "/orderDetails/:path*",
    "/addNewProduct",
    "/deleteProduct",
  ],
};
