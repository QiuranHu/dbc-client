import React from 'react';
import 'fontsource-roboto';
import './index.scss';
import Header from './header';
import Sider from './sider';
import { Main } from './main';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { drawerWidth } from './sider';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Route } from "react-router-dom";
import { Create } from './functions/create';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentShift: {
            [theme.breakpoints.up('md')]: {
                marginLeft: drawerWidth
            }
        }
    }),
);
interface AppProps {
    width: "xs" | "sm" | "md" | "lg" | "xl";
};
function App(props: AppProps) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        drawerOpen: false,
        isFirstTimeOpen: true
    });
    if (isWidthUp('md', props.width) && state.drawerOpen === false && state.isFirstTimeOpen === true) {
        setState({ drawerOpen: true, isFirstTimeOpen: false });
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
                    width={props.width}
                    changeDrawer={changeDrawer}
                ></Header>
                <Route path="/" exact component={Main}>
                </Route>
                <Route path='/create' exact component={Create}>
                </Route>
            </div>
        </>
    );
}

export default withWidth()(App);
