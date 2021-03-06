import { Component, OnInit } from '@angular/core';
import { FireBaseServiceService } from 'src/app/core/services/fire-base-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  val:number;
  n:number;
  product: any;
  text1:String;
  text2:String;
  text3:String;
  prov:any;
  nume:String;
  text4:String;
  i1:number;
  i2:number;
  i3:number;
  constructor(public firebaseservice:FireBaseServiceService, public route:ActivatedRoute, public router:Router) { }

  ngOnInit(): void {
    console.log(this.route);

    this.route.params.subscribe(params => {
      this.nume=params['name']
    });

    console.log(this.nume);


    this.firebaseservice.get_Products().subscribe(data =>{

      this.product = data.map(e => {
        return {
          Nume: e.payload.doc.data()['Nume'],
          Pret: e.payload.doc.data()['Pret'],
          Categorie: e.payload.doc.data()['Categorie'],
          Descriere: e.payload.doc.data()['Descriere'],
          Filtru1: e.payload.doc.data()['Filtru1'],
          Filtru2: e.payload.doc.data()['Filtru2'],
          Filtru3: e.payload.doc.data()['Filtru3'],
          Filtru4: e.payload.doc.data()['Filtru4'],
          URL: e.payload.doc.data()['URL'],
        }
      });






      this.n =this.product.length;

      this.i1 = Math.floor(Math.random() * this.n);

      this.i2 = Math.floor(Math.random() * this.n);

      this.i3 = Math.floor(Math.random() * this.n);

      for(var i:number=0;i<this.n;i++)
      {
        if(this.nume == this.product[i].Nume)
          {
            this.val=i;

            this.prov=this.product[i];
          }

      }








   this.testing();

      console.log(this.product);

  });

}
navigate(txt:String)
{
  this.router.navigate(['produs',txt]).then();
  console.log(txt);
}

  gotoproduct(nr:number)
  {
    this.prov = this.product[nr];
    this.testing();

    this.i1 = Math.floor(Math.random() * this.n);

    this.i2 = Math.floor(Math.random() * this.n);

    this.i3 = Math.floor(Math.random() * this.n);

  }

  testing()
  {
    if(this.prov.Categorie=="Autoturisme")
    {
      this.text1="Marca";
      this.text2="Caroserie";
      this.text3="Combustibil";
      this.text4="An";
    }
    else
    if(this.prov.Categorie=="Imobiliare")
    {
      this.text1="Metrii patrati construiti";
      this.text2="Anul constructiei";
      this.text3="Metrii patrati utili";
      this.text4="Utilitati";
    }
    else
    if(this.prov.Categorie=="Electronice")
    {
      this.text1="Tip";
      this.text2="Anul aparitiei";
      this.text3="Sistem de operare";
      this.text4="Marca";
    }
    else
    if(this.prov.Categorie=="Jobs")
    {
      this.text1="Perioada";
      this.text2="Nr Telefon";
      this.text3="Tip job";
      this.text4="Locatie";
    }
  }

}
