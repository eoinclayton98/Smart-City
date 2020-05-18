import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import { FontAwesome, MaterialCommunityIcons } from 'react-native-vector-icons';
import { createStackNavigator } from '@react-navigation/stack';



/*
 * Camera Screen:
 * Requires access to the users camera
 * Allows the user to flip the camera and use the front camera
 * Allows the user to take a picture which will then be saved to the camera roll
 * Once a picture is taken the user is brought to the display screen
 * */





export default class CameraScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Camera Screen',
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

    // setting the inital state of required variables
    state = { 
        hasPermission: null,

        type: Camera.Constants.Type.back,
    }

    // when the screen loads componentDidMount() runs immediately
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA); // asks the user for permission to use the camera
        Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasPermission: status === 'granted' });
    }

    // allows the user to use the front camera
    handleCameraType() {
        const { type } = this.state

        this.setState({ // updating a variable defined in state
            type:
                type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })
    }

    // taking picture using the on screen camera
    async takePicture() {
        try {
            if (this.camera) {
                const options = { quality: 0.5 }; // quality of compression
                const data = await this.camera.takePictureAsync(options); // command to take a picture

                MediaLibrary.saveToLibraryAsync(data.uri); // saves to camera roll

                this.props.navigation.navigate('Submit', { data: data }); // navigates to the display screen

            }
        }
        catch (Error) {
            console.error(Error);
        }
    };


    render() {
        {/*Checking if access to the camera has been given*/}
        const { hasPermission } = this.state
        if (hasPermission === null) {
            return <View />;
        }
        else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        else {
            return (

                <View collapsable={false} style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
                    ref={view => {
                    this._container = view;
                }}>

                    {/*creates the camera and displays it on screen*/}
                    <Camera
                        style={{ flex: 1 }}
                        ref={(ref) => {
                            this.camera = ref;
                    }}
                        type={this.state.type}>

                        {/*Displays touchable camera icon. When pressed takePicture() function is called and a picture is taken*/}
                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10 }} >
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'transparent',
                                }}

                                onPress={this.takePicture.bind(this)} // Calls function to take picture
                            >
                                <FontAwesome
                                    name="camera"
                                    style={{ color: "#fff", fontSize: 50}}
                                />
                            </TouchableOpacity>
                        </View>

                        {/*Displays touchable icon to flip camera between front and back*/}
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end',
                                backgroundColor: 'transparent',
                                padding: 5,
                            }}
                            onPress={this.handleCameraType.bind(this)}
                        >
                            <MaterialCommunityIcons
                                name="camera-switch"
                                style={{ color: "#fff", fontSize: 50 }}
                            />
                        </TouchableOpacity>
                    </Camera>
                </View>
            );
        }
    }
}