const express = require("express")
const morgan = require("morgan")
//initiate express app
const app = express();
const PORT = 3000;



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
    res.render('admin/Lenderpage',{title: "Administrator"})
})