const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Código em falta

const createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                password: hash,
                role: req.body.role
            });    
            user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: 'Utilizador criado!',
                        result: result
                    });  
                     
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            });   
            /* 
            console.log(user)
            res.redirect(`/${user._id}`) */
}

const loginUser = (req, res, next) => {
    let fetchedUser;

    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }

            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })

    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

        const token = jwt.sign({ username: fetchedUser.username, userId: fetchedUser._id },
            'segredo_para_a_criacao_dos_tokens', { expiresIn: '30m' }
        );

        const message = "Login successful"

        res.status(200).json({
            message,
            token,
            expiresIn: 1800,
            userId: fetchedUser._id,
            name: fetchedUser.name,
            role: fetchedUser.role
        });
    })

    .catch(err => {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    });
}

const getUserById=async(req,res)=>{
    try {
		const user = await User
			.findById(req.params.userId)
			.catch((e) => {
				return null
            })
            res.send(user)
         //  res.render("../views/userView",{user:user})
        } catch (e) {
		console.error(e)
		res.status(404)
		res.send(null)
	}

}

const updateUser= async(req,res)=>{
    const oldUser=await User.findByIdAndUpdate(
        req.params.userId,
        req.body
        )
    const newUser= await User.findById(
        req.params.userId
    )

    res.send({
        old: oldUser,
        new: newUser
    })
}

const deleteUser= async (req,res)=>{
    const deleteUser=await User.findByIdAndDelete(req.params.userId)
    res.send(deleteUser)
}

const getSign= async(req,res)=>{
    res.render("../views/signupUser")
} 

const getLog= async(req,res)=>{
    res.render("../views/login")
}
 

module.exports = {
    //Código em falta
    createUser,
    loginUser,
    getUserById,
    updateUser,
    getSign,
    getLog, 
    deleteUser
}