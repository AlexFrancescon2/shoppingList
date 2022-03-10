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
  getById(id) {
    return ref.get().then((doc) => {
      return doc.docs
        .map((doc) => doc.data())
        .filter((element) => element.id === id)[0];
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
    return favRef.doc("FAV").update({
      id: id,
    });
  }
  unsetFav() {
    return favRef.doc("FAV").update({
      id: "",
    });
  }
  getFav() {
    return favRef.get().then((doc) => {
      return doc.docs.map((doc) => doc.data().id);
    });
  }
  update(data) {
    return ref.doc(data.id).update(data);
  }
  updateItemAmount(data) {
    var index;
    return this.getById(data.id).then((result) => {
      // Get index of the item we want to update
      index = result.items
        .map(function (e) {
          return e.id;
        })
        .indexOf(data.itemId);
      let items = result.items;
      items[index].amount =
        data.operation === "+"
          ? items[index].amount + 1
          : items[index].amount - 1;

      return ref.doc(data.id).update({
        items: items,
      });
    });
    // Get index of the item we want to update
    // var index = data.items.map(function(e) { return e.id; }).indexOf(data.itemId);
    // console.log(index);
    // var usersUpdate = data.items;
    // usersUpdate[`item.${data.id}.color`] = true;

    // db.collection("users").doc("frank").update(usersUpdate);
    // return ref.doc(data.id).update(data);
  }
  delete(id) {
    return ref.doc(id).delete();
  }
  deleteAll() {
    return db.remove();
  }
}
export default new shoppingListServices();
