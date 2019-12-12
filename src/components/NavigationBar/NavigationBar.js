import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native';

import {
    Icon
} from 'react-native-elements';

import { styles as nav } from './NavigationBarStyle';

export default NavigationBar = ({ navigation }) => {
    function navigateHome() {
        navigation.navigate('HOME_SCREEN');
    }

    function navigateArticles() {
        navigation.navigate('ARTICLE_SCREEN');
    }

    function navigateBack() {
        navigation.goBack();
    }

    return (<>
        <StatusBar hidden={true}></StatusBar>
        <View style={nav.wrapper}>
            <ScrollView
                style={[nav.left]}
                horizontal={true}
            >
                <TouchableOpacity
                    style={[nav.item, nav.item$first]}
                    onPress={navigateHome}
                >
                    <Text style={[nav.item__text]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[nav.item]}
                    onPress={navigateArticles}
                >
                    <Text style={[nav.item__text]}>Articles</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={nav.right}>
                <TouchableOpacity
                    style={[nav.item__button, nav.item__button$rounded]}
                    onPress={navigateBack}
                >
                    <Icon
                        type='font-awesome'
                        name='arrow-left'
                        color='#000'
                    />
                </TouchableOpacity>
            </View>
        </View>
    </>);
}

export const NavigationBarWithTitle = ({ title, navigation }) => {
    function navigateBack() {
        navigation.goBack();
    }

    return <>
        <StatusBar hidden={true}></StatusBar>
        <View style={nav.wrapper}>
            <View
                style={[nav.left]}
                horizontal={true}
            >
                <Text style={nav.item__text}>
                    {title}
                </Text>
            </View>

            <View style={nav.right}>
                <TouchableOpacity
                    style={[nav.item__button, nav.item__button$rounded]}
                    onPress={navigateBack}
                >
                    <Icon
                        type='font-awesome'
                        name='arrow-left'
                        color='#000'
                    />
                </TouchableOpacity>
            </View>
        </View>
    </>;
}