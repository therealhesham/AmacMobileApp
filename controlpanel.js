import { StyleSheet, View } from "react-native";




function ControlPanel() {
    return ( <View>




    </View> );
}
 


export default ControlPanel;


const styles = StyleSheet.create({
    container: {
      // gap:3,
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },ImageBackground:{
      width:"300 px",
      
      height:"600 px",
      // paddingBottom:"1px"
      flexDirection: 'column',
      alignItems:"center",
      justifyContent:"flex-end",
      alignContent:"center"
      ,flex:1
    }
  ,
  TouchableOpacity:{
  color:"red",
  width:"700px"
  
  }
    
    });
  