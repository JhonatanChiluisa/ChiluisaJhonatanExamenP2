const express = require('express');
const app = express();
const hbs = require('hbs');

const port = process.env.PORT || 3000;

// creacion del middleware
app.use(express.static(__dirname + '/public'));
// Express hbs view engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.get('/', (req,res)=>{
    res.render('home');
});

var json = require("./data/datos.json");

hbs.registerHelper("productosCompumundo",()=>{
    var cp = JSON.stringify(json);
    var product = JSON.parse(cp);
    let salida ="";
    for (let i = 0; i < product.length; i++) {
        salida= salida+'<div> <figure >'
            +'<img src="'+product[i].imagen+'" alt="" id="imagen">'
            +'<figcaption>'+ product[i].computador+'</figcaption>'
            +'<h3>'+product[i].precio+'</h3>'
            + '</figure></div>'
    }
    return salida;
})

hbs.registerHelper('getAnio', ()=>{
    return new Date().getFullYear();
});

app.get('/inventario', (req, res) =>{
    res.render('inventario');
});

app.listen(port, ()=>{
    console.log(`Escuchando peticiones en el puerto ${port}`);
});