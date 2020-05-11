const Test = require('../models/Test')

const createOrder = (req, res, next) => {
    let p = false;
    if (req.body.trabalhoLocalRisco == true) {
        p = true;
    }

    const test = new Test({
        nomeUtente: req.body.nomeUtente,
        sns24: req.body.sns24,
        grupoRisco: req.body.grupoRisco,
        trabalhoLocalRisco: req.body.trabalhoLocalRisco,
        prioridade: p,
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
    //a data so lista se corresponder aos dois parametros em simultaneo , falta arranjar forma de filtrar num caso ou noutro
    const tests = await Test.find({ dataPrimeiroTeste: req.body.dataPrimeiroTeste, dataSegundoTeste: req.body.dataSegundoTeste });

    res.send(tests)
}

const getTestsByPerson = async(req, res) => {
    const tests = await Test.find({ nomeUtente: req.params.username });
    res.send(tests)
}

const getinfetados = (req, res) => {
    Test.count({ infetado: true }, function(err, result) {
        if (err) {
            res.send(err)
        } else {
            res.json(result)
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
    const oldTest = await Test.findByIdAndUpdate(
        req.params.userId, { primeiroResultado: req.body.primeiroResultado, infetado: true }
    )

    const newTest = await Test.findById(
        req.params.userId,
    )

    res.send({
        old: oldTest,
        new: newTest
    })

    /*    const testResult = new Test({
           primeiroResultado: req.body.primeiroResultado,
           dataSegundoTeste: req.body.dataSegundoTeste,
           infetado: true
         });
         Test.updateOne({ _id: req.params.id }, testResult)
           .then(result => {
             if (result.n > 0) {
               res.status(200).json({ message: "Update Resultado com sucesso" });
             } else {
               res.status(401).json({ message: "Nao autorizado!" });
             }
           }).catch(error => {
             res.status(500).json({
               message: 'Update de resultado falhou!'
             });
           }); */

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

    /* 
        const testDate = new Test({
            nomeUtente: req.body.nomeUtente,
            sns24: req.body.sns24,
            grupoRisco: req.body.grupoRisco,
            trabalhoLocalRisco:req.body.trabalhoLocalRisco,
            dataPrimeiroTeste: req.body.dataPrimeiroTeste
          });
          Test.update({ _id: req.params.id }, testDate)
            .then(result => {
              if (result.n > 0) {
                res.status(200).json({ message: "Marcação primeiro teste com sucesso" });
              } else {
                res.status(401).json({ message: "Nao autorizado!" });
              }
            }).catch(error => {
              res.status(500).json({
                message: 'Marcação primeiro teste falhou!'
              });
            }); */

}

const scheduleSecondTest = async(req, res) => {
    const oldTest = await Test.findByIdAndUpdate(
        req.params.userId, { dataSegundoTeste: req.body.dataSegundoTeste }
    )

    const newTest = await Test.findById(
        req.params.userId,
    )

    res.send({
        old: oldTest,
        new: newTest
    })

    /*  const testDate = new Test({
         nomeUtente: req.body.nomeUtente,
         sns24: req.body.sns24,
         grupoRisco: req.body.grupoRisco,
         trabalhoLocalRisco:req.body.trabalhoLocalRisco,
         dataSegundoTeste: req.body.dataSegundoTeste
       });
       Test.update({ _id: req.params.id }, testDate)
         .then(result => {
           if (result.n > 0) {
             res.status(200).json({ message: "Marcação segundo teste com sucesso" });
           } else {
             res.status(401).json({ message: "Nao autorizado!" });
           }
         }).catch(error => {
           res.status(500).json({
             message: 'Marcação segundo teste falhou!'
           });
         }); 
         */
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
    scheduleSecondTest,
    updateFirstResult
}