
const { response } = require('express');
const Users = require('../Models/Users');
const bcrypt = require('bcrypt');
const Person = require('../Models/Person');


const createUsers = async ( req, res = response ) => {

    const { username, email, passwordd } = req.body;

    const salt = bcrypt.genSaltSync();
    const pass = bcrypt.hashSync( passwordd, salt );

    const person = new Person({
        firstName: username
    });


    person.save( (err, persondb ) => {

        if( err ){
            return res.status.apply(400).json({
                resp: false,
                msj : 'Error al insertar datos person',
                err
            });
        }

        const user = new Users({
            users: username,
            email: email,
            passwordd: pass,
            person_id: persondb._id
        });

        user.save( (err, userdb ) => {

            if( err ){
                return res.status(400).json({
                    resp: false,
                    msj : 'Email already exists' ,
                    err
                });
            }
    
            res.json({
                resp: true,
                msj: 'User ' + userdb.users + ' was created successfully',
            })
    
        });

    });

    
};







module.exports = {
    createUsers
};