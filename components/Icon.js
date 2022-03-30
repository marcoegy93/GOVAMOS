import React from 'react';
import reactDom from 'react-dom';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';

const Icon = (props) => {
    return (
        <View style={styles.iconView}>
                <Image source={props.iconImage} style={styles.icon}/>
        </View>
    );
}

const styles = StyleSheet.create({
    iconView: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        // height: 25,
        // height: 30,
        // paddingTop: 10,
        // paddingBottom: 10,
        // marginBottom: 1,

        //borderColor: 'black',
        // borderWidth: 1,
        
    },
    icon: {
        //flex: 1,
        width: 30,
        height: 30,
        resizeMode: 'center'
    },
  });


export default Icon;