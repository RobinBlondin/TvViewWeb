import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Box, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import { SlideModel } from "../../models/SlideModel";
import { createSlide, getAllSlides } from "../../service/slideService";
import SlideCard from "./components/SlideCard";
import { uploadFile } from "../../service/fileUploadService";
import './SlideAdmin.css'
import ImageIcon from '@mui/icons-material/Image'

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

  useEffect(() => {
    if(!open) {
      setSelectedFile(null)
      setPreviewUrl(null)
    }
  }, [open])

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
    setOpen(false);
  }

  const triggerFileInput = () => {
    const input = document.getElementById('fileInput')
    if(input) {
      input.click();
    }
  };

  return (
    <>
      <Box className="sa-main-container">
        <Container className="sa-content-container" sx={{backgroundColor: "background.paper", border: "2px solid", borderRadius: "20px"}}>
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
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{ mb: 2, borderRadius: 50, fontWeight: "bold", backgroundColor: "primary.main" }}
          >
            Add New Slide
          </Button>
        </Container>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box" sx={{backgroundColor: "background.paper"}}>
          <Container className="modal-header-container">
            <Typography variant="h5">
              Upload New Slide
            </Typography>
          </Container>
          <Container className="modal-input-container" sx={{padding: ""}}>
            <Button variant="outlined" color="primary" sx={{borderRadius: 50, border: "2px solid", fontWeight: "bold"}} onClick={triggerFileInput}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            Choose image
            </Button>

    
            <Container
              className="preview-box"
              sx={{
                background: previewUrl ? `url(${previewUrl})` : '',
                backgroundSize: previewUrl ? 'cover' : 'initial', 
                backgroundPosition: previewUrl ? 'center' : 'initial', 
                width: "100%",
                height: "15em",
                display: 'flex',
                justifyContent: 'center',
                margin: 0,
                alignItems: 'center',
                border: '1px solid #ddd',
                backgroundColor: previewUrl ? '' : '#lightgray'
              }}
            >
              {selectedFile === null ? (
                <ImageIcon sx={{ color: 'white', fontSize: "3em" }} />
              ) : (
                <></>
              )}
            </Container>
          </Container>  
          <Container className="modal-button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{borderRadius: 50, fontWeight: "bold", width: "25%", height: "85%"}}
            >
              Save
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              sx={{borderRadius: 50, border: "2px solid", fontWeight: "bold", height: "85%"}}            >
              Cancel
            </Button>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default SlideAdmin;
