const express = require('express');
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const nocache = require('nocache')

app.use(nocache())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(
    session({
        secret: "key123",
        saveUninitialized:true,
        resave:false,cookie:{
            maxAge:1000 * 60 * 24 * 10,
        },
    })
);

app.set('view engine','ejs');
app.set('view','./views')

const userRoute = require("./routes");
app.use("/",userRoute);

app.listen('3000',() => {
    console.log("server connected");
})