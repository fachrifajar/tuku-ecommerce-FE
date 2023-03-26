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

const Register = () => {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // if (newValue == 0) {
    //   handleClearSeller();
    // }

    // if (newValue != 0) {
    //   handleClearCustomer();
    // }
  };

  const [fullname, setFullname] = React.useState(null);
  const [isErrName, setIsErrName] = React.useState(false);
  const [errMsgName, setErrMsgName] = React.useState("");

  const [email, setEmail] = React.useState(null);
  const [isErrEmail, setIsErrEmail] = React.useState(false);
  const [errMsgEmail, setErrMsgEmail] = React.useState("");

  const [password, setPassword] = React.useState(null);
  const [isErrPassword, setIsErrPassword] = React.useState(false);
  const [errMsgPassword, setErrMsgPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [isLoadingUser, setIsLoadingUser] = React.useState(false);
  let isDisabledUser = true;

  const [showModal, setShowModal] = React.useState(false);
  const [showModalSuccess, setShowModalSuccess] = React.useState(false);
  const [errBackendSeller, setErrBackendSeller] = React.useState(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeName = (event) => {
    const name = event.target.value;
    const strRegex = /^(?!(?:.*\s){3})[A-Za-z][A-Za-z\s\d]{2,19}$/;
    if (!strRegex.test(name)) {
      setErrMsgName(
        "Name must contain only letters & numbers. Start with a letter and be between 3-20 characters long."
      );
      setIsErrName(true);
      setFullname(null);
      return;
    }
    setIsErrName(false);
    setFullname(name);
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

  const handleChangePassword = (event) => {
    const newValue = event.target.value;
    const strRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strRegex.test(newValue)) {
      setErrMsgPassword(
        "Password must contain combination of letters, numbers, uppercase and symbol"
      );
      setIsErrPassword(true);
      setPassword(null);
      return;
    }
    setIsErrPassword(false);
    setPassword(newValue);
  };

  if (fullname && email && password) {
    isDisabledUser = false;
  }

  const handleRegisterUser = async () => {
    try {
      setIsLoadingUser(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/register`,
        {
          username: fullname,
          email,
          password,
        }
      );
      setIsLoadingUser(false);
      setShowModalSuccess(true);
      router.push("/auth/login");
    } catch (error) {
      console.log("handleRegisterUserERROR", error);
      setIsLoadingUser(false);
      setErrBackendSeller(error?.response?.data?.message?.message);
      setShowModal(true);
    }
  };

  const renderCustomer = (
    <>
      {isErrName ? (
        <MyTextField
          error
          id="standard-error-helper-text"
          helperText={errMsgName}
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={fullname}
          onChange={handleChangeName}
          InputProps={{
            inputProps: {
              maxLength: 20,
            },
          }}
        />
      ) : (
        <MyTextField
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={fullname}
          onChange={handleChangeName}
          InputProps={{
            inputProps: {
              maxLength: 20,
            },
          }}
        />
      )}

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
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={handleChangePassword}
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
          value={password}
          type={showPassword ? "text" : "password"}
          helperText={errMsgPassword}
          variant="outlined"
          onChange={handleChangePassword}
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
            onClick={handleRegisterUser}
            loading={isLoadingUser}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "20px",
              marginTop: "50px",
              background: "#DB3022",
              color: "black",
            }}>
            {isLoadingUser ? "Loading..." : "  Register"}
          </MyLoadingButton>
        ) : (
          <MyButton
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegisterUser}>
            Register
          </MyButton>
        )
      ) : (
        <MyButton
          disabled
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegisterUser}>
          Register
        </MyButton>
      )}
    </>
  );

  const [fullnameSeller, setFullnameSeller] = React.useState(null);
  const [isErrNameSeller, setIsErrNameSeller] = React.useState(false);
  const [errMsgNameSeller, setErrMsgNameSeller] = React.useState("");

  const [emailSeller, setEmailSeller] = React.useState(null);
  const [isErrEmailSeller, setIsErrEmailSeller] = React.useState(false);
  const [errMsgEmailSeller, setErrMsgEmailSeller] = React.useState("");

  const [passwordSeller, setPasswordSeller] = React.useState(null);
  const [isErrPasswordSeller, setIsErrPasswordSeller] = React.useState(false);
  const [errMsgPasswordSeller, setErrMsgPasswordSeller] = React.useState("");
  const [showPasswordSeller, setShowPasswordSeller] = React.useState(false);

  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [isErrPhoneNumber, setIsErrPhoneNumber] = React.useState(false);
  const [errMsgPhoneNumber, setErrMsgPhoneNumber] = React.useState("");

  const [StoreName, setStoreName] = React.useState(null);
  const [isErrStoreName, setIsErrStoreName] = React.useState(false);
  const [errMsgStoreName, setErrMsgStoreName] = React.useState("");

  const [isLoadingSeller, setIsLoadingSeller] = React.useState(false);

  // const [showModal, setShowModal] = React.useState(false);
  // const [showModalSuccess, setShowModalSuccess] = React.useState(false);
  // const [errBackendSeller, setErrBackendSeller] = React.useState(null);

  let isDisabledSeller = true;

  const handleClickShowPasswordSeller = () => {
    setShowPasswordSeller(!showPasswordSeller);
  };

  const handleChangeNameSeller = (event) => {
    const name = event.target.value;
    const strRegex = /^(?!(?:.*\s){3})[A-Za-z][A-Za-z\s\d]{2,19}$/;
    if (!strRegex.test(name)) {
      setErrMsgNameSeller(
        "Name must contain only letters & numbers. Start with a letter and be between 3-20 characters long."
      );
      setIsErrNameSeller(true);
      setFullnameSeller(null);
      return;
    }
    setIsErrNameSeller(false);
    setFullnameSeller(name);
  };

  const handleChangeEmailSeller = (event) => {
    const newValue = event.target.value;
    const strRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!strRegex.test(newValue)) {
      setErrMsgEmailSeller("Please input Valid Email Address.");
      setIsErrEmailSeller(true);
      setEmailSeller(null);
      return;
    }
    setIsErrEmailSeller(false);
    setEmailSeller(newValue);
  };

  const handleChangePasswordSeller = (event) => {
    const newValue = event.target.value;
    const strRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strRegex.test(newValue)) {
      setErrMsgPasswordSeller(
        "Password must contain combination of letters, numbers, uppercase and symbol"
      );
      setIsErrPasswordSeller(true);
      setPasswordSeller(null);
      return;
    }
    setIsErrPasswordSeller(false);
    setPasswordSeller(newValue);
  };

  const handleChangePhoneNumber = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    if (newValue.toString().length < 12) {
      setErrMsgPhoneNumber(
        "Please input a valid phone number with at least 12 digits."
      );
      setIsErrPhoneNumber(true);
      setPhoneNumber(null);
      return;
    }
    setPhoneNumber(newValue);
    setIsErrPhoneNumber(false);
  };

  const handleStoreName = (event) => {
    const newValue = event.target.value;
    const strRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]*$/;
    if (!strRegex.test(newValue)) {
      setErrMsgStoreName(
        "Store name must contain only combination of letters & numbers, letters only"
      );
      setIsErrStoreName(true);
      setStoreName(null);
      return;
    }
    setIsErrStoreName(false);
    setStoreName(newValue);
  };

  const handleClose = () => {
    //MODAL ERROR
    setShowModal(false);
  };

  const handleCloseSuccess = () => {
    //MODAL SUCCESS
    setShowModalSuccess(false);
  };

  if (
    fullnameSeller &&
    emailSeller &&
    passwordSeller &&
    phoneNumber &&
    StoreName
  ) {
    isDisabledSeller = false;
  }

  const handleRegisterSeller = async () => {
    try {
      setIsLoadingSeller(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/register`,
        {
          username: fullnameSeller,
          email: emailSeller,
          password: passwordSeller,
          phone_number: phoneNumber,
          store_name: StoreName,
        }
      );
      setIsLoadingSeller(false);
      setShowModalSuccess(true);
      router.push("/auth/login");
    } catch (error) {
      setIsLoadingSeller(false);
      console.log("error user register", error);
      setErrBackendSeller(error?.response?.data?.message?.message);
      setShowModal(true);
    }
  };

  const renderSeller = (
    <>
      {isErrNameSeller ? (
        <MyTextField
          error
          id="standard-error-helper-text"
          helperText={errMsgNameSeller}
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={fullnameSeller}
          onChange={handleChangeNameSeller}
          InputProps={{
            inputProps: {
              maxLength: 20,
            },
          }}
        />
      ) : (
        <MyTextField
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={fullnameSeller}
          onChange={handleChangeNameSeller}
          InputProps={{
            inputProps: {
              maxLength: 20,
            },
          }}
        />
      )}

      {isErrEmailSeller ? (
        <MyTextField
          error
          id="standard-error-helper-text"
          helperText={errMsgEmailSeller}
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={emailSeller}
          onChange={handleChangeEmailSeller}
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
          value={emailSeller}
          onChange={handleChangeEmailSeller}
          InputProps={{
            inputProps: {
              maxLength: 40,
            },
          }}
        />
      )}

      {!isErrPhoneNumber ? (
        <MyTextField
          label="Phone Number"
          fullWidth
          variant="outlined"
          margin="normal"
          value={phoneNumber}
          onChange={handleChangePhoneNumber}
          InputProps={{
            inputProps: {
              maxLength: 15,
            },
          }}
        />
      ) : (
        <MyTextField
          error
          fullWidth
          margin="normal"
          id="outlined-error-helper-text"
          label="Phone Number"
          helperText={errMsgPhoneNumber}
          variant="outlined"
          value={phoneNumber}
          onChange={handleChangePhoneNumber}
          InputProps={{
            inputProps: {
              maxLength: 15,
            },
          }}
        />
      )}

      {isErrStoreName ? (
        <MyTextField
          error
          id="standard-error-helper-text"
          helperText={errMsgStoreName}
          label="Store Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={StoreName}
          onChange={handleStoreName}
          InputProps={{
            inputProps: {
              maxLength: 30,
            },
          }}
        />
      ) : (
        <MyTextField
          label="Store Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={StoreName}
          onChange={handleStoreName}
          InputProps={{
            inputProps: {
              maxLength: 30,
            },
          }}
        />
      )}

      {!isErrPasswordSeller ? (
        <MyTextField
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={passwordSeller}
          type={showPasswordSeller ? "text" : "password"}
          onChange={handleChangePasswordSeller}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPasswordSeller}
                  onMouseDown={handleMouseDownPassword}>
                  {showPasswordSeller ? <Visibility /> : <VisibilityOff />}
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
          value={passwordSeller}
          type={showPasswordSeller ? "text" : "password"}
          helperText={errMsgPasswordSeller}
          variant="outlined"
          onChange={handleChangePasswordSeller}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPasswordSeller}
                  onMouseDown={handleMouseDownPassword}>
                  {showPasswordSeller ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            inputProps: {
              maxLength: 30,
            },
          }}
        />
      )}

      {!isDisabledSeller ? (
        isLoadingSeller ? (
          <MyLoadingButton
            fullWidth
            onClick={handleRegisterSeller}
            loading={isLoadingSeller}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "20px",
              marginTop: "50px",
              background: "#DB3022",
              color: "black",
            }}>
            {isLoadingSeller ? "Loading..." : "  Register"}
          </MyLoadingButton>
        ) : (
          <MyButton
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegisterSeller}>
            Register
          </MyButton>
        )
      ) : (
        <MyButton
          disabled
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegisterSeller}>
          Register
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

  const handleClearSeller = () => {
    setFullnameSeller(null);
    setEmailSeller(null);
    setPasswordSeller(null);
    setPhoneNumber(null);
    setStoreName(null);
  };

  const handleClearCustomer = () => {
    setFullname(null);
    setEmail(null);
    setPassword(null);
  };

  return (
    <div>
      <Head>
        <title>Register | Blanja</title>
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
                    Please Sign Up With Your Account
                  </span>
                </Typography>

                <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    indicatorColor="#DB3022">
                    <Tab
                      label="Customer"
                      sx={{
                        "&.Mui-selected": {
                          color: "#DB3022",
                          borderBottom: "2px solid #DB3022",
                        },
                      }}
                    />
                    <Tab
                      label="Seller"
                      sx={{
                        "&.Mui-selected": {
                          color: "#DB3022",
                          borderBottom: "2px solid #DB3022",
                        },
                      }}
                    />
                  </Tabs>
                </Box>

                {value == 0 ? renderCustomer : renderSeller}

                <Typography
                  variant="body1"
                  sx={{ marginTop: "30px", fontSize: 14, marginTop: "30px" }}>
                  Already have an Account ?{" "}
                  <span
                    style={{ cursor: "pointer", color: "#DB3022" }}
                    onClick={() => router.push("/auth/login")}>
                    Sign In
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

export default Register;
