import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Musique} from "../../model/Musique";

@Component({
  selector: 'carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent {

  @Input() musique: Musique | undefined;

  @Output('personDelete') delete$: EventEmitter<any> = new EventEmitter();

  @Output('personUpdate') update$: EventEmitter<any> = new EventEmitter();


  constructor() {
    //Empty
  }

  delete() {
    this.delete$.emit(this.musique);
  }

  update() {
    this.update$.emit(this.musique);
  }
}
