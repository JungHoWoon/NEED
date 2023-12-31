import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
} from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GithubAuthProvider();
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

export async function addNewProduct(product, image) {
  const id = uuidv4();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    image,
    price: parseInt(product.price),
    option: product.option.split(','),
  });
}

export async function getProducts() {
  return get(ref(database, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const itmes = snapshot.val();
      return Object.values(itmes);
    }
    return {};
  });
}

export async function addOrUpdateCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
