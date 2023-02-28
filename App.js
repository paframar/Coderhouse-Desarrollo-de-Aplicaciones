import { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Text, View , Modal, TextInput} from 'react-native';
import uuid from 'uuid-random'
import ItemList from './components/ItemList' 
import { IconComponentProvider, Icon, IconButton } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


export default function App() {

  const [items, setItems]=useState([])
  const [newItemTitle, setNewItemTitle] = useState('')
  const [renderList, setRenderList] = useState(false)

  const addNewItem = () => {
    setItems([ ...items, {
      id: uuid(),
      title: newItemTitle,
      isSelected: false,
      isChecked: false,
    }])
    setNewItemTitle('')
  }

  const clearItems = () => { 
    setItems([]);
  }

  const checkItem = (itemId) => {
    const newItems = items.reduce((acc, curr)=>{
      if (curr.id === itemId){
        curr.isChecked = !curr.isChecked
      }
      acc.push(curr)
      return acc
    }, [])
    setItems(newItems)
    setRenderList(!renderList)
  }

  const selectItem = (itemId) => {
    const newItems = items.reduce((acc, curr)=>{
      if (curr.id === itemId){
        curr.isSelected = true
      }else{
        curr.isSelected = false
      }
      acc.push(curr)
      return acc
    }, [])
    setItems(newItems)
    setRenderList(!renderList)
  }

  const renderItemList = ({item}) => {
      return (
        <ItemList 
          id={item.id}
          title={item.title} 
          isSelected={item.isSelected} 
          isChecked={item.isChecked}
          onPressItem={()=>selectItem(item.id)} 
          onPressChecked={()=>checkItem(item.id)} 
        />
      )
  }

  return (

    <IconComponentProvider IconComponent={MaterialCommunityIcons}>


        <View style={styles.container}>

          <View
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.textInput}
              placeholder={'Ingrese item'}
              onChangeText={(val)=>setNewItemTitle(val)}
              value={newItemTitle}
            />

            <View style={styles.buttonsContainer}>

              <IconButton
                style={styles.button}
                onPress={addNewItem}
                icon={props=><Icon name="plus" size={32} color={'white'}/>}
                />
              <IconButton
                style={styles.button}
                onPress={clearItems}
                icon={props=><Icon name="delete-empty" size={32} color={'white'}/>}
                />
              
            </View>
            

          </View>

          <View style={styles.flatListContainer}>
            <FlatList
              data={items}
              renderItem={renderItemList}
              keyExtractor={(item)=>item.id}
              extraData={renderList}
            />
          </View>
          
        </View>

    </IconComponentProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems:'center',
    padding:20,
  },
  inputContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    top:20,
  },
  button:{
    width: 60,
    backgroundColor: '#6e3b6e',
    height:40,
  },
  buttonsContainer:{
    width:'35%',
    flexDirection:'row',
    justifyContent:'space-around',
  },
  textInput:{
    fontSize: 24,
    borderColor:'grey',
    borderBottomWidth: 4,
    padding:10,
    width:'65%',
  },
  flatListContainer:{
    width: '100%', 
    top:20,
  }
});
