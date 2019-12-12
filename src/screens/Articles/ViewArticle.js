import React, { useState, useEffect, useCallback } from 'react';

import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    ScrollView,
    StatusBar
} from 'react-native';

import {
    Icon
} from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import {
    setDate
} from './Articles';

import { clearCurrentSelected } from '../../redux/actions/ArticleActions/ArticleActions';

const ViewArticle = (props) => {
    const { navigation } = props;

    return (<>
        <StatusBar hidden={true}></StatusBar>
        <Main navigation={navigation} />
    </>);
};

function Main(props) {
    const { TITLE = 'no title', DESCRIPTION = 'no description', IMAGE, CREATED_DATE = new Date()} = useSelector(state => state.articleReducer.currentSelected);
    const dispatch = useDispatch();
    const { navigation } = props;

    const imageUri = !IMAGE ?
        require('../../assets/images/MegaTron.jpg') : { uri: IMAGE };

    function navigateBack() {
        dispatch(clearCurrentSelected());
        navigation.goBack();
    }

    function setDate(date) {
        return moment(date, 'YYYYMMDDHHmmss').fromNow();
    };

    return (<>
        <ScrollView>
            <ImageBackground
                source={imageUri}
                style={modal.imageWrapper}
                borderBottomLeftRadius={40}
                borderBottomRightRadius={40}
            >
                <View
                    style={modal.backWrapper}
                >
                    <TouchableOpacity
                        style={[modal.modal__button, modal.modal__button$rounded]}
                        onPress={navigateBack}
                    >
                        <Icon
                            type='font-awesome'
                            name='arrow-left'
                            color='#000'
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={modal.socialWrapper}
                >
                    <TouchableOpacity>
                        <Icon
                            size={22}
                            type='font-awesome'
                            name='heart'
                            color='#fff'
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View
                style={modal.descriptionWrapper}
            >
                <Text
                    style={modal.modal__header_title}
                >
                    {TITLE}
                </Text>

                <Text
                    style={modal.modal__date}
                >
                    {'since ' + setDate(CREATED_DATE)}
                </Text>

                <Text
                    style={modal.modal__description}
                >
                    {DESCRIPTION}
                </Text>
            </View>
        </ScrollView>
    </>);
};

const modal = StyleSheet.create({
    imageWrapper: {
        width: Dimensions.get('window').width,
        height: 400,

        backgroundColor: 'lightgray',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },

    backWrapper: {
        position: 'absolute',
        top: 25,
        right: 25,
    },

    socialWrapper: {
        position: 'absolute',

        bottom: 35,
        right: 35,
    },

    descriptionWrapper: {
        margin: 25,
    },

    modal__header_title: {
        color: 'black',

        fontSize: 38,
        fontWeight: 'bold',
    },

    modal__date: {
        fontSize: 16,
        fontWeight: 'bold',

        marginTop: 15,
    },

    modal__description: {
        color: 'darkgray',
        fontSize: 20,

        marginTop: 15,
    },

    modal__button: {
        backgroundColor: 'white',
        justifyContent: 'center',
    },

    modal__button$rounded: {
        width: 50,
        height: 50,

        borderRadius: 50,
    }
});

export default ViewArticle;
