const database = require('./db.json')
const express = require("express")
const morgan = require("morgan")
const multer = require("multer")
const path = require('path')
//initiate express app
const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    destination:(req, file, cb) =>  {
         cb(null, "imaged")
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now()+path.extname(file.originalname))
    }   
})

const upload = multer({storage: storage})

app.set('view engine', 'ejs');
app.set('views', 'webpages');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
app.use(morgan('tiny'));



app.listen(PORT, function(err){
    if(err) console.log(err)
    console.log("listening at port ", PORT)})

app.get('/', (req,res) => {
    res.render('user/login', {title: "Login | Register"})

})

app.get('/admin', (req, res) => {
    res.render('admin/login', {title: "For Administrator"})
})

app.post('/', (req, res) => {
    const username = req.body.Username;
    const password = req.body.password;
    res.redirect('/main')
})

app.get('/main', (req, res) => {
    res.render('user/main', {title: 'home'})
})

app.post('/admin', (req,res)=>{
    const adminName = req.body.adminName
    const adminPassword = req.body.adminPassword
    res.redirect('/admin/main')
})

app.get('/admin/main', (req,res) => {
    res.render  ('admin/Lenderpage',{object: database, title:"Admin"})
})

app.get('/admin/add', (req,res) => {
    res.render('admin/Add', {title: "Admin | Add Item"})
})

app.post('/admin/add', upload.single("images"), (req,res) => {
    res.send(req.body.ItemName)
})

app.get('/admin/available', (req, res) => {
    res.render('admin/available', {object: database,title:"Admin | Availabe Items"})
})

app.get('/admin/current', (req,res)=>{
    res.render('admin/current', {object: database, title: "Admin | Current"})
}) 