import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import "./UserRegistration.scss";
import {
  signUp,
  resendVerificationCode,
  confirmSignUp,
} from "../../../services/auth/Signup";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

function UserRegistration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const navigate = useNavigate();

  const countries = [
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    // Add more countries as needed
  ];

  const states = [
    { name: "New York", code: "NY" },
    { name: "California", code: "CA" },
    // Add more states/provinces as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVerificationCodeChange = (e) => {
    const { value } = e.target;
    setVerificationCode(value);
  };

  const handleCountryChange = (_, newValue) => {
    setFormData({
      ...formData,
      country: newValue,
    });
  };

  const handleStateChange = (_, newValue) => {
    setFormData({
      ...formData,
      stateProvince: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., send data to a server)
    if(formData.password === formData.confirmPassword && passwordError ){
        signUp(formData)
          .then(() => {
            setVerificationSent(true);
          })
          .catch((err) => {
            console.log("Error signing up!", err);
          });
    }
    else{
        alert("passwords don't match")
    }
  };

  const sendCode = () => {
    confirmSignUp(formData.email, verificationCode)
      .then(() => navigate("/"))
      .catch((err) => {
        alert("That code is incorrect!");
        console.log(err);
      });
  };

  const resendCode = () => {
    resendVerificationCode(formData.email);
  };

  const passwordError =
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])/.test(
      formData.password
    ) && formData.password.length >= 8;
  console.log(passwordError);

  const confirmPasswordError =
    formData.password !== formData.confirmPassword &&
    formData.confirmPassword !== "";

  console.log(verificationCode);
  return (
    <div className="Signup">
      {!verificationSent && (
        <Paper
          elevation={3}
          sx={{
            mt: "8vh",
            width: "40vw",
            height: "80vh",
            // zIndex: "1"
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "20px",
              width: "90%",
              marginBottom: "5vh",
              marginTop: "5vh",
            }}
            startIcon={<GoogleIcon />}
            onClick={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
              })
            }
          >
            Signup With Google
          </Button>
          <Divider />
          <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  required
                  helperText={
                    passwordError ? (
                      ""
                    ) : (
                      <>
                        Uppercase letter
                        <br />
                        Lowercase Letter
                        <br />
                        Number
                        <br />
                        SpecialCharacter
                        <br />
                        At least 8 characters
                      </>
                    )
                  }
                  error={formData.password ? !passwordError : false}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  helperText={
                    confirmPasswordError ? "Passwords do not match!" : ""
                  }
                  error={confirmPasswordError ? true : false}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      )}
      {verificationSent && (
        <Paper
          elevation={3}
          sx={{
            mt: "8vh",
            width: "40vw",
            height: "40vh",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              mt: "3vh",
            }}
          >
            Verify Email
          </Typography>
          <Typography
            sx={{
              mt: "3vh",
              ml: "5%",
            }}
          >
            Please enter the Verification code sent to your email.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              name="verificationCode"
              onChange={handleVerificationCodeChange}
              variant="outlined"
              sx={{
                width: "70%",
              }}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{
                ml: "1%",
              }}
              onClick={sendCode}
            >
              send
            </Button>
          </Box>

          {/* <Button
            type="button"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={resendCode}
          >
            Resend Code
          </Button> */}
          <Box
            sx={{
              display: "flex",
              ml: "5%",
            }}
          >
            <Button
              onClick={resendCode}
              sx={{
                alignSelf: "flexstart",
              }}
            >
              resend code
            </Button>
          </Box>
        </Paper>
      )}
    </div>
  );
}

export default UserRegistration;
