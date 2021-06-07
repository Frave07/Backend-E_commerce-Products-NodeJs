const { response } = require('express');
const fs = require('fs-extra');
const path = require('path');
const pool = require('../DataBase/DataBase');


const changeFotoProfile = async ( req, res = response ) => {

    const { uidPerson } = req.body;
    const pathNew = req.file.filename;

    const rows = await pool.query('SELECT image FROM person WHERE uid = ?', [ uidPerson ]);

    if( rows[0].image != '' ){
        await fs.unlink(path.resolve('src/Uploads/Profile/'+rows[0].image))
    }

    await pool.query(`CALL SP_SAVE_IMAGE_PROFILE(?,?);`, [ pathNew, uidPerson ]);

    return res.json({
        resp: true,
        msj : 'Updated image',
        profile : pathNew
    });
}


const userPersonalRegister = async ( req, res = response ) => {

    const { name, lastname, phone, address, reference } = req.body;
    const uid = req.uid;

    await pool.query(`CALL SP_REGISTER_PERSONAL(?,?,?,?,?,?);`, [ uid, name, lastname, phone, address, reference ]);

    return res.json({
        resp: true,
        msj : 'Infomation personal added'
    });
}

const updateStreetAddress = async ( req, res = response ) => {

    const { address, reference } = req.body;
    const uid = req.uid;

    await pool.query(`CALL SP_UPDATE_STREET(?,?,?);`, [ uid, address, reference ]);
    
    return res.json({
        resp: true,
        msj : 'Street Address updated',
    });

}

const getPersonalInformation = async ( req, res = response ) => {

    const uid = req.uid;

    const user = await pool.query('SELECT firstName, lastName, phone, address, reference FROM person WHERE uid = ?', [ uid ]);
    
    return res.json({
        resp: true,
        msj : 'Get personal Information',
        information: user[0]
    });
}



module.exports = {
    changeFotoProfile,
    userPersonalRegister,
    updateStreetAddress,
    getPersonalInformation
}