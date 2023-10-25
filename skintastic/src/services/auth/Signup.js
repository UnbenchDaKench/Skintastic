import { Auth } from "aws-amplify";

export async function signUp(formData){
    try{
        const { user } = await Auth.signUp({
            username: formData.email,
            password: formData.password,
            attributes: {
                email: formData.email
            },
            autoSignIn: {
                enabled:true
            }
        })
        console.log(user)
    } catch (error){
        console.log('error signing up:', error)
    }
}

export async function confirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
}

export async function resendVerificationCode(username){
    try{
        await Auth.resendSignUp(username)
    }catch(error){
        console.log("error resending code", error)
    }
}