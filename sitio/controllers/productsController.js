const fs = require('fs');
const path = require('path')
const {productos, guardar} = require('../data/products_db');
const categorias = require('../data/categories_db');
const {validationResult} = require('express-validator');



module.exports = {
    create : (req,res) => {
       return res.render('productAdd',{
            categorias, 
            productos
        })
    },
    
    store : (req, res) => {
        const validacion = validationResult(req)
        
        if(validacion.errors.length>0){
            const locals = {
                categorias,
                productos,
                old:req.body,
                errors:validacion.mapped()
            }
            return res.render('productAdd', locals)
        } 
        let imagenes = [];
        if (req.files){
            req.files.forEach(imagen => {
                imagenes.push(imagen.filename)
            })
        }
        
		let producto = {
			id:productos[productos.length-1].id+1,
			title: req.body.title,
			price: +req.body.price,
			images: imagenes,
			category: req.body.category,
			description:req.body.description,
		};
		productos.push(producto)
		fs.writeFileSync(path.join(__dirname,'../data/products.json'),JSON.stringify(productos))
		res.redirect('/')
	},
    detail : (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);

        return res.render('productDetail',{
            producto,
            productos
        })
    },
    edit : (req, res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);

        return res.render('productEdit',{
            categorias,
            producto
        })
    },
    update : (req, res) => {
        const validacion = validationResult(req)
        let producto = productos.find(producto => producto.id === +req.params.id)
      
        // res.send(req.body)
        const {title, description,price, category} = req.body;
        
        if(validacion.errors.length>0){
            const locals = {
                categorias,
                producto,
                old:req.body,
                errors:validacion.mapped()
            }
            return res.send(validacion.errors)
        } 
        if(req.files.length !=0){
            var imagenes = req.files.map(imagen => imagen.filename)
        }
       
        let productoEditado = {
            id : +req.params.id,
            title,
            description,
            category,
            price : +price,
            images : req. files.length !=0 ? imagenes : producto.images
            
        }

        let productosModificados = productos.map(producto => producto.id === +req.params.id ? productoEditado : producto)
      
        guardar(productosModificados)
        res.redirect('/')
        },

    destroy :(req,res) => {
        let productoModificado = productos.filter(producto => producto.id != +req.params.id)
        guardar(productoModificado)
     res.redirect('/')
    },
    search : (req, res) => {
        let resultado = productos.filter(producto => producto.title.toLowerCase().includes(req.query.keywords.toLowerCase())||producto.description.toLowerCase().includes(req.query.keywords.toLowerCase()))
        return res.render('resultado',{
            productos : resultado,
            keywords : req.query.keywords
        })
    }
}