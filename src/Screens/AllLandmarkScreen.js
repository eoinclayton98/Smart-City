import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from 'react-native-vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Permissions from 'expo-permissions';


import Footer from '../Components/Footer';


/*
 * Landmarks Screen:
 * Displays a map of the world with markers showing where the buildings compatible with the app
 * Buildings/ Landmarks in Ireland are displayed for demo purposes- they are not compatible
 * The users current location is displayed on the map
 */



export default class AllLandmarks extends Component {

    


    static navigationOptions = ({ navigation }) => ({
        title: 'Landmarks',
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

        // All coordinates set for buildings/landmarks to be used by markers
        this.state = {
            hasPermission: null,
            markers:[
                {
                    index: 1,
                    title: 'The Spire',
                    coordinates: {
                        latitude: 53.3498,
                        longitude: -6.2603,
                    },
                },
                {
                    index: 2,
                    title: 'The Helix',
                    coordinates: {
                        latitude: 53.38639,
                        longitude: -6.25944,
                    },
                },
                {
                    index: 3,
                    title: 'Colosseum',
                    coordinates: {
                        latitude: 41.890251,
                        longitude: 12.492373,
                    },
                },
                {
                    index: 4,
                    title: "St.Peter's Basilica",
                    coordinates: {
                        latitude: 41.902168,
                        longitude: 12.453937,
                    },
                },
                {
                    index: 5,
                    title: 'Petronas twin towers',
                    coordinates: {
                        latitude: 3.157764,
                        longitude: 101.711861,
                    },
                },
                {
                    index: 6,
                    title: 'Rialto bridge',
                    coordinates: {
                        latitude: 45.438037,
                        longitude: 12.335895,
                    },
                },
                {
                    index: 7,
                    title: 'Charles Bridge',
                    coordinates: {
                        latitude: 50.0852013259,
                        longitude: 14.4071117049,
                    },
                },
                {
                    index: 8,
                    title: 'Willis Tower',
                    coordinates: {
                        latitude: 41.878876,
                        longitude: -87.635918,
                    },
                },
                {
                    index: 9,
                    title: 'Piazzale Michelangelo',
                    coordinates: {
                        latitude: 43.757746969,
                        longitude: 11.259092297,
                    },
                },
                {
                    index: 10,
                    title: "Museu Nacional d'Art de Catalunya",
                    coordinates: {
                        latitude: 41.367665196,
                        longitude: 2.151999392,
                    },
                },
                {
                    index: 11,
                    title: 'Alhambra palace',
                    coordinates: {
                        latitude: 37.176078,
                        longitude: -3.588141,
                    },
                },

            ]
        }

        
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.LOCATION); // asks the user for permission to use the camera
        this.setState({ hasPermission: status === 'granted' });
    }

    render() {

        


        return (
            <View style={styles.screen}>

                

                <MapView style={styles.mapStyle}                        // displays world map on screen
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}                            // enables app to use users current location
                    initialRegion={{                                    // sets the inital view 
                        latitude: 40.0,
                        longitude: 2.0,
                        latitudeDelta: 45.0,
                        longitudeDelta: 0.0421,
                    }}
                    showsMyLocationButton={true}
                    showsCompass={true}
                >


                    {this.state.markers.map((marker,index) => (         // loops through the buildings coordinates to set markers on the map
                        <Marker
                            key={index}
                            coordinate={marker.coordinates}
                            title={marker.title}
                        />
                    ))}
                    
            

                   
                </MapView>

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
        width: 100,
        alignItems: 'flex-end',
        marginLeft: 'auto',
    },
    options: {
        width: '90%',
        maxWidth: '95%',
        height: 100,
        margin: 25,

    },
    text: {
        alignItems: 'flex-end',

    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})

