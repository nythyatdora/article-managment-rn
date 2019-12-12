import React, { useState, useEffect, useCallback } from 'react';
import ContentLoader, { Rect, } from 'react-content-loader';

import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ImageBackground,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';

const Articles = (props) => {
    const { navigation } = props;

    return (<>
        <Main />
    </>);
};

function Main(props) {
    return (<>

    </>);
};

const CardItem = () => {
    return (<>
        <TouchableOpacity style={card.card__item}>
            <ImageBackground>
                <View style={card.item__top}>
                    <Text style={card.item__date}>
                    </Text>
                </View>

                <View style={card.item__main}>
                    <View style={card.item__header}>
                        <Text></Text>
                    </View>
                </View>

                <View style={card.item__bottom}>
                    <Text></Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    </>);
};

const card = StyleSheet.create({
    container: {
        flex: 1,
    },

    card__item: {
        elevation: 4,

        width: Dimensions.get('window').width - 40,
        height: 400,

        margin: 20,

        borderRadius: 40,

        backgroundColor: 'lightgray',

        // flexBasis: 400,
    },

    item__main: {
        flex: 1,
        flexBasis: 250,
    },

    item__header: {
        flex: 1,
        position: 'absolute',
        bottom: 15,
    },

    item__header_title: {
        color: 'white',

        fontSize: 32,
        fontWeight: 'bold',

        marginLeft: 32,
        marginRight: 32,
    },

    item__bottom: {
        bottom: 10,

        flexBasis: 60,
    },

    item__bottom_text: {
        color: 'darkgray',
        fontSize: 18,

        marginLeft: 32,
        marginRight: 32,
    },

    item__top: {
        marginTop: 32,
        marginLeft: 32,
    },

    item__date: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default Articles;
