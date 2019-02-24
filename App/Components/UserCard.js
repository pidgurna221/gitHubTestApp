import React from 'react';
import {
    Text,
    StyleSheet,
    View,Image
} from 'react-native';
import Values from "../Themes/Values";

const UserCard = props => (
    <View style={styles.card}>
        <Image
            source={{ uri: props.avatarUrl }}
            style={styles.avatar}
        />
        <View>
            <Text style={styles.login}>{props.login}</Text>
        </View>
    </View>
);


export default UserCard;

const styles = StyleSheet.create({
    card: {
        width: Values.screenWidth * 0.95,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#222222',
        paddingVertical: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginHorizontal: 20
    },
    login: {
        fontSize: 18
    }
});
