import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions, Linking } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from 'react-native-vector-icons';
import { CardViewWithImage } from 'react-native-simple-card-view';

import Footer from '../Components/Footer';

import axios from 'axios';
/*
 * Display Screen:
 * Displays the image and a brief description of the image.
 * */

const serverURL = 'http://192.168.1.21:5000';
const http = axios.create({
    baseURL: serverURL,
})


export default class DisplayScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Display Screen',
        headerMode: 'float',
        headerTitleAlign: 'center',

        headerRight: () =>

            <TouchableOpacity onPress={() => navigation.navigate('Welcome')} >
                <FontAwesome
                    name="home"
                    style={{ fontSize: 40, right: 5 }}
                />
            </TouchableOpacity>,

        headerStyle: {
            backgroundColor: '#07EFEF',

        },

    });

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            heading: '',
            content: '',
        };
    }

    onLogin() {
        const { isLoggedin, username } = this.state;
        if (!isLoggedin) {
            http.post('/login', { username })
            .then(() => this.setState({ isLoggedin: true }))
            .catch((err) => console.log(err))
        }
    }
 


    // get heading and content from flask


    render() {
        let { image } = this.state;
        const { isLoggedin } = this.state;

        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;

        //const { navigate } = this.props.navigation;
        const selectedImage = this.props.navigation.state.params.selected;

        const heading = this.props.navigation.state.params.heading;
        const content = this.props.navigation.state.params.content;
        const link = this.props.navigation.state.params.link;
        return (
            <View style={styles.screen}>


                <CardViewWithImage
                    width={(width / 100)*90 }
                    height={height*2}
                    source={{ uri: selectedImage }}
                    content={content + '\n \n Click here for more information'} // info taken from colab
                    title={heading+ "    "} // title taken from colab
                    imageWidth={200}
                    imageHeight={200}
                    onPress={() => Linking.openURL(link)} //add link to wiki
                    roundedImage={true}
                    roundedImageValue={100}
                    imageMargin={{ top: 10 }}

                />




                <Footer>



                </Footer>

            </View>



        );

    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    },

})


