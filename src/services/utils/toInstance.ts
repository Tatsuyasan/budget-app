export const toInstance = function<T>(obj: T, json: string): T {
  const jsonObj = JSON.parse(json);

  if (typeof (obj as any)["fromJSON"] === "function") {
    (obj as any)["fromJSON"](jsonObj);
  } else {
    for (const propName in jsonObj) {
      (obj as any)[propName] = jsonObj[propName];
    }
  }

  return obj;
};
