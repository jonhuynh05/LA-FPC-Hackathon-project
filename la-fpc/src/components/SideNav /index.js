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

import { LinkRoute, HeaderName} from './style';

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

import "./style.css"
import logo from "./img/Logo 2_hi res.png"



const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#156272',
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
  const [expandHealth, setExpandHealth] = React.useState(false);
  const [expandAffordable, setExpandAffordable] = React.useState(false);
  const [expandSustainable, setExpandSustainable] = React.useState(false);
  const [expandFair, setExpandFair] = React.useState(false);

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
    setExpandSustainable(!expandSustainable);
    props.handleDataReset();
  };
  const handleOpenHealthSettings = () => {
    setOpenHealthCollapse(!openHealthCollapse);
    setExpandHealth(!expandHealth);
    props.handleDataReset();
  };
  const handleOpenAffordableSettings = () => {
    setOpenAffordableCollapse(!openAffordableCollapse);
    setExpandAffordable(!expandAffordable);
    props.handleDataReset();
  };
  const handleOpenFairnessSettings = () => {
    setOpenFairnessCollapse(!openFairnessCollapse);
    setExpandFair(!expandFair);
    props.handleDataReset();
  };

  let healthExpand
  const expandHealthIcon = () => {
    if(expandHealth === false){
      healthExpand = <ExpandMore />
    }
    else{
      healthExpand = <ExpandLess />
    }
  }

  // const affordGroups = props.state.affordable.map((afford, i) => {
  //   return(
  //     <ListItem key={i} button onClick={props.handleDataFilter} value={afford.group} className={classes.nested}>
  //       <ListItemText value={afford.group} primary={afford.group} />
  //     </ListItem>
  //   )
  // })

  // const fairGroups = props.state.fairness.map((fair, i) => {
  //   return(
  //     <ListItem key={i} button onClick={props.handleDataFilter} value={fair.group} className={classes.nested}>
  //       <ListItemText value={fair.group} primary={fair.group} />
  //     </ListItem>
  //   )
  // })

  // const healthyGroups = props.state.healthy.map((health, i) => {
  //   return(
  //     <ListItem key={i} button onClick={props.handleDataFilter} value={health.group} className={classes.nested}>
  //       <ListItemText value={health.group} primary={health.group} />
  //     </ListItem>
  //   )
  // })

  // const sustainGroups = props.state.sustainability.map((sustain, i) => {
  //   return(
  //     <ListItem key={i} button onClick={props.handleDataFilter} value={sustain.group} className={classes.nested}>
  //       <ListItemText value={sustain.group} primary={sustain.group} />
  //     </ListItem>
  //   )
  // })

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <div id="header-container">
          <div id="hamburger-container">
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
            </Toolbar>
          </div>
          <div id="center-header-container">
            <LinkRoute to="/" onClick={props.handleDataReset}>
                <img id="logo" src={logo}/>
                <HeaderName>
                    LAFPC Dashboard
                </HeaderName>
            </LinkRoute>
          </div>
        </div>
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
            <LinkRoute to="/sustainable">
              <ListItemText primary="Sustainability" />
            </LinkRoute>
            {expandSustainable ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSustainCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* {sustainGroups} */}
              {
                  props.state.sustainableGroup.length > 0
                  ?
                  props.state.sustainableGroup.map((data, i) => {
                    return(
                      <LinkRoute to="/sustainable">
                        <ListItem key={i} button onClick={props.handleDataFilter} value={data} className={classes.nested}>
                          <ListItemText value={data} primary={data} />
                        </ListItem>
                      </LinkRoute>
                    )
                  })
                  :
                  null
                }
            </List>
          </Collapse>
          <ListItem button onClick={handleOpenHealthSettings}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <LinkRoute to="/healthy">
              <ListItemText primary="Health" />
            </LinkRoute>
              {expandHealth ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openHealthCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* {healthyGroups} */}
              {
                  props.state.healthyGroup.length > 0
                  ?
                  props.state.healthyGroup.map((data, i) => {
                    return(
                      <LinkRoute to="/healthy">
                        <ListItem key={i} button onClick={props.handleDataFilter} value={data} className={classes.nested}>
                          <ListItemText value={data} primary={data} />
                        </ListItem>
                      </LinkRoute>
                    )
                  })
                  :
                  null
                }
            </List>
          </Collapse>

          <ListItem button onClick={handleOpenAffordableSettings}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <LinkRoute to="/affordable">
              <ListItemText className primary="Affordability" />
            </LinkRoute>
              {expandAffordable ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

            <Collapse in={openAffordableCollapse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* {affordGroups} */}
                {
                  props.state.affordableGroup.length > 0
                  ?
                  props.state.affordableGroup.map((data, i) => {
                    return(
                      <LinkRoute to="/affordable">
                        <ListItem key={i} button onClick={props.handleDataFilter} value={data} className={classes.nested}>
                          <ListItemText value={data} primary={data} /> 
                        </ListItem>
                      </LinkRoute>
                    )
                  })
                  :
                  null
                }
              </List>
            </Collapse>

          <ListItem button onClick={handleOpenFairnessSettings}>
            <ListItemIcon>
              <GavelIcon />
            </ListItemIcon>
            <LinkRoute to="/fair">
              <ListItemText primary="Fairness" />
            </LinkRoute>
              {expandFair ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openFairnessCollapse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* {fairGroups} */}
                {
                  props.state.fairnessGroup.length > 0
                  ?
                  props.state.fairnessGroup.map((data, i) => {
                    return(
                      <LinkRoute to="/fair">
                        <ListItem key={i} button onClick={props.handleDataFilter} value={data} className={classes.nested}>
                          <ListItemText value={data} primary={data} />
                        </ListItem>
                      </LinkRoute>
                    )
                  })
                  :
                  null
                }
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
