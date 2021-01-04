import { Component, OnInit } from '@angular/core';
import { FireBaseServiceService } from 'src/app/service/fire-base-service.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    '../style/style.scss',
    './home.component.css']
})
export class HomeComponent implements OnInit {
  product:any;
  constructor(public firebaseservice:FireBaseServiceService,public router:Router) { }

  ngOnInit(): void {
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

      console.log(this.product);
  });
  }
  selectProduct(txt:String)
  {
    this.router.navigate(['produs',txt]).then();
  }
}
