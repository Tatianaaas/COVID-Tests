const Test = require('../models/Test')
var moment = require('moment');
const PDFKit = require('pdfkit');
const fs = require('fs');

const createOrder = async(req, res, next) => {
    let localDate;
    let dataPrimeiroTeste;

    if (req.body.trabalhoLocalRisco == true) {
        localDate = moment();
        dataPrimeiroTeste = localDate.add(24, 'hours')
    }

    const oldTest = await Test.findByIdAndUpdate(
        req.params.userId, {
            sns24: req.body.sns24,
            grupoRisco: req.body.grupoRisco,
            trabalhoLocalRisco: req.body.trabalhoLocalRisco,
            prioridade: req.body.trabalhoLocalRisco,
            dataPrimeiroTeste: dataPrimeiroTeste
        }
    )

    const newTest = await Test.findById(
        req.params.userId,
    )

    res.send({
        old: oldTest,
        new: newTest
    })
}

const getOrders = async(req, res) => {
    const testsList = await Test.find()
    res.send(testsList)
}

const getOrdersTech = async(req, res) => {
    const testsList = await Test.find().sort({ prioridade: -1 });
    res.send(testsList)
}

const getOrdersTechInfected = async(req, res) => {
    const testsList = await Test.find({ "infetado": true }).sort({ prioridade: -1 });
    res.send(testsList)
}

const getOrdersTechFirstResult = async(req, res) => {
    const testsList = await Test.find({ "primeiroResultado": null }).sort({ prioridade: -1 });
    res.send(testsList);
}

const getOrdersTechSecondResult = async(req, res) => {
    const testsList = await Test.find({ "segundoResultado": null, "realizadoPrimeiroTeste": true }).sort({ prioridade: -1 });
    res.send(testsList)
}

const getOrdersTechDates = async(req, res) => {
    const testsListFirstDate = await Test.find({ "dataPrimeiroTeste": "" }).sort({ prioridade: -1 });
    const testsListSecondDate = await Test.find({ "dataSegundoTeste": "" }).sort({ prioridade: -1 });

    testsListFirstDate.push(testsListSecondDate);
    res.send(testsListFirstDate)
}

const totalOrders = (req, res) => {
    let total = 0;

    Test.countDocuments(function(err, result) {
        if (err) {
            res.send(err)
        } else {
            total += result
            res.json(total)
        }
    })
}

const getTestsByDay = async(req, res) => {
    let total = 0;
    Test.countDocuments({ dataPrimeiroTeste: req.body.data }, function(err, result) {
        if (err) {
            res.send(err)
        } else {
            total += result
        }
    })

    Test.countDocuments({ dataSegundoTeste: req.body.data }, function(err, result) {
        if (err) {
            res.send(err)
        } else {
            total += result
        }
        res.json(total)
    })
}

const getTestsByPerson = async(req, res) => {
    let total = 0;

    Test.countDocuments({ nomeUtente: req.params.username, realizadoPrimeiroTeste: true }, function(err, result) {
        if (err) {
            res.send(err)
        } else {
            total += result
        }
    })

    Test.countDocuments({ nomeUtente: req.params.username, realizadoSegundoTeste: true }, function(err, result) {
        if (err) {
            res.send(err)
        } else {
            total += result
        }

        res.json(total)
    })
}

const getinfetados = (req, res) => {
    let total = 0;

    Test.countDocuments({ infetado: true }, function(err, result) {
        if (err) {
            res.send(err)
        } else {
            total += result
            res.json(total)
        }
    })
}

const getNaoInfetados = (req, res) => {
    let total = 0;

    Test.countDocuments({ infetado: false }, function(err, result) {
        if (err) {
            res.send(err)
        } else {
            total += result
            res.json(total)
        }
    })
}

const getOrderById = async(req, res) => {
    try {
        const orderResult = await Test.findById(req.params.userId);
        res.send(orderResult)
    } catch (e) {
        res.status(404)
        res.send(null)
    }
}

const getResultById = async(req, res) => {
    try {
        const testResult = await Test.findById(req.params.userId);
        res.send(testResult.resultado)
    } catch (e) {
        res.status(404)
        res.send(null)
    }
}

const updateFirstResult = async(req, res) => {
    const user = await Test.findById(req.params.userId)
    const data = moment(user.dataPrimeiroTeste);
    const dataSegundoTeste = data.add(48, 'hours')

    const oldTest = await Test.findByIdAndUpdate(
        req.params.userId, { primeiroResultado: req.body.primeiroResultado, dataSegundoTeste: dataSegundoTeste, infetado: true, realizadoPrimeiroTeste: true }
    )

    const newTest = await Test.findById(
        req.params.userId,
    )

    res.send({
        old: oldTest,
        new: newTest
    })
}

const updateSecondResult = async(req, res) => {
    let result = false;
    const primeiro = await Test.findById(req.params.userId)
    const pdf = new PDFKit();
    let firstTest, secondTest, covid;

    if (primeiro.primeiroResultado == true || primeiro.primeiroResultado == false) {
        if (req.body.segundoResultado == true || primeiro.primeiroResultado == true) {
            result = true;
        }

        const oldTest = await Test.findByIdAndUpdate(
            req.params.userId, { segundoResultado: req.body.segundoResultado, infetado: result, realizadoSegundoTeste: true }
        )

        const newTest = await Test.findById(
            req.params.userId,
        )

        if (newTest.primeiroResultado == true) {
            firstTest = "Positivo";
        } else {
            firstTest = "Negativo";
        }
        if (newTest.segundoResultado == true) {
            secondTest = "Positivo";
        } else {
            secondTest = "Negativo"
        }
        if (newTest.infetado == true) {
            covid = "Sim";
        } else {
            covid = "Não"
        }

        pdf.fontSize(20);
        pdf.image('./api/images/índice.png', 60, 20, { width: 100 });
        pdf.text('Resultados Clínicos', { align: 'center', });
        pdf.text("    ");
        pdf.text("  ");
        pdf.text("  ");
        pdf.text(`ID Nº ${newTest._id}`);
        pdf.text("   ");
        pdf.text(`-Nome: ${newTest.nomeUtente}`);
        pdf.text(`-Resultado primeiro teste: ${firstTest}`);
        pdf.text(`-Resultado segundo teste: ${secondTest}`);
        pdf.text(`-Infetado: ${covid}`);
        pdf.pipe(fs.createWriteStream(`./api/docs/${newTest._id}.pdf`));
        pdf.end();

        res.send({
            old: oldTest,
            new: newTest
        })
    } else {
        res.status(404)
        res.json("Ainda nao se encontra registado o resultado do primeiro teste")
    }
}

const scheduleFirstTest = async(req, res) => {
    const oldTest = await Test.findByIdAndUpdate(
        req.params.userId, { dataPrimeiroTeste: req.body.dataPrimeiroTeste }
    )

    const newTest = await Test.findById(
        req.params.userId,
    )

    res.send({
        old: oldTest,
        new: newTest
    })
}

const download = (req, res) => {
    res.download(`./api/docs/${req.params.userId}.pdf`);
}

module.exports = {
    createOrder,
    getOrderById,
    getOrders,
    getOrdersTech,
    getResultById,
    getTestsByDay,
    getTestsByPerson,
    getinfetados,
    scheduleFirstTest,
    updateFirstResult,
    updateSecondResult,
    totalOrders,
    getNaoInfetados,
    download,
    getOrdersTechInfected,
    getOrdersTechFirstResult,
    getOrdersTechSecondResult,
    getOrdersTechDates
}