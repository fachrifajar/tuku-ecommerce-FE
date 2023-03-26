import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import { useRouter } from "next/router";

import { styled, alpha } from "@mui/material/styles";
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
  Container,
  CssBaseline,
  CardActionArea,
  CardMedia,
  Backdrop,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";

function categoryCarousel() {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = React.useState(0);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0) {
        return 2;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === 2) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const [loading, setLoading] = React.useState(false);

  const fetchCategory = async (categoriez) => {
    setLoading(true);
    sessionStorage.removeItem("categoriesData");

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?sort=DESC&categoryFilter=${categoriez}`
      );

      sessionStorage.setItem(
        "categoriesData",
        JSON.stringify(response?.data?.data)
      );
    } catch (error) {
      console.log("errorFetchCategory->", error);
      sessionStorage.removeItem("categoriesData");
    } finally {
      setLoading(false);
      router.push("/product/category");
    }
  };

  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        style={{ height: "50vh" }}>
        <div className="carousel-inner">
          <div className={`carousel-item ${activeIndex === 0 ? "active" : ""}`}>
            <Box flex={4} p={{ xs: 4, md: 8 }}>
              <Grid
                container
                spacing={1}
                sx={{
                  // mt: 2,
                  display: "flex",
                  justifyContent: "center",
                }}>
                <Card
                  onClick={() => {
                    fetchCategory("tshirt");
                  }}
                  sx={{
                    // marginTop: "50px",
                    marginRight: "20px",
                    position: "relative",
                  }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813138/ecommerce/tshirt2_wwkdmc.jpg`}
                      sx={{
                        transition: "height 0.3s ease-in-out",
                        "&:hover": {
                          filter: "grayscale(50%)",
                          transitionDelay: "0.2s",
                        },
                        width: "50vh",
                      }}
                    />
                  </CardActionArea>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "25px",
                    }}>
                    T-SHIRTS
                  </Typography>
                </Card>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                  disabled={!loading}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Card
                  onClick={() => {
                    fetchCategory("shirt");
                  }}
                  f
                  sx={{
                    // marginTop: "50px",
                    marginRight: "20px",
                    position: "relative",
                  }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813356/ecommerce/shirt2_yd0cst.jpg`}
                      sx={{
                        transition: "height 0.3s ease-in-out",
                        "&:hover": {
                          filter: "grayscale(50%)",
                          transitionDelay: "0.2s",
                        },
                        width: "50vh",
                      }}
                    />
                  </CardActionArea>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "25px",
                    }}>
                    SHIRTS
                  </Typography>
                </Card>

                <Card
                  onClick={() => {
                    fetchCategory("shorts");
                  }}
                  sx={{
                    // marginTop: "50px",
                    marginRight: "20px",
                    position: "relative",
                  }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813136/ecommerce/shorts2_ghu87o.jpg`}
                      sx={{
                        transition: "height 0.3s ease-in-out",
                        "&:hover": {
                          filter: "grayscale(50%)",
                          transitionDelay: "0.2s",
                        },
                        width: "50vh",
                      }}
                    />
                  </CardActionArea>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "25px",
                    }}>
                    SHORTS
                  </Typography>
                </Card>
              </Grid>
            </Box>
          </div>
          <div className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}>
            <Box flex={4} p={{ xs: 4, md: 8 }}>
              <Grid
                container
                spacing={1}
                sx={{
                  // mt: 2,
                  display: "flex",
                  justifyContent: "center",
                }}>
                <Card
                  onClick={() => {
                    fetchCategory("outwear");
                  }}
                  sx={{
                    // marginTop: "50px",
                    marginRight: "20px",
                    position: "relative",
                  }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813076/ecommerce/outwear2_xfmhwk.jpg`}
                      sx={{
                        transition: "height 0.3s ease-in-out",
                        "&:hover": {
                          filter: "grayscale(50%)",
                          transitionDelay: "0.2s",
                        },
                        width: "50vh",
                      }}
                    />
                  </CardActionArea>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "25px",
                    }}>
                    OUTWEAR
                  </Typography>
                </Card>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                  disabled={!loading}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Card
                  onClick={() => {
                    fetchCategory("pants");
                  }}
                  sx={{
                    // marginTop: "50px",
                    marginRight: "20px",
                    position: "relative",
                  }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813073/ecommerce/pants2_yptfku.jpg`}
                      sx={{
                        transition: "height 0.3s ease-in-out",
                        "&:hover": {
                          filter: "grayscale(50%)",
                          transitionDelay: "0.2s",
                        },
                        width: "50vh",
                      }}
                    />
                  </CardActionArea>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "25px",
                    }}>
                    PANTS
                  </Typography>
                </Card>

                <Card
                  onClick={() => {
                    fetchCategory("footwear");
                  }}
                  sx={{
                    // marginTop: "50px",
                    marginRight: "20px",
                    position: "relative",
                  }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813082/ecommerce/footwear2_z0axmx.jpg`}
                      sx={{
                        transition: "height 0.3s ease-in-out",
                        "&:hover": {
                          filter: "grayscale(50%)",
                          transitionDelay: "0.2s",
                        },
                        width: "50vh",
                      }}
                    />
                  </CardActionArea>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "25px",
                    }}>
                    FOOTWEAR
                  </Typography>
                </Card>
              </Grid>
            </Box>
          </div>
          <div className={`carousel-item ${activeIndex === 2 ? "active" : ""}`}>
            <Box flex={4} p={{ xs: 4, md: 8 }}>
              <Grid
                container
                spacing={1}
                sx={{
                  // mt: 2,
                  display: "flex",
                  justifyContent: "center",
                }}>
                <Card
                  onClick={() => {
                    fetchCategory("bag");
                  }}
                  sx={{
                    // marginTop: "50px",
                    marginRight: "20px",
                    position: "relative",
                  }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813079/ecommerce/bag2_r4qfnw.jpg`}
                      sx={{
                        transition: "height 0.3s ease-in-out",
                        "&:hover": {
                          filter: "grayscale(50%)",
                          transitionDelay: "0.2s",
                        },
                        width: "50vh",
                      }}
                    />
                  </CardActionArea>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "25px",
                    }}>
                    BAG
                  </Typography>
                </Card>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                  disabled={!loading}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Card
                  onClick={() => {
                    fetchCategory("headwear");
                  }}
                  sx={{
                    // marginTop: "50px",
                    marginRight: "20px",
                    position: "relative",
                  }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={`https://res.cloudinary.com/daouvimjz/image/upload/v1679813088/ecommerce/headwear2_lbzyry.jpg`}
                      sx={{
                        transition: "height 0.3s ease-in-out",
                        "&:hover": {
                          filter: "grayscale(50%)",
                          transitionDelay: "0.2s",
                        },
                        width: "50vh",
                      }}
                    />
                  </CardActionArea>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "25px",
                    }}>
                    HEADWEAR
                  </Typography>
                </Card>
              </Grid>
            </Box>
          </div>
        </div>
        <KeyboardArrowLeft
          className="carousel-control-prev"
          onClick={handlePrevClick}
          style={{
            position: "absolute",
            top: "45%",
            left: "105px",
            fontSize: "40px",
            cursor: "pointer",
            color: "black",
            backgroundColor: "gray",
            borderRadius: "50%",
          }}
        />
        <KeyboardArrowRight
          className="carousel-control-next"
          onClick={handleNextClick}
          style={{
            position: "absolute",
            top: "45%",
            right: "135px",
            fontSize: "40px",
            cursor: "pointer",
            color: "black",
            backgroundColor: "gray",
            borderRadius: "50%",
          }}
        />
      </div>
    </>
  );
}

export default categoryCarousel;
