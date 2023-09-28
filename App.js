
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Button, Dimensions, Image, SafeAreaView, TextInput, View ,KeyboardAvoidingView ,StatusBar} from "react-native"
import { RootSiblingParent } from 'react-native-root-siblings';

import HomeScreen from './Home';

import { AppRegistry, StyleSheet } from 'react-native';
import Login from './login';
import Preview from './preview';
import * as Notification from 'expo-notifications'
import auth from './context';
import {useMemo, useEffect, useState,useRef,useCallback, useContext} from 'react';
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
import axios from 'axios';
// import { KeyboardAvoidingView } from 'react-native-web';
import Toast from 'react-native-toast-message';


const BASE_URL =process.env.REACT_APP_BASE_URL;

export default function App() {
  // setInterval(GetToken, 1000)  

  const [notExist,setExistense]=useState(null)
  const [user,setUser]=useState("")
const [data,setContextData]=useState([])
const [contractor,setContractor]=useState([])
const [storeName,setStoreNames]=useState([])
const Stack = createStackNavigator()
const [notificationsToken,setNotifcationsToken]=useState('')

const [Jwt,setJwt]=useState("")

const [Logger,setLogger]=useState({})
const[authName,setAuthName]=useState(Logger)
const ref =useRef(0)


    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    
    

    const [error,setError]=useState()
    const storage= async ()=>{
try {
    
} catch (error) {
    
}
        
    }
    // setTimeout (()=>GetToken,1000) 
    useEffect(()=>{

      GetToken()
         }
      
      ,[])
                  
            
    
  const toasterExistance= (e)=>{
    setExistense(e);
  Toast.show({text1:e,type:"error"});
  // setFrom("")
  // setTo("")
  // setExistense("")
  // setType("")
  // setQuantity("")
  // setItem("")

}
      const postData    =async()=>{
try {
    
    const {data} =await axios.post(`https://reactnativebackend.onrender.com/login`,{email,password})
    if (data === "dataNotFound") return toasterExistance("Email or Password isn't registered ")
    await AsyncStorage.setItem("authToken",data.authtoken)
// props.navigation.navigate("Home")

const condes = jwtDecode(data.authtoken)
// authenticate.setUser(condes)
setLogger(condes)
        

} catch (error) {
toasterExistance("Network Error")
  // console    
}

}

// console.log(AsyncStorage.getItem("authToken"))
const dim = Dimensions.get("screen").height/2
async function sendtoken(){
  const decoder = await jwtDecode(AsyncStorage.getItem("authToken"))
  
  
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



const date = new Date();
const hour = date.getHours();
const min = date.getMinutes();

const refauth = useRef(0)
async function GetToken(){
  
  try {
    
    const logger =await AsyncStorage.getItem("authToken")
const jwtDetails=jwtDecode(logger)
setLogger(jwtDetails)
  
  } catch (error) {
    
    toasterExistance("please Log in")
    
    setLogger("")
    
  }
  

}


function LoggedComponent (props){
  const Drawer = createDrawerNavigator()
  
  return (
    // 
    <>
    
   

      <NavigationContainer  independent={true}  >

    <Datacontext.Provider value={{data,setContextData}}>
    <contractorsContext.Provider value={{contractor,setContractor}}> 
<auth.Provider value={props}>
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
        </auth.Provider>      
        </contractorsContext.Provider>
      </Datacontext.Provider>

        </NavigationContainer>  

      
      </>
    
   
    

  )
  
}




function LoginInComponent (){
  
  return (

<NavigationContainer><Stack.Navigator >
  <Stack.Screen name="Login" component={Login} options={{title:null}}/>
  
  </Stack.Navigator></NavigationContainer>
  )}

  // {authName?<NavigationContainer independent={true}><Stack.Screen  name='Login' component={Login}/></NavigationContainer>:


return (
//
 

 Logger.username ?


<LoggedComponent logs={{Logger,setLogger}}/>:
<auth.Provider value={{user,setUser}}>
<SafeAreaView style={{backgroundColor:"white"}}>
{ notExist ? <Toast 
        position='top'
        topOffset={ StatusBar && StatusBar.currentHeight ? StatusBar.currentHeight+2 : 5} 

      />:null}    
    {/* <TouchableOpacity style={{backgroundColor:"white"}}> */}
 <KeyboardAvoidingView   behavior="position" keyboardVerticalOffset={200} style={styles.container}>
 <View style={{alignItems:"center",flexDirection:"column"}} ><Image style={{width:100,height:101,marginBottom:1,zIndex:-2000}} source={require('./assets/download.jpg')}  /></View>
 <TextInput  autoFocus
  placeholder= "  Email"  value={email} onChangeText={(e)=>setEmail(e)}
  style={{  borderRadius:19, backgroundColor: "lavender" , width:300 , height:35 , marginBottom:10}} secureTextEntry={false} />   
 <TextInput placeholder="  Password" value={password} 
 onChangeText={(e)=>setPassword(e)} 
 style={{  borderRadius:19, backgroundColor: "lavender" , width:300 , height:35,marginBottom:10}}
  secureTextEntry={true} />
<View>{error?<Text style={{color:"red"}}>{error}</Text> :null}</View>
 <Button title="Submit" style={{width:"50 px"}} onPress={postData} ></Button>
 
 </KeyboardAvoidingView>
 {/* </TouchableOpacity> */}
    
 
     </SafeAreaView>
     </auth.Provider>
 

)
}
// const styles = StyleSheet.create({container:

//   {paddingTop: Dimensions.get("screen").height/3,width:100,paddingLeft: 20 , flexDirection:"column",alignItems:"flex-start",backgroundColor:"white"

// }
// }) 
const styles = StyleSheet.create({
  container: {paddingTop: Dimensions.get("screen").height/3,width:100,paddingLeft: 20 , flexDirection:"column",alignItems:"flex-start",backgroundColor:"white"

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
  