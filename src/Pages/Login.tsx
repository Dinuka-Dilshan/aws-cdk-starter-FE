import {
  Button,
  CircularProgress,
  Grid2,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { ROUTES } from "../constants/Routes";
import { isEmail, isValidPassword } from "../utils/validators";

const Container = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F6F2EB",
});

const ErrorText = ({ error }: { error?: string }) =>
  error ? (
    <Typography variant="caption" color="error">
      {error}
    </Typography>
  ) : null;

const Login = () => {
  const { logIn, user, isAuthenticating, error } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const sumbmitHandler = () => {
    const isEmailVaid = isEmail(emailRef.current?.value);
    const isPasswordValid = isValidPassword(passwordRef.current?.value);

    if (isEmailVaid && isPasswordValid) {
      logIn({
        username: emailRef.current?.value as string,
        password: passwordRef.current?.value as string,
      });
      return;
    }

    if (!isEmailVaid) {
      setEmailError("Invalid Email ");
    }

    if (!isPasswordValid) {
      setPasswordError("Invalid Password");
    }
  };

  if (user) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <Container>
      <Grid2
        container
        spacing={2}
        sx={{
          p: "2rem",
          borderRadius: "1rem",
          width: { lg: "25%", xs: "100%" },
          mx: { xs: "1rem", lg: 0 },
          bgcolor: "white",
          boxShadow: "10px 10px 50px #e3e3e3, -10px -10px 50px #ffffff",
        }}
      >
        <Grid2 size={{ xs: 12 }}>
          <Typography fontWeight="bold" variant="h6" textAlign="center">
            Login
          </Typography>
          <Typography mt="0.4rem" variant="subtitle2" textAlign="center">
            Hey, Let's enter your details to get sign in to your account
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }} mt="1rem">
          <TextField
            inputRef={emailRef}
            size="small"
            placeholder="Email"
            label="Email"
            fullWidth
            type="email"
          />
          <ErrorText error={emailError} />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            size="small"
            inputRef={passwordRef}
            placeholder="Password"
            label="Password"
            fullWidth
            type="password"
          />
          <ErrorText error={passwordError} />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Button
            onClick={sumbmitHandler}
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#9457C9" }}
            disabled={isAuthenticating}
          >
            {isAuthenticating && (
              <CircularProgress
                size="20px"
                sx={{ mr: "2rem", color: "#9457C9" }}
              />
            )}
            Sign In
          </Button>
        </Grid2>
        {error && (
          <Grid2 size={{ xs: 12 }}>
            <ErrorText error={error} />
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
};

export default Login;
