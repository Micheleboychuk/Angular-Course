import { Component } from '@angular/core';
import {Utility} from "./services/utility";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'mb-root',
  template: `

    <h1>{{genere === "M" ? "Maschio" : "Femmina"}}</h1>
    <h2 (click)="clickHandler($event)">Ciao Mondo!</h2>
    <h4 *ngIf="visibile"> Uso della Direttiva *ngIf </h4>
    <button (click)="hideWords()"> Nascondi la scritta sopra </button>
    <li *ngFor="let user of users2">
      {{user}}
    </li>
    <h2></h2>
    <input type="text" (keydown)="inputHandler($event)">
    <h2></h2>
    <button [disabled]="image" (click)="load()">Carica Immagine</button>
    <button [disabled]="!image" (click)="unload()">Nascondi Immagine</button>
    <h2></h2>
    <img *ngIf="image" [src]="image">
    <h2>-------COMPONENTS---------------</h2>
    <app-hello></app-hello>

    <h2>-------Pepes---------------</h2>
    DATE: {{today | date:'dd MMM yyyy hh:mm:ss'}}
    <h2></h2>
    Money: {{monay | currency: 'grivna '}}
    <h2></h2>
    Bitcoin: {{bitcoin | number}}
    <h2></h2>
    JSON: <pre>{{myJSON | json}}</pre>
    <h2>----------------------</h2>

    <h2>----------> CUSTOM TYPES  <---------------</h2>
    <li *ngFor="let user of users">ID: {{user.id}} | Name: {{user.name}} </li>
    <h2>----------------------</h2>
    <h2>----------> USO di HTTP Client  <---------------</h2>
    <li *ngFor="let utente of utenti">
      {{utente.name}} ---> {{utente.id}}
    </li>
    <h2>----------------------</h2>
  `,
  styles: []
})
export class AppComponent {

genere = "M";
visibile = true;
image: string = '';

users2 = ['Misha','Giuseppe','Vincenzo'];
  hideWords() {
    this.visibile = !this.visibile;
  }
  // stampa nella consol quante volte abbiamo cliccato sul tah h2
  clickHandler(event: MouseEvent): void {
   console.log('click', event)
  }

  inputHandler(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    console.log('lettera', target.value)
  }

  load() {
    this.image = 'https://angular.io/assets/images/logos/angular/angular.png';
  }

  unload() {
    this.image = '';
  }

  //----------Pipes------------------
  today = Date.now();
  monay = 1200;
  bitcoin = 0.123646;
  myJSON = {id: 1, name: 'Misha' };

  //----------Custom types------------------
  users: User[];
  utenti: User[] = [];
  constructor(utils: Utility, http: HttpClient) {
    const  result = utils.add(3,1);
    console.log('il risultato è:' + result);
    this.users = [
      {id: 1, name: 'Misha'},
      {id: 2, name: 'Andrea'},
      {id: 3, name: 'Luca'},
    ];
    this.users.push({id: 4, name: 'Vincenzo'});
    http.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .subscribe(result => {
          this.utenti = result;
        });
  }

}
interface User {
  id: number;
  name: string;
}
