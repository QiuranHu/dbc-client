import React, { FormEvent, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 10,
            marginTop: 20
        },
        inputContainer: {
            display: 'flex',
            justifyContent: "center"
        },
        input: {
            width: 350
        }
    })
);

export function Create(props: any) {
    const classes = useStyles();
    const [ state, setState ] = useState({
        name: '',
        intro: '',
        email: '',
        phone: '',
        resume: '',
        cardNumber: ''
    });
    const handleInputChange = (type: string, value: string): void => {
        setState({ ...state, [type]: value });
    }
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(state)
        })
    };
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        id="standard-basic"
                        label="Name"
                        className={classes.input}
                        variant="outlined"
                        value={state.name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('name', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        id="standard-basic"
                        label="Intro"
                        className={classes.input}
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('intro', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        id="standard-basic"
                        label="Email"
                        className={classes.input}
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('email', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        id="standard-basic"
                        label="Phone"
                        className={classes.input}
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('phone', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        id="standard-basic"
                        label="Link to Resume"
                        className={classes.input}
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('resume', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        id="standard-basic"
                        label="Card Number"
                        className={classes.input}
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('cardNumber', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form >
    )
}