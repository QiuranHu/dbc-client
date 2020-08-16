import React from 'react';
import 'fontsource-roboto';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Drawer, List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { withRouter } from "react-router";

export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: drawerWidth,
      padding: '0'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  }),
);

function Sider(props: any) {
  const classes = useStyles();
  const drawerOpen = props.drawerOpen;
  const changeDrawer = props.changeDrawer;
  let isSmallScreen = true;
  if (isWidthUp('md', props.width)) {
    isSmallScreen = false;
  }
  const goToCreate = () => {
    props.history.push('/create');
    if(isSmallScreen) {
      changeDrawer();
    }
  };
  const goToHome = (): void => {
    props.history.push('/');
    if(isSmallScreen) {
      changeDrawer();
    }
  };
  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={changeDrawer}
        anchor="left"
        variant={isSmallScreen ? 'temporary' : "persistent"}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={changeDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.list}>
          <ListItem button key={1} onClick={goToHome}>
            <ListItemIcon>
              <HomeRoundedIcon
                color="primary"
              />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
        </List>
        <List className={classes.list}>
          <ListItem button key={1} onClick={goToCreate}>
            <ListItemIcon>
              <AddBoxIcon
                color="primary"
              />
            </ListItemIcon>
            <ListItemText primary={'Create'} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default withWidth()(withRouter(Sider));
