import React from "react";
import Sidebar from "../../components/organisms/sidebar";
import Navbar from "@/components/organisms/navbar";
import style from "../../styles/pages/homeStyle.module.scss";
import Head from "next/head";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
//MUI

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Backdrop,
  CircularProgress,
  Badge,
  CardActions,
  Button,
  Grid,
  CardHeader,
  Collapse,
  Avatar,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MyCard = styled(Card)({
  margin: "auto",
  maxWidth: 500,
  textAlign: "center",
  borderRadius: "20px",
  // padding: "25px",
});
export default function product(props) {
  const router = useRouter();

  const [allProducts, setAllProducts] = React.useState([]);
  const [totalAllProducts, setTotalAllProducts] = React.useState(1);
  const [isLoadingAllProducts, setIsLoadingAllProducts] = React.useState(false);

  const [allProductsSold, setAllProductsSold] = React.useState([]);
  const [totalallProductsSold, setTotalallProductsSold] = React.useState(1);
  const [isLoadingallProductsSold, setIsLoadingallProductsSold] =
    React.useState(false);

  const [allProductsArchived, setAllProductsArchived] = React.useState([]);

  React.useEffect(() => {
    setAllProducts(props.allProducts);
    setTotalAllProducts(
      parseInt(Math.ceil(props.allProducts?.data.length / 3))
    );

    setAllProductsSold(props.allProductsSold);
    setTotalallProductsSold(
      parseInt(Math.ceil(props.allProductsSold?.data.length / 3))
    );

    setAllProductsArchived(props.allProductsArchived);
  }, []);

  const allProductsPagination = (pageParam) => {
    const offset = (pageParam - 1) * 3;

    setIsLoadingAllProducts(true);
    setAllProducts([]);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/seller/myProducts?page=${pageParam}&limit=3&sort=DESC&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then(({ data }) => {
        setAllProducts(data);
        setTotalAllProducts(parseInt(Math.ceil(data?.data.length / 3)));
        setIsLoadingAllProducts(false);
      })
      .catch((err) => {
        setIsLoadingAllProducts(false);
        setAllProducts([]);

        console.log(err);
      })
      .finally(() => setIsLoadingAllProducts(false));
  };

  const allProductsSoldPagination = (pageParam) => {
    const offset = (pageParam - 1) * 3;

    setIsLoadingallProductsSold(true);
    setAllProductsSold([]);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/seller/myProducts?page=${pageParam}&limit=3&sort=DESC&offset=${offset}&sold=true`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log("dataSOLD->>>", data);
        setAllProductsSold(data);
        setTotalallProductsSold(parseInt(Math.ceil(data?.data.length / 3)));
        setIsLoadingallProductsSold(false);
      })
      .catch((err) => {
        setIsLoadingallProductsSold(false);
        setAllProductsSold([]);

        console.log(err);
      })
      .finally(() => setIsLoadingallProductsSold(false));
  };

  // console.log("allProducts===", allProducts);
  // console.log("allProductsdata===", allProducts.data);
  // console.log("allProductsSold===", allProductsSold);
  // console.log("allProductsArchived===", allProductsArchived);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.replace(/(^\w|\s\w)/g, function (letter) {
      return letter.toUpperCase();
    });
  };

  const convertNumber = (str) => {
    if (!str) return "";
    const num = Number(str);
    if (isNaN(num)) return "";
    return num.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&.");
  };

  const [loading, setLoading] = React.useState(false);

  const handleClick = (slug) => {
    setLoading(true);
    console.log("slug->>>>>>>>>", slug);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`)
      .then(({ data }) => {
        console.log("dataaaaaaa->", data);
        sessionStorage.setItem("editProduct", JSON.stringify(data?.data[0]));

        router.push(`/store/${slug}`);
        setLoading(false);
      });
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const renderAllItems = (
    <>
      {allProducts !== [] ? (
        <>
          {isLoadingAllProducts ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "300px",
                height: "270px",
              }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <Grid container spacing={2}>
                {allProducts?.data?.map((data, key) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardHeader
                        sx={{
                          // maxHeight: 64,
                          // maxWidth: 400,
                          fontSize: "14px",
                          padding: "15px",
                        }}
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon
                              onClick={() => handleClick(data?.slug)}
                            />
                          </IconButton>
                        }
                        title={data?.product_name}
                        subheader={new Date(
                          data?.created_at
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })}
                      />

                      <CardMedia
                        component="img"
                        height="194"
                        image={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${data?.products_picture[0]?.product_picture}`}
                        alt={data?.product_name}
                      />
                      <CardContent>
                        <Typography variant="body1" color="text.secondary">
                          <strong>SOLD</strong> :{" "}
                          {data?.item_sold_count == null
                            ? "0"
                            : data?.item_sold_count}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          <strong>QTY</strong> : {data?.qty}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <span
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "center",
                          }}>
                          <Rating
                            name="read-only"
                            value={
                              data?.avg_review !== null ? data?.avg_review : 0
                            }
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
                            {data?.avg_review !== null
                              ? data?.avg_review
                              : "No Review Yet"}
                          </Typography>
                        </span>
                        <ExpandMore
                          expand={expanded}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more">
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <hr />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "5px" }}>
                            <strong>BRAND</strong> : {data?.brand}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "5px" }}>
                            <strong>CATEGORY</strong> : {data?.category}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "5px" }}>
                            <strong>PRICE</strong> : {data?.price}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "5px" }}>
                            <strong>COLOR</strong> :
                            <ul>
                              {data?.color.map((item, key) => (
                                <li key={key}>{item}</li>
                              ))}
                            </ul>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "5px" }}>
                            <strong>SIZE</strong> :
                            <ul>
                              {data?.size.map((item, key) => (
                                <li key={key}>{item}</li>
                              ))}
                            </ul>
                          </Typography>
                        </CardContent>
                      </Collapse>
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
                  </Grid>
                ))}
              </Grid>
              <Pagination
                count={totalAllProducts}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
                onChange={(event, page) => allProductsPagination(page)}
              />
            </>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <img
            src="https://res.cloudinary.com/daouvimjz/image/upload/v1680192590/ecommerce/noProductYet_o6whjb.png"
            alt="no notification yet"
            style={{
              height: "25%",
              width: "25%",
            }}
          />
        </div>
      )}
    </>
  );

  const renderSoldOut = (
    <>
      {allProductsSold !== [] ? (
        <>
          {isLoadingallProductsSold ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "300px",
                height: "270px",
              }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <Grid container spacing={2}>
                {allProductsSold?.data?.map((data, key) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardHeader
                        sx={{
                          // maxHeight: 64,
                          // maxWidth: 400,
                          fontSize: "14px",
                          padding: "15px",
                        }}
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon
                              onClick={() => handleClick(data?.slug)}
                            />
                          </IconButton>
                        }
                        title={data?.product_name}
                        subheader={new Date(
                          data?.created_at
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })}
                      />

                      <CardMedia
                        component="img"
                        height="194"
                        image={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${data?.products_picture[0]?.product_picture}`}
                        alt={data?.product_name}
                      />
                      <CardContent>
                        <Typography variant="body1" color="text.secondary">
                          <strong>SOLD</strong> :{" "}
                          {data?.item_sold_count == null
                            ? "0"
                            : data?.item_sold_count}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          <strong>QTY</strong> : {data?.qty}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <span
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "center",
                          }}>
                          <Rating
                            name="read-only"
                            value={
                              data?.avg_review !== null ? data?.avg_review : 0
                            }
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
                            {data?.avg_review !== null
                              ? data?.avg_review
                              : "No Review Yet"}
                          </Typography>
                        </span>
                        <ExpandMore
                          expand={expanded}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more">
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <hr />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "5px" }}>
                            <strong>BRAND</strong> : {data?.brand}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "5px" }}>
                            <strong>CATEGORY</strong> : {data?.category}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "5px" }}>
                            <strong>PRICE</strong> : {data?.price}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "5px" }}>
                            <strong>COLOR</strong> :
                            <ul>
                              {data?.color.map((item, key) => (
                                <li key={key}>{item}</li>
                              ))}
                            </ul>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "5px" }}>
                            <strong>SIZE</strong> :
                            <ul>
                              {data?.size.map((item, key) => (
                                <li key={key}>{item}</li>
                              ))}
                            </ul>
                          </Typography>
                        </CardContent>
                      </Collapse>
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
                  </Grid>
                ))}
              </Grid>
              <Pagination
                count={totalallProductsSold}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
                onChange={(event, page) => allProductsSoldPagination(page)}
              />
            </>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <img
            src="https://res.cloudinary.com/daouvimjz/image/upload/v1680192590/ecommerce/noProductYet_o6whjb.png"
            alt="no notification yet"
            style={{
              height: "25%",
              width: "25%",
            }}
          />
        </div>
      )}
    </>
  );

  return (
    <div>
      <Head>
        <title>My Products | Tuku</title>
        <link rel="icon" href="/images/logo.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <style>{`
          body {
            background-color: #59faf2;
          }
        `}</style>
      </Head>
      <Navbar />
      <div className="profile mt-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Sidebar />
            </div>
            <div className="col">
              <div class="card">
                <div class="card-body">
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "30px",
                      fontWeight: "bold",
                    }}>
                    My Products
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      marginBottom: "20px",
                    }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      centered
                      indicatorColor="#DB3022">
                      <Tab
                        label="All Items"
                        sx={{
                          "&.Mui-selected": {
                            color: "#DB3022",
                            borderBottom: "2px solid #DB3022",
                          },
                        }}
                      />
                      <Tab
                        label="Sold Out"
                        sx={{
                          "&.Mui-selected": {
                            color: "#DB3022",
                            borderBottom: "2px solid #DB3022",
                          },
                        }}
                      />
                    </Tabs>
                  </Box>

                  {value == 0 ? renderAllItems : renderSoldOut}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = getCookie("token", context) || "";

  const allProducts = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/seller/myProducts?page=1&limit=3&sort=DESC`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const allProductsSold = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/seller/myProducts?page=1&limit=3&sort=DESC&sold=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const allProductsArchived = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/seller/myProducts?page=1&limit=3&sort=DESC&archived=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // console.log(profileData.data);
  return {
    props: {
      token,
      allProducts: allProducts?.data,
      allProductsSold: allProductsSold?.data,
      allProductsArchived: allProductsArchived?.data,
    },
  };
}
