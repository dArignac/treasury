import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as fs from "fs";

let testEnv: RulesTestEnvironment;

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "demo-treasury",
    firestore: {
      rules: fs.readFileSync("../firestore.rules", "utf8"),
    },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

after(async () => {
  await testEnv.clearFirestore();
});

describe("Treasury Application", () => {
  describe("General Firestore lockdown", () => {
    it("It cannot read from any unknown document", async () => {
      const anonymous = testEnv.unauthenticatedContext();
      await assertFails(
        getDoc(doc(anonymous.firestore(), "testColl", "testDoc"))
      );
    });
    it("It cannot write to any unknown document", async () => {
      const anonymous = testEnv.unauthenticatedContext();
      await assertFails(
        setDoc(doc(anonymous.firestore(), "/testColl/TestDoc"), {
          field1: "value1",
        })
      );
    });
  });
  describe("Firestore user collection", () => {
    it("It can read the users document as authenticated user", async () => {
      const carlton = testEnv.authenticatedContext("carlton");
      await assertSucceeds(
        getDoc(doc(carlton.firestore(), "users", "carlton"))
      );
    });
    it("It cannot read the users document of another user", async () => {
      const carlton = testEnv.authenticatedContext("carlton");
      await assertFails(getDoc(doc(carlton.firestore(), "users", "hilary")));
    });
    it("It can write to the users document", async () => {
      const carlton = testEnv.authenticatedContext("carlton");
      await assertSucceeds(
        setDoc(doc(carlton.firestore(), "users", "carlton"), {
          field1: "value1",
        })
      );
    });
    it("It cannot write to the users document of another user", async () => {
      const carlton = testEnv.authenticatedContext("carlton");
      await assertFails(
        setDoc(doc(carlton.firestore(), "users", "hilary"), {
          field1: "value1",
        })
      );
    });
    it("It can write the movies document", async () => {
      const carlton = testEnv.authenticatedContext("carlton");
      await assertSucceeds(
        setDoc(doc(carlton.firestore(), "users", "carlton", "movies", "666"), {
          field1: "value1",
        })
      );
    });
    it("It cannot write the movies document of another user", async () => {
      const carlton = testEnv.authenticatedContext("carlton");
      await assertFails(
        setDoc(doc(carlton.firestore(), "users", "hilary", "movies", "666"), {
          field1: "value1",
        })
      );
    });
  });
});
