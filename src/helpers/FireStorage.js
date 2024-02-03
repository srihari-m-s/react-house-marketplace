import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

// Upload image to firebase storage
export async function storeImage(image, onSuccess) {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const storage = getStorage();

    const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

    const storageRef = ref(storage, "images/" + fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        onSuccess();
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

// Delete old image files
export async function deleteFileByDownloadUrl(downloadUrl) {
  return new Promise((resolve, reject) => {
    const storage = getStorage();

    // Convert download URL to storage reference
    const storageRef = ref(storage, downloadUrl);

    // Delete the file
    deleteObject(storageRef)
      .then(() => {
        // console.log('File deleted successfully.');
        resolve("File deleted successfully.");
      })
      .catch((error) => {
        // console.error('Error deleting file:', error.message);
        reject(`Error deleting file: ${error.message}`);
      });
  });
}
