import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Musique} from "../../model/Musique";

export type PopupAction = Musique & {mode: string};

@Component({
  selector: 'app-ajout-popup',
  templateUrl: './ajout-popup.component.html',
  styleUrls: ['./ajout-popup.component.scss']
})
export class AjoutPopupComponent {

  constructor(public dialogRef: MatDialogRef<AjoutPopupComponent>) {}

  closeDialog(result: Musique & {mode?: string} | null = null) {
    this.dialogRef.close(result);
  }

  onCancel() {
    this.closeDialog();
  }

  onCreate(musique: Musique) {
    this.closeDialog({...musique, mode: 'create'});
  }

  onUpdate(musique: Musique) {
    this.closeDialog({...musique, mode: 'update'});
  }

}
