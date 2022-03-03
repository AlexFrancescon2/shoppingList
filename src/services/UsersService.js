
import { db } from '../firebase';
// const db = firebase.ref("/tutorials");
const users = db.collection('users');
users.get().then((doc) => {
    console.log('data!!', doc.docs.map(doc => doc.data()));
});
const docs = users.doc('hKEcHr4VVBvjETd3d4Qf');

docs.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});


class shoppingListServices {
  getAll() {
    return db;
  }
//   create(tutorial) {
//     return db.push(tutorial);
//   }
//   update(key, value) {
//     return db.child(key).update(value);
//   }
//   delete(key) {
//     return db.child(key).remove();
//   }
//   deleteAll() {
//     return db.remove();
//   }
}
export default new shoppingListServices();
