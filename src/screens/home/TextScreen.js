import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList,StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function TextScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .onSnapshot(
        (querySnapshot) => {
          const updatedMessages = [];
          querySnapshot.forEach((doc) => {
            updatedMessages.push({ id: doc.id, text: doc.data().text });
          });
          setMessages(updatedMessages);
        },
        (err) => {
          setError(err);a
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    try {
      await firestore()
        .collection('messages')
        .add({
          text: message,
        });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error);
    }
  };

  return (
    <View>
      <TextInput
      style={styles.input}
        placeholder="Write your message..."
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="Send" onPress={sendMessage} />

      {error && <Text>Error: {error.message}</Text>}

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
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

export default TextScreen;
