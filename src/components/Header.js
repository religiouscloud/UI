import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  appbar: {
    background: 'rgb(18, 107, 158)',
    position: 'absolute',
    zIndex: 100,
    height: '70px',
  },
  btn : {
    margin: '0 20px',
    fontFamily: 'Nunito',
    color: '#fff',
  },
  appbarWrapper: {
    width: '80%',
    margin: 'auto auto',
  },
  content: {
    justifyContent: 'center',
    width: '80%',
    margin: '0 auto',
    alignItems: 'center',
    fontFamily: 'Nunito',
    color: '#fff',
    fontSize: '1.2rem',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#0f4ead',
    fontSize: '2rem',
  },
  colorText: {
    color: '#0f4ead',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.0rem',
  },
  goDown: {
    color: '#0f4ead',
    fontSize: '4rem',
  },
}));
const Header = props => {
  const { history } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
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
      pageURL: "/"
    },
    {
        menuTitle: "TempleSearch",
        pageURL: "/templeSearch"
      },
    {
      menuTitle: "Add",
      pageURL: "/create"
    },
    {
      menuTitle: "About",
      pageURL: "/about"
    }
  ];

  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            TempleSearch
          </h1>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.icon}
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon className={classes.icon}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : (
            <div >
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
                Add
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

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />
            Temple<span className={classes.colorText}>Search.</span>
          </h1>
          <p className={classes.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu</p>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}

export default withRouter(Header);