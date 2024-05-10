
import React , {useState}from 'react';
import { Box, Typography, IconButton, Card} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './Review.css';
import ReviewCarousel from '../ReviewCarousel';

const data = [
  {
    imgPath: 'https://res.cloudinary.com/dhczdaczx/image/upload/v1710951576/npbl8whlpiogdyxdrbhl.png',
    quotation: 'https://res.cloudinary.com/dhczdaczx/image/upload/v1710951697/rodgfftlwdmzanhjey2i.png',
    review: 'At VibeZone, we are pioneering the next generation of social connectivity. Our platform is more than just an app, it is a movement towards more meaningful digital interaction.',
    name: 'Amit Sharma',
    designation: 'Product Designer'
  },
  {
    imgPath: 'https://res.cloudinary.com/dhczdaczx/image/upload/v1710951576/npbl8whlpiogdyxdrbhl.png',
    quotation: 'https://res.cloudinary.com/dhczdaczx/image/upload/v1710951697/rodgfftlwdmzanhjey2i.png',
    review: 'At VibeZone, we are pioneering the next generation of social connectivity. Our platform is more than just an app, it is a movement towards more meaningful digital interaction.',
    name: 'Kevin',
    designation: 'Product Designer'
  },
  {
    imgPath: 'https://res.cloudinary.com/dhczdaczx/image/upload/v1710951576/npbl8whlpiogdyxdrbhl.png',
    quotation: 'https://res.cloudinary.com/dhczdaczx/image/upload/v1710951697/rodgfftlwdmzanhjey2i.png',
    review: 'At VibeZone, we are pioneering the next generation of social connectivity. Our platform is more than just an app, it is a movement towards more meaningful digital interaction.',
    name: 'Stuart',
    designation: 'Product Designer'
  },
];

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  
  return (
    <Box>
      <Box
        sx={{
          marginBottom: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          "@media (max-width:426px)": {
            padding: "0px",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "30px",
            fontFamily: "Poppins, Arial",
            fontWeight: "bold",
            marginBottom: "100px",
            "@media (max-width:426px)": {
              fontSize: "24px",
              textAlign: "center",
              marginBottom: "44px",
            },
          }}
        >
          What Our Customers are Saying
        </Typography>

        {/* <Box sx={{ display: "flex" }}>
          {data.map((item, index) => (
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
                <Box
                  component="img"
                  src={item.imgPath}
                  sx={{
                    position: "absolute",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    top: "-5px",
                  }}
                />
                <Box component="img" src={item.quotation} />
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Poppins, Arial",
                    color: "#2b2b2b",
                    fontSize: "13px",
                  }}
                >
                  {item.review}
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
                    {item.name}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontFamily: "Poppins, Arial",
                      color: "#2b2b2b",
                      fontSize: "12px",
                    }}
                  >
                    {item.designation}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box> */}
        <ReviewCarousel />
      </Box>
      {/* <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton className="back-arrow" aria-label="back">
          <NavigateBeforeIcon onClick={handlePrevious} />
        </IconButton>
        <IconButton className="next-arrow" aria-label="next">
          <NavigateNextIcon onClick={handleNext} />
        </IconButton>
      </Box> */}
    </Box>
  );
};

export default Review;
