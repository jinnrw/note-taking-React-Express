var express = require('express');
var router = express.Router();

var notes = [{
		title: 'Express: Fast, unopinionated, minimalist web framework for Node.js',
  	note: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
  }, {
		title: 'React: JavaScript Library',
  	note: "In computing, React is a JavaScript library for building user interfaces. It is maintained by Facebook, Instagram and a community of individual developers and corporations."
  }]
/* GET users listing. */
router.get('/', function(req, res) {
  res.json(notes)
});

router.post('/', function(req, res) {
	if(typeof req.body.index !== "undefined") {
		notes[req.body.index].title = req.body.title
		notes[req.body.index].note = req.body.note
	} else {
		notes.push(req.body)
	}
	res.json(notes)
});

router.delete('/', function(req, res){
	// Prevent default notes get deleted
	// if(req.body.index > 1) {
	// 	notes.splice(req.body.index, 1);
	// }
	notes.splice(req.body.index, 1);
	res.json(notes)
})
module.exports = router;
