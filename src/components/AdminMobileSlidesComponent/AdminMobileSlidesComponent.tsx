import { ArrowBack } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Clear";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SlideModel } from "../../models/SlideModel";
import { deleteSlideById, getAllSlides } from "../../service/slideService";
import "./AdminMobileSlidesComponent.css";

const AdminMobileSlidesComponent: React.FC = () => {
  const [slides, setSlides] = useState<SlideModel[]>([]);
  const [loadedImages, setLoadedImages] = useState(0);
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
    if (slides.length === 0) return;
    console.log("running");
    if (loadedImages >= slides.length) {
      setAllImagesLoaded(true);
    }
  }, [loadedImages, slides]);

  const removeSlide = async (id: string) => {
    console.log(id);
    await deleteSlideById(id).then(() => {
      setSlides([]);
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
        {slides.map((slide) => (
          <img
            key={slide.id}
            src={slide.url}
            style={{ display: "none" }}
            onLoad={() => setLoadedImages((prev) => prev + 1)}
            onError={() => setLoadedImages((prev) => prev + 1)}
            alt=""
          />
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh !important",
        flex: 1,
        padding: "3em 1em 1em 1em !important",
        margin: "0 !important",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        gap: "1.5em",
      }}
      className="mobile-main-container"
    >
      <ArrowBack
        onClick={() => {
          window.location.href = "/";
        }}
        htmlColor="#f2a9a0"
        fontSize="large"
      />
      <Container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          border: "0.5em !important",
          gap: "0.2em",
        }}
      >
        {slides?.map((slide) => (
          <Container
            key={slide.id}
            sx={{
              width: "100%",
              height: "60px",
              display: "flex",
              borderRadius: "0.5em",
              // borderBottom: "solid 0.5px rgba(0, 0, 0, 0.3)",
              justifyContent: "space-between",
              padding: "0.3em",
              background: "rgba(0, 0, 0, 0.15)",
            }}
          >
            <Container
              sx={{
                width: "20%",
                background: `url(${slide.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "0.5em",
              }}
            ></Container>
            <Container
              sx={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "end",
                overflowX: "hidden",
              }}
            >
              <Typography className="slide-title">
                {slide.created?.split("T")[0] +
                  " " +
                  slide.created?.split("T")[1].substring(0, 5)}
              </Typography>
              <Typography className="slide-title">{slide.createdBy}</Typography>
            </Container>
            <Container
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
                width: "20%",
                color: "#e06666",
                padding: "0 !important",
              }}
              onClick={() => removeSlide(slide.id!)}
            >
              <DeleteIcon sx={{ fontSize: "2em" }} />
            </Container>
          </Container>
        ))}
      </Container>
    </Box>
  );
};

export default AdminMobileSlidesComponent;
