import React, { useState, useEffect, useCallback } from 'react';

import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ImageBackground,
    FlatList,
    TouchableWithoutFeedback,
    ScrollView,
    Alert
} from 'react-native';

import {
    Icon
} from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import {
    viewArticles,
    viewArticleById,
    deleteArticleById,
} from '../../redux/actions/ArticleActions/ArticleActions';

import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const Articles = (props) => {
    const { navigation } = props;

    return (<>
        <Main navigation={navigation} />
        <Buttons navigation={navigation} />
    </>);
};

const Buttons = (props) => {
    const { navigation } = props;

    function navigateAdd() {
        navigation.navigate('ADD_ARTICLE_SCREEN');
    }

    function navigateSearch() {
        navigation.navigate('SEARCH_ARTICLE_SCREEN');
    }

    return (<>
        <View style={buttons.wrapper}>
            <TouchableOpacity
                style={[buttons.button__default, buttons.button__rounded]}
                onPress={navigateAdd}
            >
                <Icon
                    type='font-awesome'
                    name='plus'
                    color='#000'
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[buttons.button__default, buttons.button__rounded, buttons.button__marginTop$10]}
                onPress={navigateSearch}
            >
                <Icon
                    type='font-awesome'
                    name='search'
                    color='#000'
                />
            </TouchableOpacity>
        </View>
    </>);
}

function Main(props) {
    const articles = useSelector(state => state.articleReducer.articles);
    const dispatch = useDispatch();
    const { navigation } = props;

    useEffect(() => {
        dispatch(viewArticles(1, 15));
    }, []);

    function CardList() {
        function onPressHandler({ ID }) {
            dispatch(viewArticleById(ID));
            navigation.navigate('VIEW_ARTICLE_SCREEN');
        }

        function onHoldHandler({ ID }) {
            Alert.alert(
                'Message',
                'Do you want to delete the item?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            dispatch(deleteArticleById(ID));
                            dispatch(viewArticles(1, 15));
                        }
                    },
                ],
                { cancelable: false },
            );
        }

        return <>
            <FlatList
                data={articles}
                horizontal={false}
                ListEmptyComponent={ListPlaceholder}
                renderItem={({ item }) => (
                    <WrapCardItem
                        key={item.ID}
                        data={item}
                        onPress={() => onPressHandler(item)}
                        onLongPress={() => onHoldHandler(item)}
                    />
                )}
                keyExtractor={item => item.ID}
            />
        </>;
    }

    function ListPlaceholder() {
        function PlaceholderItem() {
            return <>
                <ContentLoader
                    style={{ margin: 20, flex: 1 }}
                    height={400}
                    speed={2}
                    primaryColor="lightgray"
                    secondaryColor="darkgray"
                >
                    <Rect x="0" y="0" rx="40" ry="40" width="350" height="400" />
                </ContentLoader>
            </>;
        }

        return <>
            <ScrollView>
                <PlaceholderItem />
                <PlaceholderItem />
            </ScrollView>
        </>;
    }

    return (<>
        <CardList />
    </>);
};

const WrapCardItem = (props) => {
    const { data, onPress, onLongPress } = props;
    const { TITLE, CREATED_DATE, DESCRIPTION, IMAGE } = data;

    return <>
        <CardItem
            title={TITLE}
            createdAt={CREATED_DATE}
            description={DESCRIPTION}
            imageBackground={IMAGE}
            onPress={onPress}
            onLongPress={onLongPress}
        />
    </>;
}

const CardItem = ({ title = 'no title', createdAt = 'no date', description = 'no description', imageBackground, ...props }) => {
    const { onPress, onLongPress } = props;
    const imageUri = !imageBackground ?
        require('../../assets/images/MegaTron.jpg') : { uri: imageBackground };

    function setDate(date) {
        return moment(date, 'YYYYMMDDHHmmss').fromNow();
    };

    return (<>
        <TouchableOpacity style={card.card__item} onPress={onPress} onLongPress={onLongPress}>
            <ImageBackground
                source={imageUri}
                style={[{ width: '100%', height: '100%', }]}
                borderRadius={40}
            >
                <View style={card.item__top}>
                    <Text style={card.item__date}>
                        {setDate(createdAt)}
                    </Text>
                </View>

                <View style={card.item__main}>
                    <View style={card.item__header}>
                        <Text
                            numberOfLines={2}
                            style={card.item__header_title}
                            ellipsizeMode={'tail'}>
                            {title}
                        </Text>
                    </View>
                </View>

                <View style={card.item__bottom}>
                    <Text
                        numberOfLines={2}
                        style={card.item__bottom_text}
                    >
                        {description}
                    </Text>
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

const buttons = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        alignSelf: 'flex-end',

        bottom: 35,
        right: 35
    },

    button__default: {
        backgroundColor: 'lightgray',
        justifyContent: 'center',

        elevation: 4,
    },

    button__rounded: {
        width: 50,
        height: 50,
        borderRadius: 50
    },

    button__marginTop$10: {
        marginTop: 10,
    }
});

export default Articles;
