import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useRouter } from "next/router";

const CardProductContent = ({ data, key }) => {
  const router = useRouter();

  const capitalize = (str) => {
    if (!str) return "";
    return str.replace(/(^\w|\s\w)/g, function (letter) {
      return letter.toUpperCase();
    });
  };

  const convertNumber = (str) => {
    if (!str) return "";
    return str.replace(/\d(?=(\d{3})+$)/g, "$&.");
  };

  const [loading, setLoading] = React.useState(false);

  const handleClickSlug = (slug) => {
    setLoading(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`)
      .then(({ data }) => {
        // console.log("response", data);
        // dispatch(
        //   productRedux.setData({
        //     data: data?.data[0],
        //   })
        // );
        sessionStorage.setItem("productSlug", JSON.stringify(data?.data[0]));
        router.push(`/product/${slug}`);
        setLoading(false);
      });
  };

  return (
    <Card
      sx={{ maxWidth: 300, marginTop: "50px", marginRight: "20px" }}
      onClick={() => {
        handleClickSlug(data?.slug);
      }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${data?.products_picture[0]?.product_picture}`}
          alt={data?.product_name}
          sx={{
            width: "50vh",
            objectFit: "cover",
          }}
        />
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
                ( {capitalize(data?.category)} )
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
            {`Rp.${convertNumber(data?.price)}`}
          </Typography>
          <span style={{ display: "flex", justifyContent: "space-around" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ justifyContent: "flex-start", display: "flex", mt: 2 }}>
              <strong>Store: </strong>&nbsp;
              {capitalize(data?.store_name)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ justifyContent: "flex-start", display: "flex", mt: 2 }}>
              <strong>Brand: </strong>&nbsp;
              {capitalize(data?.brand)}
            </Typography>
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
              justifyContent: "center",
            }}>
            <span style={{ flexDirection: "row", display: "flex" }}>
              <Rating
                name="read-only"
                value={data?.avg_review}
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
                {data?.avg_review}
              </Typography>
            </span>
          </div>
        </CardContent>
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
  );
};

export default CardProductContent;
