import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from './Screens/WelcomeScreen';
import HomeScreen from './Screens/HomeScreen';
import CameraScreen from './Screens/CameraScreen';
import RoutesScreen from './Screens/RoutesScreen';
import AllLandmarks from './Screens/AllLandmarkScreen';
import SubmitScreen from './Screens/SubmitScreen';
import DisplayScreen from './Screens/DisplayScreen';



/*
 Creating stack navigation between screens 
 */
const RootStack = createStackNavigator(
    {
        Welcome: { screen: WelcomeScreen },
        Home: { screen: HomeScreen },
        Camera: { screen: CameraScreen },
        Routes: { screen: RoutesScreen },
        Landmarks: { screen: AllLandmarks },
        Submit: { screen: SubmitScreen },
        Display: { screen: DisplayScreen },

    },
    {
        initialRouteParams: 'Welcome',
    },
    
);


const App = createAppContainer(RootStack);

export default App;



