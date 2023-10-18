import React, {useState, useEffect} from 'react';
import {View, Text, Button, Image} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const PhotoScreen = () => {
  const [photoURI, setPhotoURI] = useState(null);
  const [imageUris, setImageUris] = useState([]);

  useEffect(() => {
    // Load the photo from Firestore storage when the screen loads
    loadPhotoFromFirestore();
  }, []);

  const loadPhotoFromFirestore = async () => {
    try {
      const reference = storage().ref('photos/myphoto.jpg');
      const url = await reference.getDownloadURL();
      setPhotoURI(url);
    } catch (error) {
      console.error('Error loading photo from Firestore:', error);
      // Handle the error gracefully, e.g., display a placeholder image or show an error message.
    }
  };

  const selectImages = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Image picker was canceled');
      } else if (response.error) {
        console.log('Image picker error:', response.error);
      } else {
        const path = response.assets[0].uri; // Set 'path' to the URI from the response

        console.log('imagurl', path);

        uploadPhotoToFirestore(path);
      }
    });
  };

  const uploadImageToFirebase = async uri => {
    const reference = storage().ref(`images/${new Date().getTime()}.jpg`);

    try {
      await reference.putFile(uri);
      const url = await reference.getDownloadURL();
      setImageUris(prevImageUris => [...prevImageUris, url]);
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA);
      console.log();
      if (cameraPermission !== RESULTS.GRANTED) {
        const granted = await request(PERMISSIONS.ANDROID.CAMERA);
        if (granted !== RESULTS.GRANTED) {
          console.error('Camera permission not granted.');
          return;
        }
      }

      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      console.log('imag', image.path);
      // Upload the captured photo to Firestore storage
      uploadPhotoToFirestore(image.path);
    } catch (error) {
      console.error('Camera capture error:', error);
    }
  };

  const uploadPhotoToFirestore = async uri => {
    // Upload the selected photo to Firestore storage
    console.log('insid', uri);
    try {
      const reference = storage().ref('photos/myphoto.jpg'); // Replace with your storage path
      const task = reference.putFile(uri);

      // Listen for state changes, errors, and completion of the upload.
      task.on(
        'state_changed',
        taskSnapshot => {
          // Handle upload progress, if needed.
        },
        error => {
          console.error('Error uploading photo:', error);
        },
        () => {
          // Upload is complete, get the download URL and store it in Firestore.
          task.snapshot.ref.getDownloadURL().then(downloadURL => {
            firestore()
              .collection('uploadedPhotos')
              .add({url: downloadURL, createdAt: new Date()});

            // Reload the photo to display the newly uploaded image
            loadPhotoFromFirestore();
          });
        },
      );
    } catch (error) {
      console.error('Error uploading photo to Firestore:', error);
    }
  };

  return (
    <>
      <View>
        <Text>Photo Upload and View</Text>
        {photoURI && (
          <Image source={{uri: photoURI, width: 200, height: 200}} />
        )}
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={{marginBottom: 25}}>
          <Button title="Select Images" onPress={selectImages} />
        </View>
        <Button title="Take Photo" onPress={handleCameraCapture} />
      </View>
    </>
  );
};

export default PhotoScreen;
