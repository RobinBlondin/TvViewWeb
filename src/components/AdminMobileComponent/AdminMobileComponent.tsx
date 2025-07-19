import { Add, CheckCircle, Alarm, Image } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { SlideModel } from "../../models/SlideModel";
import { uploadFile } from "../../service/fileUploadService";
import { createSlide } from "../../service/slideService";
import "./AdminMobileComponent.css";

const AdminMobileComponent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {}, []);

  const handleClick = (action: string) => {
    if (action === "edit-reminder") {
      window.location.href = "/reminders";
    } else if (action === "edit-slide") {
      window.location.href = "/slides";
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setUploadProgress(0);
    setLoading(true);

    let completed = 0;

    const uploadPromises = fileArray.map(async (file) => {
      const url = await uploadFile(file);
      const slide = new SlideModel(null, url, null, null);
      await createSlide(slide);
      completed++;
      setUploadProgress(Math.round((completed / fileArray.length) * 100));
    });

    await Promise.all(uploadPromises);

    setUploadProgress(100);
    setLoading(false);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const triggerFileInput = () => {
    const input = document.getElementById("fileInput");
    if (input) {
      input.click();
    }
  };

  if (loading || uploadSuccess) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        {loading ? (
          <>
            <CircularProgress sx={{ color: "#f2a9a0" }} />
            <Typography>Uploading images: {uploadProgress}%</Typography>
          </>
        ) : (
          <>
            <CheckCircle sx={{ fontSize: 60, color: "green" }} />
            <Typography>Upload complete</Typography>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh !important",
        margin: "0 !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: "1em",
      }}
    >
      <Button
        className="menu-button"
        variant="contained"
        startIcon={<Add className="icon" />}
        onClick={triggerFileInput}
      >
        Add Slides
        <input
          type="file"
          multiple
          accept="image/*"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Button>
      <Button
        className="menu-button"
        variant="contained"
        startIcon={<Image className="icon" />}
        onClick={() => handleClick("edit-slide")}
      >
        Slides
      </Button>
      <Button
        className="menu-button"
        variant="contained"
        startIcon={<Alarm className="icon" />}
        onClick={() => handleClick("edit-reminder")}
      >
        Reminders
      </Button>
    </Box>
  );
};

export default AdminMobileComponent;
