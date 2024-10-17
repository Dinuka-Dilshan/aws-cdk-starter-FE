import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Container = styled(Box)({
  width: "100vw",
  height: "100vh",
  backgroundColor: "#FAFAFA",
});

const Layout = () => {
  return (
    <Container>
      <Box height="8vh">
        <Navbar />
      </Box>
      <Box
        height="92vh"
        boxSizing="border-box"
        m={0}
        p={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Outlet />
      </Box>
    </Container>
  );
};

export default Layout;
