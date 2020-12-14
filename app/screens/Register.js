import React, { useEffect, useState, useContext } from 'react'
import { Text, Alert } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading'
import styles from '../../styles'
import axios from 'axios'

import {
    Container as NativeBaseContainer,
    Header,
    Content,
    Body,
    Title,
    ListItem,
    Item,
    Icon,
    Input,
    Footer,
    FooterTab,
    Form,
    Label,
    Button,
    Grid,
    Col
} from "native-base";



export default function Register({ navigation }) {
    const [ready, setReady] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState('')
    const [email, setemail] = useState('')
    useEffect(() => {
        Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            ...Ionicons.font
        }).then(() => setReady(true));
        setPassword('')
    }, []);

    async function submit() {
        console.log('submit');
        const url = 'http://139.162.9.124:1369'
        if (username !== '' && password !== '') {
            let bodyFormData = new FormData();
            bodyFormData.append('username', username);
            bodyFormData.append('password', password);
            bodyFormData.append('name', name);
            bodyFormData.append('email', email);
            await axios({
                method: 'post',
                url: `${url}/api/register`,
                data: bodyFormData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            // await axios.post(`${url}/api/auth?username=${username}&password=${password}`)
                .then(res => {
                    if (res.data.result === 'success') {
                        Alert.alert('Register Success', 'Please Login Now')
                        navigation.navigate('Login', {username: username})
                    } else {
                        Alert.alert('Register Fail', 'Wrong User or Password')
                    }
                })
                .catch(e => {
                    console.log('error ' + e);
                    Alert.alert('Server Error', 'Service Error, Please Contact Administrator')
                })
        }
        else { Alert.alert('Register Fail', 'Username and Password is required') }
    }

    if (ready) {
        return (
            <NativeBaseContainer>
                <Header noLeft>
                    <Body>
                        <Title>{navigation.state.routeName}</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Grid style={{ alignItems: 'center' }}>
                        <Col>
                            <Form style={styles.formContainer} >
                                <Text>Credential</Text>
                                <Item floatingLabel>
                                    <Icon active name="person" />
                                    <Label style={{ paddingBottom: 15 }}>Username/Email</Label>
                                    <Input
                                        onChangeText={text => setUsername(text)}
                                        value={username}                                    
                                        style={styles.inputItem}
                                    />
                                </Item>
                                <Item floatingLabel>
                                    <Icon active name="eye" />
                                    <Label>Password</Label>
                                    <Input
                                        onChangeText={text => setPassword(text)}
                                        value={password}
                                        name="password"
                                        secureTextEntry={!showPassword}
                                        style={styles.inputItem}
                                    />
                                </Item>
                                <Item style={{ marginTop: 10, marginBottom: 15}}>
                                    <CheckBox value={showPassword} onValueChange={() => setShowPassword(!showPassword)} />
                                    <Text>Show Password</Text>
                                </Item>

                                <Text>Information</Text>
                                <Item floatingLabel >
                                    <Label style={{ paddingBottom: 15 }}>Full Name</Label>
                                    <Input
                                        onChangeText={text => setName(text)}
                                        value={name}                                    
                                        style={styles.inputItem}
                                    />
                                </Item>
                                <Item floatingLabel>
                                    <Label style={{ paddingBottom: 15 }}>Email Address</Label>
                                    <Input
                                        onChangeText={text => setemail(text)}
                                        value={email}                                    
                                        style={styles.inputItem}
                                    />
                                </Item>
                                
                                <Button block info onPress={submit} style={{ marginTop: 15 }}>
                                    <Text>Register</Text>
                                </Button>

                                <Button transparent block onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }}>
                                    <Text style={{ color: 'blue' }}>Already a member? Login here </Text>
                                </Button>
                            </Form>
                        </Col>
                    </Grid>
                </Content>

            </NativeBaseContainer>
        );
    } else {
        return <AppLoading />;
    }
}
