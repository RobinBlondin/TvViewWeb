import { ArrowBack } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Clear";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SlideModel } from "../../models/SlideModel";
import { deleteSlideById, getAllSlides } from "../../service/slideService";
import "./AdminMobileSlidesComponent.css";

const AdminMobileSlidesComponent: React.FC = () => {
  const [slides, setSlides] = useState<SlideModel[]>([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    getAllSlides().then((data) => {
      if (data) {
        const sortedData = data.sort((a, b) => {
          const dateA = a.created ? Date.parse(a.created) : 0;
          const dateB = b.created ? Date.parse(b.created) : 0;
          return dateB - dateA;
        });

        setSlides(sortedData);
      }
    });
  }, []);

  useEffect(() => {
    if (slides.length === 0) {
      setAllImagesLoaded(true);
    }

    let loaded = 0;

    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.url;

      img.onload = () => {
        loaded++;
        if (loaded === slides.length) {
          setAllImagesLoaded(true);
        }
      };

      img.onerror = () => {
        loaded++;
        if (loaded === slides.length) {
          setAllImagesLoaded(true);
        }
      };
    });
  }, [slides]);

  const removeSlide = async (id: string) => {
    await deleteSlideById(id).then(() => {
      const updatedSlides = slides.filter((slide) => slide.id !== id);
      setSlides(updatedSlides);
    });
  };

  if (!allImagesLoaded) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#f2a9a0" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "85vw",
        display: "flex",
        flexDirection: "column",
        background: "radial-gradient(circle at top, #6c3a40, #4c2b2f, #2c1a1e)",
        padding: 0,
      }}
    >
      <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
        <ArrowBack
          onClick={() => (window.location.href = "/")}
          htmlColor="#f2a9a0"
          fontSize="large"
          sx={{ cursor: "pointer" }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "scroll",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },

          display: "flex",
          flexDirection: "column",
          gap: "0.3em",
          paddingRight: "0.5em",
        }}
      >
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              width: "100%",
              height: "60px",
              display: "flex",
              borderRadius: "0.5em",
              justifyContent: "space-between",
              padding: "0.3em",
              gap: "0.3em",
              background: "rgba(0, 0, 0, 0.15)",
            }}
          >
            <Box
              sx={{
                width: "15%",
                background: `url(${slide.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "0.5em",
              }}
            />
            <Box
              sx={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                overflow: "hidden",
              }}
            >
              <Typography className="slide-title">
                {slide.created?.split("T")[0] +
                  " " +
                  slide.created?.split("T")[1].substring(0, 5)}
              </Typography>
              <Typography className="slide-title">{slide.createdBy}</Typography>
            </Box>
            <Box
              sx={{
                width: "20%",
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
                color: "#e06666",
                padding: 0,
              }}
              onClick={() => removeSlide(slide.id!)}
            >
              <DeleteIcon sx={{ fontSize: "2em" }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AdminMobileSlidesComponent;
