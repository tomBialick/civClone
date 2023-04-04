var gameAPI = require('../game/gameAPI.cjs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/..', '/client/build', 'index.html'));
});

router.post('/newMap', (req, res, next) => {
  // Build map, store it?
  const worldMap = gameAPI.mapWrapper(req.body.width, req.body.height).then(data => {
    res.status(201).json({body: {gameMap: data}});
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(500).send("Contact Admin(s)");
  })

});

module.exports = router;
