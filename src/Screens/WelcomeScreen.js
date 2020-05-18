import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


import Footer from '../Components/Footer';

/*
  Welcome Screen:
  Initial screen displayed as the app is loaded.
  Displays a logo and short description about the app.
 */

export default class WelcomeScreen extends Component {


    static navigationOptions = { // Setting the heading of the screen
        title: 'Smart-City',
        headerMode: 'float',
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#07EFEF',

        },

    };


    render() {
        return (
            <View style={styles.screen}>
                <ScrollView>{/*enables the content to be scrollable*/}
                    
                    <View style={{ width: '100%', height: '40%' }}>
                        <Image source={require('../assets/logo.png')}
                                style={{ width: 220, height: 200, alignSelf : 'center' }}
                                />
                    </View>
                <View style={styles.text}>
                    <Text style={styles.heading}>Hello, Welcome to Smart-City</Text>
                    <Text>This app allows you to take a photo of a building or landmark and our system will return information relevant to this building.</Text>
                    <Text>You can also chose between several predesigned routes to use as a tour guide or see what buildings and landmarks are nearby.</Text>

                        
                        <View style={styles.button}> 
                            <Button title="Continue" onPress={() => this.props.navigation.navigate('Home')} />{/*Button to navigate to the home screen*/}
                        </View>


                        
                </View>

                </ScrollView>

                <Footer>


                </Footer>
 
            </View>
        );
    }
}



 
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: '5%',
        paddingTop: '2%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        top: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 18,
        marginTop:'2%',
        marginBottom: '2%',
        fontWeight: 'bold',
        width: '95%',
        textAlign: 'center',
    },
    button: {
        width: '50%',
        marginTop: '3%',
        marginBottom: '10%',
    }
})

