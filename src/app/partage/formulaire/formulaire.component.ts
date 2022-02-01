import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Musique} from "../../model/Musique";

@Component({
  selector: 'formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {
  form: FormGroup;
  @Input() musiqueModel: Musique;
  @ViewChild("fileInput") fileInput!: ElementRef;

  @Output('cancel') cancelEvent$: EventEmitter<any>;
  @Output('submit') submitEvent$: EventEmitter<any>;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() {
    this.submitEvent$ = new EventEmitter();
    this.cancelEvent$ = new EventEmitter();
    this.form = FormulaireComponent.buildForm();
    this.musiqueModel = {
      styles: []
    };
  }

  ngOnInit() {
    debugger;
    this.form.patchValue({
      id: this.musiqueModel.id,
      title: this.musiqueModel.title,
      description: this.musiqueModel.description,
      album: this.musiqueModel.album,
      artist: this.musiqueModel.artist,
      duration: this.musiqueModel.duration,
      date: this.musiqueModel.date,
      picture: this.musiqueModel.picture,
      styles: this.musiqueModel.styles || []
    });
  }

  cancel() {
    this.cancelEvent$.emit();
  }

  submit(employe: Musique) { //Formulaire
    employe.picture = this.musiqueModel.picture;
    this.submitEvent$.emit(employe);
  }


  addChipset(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.musiqueModel.styles!.push(value);
    }
    event.chipInput!.clear();
  }

  removeChipset(titre: any): void {
    const index = this.musiqueModel.styles!.indexOf(titre);
    this.musiqueModel.styles!.splice(index, 1);
  }

  onFileSelected(event:Event | null) {
    const files = (<HTMLInputElement>event?.currentTarget).files;
    const file:File | null = files!.item(0);

    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.musiqueModel.picture = reader.result;
        }
    }
  }

  /**
   * Fonction pour construire notre formulaire
   * @returns {FormGroup}
   *
   * @private
   */
  private static buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl(''),
      album: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      artist: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      //J'ai du chercher sur internet un validateur de regex pour tester ce que je voulais faire
      //https://regex101.com/
      //voilà la regex qui fonctinne comme je veux sur le site (si jamais ya un pb et que je n'arrive pas / j'ai oublié de modifier)
      //\d{1,3}:\d\d\smin
      //4:35 min, 45:35 min, 458:35 min, 0:35 min -> match
      duration: new FormControl('', Validators.compose([Validators.required, Validators.pattern('\\d{1,3}:\\d\\d\\smin')])),
      //J'ai trouvé sur internet un validateur de date mais c'est un peu cassé, je vois pas trop le problème
      //Peu importe l'input, il n'accepte pas (j'ai vérifié avant qu'elle fonctionne sur le site ci dessus)
      //Je laisse la regex au cas où
      //^((?:19|20)\d\d)[- \/.](0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])$
      //J'ai aussi enlever la ligne pour le pattern dans l'HTML, l'erreur ne vient pas de là je pense
      date: new FormControl('', Validators.compose([Validators.required])),
      styles: new FormControl(''),
    });
  }



}
