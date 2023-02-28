import { StyleSheet, Text, View , Modal} from 'react-native';
import { Button, IconButton, Icon } from "@react-native-material/core";

const ConfirmModal = ({title, message, action, visible, onConfirm, onCancel, actionValue}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.contentContainer}>
                    <View style={styles.textsContainer}>
                        <Text style={styles.title}> {title} </Text>
                        <Text style={styles.message}> {message} </Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        { action === 'edit'&& <IconButton
                            style={[styles.iconButton]}
                            icon={()=><Icon name="arrow-left" size={32} color={'#6e3b6e'}/>}
                            onPress={()=>{
                                onCancel()
                            }}
                        />
                        }
                        <IconButton
                            style={[styles.iconButton]}
                            icon={()=><Icon name="check" size={32} color={'#6e3b6e'}/>}
                            onPress={()=>{
                                onConfirm(action, actionValue)
                                onCancel()
                            }}
                        />
                        <IconButton
                            style={[styles.iconButton]}
                            icon={()=><Icon name="cancel" size={32} color={'#6e3b6e'}/>}
                            onPress={()=>{
                                if (action === 'edit'){
                                    onCancel('cancel_edit')
                                }else{
                                    onCancel()
                                }
                            }}
                        />
                    </View>
                </View>
            </View> 
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    contentContainer:{
        borderWidth: 3,
        borderColor: '#6e3b6e',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: '20%',
        backgroundColor:'white',
    },
    textsContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },  
    buttonsContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        height:'40%',
        width: '100%'
    },
    title:{
        fontSize: 22,
        fontWeight: '600',
        textAlign:'center',
        padding:12,
    },
    message:{

    },
})

export default ConfirmModal
