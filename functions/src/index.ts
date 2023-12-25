import * as functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((_request, response) => {
  response.send("Hello from Firebase!");
});

const callHelloWorld = async (response: functions.Response) => {
  try {
    const result = await fetch("https://us-central1-ankomochiii.cloudfunctions.net/helloWorld");
    switch (result.status) {
      case 200:
        response.send(await result.text());
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
