import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';
import print from 'print-js'
import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, Image, Linking, Modal, Pressable, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Datacontext } from './datacontext';
import { Searchbar } from 'react-native-paper';
import printJS from 'print-js';
import { Share } from 'react-native';
import { Icon } from '@rneui/themed';
// import Share from 'react-native-share';


const PreviewFirst = () => {
  const [data,setData]=useState([])
    const [itemsData,setItemData]=useState(100)
    const [searchQuery, setSearchQuery] = useState(null);
    const [filteredData,setFilter]=useState([])
    const [refreshing,setRefresh]=useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [showImage,setShowImage]=useState(false)
    const [ toImage,setToImage]=useState("")  
    
    
// create("")

const getter = async()=>{
// axios.get
// const fff =await Network.getIpAddressAsync()
await fetch(`https://reactnativebackend.onrender.com/firsttansactionlist`,{method:"get"}).then(e=>e.json()).then(e=>setData(e.reverse()))

}



    useEffect(()=>{
        getter()      
//   .get('/').then(response => console.log(response))//
//   .then(e=>console.log(e))
        
     },[])


     const isOrientation = Dimensions.get('window').width > Dimensions.get('window').height


console.log(isOrientation)
     function filter(s){

//     setSearchQuery(s)
//   console.log(s)
        // console.log(searchQuery.length)
  }     
  const onShare = async (receiptno,items,quantity,unit,source,destination ,url) => {
    try {
      const result = await Share.share({
        title:" تفاصيل",
        message:
        `اذن رقم ${receiptno} بالمهام ${items} من  ${source} الى ${destination}  بال${unit} ${quantity} ...... الرابط من هنا ${url}`
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
const ssss = useCallback((id)=>{

  setToImage(id)
  setShowImage(true)},[id=toImage])

  
  // console.log()
 const ItemComponents= ({id,items,date,file,destination,unit,receiptno,quantity,source}) =>{
return(


 <View  
style={{ padding:12,alignContent:"center",alignItems:"inherit",backgroundColor:"#ffffff",borderRadius:30 , marginBottom:20 }} >
<Text style={{flexDirection:"row" }} >
<Text  >رقم الاذن   : {receiptno} </Text> <Icon name='share' color="black"  iconStyle={ {justifyContent:"flex-start",marginTop:0, marginRight:Dimensions.get("window").width/1.9}}  onPress={()=>onShare(receiptno,items,quantity,unit,source,destination,file )} /> </Text>
<Text>تاريخ الاذن   : {date}</Text>
<Text>المهام    : {items}</Text>
<Text>الكمية    :  {quantity}</Text>
<Text>الوحدة    : {unit}</Text>
<Text>المصدر    : {source}</Text>
<Text>المخزن    : {destination}</Text>


{file && <Icon iconStyle={{marginRight:Dimensions.get("screen").width-50,width:30}}  reverse={false} name="image"  onPress={()=>ssss(id)}/>}
{showImage & toImage==id?

    <Image   resize={true}   style={{width:file?Dimensions.get("screen").width-95:0,paddingBottom:1,height:file?200:0,alignSelf:'center'}} uri={file}
  source={{
    uri: file,
  }}/>:""}

{/* <View style={{height:5,borderRadius:13}}/> */}
</View>

)

}


return (<SafeAreaView style={{ flex:1,width:Dimensions.get("screen")
}}>

<Searchbar

onClearIconPress={()=>setSearchQuery(null)}
style={{height:50,color:'#ffffff'}}
      placeholder=" بحث برقم الاذن"
onChangeText={(query)=>{
    
    setSearchQuery(query)
        const datas = data.filter(e=>e.receiptno.includes(parseInt(query)))
        setFilter(datas)
      
}}
value={searchQuery}
      
    />

{data.length>0 &&<FlatList
refreshing={refreshing}

// style={{flex:1}}
data={ filteredData.length > 0 ?  filteredData : data}
renderItem={e=> <ItemComponents  id={e.item._id} items={e.item.items} destination={e.item.destination}

        date={e.item.date}
    file={e.item.file}
    
    
unit={e.item.unit}

    receiptno={e.item.receiptno} quantity={e.item.quantity} source={e.item.source}/>}
keyExtractor={(e,index)=>e._id}/>
}


</SafeAreaView>  );
}
 
export default PreviewFirst;