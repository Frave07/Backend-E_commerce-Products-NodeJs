
const {response} = require('express');
const bcrypt = require('bcrypt');
const { generarJsonWebToken } = require('../Helpers/JWToken');
const Users = require('../Models/Users');


const LoginUsuario = async ( req, res = response ) => {

    const { email, passwordd } = req.body;

    Users.findOne({ email: email }, async ( err , usersdb ) => {

        if( err ){
            return res.status(500).json({
                resp: false,
                msj : 'Error en el login',
                err
            });
        }

        if( !usersdb ){
            return res.status(400).json({
                resp: false,
                msj : 'Wrong Credentials'
            }); 
        }

        if( !bcrypt.compareSync( passwordd, usersdb.passwordd )){
            return res.status(400).json({
                resp: false,
                msj : 'Wrong Credentials'
            });
        }

        let token = await generarJsonWebToken( usersdb.person_id );

        res.json({
            resp: true,
            msj : 'Welcome to Frave Shop',
            users: { 'id': usersdb.person_id, 'email': usersdb.email, 'users' : usersdb.users, 'profile' : usersdb.image },
            token: token
        });


    });
}



const RenweToken = async ( req, res = response ) => {

   const uid = req.uid;

   const token = await generarJsonWebToken( uid );

    Users.findOne({ person_id: uid }, ( err, usersdb ) => {

        console.log(usersdb);

        if( err ){
            return res.status(500).json({
                resp: false,
                msj : 'Error renew en el login',
                err
            });
        }

        res.json({
            resp: true,
            msj : 'Welcome to Frave Shop',
            users: { 'id': usersdb.person_id, 'email': usersdb.email, 'users' : usersdb.users, 'profile' : usersdb.image },
            token: token
        });

    });

}


module.exports = {
    LoginUsuario,
    RenweToken,
};