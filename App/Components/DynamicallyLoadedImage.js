import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import { Images } from '../Themes';

import FastImage from 'react-native-fast-image'

class DynamicallyLoadedImage extends Component {

    state = {
        showDefault: true
    };

    handleImageLoadEnd = () => this.setState({ showDefault: false });

    render() {

        const { uri, style } = this.props;

        const { showDefault } = this.state;

        return (
            <View style={style}>
                {
                    showDefault
                        ? (
                            <Image
                                style={[styles.poster, { position: 'absolute' }]}
                                source={Images.placeholder}
                            />) : null
                }
                    <FastImage
                        onLoadEnd={this.handleImageLoadEnd}
                        style={styles.poster}
                        source={{ uri }}
                    />
            </View>
        );
    }

}

export default DynamicallyLoadedImage;

const styles = StyleSheet.create({
    poster: {
        width: '100%',
        height: '100%',
        borderRadius: 25
    },
    posterTouchable: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5
    }
});
