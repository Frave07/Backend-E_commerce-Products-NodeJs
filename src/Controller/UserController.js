const { response } = require('express');
const fs = require('fs-extra');
const path = require('path');
const Person = require('../Models/Person');


const changeFotoProfile = async ( req, res = response ) => {

    const uidPerson  = req.uid;
    const pathNew = req.file.filename;

    Person.findById( uidPerson ).exec( async (err, persondb) => {

        if( err ){
            return res.status(500).json({
                resp: false,
                msj : "Error: Change Photo profile "
            });
        }
        console.log(uidPerson);
        console.log('---------------------');

        if( persondb.image != undefined){
            await fs.unlink(path.resolve('src/Uploads/Profile/'+ persondb.image));
        }

        let updateImage = {
            image: pathNew
        }

        await Person.findByIdAndUpdate( uidPerson, updateImage, { new: true, runValidators: true } );

        res.json({
            resp: true,
            msj : 'Updated image',
            profile : pathNew
        });

    });
}


const userPersonalRegister = async ( req, res = response ) => {

    const { name, lastname, phone, address, reference } = req.body;
    const uid = req.uid;

    let data = {
        firstName: name,
        lastName: lastname,
        phone: phone,
        address: address,
        reference: reference
    };

    await Person.findByIdAndUpdate( uid, data, { new: true, runValidators: true });

    res.json({
        resp: true,
        msj : 'Infomation personal added'
    });

}

const updateStreetAddress = async ( req, res = response ) => {

    const { address, reference } = req.body;
    const uid = req.uid;

    let data = {
        address: address,
        reference: reference
    };

    await Person.findByIdAndUpdate( uid, data, { new: true, runValidators: true } );
    
    res.json({
        resp: true,
        msj : 'Street Address updated',
    });

}

const getPersonalInformation = async ( req, res = response ) => {

    const uid = req.uid;

    Person.findById( uid, (err, persondb) => {

        if( err ){
            return res.status(500).json({
                resp: false,
                msj : 'Error: Get personal Information',
                err
            });
        }

        res.json({
            resp: true,
            msj : 'Get personal Information',
            information: persondb
        });


    });
}



module.exports = {
    changeFotoProfile,
    userPersonalRegister,
    updateStreetAddress,
    getPersonalInformation
}