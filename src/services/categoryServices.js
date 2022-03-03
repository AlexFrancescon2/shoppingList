import { db } from "../firebase";
var ref = db.collection("categories");

class CategoryServices {
  getAll() {
    return ref.get().then((doc) => {
      return doc.docs.map((doc) => doc.data());
    });
  }
  create(data) {
    return ref.doc(data.id).set({
      id: data.id,
      name: data.name,
    });
  }
  update(data) {
    return ref.doc(data.id).update({
      name: data.name,
    });
  }
  delete(id) {
    return ref.doc(id).delete();
  }
  deleteAll() {
    return db.remove();
  }
}
export default new CategoryServices();
