import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Orden } from '../../app/models/orden';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css'],
  providers: [ ProductoService ]
})
export class OrdenComponent implements OnInit {

  constructor(private productoService: ProductoService) { }
  ngOnInit() {
    this.getOrders();
 }

 getOrders() {
  this.productoService.getOrders()
    .subscribe(res => {
      this.productoService.orden = res as Orden[];
      console.log(this.productoService.orden = res as Orden[]);
    });

}

}