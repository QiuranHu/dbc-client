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
export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: drawerWidth
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
            <ListItem button key={1}>
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

export default withWidth()(Sider);
