import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyCDQ1yo1tECARVlf6iJVbazSBSO9ELlgxM',
      authDomain: 'reservation-system-199118.firebaseapp.com',
    });
  }
}
