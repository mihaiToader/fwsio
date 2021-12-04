const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const getTazzRestaurants = require('../parsers/getTazzRestaurants');

router.get('/', function(req, res, next) {
  res.render('randomRestaurant', { title: 'FswIo' });
});


const TAZZ_URL = 'https://tazz.ro/';
router.post('/', async function(req, res, next) {
  const context = { title: 'FswIo' };
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

  res.render('randomRestaurant', { title: 'FswIo', resturants: restaurants });
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
