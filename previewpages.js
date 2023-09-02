import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View ,Text, TouchableOpacity, Dimensions } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import Preview from "./preview";
import App from "./App";
import { Swipeable } from "react-native-gesture-handler";

function Pages (props){
    

return(
<View style={{flex:1,flexDirection:"column"}}>
<View style={container.container}>
<TouchableOpacity onPress={()=>props.navigation.navigate('Preview')} >
<View style={container.View}>
<LinearGradient colors={['#ee9ca7', '#ffdde1']} style={{height:150,borderRadius:10}}>
<Text style={{padding:40}}>
    استعراض المخازن
</Text>
</LinearGradient>
</View>
</TouchableOpacity>
<TouchableOpacity >
<View style={container.View}>

<LinearGradient colors={['#ee9ca7', '#ffdde1']} style={{height:150,borderRadius:10}}>
<Text style={{padding:30}} allowFontScaling={false}>
    استعراض اذون الوارد
</Text>
</LinearGradient>
</View>
</TouchableOpacity>
<TouchableOpacity >
<View style={container.View}>
<LinearGradient colors={['#fc4a1a', '#f7b733']} style={{height:150,borderRadius:10}}>
<Text style={{paddingTop:30,paddingRight:30}}>
     
 استعراض المخازن
</Text>
</LinearGradient>
</View>
</TouchableOpacity>
<TouchableOpacity>
<View style={container.View} >
<LinearGradient colors={['#ee9ca7', '#ffdde1']} style={{height:150,borderRadius:10}}>
<Text style={{padding:40}} allowFontScaling={false}>
    استعراض المخازن
</Text>
</LinearGradient>
</View>
</TouchableOpacity>
<View style={container.View}>
{/* <LinearGradient> */}
<Text allowFontScaling={false}> 
    استعراض المنصرف
</Text>
{/* </LinearGradient> */}
</View>

</View>

<View>
<Text>

    
</Text>


</View>
    
</View>
)


 }



const PreviewPages = () => {
    const Stack = createStackNavigator() 
  
    return (
    <NavigationContainer independent={true} >
<Stack.Navigator initialRouteName="Pages"  screenOptions={{title:"عرض المخزن و حركات المخزن"}} >

<Stack.Screen name="Pages" component={Pages}   />
<Stack.Screen name="App" component={App} />
<Stack.Screen name="Preview" component={Preview} />
</Stack.Navigator>




    </NavigationContainer>
      );
}
const dem= Dimensions.get("screen")
 
 
const container = StyleSheet.create({container:{flex:1,gap:3,flexDirection:"row",flexWrap:"wrap"}
,View:{minWidth:dem.width/2-3,height:150,maxWidth:dem.width/2-3}


})

export default PreviewPages;