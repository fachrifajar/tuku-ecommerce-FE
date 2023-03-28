import React from "react";
// import Link from "next/link";
import { Link, Typography } from "@mui/material";
import style from "../../styles/pages/sidebarStyle.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillPencilFill, BsShop, BsCart2 } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";

export default function sidebar() {
  const router = useRouter();

  const isAuthSeller = JSON.parse(localStorage.getItem("profile"));

  // console.log(isAuthSeller);

  return (
    <div>
      <div className="store mt-5 d-flex align-items-center">
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

      <div className="product mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#F3456F",
          }}>
          <BsCart2 className={`${style.icon}`} size={100} />
        </div>

        <Typography
          variant="body1"
          sx={{
            "&:hover": {
              color: "#DB3022",
            },
            marginLeft: "15px",
            cursor: "pointer",
            color: router.pathname === "/user/order" ? "#DB3022" : "inherit",
          }}
          onClick={() => {
            router.push("/user/order");
          }}>
          My Order
        </Typography>
      </div>
      {isAuthSeller?.seller_id ? (
        <div className="product mt-3 d-flex align-items-center">
          <div
            className={`${style.bgIcon}`}
            style={{
              backgroundColor: "#DB3022",
            }}>
            <BsShop className={`${style.icon}`} size={100} />
          </div>

          <Typography
            variant="body1"
            sx={{
              "&:hover": {
                color: "#DB3022",
              },
              marginLeft: "15px",
              cursor: "pointer",
              color:
                router.pathname === "/store/profile" ? "#DB3022" : "inherit",
            }}
            onClick={() => {
              router.push("/store/profile");
            }}>
            Shop
          </Typography>
        </div>
      ) : null}
    </div>
  );
}
