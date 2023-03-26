import * as React from "react";
import axios from "axios";
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

const MyCardResult = styled(Card)({
  // margin: "auto",
  // marginTop: "0%",
  textAlign: "center",
  // padding: "25px",
  width: "300vh",
  height: "300vh",
  //   height: "auto",
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
  const capitalize = (str) => {
    return str.replace(/(^\w|\s\w)/g, function (letter) {
      return letter.toUpperCase();
    });
  };

  const convertNumber = (str) => {
    return str.replace(/\d(?=(\d{3})+$)/g, "$&.");
  };

  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isXs = useMediaQuery("(max-width: 600px)");

  const [getData, setGetData] = React.useState(null);
  const [getBrand, setGetBrand] = React.useState([]);
  const [showModalFilter, setShowModalFilter] = React.useState(false);

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
  }, []);

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
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
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
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
                    color="inherit">
                    <Badge badgeContent={4} color="error">
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
                        src={`https://res.cloudinary.com/daouvimjz/image/upload/v1676279237/${getData?.profile_picture}`}
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
                      <Card
                        sx={{
                          maxWidth: 345,
                          marginTop: "50px",
                          marginRight: "20px",
                        }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="240"
                            image={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${getDataSearch?.products_picture[0]?.product_picture}`}
                            alt={getDataSearch?.product_name}
                            sx={{
                              transition: "height 0.3s ease-in-out",
                              "&:hover": {
                                height: 340,
                                transitionDelay: "0.2s",
                              },
                              width: "50vh",
                            }}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              sx={{ fontWeight: "bold", mb: 3 }}>
                              {capitalize(getDataSearch?.product_name)}
                              <span>
                                <Typography
                                  variant="body2"
                                  color="text.secondary">
                                  ( {capitalize(getDataSearch?.category)} )
                                </Typography>
                              </span>
                            </Typography>

                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              sx={{
                                justifyContent: "center",
                                display: "flex",
                                color: "#db3022",
                              }}>
                              {`Rp.${convertNumber(getDataSearch?.price)}`}
                            </Typography>
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  justifyContent: "flex-start",
                                  display: "flex",
                                  mt: 2,
                                }}>
                                <strong>Store: </strong>&nbsp;
                                {capitalize(getDataSearch?.store_name)}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  justifyContent: "flex-start",
                                  display: "flex",
                                  mt: 2,
                                }}>
                                <strong>Brand: </strong>&nbsp;
                                {capitalize(getDataSearch?.brand)}
                              </Typography>
                            </span>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "15px",
                                justifyContent: "center",
                              }}>
                              <span
                                style={{
                                  flexDirection: "row",
                                  display: "flex",
                                }}>
                                <Rating
                                  name="read-only"
                                  value={getDataSearch?.avg_review}
                                  precision={0.01}
                                  readOnly
                                  size="small"
                                />
                                <Typography
                                  component="legend"
                                  style={{
                                    marginLeft: "8px",
                                    color: "#9B9B9B",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}>
                                  {getDataSearch?.avg_review}
                                </Typography>
                              </span>
                            </div>
                          </CardContent>
                        </CardActionArea>
                      </Card>
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
                      {getDataFilter?.map((item, key) => (
                        <>
                          <Card
                            key={key}
                            sx={{
                              maxWidth: 345,
                              marginTop: "50px",
                              marginRight: "20px",
                            }}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="240"
                                image={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${item?.products_picture[0]?.product_picture}`}
                                alt={item?.product_name}
                                sx={{
                                  transition: "height 0.3s ease-in-out",
                                  "&:hover": {
                                    height: 340,
                                    transitionDelay: "0.2s",
                                  },
                                  width: "50vh",
                                }}
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  sx={{ fontWeight: "bold", mb: 3 }}>
                                  {capitalize(item?.product_name)}
                                  <span>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary">
                                      ( {capitalize(item?.category)} )
                                    </Typography>
                                  </span>
                                </Typography>

                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  sx={{
                                    justifyContent: "center",
                                    display: "flex",
                                    color: "#db3022",
                                  }}>
                                  {`Rp.${convertNumber(item?.price)}`}
                                </Typography>
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                  }}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      justifyContent: "flex-start",
                                      display: "flex",
                                      mt: 2,
                                    }}>
                                    <strong>Store: </strong>&nbsp;
                                    {capitalize(item?.store_name)}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      justifyContent: "flex-start",
                                      display: "flex",
                                      mt: 2,
                                    }}>
                                    <strong>Brand: </strong>&nbsp;
                                    {capitalize(item?.brand)}
                                  </Typography>
                                </span>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "15px",
                                    justifyContent: "center",
                                  }}>
                                  <span
                                    style={{
                                      flexDirection: "row",
                                      display: "flex",
                                    }}>
                                    <Rating
                                      name="read-only"
                                      value={item?.avg_review}
                                      precision={0.01}
                                      readOnly
                                      size="small"
                                    />
                                    <Typography
                                      component="legend"
                                      style={{
                                        marginLeft: "8px",
                                        color: "#9B9B9B",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}>
                                      {item?.avg_review}
                                    </Typography>
                                  </span>
                                </div>
                              </CardContent>
                            </CardActionArea>
                          </Card>
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit">
              <Badge badgeContent={4} color="error">
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
                  src={`https://res.cloudinary.com/daouvimjz/image/upload/v1676279237/${getData?.profile_picture}`}
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
      {renderModalResult}
    </Box>
  );
}
