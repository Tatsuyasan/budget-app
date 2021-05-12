import { Storage } from "@capacitor/core";

export const set = async (key: string, value: string) => {
  await Storage.set({
    key,
    value,
  });
};

export const get = async (key: string) => {
  return (await Storage.get({ key }))?.value;
};

export const remove = async (key: string) => {
  await Storage.remove({ key });
};
