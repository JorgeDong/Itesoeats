import { Producto } from '../producto';

export class Orden {

    constructor( id = "", date = '', status= "true", cart : Array<Producto> ) {
        this.date = date;
        this.status = status;
        this.cart = cart;
        this.store = "";
        this._id = id;
    }

    _id: string;
    date: string;
    status: string;
    store: string;
    cart: Producto[];

}
