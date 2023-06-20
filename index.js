var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

function isProductInCart(cart,id_prod){
        for(let i=0; i<cart.length; i++) {
            if(cart[i].id_prod == id_prod){
                return true;
            }
        }

        return false;
}

function calculateTotal(cart,req){
    total = 0;
    for(let i=0; i<cart.length; i++){
        //se tiver desconto, somar com o desconto. Se nao, com o valor normal
        if(cart[i].precoDesconto_prod){
            total = total + (cart[i].precoDesconto_prod*cart[i].quantidade_prod);
        }else {
            total = total + (cart[i].preco_prod*cart[i].quantidade_prod)
        }
    }
    req.session.total = total;
    return total;
}

app.listen(8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "segredo",
    resave: false,
    saveUninitialized: false
}));

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'pixelcat'
});


app.get('/', function (req, res) {

    con.query("SELECT `id_prod`, `nome_prod`, `preco_prod`, `precoDesconto_prod`, `estoque_prod`, `descricao_prod`, `plataforma_prod`, `imagem_prod` FROM `pixelcat`.`produto`", (err, result) => {
        res.render('pages/produtos', { result: result });
    })


});

app.post('/add', function(req, res) {
   var id_prod = req.body.id_prod;
   var nome_prod = req.body.nome_prod;
   var preco_prod = req.body.preco_prod;
   var precoDesconto_prod = req.body.precoDesconto_prod;
   var plataforma_prod = req.body.plataforma_prod;
   var quantidade_prod = req.body.quantidade_prod;
   var imagem_prod = req.body.imagem_prod;
   var product = {id_prod:id_prod, nome_prod:nome_prod, preco_prod:preco_prod, precoDesconto_prod:precoDesconto_prod, plataforma_prod:plataforma_prod, quantidade_prod:quantidade_prod, imagem_prod:imagem_prod}

   if(req.session.cart){
        var cart = req.session.cart;

        if(!isProductInCart(cart,id_prod)) {
            cart.push(product);
    }
   }else {
        req.session.cart = [product];
        var cart = req.session.cart;
   }

   //calcular o total
   calculateTotal(cart,req);

   res.redirect('/carrinho');

});

app.get('/carrinho',function(req,res){
    var cart = req.session.cart;
    var total = req.session.total;
    res.render('pages/carrinho',{cart:cart,total:total});
});