import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Producto } from '../../producto';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductoCrearComponent } from '../../producto-crear/producto-crear.component';
import { ProductoService } from '../../producto.service';
import { DatePipe } from '@angular/common';
import { Orden } from '../../models/orden';

declare var M: any;


@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css'],
  providers: [DatePipe]
})
export class ProductoListaComponent implements OnInit {
  myDate = new Date();
  date : string;
  
 
 precio = ''
 precio2 = ''
 nombre = '';
 flag = false;
 interval: any;

  direction: 'row';
  productos: Producto[];
  carrito: Producto[];
  tmp: Producto[];
  tmp2: Producto[];
  private subscript: Subscription;
  modoCarrito = false;
  error = false;
  count = 0;
  suma = 0;
  ordenarPorPrecioValue=false;
  ordenarPorNombreValue=false;
  ordenarPorDisponible=false;
  getId=[];

  constructor(private productosService: ProductoService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private datePipe: DatePipe) { 
                this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
                
              }


              ngOnInit() {
                this.productos=[];
                this.productosService.currentLength=0;
               
                this.carrito = this.productosService.getCarrito();
                this.tmp = null;
            
                this.getId= this.router.url.split('/');
                this.productosService.getProductos2().subscribe(res => {
                  this.productos = res as Producto[];
                
                  this.productosService.setProductos(this.productos);
            
            
                })
                
            
                if(this.getId.length==3){
                  this.productosService.getProductoById2(this.getId[2]).subscribe(res => {
                    this.productos = res as Producto[];
                    
                    
                  })
                }
                else{
                  this.productosService.getProductos2().subscribe(res => {
                    this.productos = res as Producto[];
                    this.productosService.lastId=this.productos.length;
            
                  })
                }
                console.log(this.getId[2]);
            
                if (this.router.url == '/productos' || this.router.url== ('/tienda/'+this.getId[2])) {
                  this.modoCarrito = false;
                } else {
                  this.modoCarrito = true;
                }
            
            
                //  this.refreshData();
                 
                /*this.interval = setInterval(() => { 
                      this.refreshData(); 
                  }, 1500);*/
              }
              ngDoCheck()	{
                
               
              //this.filtrar();
              //this.filtroPorTienda();
                
            
              }
            
              refreshData(){
                
            
                  if(this.getId.length==3){
                this.productos=this.productosService.getProductosbyId(this.getId[2]);
                this.filtrar(this.productos);
              }
                else {
                 this.productos= this.productosService.getProductos();
                 this.filtrar(this.productos);
                }
              
              }
            
            
              openCreate(): void {
                let tmp=[];
                tmp=this.router.url.toString().split('/');
                  this.productosService.sendTiendaId(tmp[2]);
            
                const dialogRef = this.dialog.open(ProductoCrearComponent, {
                  width: '350px'
                });
                dialogRef.afterClosed().subscribe(result => {
                
                  if(result) {
                    let tmp=this.productosService.returnNewProducto();
                    
                    this.productosService.getProductos2().subscribe(res => {
                      this.tmp2 = res as Producto[];
                      console.log(this.tmp2);
                      this.productosService.CreateProduct(tmp, this.getId[2]);
                    })
                   // tmp.tiendaId=this.productosService.getTiendaId();
                   
                    //tmp2.length=this.productosService.lastId;
                  
                    //this.productoservice.addToCart1(this.producto);
            
                  }
                });
              }
            
            
            
             
            
             
            
              detalle(p: Producto) {
                this.router.navigate([p.id], {relativeTo: this.route});
              }
            
              borrar(p: Producto) {
                this.productosService.borrarProducto(p.id);
                this.carrito = this.productosService.getCarrito();
                this.sumar();
              }
            
            
            
              sumar() {
                this.suma = 0;
                if (this.carrito != null){
                this.carrito.forEach(pro => this.suma = pro.precio*pro.cantidad + this.suma);
                return this.suma;
              }
              else{
                return 0;
              }
                };
            
                filtroPorTienda(){
                  if(this.getId.length==3){
                    this.productosService.getProductoById2(this.getId[2]).subscribe(res => {
                      this.productos = res as Producto[];
                      this.productos = this.productos.filter(p => p.tiendaId==Number(this.getId[2]));
                      return this.productos.slice();
                    })
                  }   
                  return this.productos.slice();
                }
            
                filtrar(productos: Producto[]){
                  if(this.precio2=='')
                  this.precio2='9999999';
                     this.productos = productos.filter(p => p.precio >= Number(this.precio) && p.precio <= Number(this.precio2) && p.nombre.toUpperCase().match(this.nombre.toUpperCase()));
                     if(this.precio2=='9999999')
                     this.precio2='';//g
                    
                     if(this.ordenarPorPrecioValue==false&&this.flag==true){
                     this.productos.sort((a,b) =>(a.nombre>b.nombre)?1: -1);
                     }
                    
                     if(this.ordenarPorPrecioValue==true){
                      console.log("fsdfds");
                     this.productos.sort((a, b) => (a.precio > b.precio) ? 1 : -1);
                     }
                    
            
                     if(this.ordenarPorDisponible==true){
                       this.productos=this.productos.filter(p=> p.disponible==true);
                     }
                     
              }
            
              
            
                updateMostrarDisponible(event){
                  if(event.target.checked) {   
                    this.ordenarPorDisponible= true;
                  }
              
                  else if( !event.target.checked){
                    this.ordenarPorDisponible= false;
            
              
                  }
                }
                updateOrdenarPrecio(event){
                  this.flag=true;
                  if(event.target.checked) {   
                    this.ordenarPorPrecioValue= true;
                    this.ordenarPorNombreValue= false;
            
                  }
              
                  else if( !event.target.checked){
                    this.ordenarPorPrecioValue= false;
                    this.ordenarPorNombreValue= true;
            
                  }
                }
            
                updateOrdenarNombre(event){
                this.flag=true;
                  if(event.target.checked) {  
                    this.ordenarPorNombreValue= true;
                    this.ordenarPorPrecioValue=false;
                  }
              
                  else if( !event.target.checked){
                    this.ordenarPorNombreValue= false;
                    this.ordenarPorPrecioValue=true;
            
            
              
                  }
                }
            
                getTotal(){
                  if(this.suma>0){
                    return false;
                  }
                  return true;
                }
            
            
              
    saveOrder(){
      console.log(this.date);
      console.log('Confirmar pedidos');
      this.productosService.saveOrder(this.date)
        .subscribe(res => {
          M.toast({html: 'Save successfully'});
        });
    }
   

    getOrders() {
      this.productosService.getOrders()
        .subscribe(res => {
          this.productosService.orden = res as Orden[];
          console.log(this.productosService.orden = res as Orden[]);
        });
        
    }
}