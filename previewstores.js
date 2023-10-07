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
import auth from "./context";
import { useContext, useEffect, useState } from "react";
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Icon } from "@rneui/themed";

function PreviewStores (props){
const [data,setData]=useState([]);
const [queryStore,setQueryStore]=useState("");
const [store,setStores]= useState([]);

 async function fetchStores(){
    await fetch(`https://reactnativebackend.onrender.com/listofstores`,{method:"get"}).then(e=>e.json()).then(e=> setStores(e))
     
    }
  
async function dataGetter(){
    const dataFetcher = await fetch(`https://reactnativebackend.onrender.com/preview`,{method:"get"}).then(e=>e.json())
     setData(dataFetcher.filter(e=>e.store.includes(queryStore)))

}
 


useEffect(()=>{
fetchStores()
dataGetter()

},[queryStore])

    async function onShare(e){
    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, e.name);
    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx"
    });
    const uri = FileSystem.cacheDirectory + `${e.name}.xlsx`;
    
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64
    });
    
    await Sharing.shareAsync(uri, {
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      dialogTitle: 'data',
      UTI: 'com.microsoft.excel.xlsx'
    });
    
    }
    




return(
<SafeAreaView style={{flex:1,flexDirection:"column" }}>
<View style={container.container}>

{store.map(e=><TouchableOpacity  onPress={()=>{
    
    setQueryStore(e.name)
    onShare(e)}} >
<View style={container.View}  key={e._id}>


<LinearGradient colors={['#ee9ca7', '#ffdde1']} style={{paddingBottom:3,borderRadius:10}}>
<Text style={{padding:40}} allowFontScaling={false}>
مشاركة جرد {e.name} كملف اكسيل

</Text>

<Icon name="send"></Icon>
</LinearGradient>
</View>
</TouchableOpacity>

)}


<TouchableOpacity  onPress={()=>{
    const e = {name:"جميع المخازن المتاحة في السيستم"}
    
    setQueryStore("")
    onShare(e)}} >
<View style={container.View}  key={2}>


<LinearGradient colors={['#ee9ca7', '#ffdde1']} style={{borderRadius:10}}>
<Text style={{padding:40}} allowFontScaling={false}>
مشاركة جرد كل المخازن

</Text>

<Icon name="send" ></Icon>
</LinearGradient>
</View>
</TouchableOpacity>

</View>

    

</SafeAreaView>
)


 }

const dem= Dimensions.get("screen")
 
 
const container = StyleSheet.create({container:{flex:1,gap:3,flexDirection:"row",flexWrap:"wrap"}
,View:{minWidth:dem.width/2-3,maxWidth:dem.width/2-3,alignSelf:"center"}


})

export default PreviewStores;