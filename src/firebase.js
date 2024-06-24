import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyB3JCpHEmQcz_qt53bT-cAwGvcE63KKStw",
  authDomain: "vibe-zone-3027c.firebaseapp.com",
  projectId: "vibe-zone-3027c",
  storageBucket: "vibe-zone-3027c.appspot.com",
  messagingSenderId: "310837187184",
  appId: "1:310837187184:web:a128bffc74f6b72e195ab5",
  measurementId: "G-VG8CXCYY7J"
};

console.log('*** Environment ***', process.env.REACT_APP_ENV)
console.log('*** Firebase Config ***', firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-push-notification-scope',
        });
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker()
    .then((serviceWorkerRegistration) =>
      getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY, serviceWorkerRegistration }));

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
