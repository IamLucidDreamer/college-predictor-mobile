import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import AppLogo from './components/images/AppLogo';

const NewUpdatePage = ({ updateUrl }) => {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.logo}>
                    <AppLogo />
                </View>
                <Text style={styles.title}>New Update Available!</Text>
                <Text style={styles.subtitle}>A new version of our app is now available. Please update to enjoy the latest features and improvements.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.updateButton} onPress={() => Linking.openURL(updateUrl)}>
                    <Text style={styles.updateButtonText}>Update Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    logo: {
        alignSelf: "center",
        marginTop: 20
    },
    title: {
        color: "#28314B",
        marginTop: 40,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center"
    },
    subtitle: {
        color: "#28314B",
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    updateButton: {
        width: "100%",
        backgroundColor: '#28314B',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center"
    },
});

export default NewUpdatePage;
