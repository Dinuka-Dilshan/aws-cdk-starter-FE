import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import useS3Upload from "../hooks/useS3Upload";
import useTextFieldValue from "../hooks/useTextFieldValue";

const ErrorText = ({ error }: { error?: string }) =>
  error ? (
    <Typography variant="caption" color="error">
      {error}
    </Typography>
  ) : null;

const validator = (value?: string) => {
  if (value?.length && value.length > 2) {
    return true;
  }

  return false;
};

const CreateSpace = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const { error, handleUpload, isUploading } = useS3Upload();
  const { handleFetch, isLoading } = useFetch<CreateSpaceApiResponse>();

  const {
    isValid: isNameValid,
    onChangeHandler: setName,
    value: name,
  } = useTextFieldValue<string>("", validator);

  const {
    isValid: isLocationValid,
    onChangeHandler: setLocation,
    value: location,
  } = useTextFieldValue("", validator);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
  };

  const handleCreateSpace = async () => {
    const fileUrl = await handleUpload(file);
    if (!fileUrl) {
      return;
    }

    await handleFetch("spaces", "POST", {
      location,
      imageUrl: fileUrl,
      name,
    });
  };

  return (
    <Grid2
      container
      spacing={2}
      sx={{
        p: "2rem",
        borderRadius: "1rem",
        width: { xs: "100%", sm: "80%", md: "60%", lg: "30%" },
        mx: { xs: "1rem", lg: 0 },
        bgcolor: "white",
        boxShadow: "10px 10px 50px #e3e3e3, -10px -10px 50px #ffffff",
      }}
    >
      <Grid2 size={{ xs: 12 }}>
        <Typography fontWeight="bold" variant="h6" textAlign="center">
          Create Space
        </Typography>
        <Typography mt="0.4rem" variant="subtitle2" textAlign="center">
          Hey, Let's enter space details to save it to our database
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <ErrorText error={error} />
      </Grid2>
      <Grid2 size={{ xs: 12 }} mt="1rem">
        <TextField
          size="small"
          placeholder="Space Name"
          label="Space Name"
          fullWidth
          type="text"
          value={name}
          onChange={setName}
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <TextField
          size="small"
          placeholder="Space Location"
          label="Space Location"
          fullWidth
          type="text"
          value={location}
          onChange={setLocation}
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderColor: (theme) => theme.palette.grey[400],
            justifyContent: "flex-start",
            gap: "0.3rem",
            pl: "0.5rem",
            py: "0.4rem",
            ":hover": {
              backgroundColor: "transparent",
              border: "1px solid",
              borderColor: "black",
            },
          }}
          onClick={() => {
            if (ref.current) {
              ref.current.value = "";
              setFile(undefined);
              ref.current.click();
            }
          }}
        >
          {file ? (
            <Box
              sx={{
                background: file ? `url(${URL.createObjectURL(file)})` : "",
                height: "42px",
                width: "42px",
                backgroundSize: "cover",
                borderRadius: "0.5rem",
              }}
            />
          ) : (
            <PhotoCameraOutlinedIcon
              sx={{
                color: file
                  ? "success.main"
                  : (theme) => theme.palette.grey[600],
              }}
            />
          )}

          <Typography sx={{ color: (theme) => theme.palette.grey[600] }}>
            {file
              ? `${file.name.slice(0, 20)}${file.name.length > 20 ? "..." : ""}`
              : "Space Image"}
          </Typography>
          <input
            accept="image/png, image/gif, image/jpeg, image/webp"
            ref={ref}
            type="file"
            hidden
            onChange={handleChangeFile}
          />
        </Button>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#9457C9" }}
          onClick={handleCreateSpace}
          disabled={
            isUploading || isLoading || !isNameValid || !isLocationValid
          }
        >
          {(isUploading || isLoading) && (
            <CircularProgress
              size="20px"
              sx={{ mr: "2rem", color: "#9457C9" }}
            />
          )}
          {isUploading
            ? "Uploading Image"
            : isLoading
            ? "Creating Space..."
            : "Create Space"}
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default CreateSpace;
