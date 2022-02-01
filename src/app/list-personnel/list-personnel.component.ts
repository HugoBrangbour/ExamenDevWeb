import {Component, OnInit} from '@angular/core';
import {ListPersonnelService} from "../partage/service/list-personnel.service";
import {Musique} from "../model/Musique";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {mergeMap} from "rxjs";
import {AjoutPopupComponent} from "./ajout-popup/ajout-popup.component";

@Component({
  selector: 'app-list-personnel',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.scss']
})
export class ListPersonnelComponent implements OnInit {

  musiques: Musique[] = [];
  view:string = "card";
  dialogStatus: string = "inactive";
  private addDialog: MatDialogRef<AjoutPopupComponent> | any;
  defaultImage: string = "./assets/randomAvatar.png";
  constructor( private readonly listPersonnelService: ListPersonnelService, public dialog: MatDialog) {
    //Rien à faire ici
  }

  ngOnInit(): void {
    this.listPersonnelService.fetch().subscribe(musiques => {
      this.musiques = musiques || [];
    });
  }

    delete(musiques: Musique) {
    this.listPersonnelService.delete(musiques.id!).subscribe(msq => {
      this.musiques = msq;
    });
  }

  switchView() {
    if(this.view==="card"){
      this.view = "list"
    }
    else{
      this.view = "card";
    }
  }

  add(musique: Musique) {
    this.listPersonnelService
      .create(musique)
      .pipe(mergeMap(() => this.listPersonnelService.fetch()))
      .subscribe(msq => {
        this.musiques = msq;
        this.hideDialog();
      });
  }

  update(musique: Musique) {
    this.listPersonnelService
      .update(musique)
      .pipe(mergeMap(() => this.listPersonnelService.fetch()))
      .subscribe(msq => {
        this.musiques = msq;
        this.hideDialog();
      });
  }

  showDialog() {
    debugger;
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AjoutPopupComponent, {
      width: '600px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe((musique:any)=> {
      this.dialogStatus = 'inactive';
      if (musique) {
        this.add(musique);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if(this.addDialog != undefined){
      this.addDialog.close();
    }
  }
}
