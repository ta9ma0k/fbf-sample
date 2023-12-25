import * as functions from "firebase-functions";
import {GoogleAuth} from "google-auth-library";

const auth = new GoogleAuth();

export const helloWorld = functions.https.onRequest((_request, response) => {
  response.send("Hello from Firebase!");
});

const HELLO_WORLD_URL = "https://us-central1-ankomochiii.cloudfunctions.net/helloWorld";

const callHelloWorld = async (response: functions.Response) => {
  try {
    const client = await auth.getIdTokenClient(HELLO_WORLD_URL);
    const result = await client.request({
      url: HELLO_WORLD_URL,
    });
    switch (result.status) {
    case 200:
      response.send(await result.data);
      return;
    case 403:
      response.send("Forbidden");
      return;
    default:
      response.send("Unknown error");
    }
  } catch (_e) {
    const error = _e as ResponseError;
    response.send(error.message);
  }
};

type ResponseError = {
  message: string;
};

export const callableHelloWorld = functions.https.onRequest(async (_request, response) => {
  await callHelloWorld(response);
});

export const uncallableHelloWorld = functions.https.onRequest(async (_request, response) => {
  await callHelloWorld(response);
});
