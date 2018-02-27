import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
                apiKey: 'AIzaSyDVEG0M_btlgfnksJPSPIGZ30x9iE4-AxI',
                authDomain: 'authentication-c4bfc.firebaseapp.com',
                databaseURL: 'https://authentication-c4bfc.firebaseio.com',
                projectId: 'authentication-c4bfc',
                storageBucket: 'authentication-c4bfc.appspot.com',
                messagingSenderId: '602973488470'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }
    
    renderContent() {
        switch(this.state.loggedIn) {
            case true:
            return (
                <CardSection>
                  <Button onPress={() => firebase.auth().signOut()}>
                    Log Out
                  </Button>
                </CardSection>
            );
            case false:
                return <LoginForm />;
            default:
            return (
                <CardSection>
                    <Spinner size='large' />
                </CardSection>
            );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
