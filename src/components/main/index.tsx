import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Search } from './search';
import './index.scss';
import BusinessCard from './card';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import QRCode from 'qrcode.react';

export interface MainProps extends RouteComponentProps {
};

interface MainState {
    currentCardNumber: string;
    name: string;
    phone: string;
    email: string;
    intro: string;
    resume: string;
};

export class Main extends React.Component<MainProps, MainState> {
    state: MainState = {
        currentCardNumber: '',
        name: '',
        phone: '',
        email: '',
        intro: '',
        resume: ''
    }
    onCardNumberChange = (event: any) => {
        this.setState({ currentCardNumber: event.target.value });
    }
    searchWithParameter = (cardNumber: string) => {
        const url = '/card?cardNumber=' + cardNumber;
        const request = async () => {
            let response: any = await fetch(url);

            if (response.ok) { // if HTTP-status is 200-299
                // get the response body (the method explained below)
                let json: any = await response.json();
                return json;
            } else {
                alert("HTTP-Error: " + response.status);
            }
        };
        request().then(data => {
            this.setState({
                name: data.name,
                phone: data.phone,
                email: data.email,
                intro: data.intro,
                resume: data.resume
            });
        }).catch(() => {
            this.setState({ name: '' })
        });
    }
    search = () => {
        if (this.state.currentCardNumber) {
            this.searchWithParameter(this.state.currentCardNumber);
        }
        this.props.history.push({
            pathname: '/',
            search: `?identifier=${this.state.currentCardNumber}`
        });
    }
    private checkQueryParameters = () => {
        const queryParameters = queryString.parse(this.props.location.search);
        if (queryParameters.identifier) {
            const identifier = queryParameters.identifier;
            if (typeof (identifier) === 'string') {
                this.searchWithParameter(identifier);
                if (this.state.currentCardNumber !== identifier) {
                    this.setState({ currentCardNumber: identifier });
                }
            }
        }
    }
    componentDidMount() {
        this.checkQueryParameters();
    }
    render() {
        return (
            <>
                <div className="root">
                    <Grid container spacing={3}>
                        <Grid item xs={12} className="search-container">
                            <Search
                                value={this.state.currentCardNumber}
                                onChange={(event) => this.onCardNumberChange(event)}
                                search={this.search}
                            >
                            </Search>
                        </Grid>
                        <Grid item xs={12} className="card-container">
                            {
                                this.state.name && (
                                    <BusinessCard
                                        name={this.state.name}
                                        phone={this.state.phone}
                                        email={this.state.email}
                                        intro={this.state.intro}
                                        resume={this.state.resume}
                                        cardNumber={this.state.currentCardNumber}
                                    >
                                    </BusinessCard>
                                )
                            }
                        </Grid>
                        <Grid item xs={12} className='qr-container'>
                            {
                                this.state.currentCardNumber && this.state.name && (
                                    <QRCode value={window.location.href} size={100}></QRCode>
                                )
                            }
                        </Grid>
                    </Grid>
                </div>
            </>
        )
    }
}
