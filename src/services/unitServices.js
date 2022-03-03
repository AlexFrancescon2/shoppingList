import { db } from "../firebase";
var ref = db.collection("Units");

class UnitServices {
  getAll() {
    return ref.get().then((doc) => {
      return doc.docs.map((doc) => doc.data());
    });
  }
  create(data) {
    return ref.doc(data.id).set({
      id: data.id,
      value: data.value,
      type: data.type,
    });
  }
  update(data) {
    console.log('UPDATE', data)
    return ref.doc(data.id).update({
      value: data.value,
      type: data.type,
    });
  }
  delete(id) {
    return ref.doc(id).delete();
  }
  deleteAll() {
    return db.remove();
  }
}
export default new UnitServices();
