import React from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";

import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  Modal,
  Tabs,
  Tab,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

import { styled } from "@mui/material/styles";

const MyCard = styled(Card)({
  margin: "auto",
  marginTop: "10%",
  width: "50vh",
  textAlign: "center",
  borderRadius: "40px",
  padding: "25px",
});

const MyModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const MyButton = styled(Button)({
  borderRadius: "20px",
  marginTop: "50px",
  background: "#DB3022",
  color: "white",
  "&:hover": {
    background: "#DB2522",
    border: "none",
  },
});

const MyLoadingButton = styled(LoadingButton)({
  borderRadius: "20px",
  marginTop: "20px",
  background: "#DB3022",
  color: "white",
  "&:hover": {
    background: "#DB2522",
    border: "none",
  },
});

const MyTextField = styled(TextField)({
  "& label": {
    // color: "#46505c",
    // marginTop: "-6px",
  },
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    // height: "40px",
    "& fieldset": {
      borderColor: "#8692a6",
    },
    "&:hover fieldset": {
      borderColor: "#DB3022",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#DB3022",
    },
  },
  marginBottom: "-5px",
});

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = React.useState(null);
  const [isErrEmail, setIsErrEmail] = React.useState(false);
  const [errMsgEmail, setErrMsgEmail] = React.useState("");

  const [password, setPassword] = React.useState(null);
  const [isErrPassword, setIsErrPassword] = React.useState(false);
  const [errMsgPassword, setErrMsgPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [isLoadingUser, setIsLoadingUser] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);
  const [showModalSuccess, setShowModalSuccess] = React.useState(false);
  const [errBackendSeller, setErrBackendSeller] = React.useState(null);

  let isDisabledUser = true;

  const handleClose = () => {
    //MODAL ERROR
    setShowModal(false);
  };

  const handleCloseSuccess = () => {
    //MODAL SUCCESS
    setShowModalSuccess(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeEmail = (event) => {
    const newValue = event.target.value;
    const strRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!strRegex.test(newValue)) {
      setErrMsgEmail("Please input Valid Email Address.");
      setIsErrEmail(true);
      setEmail(null);
      return;
    }
    setIsErrEmail(false);
    setEmail(newValue);
  };

  if (email && password) {
    isDisabledUser = false;
  }

  const handleLogin = async () => {
    try {
      setIsLoadingUser(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      setIsLoadingUser(false);
      setShowModalSuccess(true);

      setCookie("token", response?.data?.data?.accessToken);
      setCookie("profile", JSON.stringify(response?.data?.data));
      localStorage.setItem("token", response?.data?.data?.accessToken);
      localStorage.setItem("profile", JSON.stringify(response?.data?.data));

      router.push("/");
    } catch (error) {
      console.log("handleLoginERROR", error);
      setIsLoadingUser(false);
      setErrBackendSeller(error?.response?.data?.message?.message);
      setShowModal(true);
    }
  };

  const renderCustomer = (
    <>
      {isErrEmail ? (
        <MyTextField
          error
          id="standard-error-helper-text"
          helperText={errMsgEmail}
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={handleChangeEmail}
          InputProps={{
            inputProps: {
              maxLength: 40,
            },
          }}
        />
      ) : (
        <MyTextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={handleChangeEmail}
          InputProps={{
            inputProps: {
              maxLength: 40,
            },
          }}
        />
      )}

      {!isErrPassword ? (
        <MyTextField
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            inputProps: {
              maxLength: 30,
            },
          }}
        />
      ) : (
        <MyTextField
          error
          fullWidth
          margin="normal"
          id="standard-error-helper-text"
          label="Password"
          type={showPassword ? "text" : "password"}
          helperText={errMsgPassword}
          variant="outlined"
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            inputProps: {
              maxLength: 30,
            },
          }}
        />
      )}

      {!isDisabledUser ? (
        isLoadingUser ? (
          <MyLoadingButton
            fullWidth
            onClick={handleLogin}
            loading={isLoadingUser}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "20px",
              marginTop: "50px",
              background: "#DB3022",
              color: "black",
            }}>
            {isLoadingUser ? "Loading..." : "  Login"}
          </MyLoadingButton>
        ) : (
          <MyButton
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}>
            Login
          </MyButton>
        )
      ) : (
        <MyButton
          disabled
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}>
          Login
        </MyButton>
      )}
    </>
  );

  const renderModalErr = (
    <>
      <MyModal open={showModal} onClose={handleClose}>
        <MyCard>
          <CardContent>
            <CloseIcon
              fontSize="small"
              sx={{
                backgroundColor: "red",
                color: "white",
                width: "100px",
                height: "100px",
                borderRadius: "50px",
              }}
            />

            <Typography
              variant="h5"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "red",
                fontWeight: "bold",
                marginTop: "20px",
              }}>
              ERROR
            </Typography>
            <hr />

            {errBackendSeller ? (
              <Typography variant="body1" sx={{ margin: "20px" }}>
                <strong>{errBackendSeller.toUpperCase()}</strong>
              </Typography>
            ) : null}
          </CardContent>
        </MyCard>
      </MyModal>
    </>
  );

  const renderModalSuccess = (
    <>
      <MyModal open={showModalSuccess} onClose={handleCloseSuccess}>
        <MyCard>
          <CardContent>
            <DoneIcon
              fontSize="small"
              sx={{
                backgroundColor: "green",
                color: "white",
                width: "100px",
                height: "100px",
                borderRadius: "50px",
              }}
            />

            <Typography
              variant="h5"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "green",
                fontWeight: "bold",
                marginTop: "20px",
              }}>
              SUCCESS
            </Typography>
          </CardContent>
        </MyCard>
      </MyModal>
    </>
  );

  return (
    <div>
      <Head>
        <title>Login | Blanja</title>
        <link rel="icon" href="/images/logo.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <style>{`
          body {
            background-color: #59faf2;
          }
        `}</style>
      </Head>

      <main>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100vh">
          <Grid item xs={12} sm={8} md={6}>
            <Card
              sx={{
                width: "70vh",
                height: "auto",
                margin: "100px auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
                overflow: "auto",
              }}>
              <CardContent
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  padding: "50px",
                  overflow: "auto",
                }}>
                <img
                  src="/images/icon-tuku.png"
                  style={{
                    width: "40%",
                    height: "40%",
                    marginBottom: "20px",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      flexGrow: 1,
                      textAlign: "center",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 20,
                      marginBottom: "30px",
                    }}>
                    Please Login With Your Credentials
                  </span>
                </Typography>

                {renderCustomer}

                <Typography
                  variant="body1"
                  sx={{ marginTop: "30px", fontSize: 14, marginTop: "30px" }}>
                  Dont have an Account ?{" "}
                  <span
                    style={{ cursor: "pointer", color: "#DB3022" }}
                    onClick={() => router.push("/auth/register")}>
                    Sign Up
                  </span>
                </Typography>
                {renderModalErr}
                {renderModalSuccess}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Login;
