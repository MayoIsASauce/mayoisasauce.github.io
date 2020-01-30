// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAXwymLfWdI7b5QygUugtXU-6ZIx_wDJd8",
    authDomain: "integrated-services-1996.firebaseapp.com",
    databaseURL: "https://integrated-services-1996.firebaseio.com",
    projectId: "integrated-services-1996",
    storageBucket: "integrated-services-1996.appspot.com",
    messagingSenderId: "235339311505",
    appId: "1:235339311505:web:03a02addb767650fa59230",
    measurementId: "G-2CZW1GQ76H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

var param = new URLSearchParams(window.location.search);
var data = param.get('code');
var state = param.get('state');

var dbs = db.collection('auths').doc(state);

dbs.get().then((doc) => {
    if (!doc.exists) {
        creation();
    } else {
        dbs.delete();
        creation();
    }
}).catch((err) => {
    console.error(err);
});

function creation() {
    if (data != null && state != null) {
        dbs.set({
            auth: data
        }).then(() => {
            console.log("Successfully logged you may now close this window.");
            document.getElementById("display").innerHTML = "Success You May Now Close This Window.";
        }).catch((err) => {
            console.log(err);
        });
    } else {
        console.log("bad url");
        document.getElementById("display").innerHTML = "Error 404 page not found";
    }
}