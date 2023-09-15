import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';
import { Searchbar } from 'react-native-paper'
import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Datacontext } from './datacontext';
// useEffectTe
// Text

const Preview = () => {
const user=useContext(Datacontext)
const [data,setData]=useState([])
// create("")
const [searchQuery, setSearchQuery] = useState('');
const [filteredData,setFilter]=useState([])
const getter = async()=>{
// axios.get
const fff =await Network.getIpAddressAsync()
await fetch(`${process.env.REACT_APP_BASE_URL}/preview`,{method:"get"}).then(e=>e.json()).then(e=>setData(e))
}



    useEffect(()=>{
        getter()      
//   .get('/').then(response => console.log(response))//
//   .then(e=>console.log(e))
        
     },[])
function filter(e){

    setSearchQuery(e)

 const datas =data.filter(e=>e.items.includes(searchQuery))
setFilter(datas)
        
}        
     // console.log(data)
const [itemsData,setItemData]=useState(100)



 const ItemComponents= ({itemData,quantity,store}) =>{
return(
<TouchableOpacity >

 <View

 style={{ backgroundColor:"white",paddingLeft:12,paddingRight:12, borderBottomWidth:4,borderRadius:0 , height:100 }} onTouchStart={()=>setItemData(itemData)}>

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
    
<Searchbar
style={{height:50,color:'white'}}
      placeholder="بحث"
      onChangeText={(query)=>filter(query)}
      value={searchQuery}
    />
{user.data.length>0 &&<FlatList
refreshing={refreshing}

onRefresh={()=>setData([...user.data])}
data={searchQuery.length>0 && filteredData ?filteredData:data}
renderItem={e=> <ItemComponents  id={e.item._id} itemData={e.item.items} quantity={e.item.quantity} store={e.item.store}/>}
keyExtractor={(e,index)=>e._id}/>
}


</SafeAreaView>  );
}
 
export default Preview;