import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Box, Typography } from "@mui/material";
import { SlideModel } from "../../models/SlideModel";
import { createSlide, getAllSlides } from "../../service/slideService";
import SlideCard from "./components/SlideCard";
import { uploadFile } from "../../service/fileUploadService";
import './SlideAdmin.css'

const SlideAdmin: React.FC = () => {
  const [slides, setSlides] = useState<SlideModel[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    getAllSlides().then((data) => {
      if (data) setSlides(data);
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if(selectedFile) {
      uploadFile(selectedFile).then((url) => {
        const slide = new SlideModel(null, url, null, null)
        createSlide(slide).then(slide => {
          setSlides([...slides, slide])
        });
        
      })
    } else {
      console.log("File for upload does not exist")
    }
  }

  return (
    <>
      <Container className="sa-main-container">
        <Container className="sa-content-container">
          {slides?.map((slide) => (
            <SlideCard
              key={slide.id}
              id={slide.id!}
              url={slide.url}
              name={slide.createdBy ?? ""}
              timestamp={slide.created ? slide.created.split("T")[0] : ""}
              slides={slides}
              setSlides={setSlides}
            />
          ))}
        </Container>
        <Container className="sa-button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ mb: 2 }}
          >
            Add New Slide
          </Button>
        </Container>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upload New Slide
          </Typography>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="preview-image" />
          )}

          <Button
            variant="contained"
            color="secondary"
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SlideAdmin;
