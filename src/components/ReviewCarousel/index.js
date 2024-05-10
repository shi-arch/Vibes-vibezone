import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: "San Francisco – Oakland Bay Bridge, United States",
//     imgPath:
//       "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
//   },
//   {
//     label: "Bird",
//     imgPath:
//       "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
//   },
//   {
//     label: "Bali, Indonesia",
//     imgPath:
//       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
//   },
//   {
//     label: "Goč, Serbia",
//     imgPath:
//       "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
//   },
// ];


const data = [
  {
    imgPath:
      "https://res.cloudinary.com/dhczdaczx/image/upload/v1710951576/npbl8whlpiogdyxdrbhl.png",
    quotation:
      "https://res.cloudinary.com/dhczdaczx/image/upload/v1710951697/rodgfftlwdmzanhjey2i.png",
    review:
      "At VibeZone, we are pioneering the next generation of social connectivity. Our platform is more than just an app, it is a movement towards more meaningful digital interaction.",
    name: "Amit Sharma",
    designation: "Product Designer",
  },
  {
    imgPath:
      "https://res.cloudinary.com/dhczdaczx/image/upload/v1710951576/npbl8whlpiogdyxdrbhl.png",
    quotation:
      "https://res.cloudinary.com/dhczdaczx/image/upload/v1710951697/rodgfftlwdmzanhjey2i.png",
    review:
      "At VibeZone, we are pioneering the next generation of social connectivity. Our platform is more than just an app, it is a movement towards more meaningful digital interaction.",
    name: "Kevin",
    designation: "Product Designer",
  },
  {
    imgPath:
      "https://res.cloudinary.com/dhczdaczx/image/upload/v1710906981/vn9fkut0mrqbvmiqtrrl.png",
    quotation:
      "https://res.cloudinary.com/dhczdaczx/image/upload/v1710951697/rodgfftlwdmzanhjey2i.png",
    review:
      "At VibeZone, we are pioneering the next generation of social connectivity. Our platform is more than just an app, it is a movement towards more meaningful digital interaction.",
    name: "Stuart",
    designation: "Product Designer",
  },
];

function ReviewCarousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = data.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={data[activeStep].imgPath}
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, -50%)",
          top: "5px",
          zIndex: 9,
          height:"90px",
          width:"90px",
          borderRadius:"50%"
        }}
      />
      <AutoPlaySwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        autoPlay={false}
      >
        {data.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  width: "100%",
                  margin: "10px",
                  border: "1px solid #ccc",
                  boxShadow: "20px !important",
                }}
              >
                
                <Box
                  sx={{
                    width: "80%",
                    padding: "20px",
                    position: "relative",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {/* <Box
                    component="img"
                    src={step.imgPath}
                    sx={{
                      position: "absolute",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      top: "-5px",
                      zIndex: 99999999,
                    }}
                  /> */}
                  <Box component="img" src={step.quotation} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Poppins, Arial",
                      color: "#2b2b2b",
                      fontSize: "13px",
                    }}
                  >
                    {step.review}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      variant="p"
                      sx={{
                        fontFamily: "Poppins, Arial",
                        color: "#2b2b2b",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      {step.name}
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{
                        fontFamily: "Poppins, Arial",
                        color: "#2b2b2b",
                        fontSize: "12px",
                      }}
                    >
                      {step.designation}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default ReviewCarousel;
