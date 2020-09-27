import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import caverImage from '../../../images/live-from-space.jpg';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            [theme.breakpoints.up('xs')]: {
                width: 300,
              },
            [theme.breakpoints.up('sm')]: {
                width: 350,
              },
            
            justifyContent: 'space-between'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        resume: {
            padding: 0
        },
        avatar: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
        crownCard: {
            display: 'flex',
            [theme.breakpoints.up('xs')]: {
                width: 300,
              },
            [theme.breakpoints.up('sm')]: {
                width: 350,
              },
            justifyContent: 'center',
            alignItems: 'center',
        },
        crown: {
            marginTop: 20,
            fontSize: 50,
            marginBottom: 20
        }
    }),
);
interface cardProps {
    name: string;
    phone?: string;
    email?: string;
    resume?: string;
    cardNumber: string;
    intro: string;
    children?: React.ReactNode;
};

export default function BusinessCard(props: cardProps) {
    const classes = useStyles();
    const { name, intro, phone, email } = props;
    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {intro}
                    </Typography>

                    <Typography variant="body1">
                        {phone}
                    </Typography>

                    <Typography variant="body1">
                        {email}
                    </Typography>

                    <Button size="small" href={props.resume ? props.resume : ''}>
                        Resume
                    </Button>

                </CardContent>

            </div>
            <div className={classes.cover}>
                <Avatar variant="rounded" src={caverImage} className={classes.avatar} />
            </div>
        </Card>
    );
}
