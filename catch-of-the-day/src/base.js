import Rebase from 're-base';
import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBYP8yBrFfJF5jpT0GinjbBjy6nTIpHn2g",
    authDomain: "catch-of-the-day-anushree.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-anushree.firebaseio.com",
  })

const base =Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;