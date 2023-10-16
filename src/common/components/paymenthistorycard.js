import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../utils/Colors';
import {FONT_FAMILY_MEDIUM} from '../utils/Fontfamily';

export default function PaymentHistoryCard(props) {
  const paymenthistory = props.data.item;
  console.log('ex', paymenthistory);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation()}>
      <View style={styles.containerfluid}>
        <View
          style={{
            width: '50%',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 5,
          }}>
          <Text style={styles.category}>{paymenthistory.type}</Text>
          <Text style={styles.duedate}>Due Date - 30/06/2017</Text>
        </View>
        <View style={{width: '35%', flexDirection: 'row'}}>
          <View
            style={{width: '50%', paddingLeft: 4, justifyContent: 'center'}}>
            <View style={styles.rowAlign}>
              <FontAwesome name="rupee" size={10} style={styles.rupeeicon} />
              <Text style={[styles.text,{color: 'green',fontWeight:'bold'}]}>40,000</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    marginTop: '5%',
  },
  containerfluid: {
    flexDirection: 'row',
    marginTop: '10%',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  iconcontainer: {
    backgroundColor: PRIMARY_COLOR,
    width: 45,
    height: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#fff',
    paddingBottom: 3,
  },
  category: {
    fontSize: 15,
    fontFamily: FONT_FAMILY_MEDIUM,
  },
  duedate: {
    fontSize: 10,
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingTop: 3,
  },
  text: {
    fontSize: 10,
    fontFamily: FONT_FAMILY_MEDIUM,
  },
  rowAlign: {
    flexDirection: 'row',
  },
  rupeeicon: {
    paddingTop: 3,
    paddingRight: 2,
  },
});
