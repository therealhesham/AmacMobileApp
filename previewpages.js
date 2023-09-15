import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View ,Text, TouchableOpacity, Dimensions, Button,SafeAreaView } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import Preview from "./preview";
// import App from "./App";
import { Swipeable } from "react-native-gesture-handler";
import PreviewFirst from "./firsttransactionpreview"
import PreviewSecond from "./secondtransactionpreview";
import PreviewThird from "./thirdtransactionpreview";
import PreviewFourth from "./fouurthtransactionpreview";
import { StatusBar } from "expo-status-bar";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Pages (props){
        
async function Signout() {

   await AsyncStorage.removeItem("authToken")}
return(
<SafeAreaView style={{flex:1,flexDirection:"column" }}>
<View style={container.container}>
<TouchableOpacity onPress={()=>props.navigation.navigate('Preview')} >
<View style={container.View}>
<LinearGradient colors={['#ee9ca7', '#ffdde1']} style={{height:150,borderRadius:10}}>
<Text style={{padding:40}}>
    المتاح 
</Text>
</LinearGradient>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={()=>props.navigation.navigate('PreviewFirst')} >
<View style={container.View}>

<LinearGradient colors={['#ee9ca7', '#ffdde1']} style={{height:150,borderRadius:10}}>
<Text style={{padding:30}} allowFontScaling={false}>
 الوارد
</Text>
</LinearGradient>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={()=>props.navigation.navigate('PreviewSecond')} >
<View style={container.View}>
<LinearGradient colors={['#fc4a1a', '#f7b733']} style={{height:150,borderRadius:10}}>
<Text style={{paddingTop:30,paddingRight:30}}>
     
 المنصرف
</Text>
</LinearGradient>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={()=>props.navigation.navigate('PreviewThird')} >
<View style={container.View} >
<LinearGradient colors={['#ee9ca7', '#ffdde1']} style={{height:150,borderRadius:10}}>
<Text style={{padding:40}} allowFontScaling={false}>
    التحويل
</Text>
</LinearGradient>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={()=>props.navigation.navigate('PreviewFourth')} >
<View style={container.View} >
<LinearGradient colors={['#ee9ca7', '#ffdde1']} style={{height:150,borderRadius:10}}>
<Text style={{padding:40}} allowFontScaling={false}>
    المرتجعات
</Text>
</LinearGradient>
</View>
</TouchableOpacity>

</View>

<View style={{paddingBottom:30,width:200,alignSelf:"center"}}>
<Button title="تسجيل الخروج"  onPress={Signout}/>

</View>
    

</SafeAreaView>
)


 }
 


const PreviewPages = () => {
    const Stack = createStackNavigator() 
  
    return (
    <NavigationContainer independent={true}  >
<Stack.Navigator initialRouteName="Pages"  >

<Stack.Screen name="Pages" component={Pages}  options={{title:"حركات المخازن "}} />
{/* <Stack.Screen name="App" component={App} /> */}
<Stack.Screen name="Preview" component={Preview} options={{title:" جرد المخازن"}} />
<Stack.Screen name="PreviewSecond" component={PreviewSecond} options={{title:"المنصرف"}}/>

<Stack.Screen name="PreviewFirst" component={PreviewFirst} options={{title:"الــوارد"}}/>
<Stack.Screen name="PreviewThird" component={PreviewThird} options={{title:"التحويل"}}/>
<Stack.Screen name="PreviewFourth" component={PreviewFourth} options={{title:"المرتجع"}}/>
</Stack.Navigator>




    </NavigationContainer>
      );
}
const dem= Dimensions.get("screen")
 
 
const container = StyleSheet.create({container:{flex:1,gap:3,flexDirection:"row",flexWrap:"wrap"}
,View:{minWidth:dem.width/2-3,height:150,maxWidth:dem.width/2-3}


})

export default PreviewPages;