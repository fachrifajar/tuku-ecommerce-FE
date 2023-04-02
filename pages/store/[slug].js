import React from "react";
import Sidebar from "../../components/organisms/sidebar";
import Navbar from "@/components/organisms/navbar";
import style from "../../styles/pages/homeStyle.module.scss";
import Link from "next/link";
import Head from "next/head";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
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
  InputAdornment,
  useTheme,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const colors = ["black", "white", "red", "gray", "cream", "blue"];

function colorStyles(colors, productColors, theme) {
  return {
    fontWeight:
      productColors.indexOf(colors) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const sizes = ["XS", "S", "M", "L", "XL"];

function sizeStyles(sizes, productSizes, theme) {
  return {
    fontWeight:
      productSizes.indexOf(sizes) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const categories = [
  {
    value: "tshirt",
    label: "T-SHIRT",
  },
  {
    value: "shirt",
    label: "SHIRT",
  },
  {
    value: "shorts",
    label: "SHORTS",
  },
  {
    value: "outwear",
    label: "OUTWEAR",
  },
  {
    value: "pants",
    label: "PANTS",
  },
  {
    value: "footwear",
    label: "FOOTWEAR",
  },
  {
    value: "headwear",
    label: "HEADWEAR",
  },
  {
    value: "bag",
    label: "BAG",
  },
];

export default function selling() {
  const router = useRouter();
  const [getProductSlug, setGetProductSlug] = React.useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);

  const [productName, setProductName] = React.useState(null);
  const [isErrProductName, setIsErrProductName] = React.useState(false);
  const [errMsgProductName, setErrMsgProductName] = React.useState("");

  const [showModalOption, setShowModalOption] = React.useState(false);

  const handleCloseOption = () => {
    setShowModalOption(false);
  };

  React.useEffect(() => {
    setShowModalOption(true);
    setGetProductSlug(JSON.parse(sessionStorage.getItem("editProduct")));
    console.log(JSON.parse(sessionStorage.getItem("editProduct")));
  }, []);

  const handleDeleteProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      setIsLoadingDelete(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/delete/${getProductSlug?.products_id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/store/product");
      setIsLoadingDelete(false);
    } catch (error) {
      setIsLoadingDelete(false);
      console.log(error);
    }
  };

  const [getProductPictureId, setGetProductPictureId] = React.useState(null);
  const [isLoadingDeletePicture, setIsLoadingDeletePicture] =
    React.useState(false);

  const handleDeleteProductsPicture = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsLoadingDeletePicture(true);

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/delete/picture/${getProductPictureId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/store/product");
      setIsLoadingDeletePicture(false);
    } catch (error) {
      setIsLoadingDeletePicture(false);
      console.log(error);
    }
  };

  const handleProductName = (event) => {
    const name = event.target.value;
    const strRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]{8,30}$/;
    if (!strRegex.test(name)) {
      setErrMsgProductName(
        "Product Name must contain at least one letter and be at least 8 characters long."
      );
      setIsErrProductName(true);
      setProductName(null);
      return;
    }
    setIsErrProductName(false);
    setProductName(name);
  };

  const [price, setPrice] = React.useState(null);
  const [isErrPrice, setIsErrPrice] = React.useState(false);
  const [errMsgPrice, setErrMsgPrice] = React.useState("");

  const handlePrice = (event) => {
    const { value, selectionStart } = event.target;
    const newValue = value.replace(/[^0-9]/g, "");

    if (newValue.length > 12) {
      setErrMsgPrice("Please input a valid price");
      setIsErrPrice(true);
      setPrice(null);
    } else {
      setPrice(newValue);
      setIsErrPrice(false);
    }

    if (
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      isNaN(parseInt(event.key))
    ) {
      event.preventDefault();
    }
  };

  const [qty, setQty] = React.useState(null);
  const [isErrQty, setIsErrQty] = React.useState(false);
  const [errMsgQty, setErrMsgQty] = React.useState("");

  const handleQty = (event) => {
    const { value, selectionStart } = event.target;
    const newValue = value.replace(/[^0-9]/g, "");

    if (newValue.length > 3) {
      setErrMsgQty("Please input a valid Qty");
      setIsErrQty(true);
      setQty(null);
    } else {
      setQty(newValue);
      setIsErrQty(false);
    }

    if (
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      isNaN(parseInt(event.key))
    ) {
      event.preventDefault();
    }
  };

  const [condition, setCondition] = React.useState(null);

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const [files, setFiles] = React.useState([]);

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
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

  const [description, setDescription] = React.useState(null);
  const [isErrDescription, setIsErrDescription] = React.useState(false);
  const [errMsgDescription, setErrMsgDescription] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangeDescription = (event) => {
    const name = event.target.value;
    const strRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]{10,50}$/;
    if (!strRegex.test(name)) {
      setErrMsgDescription(
        "Please enter a valid input. The input must contain at least one letter and be between 10 and 50 characters long. Only letters, numbers, and spaces are allowed."
      );
      setIsErrDescription(true);
      setDescription(null);
      return;
    }
    setIsErrDescription(false);
    setDescription(name);
  };

  const theme = useTheme();
  const [productColors, setProductColors] = React.useState([]);

  const handleChangeColors = (event) => {
    const {
      target: { value },
    } = event;
    setProductColors(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [productSizes, setproductSizes] = React.useState([]);

  const handleChangeSizes = (event) => {
    const {
      target: { value },
    } = event;
    setproductSizes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [category, setCategory] = React.useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const [brand, setBrand] = React.useState(null);
  const [isErrBrand, setIsErrBrand] = React.useState(false);
  const [errMsgBrand, setErrMsgBrand] = React.useState("");

  const handleChangeBrand = (event) => {
    const name = event.target.value;
    const strRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]{3,20}$/;
    if (!strRegex.test(name)) {
      setErrMsgBrand(
        "Please enter a valid input. The input must contain at least one letter and be between 3 and 20 characters long. Only letters, numbers, and spaces are allowed."
      );
      setIsErrBrand(true);
      setBrand(null);
      return;
    }
    setIsErrBrand(false);
    setBrand(name);
  };

  ////////////////////////////////////////////
  console.log("productName===", productName);
  console.log("price===", price);
  console.log("qty===", qty);
  console.log("condition===", condition);
  console.log("description===", description);
  console.log("files===", files);
  console.log("productColors=>", productColors);
  console.log("productSizes=>", productSizes);
  console.log("category===", category);
  console.log("brand===", brand);

  let isDisabled = true;
  // console.log(isDisabled);

  if (
    files.length ||
    description ||
    productName ||
    price ||
    qty ||
    condition ||
    productColors.length ||
    productSizes.length ||
    brand ||
    category
  ) {
    isDisabled = false;
  }

  const [errMsgFetch, setErrMsgFetch] = React.useState(null);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      if (files.length > 4) {
        setErrMsgFetch(
          "Maximum number of product pictures exceeded. You can upload up to 5 pictures only."
        );
        setShowModal(true);
        setIsLoading(false);
        return;
      }

      let colorFix = "";

      if (productColors.length) {
        for (let i = 0; i < productColors.length; i++) {
          if (i == productColors.length - 1) {
            colorFix += productColors[i];
          } else {
            colorFix += `${productColors[i]},`;
          }
        }
      }

      let sizeFix = "";

      if (productSizes.length) {
        for (let i = 0; i < productSizes.length; i++) {
          if (i == productSizes.length - 1) {
            sizeFix += productSizes[i];
          } else {
            sizeFix += `${productSizes[i]},`;
          }
        }
      }

      if (files.length) {
        if (
          description ||
          productName ||
          price ||
          qty ||
          condition ||
          productColors ||
          productSizes ||
          brand ||
          category
        ) {
          const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/edit/${getProductSlug?.products_id}`,
            {
              product_name: productName,
              price,
              qty,
              color: productColors.length ? colorFix : null,
              category,
              size: productSizes.length ? sizeFix : null,
              brand,
              condition,
              description,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        for (let i = 0; i < files.length; i++) {
          const addPhotoProduct = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/add/photo/${getProductSlug?.products_id}`,
            {
              product_picture: files[i],
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        // console.log("response->", response);

        setShowModalSuccess(true);
        setIsLoading(false);
        router.push("/store/product");
      } else {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/edit/${getProductSlug?.products_id}`,
          {
            product_name: productName,
            price,
            qty,
            color: productColors.length ? colorFix : null,
            category,
            size: productSizes.length ? sizeFix : null,
            brand,
            condition,
            description,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setShowModalSuccess(true);
        setIsLoading(false);
        router.push("/store/product");
      }
    } catch (error) {
      console.log("error", error);
      // console.log(
      //   "error?.response?.data?.message?.message",
      //   error?.response?.data?.message?.message
      // );
      setErrMsgFetch(error?.response?.data?.message?.message);
      setShowModal(true);
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

  const [showModal, setShowModal] = React.useState(false);

  const handleClose = () => {
    //MODAL ERROR
    setShowModal(false);
  };

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

            {errMsgFetch ? (
              <Typography variant="body1" sx={{ margin: "20px" }}>
                <strong>{errMsgFetch.toUpperCase()}</strong>
              </Typography>
            ) : null}
          </CardContent>
        </MyCard>
      </MyModal>
    </>
  );

  const renderModalOption = (
    <>
      <MyModal
        open={showModalOption}
        // onClose={handleCloseOption}
        sx={{ backgroundColor: "gray" }}>
        <MyCard sx={{ width: "auto", height: "auto" }}>
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}>
              MANAGE YOUR PRODUCTS
            </Typography>
            <div>
              {isLoadingDelete ? (
                <LoadingButton
                  onClick={handleDeleteProducts}
                  loading={isLoadingDelete}
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "20px",
                    marginTop: "20px",
                    background: "#DB3022",
                    color: "black",
                  }}>
                  {isLoadingDelete ? "Loading..." : "Delete"}
                </LoadingButton>
              ) : (
                <Button
                  onClick={handleDeleteProducts}
                  sx={{
                    borderRadius: "20px",
                    marginTop: "20px",
                    background: "red",
                    color: "white",
                    "&:hover": {
                      background: "#DB2522",
                      border: "none",
                    },
                  }}>
                  Delete
                </Button>
              )}
              &nbsp;&nbsp;
              <Button
                onClick={handleCloseOption}
                sx={{
                  borderRadius: "20px",
                  marginTop: "20px",
                  background: "#476930",
                  color: "white",
                  "&:hover": {
                    background: "#86B049",
                    border: "none",
                  },
                }}>
                Edit
              </Button>
            </div>
          </CardContent>
        </MyCard>
      </MyModal>
    </>
  );
  console.log(
    "getProductSlug?.products_picture?.length",
    getProductSlug?.products_picture?.length
  );
  const [activeImgIndex, setActiveImgIndex] = React.useState(-1);
  return (
    <div>
      <Head>
        <title>Edit Products | Tuku</title>
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
      {renderModalErr}
      {renderModalOption}

      <div className="selling mt-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Sidebar />
            </div>

            <div className="col-8">
              <Card
                sx={{
                  width: "100%",
                  padding: "25px",
                  bgcolor: "background.paper",
                }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}>
                  EDIT YOUR PRODUCTS
                </Typography>
                <div className="card text-start  mb-4">
                  <div className="card-body">
                    <h5 className="card-title">EDIT PRODUCTS TITLE</h5>
                    <hr />
                    {isErrProductName ? (
                      <MyTextField
                        error
                        id="standard-error-helper-text"
                        helperText={errMsgProductName}
                        label="Product Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Leather Belt, Hawaiian Shirt, etc"
                        value={productName}
                        onChange={handleProductName}
                        InputProps={{
                          inputProps: {
                            maxLength: 30,
                          },
                        }}
                      />
                    ) : (
                      <MyTextField
                        label="Product Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Leather Belt, Hawaiian Shirt, etc"
                        value={productName}
                        onChange={handleProductName}
                        InputProps={{
                          inputProps: {
                            maxLength: 30,
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="card text-start  mb-4">
                  <div className="card-body">
                    <h5 className="card-title">EDIT PRODUCTS DETAIL</h5>
                    <hr />
                    {!isErrPrice ? (
                      <MyTextField
                        label="Price"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        // placeholder={"Rp.25000"}
                        value={price}
                        onChange={handlePrice}
                        InputProps={{
                          inputProps: {
                            maxLength: 15,
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              Rp.
                            </InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      <MyTextField
                        error
                        fullWidth
                        margin="normal"
                        // placeholder={"Rp.25000"}
                        id="outlined-error-helper-text"
                        label="Price"
                        helperText={errMsgPrice}
                        variant="outlined"
                        value={price}
                        onChange={handlePrice}
                        InputProps={{
                          inputProps: {
                            maxLength: 12,
                          },
                        }}
                      />
                    )}
                    {!isErrQty ? (
                      <MyTextField
                        label="Stock quantity"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        placeholder={999}
                        value={qty}
                        onChange={handleQty}
                        InputProps={{
                          inputProps: {
                            maxLength: 3,
                          },
                        }}
                      />
                    ) : (
                      <MyTextField
                        error
                        fullWidth
                        margin="normal"
                        placeholder={999}
                        id="outlined-error-helper-text"
                        label="Stock quantity"
                        helperText={errMsgQty}
                        variant="outlined"
                        value={qty}
                        onChange={handleQty}
                        InputProps={{
                          inputProps: {
                            maxLength: 3,
                          },
                        }}
                      />
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <FormControl
                        sx={{
                          "& label.Mui-focused": {
                            color: "black",
                          },
                          "& .MuiOutlinedInput-root": {
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
                          width: 350,
                          marginTop: "20px",
                        }}>
                        <InputLabel id="demo-multiple-chip-label">
                          Colors
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={productColors}
                          onChange={handleChangeColors}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Colors"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}>
                          {colors.map((colour) => (
                            <MenuItem
                              key={colour}
                              value={colour}
                              style={colorStyles(colour, productColors, theme)}>
                              {colour}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl
                        sx={{
                          "& label.Mui-focused": {
                            color: "black",
                          },
                          "& .MuiOutlinedInput-root": {
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
                          width: 350,
                          marginTop: "20px",
                        }}>
                        <InputLabel id="demo-multiple-chip-label">
                          Sizes
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={productSizes}
                          onChange={handleChangeSizes}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Sizes"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}>
                          {sizes.map((sizes) => (
                            <MenuItem
                              key={sizes}
                              value={sizes}
                              style={sizeStyles(sizes, productSizes, theme)}>
                              {sizes}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <Box
                      component="form"
                      sx={{
                        "& label.Mui-focused": {
                          color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
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
                      noValidate
                      autoComplete="off">
                      <div>
                        <TextField
                          fullWidth
                          id="outlined-select-categories"
                          select
                          label="Category"
                          value={category}
                          onChange={handleCategoryChange}
                          defaultValue="T-SHIRT">
                          {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </Box>

                    {!isErrBrand ? (
                      <MyTextField
                        label="Brand"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        placeholder={"GT-Man, Rider, etc"}
                        value={brand}
                        onChange={handleChangeBrand}
                        InputProps={{
                          inputProps: {
                            maxLength: 20,
                          },
                        }}
                      />
                    ) : (
                      <MyTextField
                        error
                        fullWidth
                        margin="normal"
                        placeholder={"GT-Man, Rider, etc"}
                        id="outlined-error-helper-text"
                        label="Brand"
                        helperText={errMsgBrand}
                        variant="outlined"
                        value={brand}
                        onChange={handleChangeBrand}
                        InputProps={{
                          inputProps: {
                            maxLength: 20,
                          },
                        }}
                      />
                    )}

                    <FormControl sx={{ marginTop: "20px" }}>
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{
                          "&.MuiFormLabel-root": {
                            color: "gray",
                          },
                        }}>
                        Condition
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={condition}
                        onChange={handleConditionChange}>
                        <FormControlLabel
                          value="new"
                          control={
                            <Radio
                              sx={{
                                "&.Mui-checked": {
                                  color: "#DB3022",
                                },
                              }}
                            />
                          }
                          label="New"
                        />
                        <FormControlLabel
                          value="used"
                          control={
                            <Radio
                              sx={{
                                "&.Mui-checked": {
                                  color: "#DB3022",
                                },
                              }}
                            />
                          }
                          label="Used"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="card text-start  mb-4">
                  <div className="card-body">
                    <h5 className="card-title">ADD PHOTO OF PRODUCTS</h5>
                    <hr />
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
                  </div>
                </div>

                <div className="card text-start mb-4">
                  <div className="card-body">
                    <h5 className="card-title">EDIT PHOTO OF PRODUCTS</h5>
                    <hr />
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}>
                      {getProductSlug?.products_picture?.map((data, key) => (
                        <div
                          onClick={() =>
                            setGetProductPictureId(data?.products_picture_id)
                          }
                          key={key}
                          style={{ flex: "0 0 auto", margin: "5px" }}>
                          <CardMedia
                            sx={{
                              height: "150px",
                              width: "150px",
                              border:
                                activeImgIndex === key
                                  ? "2px solid red"
                                  : "none",
                              cursor: "pointer",
                            }}
                            component="img"
                            image={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${data?.product_picture}`}
                            alt="product img"
                            onClick={() => setActiveImgIndex(key)}
                          />
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}>
                      {!getProductPictureId ? (
                        <Button
                          disabled
                          sx={{
                            borderRadius: "20px",
                            marginTop: "20px",
                          }}
                          variant="contained"
                          color="primary">
                          Delete
                        </Button>
                      ) : isLoadingDeletePicture ? (
                        <LoadingButton
                          onClick={handleDeleteProductsPicture}
                          loading={isLoadingDeletePicture}
                          variant="contained"
                          color="primary"
                          sx={{
                            borderRadius: "20px",
                            marginTop: "20px",
                            background: "#DB3022",
                            color: "black",
                          }}>
                          {isLoadingDeletePicture ? "Loading..." : "Delete"}
                        </LoadingButton>
                      ) : (
                        <Button
                          onClick={handleDeleteProductsPicture}
                          sx={{
                            borderRadius: "20px",
                            marginTop: "20px",
                            background: "red",
                            color: "white",
                            "&:hover": {
                              background: "#DB2522",
                              border: "none",
                            },
                          }}>
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card text-start  mb-4">
                  <div className="card-body">
                    <h5 className="card-title">EDIT DESCRIPTION</h5>
                    <hr />
                    {isErrDescription ? (
                      <MyTextField
                        error
                        id="standard-error-helper-text"
                        helperText={errMsgDescription}
                        label="Description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={description}
                        onChange={handleChangeDescription}
                        InputProps={{
                          inputProps: {
                            maxLength: 50,
                          },
                        }}
                      />
                    ) : (
                      <MyTextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={description}
                        onChange={handleChangeDescription}
                        InputProps={{
                          inputProps: {
                            maxLength: 50,
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
                <div
                  style={{
                    marginBottom: "50px",
                    display: "flex",
                    justifyContent: "center",
                  }}>
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
                        {isLoading ? "Loading..." : "Edit Product"}
                      </LoadingButton>
                    ) : (
                      <MyButton
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}>
                        Edit Product
                      </MyButton>
                    )
                  ) : (
                    <MyButton
                      disabled
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}>
                      Edit Product
                    </MyButton>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
2;
