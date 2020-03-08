const fs = require('fs');

class WebinarsController {
  constructor(pathToStore) {
    this.path = pathToStore;
  }

  getWebinars() {
    return JSON.parse(fs.readFileSync(this.path));
  }

  updateWebinars(entry, cb) {
    const currentList = this.getWebinars();
    const adaptedEntry = {id: currentList.length + 1, ...entry};
    const updatedList = [adaptedEntry, ...currentList];

    fs.writeFile(this.path, JSON.stringify(updatedList, null, 2), (err) => {
      if (err) throw err;
      cb(adaptedEntry);
    });
  }
}

module.exports = WebinarsController;
