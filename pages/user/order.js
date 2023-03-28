import Head from "next/head";
import Navbar from "@/components/organisms/navbar";
import Link from "next/link";
import React from "react";
import Sidebar from "../../components/organisms/userSidebar";
import style from "../../styles/pages/homeStyle.module.scss";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

const MyCard = styled(Card)({
  margin: "auto",
  maxWidth: 500,
  textAlign: "center",
  borderRadius: "20px",
  // padding: "25px",
});

export default function order(props) {
  const router = useRouter();

  const [getPaid, setGetPaid] = React.useState(null);
  const [getNotPaid, setGetNotPaid] = React.useState(null);

  React.useEffect(() => {
    setGetPaid(props.paid);
    setGetNotPaid(props.notPaid);
  }, []);

  // console.log("getPaid===", getPaid);
  // console.log("getNotPaid===", getNotPaid);

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

  const handleClickSlug = (slug) => {
    setLoading(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`)
      .then(({ data }) => {
        sessionStorage.setItem("productSlug", JSON.stringify(data?.data[0]));

        const regex = /^\/product\/(.*)$/;
        const currentSlug = router.asPath.match(regex)?.[1];
        if (currentSlug && currentSlug !== slug) {
          window.location.reload();
        } else {
          router.push(`/product/${slug}`);
          setLoading(false);
        }
      });
  };

  const renderPaid = (
    <>
      {getPaid?.map((data, key) => (
        <React.Fragment key={key}>
          <Card
            sx={{
              backgroundColor: "#fafafa ",
              marginBottom: "20px",
            }}>
            <CardActionArea>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <div>
                  <CardMedia
                    component="img"
                    height="150"
                    image={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${data?.product_picture}`}
                    alt={data?.product_name}
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        mb: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}>
                      {capitalize(data?.product_name)}
                      <span>
                        <Typography variant="body2" color="text.secondary">
                          ( {capitalize(data?.color)} ) ({" "}
                          {capitalize(data?.size)} ) ( {data?.qty} pcs )
                        </Typography>
                      </span>
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                        color: "#db3022",
                        fontWeight: "bold",
                      }}>
                      Rp.{convertNumber(data?.total_est)}
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
                        {capitalize(data?.store_name)}
                      </Typography>
                      &nbsp; &nbsp;
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          justifyContent: "flex-start",
                          display: "flex",
                          mt: 2,
                          fontWeight: "bold",
                        }}>
                        <strong>Order ID: </strong>&nbsp;
                        {data?.checkout_id}
                      </Typography>
                    </span>
                  </CardContent>
                </div>
              </div>
            </CardActionArea>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loading}
              disabled={!loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Card>
        </React.Fragment>
      ))}
    </>
  );

  const renderNotPaid = (
    <>
      {getNotPaid?.map((data, key) => (
        <React.Fragment key={key}>
          <Card
            onClick={() => {
              handleClickSlug(data?.product_name);
            }}
            sx={{
              backgroundColor: "#fafafa ",
              marginBottom: "20px",
            }}>
            <CardActionArea>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <div>
                  <CardMedia
                    component="img"
                    height="150"
                    image={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${data?.product_picture}`}
                    alt={data?.product_name}
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        mb: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}>
                      {capitalize(data?.product_name)}
                      <span>
                        <Typography variant="body2" color="text.secondary">
                          ( {capitalize(data?.color)} ) ({" "}
                          {capitalize(data?.size)} ) ( {data?.qty} pcs )
                        </Typography>
                      </span>
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                        color: "#db3022",
                        fontWeight: "bold",
                      }}>
                      Rp.{convertNumber(data?.total_est)}
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
                        {capitalize(data?.store_name)}
                      </Typography>
                      &nbsp; &nbsp;
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          justifyContent: "flex-start",
                          display: "flex",
                          mt: 2,
                          fontWeight: "bold",
                        }}>
                        <strong>Order ID: </strong>&nbsp;
                        {data?.checkout_id}
                      </Typography>
                    </span>
                  </CardContent>
                </div>
              </div>
            </CardActionArea>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loading}
              disabled={!loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Card>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div>
      <Head>
        <title>History | Tuku</title>
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
                    TRANSACTION HISTORY
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
                        label="Paid"
                        sx={{
                          "&.Mui-selected": {
                            color: "#DB3022",
                            borderBottom: "2px solid #DB3022",
                          },
                        }}
                      />
                      <Tab
                        label="Not Paid"
                        sx={{
                          "&.Mui-selected": {
                            color: "#DB3022",
                            borderBottom: "2px solid #DB3022",
                          },
                        }}
                      />
                    </Tabs>
                  </Box>

                  {value == 0 ? renderPaid : renderNotPaid}
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

  const paid = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/detail`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const notPaid = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/detail/history`,
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
      paid: paid.data.data,
      notPaid: notPaid.data.data,
    },
  };
}
