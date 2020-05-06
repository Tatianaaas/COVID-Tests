const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    //id: { type: String, required: true},
    nomeUtente: { type: String, required: true },
    sns24: { type: Boolean, required: true },
    grupoRisco: { type: Boolean, required: true },
    dataUtente: { type: Date, required: true },
    realizado: { type: Boolean },
    resultado: { type: Boolean }
})