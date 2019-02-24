import { StackNavigator } from 'react-navigation';
import StartScreen from '../Containers/StartScreen';
import DisplayScreen from '../Containers/DisplayScreen';
import FollowersScreen from '../Containers/FollowersScreen';

const PrimaryNav = StackNavigator({
    StartScreen: { screen: StartScreen },
    DisplayScreen: { screen: DisplayScreen },
    FollowersScreen: { screen: FollowersScreen }
}, {
    headerMode: 'none',
    initialRouteName: 'StartScreen'
});

export default PrimaryNav;
