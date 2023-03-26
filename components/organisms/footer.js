import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const FooterContent = styled("footer")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "50px 0",
  color: "#fff",
});

const Logo = styled("img")({
  marginBottom: "20px",
});

const Description = styled(Typography)({
  marginBottom: "20px",
});

const Copyright = styled(Typography)({
  marginTop: "50px",
  textAlign: "center",
  color: "#ccc",
});

export default function Footer() {
  return (
    <div style={{ backgroundImage: "linear-gradient(#ee4d2d, #ff7337)" }}>
      <FooterContent>
        <Logo
          src="https://res.cloudinary.com/daouvimjz/image/upload/v1679813105/ecommerce/icon-tuku-white_e7wyws.png"
          alt="Tuku Logo"
          style={{ height: "100%", width: "200px" }}
        />
        <Description variant="body1">
          Tuku is an online fashion store that offers a wide range of stylish
          and affordable clothes for men and women.
        </Description>
        <Copyright>&copy; 2023 Tuku. All rights reserved.</Copyright>
      </FooterContent>
    </div>
  );
}
