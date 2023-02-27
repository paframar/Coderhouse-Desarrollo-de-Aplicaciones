import { useState } from 'react'
import { StyleSheet, FlatList, Text, View , Modal, Button, TextInput} from 'react-native';
import uuid from 'uuid-random'
import ItemList from './components/ItemList' 


export default function App() {

  const [items, setItems]=useState([])
  const [itemTitle, setItemTitle] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const addNewItem = () => {
    setItems([ ...items, {
      id: uuid(),
      title: itemTitle,
    }])
    setItemTitle('')
  }

  const clearItems = () => { 
    setItems([]);
  }

  const renderItemList = ({item}) => {
      return (
        <ItemList 
          title={item.title} 
          isSelected={item.id === selectedId} 
          onPress={()=> setSelectedId(item.id)} 
        />
      )
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.textInput}
          placeholder={'Ingrese item'}
          onChangeText={(val)=>setItemTitle(val)}
          value={itemTitle}
        />
        <Button
          style={styles.button}
          title={'Add'}
          onPress={addNewItem}
        />
        <Button
          style={styles.button}
          title={'Clear'}
          onPress={clearItems}
        />

      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={items}
          renderItem={renderItemList}
          keyExtractor={(item)=>item.id}
          extraData={selectedId}
        />
      </View>
      
    </View>
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
  },
  button:{
    padding:10,
  },
  textInput:{
    fontSize: 24,
    borderColor:'grey',
    borderBottomWidth: 4,
    width: 250,
    padding:10,
  },
  flatListContainer:{
    width: '100%', 
    top:20,
  }
});
