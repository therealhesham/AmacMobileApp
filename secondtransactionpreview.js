import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';

import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Datacontext } from './datacontext';
import { Searchbar } from 'react-native-paper';



const PreviewSecond = () => {
const user=useContext(Datacontext)
    const [data,setData]=useState([])
// create("")
const getter = async()=>{
// axios.get
// const fff =await Network.getIpAddressAsync()
await fetch(`${process.env.REACT_APP_BASE_URL}/getsecondtransactions`,{method:"get"}).then(e=>e.json()).then(e=>setData(e))
}




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

 const ItemComponents= ({receiptno,items,quantity,unit,typeOfContracting,typeOfImporter,contractor,store,location}) =>{
return(
<TouchableOpacity >

 <View
style={{ paddingLeft:12,paddingRight:12, borderBottomWidth:4,borderRadius:0  }} >

<Text>رقم الاذن    {receiptno}</Text>
<Text>المهام     {items}</Text>
<Text>الكمية     {quantity}</Text>
<Text>الوحدة     {unit}</Text>
<Text>نوع العملية     {typeOfContracting}</Text>

{typeOfImporter =="مقاول" ?<Text>{contractor}</Text>:null}
<Text>المخزن     {store}</Text>
<Text>الموقع     {location}</Text>

{/* <View style={{height:5,borderRadius:13}}/> */}
</View>
</TouchableOpacity>
)

}
const [refreshing,setRefresh]=useState(false)
Dim = useWindowDimensions()
return (<SafeAreaView style={{width:Dimensions.get("screen")
}}>

<Searchbar
style={{height:50,color:'white',width:Dimensions.get("screen"),marginBottom:12}}
      placeholder="بحث"
      onChangeText={(query)=>filter(query)}
      value={searchQuery}
    />
{user.data.length>0 &&<FlatList
refreshing={refreshing}
// onRefresh={()=>setData([...user.data])}
data={searchQuery.length>0 && filteredData ?filteredData:data}
renderItem={e=> <ItemComponents  id={e.item._id}



receiptno={e.item.receiptno} items={e.item.items}
store={e.item.store} location={e.item.location}
        
    
    
typeOfImporter={e.item.typeOfImporter}    
quantity={e.item.quantity}

unit={e.item.unit} typeOfContracting={e.item.typeOfContracting} contractor={e.item.contractor}/>}
keyExtractor={(e,index)=>e._id}/>
}


</SafeAreaView>  );
}
 
export default PreviewSecond;