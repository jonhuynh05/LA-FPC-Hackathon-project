import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { LinkRoute } from './style';

import HomeIcon from '@material-ui/icons/Home';
import EcoIcon from '@material-ui/icons/Eco';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GavelIcon from '@material-ui/icons/Gavel';
import InfoIcon from '@material-ui/icons/Info';
import AssignmentIcon from '@material-ui/icons/Assignment';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#2e6472',
    height: '118px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth, 
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function SideNav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSustainCollapse, setOpenSustainCollapse] = React.useState(false)
  const [openHealthCollapse, setOpenHealthCollapse] = React.useState(false)
  const [openAffordableCollapse, setOpenAffordableCollapse] = React.useState(false)
  const [openFairnessCollapse, setOpenFairnessCollapse] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenSustainSettings = () => {
    setOpenSustainCollapse(!openSustainCollapse);
  };
  const handleOpenHealthSettings = () => {
    setOpenHealthCollapse(!openHealthCollapse);
  };
  const handleOpenAffordableSettings = () => {
    setOpenAffordableCollapse(!openAffordableCollapse);
  };
  const handleOpenFairnessSettings = () => {
    setOpenFairnessCollapse(!openFairnessCollapse);
  };

  const affordGroups = props.state.affordable.map((afford, i) => {
    return(
      <ListItem key={i} button onClick={props.handleDataFilter} value={afford.group} className={classes.nested}>
        <ListItemText value={afford.group} primary={afford.group} />
      </ListItem>
    )
  })

  const fairGroups = props.state.fairness.map((fair, i) => {
    return(
      <ListItem key={i} button onClick={props.handleDataFilter} value={fair.group} className={classes.nested}>
        <ListItemText value={fair.group} primary={fair.group} />
      </ListItem>
    )
  })

  console.log(props)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
          variant="h4" 
          font="arial"

          noWrap>
            <LinkRoute to="/" onClick={props.handleDataReset}>
                <IconButton
                    color="white"
                  colorPrimary="white"
                >
                    LAFPC DashBoard
                </IconButton>
            </LinkRoute>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <List>
          <ListItem button onClick={handleOpenSustainSettings}>
            <ListItemIcon>
              <EcoIcon />
            </ListItemIcon>
            <LinkRoute to="/sustainable" onClick={props.handleDataReset}>
              <ListItemText primary="Sustainability" />
            </LinkRoute>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSustainCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="LAND USE" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="FARMS" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="FARMERS MARKETS" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="GARDENS and NURSERIES" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="PESTICIDES and EMISSIONS"/>
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="FOOD WASTE" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleOpenHealthSettings}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <LinkRoute to="/healthy" onClick={props.handleDataReset}>
              <ListItemText primary="Health" />
            </LinkRoute>
              {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openHealthCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="RETAIL OUTLETS" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="HEALTH OUTCOMES"/>
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleOpenAffordableSettings}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <LinkRoute to="/affordable" onClick={props.handleDataReset}>
              <ListItemText className primary="Affordability" />
            </LinkRoute>
              {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

            <Collapse in={openAffordableCollapse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {affordGroups}
              </List>
            </Collapse>

          <ListItem button onClick={handleOpenFairnessSettings}>
            <ListItemIcon>
              <GavelIcon />
            </ListItemIcon>
            <LinkRoute to="/fair" onClick={props.handleDataReset}>
              <ListItemText primary="Fairness" />
            </LinkRoute>
              {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openFairnessCollapse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {fairGroups}
              </List>
          </Collapse>

        </List>
        <Divider />
        <List>
          {['FAQ', 'Resources'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InfoIcon /> : <AssignmentIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
