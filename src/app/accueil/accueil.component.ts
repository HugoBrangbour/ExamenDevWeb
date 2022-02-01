import {Component} from '@angular/core';
import {Musique} from "../model/Musique";
import {ListPersonnelService} from "../partage/service/list-personnel.service";

@Component({
  selector: 'accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  musique: Musique = {};


  constructor(private readonly listPersonnelService:ListPersonnelService) {
    this.random();
  }


  /**
   * Returns random people
   */
  random() {
    this.listPersonnelService.fetchRandom().subscribe(musique => {
      this.musique = musique;
    });
  }

  delete(musique: Musique){
    this.listPersonnelService.delete(musique.id!).subscribe(() => {
      this.random();
    });
  }



}
