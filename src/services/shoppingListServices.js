import { db } from "../firebase";
import moment from "moment";
// const db = firebase.ref("/tutorials");
var ref = db.collection("SL");
var favRef = db.collection("SLFAVOURITE");

class shoppingListServices {
  getAll() {
    return ref.get().then((doc) => {
      return doc.docs.map((doc) => doc.data());
    });
  }
  create(data) {
    return ref.doc(data.id).set({
      id: data.id,
      color: data.color,
      name: data.name,
      created_at: moment().format("L"),
      updated_at: "",
      items: data.items,
    });
  }
  setFav(id) {
    return favRef.doc('FAV').update({
      id: id,
    });
  }
  getFav() {
    return favRef.get().then((doc) => {
      return doc.docs.map((doc) => doc.data().id);
    });
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
