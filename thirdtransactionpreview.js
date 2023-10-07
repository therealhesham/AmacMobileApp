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
import { Alert } from 'react-native';
import { Icon } from '@rneui/themed';



const PreviewThird = () => {
const user=useContext(Datacontext)
const [show, setShow] = useState(false);
const [Link,setLink]=useState(""); 

const [showImage,setShowImage]=useState(false)
const [ toImage,setToImage]=useState("")
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
function filter(s){

    setSearchQuery(s)
  
  const datas =data.filter(e=>e.receiptno.includes(s))
  setFilter(datas)
        
  }     
  const ssss = useCallback((id)=>{
    id==toImage
      setToImage(id)
      setShowImage(true)},[toImage])
    

      const onShare = async (receiptno,items,quantity,unit,from,to,file) => {
        try {
          const result = await Share.share({
            title:" تفاصيل",
            message:
            `اذن تحويل رقم ${receiptno}  \n المهام ${items}\n  من  ${from} الى ${to} بال${unit} ${quantity} ...... الرابط من هنا ${file}`
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
    
 const ItemComponents= ({from,to,receiptno ,quantity,items,unit,file,date,id}) =>{
return(
<TouchableOpacity >

 <View
style={{ padding:12,alignContent:"center",alignItems:"inherit",backgroundColor:"#ffffff",borderRadius:30 , marginBottom:20 }}  >

<Text style={{flexDirection:"row" }} >                                                                                                                                
<Text  >رقم الاذن   : {receiptno} </Text> <Icon name='share' color="black"  iconStyle={ {justifyContent:"flex-start",marginTop:0, marginRight:Dimensions.get("window").width/1.9}}  onPress={()=>onShare(receiptno,items,quantity,unit,from,to,file)} /> </Text>
<Text>التاريخ    {date}</Text>
<Text>من مخزن     {from}</Text>
<Text>الى مخزن     {to}</Text>
<Text>المهام     {items}</Text>
<Text>الكمية     {quantity}</Text>
<Text>الوحدة     {unit}</Text>


{file && <Icon iconStyle={{marginRight:Dimensions.get("screen").width-50,width:30}}  reverse={false} name="image"  onPress={()=>ssss(id)}/>}
{showImage & toImage==id?

    <Image   resize={true}   style={{width:file?Dimensions.get("screen").width-95:0,paddingBottom:1,height:file?200:0,alignSelf:'center'}}
  source={{
    uri: file?file:null,
  }}/>:null}


</View>
</TouchableOpacity>
)

}


const [refreshing,setRefresh]=useState(false)

return (<SafeAreaView style={{width:Dimensions.get("screen"),flex:1
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

file={e.item.file}
date={e.item.date}
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