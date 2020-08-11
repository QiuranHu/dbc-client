import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Search } from './search';
import './index.scss';
import BusinessCard from './card';


export class Main extends React.Component {
    state = {
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
    search = () => {
        if (this.state.currentCardNumber) {
            const url = '/card?cardNumber=' + this.state.currentCardNumber;
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
                console.log(data);
                this.setState({
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    intro: data.intro,
                    resume: data.resume
                });
            }).catch(() => {
                this.setState({name: ''})
            });
        }
    }
    render() {
        return (
            <>
                <div className="root">
                    <Grid container spacing={3}>
                        <Grid item xs={12} className="search-container">
                            <Search
                                value={this.state.currentCardNumber}
                                onChange={(event: any) => this.onCardNumberChange(event)}
                                search={() => this.search()}
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
                                    >
                                        
                                    </BusinessCard>
                                )
                            }
                            {/*  */}
                        </Grid>
                    </Grid>
                </div>
            </>
        )
    }
}
