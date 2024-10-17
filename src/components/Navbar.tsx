import { Box, Button, Grid2, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { useAuth } from "../Providers/AuthProvider";

const NAV_LINKS = [
  { path: ROUTES.HOME, label: "Home" },
  { path: ROUTES.PROFILE, label: "Profile" },
  { path: ROUTES.SPACES, label: "Spaces" },
  { path: ROUTES.CREATE_SPACE, label: "Create Space" },
  { path: "Logout", label: "Logout" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logOut } = useAuth();

  const handleNavigate = (path: string) => {
    if (path === "Logout") {
      logOut();
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }
    navigate(path);
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: (theme) => theme.palette.grey[300],
        height: "100%",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Grid2 container sx={{ height: "100%" }} px="2rem">
        <Grid2 size={{ xs: 6 }} display="flex" alignItems="center">
          <Typography fontSize="1.4rem" fontFamily="cursive" color="#0070F3">
            Space Finder
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Grid2
            container
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
            height="100%"
          >
            {NAV_LINKS.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Grid2 key={label}>
                  <Button
                    sx={{
                      backgroundColor: isActive ? "#EA3E83" : "transparent",
                      color: isActive ? "white" : "black",
                    }}
                    onClick={() => handleNavigate(path)}
                  >
                    {label}
                  </Button>
                </Grid2>
              );
            })}
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Navbar;
