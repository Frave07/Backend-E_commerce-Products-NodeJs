const { response } = require('express');
const Products = require('../Models/Products');
const Favorite = require('../Models/Favorite');
const OrderBuy = require('../Models/OrderBuy');
const OrderDetails = require('../Models/OrderDetails');

const addFavoriteProduct = async ( req, res = response ) => {

    const { uidProduct, uidUser } = req.body;

    Favorite.findOne({ product_id : uidProduct })
            .exec((err, favoritedb ) => {
                
                if( err ){
                    return res.status(500).json({
                        resp: false,
                        msj : 'Error: Inserted '
                    });
                }

                if( !favoritedb ){

                    new Favorite({
                        product_id : uidProduct,
                        user_id: uidUser
                    }).save();


                    return res.json({
                        resp: true,
                        msj : 'Product add to favorite '
                    });   
                }

                Favorite.findByIdAndRemove(favoritedb._id).exec();

                res.json({
                    resp: true,
                    msj : 'Product delete to favorite'
                })



            });
};


const productFavoriteForUser = ( req, res = response ) => {

    const uidUser = req.uid;

    Favorite.find({ user_id: uidUser })
            .populate('product_id')
            .exec((err, favoritedb) => {

        if( err ){
            return res.status(500).json({
                resp: false,
                msj : 'Error: Without favorite for user',
                err
            });
        }

        res.json({
            resp: true,
            msj : 'List to products favorites',
            favorites: favoritedb
        });

    });
}


const saveOrderProducts = async ( req, res = response ) => {

    const { receipt, date, amount, products  } = req.body;
    const uid = req.uid;

    new OrderBuy({
        user_id: uid,
        receipt: 'Ticket',
        datee: date,
        amount: amount
    }).save((err, orderBuydb) => {

        if( err ){
            return res.status(500).json({
                resp: false,
                msj : 'Error: Insert data Order Buy'
            });
        }

        products.forEach(e => {

            new OrderDetails({
                product_id: e.uidProduct,
                orderBuy_id: orderBuydb._id,
                quantity: e.amount,
                price: e.price
            }).save();

        });

        res.json({
            resp: true,
            msj : 'Products save'
        });

    });
}


const getPurchasedProducts = async ( req, res = response ) => {

    const uid = req.uid;

    OrderBuy.findOne({ user_id: uid }).exec((err, orderBuydb) => {

        if(err){
            return res.status(500).json({
                resp: false,
                msj : 'Error: Get Order Buy '
            });
        }

        OrderDetails.find({ orderBuy_id: orderBuydb._id })
                    .populate('product_id', 'picture nameProduct price')
                    .exec((err, orderDetailsdb) => {

            res.json({
                resp: true,
                msg : 'Get Puchased Products',
                orderBuy : orderBuydb,
                orderDetails: orderDetailsdb
            });

        });

    });
}


const getProductsForCategories = async ( req, res = response) => {


    Products.find({ category_id: req.params.id })
            .populate('category_id', 'category')
            .exec((err, productsdb) => {

                if( err ){
                    return res.status(500).json({
                        resp: false,
                        msj : 'Error: Get Products for ID categories ',
                        err
                    });
                }

                res.json({
                    resp: true,
                    msj : 'List Products for ID Categories',
                    products: productsdb
                });

            });

}

module.exports = {
    addFavoriteProduct,
    productFavoriteForUser,
    saveOrderProducts,
    getPurchasedProducts,
    getProductsForCategories
}