const { response } = require('express');
const pool = require('../DataBase/DataBase');

const HomeCarouselSilder = async ( req, res = response ) => {

    const rows = await pool.query('SELECT * FROM Home_carousel');

    if( rows.length > 0 ){

        return res.json({
            resp: true,
            msj: 'List Images - Home ',
            slider: rows
        });
    
    } else {

        return res.json({
            resp: false,
            msj: 'Without List of images'
        });
    }
}


const ListCategoriesHome =  async ( req, res = response ) => {

    const categories = await pool.query('SELECT * FROM category LIMIT 10');

    if( categories.length > 0 ){

        return res.json({
            resp: true,
            msj : 'List categories',
            categories : categories
        });

    } else {
        return res.json({
            resp: false,
            msj : 'Without List of Categories'
        });
    }
}


const ListProductsHome = async ( req, res = response ) => {

    const products = await pool.query(`CALL SP_LIST_PRODUCTS_HOME();`);

    if( products[0].length > 0 ){

        return res.json({
            resp: true,
            msj : 'List Products Home',
            products: products[0]
        });

    } else {
        
        return res.json({
            resp: false,
            msj : 'Without List Products' 
        });
    }
}


const ListCategoriesAll = async ( req, res = response ) => {

    const category = await pool.query('SELECT * FROM Category');

    if( category.length > 0 ){

        return res.json({
            resp: true,
            msj : 'List Categories All',
            categories : category
        });

    } else {
        return res.json({
            resp: false,
            msj : 'Witout List Categories' 
        }); 
    }
}




module.exports = {
    HomeCarouselSilder,
    ListCategoriesHome,
    ListProductsHome,
    ListCategoriesAll
}