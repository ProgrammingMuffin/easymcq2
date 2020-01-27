let port = process.env.PORT || 3001;

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const newquest = require('./routes/newquest2');
const createuser = require('./routes/createuser');
const test = require('./routes/test2');
const loginuser = require('./routes/loginuser');
const dashboard = require('./routes/dashboard');
const apply = require('./routes/apply');
const applyaction = require('./routes/applyaction');
const createtest = require('./routes/createtest');
const selectquest = require('./routes/selectquest');
const createpool = require('./routes/createpool');
const adminloginview = require('./routes/adminloginview');
const userloginview = require('./routes/userloginview');
const logout = require('./routes/logout');
const loginadmin = require('./routes/loginadmin');
const admindashboard = require('./routes/admindashboard');
const addquest = require('./routes/addquest');
const createtestview = require('./routes/createtestview');
const verifyview = require('./routes/verifyview');
const verify = require('./routes/verify');
const generatequests = require('./routes/generatequests');
const save = require('./routes/save');
const evaluate = require('./routes/evaluate');
const fetchsertime = require('./routes/fetchsertime');
const multer = require('multer'); // for file upload handling
const ejs = require('ejs');
const dotenv = require('dotenv'); //To read the .env file.
const cookieparser = require('cookie-parser');


dotenv.config(); //parse the .env file

app.use(cookieparser());
app.use("/", express.static(__dirname + "/public")); //serve static files present in the public directory.
app.use("/img", express.static(__dirname + '/uploads/images'));
app.use(cors()); //cross origin support
app.use(bodyParser.json()); //this is required to parse HTTP POST Body
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", express.static('public')); //serve static files present in the public directory.
app.use("/css", express.static('public/css')); //serve static files present in the public directory.
app.use(multer({dest: './uploads/images'}).any());


app.set("view engine", "ejs");


app.use("/login", adminloginview);
app.use("/login", userloginview);
app.use("/logout", logout);
app.use("/admin", loginadmin);
app.use("/addquest", addquest);
app.use("/createtest", createtestview);
app.use("/admin", newquest);
app.use("/admin", selectquest);
app.use("/admin", createpool);
app.use("/admin", admindashboard);
app.use("/evaluate", evaluate);
app.use("/userquests", generatequests);
app.use("/user", createuser);
app.use("/test", test);
app.use("/test", createtest);
app.use("/verifyview", verifyview);
app.use("/verify", verify);
app.use("/save", save);
app.use("/fetchsertime", fetchsertime);
app.use("/user", loginuser);
app.use("/user", dashboard);
app.use("/apply", apply);
app.use("/applyaction", applyaction);


app.listen(port, () => { console.log("congratulations, your server is running on port " + port + " " + __dirname) });