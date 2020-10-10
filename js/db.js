const dbPromised = idb.open("football-scorer", 1, upgradeDb => {
    const articlesObjectStore = upgradeDb.createObjectStore("competitions", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("post_name", "post_name", { unique: false });
});

const getYourData = () => {
    dbPromised
        .then(db => {
            const tx = db.transaction("competitions", "readwrite");
            const store = tx.objectStore("competitions");
            console.log(competition);
            store.add(competition.result);
            return tx.complete;
        })
        .then( () => {
            console.log("Competition berhasil di simpan.");
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(db => {
                const tx = db.transaction("competitions", "readonly");
                const store = tx.objectStore("competitions");
                return store.getAll();
            })
            .then(function (competitions) {
                resolve(competitions);
            });
    });
}

function getClubByid(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("competitions", "readonly");
                var store = tx.objectStore("competitions");
                return store.get(id);
            })
            .then(function (competitions) {
                resolve(competitions);
            });
    });
}