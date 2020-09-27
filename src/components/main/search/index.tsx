import React, { SyntheticEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CropFreeIcon from '@material-ui/icons/CropFree';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);
interface SearchProps {
  value: string;
  onChange: (event: SyntheticEvent) => void;
  children: React.ReactNode;
  search: () => void;
};

export const Search = (props: SearchProps) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Identifier"
        inputProps={{ 'aria-label': 'Identifier' }}
        value={props.value}
        onChange={(event: SyntheticEvent) => props.onChange(event)}
      />
      <IconButton 
      type="submit" 
      className={classes.iconButton} 
      aria-label="search"
      onClick={(event: any) => {
        event.preventDefault();
        props.search();
      }}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label="directions">
        <CropFreeIcon />
      </IconButton>
    </Paper>
  );
}