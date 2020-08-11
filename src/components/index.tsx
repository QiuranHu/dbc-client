import React from 'react';
import 'fontsource-roboto';
import './index.scss';
import Header from './header';
import Sider from './sider';
import { Main }  from './main';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { drawerWidth } from './sider';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentShift: {
        [theme.breakpoints.up('md')]: {
            marginLeft: drawerWidth
        }
    }
  }),
);

function App(props: any) {

    const classes = useStyles();
    const [state, setState] = React.useState({
        drawerOpen: false,
        isFirstTimeOpen: true
    });
    if (isWidthUp('md', props.width) && state.drawerOpen === false && state.isFirstTimeOpen === true) {
        setState({drawerOpen: true, isFirstTimeOpen: false});
    }
    const changeDrawer = () => {
        setState({ ...state, drawerOpen: !state.drawerOpen });
    }
    return (
        <>
            <Sider
                drawerOpen={state.drawerOpen}
                changeDrawer={changeDrawer}
            >

            </Sider>
            <div className={state.drawerOpen ? classes.contentShift : ''}>
                <Header
                    drawerOpen={state.drawerOpen}
                    changeDrawer={changeDrawer}
                ></Header>
                <Main></Main>
            </div>
        </>
    );
}

export default withWidth()(App);
