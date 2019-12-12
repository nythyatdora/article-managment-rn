import React, { useState, useEffect, useCallback } from 'react';

import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    ScrollView,
    Image,
    FlatList,
    KeyboardAvoidingView
} from 'react-native';

import {
    Icon
} from 'react-native-elements';

import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';

import {
    InputText
} from './AddArticle';

import {
    viewArticleById,
    viewArticleByName,
} from '../../redux/actions/ArticleActions/ArticleActions';

import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const SearchArticle = (props) => {
    const { navigation } = props;

    return (<>
        <Main navigation={navigation} />
    </>);
};

function Main(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    function Search() {
        const [title, setTitle] = useState('');

        useEffect(() => {
            dispatch(viewArticleByName(title, 1, 15));
        }, [title]);

        return <>
            <View style={search.wrapper}>
                <View style={search.inputWrapper}>
                    <View style={search.inputText}>
                        <InputText title='Query Article' placeholder='query by article title' multiline={false} value={title} valueHandler={setTitle} />
                    </View>

                    <TouchableOpacity style={search.button}>
                        <Icon
                            type='font-awesome'
                            name='refresh'
                            color='#000'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>;
    }

    function ResultList() {
        const searchedArticles = useSelector(state => state.articleReducer.searchedArticles);

        function navigateItem({ ID }) {
            dispatch(viewArticleById(ID));
            navigation.navigate('VIEW_ARTICLE_SCREEN');
        }

        return <>
            <FlatList
                ListHeaderComponent={Search}
                ListEmptyComponent={ListPlaceholder}
                data={
                    searchedArticles
                }
                horizontal={false}
                renderItem={({ item }) => (
                    <WrapSearchItem
                        data={item}
                        onPress={() => navigateItem(item)}
                    />
                )}
                keyExtractor={item => item.ID}
            />
        </>;
    }

    return (<>
        <View style={modal.wrapper}>
            <ResultList />
        </View>
    </>);
};

const ListPlaceholder = () => {
    function PlaceholderItem() {
        return <>
            <ContentLoader
                height={170}
                width={400}
                speed={2}
                primaryColor="lightgray"
                secondaryColor="darkgray"
            >
                <Rect x="30" y="15" rx="25" ry="25" width="140" height="140" />
                <Rect x="185" y="15" rx="10" ry="10" width="170" height="25" />
                <Rect x="185" y="50" rx="6" ry="6" width="120" height="15" />
                <Rect x="185" y="75" rx="10" ry="10" width="140" height="80" />
            </ContentLoader>
        </>;
    }

    return <>
        <ScrollView>
            <PlaceholderItem />
            <PlaceholderItem />
            <PlaceholderItem />
            <PlaceholderItem />
        </ScrollView>
    </>;
}

const WrapSearchItem = (props) => {
    const { data, onPress } = props;
    const { TITLE, CREATED_DATE, DESCRIPTION, IMAGE } = data;

    return <>
        <SearchItem
            title={TITLE}
            description={DESCRIPTION}
            createdAt={CREATED_DATE}
            itemImage={IMAGE}
            onPress={onPress}
        />
    </>;
}

const SearchItem = ({ title = 'no title', createdAt = 'no date', description = 'no description', itemImage, ...props }) => {
    const { onPress } = props;

    function setDate(date) {
        return moment(date, 'YYYYMMDDHHmmss').fromNow();
    };

    const imageUri = !itemImage ?
        require('../../assets/images/MegaTron.jpg') : { uri: itemImage };

    return <>
        <TouchableOpacity
            style={searchItem.wrapper}
            onPress={onPress}
        >
            <View style={searchItem.item}>
                <View style={searchItem.imageWrapper}>
                    <Image
                        source={imageUri}
                        style={{ width: '100%', height: '100%', }}
                        borderRadius={25}
                    />
                </View>
                <View style={searchItem.descriptionWrapper}>
                    <Text
                        style={searchItem.title}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >
                        {title}
                    </Text>

                    <Text
                        style={searchItem.date}
                    >
                        {'since ' + setDate(createdAt)}
                    </Text>

                    <Text
                        style={searchItem.description}
                        numberOfLines={2}
                    >
                        {description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    </>;
}

const modal = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});

const search = StyleSheet.create({
    wrapper: {
        margin: 25,
    },

    inputWrapper: {
        flexDirection: 'row'
    },

    inputText: {
        flex: 1,
        marginRight: 15
    },

    button: {
        flexBasis: 60,
        height: 60,

        justifyContent: 'center',
        alignSelf: 'flex-end',

        borderRadius: 20,
        backgroundColor: 'lightgray'
    }
});


const searchItem = StyleSheet.create({
    wrapper: {
        elevation: 4,

        backgroundColor: 'white',

        borderRadius: 30,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 15,
        marginBottom: 15,
    },

    item: {
        flexDirection: 'row',
        margin: 15,
    },

    imageWrapper: {
        flexBasis: 140,

        height: 140,

        borderRadius: 25,
        backgroundColor: 'lightgray'
    },

    descriptionWrapper: {
        flex: 1,

        marginLeft: 15,
        marginRight: 15,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    date: {
        fontSize: 14,
        color: 'gray',

        marginTop: 2,
    },

    description: {
        color: 'gray',
        fontSize: 16,

        marginTop: 6,
    }
});

export default SearchArticle;
