import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles'
import { Button, Platform, SafeAreaView, Text, TouchableOpacity, View, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios'
import {UserContext} from '../contexts/UserContext'

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [getLocation, setGetLocation] = useState(false)
    const [intervalSending, setIntervalSending] = useState()
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [district, setDistrict] = useState('')
    const [isoCountryCode, setIsoCountryCode] = useState('')
    const [name, setName] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [region, setRegion] = useState('')
    const [street, setStreet] = useState('')

    const { user } = useContext(UserContext)


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
            setIntervalSending(setInterval(() => getPosition(), 60000))
        }
        else { clearInterval(intervalSending) }

    }, [getLocation])

    async function getPosition() {
        console.log('get position');
        (async () => {
            // Location.setGoogleApiKey('AIzaSyBTp9sgdaeSKyXQVn3qBBLR_yBYS19Q05w') 
            await Location.getCurrentPositionAsync({})
            .then(async res => {
                setLocation(res)
                await Location.reverseGeocodeAsync({ latitude: res.coords.latitude, longitude: res.coords.longitude }).then(async res => {
                    setCity(res[0].city)
                    setCountry(res[0].country)
                    setDistrict(res[0].district)
                    setIsoCountryCode(res[0].isoCountryCode)
                    setName(res[0].name)
                    setPostalCode(res[0].postalCode)
                    setRegion(res[0].region)
                    setStreet(res[0].street)

                    const url = 'http://139.162.9.124:1369'
                    let bodyFormData = new FormData();
                    bodyFormData.append("city", city || '')
                    bodyFormData.append("country", country || '')
                    bodyFormData.append("district", district || '')
                    bodyFormData.append("isoCountryCode", isoCountryCode || '')
                    bodyFormData.append("name", name || '')
                    bodyFormData.append("postalCode", postalCode || '')
                    bodyFormData.append("region", region || '')
                    bodyFormData.append("street", street || '')
                    bodyFormData.append("longitude", location.coords.longitude)
                    bodyFormData.append("latitude", location.coords.latitude)
                    bodyFormData.append("token", user.token)
                    await axios({
                        method: 'post',
                        url: `${url}/api/location`,
                        data: bodyFormData,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })
                })}
            )
                
            .catch(e => Alert.alert('Cant Detect Location','Please Try Again (Off then On)'))            
        })()

        if (location) {
            const url = 'http://139.162.9.124:1369'
            let bodyFormData = new FormData();
            bodyFormData.append("city", city || '')
            bodyFormData.append("country", country || '')
            bodyFormData.append("district", district || '')
            bodyFormData.append("isoCountryCode", isoCountryCode || '')
            bodyFormData.append("name", name || '')
            bodyFormData.append("postalCode", postalCode || '')
            bodyFormData.append("region", region || '')
            bodyFormData.append("street", street || '')
            bodyFormData.append("longitude", location.coords.longitude)
            bodyFormData.append("latitude", location.coords.latitude)        
            bodyFormData.append("token", user.token)        
            await axios({
                method: 'post',
                url: `${url}/api/location`,
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
        }
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