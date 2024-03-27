import {Box, Typography} from '@mui/material';

const Partners = () => {
    return (
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',padding:'30px'}} spacing={2}>
            <Typography variant='h6' sx={{fontSize:'30px', fontWeight:'bold', fontFamily:'Poppins, Arial'}}>Who are our partners?</Typography>
            <Box>
                <Box component='img' src='https://res.cloudinary.com/dhczdaczx/image/upload/v1710910698/n7sku215yl7zrjkoktkt.png' sx={{width:'100%'}}/>
            </Box>
        </Box>
    )
}

export default Partners;