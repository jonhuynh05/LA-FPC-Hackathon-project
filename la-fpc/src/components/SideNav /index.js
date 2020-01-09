import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link as LinkRoute } from 'react-router-dom';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
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
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
  const [openCollapse, setOpenCollapse] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenSettings = () => {
    setOpenCollapse(!openCollapse);
  };

  const affordGroups = props.state.affordable.map((afford, i) => {
    console.log(afford.group, "this is group")
    return(
    <Collapse in={openCollapse} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem key={i} button onClick={props.handleDataFilter} value={afford.group} className={classes.nested}>
          <ListItemText value={afford.group} primary={afford.group} />
        </ListItem>
      </List>
    </Collapse>
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
          <Typography variant="h6" noWrap>
            LAFPC DashBoard
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
          <ListItem button onClick={handleOpenSettings}>
            <ListItemIcon>
              <EcoIcon />
            </ListItemIcon>
            <LinkRoute to="/sustainable" onClick={props.handleDataReset}>
              <ListItemText primary="Sustainability" />
            </LinkRoute>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
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

          {affordGroups}

          <ListItem button onClick={handleOpenSettings}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <LinkRoute to="/healthy">
              <ListItemText primary="Health" />
            </LinkRoute>
              {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="RETAIL OUTLETS" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="HEALTH OUTCOMES"/>
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleOpenSettings}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <LinkRoute to="/affordable">
              <ListItemText className primary="Affordability" />
            </LinkRoute>
              {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary="HEALTH OUTCOMES"/>
                    </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemText primary="FRUITS AND VEGETABLES"/>
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemText primary="PARTICIPATION"/>
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemText primary="FARMERS MARKETS"/>
                </ListItem>
                </List>
            </Collapse>

          <ListItem button onClick={handleOpenSettings}>
            <ListItemIcon>
              <GavelIcon />
            </ListItemIcon>
            <LinkRoute to="/fair">
              <ListItemText primary="Fairness" />
            </LinkRoute>
              {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary="OCCUPATION"/>
                    </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemText primary="WAGES"/>
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemText primary="ANIMAL WELFARE"/>
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemText primary="WORKER WELL-BEING"/>
                </ListItem>
                </List>
            </Collapse>
        </List>




        {/* {['Sustainability', 'Health', 'Affordability', 'Fairness'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{<EcoIcon />  <LocalHospitalIcon/> : <MonetizationOnIcon/>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        <Divider />
        <List>
          {['FAQ', 'Resources'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
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
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
}
