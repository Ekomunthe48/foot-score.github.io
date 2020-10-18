import { openDB } from 'idb'

const dbPromise = openDB("football-scorer", 1, {
    upgrade(upgradeDb) {
        upgradeDb.createObjectStore("clubs", { keyPath: "id"
        });
    } 
});
