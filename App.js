import { NavigationContainer, useNavigation} from '@react-navigation/native';
import React from "react";
import { Button, View} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="LivePage" component={LivePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomePage(props) {
    const navigation = useNavigation();
    return (
        <View style={{flex: 1,alignItems: 'center',justifyContent: 'space-around'}}>
            <Button title="Start a live" onPress={()=>{navigation.navigate('LivePage',{isHost:true})}}/>
            <Button title="Watch a live" onPress={()=>{navigation.navigate('LivePage',{isHost:false})}}/>
        </View>
    )
}

import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG, AUDIENCE_DEFAULT_CONFIG} 
    from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'

function LivePage(props) {
  randomUserID = String(Math.floor(Math.random() * 100000))
  isHost = props.route.params.isHost;
  return (
    <View style={{flex: 1}}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={53072083}
        appSign='f6ca0133ef2e249830844f1a423e0ae4c33ba33b3b3e2023af4f0da471e9ba36'
        userID={randomUserID}
        userName={'user_'+randomUserID}
        liveID='testLiveID'

        config={{
          ...(isHost==true?HOST_DEFAULT_CONFIG:AUDIENCE_DEFAULT_CONFIG),
          onLeaveLiveStreaming:()=>{props.navigation.navigate('HomePage') }
        }}
      />
    </View>
  )
}
    