const homeCarousel = require('../Models/home_carouse');
const Category = require('../Models/category');
const Products = require('../Models/Products');

const AddhomeCarousel = async (req, res) => {

    await homeCarousel.insertMany([
        {
            "image": "home-hogar-slide-1.jpg",
            "category": "hogar"
        },
        {
            "image": "home-games-slide-2.jpg",
            "category": "Games"
        },
        {
            "image": "home-ropa-slide-3.jpg",
            "category": "Ropa"
        },
        {
            "image": "home-tec-slide-4.jpg",
            "category": "Tec"
        },
        {
            "image": "home-entrena-slide-5.jpg",
            "category": "Fitness"
        },
        {
            "image": "home-tecnologia-slide-6.jpg",
            "category": "Tecnologies"
        },
        {
            "image": "home-free-slide-7.jpg",
            "category": "Delivery Free"
        }
    ]);

    res.json({
        resp: true
    });
}


const addCategoryStatic = async (req, res) => {

    await Category.insertMany([
        {
            "category": "home",
            "picture": "hogar-categories.svg"
        },
        {
            "category": "Computing",
            "picture": "ordenador-portatil.svg"
        },
        {
            "category": "Home Appliances",
            "picture": "electrodomestico.svg"
        },
        {
            "category": "Sport and Fitness",
            "picture": "fitness.svg"
        },
        {
            "category": "Toys",
            "picture": "juguetes.svg"
        },
        {
            "category": "Belleza y Cuidado",
            "picture": "belleza.svg"
        },
        {
            "category": "Accesorios Vehiculo",
            "picture": "coche.svg"
        },
        {
            "category": "Cell Phones",
            "picture": "smartphone.svg"
        },
        {
            "category": "Audio y Video",
            "picture": "microfono.svg"
        },
        {
            "category": "Clothing",
            "picture": "camiseta.svg"
        },
        {
            "category": "Autos, Motos",
            "picture": "autos-motos.svg"
        },
        {
            "category": "Jewels",
            "picture": "joyas.svg"
        },
        {
            "category": "Console and video games",
            "picture": "videojuegos.svg"
        },
        {
            "category": "Pets",
            "picture": "animales.svg"
        },
        {
            "category": "Camara",
            "picture": "camaras.svg"
        },
        {
            "category": "Oficinas",
            "picture": "oficinas.svg"
        },
        {
            "category": "Music and Movies",
            "picture": "musica-pelicula.svg"
        },
        {
            "category": "Health",
            "picture": "salud.svg"
        },
        {
            "category": "Babies",
            "picture": "bebes.svg"
        },
        {
            "category": "Tools",
            "picture": "herramientas.svg"
        },
        {
            "category": "Books and Papers",
            "picture": "libros.svg"
        },
        {
            "category": "Services",
            "picture": "servicios.svg"
        },
        {
            "category": "Regards",
            "picture": "recuerdos.svg"
        },
        {
            "category": "Electronics",
            "picture": "electronica.svg"
        },
        {
            "category": "Others",
            "picture": "otros-app.svg"
        }
    ]);

    res.json({
        resp: true,
        msj : 'Data inserted correctly - Category'
    });

} 


