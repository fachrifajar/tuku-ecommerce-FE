import React from "react";
import Link from "next/link";
import style from "../../styles/pages/sidebarStyle.module.scss";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillPencilFill, BsBoxSeam, BsCart2 } from "react-icons/bs";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AiOutlineUser } from "react-icons/ai";

export default function sidebar() {
  const router = useRouter();
  return (
    <div>
      <div className="store mt-5 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#456BF3",
          }}>
          <AiOutlineHome className={`${style.icon}`} size={100} />
        </div>

        <Typography
          variant="body1"
          sx={{
            "&:hover": {
              color: "#DB3022",
            },
            marginLeft: "15px",
            cursor: "pointer",
            color: router.pathname === "/store/profile" ? "#DB3022" : "inherit",
          }}
          onClick={() => {
            router.push("/store/profile");
          }}>
          Profile Store
        </Typography>
      </div>
      <div className="product mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#F36F45",
          }}>
          <BsBoxSeam className={`${style.icon}`} size={100} />
        </div>
        <Typography
          variant="body1"
          sx={{
            "&:hover": {
              color: "#DB3022",
            },
            marginLeft: "15px",
            cursor: "pointer",
            color: router.pathname === "/store/product" ? "#DB3022" : "inherit",
          }}
          onClick={() => {
            router.push("/store/product");
          }}>
          My Products
        </Typography>
      </div>

      <div className="product mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#F36F45",
          }}>
          <BsBoxSeam className={`${style.icon}`} size={100} />
        </div>
        <Typography
          variant="body1"
          sx={{
            "&:hover": {
              color: "#DB3022",
            },
            marginLeft: "15px",
            cursor: "pointer",
            color: router.pathname === "/store/selling" ? "#DB3022" : "inherit",
          }}
          onClick={() => {
            router.push("/store/selling");
          }}>
          Add Products
        </Typography>
      </div>
      <div className="store mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#456BF3",
          }}>
          <AiOutlineUser className={`${style.icon}`} size={100} />
        </div>

        <Typography
          variant="body1"
          sx={{
            "&:hover": {
              color: "#DB3022",
            },
            marginLeft: "15px",
            cursor: "pointer",
            color: router.pathname === "/user/profile" ? "#DB3022" : "inherit",
          }}
          onClick={() => {
            router.push("/user/profile");
          }}>
          My Account
        </Typography>
      </div>
    </div>
  );
}
