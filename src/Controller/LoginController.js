
const {response} = require('express');
const pool = require('../DataBase/DataBase');
const bcrypt = require('bcrypt');
const { generarJsonWebToken } = require('../Helpers/JWToken');


const LoginUsuario = async ( req, res = response ) => {

    const { email, passwordd } = req.body;

    const rows = await pool.query(`CALL SP_VALIDATE_LOGIN(?);`, [ email ]);

    if( rows[0].length > 0 ){

        const users = rows[0][0];

        let validatedPassword = await bcrypt.compareSync( passwordd, users.passwordd );

        if( validatedPassword ){

            let token = await generarJsonWebToken( users.persona_id );

            return res.json({
                resp: true,
                msj : 'Welcome to Frave Shop',
                users: { 'id': users.persona_id, 'email': users.email, 'users' : users.users, 'profile' : users.image },
                token: token
            });
        
        } else {

            return res.status(400).json({
                resp: false,
                msj : 'Wrong Credentials',
                users: { 'id': 0000, 'email': 'invalid', 'users' : 'invalid' },
                token: 'invalid'
            });
        }

    } else {

        return res.status(400).json({
            resp: false,
            msj : 'Wrong Credentials',
            users: { 'id': 0000, 'email': 'invalid', 'users' : 'invalid' },
            token: 'invalid'
        });
    }
}

const RenweToken = async ( req, res = response ) => {

   const uid = req.uid;

   const token = await generarJsonWebToken( uid );
   
   const rows = await pool.query(`CALL SP_RENEW_TOKEN(?);`, [ uid ]);

   const users = rows[0][0];

   return res.json({
        resp: true,
        msj : 'Welcome to Frave Shop',
        users: { 'id': users.persona_id, 'email': users.email, 'users' : users.users, 'profile' : users.image },
        token: token
    });
}


module.exports = {
    LoginUsuario,
    RenweToken,
};