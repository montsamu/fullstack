
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require('path');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/contacts')
	.then(() => console.log('mongodb connection successful'))
	.catch((err) => console.error(err));

app.use(express.static(__dirname + '/app'));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var port = '3000';
app.listen(port, () => {
	console.log('app listening...')
})

var router = express.Router();
router.get('/', (req,res,next) => {
	res.render('index', { title: 'Contact List' });
});
app.use('/', router);

var contactsRouter = require('./routes/contacts.js');
app.use('/contacts', contactsRouter);

