import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {SafeAreaView, View} from "react-native"
import { RootSiblingParent } from 'react-native-root-siblings';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './Home';
import { AppRegistry, StyleSheet } from 'react-native';
import Login from './login';
import Preview from './preview';
import * as Notification from 'expo-notifications'
import auth from './context';
import {useMemo, useEffect, useState,useRef,useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstTransaction from './firsttransaction';
import PostNewDataToMainWarehouse from './newdata';
import { contractorsContext, Datacontext, storeNamesContext } from './datacontext';
import Secondtransaction from './secondtransaction';
import Thirdtransaction from './thirdtransaction';
import Fourth from './fourthtransacion';
import { createDrawerNavigator } from '@react-navigation/drawer';

import PreviewPages from './previewpages';
import jwtDecode from 'jwt-decode';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';


const BASE_URL =process.env.REACT_APP_BASE_URL;

export default function App() {
  setInterval(GetToken, 1)  

const [user,setUser]=useState("")
const [data,setContextData]=useState([])
const [contractor,setContractor]=useState([])
const [storeName,setStoreNames]=useState([])
const Stack = createStackNavigator()
const [notificationsToken,setNotifcationsToken]=useState('')
const [email,setEmail]=useState("")
const [Jwt,setJwt]=useState("")
const[authName,setAuthName]=useState(null)
const ref =useRef(0)

async function sendtoken(){
  const decoder = await jwtDecode(AsyncStorage.getItem("authToken"))
  setJwt(decoder)
  
  await axios.post(`${process.env.REACT_APP_BASE_URL}/sendtokentodb`,{email,token:notificationsToken})
  
}

// then(({data})=>{data.authtoken?AsyncStorage.setItem("authToken",data.authtoken):console.log("no data")}).catch(e=>console.log("error from catch"))
async function token(){
  await Notification.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notification.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
  


  const { status } = await Notification.requestPermissionsAsync();
if (status == "granted")
{
  token = (await Notification.getExpoPushTokenAsync()).data;
  setNotifcationsToken(token)}
  
  
}

const fetchData = async()=>{
    
  await fetch(`${process.env.REACT_APP_BASE_URL}/preview`,{method:"get"}).then(e=>e.json()).then(e=> setContextData(e))
  
   

}

const fetchNames = async()=>{
  await  fetch(`${process.env.REACT_APP_BASE_URL}/listofstores`,{method:"get"}).then(e=>e.json()).then(e=> setStoreNames(e))
 
}
const fetchStores = async()=>{
  await fetch(`${process.env.REACT_APP_BASE_URL}/listofnames`,{method:"get"}).then(e=>e.json()).then(e=> setContractor(e))
 
}



useEffect(()=>{


  
  

      
      fetchData();
      fetchNames();
      fetchStores();




   }

,[])


function LoggedComponent (){
  const Drawer = createDrawerNavigator()
  
  return (
    // 
    <>
    
   
  <auth.Provider value={{user,setUser}} >

      <NavigationContainer  independent={true}  >
      <storeNamesContext.Provider value={{storeName,setStoreNames}}>
    <Datacontext.Provider value={{data,setContextData}}>
    <contractorsContext.Provider value={{contractor,setContractor}}> 
      
        <Drawer.Navigator initialRouteName='Home'  style={{backgroundColor:"red"}} screenOptions={{
            swipeEdgeWidth:400,drawerActiveTintColor:"blue" ,flex:1,headerTitle:null
            
          }} >
        
        
        <Drawer.Screen name='Home' options={{drawerType:"slide"}} component={PreviewPages} />
        
        <Drawer.Screen name='ادخال اذن وارد' component={FirstTransaction} />
        <Drawer.Screen name="ادخال اذن منصرف" component={Secondtransaction} />
        <Drawer.Screen name="ادخال اذن تحويل " component={Thirdtransaction} />
        {/* <Drawer.Screen name="Login" component={Login} */}
        <Drawer.Screen name="ادخال اذن مرتجع " component={Fourth}  />
        <Drawer.Screen name="اضافة مهام الى المخزن" component={PostNewDataToMainWarehouse} />
      
        
        
        </Drawer.Navigator>
        </contractorsContext.Provider>
      </Datacontext.Provider>
      </storeNamesContext.Provider>
        </NavigationContainer>  
        </auth.Provider>
      
      </>
    
   
    

  )
  
}
const [Logger,setLogger]=useState("")


async function GetToken(){
  
    
    const logger =await AsyncStorage.getItem("authToken")

     setLogger(logger)
  

}
function LoginInComponent (){
  return (

<NavigationContainer><auth.Provider value={{user,setUser}} ><Stack.Navigator >
  <Stack.Screen name="Login" component={Login} options={{title:null}}/>
  
  </Stack.Navigator></auth.Provider></NavigationContainer>
  )}

// {authName?<NavigationContainer independent={true}><Stack.Screen  name='Login' component={Login}/></NavigationContainer>:
return (
// 

Logger?<LoggedComponent/>:<LoginInComponent/>




)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },ImageBackground:{
    width:"300 px",
    
    height:"600 px",
    // paddingBottom:"1px"
    flexDirection: 'column',
    alignItems:"center",
    justifyContent:"flex-end",
    alignContent:"center"
    ,flex:1
  }
,
TouchableOpacity:{
color:"red",
width:"700px"

}
  
  });
  