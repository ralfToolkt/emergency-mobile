import React, { useEffect, useState, useContext} from 'react'
import {  Text, Alert } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading'
import { UserContext } from '../contexts/UserContext.js'
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



export default function Login({navigation}) {
    const [ready, setReady] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const { user, setUser } = useContext(UserContext)
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
            await axios.post(`${url}/api/auth?user=${username}&password=${password}`)
                .then(res => {
                    if (res.data.token) {
                        console.log(res.data);
                        setUser(res.data)
                        navigation.navigate('Emergency')
                    } else {
                        Alert.alert('Login Fail', 'Wrong User or Password')
                    }
                })
                .catch(e => {
                    console.log('error ' + e);
                    Alert.alert('Server Error', 'Service Error, Please Contact Administrator')
                })
        }
        else { Alert.alert('Login Fail', 'Username and Password is required') }
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
                    <Grid style={{alignItems: 'center'}}>
                        <Col>
                            <Form style={styles.formContainer} >
                                <Item floatingLabel>
                                    <Icon active name="person" />
                                    <Label style={{paddingBottom: 15}}>Username/Email</Label>
                                    <Input
                                        onChangeText={text => setUsername(text)}
                                        value={username}
                                        name="username"
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

                                <Item style={{margin: 10}}>
                                    <CheckBox value={showPassword} onValueChange={() => setShowPassword(!showPassword)} />
                                    <Text>Show Password</Text>
                                </Item>
                                <Button block info onPress={submit} style={{ marginTop: 15 }}>
                                    <Text>Login</Text>
                                </Button>

                                <Button transparent block onPress={() => navigation.navigate('Register')} style={{marginTop: 15}}>
                                    <Text style={{ color: 'blue' }}>Not a member yet? Register here </Text>
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
