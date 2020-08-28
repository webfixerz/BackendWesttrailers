const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, req.body.naam + new mongoose.Types.ObjectId() + file.mimetype.replace("image/","."));
  }
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Bestanden moeten ofwel .jpeg of .png zijn"), false);
  }
}

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Horse = mongoose.model("Horse"); 


/* GET home page. */

router.get('/', function(req, res, next) {
  Horse.find(function(err, horses) {
    if(err) { return next(err); }
    res.json(horses);
  });
});

router.get('/:id', function(req, res) {
  res.json(req.horse);
})

router.param('id', function(req, res, next, id) {
  let query = Horse.findById(id);
  query.exec(function(err, horse) {
    if(err) { return next(err); }
    if(!horse) { return next(new Error('not found ' + id)); }
    req.horse = horse;
    return next();
  })
})

router.post('/',upload.single('foto'), function (req, res, next) {
  const horse = new Horse({
    _id: new mongoose.Types.ObjectId(), 
    naam : req.body.naam, 
    geboortejaar : req.body.geboortejaar, 
    geslacht : req.body.geslacht, 
    vader : req.body.vader,
    moeder : req.body.moeder, 
    vaderVader : req.body.vaderVader, 
    vaderMoeder : req.body.vaderMoeder,
    moederVader : req.body.moederVader, 
    moederMoeder : req.body.moederMoeder, 
    ras : req.body.ras, 
    youtubeLinks : req.body.youtubeLinks,
    fotoPad : req.file.path
  });
  horse.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
});

router.delete('/:id', function(req, res) {
  req.horse.remove(function(err) {
    if (err) { return next(err); }   
    res.json("removed horse");
  });
})

router.put('/:id', function(req, res) {
  var horse = req.horse;
  horse.youtubeLinks = req.body;
  horse.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
})

module.exports = router;
