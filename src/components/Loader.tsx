import { Box, Typography } from "@mui/material";
import "./loader.css";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)", // for Safari support
        border: "1px solid rgba(255, 255, 255, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        zIndex: 1000,
      }}
    >
      <div className="loader"></div>
      <Typography variant="caption" fontWeight="bold" sx={{ color: "#EA3E83" }}>
        Loading..
      </Typography>
    </Box>
  );
};

export default Loader;
