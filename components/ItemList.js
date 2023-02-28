import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { Button, IconButton, Icon } from "@react-native-material/core";
import { useState } from 'react';




const ItemList = ({id, title, isSelected, isChecked, onPressItem, onPressChecked}) => {

    return (
        <TouchableOpacity
            style={[styles.container, isSelected && styles.selectedContainer]}  
            onPress={onPressItem}
        >
            <View style={styles.titleContainer}>
                <Text style={[styles.title, isSelected && styles.selectedTitle]}> {title} </Text>
            </View>

            <View style={[styles.buttonsContaner]}>
                <View style={{ flexDirection:'row'}}>
                    <IconButton
                        style={[styles.iconButton]}
                        icon={()=><Icon name="pencil" size={32} color={'#6e3b6e'}/>}
                        disabled={!isSelected}
                    />
                    <IconButton
                        style={[styles.iconButton]}
                        icon={()=><Icon name="delete" size={32} color={'#6e3b6e'}/>}
                        disabled={!isSelected}
                    />
                    <IconButton
                        style={[styles.iconButton]}
                        icon={()=>(
                            <Icon
                                name={isChecked ? 'checkbox-marked-circle' : 'circle'} 
                                size={32} 
                                color={isSelected ? '#6e3b6e' : 'white'}
                            />
                        )}
                        onPress={(id)=>{onPressChecked(id)}}
                    />
                </View>


            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container:{
    borderWidth:1,
    borderRadius:8,
    borderColor:'#6e3b6e',
    backgroundColor:'#6e3b6e',
    marginHorizontal:5,
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  titleContainer:{
    width: '55%',
  },
  buttonsContaner:{ 
    width: '40%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginRight:30,
  },
  iconButton:{

  },
  title:{
    color:'white',
    padding:20,
    fontSize: 16,
    fontWeight:'800',
  },
  selectedTitle:{
    color:'#6e3b6e',
  },
  selectedContainer: {
    backgroundColor: 'white',
    borderColor: '#6e3b6e',
  },


})


export default ItemList