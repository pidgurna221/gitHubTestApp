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
import Loader from '../Components/Loader';
import ListItem from '../Components/ListItem';
import { getList } from '../Redux/auth/actions';
import { connect } from 'react-redux';

class DisplayScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listParams: {
                limit: 50,
                offset: 0
            },
            scrollLoading: false,
            canLoadMore: true,
            loader: true
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        const { listParams } = this.state;

        this.props.dispatch(getList(listParams)).then(response => {
            if (response.data.length < listParams.limit) {
                this.setState({ scrollLoading: false, canLoadMore: false, loader: false });
            } else {
                this.setState({ scrollLoading: false, loader: false  });
            }

        });
    };

    renderFooter = () => {
        if (this.state.scrollLoading) {
            return <ActivityIndicator size="large" color='black' />;
        }
        return <View />;
    };

    loadMoreData = () => {
        const { scrollLoading, canLoadMore } = this.state;
        if (!scrollLoading && canLoadMore) {
            this.setState(prevState => ({
                listParams: {
                    ...prevState.listParams,
                    offset: this.props.list[this.props.list.length - 1].id,
                },
                scrollLoading: true
            }), () => this.getList());
        }
    };

    renderItem = ({ item }) => (
        <ListItem
            login={item.login}
            avatarUrl={item.avatar_url}
            url={item.url}
            navigateToFollowers={() => this.navigateToFollowers(item)}
        />
    );

    navigateToFollowers = item => this.props.navigation.navigate('FollowersScreen', { item });


    renderImages() {
        const { list } = this.props;
        return(
            <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.1}
                initialNumToRender={this.state.listParams.limit}
                contentContainerStyle={styles.flatListContainer}
                renderItem={this.renderItem}
                onEndReached={this.loadMoreData}
                ListFooterComponent={this.renderFooter}
            />
        )
    };

    render() {
        return (
            <View style={styles.full}>
                <Header
                    title={'Main'}
                    leftContent={
                        <Text style={{ marginTop: Platform.OS === 'ios' ? 15 : 0 }}>
                              Go back
                        </Text>
                    }
                    onPressLeftText={() => this.props.navigation.goBack()}
                />
                {this.props.list ? this.renderImages() : null}
                <Loader visible={this.state.loader}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return ({ list: state.auth.list });
};

export default connect(mapStateToProps)(DisplayScreen);

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
