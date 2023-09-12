import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';

import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Datacontext } from './datacontext';



const PreviewFirst = () => {
const user=useContext(Datacontext)
    const [data,setData]=useState([])
// create("")
const getter = async()=>{
// axios.get
// const fff =await Network.getIpAddressAsync()
await fetch(`${process.env.REACT_APP_BASE_URL}/firsttansactionlist`,{method:"get"}).then(e=>e.json()).then(e=>setData(e))
}




    useEffect(()=>{
        getter()      
//   .get('/').then(response => console.log(response))//
//   .then(e=>console.log(e))
        
     },[])

const [itemsData,setItemData]=useState(100)



 const ItemComponents= ({items,destination,unit,receiptno,quantity,source}) =>{
return(
<TouchableOpacity >

 <View
style={{ paddingLeft:12,paddingRight:12, borderBottomWidth:4,borderRadius:30 , height:150,marginBottom:20 }} >

<Text>رقم الاذن    {receiptno}</Text>
<Text>المهام     {items}</Text>
<Text>الكمية     {quantity}</Text>
<Text>الوحدة     {unit}</Text>
<Text>المصدر     {source}</Text>
<Text>المخزن     {destination}</Text>

{/* <View style={{height:5,borderRadius:13}}/> */}
</View>
</TouchableOpacity>
)

}
const [refreshing,setRefresh]=useState(false)

return (<SafeAreaView style={{width:Dimensions.get("screen")
}}>
    <View style={{backgroundColor:"f3a920",opacity:.2,height:26,paddingRight:5,justifyContent:"center",alignItems:"center",alignContent:"center"}}>
<Text >اذون الوارد</Text></View>
{user.data.length>0 &&<FlatList
refreshing={refreshing}
// onRefresh={()=>setData([...user.data])}
data={data}
renderItem={e=> <ItemComponents  id={e.item._id} items={e.item.items} destination={e.item.destination}

        
    
    
    
unit={e.item.unit}

    receiptno={e.item.receiptno} quantity={e.item.quantity} source={e.item.source}/>}
keyExtractor={(e,index)=>e._id}/>
}


</SafeAreaView>  );
}
 
export default PreviewFirst;