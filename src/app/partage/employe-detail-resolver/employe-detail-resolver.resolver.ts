import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ListPersonnelService} from "../service/list-personnel.service";
import {Musique} from "../../model/Musique";

@Injectable({
  providedIn: 'root'
})
export class EmployeDetailResolverResolver implements Resolve<Musique> {

  constructor(private readonly musiqueService: ListPersonnelService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Musique> {
    const musiqueId: string | null = route.paramMap.get('id');
    if(musiqueId != null){
      //Par rapport au cours, notre id est un nombre et non un string, on fait une covnersion grâce à la doc en ligne
      //https://www.angularjswiki.com/angular/how-to-convert-a-string-to-number-in-angular-or-typescript/
      var numberValue = Number(musiqueId);
      return this.musiqueService.fetchOne(numberValue);
    }
    else
      return new Observable<Musique>();
  }
}
