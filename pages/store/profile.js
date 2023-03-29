/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Navbar from "@/components/organisms/navbar";
import Link from "next/link";
import React from "react";
import Sidebar from "../../components/organisms/sidebar";
import style from "../../styles/pages/homeStyle.module.scss";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
//MUI

import {
  Card,
  CardContent,
  Modal,
  Button,
  Typography,
  Alert,
  Checkbox,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  Paper,
  TextareaAutosize,
  CardMedia,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AiOutlineConsoleSql } from "react-icons/ai";
import DoneIcon from "@mui/icons-material/Done";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const MyButton = styled(Button)({
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
  // marginBottom: "-5px",
});

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

export default function profile(props) {
  const [storeName, setStoreName] = React.useState(null);
  const [isErrStoreName, setIsErrStoreName] = React.useState(false);
  const [errMsgStoreName, setErrMsgStoreName] = React.useState("");

  const [email, setEmail] = React.useState(null);
  const [isErrEmail, setIsErrEmail] = React.useState(false);
  const [errMsgEmail, setErrMsgEmail] = React.useState("");

  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [isErrPhone, setIsErrPhone] = React.useState(false);
  const [errMsgPhone, setErrMsgPhone] = React.useState("");

  const [description, setDescription] = React.useState(null);
  const [isErrDescription, setIsErrDescription] = React.useState(false);
  const [errMsgDescription, setErrMsgDescription] = React.useState("");

  const [profiles, setProfiles] = React.useState(props.profile);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangeDescription = (event) => {
    const name = event.target.value;
    const strRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]{10,100}$/;
    if (!strRegex.test(name)) {
      setErrMsgDescription(
        "Please enter a valid input. The input must contain at least one letter and be between 10 and 100 characters long. Only letters, numbers, and spaces are allowed."
      );
      setIsErrDescription(true);
      setDescription(null);
      return;
    }
    setIsErrDescription(false);
    setDescription(name);
  };

  const handleStoreName = (event) => {
    const name = event.target.value;
    const strRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]{8,30}$/;
    if (!strRegex.test(name)) {
      setErrMsgStoreName(
        "Store Name must contain at least one letter and be at least 8 characters long."
      );
      setIsErrStoreName(true);
      setStoreName(null);
      return;
    }
    setIsErrStoreName(false);
    setStoreName(name);
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

  const handleChangePhoneNumber = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    if (newValue.toString().length < 12) {
      setErrMsgPhone("Please input Valid Phone Number");
      setIsErrPhone(true);
      setPhoneNumber(null);
      return;
    }
    setPhoneNumber(newValue);
    setIsErrPhone(false);
  };

  console.log("profiles->", profiles);

  const [files, setFiles] = React.useState([]);
  const [fixFiles, setFixFiles] = React.useState(null);

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      if (files.length == 0) {
        setFiles([...files, ...acceptedFiles]);
      } else {
        setFiles([...acceptedFiles]);
      }
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = (params) => {
    const selectedFile = params;
    if (files.length === 0) {
      setFiles(selectedFile);
    } else {
      setFiles([]);
      setFiles(selectedFile);
    }
  };

  console.log("storeName===", storeName);
  console.log("email===", email);
  console.log("phoneNumber===", phoneNumber);
  console.log("description===", description);
  console.log("files===", files);

  let isDisabled = true;
  console.log(isDisabled);

  if (files.length || description || storeName || email || phoneNumber) {
    isDisabled = false;
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/edit`,
        {
          email,
          phone_number: phoneNumber,
          store_name: storeName,
          profile_picture: files[0],
          description,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      console.log("response->", response);
      setShowModalSuccess(true);

      setIsLoading(false);

      // const profileData = await axios.get(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/detail`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${props.token}`,
      //     },
      //   }
      // );
      // setIsLoading(false);
      // setProfiles(profileData.data.data);
      // console.log("profileData.data.data", profileData.data.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const [showModalSuccess, setShowModalSuccess] = React.useState(false);

  const handleCloseSuccess = () => {
    //MODAL SUCCESS
    setShowModalSuccess(false);
  };

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
        <title>Store Profile | Tuku</title>
        <link rel="icon" href="/images/logo.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <style>{`
          body {
            background-color: #59faf2;
          }
        `}</style>
      </Head>
      <Navbar />
      {renderModalSuccess}
      <div className="profile mt-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Sidebar />
            </div>
            <div className="col">
              <div class="card">
                <div class="card-body">
                  <h5>My Store</h5>
                  <p className="text-body-secondary">
                    Manage your store information
                  </p>
                  <hr />
                  <div className="row">
                    <div
                      className="col-12"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}>
                      {isErrStoreName ? (
                        <MyTextField
                          error
                          id="standard-error-helper-text"
                          helperText={errMsgStoreName}
                          label="Store Name"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder={profiles?.[0]?.store_name}
                          value={storeName}
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
                          placeholder={profiles?.[0]?.store_name}
                          value={storeName}
                          onChange={handleStoreName}
                          InputProps={{
                            inputProps: {
                              maxLength: 30,
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
                          placeholder={profiles?.[0]?.email}
                          value={email}
                          onChange={handleChangeEmail}
                          InputProps={{
                            inputProps: {
                              maxLength: 20,
                            },
                          }}
                        />
                      ) : (
                        <MyTextField
                          label="Email"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder={profiles?.[0]?.email}
                          value={email}
                          onChange={handleChangeEmail}
                          InputProps={{
                            inputProps: {
                              maxLength: 20,
                            },
                          }}
                        />
                      )}

                      {!isErrPhone ? (
                        <MyTextField
                          label="Phone Number"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          placeholder={profiles?.[0]?.phone_number}
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
                          placeholder={profiles?.[0]?.phone_number}
                          id="outlined-error-helper-text"
                          label="Phone Number"
                          helperText={errMsgPhone}
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

                      {isErrDescription ? (
                        <MyTextField
                          error
                          id="standard-error-helper-text"
                          helperText={errMsgDescription}
                          label="Description"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder={profiles?.[0]?.description}
                          value={description}
                          onChange={handleChangeDescription}
                          InputProps={{
                            inputProps: {
                              maxLength: 100,
                            },
                          }}
                        />
                      ) : (
                        <MyTextField
                          label="Description"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder={profiles?.[0]?.description}
                          value={description}
                          onChange={handleChangeDescription}
                          InputProps={{
                            inputProps: {
                              maxLength: 100,
                            },
                          }}
                        />
                      )}

                      <Grid
                        container
                        sx={{ display: "flex", alignItems: "center" }}>
                        <Grid item md={10}>
                          <div
                            style={{ marginTop: "20px", marginRight: "30px" }}>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <Paper
                                variant="outlined"
                                sx={{
                                  height: "25vh",
                                  backgroundColor: "#F7FAFC",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                  border: "2px dashed #E0E7FF",
                                  marginBottom: "1rem",
                                }}>
                                <CloudUploadIcon
                                  fontSize="large"
                                  color="primary"
                                />
                                <Typography variant="subtitle1">
                                  Drag and drop your image here or click to
                                  select files
                                </Typography>
                              </Paper>
                            </div>
                            <input
                              type="file"
                              id="fileInput"
                              accept="image/*"
                              multiple={false}
                              style={{ display: "none" }}
                              onChange={(e) => {
                                handleUpload(e.target.files[0]);
                              }}
                            />
                            {files.map((file) => (
                              <Typography key={file.name} variant="body1">
                                {file.name}
                              </Typography>
                            ))}
                          </div>
                        </Grid>
                        <Grid item md={2}>
                          <CardMedia
                            component="img"
                            height="300"
                            image={
                              profiles?.[0]?.profile_picture.includes("https")
                                ? profiles?.[0]?.profile_picture
                                : `https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${profiles?.[0]?.profile_picture}`
                            }
                            alt={profiles?.[0]?.store_name}
                            sx={{
                              height: "15vh",
                              width: "15vh",
                              objectFit: "contain",
                              backgroundColor: "#D3D3D3",
                              borderRadius: "50%",
                            }}
                          />
                        </Grid>
                      </Grid>

                      {files.length ? (
                        <Button
                          onClick={() => {
                            setFiles([]);
                          }}
                          variant="outlined"
                          color="error"
                          sx={{ width: "100px" }}>
                          Clear
                        </Button>
                      ) : (
                        <Button
                          disabled
                          onClick={() => {
                            setFiles([]);
                          }}
                          variant="outlined"
                          color="error"
                          sx={{ width: "100px" }}>
                          Clear
                        </Button>
                      )}

                      {!isDisabled ? (
                        isLoading ? (
                          <LoadingButton
                            onClick={handleSubmit}
                            loading={isLoading}
                            variant="contained"
                            color="primary"
                            sx={{
                              borderRadius: "20px",
                              marginTop: "20px",
                              background: "#DB3022",
                              color: "black",
                            }}>
                            {isLoading ? "Loading..." : "Update Data"}
                          </LoadingButton>
                        ) : (
                          <MyButton
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}>
                            Update Data
                          </MyButton>
                        )
                      ) : (
                        <MyButton
                          disabled
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}>
                          Update Data
                        </MyButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const token = getCookie("token", context) || "";

  const sellerData = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/detail`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    props: {
      token,
      profile: sellerData.data.data,
    },
  };
};
