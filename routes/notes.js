var express = require('express');
var router = express.Router();

// Init Firebase
const firebase = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: 'https://note-taking-react-express.firebaseio.com/'
});

const db = firebase.database();
var ref = db.ref("restricted_access/secret_document");

var usersRef = ref.child("users");

// var notes = [{
// 	title: 'Express: Fast, unopinionated, minimalist web framework for Node.js',
// 	note: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
// }, {
// 	title: 'React: JavaScript Library',
// 	note: "In computing, React is a JavaScript library for building user interfaces. It is maintained by Facebook, Instagram and a community of individual developers and corporations."
// }]

// usersRef.set(notes)

/* GET users listing. */
router.get('/', function (req, res) {
	// res.json(notes)

	usersRef.once('value', (snapshot) => {
		const data = snapshot.val();
		// console.log('You received some data!', data);
		// console.log(Object.keys(data));
		res.json(data)
	});
});

router.post('/', function (req, res) {
	if (typeof req.body.index !== "undefined") { // Update notes consition
		// notes[req.body.index].title = req.body.title
		// notes[req.body.index].note = req.body.note

		const key = req.body.index;
		usersRef.child(key).set({
			title: req.body.title,
			note: req.body.note
		})
	} else { // Create new note condition
		// notes.push(req.body)
		const newData = usersRef.push();
		newData.set(req.body)
	}
	// res.json(notes)

	usersRef.once('value', (snapshot) => {
		const data = snapshot.val();
	console.log(data);

		res.json(data)
	});

	
});

router.delete('/', function (req, res) {
	// Prevent default notes get deleted
	// if(req.body.index > 1) {
	// 	notes.splice(req.body.index, 1);
	// }
	// notes.splice(req.body.index, 1);
	// res.json(notes)

	const key = req.body.index;
	console.log("delete key: " + key);
	usersRef.child(key).remove();

	usersRef.once('value', (snapshot) => {
		const data = snapshot.val();
		res.json(data)
	});
})
module.exports = router;