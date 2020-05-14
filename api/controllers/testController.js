const Test = require('../models/Test')
var moment = require('moment');

const createOrder = (req, res, next) => {

    const test = new Test({
        nomeUtente: req.body.nomeUtente,
        sns24: req.body.sns24,
        grupoRisco: req.body.grupoRisco,
        trabalhoLocalRisco: req.body.trabalhoLocalRisco,
        prioridade: req.body.trabalhoLocalRisco
    });

    test.save().then(testeCriado => {
        res.status(201).json({
            message: 'Pedido de teste adicionado com sucesso',
            test: {
                ...testeCriado,
                id: testeCriado._id
            }
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Pedido de teste falhou!!'
        });
    });
}

const getOrders = async(req, res) => {
    const testsList = await Test.find()
    res.send(testsList)

}

const getTestsByDay = async(req, res) => {
    let total=0 ;
   Test.countDocuments({ dataPrimeiroTeste: req.body.data}, function(err, result) {
    if (err) {
        res.send(err)
    } else {
      total+=result
    }
    })

    Test.countDocuments({dataSegundoTeste: req.body.data }, function(err, result) {
        if (err) {
            res.send(err)
        } else {
          total+=result
          res.json(total)
        }
    })

}

const getTestsByPerson = async(req, res) => {

    let total=0 ;
   Test.countDocuments({ nomeUtente:req.params.username ,realizadoPrimeiroTeste:true}, function(err, result) {
    if (err) {
        res.send(err)
    } else {
      total+=result
    }
    })

    Test.countDocuments({nomeUtente: req.params.username, realizadoSegundoTest:true}, function(err, result) {
        if (err) {
            res.send(err)
        } else {
          total+=result
          
            res.json(total)
        }
    })

    
}

const getinfetados = (req, res) => {
    let total=0;
    Test.countDocuments({ infetado: true }, function(err, result) {
        if (err) {
            res.send(err)
        } else {
            total+=result
            res.json(total)
        }
    })
}

const getOrderById = async(req, res) => {
    try {
        console.log('ID', req.params.userId)
        const orderResult = await Test.findById(req.params.userId);
        console.log(orderResult)
        res.send(orderResult)
            //res.render('users/show', { test: testResult })
    } catch (e) {
        console.error(e)
        res.status(404)
        res.send(null)
    }
}

const getResultById = async(req, res) => {
    try {
        console.log('ID', req.params.userId)
        const testResult = await Test.findById(req.params.userId);
        console.log(testResult.resultado)
        res.send(testResult.resultado)
            //res.render('users/show', { test: testResult })
    } catch (e) {
        console.error(e)
        res.status(404)
        res.send(null)
    }
}

const updateFirstResult = async(req, res) => {
    const user= await Test.findById(req.params.userId)
    const data = moment(user.dataPrimeiroTeste);
    const dataSegundoTeste= data.add(48,'hours')
    const oldTest = await Test.findByIdAndUpdate(
        req.params.userId, { primeiroResultado: req.body.primeiroResultado, dataSegundoTeste: dataSegundoTeste, infetado: true , realizadoPrimeiroTeste:true}
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

    if (req.body.segundoResultado == true || primeiro.primeiroResultado == true) {
        result = true;
    } 

    const oldTest = await Test.findByIdAndUpdate(
        req.params.userId, { segundoResultado: req.body.segundoResultado, infetado: result, realizadoSegundoTest:true }
    )

    const newTest = await Test.findById(
        req.params.userId,
    )

    res.send({
        old: oldTest,
        new: newTest
    })
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


module.exports = {
    createOrder,
    getOrderById,
    getOrders,
    getResultById,
    getTestsByDay,
    getTestsByPerson,
    getinfetados,
    scheduleFirstTest,
    updateFirstResult,
    updateSecondResult
}