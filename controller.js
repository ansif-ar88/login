const { error } = require("console");

const username = "ansif";
const password = "1234"

let message ;
let session

const loadLogin = async (req,res) => {
    try{
        session = req.session;
        if(session.userId){
            res.redirect('/home')
        }else{

            res.render('login',{message});
            message = null
        }
    } catch (error){
        console.log("error");
    }
}
const loadHome = async(req,res) => {
try{
    session = req.session;
    if(session.userId){
        const name = req.session.names;
        res.render('home',{name})
    }else{

        res.redirect('/');
    }
}catch(error){
    console.log("error");

}
}

const verifyLogin = async(req,res) =>{
    try{
        console.log(req.body);
        if(req.body.username === username && req.body.password === password ){
            session=req.session;
            session.userId = req.body.username;
            let name = req.body.username
            req.session.names = name;
            res.render('home',{name});

        }else{
            message = "incorrect password or user name"
            res.redirect('/')
        }
    }catch(error){
        console.log(error);
    }
}
const logOut = async(req,res) => {
    try{
        req.session.userId = null;
        res.redirect('/')
    }catch(error){
        console.log(error);
    }
}
module.exports ={
    loadLogin,
    verifyLogin,
    loadHome,
    logOut
}