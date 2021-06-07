const jwt = require('jsonwebtoken');



const generarJsonWebToken = ( uid ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.KEY_JWTOKEN, { 
            expiresIn: '12h'
        }, ( err, token ) => {

            if( !err ){ resolve( token ); }
            else { reject( 'No se puedo generar el Token' ); }

        });

    });   
}

module.exports = {
    generarJsonWebToken,
}