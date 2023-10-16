import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';

const PhotoScreen = () => {
  const [filePath, setFilePath] = useState(null);

  // check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
  //   .then((result) => {
  //     switch (result) {
  //       case RESULTS.UNAVAILABLE:
  //         console.log('This feature is not available (on this device / in this context)');
  //         break;
  //       case RESULTS.DENIED:
  //         console.log('The permission has not been requested / is denied but requestable');
  //         break;
  //       case RESULTS.LIMITED:
  //         console.log('The permission is limited: some actions are possible');
  //         break;
  //       case RESULTS.GRANTED:
  //         console.log('The permission is granted');
  //         break;
  //       case RESULTS.BLOCKED:
  //         console.log('The permission is denied and not requestable anymore');
  //         break;
  //     }
  //   })
  //   .catch((error) => {
  //     // Handle any errors
  //   });
  
    const requestGalleryPermission = async () => {
      const permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      console.log("Permission status:", permissionStatus);
      
      if (permissionStatus === RESULTS.GRANTED) {
        // Permission granted, you can now use the ImagePicker
        launchImageLibrary();
      } else if (permissionStatus === RESULTS.DENIED) {
        // Permission denied, but requestable
        console.log("Requesting permission...");
        requestPermission(); // Request the permission
      } else {
        // Handle other cases like RESULTS.LIMITED and RESULTS.BLOCKED
        console.log("Permission denied or not requestable");
      }
    };
    
    const requestPermission = async () => {
      try {
        const permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        console.log("Permission status after requesting:", permissionStatus);
        
        if (permissionStatus === RESULTS.GRANTED) {
          // Permission granted, you can now use the ImagePicker
          launchImageLibrary();
        } else {
          // Permission is still denied; you can show a message to the user or handle this case accordingly
          console.log("Gallery permission denied");
        }
      } catch (error) {
        console.error("Error while requesting permission:", error);
      }
    };
    

  const launchImageLibrary = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setFilePath(response);
      }
    });
  };

  return (
    <View>
      <Text>Image Picker Example</Text>
      <Button title="Request Gallery Permission" onPress={requestGalleryPermission} />
      {filePath && (
        <View>
          <Image
            source={{ uri: filePath.uri }}
            style={{ width: 200, height: 200 }}
          />
          <Text>File Name: {filePath.fileName}</Text>
          <Text>File Size: {filePath.fileSize} bytes</Text>
        </View>
      )}
    </View>
  );
};

export default PhotoScreen;
