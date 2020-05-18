import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

/*
 * Creates Footer used across the app
 *
 */


var width = Dimensions.get('window').width;

const Footer = props => {
    return <View style={{ ...styles.footer, ...props.style }}>{props.children}</View>
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#07EFEF',
        height: '10%',
        width: width,
        position: 'absolute',
        bottom: 0,
    },
});

export default Footer;