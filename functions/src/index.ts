import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.database();

/** https://firebase.google.com/docs/functions/get-started */
export const addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;
  const snapshot = await admin
    .database()
    .ref("/messages")
    .push({ original: original });
  res.redirect(303, snapshot.ref.toString());
});

/** https://firebase.google.com/docs/functions/get-started */
export const makeUppercase = functions.database
  .ref("/messages/{pushId}/original")
  .onCreate((snapshot, context) => {
    const original: string = snapshot.val();
    console.log("Uppercasing", context.params.pushId, original);
    const uppercase = original.toUpperCase();
    return snapshot.ref.parent?.child("uppercase").set(uppercase);
  });

/** https://firebase.google.com/docs/functions/video-series */
export const helloWorld = functions.https.onRequest((request, response) => {
  console.log("test message");
  response.send("Hello from Firebase!");
});

/** https://firebase.google.com/docs/functions/video-series */
export const getCartagenaWeather = functions.https.onRequest(
  (request, response) => {
    db.ref("cities-weather/cartagena-bov-co")
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        response.send(data);
      })
      .catch(error => {
        console.log(error);
        response.status(500).send(error);
      });
  }
);

/** https://firebase.google.com/docs/functions/video-series */
export const getTolimaAreaWeather = functions.https.onRequest(
  (request, response) => {
    db.ref("areas/tolima")
      .once("value")
      .then(areaSnapshot => {
        const cities = areaSnapshot.val().cities;
        const promises = [];
        for (const city in cities) {
          const p = db.ref(`cities-weather/${city}`).once("value");
          promises.push(p);
        }
        return Promise.all(promises);
      })
      .then(citySnapshots => {
        const results: any[] = [];
        citySnapshots.forEach(citySnap => {
          const data = citySnap.val();
          data.city = citySnap.key;
          results.push(data);
        });
        response.send(results);
      })
      .catch(error => {
        console.log(error);
        response.status(500).send(error);
      });
  }
);
