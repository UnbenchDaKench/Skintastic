import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Autocomplete,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import "./Login.scss";
import { signIn } from "../../../services/auth/Login"
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    console.log(formData.email, formData.password);
    signIn(formData.email, formData.password)
    
  };

  
  const passwordError =
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])/.test(
      formData.password
    ) && formData.password.length >= 8;

  const confirmPasswordError =
    formData.password !== formData.confirmPassword &&
    formData.confirmPassword !== "";

    useEffect(()=>{
        Auth.currentAuthenticatedUser()
          .then(() => {navigate("/");})
          .catch(() => {
            console.log("not signed in yet!")
          });
    })

  return (
    <div className="Login">
      <Paper
        elevation={3}
        sx={{
          mt: "8vh",
          width: "40vw",
          height: "60vh",
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
          Login With Google
        </Button>
        <Divider />
        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <Grid container spacing={3}>
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
                onChange={handleChange}
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
              type="button"
              sx={{
                alignSelf: "flex-end",
              }}
              onClick={() => navigate("/forgot-password")}
            >
              forgot yourpassword?
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px", width: "30%", alignSelf: "center" }}
            >
              Login
            </Button>
            <Button
              type="button"
              sx={{
                alignSelf: "center",
                mt: "8%"
              }}
              onClick={() => navigate("/signup")}
            >
              Click Here to signup!
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
