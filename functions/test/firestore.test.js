const assert = require("assert");
const firebase = require("@firebase/testing");

const PROJECT_ID = "demo-treasury";
const myUser = "carlton";
const theirUser = "phillip";
const myAuth = {
  uid: myUser,
  email: "carlton@torv.rocks",
};

function getFirestore(auth) {
  return firebase
    .initializeTestApp({ projectId: PROJECT_ID, auth: auth })
    .firestore();
}

function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
}

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

after(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

describe("Treasury Application", () => {
  describe("General Firestore lockdown", () => {
    it("It cannot read from any unknown document", async () => {
      const db = getFirestore(null);
      const testDoc = db.collection("testColl").doc("testDocRead");
      await firebase.assertFails(testDoc.get());
    });

    it("It cannot write to any unknown document", async () => {
      const db = getFirestore(null);
      const testDoc = db.collection("testColl").doc("testDocWrite");
      await firebase.assertFails(testDoc.set({ field1: "value1" }));
    });
  });

  describe("Firestore user collection", () => {
    it("It can read from the users document with the same ID as our user", async () => {
      const db = getFirestore(myAuth);
      const testDoc = db.collection("users").doc(myUser);
      await firebase.assertSucceeds(testDoc.get());
    });

    it("It can't read from the users document with a different ID as our user", async () => {
      const db = getFirestore(myAuth);
      const testDoc = db.collection("users").doc(theirUser);
      await firebase.assertFails(testDoc.get());
    });

    it("It can write to the users document with the same ID as our user", async () => {
      const db = getFirestore(myAuth);
      const testDoc = db.collection("users").doc(myUser);
      await firebase.assertSucceeds(testDoc.set({ field1: "value1" }));
    });

    it("It can't write to the users document with a different ID as our user", async () => {
      const db = getFirestore(myAuth);
      const testDoc = db.collection("users").doc(theirUser);
      await firebase.assertFails(testDoc.set({ field1: "value1" }));
    });

    it("It can write to the movies document with the same ID as our user", async () => {
      const moviePath = `users/${myUser}/movies/666`;
      const admin = getAdminFirestore();
      await admin.doc(moviePath).set({ content: "before" });

      const db = getFirestore(myAuth);
      const testDoc = db.doc(moviePath);
      await firebase.assertSucceeds(testDoc.set({ content: "after" }));
    });

    it("It can't write to the movies document with a different ID as our user", async () => {
      const moviePath = (user) => `users/${user}/movies/666`;
      const admin = getAdminFirestore();
      await admin.doc(moviePath(myUser)).set({ content: "before" });

      const db = getFirestore(myAuth);
      const testDoc = db.doc(moviePath(theirUser));
      await firebase.assertFails(testDoc.set({ content: "after" }));
    });
  });

  describe("Firestore settings collection", () => {
    it("It can write to the settings document with the same ID as our user", async () => {
      const db = getFirestore(myAuth);
      const testDoc = db.collection("settings").doc(myUser);
      await firebase.assertSucceeds(testDoc.set({ field1: "value1" }));
    });

    it("It can't write to the settings document with a different ID as our user", async () => {
      const db = getFirestore(myAuth);
      const testDoc = db.collection("settings").doc(theirUser);
      await firebase.assertFails(testDoc.set({ field1: "value1" }));
    });
  });
});
