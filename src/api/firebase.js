import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

provider.setCustomParameters({
  prompt: 'select_account',
});

export function login() {
  signInWithPopup(auth, provider).catch((error) => alert('에러 발생!'));
}

export function logout() {
  signOut(auth).catch((error) => alert('에러 발생!'));
}

export function onUserStateChange(cb) {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await isAdminUser(user) : user;
    cb(updateUser);
  });
}

async function isAdminUser(user) {
  return get(ref(database, 'admins')).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}
