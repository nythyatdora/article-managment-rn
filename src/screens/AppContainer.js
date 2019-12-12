import React from 'react';
import {
    Provider
} from 'react-redux';

// import {
//     store, persistor
// } from '../redux/store/WithReduxPersist';

import {
    store,
} from '../redux/store/WithoutReduxPersist';

import Nav, { NavigationBarWithTitle as NavTitle } from '../components/NavigationBar/NavigationBar';
import HomeScreen from './Home/Home';
import ArticleScreen from './Articles/Articles';
import ViewArticleScreen from './Articles/ViewArticle';
import AddArticleScreen from './Articles/AddArticle';
import SearchArticleScreen from './Articles/SearchArticle';

// const AppWithPersit = <>
//     <Provider store={store}>
//         <PersistGate persistor={persistor}>
//             <ArticlesScreen />
//         </PersistGate>
//     </Provider>
// </>;

import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';

const RouteConfigs = {
    HOME_SCREEN: {
        screen: HomeScreen,
        navigationOptions: (props) => ({
            header: <Nav {...props} />
        })
    },
    ARTICLE_SCREEN: {
        screen: ArticleScreen,
        navigationOptions: (props) => ({
            header: <Nav {...props} />
        })
    },
    VIEW_ARTICLE_SCREEN: {
        screen: ViewArticleScreen,
        navigationOptions: (props) => ({
            headerShown: false,
        })
    },
    ADD_ARTICLE_SCREEN: {
        screen: AddArticleScreen,
        navigationOptions: (props) => ({
            header: <NavTitle title='Add New Article' {...props} />
        })
    },
    SEARCH_ARTICLE_SCREEN: {
        screen: SearchArticleScreen,
        navigationOptions: (props) => ({
            header: <NavTitle title='Search Article' {...props} />
        })
    },
};

const StackNavigatorConfig = {
    initialRouteName: 'HOME_SCREEN',
    headerMode: 'float',
};

const StackNavigation = createStackNavigator(RouteConfigs, StackNavigatorConfig);

const AppNavigator = createAppContainer(StackNavigation);

const AppWithRedux = () => <>
    <Provider store={store}>
        <AppNavigator />
    </Provider>
</>;

const AppContainer = () => {
    return (<>
        <AppWithRedux />
    </>);
}

export default AppContainer;