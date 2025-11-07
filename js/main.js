import { log, NetworkError } from './utils.js';

const BASEURLDOG = 'https://placedog.net';
const BASEURLCAT = 'https://placecats.com';

(function init() {
  log('HTML is ready');
  // (max - min) + min + 1;
  const dogUrls = [];
  const catUrls = [];
  for (let d = 0; d < 3; d++) {
    //fill both arrays with one loop to save time
    const w = Math.floor(Math.random() * (410 - 390)) + 391;
    const h = Math.floor(Math.random() * (310 - 290)) + 291;
    const dogUrl = `${BASEURLDOG}/${w}/${h}`;
    dogUrls.push(dogUrl);
    const catUrl = `${BASEURLCAT}/${w}/${h}`;
    catUrls.push(catUrl);
  }
  //call buildCards with both arrays
  // const arr = dogUrls.concat(catUrls);
  const arr = [...dogUrls, 'https://birdsrule.org/hahaha', ...catUrls];
  // buildCards(arr);
  race(arr);
})();
function race(arr) {
  const fetchArray = arr.map((url) => fetch(url));
  //we now have an array of fetch calls
  //pass the array to Promise.any and wait for the results
  Promise.any(fetchArray)
    .then((firstSuccessful) => {
      console.log(firstSuccessful);
      let url = firstSuccessful.url;
      buildCards([url]);
      //only add a card for the first successful fetch
    })
    .catch((err) => {
      console.error(err.message);
    });
}

function buildCards(arr) {
  //turn an array into HTML cards
  const content = document.querySelector('.content');
  // content.innerHTML = arr.map(item=>{return `<div></div>`}).join('')
  const df = document.createDocumentFragment(); // new DocumentFragment()
  arr.forEach((url, index) => {
    const template = document.querySelector('#card');
    const copy = template.content.cloneNode(true);
    copy.querySelector('.card').setAttribute('data-ref', index);
    const img = copy.querySelector('.card__image');
    img.addEventListener('error', badImage);
    // img.src = url;
    loadImage(img, url);
    let label = url.includes('cat') ? 'Kitty' : 'Doggy'; //use the URL to determine what string to show
    copy.querySelector('.card__image').alt = label;
    copy.querySelector('.card__title').textContent = label;
    df.append(copy);
  });

  content.append(df);
  //We should ALWAYS only call append ONCE to update the page
}
function loadImage(img, url) {
  //use fetch to go and get the image then load it into the <img>
  fetch(url)
    .then((response) => {
      //we have a response object with headers now
      return response.blob();
      //this is a promise too. It resolves when we have all the binary data
    })
    .then((blob) => {
      //blob - binary large object
      let src = URL.createObjectURL(blob);
      //builds a URL that points at the binary data in memory
      img.src = src;
    })
    .catch((err) => {
      //image failed to be fetched
    });
}
function badImage(ev) {
  //this function runs when any image fails to load
  const img = ev.target;
  img.src = './img/400.jpg';
  //In JavaScript the paths are relative to the HTML file that loaded the script
}

function getData() {
  //only do the fetch(es)
}
function showLoading() {
  const template = document.querySelector('#loader');
}
