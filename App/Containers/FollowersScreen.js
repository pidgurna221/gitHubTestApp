import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Platform,
    ActivityIndicator
} from 'react-native';
import Header from '../Components/Header';
import ListItem from '../Components/ListItem';
import { getFollowersList } from '../Redux/auth/actions';
import { connect } from 'react-redux';
import UserCard from '../Components/UserCard';
import Loader from '../Components/Loader';

class FollowersScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: true
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        const { followers_url } = this.props.navigation.state.params.item;
        this.props.dispatch(getFollowersList(followers_url)).then(response => {
            this.setState({ loader: false });
        }).catch(() => this.setState({ loader: false }));
    };

    renderImageItem = ({ item }) => (
        <ListItem
            login={item.login}
            avatarUrl={item.avatar_url}
            url={item.url}
        />
    );


    renderImages() {
        const { followersList } = this.props;
        return(
            <FlatList
                data={followersList}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.1}
                initialNumToRender={50}
                contentContainerStyle={styles.flatListContainer}
                renderItem={this.renderImageItem}
            />
        )
    };

    render() {

        const { item } = this.props.navigation.state.params;
        return (
            <View style={styles.full}>
                <Header
                    title={'Followers'}
                    leftContent={
                        <Text style={{ marginTop: Platform.OS === 'ios' ? 15 : 0 }}>
                            Go back
                        </Text>
                    }
                    onPressLeftText={() => this.props.navigation.goBack()}
                />
                <UserCard
                    avatarUrl={item.avatar_url}
                    login={item.login}
                />

                {this.props.followersList ? this.renderImages() : null}
                <Loader visible={this.state.loader}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return ({ followersList: state.auth.followersList });
};

export default connect(mapStateToProps)(FollowersScreen);

const styles = StyleSheet.create({
    full: {
        flex: 1
    },
    flatListContainer: {
        alignSelf: 'center',
        paddingBottom: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    scrollIndicator: {
        alignItems: 'center'
    }
});
