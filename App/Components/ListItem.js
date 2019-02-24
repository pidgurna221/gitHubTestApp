import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';

import DinamicallyLoadedImage from './DynamicallyLoadedImage';
import { Values, Images } from '../Themes'

const IS_PLATFORM_ANDROID = Platform.OS === 'android';

class ListItem extends Component {

    renderImage(url) {
        if (IS_PLATFORM_ANDROID) {
            return (
                <DinamicallyLoadedImage
                    uri={url}
                    style={styles.image}
                />
            );
        } else {
            return (
                <Image
                    defaultSource={Images.placeholder}
                    source={{ uri: url }}
                    style={styles.image}
                />
            );
        }
    }

    render() {
        const { props } = this;
        return(
            <TouchableOpacity
                style={styles.main}
                onPress={props.navigateToFollowers}
            >
                {this.renderImage(props.avatarUrl)}
                <View>
                    <Text>login: {props.login}</Text>
                    <Text style={styles.url}>{props.url}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}



export default ListItem;

const styles = StyleSheet.create({
    main: {
        width: Values.screenWidth * 0.9,
        height: 60,
        alignSelf: 'center',
        marginVertical: 7,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 10
    },
    url: {
        fontSize: 10
    }
});
