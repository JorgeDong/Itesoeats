
const {mongoose} = require('../mongodb/mongodb-connect');
 const { Schema } = mongoose;

const OrderSchema = new Schema({
    id: { type: String, required: true},
    date: { type: String, required: true },
    status: { type: String, required: true },
    cart: { type: Array , required: true}
});

module.exports = mongoose.model('Order', OrderSchema);

// productoSchema = mongoose.Schema
// const OrderSchema = new Schema({
//     id: { type: String, required: true},
//     date: { type: String, required: true },
//     status: { type: String, required: true },
//     cart: { type: Array , required: true}
// });


// const OrderSchema = mongoose.Schema({
//     id: { type: String, required: true},
//     date: { type: String, required: true },
//     status: { type: String, required: true },
//     cart: { type: Array , required: true}
//     });




// m.exports = mongoose.model('Order', OrderSchema);odule
// const Order =  mongoose.model('Order', OrderSchema);

// let newProducto = {
//             id: "4",
//             date: "Hoy",
//             status: "true",
//             cart : [{id:9 ,nombre:"Pizza mexicana",descripcion:"Pizza con los mejores sabores", disponible:true, precio:120,cantidad:1,nota:'', tiendaId:3},
//                     {id:10 ,nombre:"Pizza 3",descripcion:"abores", disponible:true, precio:120,cantidad:1,nota:'', tiendaId:4}
//                 ]
// }

// module.exports = {Order};

// let productoModelo = Order(newProducto);
// productoModelo.save().then((doc) => console.log(doc)).catch((doc) => console.log(err));

