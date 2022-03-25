import events from "events";

export const $ = (seletor) => document.querySelector(seletor);

export const getOriginalContent = (selector) =>
  $(selector).getAttribute("original-content");

export const bus = new events.EventEmitter();
