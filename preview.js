import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Searchbar } from 'react-native-paper'
import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button,Dimensions, FlatList, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Datacontext, storeNamesContext } from './datacontext';
import { Swipeable } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import jwtDecode from 'jwt-decode';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import DatePicker from 'react-native-datepicker';
import { Picker } from "@react-native-picker/picker";
const Preview = () => {
const user=useContext(Datacontext)
const [data,setData]=useState([])
const [updater,setUpdater]=useState("")
const [items,setItems] = useState("")
const [store,setStore]=useState("")
const [type,setType]=useState("")
const [Quantity,setQuantity]=useState("")
const [Jwt,setJwt]=useState("")
const [Logger,setLogger]=useState({})
const [searchQuery, setSearchQuery] = useState('');
const [filteredData,setFilter]=useState([])
const [notExist,setExistense]=useState(null);
const [queryStore,setQueryStore]=useState("")
const getStores =useContext(storeNamesContext)
const [storeFetcher,setStorefetcher]=useState([])

const fetchStores = async()=>{
  await fetch(`https://reactnativebackend.onrender.com/listofstores`,{method:"get"}).then(e=>e.json()).then(e=> setStorefetcher(e))
   
  }

const getter = async()=>{
    setSearchQuery("")
  
    
    if(data.length === 0){
      
      const dataFetcher = await fetch(`https://reactnativebackend.onrender.com/preview`,{method:"get"}).then(e=>e.json())
      queryStore.length>0 ? setData(dataFetcher.filter(e=>e.store.includes(queryStore))) : setData(dataFetcher)
      console.log("No data")  
    }else if(data.length >0) {
    
  
    data.length>0 ? setData(data.filter(e=>e.store.includes(queryStore))) : setData(data)
    console.log("yes data")  
        }
  
}
const getterRefresh = async()=>{
  // try {
    // const AWAITER =await AsyncStorage.getItem("bigData") 
    // AWAITER.length > 0  ? setData(JSON.parse(AWAITER).filter(e=>e.store.includes(queryStore))) : console.log("ss")
  // } catch (error) {
    
    // const fff =await Network.getIpAddressAsync()
    const dataFetcher = await fetch(`https://reactnativebackend.onrender.com/preview`,{method:"get"}).then(e=>e.json())
    // await AsyncStorage.setItem("bigData",JSON.stringify(dataFetcher))
    // setData(dataFetcher)
    queryStore.length>0 ? setData(dataFetcher.filter(e=>e.store.includes(queryStore))) : setData(dataFetcher)
        
  // }
  // if ()

}

async function GetToken(){
  
    try {
      
      const logger =await AsyncStorage.getItem("authToken")
  const jwtDetails=jwtDecode(logger)
  setLogger(jwtDetails)
    
    } catch (error) {
      console.log(error)
      
      setLogger("")
console.log("")
    }
    
  
  }
  const reset =()=>{

    setUpdater(0)
  }

  
    useEffect(()=>{
fetchStores()
      GetToken();
        getter()   ;   

//   .get('/').then(response => console.log(response))//
//   .then(e=>console.log(e))
        
     },[queryStore])
function filter(e){

    setSearchQuery(e)

 const datas =data.filter(e=>e.items.includes(searchQuery.trim()))
setFilter(datas)
        
}    

function filterbystore(s){
const newfiltered = filteredData.filter(e=>e.store.includes(s)) 
setFilter(newfiltered)
}    

     // console.log(data)
const [itemsData,setItemData]=useState(100)

const updateOne=async (e)=>{
    if(!Logger.isAdmin) { toasterExistance("You aren't authenticate to change or update data");
  
  }
    await axios.post(`https://reactnativebackend.onrender.com/updatedata`,{id:e,store:store,items:itemsData,type:type,quantity:Quantity}).then((e) => e.data == "updated" ?  reset()  :setError("خطأ في البيانات") )

  }


  
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

 const ItemComponents= ({itemData,id,quantity,store,type}) =>{
    const Delete=async (e)=>{
        try {
            
        
        if(!Logger.isAdmin) return toasterExistance("You aren't authenticate to change or update data");
        await axios.post(`${process.env.REACT_APP_BASE_URL}/delete`,{id:e},{withCredentials:true}).then((e) => console.log(e.data))
  const data = data.filter((s)=> e != s._id)
  const dataRe = [...data]
  setFilter(dataRe)}
  catch (error) {
            toasterExistance("You aren't authenticate to change or update data")
  }
      }
    const updating =useCallback((id,items,store,type,quantity)=>{
        if(!Logger.isAdmin) return toasterExistance("You aren't authenticate to change or update data");
        setItemData(items);
        
            setStore(store);
        setType(type);
            
        setQuantity(quantity);
        setUpdater(id)      
        
          },[updater,items,store,type,Quantity])
    return(

<TouchableOpacity style={{backgroundColor:"#ffffff",marginBottom:2}}>

 <View

 style={{ backgroundColor:"#ffffff",paddingLeft:12,paddingRight:12, 
 borderRadius:1,height:  updater === id ?400:200 }} >
{updater == id?<TextInput value={store}  style={{height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 8}} cursorColor="#000000" focusable={true} onChangeText={e=>setStore(e)}/>:<Text style={{marginBottom:10}}>{store}</Text>}
{updater == id?<TextInput value={itemData}  style={{height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 8 }} cursorColor="#000000" focusable={true} onChangeText={e=>setItems(e)}/>:<Text style={{marginBottom:10}}> {itemData}</Text>}
{/* {updater == id?<TextInput value={type}  style={{height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 8 }} cursorColor="#000000"  onChangeText={e=>setType(e)}/>:<Text style={{marginBottom:10}}>{type}</Text>} */}



{updater == id?<TextInput  defaultValue={`${quantity}`} value={quantity}  keyboardType='numeric' style={{height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 8 }} cursorColor="#000000" focusable={true} onChangeText={e=>setQuantity(e)}/>:<Text style={{marginBottom:10}}> بالــ {type} {quantity}</Text>}
<View  style={{alignSelf:"center",height:50}}>
    
    {updater ==id? <Button  onPress={()=>updateOne(updater)} title="send"></Button>:<Button  onPress={()=>updating(id,itemData,store,type,quantity)} title="Update"></Button>}
    
    
    
    </View>
    <View  style={{alignSelf:"center",height:50}}>
    <Button  disabled onPress={()=>Delete(updater)} title="Delete"></Button></View>
    { notExist ? <Toast 
        position='top'
        topOffset={3} onHide={()=> clearProps()}

      />:null}
{/* <View style={{height:2,borderRadius:13}}/> */}
</View>
</TouchableOpacity>
// </Swipeable>
)

}
const [refreshing,setRefresh]=useState(false)

return (<SafeAreaView style={{width:Dimensions.get("screen"),backgroundColor:"#ffffff",flex:1
}}>

<Searchbar
style={{height:50, marginBottom:3,opacity:.9}}
      placeholder="بحث"
      onChangeText={(query)=>filter(query)}
      value={searchQuery}
    />
<Picker style={{marginTop:3,opacity:1} }
  

  // ref={pickerRef}
  selectedValue={queryStore}
  onValueChange={(itemValue, itemIndex) =>{
    setData([])
    setQueryStore(itemValue)}
  }>

<Picker.Item label="  كل المخازن"  style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}} enabled={true} value="" key={1}  />
    {storeFetcher.map(e=><Picker.Item label={e.name}  style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}  key={e._id} value={e.name} />)}



</Picker>

    
{data.length>0 ?<FlatList

refreshing={refreshing}
ItemSeparatorComponent={<LinearGradient colors={["#8e9eab","#eef2f3"]} ><View style={{height:2}}></View></LinearGradient>}
onRefresh={getterRefresh}
data={searchQuery.length>0 && filteredData ?filteredData.reverse():data.reverse()}
renderItem={e=> <ItemComponents    id={e.item._id} itemData={e.item.items} quantity={e.item.quantity} store={e.item.store} type={e.item.type } />}
keyExtractor={(e,index)=>e._id}/>
:<View><Text> <ActivityIndicator color="red" size="large" />
قد لا يشمل المخزن اي مهام حتى الان</Text></View>}


</SafeAreaView>  );
}
 
export default Preview;