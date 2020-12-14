import React, { useState, useEffect } from 'react';
import styles from '../../styles'
import { Button, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [getLocation, setGetLocation] = useState(false)
    const [intervalSending, setIntervalSending] = useState()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        })();
        console.log('on mount');
    }, []);

    useEffect(() => {
        console.log(getLocation);
        if (getLocation === true) {
            getPosition()
            setIntervalSending(setInterval(() => getPosition(), 4000))
        }
        else { clearInterval(intervalSending) }

    }, [getLocation])

    function getPosition() {
        console.log('get position');
        (async () => {
            const location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        })()
    }

    let text = '';
    if (errorMsg) {
        text = errorMsg;
    } else if (getLocation) {
        text = 'sending geolocation';
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>{text}</Text>
            <TouchableOpacity style={{
                height: 250,
                width: 250,
                borderRadius: 250 / 2,
                color: 'red',
                borderColor: 'black',
                backgroundColor: getLocation ? 'green' : 'red',
            }}
                onPress={() => setGetLocation(!getLocation)}
            >

            </TouchableOpacity>
            <Text style={styles.title} > {getLocation ? 'PRESS TO STOP SENDING' : 'PRESS FOR EMERGENCY'} </Text>
        </SafeAreaView>
    );
}