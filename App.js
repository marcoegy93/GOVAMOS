/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useContext, useEffect } from 'react';
 import { View, ActivityIndicator, Image, ImageBackground, Dimensions} from 'react-native';
 import { createStackNavigator } from '@react-navigation/stack';
 import { NavigationContainer } from '@react-navigation/native';
 import Login from './screens/Login';
 import Subscribe from './screens/Subscribe';
 import HomeScreen from './screens/HomeScreen';
 import AddAnnonce from './screens/AddAnnonce';
 import Annonce from './screens/Annonce';
 import MesAnnonces from './screens/MesAnnonces';
 import Settings from './screens/Settings';
 const Stack = createStackNavigator();
 const App = () => {
   const [isLoading, setIsLoading] = React.useState(true);
   useEffect(() => {
     setTimeout(() => {
       setIsLoading(false);
     }, 1000);
   }, []);
   if (isLoading) {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Image
           source={require('./assets/porsche.png')}
 
           style={{
             height: Dimensions.get('window').height / 4,
             width: '90%',
             marginBottom: 30
           }}
 
         />
         <ActivityIndicator size="large" color="black"/>
       </View>
     )
   }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Subscribe" component={Subscribe} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Annonce" component={Annonce} />
          <Stack.Screen name="AddAnnonce" component={AddAnnonce} />
          <Stack.Screen name="MesAnnonces" component={MesAnnonces} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};
 
 
 export default App;
 