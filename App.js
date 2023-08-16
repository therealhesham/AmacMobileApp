import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './Home';
import { AppRegistry, StyleSheet } from 'react-native';
import Login from './login';
import Preview from './preview';

import auth from './context';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstTransaction from './firsttransaction';
import PostNewDataToMainWarehouse from './newdata';
import { contractorsContext, Datacontext, storeNamesContext } from './datacontext';
import Secondtransaction from './secondtransaction';
import Thirdtransaction from './thirdtransaction';
import Fourth from './fourthtransacion';

// import "./assets"
// StyleSheet
// AppRegistry
const BASE_URL =process.env.BASE_URL;

export default function App() {
const [user,setUser]=useState()
const [data,setContextData]=useState([])
const [contractor,setContractor]=useState([])
const [storeName,setStoreNames]=useState([])
const Stack = createStackNavigator()

useEffect(()=>{

  
    const fetchData = async()=>{
    
       await fetch(`https://0a02-196-133-9-14.ngrok-free.app/Preview`,{method:"get"}).then(e=>e.json()).then(e=> setContextData(e))
    }
    
    const fetchNames = async()=>{
    
      await fetch(`https://0a02-196-133-9-14.ngrok-free.app/listofnames`,{method:"get"}).then(e=>e.json()).then(e=> setContractor(e))
    }
    const fetchStores = async()=>{
    
      await fetch(`https://0a02-196-133-9-14.ngrok-free.app/listofstores`,{method:"get"}).then(e=>e.json()).then(e=> setStoreNames(e))
    }
    try {
      fetchData();
    
      fetchNames();
      fetchStores();  
    } catch (error) {
      console.log("error")
    }
    
    // const fetchBoth =async()=>{
    
    // const loadNames = await fetchNames(fetchData[0])
    // // setContextData(loadData)
    // setContractor(loadNames)
    // }
    // fetch()
    }
    


,[])

console.log(data)

return (
  // <RootSiblingParent>
  <storeNamesContext.Provider value={{storeName,setStoreNames}}>
  <Datacontext.Provider value={{data,setContextData}}>
  <contractorsContext.Provider value={{contractor,setContractor}}>
<auth.Provider value={{user,setUser}} >
<NavigationContainer>
<Stack.Navigator initialRouteName='Home' screenOptions={{title:null}} > 
<Stack.Screen  name="FirstHandleRoute"  component={FirstTransaction} />
<Stack.Screen  name="Thirdtransaction"  component={Thirdtransaction} />
<Stack.Screen name="Details"  component={HomeScreen} />
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Fourth" component={Fourth} />
<Stack.Screen name="Login" component={Login} />
<Stack.Screen name="Postnewdata" component={PostNewDataToMainWarehouse} />
<Stack.Screen  name="Preview" component={Preview}/>
<Stack.Screen  name="Secondtransaction" component={Secondtransaction}/>


</Stack.Navigator>

</NavigationContainer>  
</auth.Provider>
</contractorsContext.Provider>
</Datacontext.Provider>
</storeNamesContext.Provider>

);
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
  