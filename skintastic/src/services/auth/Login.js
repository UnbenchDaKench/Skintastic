import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";


export async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password)
    .then()
  } catch (error) {
    console.log("error signing in", error);
  }
}