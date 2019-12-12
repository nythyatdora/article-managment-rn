import React from 'react';
import { Pages } from 'react-native-pages';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

const Home = (props) => {
    return (<>
        <Main />
    </>);
};

const Main = () => {
    return (<>
        <View style={main.wrapper}>
            <View style={main.textIntro}>
                <Text style={[main.textSize$42, main.textBold]}>Welcome</Text>
                <Text style={[main.textSize$28, main.textBold, main.textDarkgray]}>This is where you can view article, and learn about things.</Text>
            </View>

            <View style={main.pageViewer}>
                <Pages>
                    <View style={main.page__item}>
                        <Image
                            style={main.image$fill}
                            source={{ uri: 'https://images.unsplash.com/photo-1575583807331-4b8788be0c4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' }}
                        />
                    </View>

                    <View style={main.page__item}>
                        <Image
                            style={main.image$fill}
                            source={{ uri: 'https://images.unsplash.com/photo-1522102508366-fb56e193c6a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80' }}
                        />
                    </View>

                    <View style={main.page__item}>
                        <Image
                            style={main.image$fill}
                            source={{ uri: 'https://images.unsplash.com/photo-1575677155757-b5eb75df3a4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' }}
                        />
                    </View>
                </Pages>
            </View>
        </View>
    </>);
};

const main = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    textIntro: {
        flex: 1,
        margin: 25,
    },

    textSize$42: {
        fontSize: 42,
    },

    textSize$32: {
        fontSize: 32,
    },

    textSize$28: {
        fontSize: 28,
    },

    textBold: {
        fontWeight: 'bold',
    },

    pageViewer: {
        zIndex: 50,
        flexBasis: 400,
    },

    textDarkgray: {
        color: 'darkgray'
    },

    page__item: {

    },

    image$fill: {
        width: '100%',
        height: '100%',
    },

    viewArticles: {
        position: 'absolute',
        bottom: 40,

        elevation: 3,

        backgroundColor: 'transparent',

        flex: 1,
        alignItems: 'center',
    },
});

export default Home;
