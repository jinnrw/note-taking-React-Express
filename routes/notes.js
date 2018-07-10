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
var ref = db.ref("users/owner");
var notesRef = ref.child("notes");

/* GET notes */
router.get('/', function (req, res) {
	notesRef.once('value', (snapshot) => {
		const data = snapshot.val();
		res.json(data)
	});
});

/* POST notes */
router.post('/', function (req, res) {
	// Update existing notes 
	if (typeof req.body.key !== "undefined") { 
		const key = req.body.key;
		notesRef.child(key).set({
			title: req.body.title,
			note: req.body.note
		})
	} else { 
		// Create new note condition
		const newData = notesRef.push();
		newData.set(req.body)
	}
	notesRef.once('value', (snapshot) => {
		const data = snapshot.val();
		res.json(data)
	});
});

/* DELETE notes */
router.delete('/', function (req, res) {
	const key = req.body.key;
	notesRef.child(key).remove();
	notesRef.once('value', (snapshot) => {
		const data = snapshot.val();
		res.json(data)
	});
})
module.exports = router;