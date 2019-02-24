import firebase from 'firebase';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDLK4kAuolxlZipq3fBtOilQHTWZNO8hKM',
  authDomain: 'mentor-dashboard-4027b.firebaseapp.com',
  databaseURL: 'https://mentor-dashboard-4027b.firebaseio.com',
  projectId: 'mentor-dashboard-4027b',
  storageBucket: 'mentor-dashboard-4027b.appspot.com',
  messagingSenderId: '670745073271',
};

const fire = firebase.initializeApp(config);

const provider = new firebase.auth.GithubAuthProvider();

provider.addScope('repo');

export const fb = {
  login: () => fire.auth().signInWithPopup(provider),
  logout: () => fire.auth().signOut(),
};
