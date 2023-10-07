import * as Network from 'expo-network';
import { StarOutlined, StarFilled, MailOutlined } from '@ant-design/icons';

import { create } from "apisauce";
import axios, { Axios } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Datacontext } from './datacontext';
import { Searchbar } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import { Share } from 'react-native';



const PreviewFourth = () => {
const [data,setData]=useState([])
const [itemsData,setItemData]=useState(100)
const [searchQuery, setSearchQuery] = useState('');
const [filteredData,setFilter]=useState([])
const user=useContext(Datacontext)
const [showImage,setShowImage]=useState(false)
const [ toImage,setToImage]=useState("")
const getter = async()=>{

await fetch(`${process.env.REACT_APP_BASE_URL}/refunds`,{method:"get"}).then(e=>e.json()).then(e=>setData(e))
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

const ssss = useCallback((id)=>{
    id==toImage
      setToImage(id)
      setShowImage(true)},[toImage])
      
  const onShare = async (contractor,destination,items,receiptno,quantity,type,file) => {
        try {
          const result = await Share.share({
            title:" تفاصيل",
            message:
            `اذن مرتجع رقم ${receiptno}  \n .....
        مهام ${items}\n  من  المقاول
        ${contractor} الى ${destination} بال${type} ${quantity} ...... الرابط من هنا ${file}`
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
        


 const ItemComponents= ({contractor,destination,items,receiptno,quantity,type,file}) =>{
return(
<TouchableOpacity >

            
 <View 
style={{ paddingLeft:12,paddingRight:12, borderBottomWidth:4,borderRadius:0 ,
 }} >


<Text style={{flexDirection:"row" }} >                                                                                                                                
<Text  >رقم الاذن   : {receiptno} </Text> <Icon name='share' color="black"  iconStyle={ {justifyContent:"flex-start",marginTop:0, marginRight:Dimensions.get("window").width/1.9}}  onPress={()=>onShare(contractor,destination,items,receiptno,quantity,type,file)} /> </Text>

<Text>المقاول     {contractor}</Text>
<Text>المخزن      {destination}</Text>
<Text>المهام     {items}</Text>
<Text>الكمية     {quantity}</Text>
<Text>الوحدة     {type}</Text>


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




receiptno={e.item.receiptno} from={e.item.from}
to={e.item.to} 
// quantity={e.item.quantity}
        
file={e.item.file}    
    
quantity={e.item.quantity}

unit={e.item.unit}  items={e.item.items}/>}
keyExtractor={(e,index)=>e._id}/>
}


</SafeAreaView>  );
}
 
export default PreviewFourth;