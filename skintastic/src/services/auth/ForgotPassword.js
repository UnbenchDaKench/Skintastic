import { Auth } from "aws-amplify";

// Send confirmation code to user's email
export async function forgotPassword(username) {
  try {
    const data = await Auth.forgotPassword(username);
    console.log(data);
    return true
  } catch (err) {
    console.log(err);
    return false
  }
}

// Collect confirmation code and new password
export async function forgotPasswordSubmit(username, code, newPassword) {
  try {
    const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
    console.log(data);
    return true
  } catch (err) {
    console.log(err);
    return false
  }
}
