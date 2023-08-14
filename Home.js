import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
// import "../"

import { Button, Dimensions, Image, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
export default function HomeScreen(props) {
const dimension = Dimensions.get("screen")
console.log(dimension)
const [{username},setAuth]=useState("")
const [store,setStore]=useState()


const [padding,setPadding]=useState(20)
const storageFn =async ()=>{
try {
  const storage =await AsyncStorage.getItem("authToken")
const nameOfAuth = jwtDecode(storage)
setAuth(nameOfAuth)
  setStore(storage)
  setPadding(90)  
} catch (error) {
  console.log(error)
}

} 
useEffect(()=>
{
storageFn()
})
// const naivgate = Navigation()
const backgroundImageSource={uri:"./assets/download.jpg"}
  return (
    <View style={styles.container}>
     <ImageBackground style={styles.ImageBackground} resizeMode='center'   
     
     source={require('./assets/download.jpg')}
    //  source={backgroundImageSource}
     >
<TouchableOpacity style={{width:dimension.width-12,paddingBottom:padding,gap:9}}>

     
      {username ?<View><Button  title="تسجيل الجرد" color="purple"  onPress={()=>props.navigation.navigate('Postnewdata')} style={{paddingBottom:10}}/>
    <Button  title="المخزن" color="purple"  onPress={()=>props.navigation.navigate('Preview')} style={{paddingBottom:10}}/>
    <Button  title="ادخال منصرف" color="red" onPress={()=>props.navigation.navigate('Secondtransaction')} />
    <Button  title="ادخال بيانات وارد" color="#F5D329" onPress={()=>props.navigation.navigate('FirstHandleRoute')} style={{paddingBottom:40}}/></View>
    :
    <View>
    <Button  title="LogIn" color="red" onPress={()=>props.navigation.navigate('Login')} />
    
    <Button  title="Register"></Button>
    </View>
    }
      </TouchableOpacity>
     </ImageBackground>


    </View>
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
