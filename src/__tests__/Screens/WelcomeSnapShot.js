import 'react-native';
import React from 'react';
import WelcomeScreen from '../../Screens/WelcomeScreen';

import renderer from 'react-test-renderer';

test('Welcome SnapShot', () => {

    const snap = renderer.create(<WelcomeScreen />).toJSON();
    expect(snap).toMatchSnapshot();

});


