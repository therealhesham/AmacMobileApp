import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';

import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Datacontext } from './datacontext';
import { Searchbar } from 'react-native-paper';



const PreviewThird = () => {
const user=useContext(Datacontext)
    const [data,setData]=useState([])
// create("")
const getter = async()=>{
// axios.get
// const fff =await Network.getIpAddressAsync()
await fetch(`${process.env.REACT_APP_BASE_URL}/getthirdtransactions`,{method:"get"}).then(e=>e.json()).then(e=>setData(e))
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
    
<Searchbar
style={{height:50,color:'white'}}
      placeholder="بحث"
      onChangeText={(query)=>filter(query)}
      value={searchQuery}
    />
{data.length>0 &&<FlatList
refreshing={refreshing}
onRefresh={()=>setData([...data])}
data={searchQuery.length>0 && filteredData ?filteredData:data}
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