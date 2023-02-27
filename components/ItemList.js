import { StyleSheet, Text, View , Modal, Button, TouchableOpacity} from 'react-native';

const ItemList = ({title, isSelected, onPress}) => {
  return (
    <TouchableOpacity
        style={[styles.container, isSelected && styles.selectedContainer]}  
        onPress={onPress}
    >
        <View>
            <Text style={[styles.text, isSelected && styles.selectedText]}> {title} </Text>
        </View>

        <View style={[styles.buttonsContaner]}>
            <Button
                title={'Edit'}
                style={styles.button}
            />
            <Button
                title={'Delete'}
                style={styles.button}
            />
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
    margin:5,
    flexDirection:'row',
    justifyContent:'space-around',
  },
  buttonsContaner:{ 
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  button:{
    marginLeft:10,
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
  },


})


export default ItemList