class helpers {
  makeId(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  sortData(arr, paramName, type) {
    if (type === "date") {
      arr.sort(function (a, b) {
        var keyA = new Date(a["" + paramName + ""]),
          keyB = new Date(b["" + paramName + ""]);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    } else if (type === "string") {
      arr.sort(function (a, b) {
        if (a["" + paramName + ""] < b["" + paramName + ""]) return -1;
        if (a["" + paramName + ""] > b["" + paramName + ""]) return 1;
        return 0;
      });
    }
    return arr;
  }
  randomColor() {
    const trans = "0.85"; // 85% transparency
    const red = Math.floor(((1 + Math.random()) * 256) / 2);
    const green = Math.floor(((1 + Math.random()) * 256) / 2);
    const blue = Math.floor(((1 + Math.random()) * 256) / 2);
    return "rgb(" + red + ", " + green + ", " + blue + ", " + trans + ")";
  }
}
export default new helpers();
