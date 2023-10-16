import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY_COLOR } from '../utils/Colors';
import { FONT_FAMILY_BOLD } from '../utils/Fontfamily';

export default function HeaderBackButton(props) {

  return (
    <TouchableOpacity style={styles.rowalign} onPress={() => props.goBack()}>
        <Icon name="chevron-left" size={40} color={PRIMARY_COLOR}/>
        <Text style={styles.text}>Go Back</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    rowalign: {
        flexDirection:'row',
        alignItems:'center'
    },
    text: {
        color: PRIMARY_COLOR,
        fontSize: 18,
        fontFamily:FONT_FAMILY_BOLD
    }
})