import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';

import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Datacontext } from './datacontext';
import { Searchbar } from 'react-native-paper';
import { Image } from 'react-native';
import { Share } from 'react-native';
import { Icon } from '@rneui/themed';



const PreviewSecond = () => {
const user=useContext(Datacontext)
const [showImage,setShowImage]=useState(false)
  const [ toImage,setToImage]=useState("")
    const [data,setData]=useState([])
// create("")
const getter = async()=>{
// axios.get
// const fff =await Network.getIpAddressAsync()
await fetch(`https://reactnativebackend.onrender.com/getsecondtransactions`,{method:"get"}).then(e=>e.json()).then(e=>setData(e.reverse()))
}




    useEffect(()=>{
        getter()      
//   .get('/').then(response => console.log(response))//
//   .then(e=>console.log(e))
        
     },[])
     
     const onShare = async (receiptno,items,quantity,unit,store ,url) => {
        try {
          const result = await Share.share({
            title:" تفاصيل",
            message:
            `اذن منصرف رقم ${receiptno} المهام ${items} من  ${store} بال${unit} ${quantity} ...... الرابط من هنا ${url}`
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
              console.log(result)
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
            console.log(result)
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };
    



const [searchQuery, setSearchQuery] = useState('');
const [filteredData,setFilter]=useState([])
function filter(s){

    setSearchQuery(s)
  
  const datas =data.filter(e=>e.receiptno.includes(s))
  setFilter(datas)
        
}

const ssss = useCallback((id)=>{
  
  setToImage(id)
  setShowImage(true)},[toImage])


 const ItemComponents= ({file,date,receiptno,items,quantity,id,unit,typeOfContracting,typeOfImporter,contractor,store,location}) =>{
return(
<TouchableOpacity >

 <View 
style={{ padding:12,alignContent:"center",alignItems:"inherit",backgroundColor:"#ffffff",borderRadius:30 , marginBottom:20}} >

<Text style={{flexDirection:"row" }} >                                                                                                                                
<Text  >رقم الاذن   : {receiptno} </Text> <Icon name='share' color="black"  iconStyle={ {justifyContent:"flex-start",marginTop:0, marginRight:Dimensions.get("window").width/1.9}}  onPress={()=>onShare(receiptno,items,quantity,unit,store, file )} /> </Text>
<Text>التاريخ    {date}</Text>
<Text>المهام     {items}</Text>
<Text>الكمية     {quantity}</Text>
<Text>الوحدة     {unit}</Text>
<Text>نوع العملية     {typeOfContracting}</Text>

{typeOfImporter =="مقاول" ?<Text>{contractor}</Text>:null}
<Text>المخزن     {store}</Text>
<Text>الموقع     {location}</Text>
{file && <Icon iconStyle={{marginRight:Dimensions.get("screen").width-50,width:30}}  reverse={false} name="image"  onPressIn={()=>ssss(receiptno)}/>}
{showImage & toImage==receiptno?

    <Image   resize={true}   style={{width:file?Dimensions.get("screen").width-95:0,paddingBottom:1,height:file?200:0,alignSelf:'center'}}
  source={{
    uri: file?file:null,
  }}/>:null}

{/* <View style={{height:5,borderRadius:13}}/> */}
</View>
</TouchableOpacity>
)

}
const [refreshing,setRefresh]=useState(false)
Dim = useWindowDimensions()
return (<SafeAreaView style={{width:Dimensions.get("screen"),flex:1
}}>

<Searchbar
style={{height:50,color:'white',width:Dimensions.get("screen"),marginBottom:12}}
      placeholder=" بحث برقم الاذن"
      onChangeText={(query)=>filter(query)}
      value={searchQuery}
    />
{data.length>0 &&<FlatList
refreshing={refreshing}
// onRefresh={()=>setData([...user.data])}
data={searchQuery.length>0  ?filteredData:data}
renderItem={e=> <ItemComponents  id={e.item._id}


file={e.item.file}
receiptno={e.item.receiptno} items={e.item.items}
store={e.item.store} location={e.item.location}
        
    
date={e.item.date}        
typeOfImporter={e.item.typeOfImporter}    
quantity={e.item.quantity}

unit={e.item.unit} typeOfContracting={e.item.typeOfContracting} contractor={e.item.contractor}/>}
keyExtractor={(e,index)=>e._id}/>
}


</SafeAreaView>  );
}
 
export default PreviewSecond;