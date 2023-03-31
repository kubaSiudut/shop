import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import Error from "next/error";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      //   credentials: {
      //     username: { label: "Username", type: "text", placeholder: "jsmith" },
      //     password: {  label: "Password", type: "password" }
      //   },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const { email, password } = credentials;
        console.log({ email, password });
        //************************************************************************ */
        // Tu jest połączenie z DB i porównanie loginu i hasłą
        const db = await sqlite.open({
          filename: "./mydb.sqlite",
          driver: sqlite3.Database,
        });

        try {
          console.log("próba pobrania z bazy ");
          console.log(email);

          const ClientLoginAtempt = await db.get(
            `SELECT * FROM Clients WHERE email= ?`,
            email
          );

          console.log("pobrano z bazy");
          console.log(ClientLoginAtempt);
          const match = await compare(password, ClientLoginAtempt.password);

          console.log("rezultat prównania ");
          console.log(match);

          if (match === true) {
            console.log("udało się zalogować ");

            const claims = {
              sub: ClientLoginAtempt.id,
              firstname: ClientLoginAtempt.firstName,
              familyName: ClientLoginAtempt.familyName,
            };
            const jwt = sign(claims, "337d70ab-b311-48c8-8752-6256b221b47d");
            return ClientLoginAtempt;
          } else {
            console.log("błędne dane ");
            throw new Error("Invalid data, email or password");
          }
        } catch (error) {}
      },
    }),
  ],

  callbacks: {
    async session({ session, user, token }) {
      console.log("wywołanie sessiion");
      console.log(session, user, token);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("wywołanie jwt");
      console.log(token, user, account, profile, isNewUser);
      // console.log(token )
      return token;
    },
  },
});
