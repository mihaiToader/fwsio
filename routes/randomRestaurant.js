const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const getTazzRestaurants = require('../parsers/getTazzRestaurants');
const shuffleArray = require('../misc/shuffleArray');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'FwsIo', error: 'You need an URL first' });
});

const TAZZ_URL = 'https://tazz.ro/';
router.post('/', async function(req, res, next) {
  const context = { title: 'FwsIo' };
  const { url } = req.body;

  if (!url) {
    res.render('index', { ...context, error: 'Add an url bro'});
    return;
  }

  if (!url.includes(TAZZ_URL)) {
    res.render('index', { ...context, error: 'URL is not from tazz, come on man!'});
    return;
  }

  const { htmlPage, status}  = await fetch(url).then(
    (res) => {
      if (res.status !== 200) {
        return {htmlPage: null, status: res.status}
      }
      return res.text();
    }
  ).then(res => ({htmlPage: res, status: 200}));

  if (status !== 200) {
    res.render('index', { ...context, error: `We got ${status} from that URL, sad story`});
    return;
  }

  const restaurants = getTazzRestaurants(htmlPage);
  if (!restaurants) {
    res.render('index', { ...context, error: `Could not extract the resturants from that`});
    return;
  }

  if (restaurants.length === 0) {
    res.render('index', { ...context, error: `0 restaurants for that URL`});
    return;
  }

  shuffleArray(restaurants);

  res.render('randomRestaurant', { title: 'FswIo', restaurants: restaurants });
});

router.get('/tazzImage', async function(req, res, next) {
  const { url } = req.query;
  const a = await fetch(url).then(res => {
    return res.blob();
  }).then(imageBlob => {
    return imageBlob;
  }).catch(err => console.log(err));
  
  const arrayBuffer = await a.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  res.writeHead(200, {
    'Content-Type': a.type,
    'Content-Length': a.size
  });
  res.end(buffer);
});


module.exports = router;
