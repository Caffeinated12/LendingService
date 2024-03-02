const express = require("express")
const morgan = require("morgan")
//initiate express app
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'webpages/user');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
app.use(morgan('tiny'));


app.listen(PORT, function(err){
    if(err) console.log(err)
    console.log("listening at port ", PORT)})

app.get('/', (req,res) => {
    console.log(req);
    res.render('login')
})