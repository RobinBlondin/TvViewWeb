import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { SlideModel } from "../../models/SlideModel";
import { deleteSlideById, getAllSlides } from "../../service/slideService";
import DeleteIcon from "@mui/icons-material/Clear";
import "./AdminMobileSlidesComponent.css";

const AdminMobileSlidesComponent: React.FC = () => {
  const [slides, setSlides] = useState<SlideModel[]>();

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
  }, [slides]);

  const removeSlide = async (id: string) => {
    console.log(id);
    await deleteSlideById(id).then(() => {
      setSlides([]);
    });
  };
  return (
    <Box
      sx={{
        height: "100%",
        flex: 1,
        padding: "1.5em 1em 1em 1em !important",
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
              height: "70px",
              display: "flex",
              borderBottom: "solid 0.5px rgba(0, 0, 0, 0.3)",
              justifyContent: "space-between",
              padding: "0.3em 0 0.3em 0",
            }}
          >
            <Container
              sx={{
                width: "25%",
                background: `url(${slide.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "0.5em",
              }}
            ></Container>
            <Container
              sx={{
                width: "55%",
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
                alignItems: "center",
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
