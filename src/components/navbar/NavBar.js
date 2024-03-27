import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import './NavBar.css';

const NavBar = () => {

  return (
    <AppBar position='sticky' sx={{backgroundColor:'#ffffff', color:'#2b2b2b', fontFamily:'Poppins, Arial',}}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' fontWeight='600'>
          <span className='vibe-heading'>Vibe</span>Zone
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: { xs: 'flex', md: 'flex' }, alignItems: 'center' }}>
            <Button sx={{color:'#2b2b2b', textTransform:'none', fontSize:'12px', fontWeight:'600' }}>
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
          </Box>
          <Button sx={{backgroundColor:'#8f47ff', color:'#ffffff', textTransform:'none', fontSize:'12px', fontWeight:'600', '&:hover':{backgroundColor:'#8f47ff', color:'#ffffff'}, marginLeft: { xs: 'auto', md: '20px' } }}>
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar;
