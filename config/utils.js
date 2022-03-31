import path from "path";
import fs from "fs";

export const getJson = function (url) {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, url), "utf-8"));
};

export const resolve = function (url) {
  return path.resolve(__dirname, url);
};
