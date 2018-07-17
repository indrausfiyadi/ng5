import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import { DataService } from '../data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
  // membuat style animasi pada komponen home
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),
        
        // animasi ketia data ditambahkan
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35%)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))
        ]), {optional: true}),

        // animasi keti data dihapus
        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35%)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number = 4;
  btnText: string = 'Add an Item';
  goalText: string = 'My frist life goal';
  goals = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    // load data terlebih dahulu
    this._data.goal.subscribe(res => this.goals = res);
    
    // membuat perhitungan jumlah data menjadi dynamic
    this.itemCount = this.goals.length;

    this._data.changeGoal(this.goals);
  } 

  addItem(){
    // tambahkan data ke dalam array goals
    this.goals.push(this.goalText);

    // bersihkan inputan
    this.goalText = '';

    // membuat perhitungan jumlah data menjadi dynamic
    this.itemCount = this.goals.length;

    this._data.changeGoal(this.goals);
  }

  removeItem(i){
    this.goals.splice(i, 1);

    this.itemCount = this.goals.length; 

    this._data.changeGoal(this.goals);
  }

}
