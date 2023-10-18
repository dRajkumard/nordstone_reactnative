import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { FONT_FAMILY_MEDIUM } from '../../common/utils/Fontfamily';
import { LIGHT_GRAY, PRIMARY_COLOR } from '../../common/utils/Colors';

const CalculatorScreen = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('+');
  const [result, setResult] = useState('');
  const [selected, setSelected] = useState('');
  const operators = ['Addition', 'Subtraction', 'Multiplication'];

  const calculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult('Please enter valid numbers.');
    } else {
      let calculatedResult;

      switch (selectedOperator) {
        case 'Addition':
          calculatedResult = n1 + n2;
          break;
        case 'Subtraction':
          calculatedResult = n1 - n2;
          break;
        case 'Multiplication':
          calculatedResult = n1 * n2;
          break;
        default:
          setResult('Invalid operator');
      }

      setResult(`Result: ${calculatedResult}`);
    }
  };

  return (
    <View>
      <Text>Calculator</Text>
      <TextInput
      style={styles.input}
        placeholder="Enter number 1"
        value={num1}
        onChangeText={(text) => setNum1(text)}
        keyboardType="numeric"
      />
      <TextInput
      style={styles.input}
        placeholder="Enter number 2"
        value={num2}
        onChangeText={(text) => setNum2(text)}
        keyboardType="numeric"
      />
      <SelectList
        setSelected={(val) => setSelectedOperator(val)}
        data={operators}
        boxStyles={styles.dropdownContainer}
        inputStyles={styles.dropdownLabel}
      />

      <Button title="Calculate" onPress={calculate} />
      {result && <Text>{result}</Text>}
    </View>
  );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: LIGHT_GRAY,
    borderWidth: 0,
    borderRadius: 25,
  },
  dropdownLabel: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 15,
  },
 
    container: {
      flex: 1,
      padding: 16,
    },
    input: {
      height: 100, // Set your desired height here
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
    },

});
