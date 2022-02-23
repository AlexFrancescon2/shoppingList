import * as firebase from 'firebase/app';
// import auth from "../firebase"
// import database from "../firebase"
console.log(firebase.database());
const db = firebase.database();
class shoppingListServices {
  getAll() {
    return db;
  }
  create(tutorial) {
    return db.push(tutorial);
  }
  update(key, value) {
    return db.child(key).update(value);
  }
  delete(key) {
    return db.child(key).remove();
  }
  deleteAll() {
    return db.remove();
  }
}
export default new shoppingListServices();