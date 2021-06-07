const { response } = require('express');
const pool = require('../DataBase/DataBase');


const addFavoriteProduct = async ( req, res = response ) => {

    const { uidProduct, uidUser } = req.body;

    const rows = await pool.query('SELECT product_id, user_id FROM favorite WHERE product_id = ? AND user_id = ?', [ uidProduct, uidUser ]);

    if( rows.length == 0 ){

        await pool.query(`CALL SP_ADD_PRODUCT_FAVORITE(?,?);`, [ uidProduct, uidUser ]);

        res.json({
            resp: true,
            msj : 'Product add to Favorite'
        });

    } else {

        await pool.query(`CALL SP_DELETE_PRODUCT_FAVORITE(?,?);`, [uidProduct, uidUser]);

        res.json({
            resp: true,
            msj : 'Delete Product to Favorite'
        });

    }
};


const productFavoriteForUser = async ( req, res = response ) => {

    const uidUser = req.uid;

    const rows = await pool.query(`CALL SP_LIST_FAVORITE_PRODUCTS(?);`, [ uidUser ]);

    const listProducts = rows[0];

    res.json({
        resp: true,
        msj : 'List to products favorites',
        favorites: listProducts
    });
}


const saveOrderProducts = async ( req, res = response ) => {

    const { receipt, date, amount, products  } = req.body;
    const uid = req.uid;
 
    const db = await pool.query('INSERT INTO orderBuy (user_id, receipt, datee, amount) VALUES (?,?,?,?)', [ uid, receipt, date, amount ]);

    products.forEach(e => {
        pool.query('INSERT INTO orderDetails (orderBuy_id, product_id, quantity, price) VALUES (?,?,?,?)', [db.insertId, e.uidProduct, e.amount, e.price]);
    });

    return res.json({
        resp: true,
        msj : 'Products save'
    });

}


const getPurchasedProducts = async ( req, res = response ) => {

    const uid = req.uid;

    const orderbuy = await pool.query('SELECT uidOrderBuy, receipt, datee, amount FROM orderBuy WHERE user_id = ?', [uid]);

    console.log(orderbuy);

    const orderDetails = await pool.query(`CALL SP_ORDER_DETAILS(?);`, [orderbuy[0].uidOrderBuy]);

    res.json({
        resp: true,
        msg : 'Get Puchased Products',
        orderBuy : orderbuy,
        orderDetails: orderDetails[0]
    });
}

const getProductsForCategories = async ( req, res = response) => {


    const rows = await pool.query('SELECT * FROM products WHERE category_id = ?', [ req.params.id  ]); 

    res.json({
        resp: true,
        msj : 'List Products',
        products: rows 
    });

}

module.exports = {
    addFavoriteProduct,
    productFavoriteForUser,
    saveOrderProducts,
    getPurchasedProducts,
    getProductsForCategories
}