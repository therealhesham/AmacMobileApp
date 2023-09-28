import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';

import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Datacontext } from './datacontext';
import { Searchbar } from 'react-native-paper';



const PreviewFirst = () => {
    const ssssss =process.env.REACT_APP_BASE_URL
const user=useContext(Datacontext)
    const [data,setData]=useState([])
// create("")
const getter = async()=>{
// axios.get
// const fff =await Network.getIpAddressAsync()
await fetch(`https://reactnativebackend.onrender.com/firsttansactionlist`,{method:"get"}).then(e=>e.json()).then(e=>setData(e))
}


console.log(process.env.REACT_APP_BASE_URL)



    useEffect(()=>{
        getter()      
//   .get('/').then(response => console.log(response))//
//   .then(e=>console.log(e))
        
     },[])

const [itemsData,setItemData]=useState(100)
const [searchQuery, setSearchQuery] = useState('');
const [filteredData,setFilter]=useState([])
function filter(e){

    setSearchQuery(e)
  
  const datas =data.filter(e=>e.items.includes(searchQuery))
  setFilter(datas)
        
  }     

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

<Searchbar
style={{height:50,color:'white'}}
      placeholder="بحث"
      onChangeText={(query)=>filter(query)}
      value={searchQuery}
    />
{data.length>0 &&<FlatList
refreshing={refreshing}

data={searchQuery.length>0 && filteredData ?filteredData:data}
renderItem={e=> <ItemComponents  id={e.item._id} items={e.item.items} destination={e.item.destination}

        
    
    
    
unit={e.item.unit}

    receiptno={e.item.receiptno} quantity={e.item.quantity} source={e.item.source}/>}
keyExtractor={(e,index)=>e._id}/>
}


</SafeAreaView>  );
}
 
export default PreviewFirst;