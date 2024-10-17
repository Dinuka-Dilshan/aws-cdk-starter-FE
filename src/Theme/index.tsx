import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: { fontFamily: `Poppins, sans-serif` },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "0.5rem",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          boxShadow: "none",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
