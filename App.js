import { useState, useRef } from 'react'
import { StyleSheet, FlatList, Text, View , Modal, TextInput} from 'react-native';
import uuid from 'uuid-random'
import ItemList from './components/ItemList' 
import { IconComponentProvider, Icon, IconButton } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ConfirmModal from './components/ConfirmModal';


export default function App() {

  const [items, setItems]=useState([])
  const [newItemTitle, setNewItemTitle] = useState('')
  const [renderList, setRenderList] = useState(false)
  const [modalParams, setModalParams]=useState({
    visible: false,
    action:'',
    actionValue:'',
    title: '',
    message: '',
  })
  const [disabledUI, setDisabledUI] = useState(false)
  const inputRef = useRef(null)


  const addNewItem = () => {
    setItems([ ...items, {
      id: uuid(),
      title: newItemTitle,
      isSelected: false,
      isChecked: false,
      isDisabled: false,
      editActive: false,
    }])
    setNewItemTitle('')
  }

  const updateItems = (newItems) => {
    setItems(newItems)
    setRenderList(prevState => !prevState)
  }

  const clearItems = () => {
    setModalParams({
      visible:true,
      action: 'empty',
      actionValue: '',
      title:'¿Borrar todos los elementos?',
      message:'Este cambio no se podrá deshacer.'
    })
  }

  const getSelectedItemId = () => {
    return items.filter(item => item.isSelected === true).length > 0
      ? items.filter(item => item.isSelected === true)[0].id
      : undefined
  }

  const checkItem = (itemId) => {
    const newItems = items.reduce((acc, curr)=>{
      if (curr.id === itemId){
        curr.isChecked = !curr.isChecked
      }
      acc.push(curr)
      return acc
    }, [])
    updateItems(newItems)
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
    updateItems(newItems)
  }

  const enableItems = () => {
    let newItems = []
    items.map((item)=> {
      item.editActive = false
      item.isDisabled = false
      newItems.push(item)
    })
    setDisabledUI(false)
    updateItems(newItems)
  }

  const renderItemList = ({item}) => {
      return (
        <ItemList 
          id={item.id}
          title={item.title} 
          isDisabled={item.isDisabled}
          isEditActive={item.editActive}
          isSelected={item.isSelected} 
          isChecked={item.isChecked}
          onPressItem={()=>selectItem(item.id)} 
          onPressChecked={()=>checkItem(item.id)}
          onConfirmEdit={(editedTitle)=>{
            setModalParams({
              visible:true,
              action: 'edit',
              actionValue: editedTitle,
              title:'¿Guardar cambios?',
              message:'Cancelar para anular la edición.'
            })
          }}
          onCancelEdit={()=>{
            enableItems()
          }}
          onPressEdit={()=>{
            const selectedItemId = getSelectedItemId()
            let newItems = []
            items.map((item)=> {
              if (item.id !== selectedItemId){
                item.isDisabled = true
                item.editActive = false
              }else{
                item.isDisabled = false
                item.editActive = true
              }
              newItems.push(item)
            })
            setDisabledUI(true)
            updateItems(newItems)
          }}
          onPressDelete={()=>{
            setModalParams({
              visible: true,
              action: 'delete',
              title: '¿Borrar?',
              message: 'Perderá este item.'
            })
          }}
        />
      )
  }

  const handleModalOnConfirm = (action, actionValue) => {
    const selectedItemId = getSelectedItemId()
    let newItems = []
    switch (action){
      case 'delete':
        newItems = items.filter(item=> item.id !== selectedItemId)
        break;
      case 'edit':
        items.map((item)=>{
          if (item.id === selectedItemId){
            item.title = actionValue
          }
          newItems.push(item)
        })
        enableItems()
        break;
      case 'empty':
        newItems = []
        break;
      default:
        break;
    }
    updateItems(newItems)
  }

  const disabledAddButton = disabledUI || newItemTitle.length === 0
  const disabledEmptyButton = disabledUI || items.length === 0

  return (

    <IconComponentProvider IconComponent={MaterialCommunityIcons}>

        <View style={styles.container}>

          <ConfirmModal
            title={modalParams.title}
            action={modalParams.action}
            actionValue={modalParams.actionValue}
            message={modalParams.message}
            visible={modalParams.visible} 
            onConfirm={(action, actionValue)=>handleModalOnConfirm(action, actionValue)}
            onCancel={(action)=>{
              console.log('action ', action)
              if (action === 'cancel_edit') enableItems()
              setModalParams({visible:false})
            }}
          />

          <View
            style={styles.inputContainer}
          >
            <TextInput
              ref={inputRef}
              editable={!disabledUI}
              style={[styles.textInput, disabledUI && styles.disabledTextInput ]}
              placeholder={'Ingrese item'}
              onChangeText={(val)=>setNewItemTitle(val)}
              value={newItemTitle}
              onSubmitEditing={()=>{
                addNewItem()
              }}
            />

            <View style={styles.buttonsContainer}>
              <IconButton
                disabled={disabledAddButton}
                style={[styles.button, disabledAddButton && styles.disabledButton]}
                onPress={addNewItem}
                icon={props=><Icon name="plus" size={32} color={'white'}/>}
              />
              <IconButton
                disabled={disabledEmptyButton}
                style={[styles.button, disabledEmptyButton && styles.disabledButton]}
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
    width: 40,
    backgroundColor: '#6e3b6e',
    height:40,
  },
  disabledButton:{
    backgroundColor:'#b0a1b0',
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
    backgroundColor:'transparent',
    borderRadius:8,
    padding:10,
    width:'65%',
  },
  disabledTextInput:{
    backgroundColor:'#b0a1b0',
  },
  flatListContainer:{
    width: '100%', 
    top:20,
  }
});
