import { StyleSheet, Text, View , TouchableOpacity, TextInput} from 'react-native';
import { IconButton, Icon } from "@react-native-material/core";
import { useState, useRef } from 'react';

const ItemList = ({id, title, isSelected, isChecked, onPressItem, onPressChecked, onPressDelete, onPressEdit, isDisabled, isEditActive, onConfirmEdit, onCancelEdit}) => {

    const [editedTitle, setEditedTitle] = useState(title)
    const inputRef = useRef()

    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={[styles.container, isSelected && styles.selectedContainer, isDisabled && styles.disabledContainer]}  
            onPress={onPressItem}
        >
            <View style={styles.titleContainer}>
                {isEditActive 
                  ? <TextInput 
                      ref={inputRef}
                      onFocus={(val)=>{inputRef.current.setSelection(0, editedTitle.length)}}
                      autoFocus={true}
                      style={[styles.title, isSelected && styles.selectedTitle]}
                      value={editedTitle}
                      onChangeText={(val)=> setEditedTitle(val)}
                      onSubmitEditing={()=>onConfirmEdit(editedTitle)}
                    />
                  : <Text style={[styles.title, isSelected && styles.selectedTitle, isDisabled && styles.disabledTitle]}> {title} </Text>
                }
            </View>

            <View style={[styles.buttonsContaner]}>
                <View style={{ flexDirection:'row'}}>
                    {isEditActive
                      ? <View style={{ flexDirection:'row'}}>
                          <IconButton
                              style={[styles.iconButton]}
                              icon={()=><Icon name="check" size={32} color={'#6e3b6e'}/>}
                              onPress={()=>{onConfirmEdit(editedTitle)}}
                          />
                          <IconButton
                              style={[styles.iconButton]}
                              icon={()=><Icon name="cancel" size={32} color={'#6e3b6e'}/>}
                              onPress={onCancelEdit}
                          />
                        </View>
                      : <View style={{ flexDirection:'row'}}>
                          <IconButton
                              style={[styles.iconButton]}
                              icon={()=><Icon name="pencil" size={32} color={isDisabled ? '#8e5d8e': (isSelected ? '#6e3b6e' : 'white')}/>}
                              disabled={!isSelected}
                              onPress={(id)=>{
                                setEditedTitle(title)
                                onPressEdit(id)
                              }}
                          />
                          <IconButton
                              style={[styles.iconButton]}
                              icon={()=><Icon name="delete" size={32} color={isDisabled ? '#8e5d8e': (isSelected ? '#6e3b6e' : 'white')}/>}
                              disabled={!isSelected}
                              onPress={(id)=>{onPressDelete(id)}}
                          />
                        </View> 
                      }
                      <IconButton
                          disabled={isEditActive || isDisabled}
                          style={[styles.iconButton]}
                          icon={()=>(
                              <Icon
                                  name={isChecked ? 'checkbox-marked-circle' : 'circle'} 
                                  size={32} 
                                  color={
                                    isEditActive 
                                      ? '#b0a1b0'
                                      : (
                                        isSelected
                                          ? '#6e3b6e'
                                          : (isDisabled ? '#8e5d8e': 'white')
                                      )
                                  }
                                      // '#b0a1b0'
                                      // '#6e3b6e'
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
  disabledContainer: {
    backgroundColor: '#b0a1b0',
    borderColor: '#6e3b6e',
  },
  disabledTitle:{
    color:'#8e5d8e',
  },


})


export default ItemList