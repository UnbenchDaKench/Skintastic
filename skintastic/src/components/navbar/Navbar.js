import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Drawer,
  IconButton,
  Paper,
  Divider,
  Badge,
  Stack,
  Menu,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";


const drawerWidth = {
  xs: "240px",
  md: "100%",
};

const navLinks = ["Skincare", "Makeup", "Nails", "Brands"];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [gallery, setGallery] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartCount, setCartCount] = useState(props.currentCartCount);

  const open = Boolean(anchorEl);
  const navigate = useNavigate()

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClicked = () => {
    setAnchorEl(null);
    navigate("/login")
  };
  const handleLogoutClicked = () => {
    setAnchorEl(null);
    Auth.signOut()
  };
  const handleAccountClicked = () =>{
    setAnchorEl(null);
    navigate("/account")
  }

  const handleChange = (event) => {
    setGallery(event.target.value);
  };
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    console.log(props.user)
  }, []);
  const drawer = (
    <div className="nav-container">
      <List
        sx={{
          display: {
            xs: "block",
            sm: "flex",
          },
          position: "relative",
          mt: {
            xs: "30%",
            sm: "0%",
          },
        }}
      >
        {navLinks.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onMouseOver={() => props.handleLinkHover(text)}
            // onMouseOut={() => props.handleLinkLeave()}
          >
            <Link to={"/" + text}>
              <ListItemButton>
                <ListItemText
                  disableTypography
                  primary={text}
                  sx={{ fontFamily: "Raleway" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Paper
      className="NavBar"
      // onMouseOver={() => props.handleLinkLeave()}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Box
        component="nav"
        //position="static"
        sx={{
          width: {
            sm: drawerWidth,
          },
          //backgroundColor: "rgba(255, 255, 255, 0.3)",
          display: "flex",
          justifyContent: { sm: "center" },
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          {drawer}
        </Box>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, ml: 1, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "100%",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <IconButton
        sx={{
          height: "100%",
        }}
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleProfileMenuClick}
      >
        <AccountCircleIcon />
      </IconButton>
      {props.user == null ? (
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleProfileMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLoginClicked}>Login</MenuItem>
        </Menu>
      ) : (
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleProfileMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleAccountClicked}>Account</MenuItem>
          <MenuItem onClick={handleLogoutClicked}>Logout</MenuItem>
        </Menu>
      )}
      <IconButton
        sx={{
          mr: "5vw",
          height: "100%",
        }}
        onClick={props.handleCartClicked}
      >
        <Badge badgeContent={props.currentCartCount} color="warning">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Paper>
  );
}

export default Navbar;
