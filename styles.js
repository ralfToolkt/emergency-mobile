import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        marginTop: 'auto',

    },

    label: {
        textAlign: 'center',
        margin: 10,
    },

    address: {
        fontWeight: 'bold',
    },
    emgButton: {
        height: 250,
        width: 250,
        borderRadius: 250/2,
        color: 'red',
        borderColor: 'black',
        backgroundColor: 'red',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 0,
        alignContent: 'center',
        width: 300
    },
    formContainer: {
        backgroundColor: '#f9f9f9',
        margin: 15,
    },
    inputItem: {
        marginBottom: 10,
        paddingLeft: 10
    }
});
