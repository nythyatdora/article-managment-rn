import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        padding: 25,

        height: 100,

        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    left: {
        flex: 1,
    },

    right: {
        flexBasis: 60,
        alignItems: 'flex-end',
    },

    item: {
        paddingLeft: 12,
        paddingRight: 12,
    },

    item$first: {
        paddingLeft: -12,
    },

    item__text: {
        fontSize: 28,
        fontWeight: 'bold',
    },

    item__button: {
        backgroundColor: 'darkgray',
        justifyContent: 'center',
    },

    item__button$rounded: {
        width: 50,
        height: 50,

        borderRadius: 50,
    }
});


