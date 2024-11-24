import React, { useState, useEffect, useContext } from "react"; 
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from '@mui/material/Avatar';
import { getAccountDetails } from "../../api/tmdb-api";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarMenuAnchor, setAvatarMenuAnchor] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const open = Boolean(anchorEl);
  const avatarMenuOpen = Boolean(avatarMenuAnchor);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "NowPlaying", path: "/movies/nowplaying" },
  ];

    const handleMenuSelect = (pageURL) => {
      navigate(pageURL, { replace: true });
    };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getAvatarUrl = (userData) => {
    const avatarPath = userData?.avatar?.tmdb?.avatar_path;
    const gravatarHash = userData?.avatar?.gravatar?.hash;

    if (avatarPath) {
      return `https://image.tmdb.org/t/p/w200${avatarPath}`;
    } else if (gravatarHash) {
      return `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`;
    } else {
      return "/static/images/avatar/default.jpg";
    }
  };

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    console.log("Session ID from sessionStorage:", sessionId);
    if (sessionId) {
      setIsAuthenticated(true);
      getAccountDetails(sessionId)
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching account details:", error));
    }
  }, []);

  const handleAvatarMenuToggle = (event) => {
    if (avatarMenuOpen) {
      setAvatarMenuAnchor(null); 
    } else {
      setAvatarMenuAnchor(event.currentTarget);
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    
    if (confirmed) {
      sessionStorage.removeItem("sessionId");
      setIsAuthenticated(false);
      setUserData(null);
      alert("You have been logged out.");
    } else {
      alert("Logout canceled.");
    }
    setAvatarMenuAnchor(null); 
  };

  const handleLoginOrLogout = () => {
    if (isAuthenticated) {
      handleLogout();
    } else {
      navigate("/login"); 
      setAvatarMenuAnchor(null); 
    }
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}

          <Avatar
            alt={userData?.username || "User"}
            src={getAvatarUrl(userData)}
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={handleAvatarMenuToggle}
          />

          <Menu
            anchorEl={avatarMenuAnchor}
            open={avatarMenuOpen}
            onClose={() => setAvatarMenuAnchor(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {isAuthenticated ? (
              [
                <MenuItem key="introduction" >Hi,{userData?.username} </MenuItem>,
                <MenuItem key="favourites" onClick={() => navigate("/movies/favorites")}>FAVOURITES</MenuItem>,
                <MenuItem key="watchlist" onClick={() => navigate("/movies/watchlist")}>WATCHLIST</MenuItem>,
                <MenuItem key="logout" onClick={handleLoginOrLogout}>LOGOUT</MenuItem>
              ]
            ) : (
              <MenuItem key="login" onClick={handleLoginOrLogout}>LOGIN</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
