import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';

import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Datacontext } from './datacontext';



const PreviewThird = () => {
const user=useContext(Datacontext)
    const [data,setData]=useState([])
// create("")
const getter = async()=>{
// axios.get
// const fff =await Network.getIpAddressAsync()
await fetch(`${process.env.REACT_APP_BASE_URL}/thirdtransaction`,{method:"get"}).then(e=>e.json()).then(e=>setData(e))
}




    useEffect(()=>{
        getter()      
//   .get('/').then(response => console.log(response))//
//   .then(e=>console.log(e))
        
     },[])

const [itemsData,setItemData]=useState(100)



 const ItemComponents= ({from,to,receiptno ,quantity,items,unit}) =>{
return(
<TouchableOpacity >

 <View
style={{ paddingLeft:12,paddingRight:12, borderBottomWidth:4,borderRadius:0  }} >

<Text>رقم الاذن    {receiptno}</Text>
<Text>من مخزن     {from}</Text>
<Text>الى مخزن     {to}</Text>
<Text>المهام     {items}</Text>
<Text>الكمية     {quantity}</Text>
<Text>الوحدة     {unit}</Text>


</View>
</TouchableOpacity>
)

}
const [refreshing,setRefresh]=useState(false)

return (<SafeAreaView style={{width:Dimensions.get("screen")
}}>
    <View style={{  opacity:1,height:26,paddingRight:5,justifyContent:"center",alignItems:"center",alignContent:"center"}}>
<Text > التحويل بين المخازن</Text></View>
{user.data.length>0 &&<FlatList
refreshing={refreshing}
onRefresh={()=>setData([...data])}
data={data}
renderItem={e=> <ItemComponents  id={e.item._id}
// transaction:"تحويل",



receiptno={e.item.receiptno} from={e.item.from}
to={e.item.to} 
// quantity={e.item.quantity}
        
    
    
quantity={e.item.quantity}

unit={e.item.unit}  items={e.item.items}/>}
keyExtractor={(e,index)=>e._id}/>
}


</SafeAreaView>  );
}
 
export default PreviewThird;