import { Add, Edit } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlideModel } from "../../models/SlideModel";
import { uploadFile } from "../../service/fileUploadService";
import { createSlide } from "../../service/slideService";
import "./AdminMobileComponent.css";

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
        height: "90vh !important",
        paddingTop: "10vh",
        margin: "0 !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        gap: "1em",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
        }}
      >
        {feedBack !== "" && <Typography color="warning">{feedBack}</Typography>}
      </Container>
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
