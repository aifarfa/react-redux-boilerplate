import jsdom from 'jsdom';
// import chai from 'chai';
// import chaiImmutable from 'chai-immutable';
// chai.use(chaiImmutable);

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

for (let key in window) {
  if (!window.hasOwnProperty(key)) continue;
  if (key in global) continue;

  global[key] = window[key];
}
