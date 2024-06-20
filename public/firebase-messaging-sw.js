importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyB3JCpHEmQcz_qt53bT-cAwGvcE63KKStw",
  authDomain: "vibe-zone-3027c.firebaseapp.com",
  projectId: "vibe-zone-3027c",
  storageBucket: "vibe-zone-3027c.appspot.com",
  messagingSenderId: "310837187184",
  appId: "1:310837187184:web:a128bffc74f6b72e195ab5",
  measurementId: "G-VG8CXCYY7J"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
