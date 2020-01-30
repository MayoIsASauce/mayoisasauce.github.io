let creds = require('.\\integrated-services-1996-firebase-adminsdk-crbf4-4ed5fef55a');
const admin = require('firebase-admin');
const colors = require('colors');

admin.initializeApp({
    credential: admin.credential.cert(creds)
});
var data = {
    state: 'callback_state',
    oAuth: 'auth_query'
};

let db = admin.firestore();

let docm = db.collection('auths').doc(data.state);
let Content = docm.get().then((docu) => {
    if (!docu.exists){
        console.log("> No previously stored key".blue);
        Creative();
    } else {
        docm.delete().then(() => {
            console.log("> Deleted old version of file".blue);
            Creative();
        }).catch(() => {
            console.log("> File Does Not Exist".red);
        });
    }
}).catch((err) =>{
    console.log('> Error trying to fetch file: '.red + `${err}`.red);
});

function Creative() {
    docm.create({
        oAuth: data.oAuth
    }).then((res) => {
        console.log('> Successfully logged data'.green);
    }).catch((err) => {
        console.log('> Couldn\'t log data: '.red + `${err}`.red);
    });
};