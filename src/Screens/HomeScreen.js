import React, { Component } from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CardViewWithImage } from 'react-native-simple-card-view';
import { FontAwesome } from 'react-native-vector-icons';


import Footer from '../Components/Footer';

/*
 * Home Screen:
 * Displays links to screens the four main functions of the app:
 * Camera
 * Submit photo
 * Predesigned routes
 * Landmarks
 * */

export default class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => ({ // Setting the heading of the screen
        title: 'Home Screen',
        headerMode: 'float',
        headerTitleAlign: 'center',

        // creating home button 
        headerRight: () =>

                <TouchableOpacity onPress={() => navigation.navigate('Welcome')} > 
                    <FontAwesome
                        name="home"
                        style={{ fontSize: 40, right: 5}}
                    />
                </TouchableOpacity>,

        headerStyle: {
            backgroundColor: '#07EFEF',

        },

    });


    render() {

        // getting height and width of the window
        var width = Dimensions.get('window').width; 
        var height = Dimensions.get('window').height;

        return (
            <View style={styles.screen}>
                <ScrollView >

                    {/* Displaying the links as touchable cards with a related image and description */}
                    <View style={styles.cardrow1}>
                        <CardViewWithImage
                            width={width * .43}
                            height={200}
                            source={require('../assets/camera2.png')}
                            content={'Click here to access the camera'}
                            title={'Camera '}
                            imageWidth={100}
                            imageHeight={100}
                            onPress={() => this.props.navigation.navigate('Camera')}
                            roundedImage={true}
                            roundedImageValue={50}
                            imageMargin={{ top: 10 }}
 
                    />

                        <CardViewWithImage
                            width={width * .43}
                            source={require('../assets/submit.png')}
                            content={'Click here to submit a photo from your camera roll'}
                            title={'Submit Photo  '}
                            imageWidth={100}
                            imageHeight={100}
                            onPress={() => this.props.navigation.navigate('Submit')}
                            roundedImage={true}
                            roundedImageValue={50}
                            imageMargin={{ top: 10 }}
                        />
                    </View>
                    <View style={styles.cardrow2}>
                        <CardViewWithImage
                            width={width * .43}
                            source={require('../assets/route.png')}
                            content={'Click here to choose a predesigned route'}
                            title={'Predesigned routes  '}
                            imageWidth={100}
                            imageHeight={100}
                            onPress={() => this.props.navigation.navigate('Routes')}
                            roundedImage={true}
                            roundedImageValue={50}
                            imageMargin={{ top: 10 }}
                        />

                        <CardViewWithImage
                            width={width * .43}
                            source={require('../assets/nearby.png')}
                            content={'Click here for a list of all landmarks'}
                            title={'Landmarks  '}
                            imageWidth={100}
                            imageHeight={100}
                            onPress={() => this.props.navigation.navigate("Landmarks")}
                            roundedImage={true}
                            roundedImageValue={50}
                            imageMargin={{ top: 10 }}
                        />


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
        backgroundColor: 'white',
    },

    cardrow1: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: '5%',
    },
    cardrow2: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: '10%',
        paddingBottom: 40,
    }
})

