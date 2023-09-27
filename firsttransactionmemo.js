import 'react-native-gesture-handler'
import React from "react";
import { Alert, Button, KeyboardAvoidingView,ImageBackground,Text, TextInput, View,FlatList, Pressable, TouchableOpacity } from "react-native";


const ListComponen= React.memo((props)=>{


return(
<TouchableOpacity key={props.id}  onPress={()=>props.uniteGetter(props.id,props.item)} style={{height:50}}><Text  >
  {props.item}</Text></TouchableOpacity> 


)


})

export default ListComponen