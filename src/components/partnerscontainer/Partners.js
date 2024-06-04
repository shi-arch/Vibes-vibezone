import {Box, Typography} from '@mui/material';



import "./index.css"
const Partners = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          "@media (max-width:426px)":{
            padding:"0px"
        }
        }}
        spacing={2}
        className="partner-container"
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            fontFamily: "Poppins, Arial",
            "@media (max-width:426px)": {
              fontSize: "24px",
              marginTop:"24px"
            },
          }}
          className="partners-text"
        >
          Who are our partners?
        </Typography>
        <Box>
          <Box
            component="img"
            onClick={() => window.open("https://www.soqall.com/", "_blank")}
            sx={{ width: "118px", marginTop: "50px", cursor: "pointer" }}
            src="https://static.wixstatic.com/media/cea51b_1089702f09fc422293c509440ff4d68b~mv2.png/v1/fill/w_181,h_63,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Gradient%20PNG.png"
            className="partners-img"
          />
        </Box>
      </Box>
    );
}

export default Partners;