import * as React from "react";
import CardProductContent from "@/components/molecules/cardContent";
import axios from "axios";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { styled, alpha } from "@mui/material/styles";
import {
  Avatar,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Button,
  TextField,
  Grid,
  Breadcrumbs,
  CircularProgress,
  Link,
  CardActionArea,
  Rating,
  Backdrop,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { useMediaQuery } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const MyCard = styled(Card)({
  margin: "auto",
  marginTop: "10%",
  //   maxWidth: 500,
  textAlign: "center",
  borderRadius: "20px",
  padding: "25px",
  width: "80vh",
  height: "auto",
  //   maxHeight: "500px",
  //   overflowY: "auto",
});

const MyModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const MyModalResult = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const MyModalCart = styled(Modal)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-end",
});

const MyCardResult = styled(Card)({
  // margin: "auto",
  // marginTop: "0%",
  textAlign: "center",
  // padding: "25px",
  width: "300vh",
  height: "300vh",
  //   height: "auto",
});

const MyCardCart = styled(Card)({
  margin: "50px 130px",
  // marginBottom: "30%",
  // maxWidth: 500,
  textAlign: "center",
  borderRadius: "30px",
  borderTopRightRadius: "0px",
  padding: "25px",
  maxHeight: "500px",
  overflowY: "auto",
  width: "50vh",
});

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

const SizeButton = styled(Button)({
  borderRadius: "10px",
  borderColor: "#9B9B9B",
  color: "black",
  margin: "0 5px",
  "&:hover": {
    background: alpha("#DB3022", 0.5),
    border: "none",
    color: "white",
  },
  "&:active": {
    background: "#DB3022",
    border: "none",
    color: "white",
  },
});

