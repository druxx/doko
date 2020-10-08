import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, MenuList, MenuItem, ListItemText, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { NavLink, withRouter } from 'react-router-dom';
import Routes from '../routes/Routes';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    }
})

class NavigationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: false
    };
  }

  handleDrawerOpen = () => {
    this.setState({ drawerIsOpen: true});
  };

  handleDrawerClose = () => {
    this.setState({ drawerIsOpen: false});
  };

  activeRoute = (routeName) => {
    return this.props.location.pathname === routeName ? true : false;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.handleDrawerOpen}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                DoKo Lac Leman
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <Drawer open={this.state.drawerIsOpen} onClose={this.handleDrawerClose} onClick={this.handleDrawerClose}>
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <MenuList>
            {Routes.map((prop, key) => {
              if (prop.hidden)
                return null;
              else
                return (
                  <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key}>
                    <MenuItem selected={this.activeRoute(prop.path)}>
                      <ListItemText primary={prop.sidebarName} />
                    </MenuItem>
                  </NavLink>
                );
            })}
          </MenuList>
        </Drawer>
      </div>
  );

  }
}

export default withStyles(styles, { withTheme: true })(withRouter(NavigationBar));
