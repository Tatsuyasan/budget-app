import User from '@/models/User';
import { currentUser } from '@/store';
import { userConverter } from '@/services/utils/userConverter';
import firebase from 'firebase/app';

export const addUser = async (user: firebase.auth.UserCredential) => {
  if (user.user) {
    let userNames;
    if (user.user.displayName) {
      userNames = user.user.displayName.split(' ');
    }

    currentUser.value = new User(
      user.user.uid,
      userNames && userNames.length > 0 ? userNames[0] : '',
      userNames && userNames.length > 1 ? userNames[1] : ''
    );

    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(user.user?.uid);
    await userRef
      .withConverter(userConverter)
      .set(currentUser.value, { merge: true });
    return currentUser.value;
  }
};

export const getUserData = async (): Promise<User | null> => {
  const resp = await firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser?.uid)
    .withConverter(userConverter)
    .get();

  if (resp.exists) {
    return resp.data() as User;
  } else {
    return null;
  }
};

export const updateUser = async (user: User) => {
  const userRef = firebase
    .firestore()
    .collection('users')
    .doc(user.id);
  return userRef
    .withConverter(userConverter)
    .set(user, { merge: true })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};
