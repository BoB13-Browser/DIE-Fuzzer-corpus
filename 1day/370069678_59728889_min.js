function help_tag2id(tag, idx) {
  tag = tag.toLowerCase();
  let t2 = document.querySelectorAll(tag);
  if (0 == t2.length) throw `FAIL: help_tag2id -> querySelectorAll:${tag}`;
  t3 = t2[idx % t2.length];
  return t3;
}

async function trigger1(img) {
  try {
    /*HTMLImageElement*/
    var v1926 = help_tag2id("img", 4);
  } catch (e) {}

  try {
    v1926.crossOrigin = "bar";
  } catch (e) {}

  try {
    /*HTMLIFrameElement*/
    var v2012 = help_tag2id("iframe", 245);
  } catch (e) {}

  try {
    /*attr_HTMLIFrameElement_contentWindow_type*/
    var v2545 = v2012.contentWindow;
  } catch (e) {}

  try {
    /*attr_Window_caches_type*/
    var v2544 = v2545.caches;
  } catch (e) {}

  try {
    /*CacheQueryOptions*/
    var v2548 = {
      ignoreSearch: null,
      ignoreMethod: null,
      ignoreVary: null
    };
  } catch (e) {}

  try {
    /*ret_match_type*/
    var v2543 = await v2544.match(null, v2548);
  } catch (e) {}
}

const cacheName = 'my-cache-v1';
const key = 'my-data-key';
const data = 'This is some cached data';

async function getCache() {
  return await caches.open(cacheName);
}

async function checkCache(key) {
  const cache = await getCache();
  const response = await cache.match(new Request(key));
}

function checkVisit() {
  const hash = window.location.hash;

  if (hash === '') {
    window.location.hash = 'visited';
    checkCache(key);
    window.location.reload();
    return true;
  }

  return false;
}

function start() {
  if (checkVisit()) return;
  var ImageData = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
  let img = document.createElement('img');
  img.src = ImageData;

  img.onload = function () {
    document.body.appendChild(img);
    document.body.offsetTop;
    trigger1(img);
  };
}