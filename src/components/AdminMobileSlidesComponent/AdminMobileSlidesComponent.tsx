import { ArrowBack } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Clear";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SlideModel } from "../../models/SlideModel";
import { deleteSlideById, getAllSlides } from "../../service/slideService";
import "./AdminMobileSlidesComponent.css";
import { formatDateToLocaleString } from "../../utils/utils";

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

        const preloadImages = sortedData.map((slide) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = slide.url;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        });

        Promise.all(preloadImages).then(() => {
          setSlides(sortedData);
          setAllImagesLoaded(true);
        });
      }
    });
  }, []);

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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2em",
        }}
      >
        <CircularProgress sx={{ color: "#f2a9a0" }} />
        <Typography>Loading images...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: "radial-gradient(circle at top, #6c3a40, #4c2b2f, #2c1a1e)",
      }}
    >
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          padding: "1em",
        }}
      >
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
          padding: "0 1.5em 0 1em",
        }}
      >
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              width: "100%",
              height: "55px",
              display: "flex",
              borderRadius: "0.5em",
              justifyContent: "space-between",
              padding: "0.3em",
              gap: "0.75em",
              background: "rgba(179, 175, 175, 0.15)",
            }}
          >
            <Box sx={{ width: "20%", height: "55px" }}>
              <img
                src={slide.url}
                alt="slide"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0.75em",
                  display: "block",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                overflow: "hidden",
              }}
            >
              <Typography className="slide-timestamp">
                {formatDateToLocaleString(slide.created!)}
              </Typography>
              <Typography className="slide-email">{slide.createdBy}</Typography>
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
              <DeleteIcon sx={{ fontSize: "2.5em" }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AdminMobileSlidesComponent;
