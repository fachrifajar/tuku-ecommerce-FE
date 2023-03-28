import Navbar from "@/components/organisms/navbar";
import Link from "next/link";
import React from "react";
import Sidebar from "../../components/organisms/userSidebar";
import style from "../../styles/pages/homeStyle.module.scss";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { useDropzone } from "react-dropzone";
import Head from "next/head";

//MUI
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  const profile = props.profile;

  const [profiles, setProfiles] = React.useState(props.profile);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const [gender, setGender] = React.useState(null);

  const [email, setEmail] = React.useState(null);
  const [isErrEmail, setIsErrEmail] = React.useState(false);
  const [errMsgEmail, setErrMsgEmail] = React.useState("");

  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [isErrPhone, setIsErrPhone] = React.useState(false);
  const [errMsgPhone, setErrMsgPhone] = React.useState("");

  const [fullname, setFullname] = React.useState(null);
  const [isErrName, setIsErrName] = React.useState(false);
  const [errMsgName, setErrMsgName] = React.useState("");

  const handleChangeDate = (newSelectedDate) => {
    console.log("newSelectedDate---", newSelectedDate);

    setSelectedDate(moment(newSelectedDate).format("YYYY-MM-DD")); // output object
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

  const handleChangeName = (event) => {
    const name = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{3,20}$/;
    if (!strRegex.test(name)) {
      setErrMsgName(
        "Name must contain only letters and spaces, and be between 3-20 characters long."
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

  //REACT DROPZONE
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

  console.log("files===", files);
  console.log("gender===", gender);
  console.log("name===", fullname);
  console.log("email===", email);
  console.log("phoneNumber===", phoneNumber);
  console.log("selectedDate===", selectedDate);

  let isDisabled = true;
  console.log(isDisabled);

  if (files.length || gender || fullname || email || phoneNumber || selectedDate) {
    isDisabled = false;
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setFixFiles(files[0]);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/edit`,
        {
          email,
          phone_number: phoneNumber,
          username: fullname,
          profile_picture: files[0],
          gender,
          date_of_birth: selectedDate,
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
      const profileData = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/detail`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      setIsLoading(false);
      setProfiles(profileData.data.data);
      // console.log("profileData.data.data->>>", profileData.data.data);

      const profile = JSON.parse(localStorage.getItem("profile"));
      profile.profilePicture = profileData?.data?.data?.profile_picture;
      localStorage.setItem("profile", JSON.stringify(profile));
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
        <title>Profile | Tuku</title>
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
            <div className="col" style={{ height: "auto" }}>
              <div class="card" style={{ overflow: "auto" }}>
                <div class="card-body">
                  <h5>My profile</h5>
                  <p className="text-body-secondary">
                    Manage your profile information
                  </p>
                  <hr />
                  <div className="row">
                    <div
                      className="col-12"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Gender
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          sx={{ justifyContent: "center" }}>
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                            onChange={() => setGender("male")}
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                            onChange={() => setGender("female")}
                          />
                        </RadioGroup>
                      </FormControl>

                      {/* <div>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Paper variant="outlined" sx={{ height: "25vh" }}>
                            <Typography variant="subtitle1">
                              Drop your image here, or click to select files
                            </Typography>
                          </Paper>
                        </div>
                        <Button variant="contained" onClick={handleButtonClick}>
                          Select Images
                        </Button>
                        <input
                          type="file"
                          id="fileInput"
                          multiple
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const selectedFiles = Array.from(e.target.files);
                            setFiles([...files, ...selectedFiles]);
                          }}
                        />
                        {files.map((file) => (
                          <Typography key={file.name} variant="body1">
                            {file.name}
                          </Typography>
                        ))}
                      </div> */}

                      {isErrName ? (
                        <MyTextField
                          error
                          id="standard-error-helper-text"
                          helperText={errMsgName}
                          label="Name"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder={profiles?.username}
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
                          placeholder={profiles?.username}
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
                          placeholder={profiles?.email}
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
                          placeholder={profiles?.email}
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

                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          format="DD/MM/YYYY"
                          label="Date of Birth"
                          // value={selectedDate}
                          sx={{
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
                            marginTop: "20px",
                          }}
                          // onChange={(newSelectedDate) =>
                          //   setSelectedDate(newSelectedDate)
                          // }
                          onChange={handleChangeDate}
                        />
                      </LocalizationProvider>

                      <div style={{ marginTop: "20px" }}>
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
                            <CloudUploadIcon fontSize="large" color="primary" />
                            <Typography variant="subtitle1">
                              Drag and drop your image here or click to select
                              files
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

  const profileData = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/detail`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    props: {
      token,
      profile: profileData.data.data,
    },
  };
};
