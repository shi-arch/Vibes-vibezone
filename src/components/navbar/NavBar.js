import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import './NavBar.css';

const NavBar = () => {

  return (
    <AppBar position='static' sx={{backgroundColor:'#ffffff', color:'#2b2b2b', fontFamily:'Poppins, Arial'}}>
      <Toolbar>
        <Typography variant='h6' component='div' flexGrow={0.90} marginLeft='30px' fontWeight='600'><span className='vibe-heading'>Vibe</span>Zone</Typography>
        <Box spacing={2} sx={{ display: 'flex', gap: '50px',}}>
          <Button sx={{color:'#2b2b2b', textTransform:'none', fontSize:'12px', fontWeight:'600'}}>
            Home
          </Button>
          <Button sx={{color:'#2b2b2b', textTransform:'none', fontSize:'12px', fontWeight:'600'}}>
            About
          </Button>
          <Button sx={{color:'#2b2b2b', textTransform:'none', fontSize:'12px', fontWeight:'600'}}>
            Early Access
          </Button>
          <Button sx={{color:'#2b2b2b', textTransform:'none', fontSize:'12px', fontWeight:'600'}}>
            Pricing
          </Button>
          <Button sx={{color:'#2b2b2b', textTransform:'none', fontSize:'12px', fontWeight:'600'}}>
            Contact
          </Button>
          <Button sx={{backgroundColor:'#8f47ff', color:'#ffffff', textTransform:'none', fontSize:'12px', fontWeight:'600', '&:hover':{backgroundColor:'#8f47ff', color:'#ffffff'}}}>
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar;