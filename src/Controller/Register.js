
const { response } = require('express');
const pool = require('../DataBase/DataBase');
const bcrypt = require('bcrypt');


const createUsers = async ( req, res = response ) => {

    const { username, email, passwordd } = req.body;

    const salt = bcrypt.genSaltSync();
    const pass = bcrypt.hashSync( passwordd, salt );

    const hasEmail = await pool.query('SELECT email FROM users WHERE email = ?', [email]);

    if( hasEmail.length == 0 ){

        await pool.query(`CALL SP_REGISTER_USER(?,?,?);`, [ username, email, pass ]);

        return res.json({
            resp: true,
            msj : 'Usuario ' + username +' fue creado con exito!'
        });
    
    } else {

        return res.json({
            resp: false,
            msj : 'El correo ya se encuentra registrado!'
        }); 
    }
};







module.exports = {
    createUsers
};