const CategoryButton = styled(Button)({
  borderRadius: "10px",
  borderColor: "#9B9B9B",
  width: "100px",
  color: "black",
  //   margin: "0 5px",
  "&:hover": {
    background: alpha("#DB3022", 0.5),
    border: "none",
    color: "white",
  },
  "&:active": {
    background: "#DB3022",
    border: "none",
    color: "white",
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

export default function Navbar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [loading, setLoading] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isXs = useMediaQuery("(max-width: 600px)");

  const [getData, setGetData] = React.useState(null);
  const [getBrand, setGetBrand] = React.useState([]);
  const [showModalFilter, setShowModalFilter] = React.useState(false);
  const [getNotifCart, setGetNotifCart] = React.useState([]);
  const [isAuth, setIsAuth] = React.useState(false);

  const handleCart = () => {
    handleOpenCart();
  };

  const handleRedirectCart = () => {
    if (router.asPath === "/bag/my-bag") {
      return;
    } else {
      router.push(`${router.basePath}/bag/my-bag`);
    }
  };

  const handleRedirectProfile = () => {
    router.push("/user/profile");
  };

  const handleLogout = () => {
    deleteCookie("profile");
    deleteCookie("token");
    localStorage.removeItem("profile");
    localStorage.removeItem("token");

    router.push("/");
    // window.location.reload();
  };

  const handleCloseFilter = () => {
    setShowModalFilter(false);
  };

  const handleOpenFilter = async () => {
    setShowModalFilter(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/?allBrand=true`
      );

      setGetBrand(JSON.parse(response?.data?.data));
    } catch (error) {
      console.log("ERROR GETALLBRAND", error);
    }
  };

  React.useEffect(() => {
    setGetData(JSON.parse(localStorage.getItem("profile")));

    if (JSON.parse(localStorage.getItem("profile"))) {
      setIsAuth(true);
    }
  }, []);
  // console.log("getData->", getData);
  // console.log(getData.profilePicture.includes('https'))

  React.useEffect(() => {
    const getCartNotPaid = async () => {
      try {
        const getProfileData = JSON.parse(localStorage.getItem("profile"));
        const getToken = getProfileData?.accessToken;

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/detail/history`,
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        );

        setGetNotifCart(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCartNotPaid();
  }, []);

  // MODAL CART

  const [showModalCart, setShowModalCart] = React.useState(false);

  const handleCloseCart = () => {
    setShowModalCart(false);
  };

  const handleOpenCart = () => {
    setShowModalCart(true);
  };

  // MODAL SEARCH & FILTER

  const [showModalResult, setShowModalResult] = React.useState(false);

  const handleCloseResult = () => {
    setShowModalResult(false);
  };

  const handleOpenResult = async () => {
    setShowModalResult(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/?allBrand=true`
      );

      setGetBrand(JSON.parse(response?.data?.data));
    } catch (error) {
      console.log("ERROR GETALLBRAND", error);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={(handleMenuClose, handleRedirectProfile)}>
        <ManageAccountsIcon sx={{ marginRight: "10px" }} />
        Profile
      </MenuItem>
      <MenuItem onClick={(handleMenuClose, handleLogout)}>
        <LogoutIcon sx={{ marginRight: "10px" }} />
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem
        onClick={() => {
          handleCart();
        }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={getNotifCart?.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={(handleProfileMenuOpen, handleRedirectProfile)}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <ManageAccountsIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={(handleProfileMenuOpen, handleLogout)}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const availableColors = [
    {
      value: "black",
      label: "Black",
    },
    {
      value: "white",
      label: "White",
    },
    {
      value: "red",
      label: "Red",
    },
    {
      value: "gray",
      label: "Gray",
    },
    {
      value: "cream",
      label: "Cream",
    },
    {
      value: "blue",
      label: "Blue",
    },
  ];

  const [selectedColor, setSelectedColor] = React.useState("");

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const [selectedSize, setSelectedSize] = React.useState("");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.textContent);
  };

  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.textContent);
  };

  const [SelectedBrand, setSelectedBrand] = React.useState("");

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  let isDisabled = true;
  const [isLoadingFilter, setIsLoadingFilter] = React.useState(false);
  const [getDataFilter, setGetDataFilter] = React.useState("");

  if (selectedSize || selectedColor || selectedCategory || SelectedBrand) {
    isDisabled = false;
  }

  const handleDiscard = () => {
    setSelectedSize("");
    setSelectedColor("");
    setSelectedCategory("");
    setSelectedBrand("");
  };

  const handleFilter = async () => {
    try {
      setGetDataFilter("");
      setGetDataSearch("");
      setIsLoadingFilter(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/?sizeFilter=${selectedSize}&colorFilter=${selectedColor}&categoryFilter=${selectedCategory}&brandFilter=${SelectedBrand}`
      );

      setGetDataFilter(response?.data?.data);
      setIsLoadingFilter(false);
      handleCloseFilter();
      handleOpenResult();
    } catch (error) {
      setIsLoadingFilter(false);
      console.log("errorFilter=>", error);
    }
  };

  const renderModalCart = (
    <>
      <MyModalCart open={showModalCart} onClose={handleCloseCart}>
        <MyCardCart>
          {getNotifCart?.length ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: "20px",
                }}>
                CART ({getNotifCart?.length}){" "}
                <Typography
                  variant="h5"
                  sx={{
                    marginLeft: "auto",
                    cursor: "pointer",
                    color: "#DB3022",
                    cursor: "pointer",
                    "&:hover": { color: "#DB2522" },
                  }}
                  onClick={handleRedirectCart}>
                  see more
                </Typography>
              </Typography>

              {/* <hr /> */}
              {getNotifCart?.map((item, key) => (
                <React.Fragment key={key}>
                  <Card sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent
                        sx={{
                          // flex: "1 0 auto",
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}>
                        <CardMedia
                          component="img"
                          sx={{
                            width: "30%",
                            height: "30%",
                            marginRight: "10px",
                          }}
                          image={`https://res.cloudinary.com/daouvimjz/image/upload/v1676279237/${item?.product_picture}`}
                          alt="Live from space album cover"
                        />

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <Typography component="div" variant="h5">
                            {item?.product_name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div">
                            Rp.{parseInt(item?.total_est)}
                          </Typography>
                        </div>
                      </CardContent>
                    </Box>
                  </Card>
                </React.Fragment>
              ))}
              <style>
                {`
::-webkit-scrollbar {
  width: 0.1em;
  height: 0.5em;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}
`}
              </style>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <img
                src="https://res.cloudinary.com/daouvimjz/image/upload/v1680192590/ecommerce/noORderYet_hfqeqg.png"
                alt="no notification yet"
                style={{
                  height: "50%",
                  width: "50%",
                }}
              />
            </div>
          )}
        </MyCardCart>
      </MyModalCart>
    </>
  );

  const renderModalFilter = (
    <>
      <MyModal open={showModalFilter}>
        <MyCard sx={{ maxHeight: "500px", overflowY: "auto" }}>
          <CardContent>
            {/* TITLE */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                margin: "-20px 0 0 -20px",
              }}>
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <IconButton
                  size="small"
                  aria-label="show 4 new mails"
                  color="inherit">
                  <CloseIcon
                    fontSize="medium"
                    sx={{
                      color: "#9B9B9B",
                      "&:hover": { color: "black", cursor: "pointer" },
                    }}
                    onClick={handleCloseFilter}
                  />
                </IconButton>

                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Filter
                </Typography>
              </span>
            </div>
            <hr
              style={{
                width: "100vh",
                marginLeft: "-40px",
                border: "1px solid #9B9B9B",
                marginBottom: "30px",
              }}
            />

            {/* COLOR */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "20px",
                }}>
                Colors
              </Typography>

              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "25ch" },
                }}
                noValidate
                autoComplete="off">
                <MyTextField
                  fullWidth
                  id="outlined-select-colors-native"
                  select
                  label="Available Colors"
                  defaultValue=""
                  value={selectedColor}
                  onChange={handleColorChange}
                  sx={{ justifyContent: "flex-start", display: "flex" }}>
                  <MenuItem value="" disabled></MenuItem>
                  {availableColors.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ "&:hover": { bgcolor: "gray" } }}>
                      {option.label}
                    </MenuItem>
                  ))}
                </MyTextField>
              </Box>
            </div>
            <hr
              style={{
                width: "100vh",
                marginLeft: "-40px",
                border: "1px solid #9B9B9B",
                marginBottom: "30px",
                marginTop: "30px",
              }}
            />

            {/* SIZE */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "20px",
                }}>
                Sizes
              </Typography>
              <div
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  display: "flex",
                }}>
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <SizeButton
                    key={size}
                    variant={selectedSize === size ? "contained" : "outlined"}
                    onClick={handleSizeChange}
                    sx={{
                      borderRadius: "10px",
                      borderColor: "#9B9B9B",
                      color: selectedSize === size ? "white" : "black",
                      margin: "0 5px",
                      bgcolor: selectedSize === size ? "#DB3022" : "",
                    }}>
                    {size}
                  </SizeButton>
                ))}
              </div>
            </div>
            <hr
              style={{
                width: "100vh",
                marginLeft: "-40px",
                border: "1px solid #9B9B9B",
                marginBottom: "30px",
                marginTop: "30px",
              }}
            />

            {/* CATEGORY */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "20px",
                }}>
                Category
              </Typography>
              <Grid container spacing={1}>
                {[
                  "tshirt",
                  "shirt",
                  "shorts",
                  "outwear",
                  "pants",
                  "footwear",
                  "bag",
                  "headwear",
                ].map((category) => (
                  <Grid item key={category}>
                    <CategoryButton
                      variant={
                        selectedCategory === category ? "contained" : "outlined"
                      }
                      onClick={handleCategoryChange}
                      sx={{
                        borderRadius: "10px",
                        borderColor: "#9B9B9B",
                        color:
                          selectedCategory === category ? "white" : "black",
                        bgcolor: selectedCategory === category ? "#DB3022" : "",
                      }}>
                      {category}
                    </CategoryButton>
                  </Grid>
                ))}
              </Grid>
            </div>
            <hr
              style={{
                width: "100vh",
                marginLeft: "-40px",
                border: "1px solid #9B9B9B",
                marginBottom: "30px",
                marginTop: "30px",
              }}
            />

            {/* BRAND */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "20px",
                }}>
                Brand
              </Typography>

              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "25ch" },
                }}
                noValidate
                autoComplete="off">
                <MyTextField
                  fullWidth
                  id="outlined-select-brands-native"
                  select
                  label="Available Brand"
                  defaultValue=""
                  value={SelectedBrand}
                  onChange={handleBrandChange}
                  sx={{ justifyContent: "flex-start", display: "flex" }}>
                  <MenuItem value="" disabled></MenuItem>
                  {getBrand?.map((option, key) => (
                    <MenuItem
                      key={key}
                      value={option}
                      sx={{ "&:hover": { bgcolor: "gray" } }}>
                      {option}
                    </MenuItem>
                  ))}
                </MyTextField>
              </Box>
            </div>
            <hr
              style={{
                width: "100vh",
                marginLeft: "-40px",
                border: "1px solid #9B9B9B",
                marginBottom: "30px",
                marginTop: "30px",
              }}
            />

            {/* BUTTON */}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}>
              {isDisabled ? (
                <MyButton
                  disabled
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleDiscard}>
                  Discard
                </MyButton>
              ) : (
                <MyButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleDiscard}>
                  Discard
                </MyButton>
              )}

              {!isDisabled ? (
                isLoadingFilter ? (
                  <MyLoadingButton
                    fullWidth
                    onClick={handleFilter}
                    loading={isLoadingFilter}
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "20px",
                      // marginTop: "50px",
                      background: "#DB3022",
                      color: "black",
                    }}>
                    {isLoadingFilter ? "Loading..." : "  Apply"}
                  </MyLoadingButton>
                ) : (
                  <MyButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleFilter}>
                    Apply
                  </MyButton>
                )
              ) : (
                <MyButton
                  disabled
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleFilter}>
                  Apply
                </MyButton>
              )}
            </div>
          </CardContent>
          <style>
            {`
::-webkit-scrollbar {
  width: 0.1em;
  height: 0.5em;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}
`}
          </style>
        </MyCard>
      </MyModal>
    </>
  );

  const [keyword, setKeyword] = React.useState("");
  const [getDataSearch, setGetDataSearch] = React.useState("");
  const [isLoadingSearch, setIsLoadingSearch] = React.useState(false);

  const handleSearch = async () => {
    try {
      setGetDataSearch("");
      setGetDataFilter("");
      setIsLoadingSearch(true);
      handleOpenResult();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${keyword}`
      );

      setGetDataSearch(response?.data?.data?.[0]);
      setIsLoadingSearch(false);
    } catch (error) {
      setIsLoadingSearch(false);
      console.log("errorFilter=>", error);
    }
  };

  const renderModalResult = (
    <>
      <MyModalResult open={showModalResult}>
        <MyCardResult sx={{ maxHeight: "100vh", overflowY: "auto" }}>
          {/* MODAL */}
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="static"
              sx={{ background: "linear-gradient(#ee4d2d, #ff7337)" }}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}>
                  <MenuIcon />
                </IconButton>
                {!isXs ? (
                  <img
                    src={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813105/ecommerce/icon-tuku-white_e7wyws.png`}
                    alt="main logo"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: "100%",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => router.push("/")}
                  />
                ) : (
                  <>
                    <img
                      src={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813108/ecommerce/logo-white_ogocm6.png`}
                      alt="main logo"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                        width: "25px",
                        cursor: "pointer",
                        marginRight: "20px",
                      }}
                      onClick={() => router.push("/")}
                    />
                  </>
                )}

                <Search
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleOpenFilter}>
                  <FilterAltIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={() => {
                      handleCart();
                    }}>
                    <Badge badgeContent={getNotifCart?.length} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit">
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit">
                    {getData?.profilePicture.includes("https") ? (
                      <AccountCircle />
                    ) : (
                      <Avatar
                        src={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${getData?.profilePicture}`}
                        sx={{ width: 24, height: 24 }}
                      />
                    )}
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit">
                    <MoreIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderModalFilter}
          </Box>
          <CardContent sx={{ padding: "50px 75px" }}>
            {isLoadingSearch ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {getDataSearch && !getDataFilter && (
                  <>
                    <Breadcrumbs aria-label="breadcrumb">
                      <Link
                        underline="hover"
                        color="inherit"
                        href="#"
                        onClick={handleCloseResult}>
                        Home
                      </Link>
                      <Typography color="text.primary">Search</Typography>
                    </Breadcrumbs>
                    <Grid
                      container
                      spacing={1}
                      sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                      {[getDataSearch]?.map((product, index) => (
                        <>
                          <CardProductContent key={index} data={product} />
                        </>
                      ))}
                    </Grid>
                  </>
                )}
                {getDataFilter && !getDataSearch && (
                  <>
                    <Breadcrumbs aria-label="breadcrumb">
                      <Link
                        underline="hover"
                        color="inherit"
                        href="#"
                        onClick={handleCloseResult}>
                        Home
                      </Link>
                      <Typography color="text.primary">Filter</Typography>
                    </Breadcrumbs>
                    <Grid
                      container
                      spacing={1}
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}>
                      {getDataFilter?.map((product, index) => (
                        <>
                          <CardProductContent key={index} data={product} />
                        </>
                      ))}
                    </Grid>
                  </>
                )}
                {!getDataSearch && !getDataFilter && (
                  <Typography variant="h4" sx={{ marginTop: "100px" }}>
                    Product not available
                  </Typography>
                )}
              </>
            )}
          </CardContent>
          <style>
            {`
::-webkit-scrollbar {
  width: 0.1em;
  height: 0.5em;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}
`}
          </style>
        </MyCardResult>
      </MyModalResult>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(#ee4d2d, #ff7337)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          {!isXs ? (
            <img
              src={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813105/ecommerce/icon-tuku-white_e7wyws.png`}
              alt="main logo"
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                width: "100px",
                cursor: "pointer",
              }}
              onClick={() => router.push("/")}
            />
          ) : (
            <>
              <img
                src={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813108/ecommerce/logo-white_ogocm6.png`}
                alt="main logo"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  width: "25px",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
                onClick={() => router.push("/")}
              />
            </>
          )}

          <Search
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={handleOpenFilter}>
            <FilterAltIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          {isAuth ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  handleCart();
                }}>
                <Badge badgeContent={getNotifCart?.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                {getData?.profilePicture.includes("https") ? (
                  <AccountCircle />
                ) : (
                  <Avatar
                    src={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${getData?.profilePicture}`}
                    sx={{ width: 24, height: 24 }}
                  />
                )}
              </IconButton>
            </Box>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => router.push("/auth/login")}
                sx={{
                  borderRadius: "20px",
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    background: "white",
                    border: "none",
                    color: "black",
                  },
                }}>
                Login
              </Button>
            </>
          )}

          {isAuth ? (
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit">
                <MoreIcon />
              </IconButton>
            </Box>
          ) : null}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderModalFilter}
      {renderModalResult}
      {renderModalCart}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
        disabled={!loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
