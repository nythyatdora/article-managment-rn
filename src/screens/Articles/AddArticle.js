import React, { useState, useEffect, useCallback } from 'react';

import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    Alert
} from 'react-native';

import {
    Icon
} from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';

import ImagePicker from 'react-native-image-picker';

import {
    createArticle,
    uploadImage,
    viewArticles,
    clearImageLink
} from '../../redux/actions/ArticleActions/ArticleActions';

const AddArticle = (props) => {
    const { navigation } = props;

    return (<>
        <Main navigation={navigation} />
    </>);
};

const Buttons = (props) => {
    const imageLink = useSelector(state => state.articleReducer.uploadedImageLink);
    const dispatch = useDispatch();
    const { navigation, data } = props;
    const { title, description, photo } = data;

    function createForm(file) {
        let body = new FormData();
        body.append('FILE', {
            name: file.name,
            uri: file.uri,
            type: file.type,
        });

        return body;
    }

    function addHandler() {
        let newArticle = {
            TITLE: title,
            DESCRIPTION: description,
        };

        if (photo !== "") {
            dispatch(uploadImage(createForm(photo)));

            newArticle = {
                ...newArticle,
                IMAGE: imageLink,
            };
        }

        dispatch(createArticle(newArticle));
        dispatch(clearImageLink());
        dispatch(viewArticles(1, 15));

        navigation.navigate('ARTICLE_SCREEN');
    }

    return (<>
        <View style={buttons.wrapper}>
            <TouchableOpacity
                style={[buttons.button__default, buttons.button__rounded]}
                onPress={addHandler}
            >
                <Icon
                    size={22}
                    type='font-awesome'
                    name='rocket'
                    color='#fff'
                />
            </TouchableOpacity>
        </View>
    </>);
}

function Main(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const { navigation } = props;

    function onImagePickHandler() {
        ImagePicker.showImagePicker({}, (response) => {
            if (response.didCancel) {
                // user cancel
            } else if (response.error) {
                // log error
            } else if (response.customButton) {
                // tapped custom button
            } else {
                const source = {
                    name: response.fileName,
                    uri: response.uri,
                    type: response.type,
                    path: response.path,
                };
                setPhoto(source);
            }
        });
    }

    return (<>
        <ScrollView>
            <KeyboardAvoidingView>
                <View style={{ margin: 25, }}>
                    <InputText title='Title' placeholder='input title' multiline={true} value={title} valueHandler={setTitle} />

                    <InputText title='Description' placeholder='input description' multiline={true} value={description} valueHandler={setDescription} style={{ marginTop: 12, }} />

                    {!photo ?
                        <ImageInput onPress={onImagePickHandler} />
                        :
                        <Image
                            source={photo}
                            style={{ flex: 1, height: 400, marginTop: 25, }}
                            borderRadius={10}
                        />
                    }
                </View>
            </KeyboardAvoidingView>
        </ScrollView>

        <Buttons navigation={navigation} data={{ title, description, photo }} />
    </>);
};

const ImageInput = (props) => {
    return <BaseImageInput {...props} />
}

const BaseImageInput = ({ onPress }) => {
    return <>
        <TouchableOpacity
            style={imageView.default}
            onPress={onPress}
        >
            <Icon
                size={72}
                type='font-awesome'
                name='photo'
                color='darkgray'
            />
        </TouchableOpacity>
    </>;
}

export const InputText = (props) => {
    return <>
        <BaseTextInput {...props} />
    </>;
};

const BaseTextInput = ({ title, placeholder, value, valueHandler, style, multiline }) => {
    function onChangeTextHandler(text) {
        valueHandler(text);
    }

    return <>
        <Text style={[input.input__header, style]}>{title}</Text>
        <TouchableOpacity style={input.input__textWrapper}>
            <TextInput
                value={value}
                style={input.input__text}
                multiline={multiline}
                placeholder={placeholder}
                onChangeText={onChangeTextHandler}
            />
        </TouchableOpacity>
    </>
}

const input = StyleSheet.create({
    input__header: {
        fontSize: 22,
        fontWeight: 'bold'
    },

    input__textWrapper: {
        borderColor: 'lightgray',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 10,

        marginTop: 12,
    },

    input__text: {
        fontSize: 18,
        margin: 4
    }
});

const buttons = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        alignSelf: 'flex-end',

        bottom: 25,
        right: 25
    },

    button__default: {
        backgroundColor: 'black',
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

const imageView = StyleSheet.create({
    default: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        height: 300,
        backgroundColor: 'white',

        borderStyle: 'dashed',
        borderColor: 'lightgray',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 10,

        marginTop: 15,
    }
});


export default AddArticle;
