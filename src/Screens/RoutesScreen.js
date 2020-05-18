import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from 'react-native-vector-icons';
import getDirections from 'react-native-google-maps-directions';

import RadioGroup from 'react-native-radio-buttons-group';

import Card from '../Components/Card';
import Footer from '../Components/Footer';

/*
 * Routes Screen:
 * Two predesigned routes for the user to choose
 * Radio button asking if the user is driving or walking
 * When the user chooses their desired route they will be brought to google maps directing them to the buildings/landmarks
 * 
 */


export default class RoutesScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Routes Screen',
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

    state = {
        data: [
            {
                label: 'driving',
                value: "driving",
            },
            {
                label: 'walking',
                value: "walking",
            },
            
        ],
        latitude: null,
        longitude: null,
    };


    
    handleGetDirections = (option, value) => {                      // creating routes and displaying in google maps

        
        let Startlatitude = null;                                   // initalizing required variables
        let Startlongitude = null;

        let Destlatitude = null;
        let Destlongitude = null;

        let Waypoint = null;

        if (value == 1) {                                           // if the user chooses route 1


            Startlatitude = this.state.latitude;                    // setting the starting coordinates to the users location
            Startlongitude = this.state.longitude;


            Destlatitude = 53.3498;                                 // setting the destination cooridinates
            Destlongitude = -6.2603;

            Waypoint = [
                {
                    latitude: 53.38639,                             // setting coordinates of another building to be visited along the way
                    longitude: -6.25944,
                }
            ]
            
        }
        else if (value == 2) {                                      // if the user chooses route 2

            Startlatitude = 41.890251;
            Startlongitude = 12.492373;

            Destlatitude = 41.902168;
            Destlongitude = 12.453937;

            Waypoint = [                                            

            ]

        }
        
        const data = {

            source: {
                latitude: Startlatitude,                            // setting starting coordinates to the users choice
                longitude: Startlongitude,
            },
            destination: {

                latitude: Destlatitude,                             // setting destination coordinates to the users choice
                longitude: Destlongitude,
            },
            params: [
                {
                    key: "travelmode",
                    value: option                                   // mode of transport (driving/walking)
                },
                {
                    key: "dir_action",
                    value: "navigate"       
                }
            ],
            waypoints: Waypoint                                     // setting waypoint coordinates to the users choice
        }
        getDirections(data)

        
        

    }



    render() {

        // finding the value of the selected radio button
        let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;

        let option = 'driving';                                     // setting default option to be driving
        if (selectedButton == 'driving') {                          // if the user choses driving - map will create driving route
            option = 'driving';
        }
        else {                                                      // if the user choses walking - map will create walking route
            option = 'walking';
        }

        return (
            <View style={styles.screen}>

                <Text style={styles.valueText}>Please select if you are driving or walking:</Text>

                {/*Creating radio button (driving/walking)*/}
                <RadioGroup radioButtons={this.state.data} onPress={data => this.setState({ data: data })}  flexDirection='row' />
                

                {/*Displaying route choices*/}
                <Card style={styles.options} >

                    <View style={styles.cardContent}>
                        <View style={styles.text}>
                            <Text style={{ width: '70%', fontSize: 18, fontWeight: 'bold', textAlign: 'center',}}>Route 1 - Dublin </Text>
                            <Text>Current location - The Helix - The Spire</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.handleGetDirections(option, 1)} // route 1 selected: driving/walking sent to handleGetDirections() function and relevant route will be displayed in google maps
                        >
                            <Text style={{ color: 'white'}}>Get Directions</Text>

                        </TouchableOpacity>
                    </View>
                </Card>

                <Card style={styles.options} >

                    <View style={styles.cardContent}>
                        <View style={styles.text}>
                            <Text style={{ width: '70%', fontSize: 18, fontWeight: 'bold', textAlign: 'center', }}>Route 2 - Rome </Text>
                            <Text>Colosseum - St. Peter's Basilica</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.handleGetDirections(option, 2)} // route 2 selected: driving/walking sent to handleGetDirections() function and relevant route will be displayed in google maps
                        >
                            <Text style={{ color: 'white' }}>Get Directions</Text>

                        </TouchableOpacity>
                    </View>
                </Card>

               <Footer>


               </Footer>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,

        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        width: '60%',
        justifyContent: 'center',
        backgroundColor: "#2196f3",
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        borderRadius: 3,
    },
    options: {
        width: '90%',
        maxWidth: '95%',
        height: '16%',
        margin: '5%',
       
    },

    valueText: {
        fontSize: 18,
        margin: '3%',

    },
    cardContent: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        width: '90%',
        alignItems: 'center',
        padding: 4,
    },

})

