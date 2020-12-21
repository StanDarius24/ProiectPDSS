import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseServiceService {

  constructor(public fireservices: AngularFirestore) { }

  create_NewPerson(Record)
  {
    return this.fireservices.collection('Persoane').add(Record);
  }

}
