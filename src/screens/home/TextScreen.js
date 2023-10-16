import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function TextScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Set up a Firestore listener for real-time updates
    const unsubscribe = firestore()
      .collection('messages')
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot) {
          // Handle the case when querySnapshot is null
          return;
        }
        const updatedMessages = [];
        querySnapshot.forEach((doc) => {
          updatedMessages.push({ id: doc.id, text: doc.data().text });
        });
        setMessages(updatedMessages);
      });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    try {
      // Add the user's message to Firestore
      await firestore()
        .collection('messages')
        .add({
          text: message,
        });
      // Clear the input field
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Write your message..."
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="Send" onPress={sendMessage} />

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
}

export default TextScreen;
