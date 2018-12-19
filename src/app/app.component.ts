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
      apiKey: 'AIzaSyBi7PHboS7R2G76NCJ0fZrQscorWx7oN6o',
      authDomain: 'testing-app-31036.firebaseapp.com'
    });
  }
}
