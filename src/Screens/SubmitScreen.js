import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from 'react-native-vector-icons';

import * as ImageManipulator from 'expo-image-manipulator';

import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet'

import * as jpeg from 'jpeg-js'

import Footer from '../Components/Footer';

import axios from 'axios';

/*
 * Submit Screen:
 * Asks the user to select their desired image from their camera roll
 * When an image is choosen it will be displayed on screen
 * The user can then choose to retake the photo and be brought back to the camera screen
 * or submit there photo to be queried
 * */

const serverURL = 'http://192.168.1.21:5000';
const http = axios.create({
    baseURL: serverURL,
})

// linking react native to clarifai
const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
    apiKey: 'ef6e0428ff7f4bbe86254d22ac4e759c'
});


export default class SubmitScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Submit Screen',
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
            photo: null,
            predictions: [],
            image: null,

            heading: '',
            content: '',
            file: null,
            predictionID: null,
        };
    }


    async componentDidMount() {
        // Wait for tf to be ready.
        await tf.ready();
        // Signal to the app that tensorflow.js can now be used.
        this.setState({
            isTfReady: true,
        });
        this.model = await mobilenet.load()
        this.setState({ isModelReady: true })
    }


    // selecting an image from the camera roll
    async pickImage() {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({    //command to access the camera roll
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,                                    // allows the image to be cropped
                aspect: [4, 3],                                         // sets the required aspect of the image
                quality: 1,
            });



            if (!result.cancelled) {                                    // if the the user selects an image the uri will be saved
                const source = { uri: result.uri }
                this.setState({
                    photo: result,
                    image: source
                })

            }

        } catch (E) {
            console.log(E);
        }
    };

    // used to control the request to clarifai and get a description of the building
    objectDetection = async () => {    
        if (this.state.image == null) {
            Alert.alert(
                'Invalid selection',
                'You must choose a photo!',
                [

                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        }
            else {
                let resized = await this.resize(this.state.image.uri);                  // resizes the image for speed optimization
                let predictions = await this.predict(resized);                          // waits for a prediction response
                this.setState({ predictions: predictions.outputs[0].data.concepts });   // saves response
                console.log(this.state.predictions[0].id)
                this.setState({
                    predictionID: this.state.predictions[0].id,
                })
                this.sendRequest();
            }
        
    };

    // resizes the image for speed optimization
    async resize(image) {
        let manipulatedImage = await ImageManipulator.manipulateAsync(
            image,
            [{ resize: { height: 300, width: 300 } }],
            { base64: true }
        );
        return manipulatedImage.base64;
    };

    async predict(image) {

        let predictions = await clarifai.models.predict(
            { id: "Buildins", version: "732fd2e5503442aeaeb4e32fcd10da81" }, // clarifai modeal id  
            image
        );
        return predictions;
    };



    // sends query to get description of the building
    sendRequest() {
        http.post('/send',
            {
                'predictionID': this.state.predictionID,
            }
        )
            
            .then(() => this.getData())
            .catch((err) => console.log(err));
        console.log("Send complete")
    }
    // recieves name, description and link to wiki
    getData() {
        http.get(`/getContent/${this.state.predictionID}`)
            .then((response) => this.addMess(response.data)) 
            .catch((err) => console.log(err.response))
    }

    addMess(list) {
        console.log("addMess")
        const { messages } = this.state;
        console.log(list);
        this.setState({
            heading: list['Name'],
            content: list['description'],
            link: list['link'],
        })
        // sends the necessary info to the display screen
        this.props.navigation.navigate('Display', { selected: this.state.photo.uri, heading: this.state.heading, content: this.state.content, link: this.state.link });
    }


    /*
     * This was intended to send an image to query the database but we were unable to figure out a way to connect 
     * react native to colab
     * We decided to use Clarifai and will hopefully be able to implement this in the future
     * 
    sendToColab(image) {
        if (image == null) {
            Alert.alert(
                'Invalid selection',
                'You must choose a photo!',
                [

                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        } else {
            this.setState({
                image: image,
            });
            console.log(image);
            // send image/ image uri to backend
            const uri = image.replace('file://', '');
            const name = "image.jpg";
            const type = this.state.photo.type;
            console.log(uri);

            let file = JSON.stringify( {
                uri: uri,
                name: name,
                type: type
            })
            const body = new FormData();
             
            body.append('file', file);
            //const file = fs.readFile(image);

            
            
            http.post('/send',
                {
                    //'username': image,
                    file,
                },
                
                { headers: { "Content-Type": "application/json" } }
            )
                .then((response) => console.log(response))
                //.then(() => this.getDescription())
                .catch((err) => console.log(err));
            console.log("Send complete")
                

           
        }
    };

    getDescription() {
        console.log("getDescription")
        http.get('/get/')
            .then((response) => this.addMess(response.data)) //this.addMess(response.data)
        //.catch((err) => console.log(err.response))
    }

    */




    render(){


        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;

        const { image, photo } = this.state

        return (
            <View style={styles.screen}>

                <Text>Click the button below and select your desired image. </Text>

                {/*Button to access the camera roll*/}
                <View style={styles.button}>
                    <Button title="Choose photo!" onPress={() => this.pickImage()} />
                </View>

                {image && <Image source={{uri: photo.uri }} style={{ width: '95%', height: '50%', top: 10 }} />}

                
                <Footer>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        {/*Button to retake photo. Will navigate back to the camara screen when pressed
                         */}
                        <View style={{ right: width * .10, width: '36%', height: '100%', justifyContent: 'center'  }}>
                            <Button title="Retake photo" onPress={() => this.props.navigation.navigate('Camera')} />
                        </View>

                        {/*Button to access the camera roll*/}
                        <View style={{ left: width * .10, width: '36%', justifyContent: 'center' }}>
                            <Button title="submit photo" onPress={() => this.objectDetection()} />
                        </View>
                    </View>

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
    button: {
        width: '40%',
        top: 5,
    },
    retakebutton: {
        position: 'absolute',
        top: '90%',
        
        width: 100,
   
    },
    submitbutton: {
        position: 'absolute',
        top: 500,
        right: 50,
        width: 100,
    },
})


