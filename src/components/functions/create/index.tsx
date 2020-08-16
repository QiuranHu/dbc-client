import React, { FormEvent, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    const [state, setState] = useState({
        name: '',
        intro: '',
        email: '',
        phone: '',
        resume: '',
        cardNumber: '',
        error: new Set<string>()
    });
    const [open, setOpen] = React.useState(false);

    const handleSuccess = () => {
      setOpen(true);
    };
  
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    let isValidated: boolean = false;
    const validateEmail = (email: string): boolean => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const validateCardNumber = (cardNumber: string): boolean => {
        return /^\d*$/.test(cardNumber);
    }
    if (state.name !== '' && state.email !== '' && state.cardNumber !== '') {
        isValidated = true;
    }
    if (state.email !== '' && !validateEmail(state.email)) {
        isValidated = false;
        if (!state.error.has('email')) {
            let newError = new Set<string>(state.error);
            newError.add('email');
            setState({ ...state, error: newError });
        }
    } else {
        if (state.error.has('email')) {
            let newError = new Set<string>(state.error);
            newError.delete('email');
            setState({ ...state, error: newError });
        }
    }
    if (state.cardNumber !== '' && !validateCardNumber(state.cardNumber)) {
        isValidated = false;
        if (!state.error.has('cardNumber')) {
            let newError = new Set<string>(state.error);
            newError.add('cardNumber');
            setState({ ...state, error: newError });
        }
    } else {
        if (state.error.has('cardNumber')) {
            let newError = new Set<string>(state.error);
            newError.delete('cardNumber');
            setState({ ...state, error: newError });
        }
    }
    const handleInputChange = (type: string, value: string): void => {
        setState({ ...state, [type]: value });
    };
    const removeAllFields = () : void => {
        setState({
            name: '',
            intro: '',
            email: '',
            phone: '',
            resume: '',
            cardNumber: '',
            error: new Set<string>()
        });
    }
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(state)
        }).then((data) => {
            if (data.ok) {
                data.json().then(json => {
                    if (json.result.ok === 1) {
                        removeAllFields();
                        handleSuccess();
                    }
                })
            }
        })
    };
    return (
        <form className={classes.root} noValidate={false} autoComplete="off" onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        autoComplete='off'
                        id="standard-basic"
                        label="Name"
                        className={classes.input}
                        variant="outlined"
                        value={state.name}
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('name', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        autoComplete='off'
                        id="standard-basic"
                        label="Intro"
                        className={classes.input}
                        value={state.intro}
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('intro', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        error={state.error.has('email') ? true : false}
                        autoComplete='off'
                        id="standard-basic"
                        label="Email"
                        className={classes.input}
                        variant="outlined"
                        value={state.email}
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('email', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        autoComplete='off'
                        id="standard-basic"
                        label="Phone"
                        className={classes.input}
                        variant="outlined"
                        value={state.phone}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('phone', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        autoComplete='off'
                        id="standard-basic"
                        label="Link to Resume"
                        className={classes.input}
                        value={state.resume}
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('resume', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <TextField
                        error={state.error.has('cardNumber') ? true : false}
                        autoComplete='off'
                        id="standard-basic"
                        label="Card Number"
                        className={classes.input}
                        value={state.cardNumber}
                        variant="outlined"
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange('cardNumber', event.target.value))}
                    />
                </Grid>

                <Grid item xs={12} className={classes.inputContainer}>
                    <Button variant="contained" color="primary" type="submit" disabled={!isValidated}>
                        Submit
                    </Button>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Digital business card created.
                    </Alert>
                </Snackbar>
            </Grid>
        </form >
    )
}