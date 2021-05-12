import firebase from 'firebase/app';
import {
  cfaSignIn,
  cfaSignOut,
  SignInResult,
} from 'capacitor-firebase-auth/alternative';
import { addUser, getUserData } from '@/services/userService';
import { currentUser } from '@/store';
import User from '@/models/User';

export enum LOGIN_PROVIDER {
  GOOGLE,
}

export type LoginResult = {
  userCredentials: firebase.auth.UserCredential;
  result: SignInResult;
};

function mapLoginProvider(provider: LOGIN_PROVIDER): string {
  switch (provider) {
    case LOGIN_PROVIDER.GOOGLE:
      return 'google.com';
    default:
      return 'google.com';
  }
}

export class LoginError extends Error {
  success: boolean; // If true, the call was successful but an error still occured
  reason?: any;

  constructor(reason?: any, success?: boolean) {
    super('Login Error');
    this.success = success || false;
    this.reason = reason;
  }
}

export const login = function(provider: LOGIN_PROVIDER): Promise<LoginResult> {
  return new Promise<LoginResult>((resolve, reject) => {
    cfaSignIn(mapLoginProvider(provider))
      .toPromise()
      .then(({ userCredential, result }) => {
        getUserData().then((user: User | null) => {
          if (user) {
            currentUser.value = new User(user.id, user.firstname, user.lastname);
          } else {
            addUser(userCredential);
          }
          resolve({ userCredentials: userCredential, result });
        });
      })
      .catch((error) => {
        reject(new LoginError(error, false));
      });
  });
};

export const logout = () => {
  return new Promise<any>((resolve) => {
    cfaSignOut().subscribe();
    resolve(true);
  });
};
