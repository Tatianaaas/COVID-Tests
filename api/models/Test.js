const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    nomeUtente: { type: String, required: true },
    sns24: { type: Boolean},
    grupoRisco: { type: Boolean },
    trabalhoLocalRisco: {type:Boolean},
    prioridade: {type:Boolean},
    dataPrimeiroTeste: { type: Date},
    realizadoPrimeiroTeste: { type: Boolean },
    primeiroResultado: { type: Boolean },
    dataSegundoTeste: { type: Date},
    realizadoSegundoTeste: { type: Boolean },
    segundoResultado: { type: Boolean },
    infetado: { type: Boolean },
    
})

module.exports = mongoose.model('Teste', testSchema)