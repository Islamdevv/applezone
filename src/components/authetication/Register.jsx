import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { signWithGoogle, register } = useAuth();

  const [userValue, setUserValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChangeValues(e) {
    let obj = { ...userValue, [e.target.name]: e.target.value };
    setUserValue(obj);
  }

  async function handleRegisterWithEmailAndPassword() {
    try {
      await register(userValue.email, userValue.password);
      navigate("/menu");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Box
      sx={{
        p: "70px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {error ? (
        <Alert sx={{ width: "30%", marginBottom: "20px" }} severity="error">
          {error}
        </Alert>
      ) : (
        ""
      )}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          width: "400px",
          background: "#d4d7d8",
          p: "40px 0",
          borderRadius: "10px",
        }}
      >
        <TextField
          sx={{ width: "100%" }}
          id="standard-basic"
          label="Name"
          variant="standard"
        />
        <TextField
          sx={{ width: "100%" }}
          id="standard-basic"
          label="LastName"
          variant="standard"
        />
        <TextField
          onChange={handleChangeValues}
          sx={{ width: "100%" }}
          id="standard-basic"
          label="Email"
          variant="standard"
          name="email"
        />
        <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            onChange={handleChangeValues}
            id="standard-adornment-password"
            name="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          onClick={handleRegisterWithEmailAndPassword}
          sx={{
            width: "100%",
            p: "10px 0",
            background: "#1D53C5",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
          variant="contained"
        >
          sign up
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{ width: "100px", height: "1.5px", background: "gray" }}
          ></div>
          <Typography>или</Typography>
          <div
            style={{ width: "100px", height: "1.5px", background: "gray" }}
          ></div>
        </Box>
        <Button onClick={() => signWithGoogle()} variant="contained">
          <GoogleIcon />
          <Typography sx={{ p: "0 15px" }}>Google</Typography>
        </Button>
      </Container>
    </Box>
  );
};

export default Register;
