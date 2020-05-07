const Test = require('../models/Test')

const createOrder = (req, res, next) => {
    const test = new Test({
        nome: req.body.nomeUtente,
        sns24: req.body.sns24,

    })

    const revenda = new Revenda({
        nome: req.body.nome,
        marca: req.body.marca,
        modelo: req.body.modelo,
        descricao: req.body.descricao,
        imagePath: url + "/images/" + req.file.filename,
        criador: req.userData.userId,
        preco: req.body.preco,
        data: req.body.data,
        tempo: req.body.tempo,
        aceite: req.body.aceite,
        comprador: null
    });
    revenda.save().then(revendaCriada => {
        res.status(201).json({
            message: 'Revenda adicionada com sucesso',
            revenda: {
                ...revendaCriada,
                id: revendaCriada._id
            }
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Criacao de revenda falhou!!'
        });
    });
}

module.exports = {

}