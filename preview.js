import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';

import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
// useEffectTe
// Text
const Preview = () => {
    const [data,setData]=useState([])
// create("")
const getter = async()=>{
// axios.get
const fff =await Network.getIpAddressAsync()
    console.log(fff)
}
getter()

    useEffect(()=>{
      fetch("https://0a02-196-133-9-14.ngrok-free.app/preview",{method:"get"}).then(e=>e.json()).then(e=>setData(e))
//   .get('/').then(response => console.log(response))//
//   .then(e=>console.log(e))
        
     },[])
// console.log(data)
const [itemsData,setItemData]=useState(100)



 const ItemComponents= ({itemData,quantity,store}) =>{
return(
<TouchableOpacity >

 <View
//    onTouchCancel={()=>setItemData("leave")} 
 style={{ paddingLeft:12,paddingRight:12, borderBottomWidth:4,borderRadius:30 , height:100 }} onTouchStart={()=>setItemData(itemData)}>

<Text>{itemData}</Text>
<Text>{quantity}</Text>
<Text>{store}</Text>
<View style={{height:5,borderRadius:13}}/>
</View>
</TouchableOpacity>
)

}
const [refreshing,setRefresh]=useState(false)

return (<SafeAreaView style={{width:Dimensions.get("screen")
}}>
    <View style={{backgroundColor:"f3a920",opacity:.2,height:26,paddingRight:5,justifyContent:"center",alignItems:"center",alignContent:"center"}}>
<Text >المتاح في المخازن</Text></View>
{data.length>0 &&<FlatList
refreshing={refreshing}
onRefresh={()=>setData([...data])}
data={data}
renderItem={e=> <ItemComponents  id={e.item._id} itemData={e.item.items} quantity={e.item.quantity} store={e.item.store}/>}
keyExtractor={(e,index)=>e._id}/>
}


</SafeAreaView>  );
}
 
export default Preview;