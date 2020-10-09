var dbPromised = idb.open("football-scorer", 1, function (upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("competitions", {
        keyPath: "ID"
    });
    articlesObjectStore.createIndex("post_name", "post_name", { unique: false });
});

function saveForLater(competition) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("competitions", "readwrite");
            var store = tx.objectStore("competitions");
            console.log(competition);
            store.add(competition.result);
            return tx.complete;
        })
        .then(function () {
            console.log("Competition berhasil di simpan.");
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("competitions", "readonly");
                var store = tx.objectStore("competitions");
                return store.getAll();
            })
            .then(function (competitions) {
                resolve(competitions);
            });
    });
}
// function getById(id) {
//     return new Promise(function (resolve, reject) {
//         dbPromised
//             .then(function (db) {
//                 var tx = db.transaction("competitions", "readonly");
//                 var store = tx.objectStore("competitions");
//                 return store.get(id);
//             })
//             .then(function (competitions) {
//                 resolve(competitions);
//             });
//     });
// }