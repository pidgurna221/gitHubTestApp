import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Container from '../Components/Container';
import {Button, Text} from "native-base";
import SplashScreen from 'react-native-splash-screen';


class StartScreen extends Component {

    componentDidMount() {
        SplashScreen.hide();
    }
    render () {
        return (
            <Container>
                <Button
                    onPress={() => this.props.navigation.navigate('DisplayScreen')}
                    bordered
                    dark
                    block
                    style={styles.dark}
                >
                    <Text>
                        Start
                    </Text>
                </Button>
            </Container>
        )
    }
}


export default StartScreen;

const styles = StyleSheet.create({
    dark: {
        alignSelf: 'center',
        marginTop: 170,
        width: 200
    },
});
