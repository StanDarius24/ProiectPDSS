import { Component, OnInit } from '@angular/core';
import {FireBaseServiceService} from "../../../core/services/fire-base-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-about',
  templateUrl: './user-products.component.html',
  styleUrls: [
    '../../style/style.scss',
    './user-products.component.scss']
})
export class UserProductsComponent implements OnInit {
  product:any;
  constructor(public firebaseservice:FireBaseServiceService, public route:ActivatedRoute, public router:Router ) { }
  nume:String;
  mesaj="";
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.nume=params['name']
    });

    this.firebaseservice.get_Products().subscribe(data =>{

      this.product = data.map(e => {
        return {
          id: e.payload.doc.id,
          Nume: e.payload.doc.data()['Nume'],
          Pret: e.payload.doc.data()['Pret'],
          Categorie: e.payload.doc.data()['Categorie'],
          Descriere: e.payload.doc.data()['Descriere'],
          Filtru1: e.payload.doc.data()['Filtru1'],
          Filtru2: e.payload.doc.data()['Filtru2'],
          Filtru3: e.payload.doc.data()['Filtru3'],
          Filtru4: e.payload.doc.data()['Filtru4'],
          URL: e.payload.doc.data()['URL'],
          Vanzator : e.payload.doc.data()['Vanzator'],
        }
      }).filter(data => data.Vanzator === this.nume);


      console.log(this.product);
    });


  }
  sterge(prd:any):void {
    console.log(prd.id);
    this.mesaj="Produs sters :D";
    this.firebaseservice.delete_Product(prd.id);
  }
  modifica(txt:string){
    this.router.navigate(['modified',txt]).then();

  }
}
