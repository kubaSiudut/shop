import { verify } from "jsonwebtoken";

export default async function verifyAuth(token,secret) {
    verify(token,secret);




}
