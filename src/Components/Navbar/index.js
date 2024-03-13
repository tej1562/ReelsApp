import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from "../../Assets/ReelsApp.png";
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { authContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UploadFile from '../UploadFile';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Navbar({user}) {
  const {signOut} = React.useContext(authContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const mediaQuery = useMediaQuery('(max-width:400px)');

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileNavigate = () => {
    navigate(`/profile/${user.userId}`)
  }

  const handleHomeNavigate = () => {
    navigate("/")
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logoutUser = async() => {
      await signOut();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
       <MenuItem onClick={handleProfileNavigate}><AccountCircleIcon/>&nbsp;&nbsp;<p>Profile</p></MenuItem>
       <MenuItem onClick={logoutUser}><LogoutIcon/>&nbsp;&nbsp;<p>Logout</p></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
      <MenuItem onClick={handleProfileNavigate}> <AccountCircleIcon/>&nbsp;&nbsp;<p>Profile</p></MenuItem>
      <MenuItem onClick={logoutUser}> <LogoutIcon/>&nbsp;&nbsp;<p>Logout</p></MenuItem>
      </Menu>
  );

  return (
    <div>
      <AppBar sx={{width:"100vw",height:"10vh",backgroundColor:"white"}} position="static">
        <Toolbar style={{display:"flex",justifyContent:"space-between"}}>
         <img src={logo} style={{height:mediaQuery ? "60%" : "70%"}}/>
         <Box sx={{display:"flex"}}>
           <UploadFile user={user}/>
           <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft:"0.5rem" }}>
            <IconButton
              size="large"
              onClick={handleHomeNavigate}
            >
                <HomeIcon sx={{width:"28px",height:"28px",color:"#525252"}} />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <Avatar src={user.profileUrl} sx={{width:"34px",height:"34px"}} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon sx={{color:"black"}} />
            </IconButton>
          </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}