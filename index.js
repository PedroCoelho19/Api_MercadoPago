const express =  require("express");
const MercadoPago = require('mercadopago')
const app = express()

MercadoPago.configure({
    sandbox: true,
    access_token:  "TEST-4893545853274961-122609-2ed3f4b104be50ebe2629b0cde1da9d2-1272980323"
})


app.get('/', (req, res) => {
    res.send("Ola mundo")
})

//id //codigo //pagador //status

app.get('/pagar', async (req, res) => {
    
    let id = String(Date.now())
    
    const dados = {
        items : [
            item = {
                id: id,
                title: "Vendo Manga por 1,99",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(200)
            }
        ],
        payer:{
            email: "pedrocoelho312@edu.unifor.br"
        },
        external_reference: id
    }

    try{
        const pagamento =  await MercadoPago.preferences.create(dados)
        console.log(pagamento)
        return res.redirect(pagamento.body.init_point)
    }catch(err){
        return res.send(err.message)
    }
    
})


app.listen(3000, (req, res) => {
    console.log("Servidor rodando na porta 3000!") 
})

