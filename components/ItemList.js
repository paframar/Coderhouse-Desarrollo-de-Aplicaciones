import { StyleSheet, Text, View , Modal, Button, TouchableOpacity} from 'react-native';

const ItemList = ({title, isSelected, onPress}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
    >
        <View style={[styles.container, isSelected && styles.selectedContainer]}>
            <Text style={[styles.text, isSelected && styles.selectedText]}> {title} </Text>
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
  },
  text:{
    color:'white',
    padding:20,
    fontSize: 18,
  },
  selectedText:{
    color:'#6e3b6e',
  },
  selected: {
    backgroundColor: '#fff',
    borderColor: 'blue',
  },
  selectedContainer: {
    backgroundColor: 'white',
    borderColor: '#6e3b6e',
  }

})


export default ItemList