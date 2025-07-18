import { Add, Edit } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { uploadFile } from "../../service/fileUploadService";
import "./AdminMobileComponent.css";
import { SlideModel } from "../../models/SlideModel";
import { createSlide } from "../../service/slideService";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";

const AdminMobileComponent: React.FC = () => {
  const [feedBack, setFeedBack] = useState<string>("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");

    if (success) {
      if (success === "true") {
        setFeedBack("Slide uploaded successfully...");
      } else if (success === "false") {
        setFeedBack("Error! Could not upload slide...");
      }
    }
  }, []);

  useEffect(() => {
    if (feedBack !== "") {
      setTimeout(() => {
        setFeedBack("");
      }, 5000);
    }
  }, [feedBack]);

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
    const file = event.target.files?.[0];
    if (!file) return;

    await uploadFile(file).then((url) => {
      const slide = new SlideModel(null, url, null, null);
      createSlide(slide).then((res) => {
        if (res) {
          window.location.href = "/?success=true";
        } else {
          window.location.href = "/?success=false";
        }
      });
    });
  };

  const triggerFileInput = () => {
    const input = document.getElementById("fileInput");
    if (input) {
      input.click();
    }
  };

  return (
    <Box
      sx={{
        width: "100vw !important",
        height: "100vh !important",
        padding: "0 !important",
        margin: "0 !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
        background: "radial-gradient(circle at top, #6e3a40, #4c2b2f, #2e1a1e)",
      }}
    >
      {feedBack !== "" && (
        <Typography
          color="warning"
          sx={{
            position: "fixed",
            top: "20%",
            left: "25%",
            zIndex: 100,
            width: "100%",
          }}
        >
          {feedBack}
        </Typography>
      )}
      <Button
        className="menu-button"
        variant="contained"
        startIcon={<Add className="icon" />}
        onClick={triggerFileInput}
      >
        Add Slide
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Button>
      <Button
        className="menu-button"
        variant="contained"
        startIcon={<Edit className="icon" />}
        onClick={() => handleClick("edit-slide")}
      >
        Slides
      </Button>
      <Button
        className="menu-button"
        variant="contained"
        startIcon={<Edit className="icon" />}
        onClick={() => handleClick("edit-reminder")}
      >
        Reminders
      </Button>
    </Box>
  );
};

export default AdminMobileComponent;