const addProductsStatic = async ( req, res ) => {

    await Products.insertMany([
        {
            "nameProduct": "Apple iPhone 11 Pro 64 Gb",
            "description": "EQUIPOS NUEVOS, LIBRES DE FABRICA CON BOLETA DE VENTA. ¡SE BRINDA 12 MESES DE GARANTIA!!!!!",
            "codeProduct": "0000001",
            "stock" : 15,
            "price": 4890.90,
            "status": "active",
            "picture": "Apple-iPhone-11-Pro-64-Gb.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1b"
        },
        {
            "nameProduct": "Audifono Gamer G935 Lightspeed Wireless",
            "description": "Entregamos Factura y/o Boleta, todos los precios incluyen IGV",
            "codeProduct": "0000002",
            "stock" : 10,
            "price": 619.00,
            "status": "active",
            "picture": "Audifono-Gamer-G935-Lightspeed-Wireless.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1c"
        },
        {
            "nameProduct": "Audífonos Inalámbricos Con Noise Cancelling Wh1000 xm4",
            "description": "Los intuitivos e inteligentes audífonos WH-1000XM4 te ofrecen nuevas mejoras en la tecnología de noise cancelling líder del sector ",
            "codeProduct": "0000003",
            "stock" : 10,
            "price": 1000.06,
            "status": "active",
            "picture": "Audífonos-Inalámbricos-Con-Noise-Cancelling-Wh-1000xm4.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1c"
        },
        {
            "nameProduct": "Drone Dji Mavic 2 Pro Capacitación Mtc",
            "description": "DRONE DJI MAVIC 2 PRO",
            "codeProduct": "0000004",
            "stock" : 15,
            "price": 1725.25,
            "status": "active",
            "picture": "Drone-Dji-Mavic-2-Pro-Capacitación-Mtc.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d2b"
        },
        {
            "nameProduct": "Laptop Asus Vivobook 15",
            "description": "LAPTOP ASUS VIVOBOOK SD512DA Ryzen 5 3500U Quad-Core 512GB SSD + Integrated AMD Radeon Vega 8 Graphics",
            "codeProduct": "0000005",
            "stock" : 14,
            "price": 3000,
            "status": "active",
            "picture": "laptop-asus.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d15"
        },
        {
            "nameProduct": "Laptop Asus Rog Zephirus G14",
            "description": "AMD RYZEN 7-4800HS 2.9GHZ, 8GB DDR4, 512GB SSD, 14 FHD (1920x1080) 120HZ, NVIDIA GEFORCE GTX 1650 4GB, NO WEBCAM, BLUETOOTH, WINDOWS 10, COLOR ECLIPSE GREY, TECLADO EN INGLES",
            "codeProduct": "0000006",
            "stock" : 16,
            "price": 5952.00,
            "status": "active",
            "picture": "Laptop-Asus-Rog-Zephirus-G14.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d15"
        },
        {
            "nameProduct": "Lentes De Realidad Virtual Vr Oculus Quest",
            "description": "EN STOCK OCULUS QUEST 2!!! ENTREGA INMEDIATA, TIENDA FISICA, GARANTIA, COMPLETAMENTE SELLADO",
            "codeProduct": "0000007",
            "stock" : 20,
            "price": 2500.00,
            "status": "active",
            "picture": "Lentes-De-Realidad-Virtual-Vr-Oculus-Quest.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d2b"
        },
        {
            "nameProduct": "Mochila Lona Canvas",
            "description": "Mochila Hombre Lona Canvas Importada Vintage Bolso Maletin",
            "codeProduct": "0000008",
            "stock" : 11,
            "price": 500.00,
            "status": "active",
            "picture": "Mochila-Hombre-Lona-Canvas-Importada-Vintage-Bolso-Maletin.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1d"
        },
        {
            "nameProduct": "Mouse Logitech G Pro Wireless Hero 25k",
            "description": "Mouse-Logitech-G-Pro-Wireless-Hero-25k.jpg",
            "codeProduct": "0000009",
            "stock" : 12,
            "price": 832.00,
            "status": "active",
            "picture": "Mouse-Logitech-G-Pro-Wireless-Hero-25k.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d15"
        },
        {
            "nameProduct": "Samsung S21 Ultra 5G",
            "description": "Samsung-S21-Ultra-5g-256gb-12ram.jpg",
            "codeProduct": "0000010",
            "stock" : 22,
            "price": 5962.00,
            "status": "active",
            "picture": "Samsung-S21-Ultra-5g-256gb-12ram.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1b"
        },
        {
            "nameProduct": "Tv Xiaomi 43 Ultra Hd Smart",
            "description": "Tv Xiaomi 43 Ultra Hd Smart",
            "codeProduct": "0000011",
            "stock" : 6,
            "price": 3520.00,
            "status": "active",
            "picture": "Tv-Xiaomi-43-Ultra-Hd-Smart.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1c"
        },
        {
            "nameProduct": "Laptop Lenovo 14 W Amd A6",
            "description": "Laptop-Lenovo-14-W-Amd-A6",
            "codeProduct": "0000012",
            "stock" : 11,
            "price": 1599.00,
            "status": "active",
            "picture": "Laptop-Lenovo-14-W-Amd-A6.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d15"
        },
        {
            "nameProduct": "Macbook Pro 13 Chip M1 Apple",
            "description": "Macbook-Pro-13-Chip-M1-Apple",
            "codeProduct": "0000013",
            "stock" : 10,
            "price": 6499.00,
            "status": "active",
            "picture": "Macbook-Pro-13-Chip-M1-Apple.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d15"
        },
        {
            "nameProduct": "Laptop Asus Zenbook 14",
            "description": "Laptop-Asus-Zenbook-14",
            "codeProduct": "0000014",
            "stock" : 19,
            "price": 3499.00,
            "status": "active",
            "picture": "Laptop-Asus-Zenbook-14.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d15"
        },
        {
            "nameProduct": "Laptop Lenovo Ideapadflex",
            "description": "Laptop-Lenovo-Ideapadflex",
            "codeProduct": "0000015",
            "stock" : 6,
            "price": 4599.00,
            "status": "active",
            "picture": "Laptop-Lenovo-Ideapadflex.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d15"
        },
        {
            "nameProduct": "Laptop Asus Rog Strix G512li-bi7n10",
            "description": "Laptop-Asus-Rog-Strix-G512li-bi7n10",
            "codeProduct": "0000016",
            "stock" : 8,
            "price": 5059.00,
            "status": "active",
            "picture": "Laptop-Asus-Rog-Strix-G512li-bi7n10.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d15"
        },
        {
            "nameProduct": "Laptop Lenovo Celeron",
            "description": "Laptop Lenovo Celeron",
            "codeProduct": "0000017",
            "stock" : 6,
            "price": 1059.00,
            "status": "active",
            "picture": "Laptop-Lenovo-Celeron.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d15"
        },
        {
            "nameProduct": "Apple iPhone 11 128gb",
            "description": "Apple iPhone 11 128gb",
            "codeProduct": "0000018",
            "stock" : 18,
            "price": 3149.00,
            "status": "active",
            "picture": "Apple-iPhone-11-128gb.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1b"
        },
        {
            "nameProduct": "Samsung Galaxy A12",
            "description": "Samsung Galaxy A12",
            "codeProduct": "0000019",
            "stock" : 15,
            "price": 658.00,
            "status": "active",
            "picture": "Samsung-Galaxy-A12.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1b"
        },
        {
            "nameProduct": "Xiaomi Poco X3 Nfc",
            "description": "Xiaomi Poco X3 Nfc",
            "codeProduct": "0000020",
            "stock" : 16,
            "price": 1169.00,
            "status": "active",
            "picture": "Xiaomi-Poco-X3-Nfc.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1b"
        },
        {
            "nameProduct": "iPhone 12 Pro Max",
            "description": "iPhone 12 Pro Max",
            "codeProduct": "0000021",
            "stock" : 17,
            "price": 5499.00,
            "status": "active",
            "picture": "iPhone-12-Pro-Max.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1b"
        },
        {
            "nameProduct": "Xiaomi Redmi Note 10",
            "description": "Xiaomi Redmi Note 10",
            "codeProduct": "0000022",
            "stock" : 14,
            "price": 889.00,
            "status": "active",
            "picture": "Xiaomi-Redmi-Note-10.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1b"
        },
        {
            "nameProduct": "Samsung Galaxy A71",
            "description": "Samsung Galaxy A71",
            "codeProduct": "0000023",
            "stock" : 14,
            "price": 1669.00,
            "status": "active",
            "picture": "Samsung-Galaxy-A71.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1b"
        },
        {
            "nameProduct": "Samsung Galaxy S20+",
            "description": "Samsung Galaxy S20+",
            "codeProduct": "0000024",
            "stock" : 11,
            "price": 3399.00,
            "status": "active",
            "picture": "Samsung-Galaxy-S20+.jpg",
            "category_id" :"60ff4ea2071b3b2cb0951d1b"
        }
    ]);

    res.json({
        resp: true,
        msj : 'Data inserted correctly - Products'
    });

}


module.exports = {
    AddhomeCarousel,
    addCategoryStatic,
    addProductsStatic
}