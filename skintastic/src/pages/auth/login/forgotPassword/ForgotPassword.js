import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Box, Grid } from "@mui/material";
import {
  forgotPassword,
  forgotPasswordSubmit,
} from "../../../../services/auth/ForgotPassword";
import "./ForgotPassword.scss";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const sendCode = () => {
    forgotPassword(email)
      .then((codeSent) => {
        if (codeSent) {
          setVerificationSent(true);
        } else {
          alert("There is no account with that email!");
        }
      })
      .catch((err) => {
        console.log("There was an error sending the verification code", err);
      });
  };

  const resetPassword = () =>{
    if(password === confirmPassword && passwordError){
        forgotPasswordSubmit(email, verificationCode, password)
        .then((passwordReset) => {
            if(passwordReset){
                navigate("/login")
            }else{
                alert("Error Resetting password")
            }
        })
        .catch((err) =>{
            console.log("Could not complete the password reset", err)
        })
    }
  }
  const passwordError =
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])/.test(password) &&
    password.length >= 8;
  console.log(passwordError);

  const confirmPasswordError =
    password !== confirmPassword && confirmPassword !== "";

  return (
    <div className="ForgotPassword">
      {!verificationSent && (
        <Paper
          elevation={3}
          sx={{
            mt: "8vh",
            width: "40vw",
            height: "30vh",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              mt: "5vh",
            }}
          >
            Reset Password
          </Typography>
          <Typography
            sx={{
              mt: "3vh",
            }}
          >
            Please enter your email
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              name="email"
              onChange={handleEmailChange}
              variant="outlined"
              value={email}
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
        </Paper>
      )}
      { verificationSent && (
        <Paper
          elevation={3}
          sx={{
            mt: "8vh",
            width: "40vw",
            height: "60vh",
          }}
        >
          <form onSubmit={resetPassword} style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom sx={{ mb: "8%" }}>
              Reset Password
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Code"
                  name="verificationCode"
                  type="text"
                  onChange={handleVerificationCodeChange}
                  value={verificationCode}
                  variant="outlined"
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
                  value={password}
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
                  error={password ? !passwordError : false}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={confirmPassword}
                  required
                  helperText={
                    confirmPasswordError ? "Passwords do not match!" : ""
                  }
                  error={confirmPasswordError ? true : false}
                  onChange={handleConfirmPasswordChange}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: "20px", width: "30%", alignSelf: "center" }}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Paper>
      )}
    </div>
  );
}

export default ForgotPassword;
