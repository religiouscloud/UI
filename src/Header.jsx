import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import StrikethroughSSharpIcon from "@material-ui/icons/StrikethroughSSharp";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10vh",
    fontFamily: "Nunito",
  },
  appbar: {
    background: "rgb(18, 107, 158)",
    height: "70px",
  },
  btn: {
    margin: "0 20px",
    fontFamily: "Nunito",
    color: "#fff",
  },
  appbarWrapper: {
    width: "95%",
    margin: "auto auto",
  },

  appbarTitle: {
    flexGrow: "1",
    fontSize: "1.7rem",
  },
  icon: {
    color: "#0f4ead",
    fontSize: "2rem",
  },
  colorText: {
    color: "#0f4ead",
  },
}));
const Header = props => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = pageURL => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/",
    },
    {
      menuTitle: "TempleSearch",
      pageURL: "/templeSearch",
    },
    {
      menuTitle: "Add Temple",
      pageURL: "/create",
    },
    {
      menuTitle: "Feedback",
      pageURL: "/feedback",
    },
    {
      menuTitle: "About",
      pageURL: "/about",
    }
  ];

    return (
      <div className={classes.root} id="header">
        <AppBar className={classes.appbar} elevation={0}>
          <Toolbar className={classes.appbarWrapper}>
            <h1 className={classes.appbarTitle}>
              <StrikethroughSSharpIcon style={{ fontSize: 30 }} />
              ReligiousCloud
            </h1>

            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  className={classes.icon}
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon className={classes.icon} />
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
                  {menuItems.map((menuItem) => {
                    const { menuTitle, pageURL } = menuItem;
                    return (
                      <MenuItem onClick={() => handleMenuClick(pageURL)}>
                        {menuTitle}
                      </MenuItem>
                    );
                  })}
                  {}
                </Menu>
              </>
            ) : (
              <div>
                <Button
                  className={classes.btn}
                  onClick={() => handleButtonClick("/")}
                >
                  HOME
                </Button>
                <Button
                  className={classes.btn}
                  onClick={() => handleButtonClick("/templeSearch")}
                >
                  TEMPLE SEARCH
                </Button>
                <Button
                  className={classes.btn}
                  onClick={() => handleButtonClick("/create")}
                >
                  Add Temple
                </Button>
                <Button
                  className={classes.btn}
                  onClick={() => handleButtonClick("/feedback")}
                >
                  Feedback
                </Button>
                <Button
                  className={classes.btn}
                  onClick={() => handleButtonClick("/about")}
                >
                  ABOUT
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default withRouter(Header);

