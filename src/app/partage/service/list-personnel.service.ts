import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Musique} from "../../model/Musique";


@Injectable({
  providedIn: 'root'
})
export class ListPersonnelService {

  private musiques = new BehaviorSubject<string>('');

  private urlServer:any = {};

  constructor(private readonly http: HttpClient) {

    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls

    Object.keys(environment.backend.endpoints).forEach(
      // @ts-ignore
      k => (this.urlServer[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
    console.log(this.urlServer);

  }

  get employees$(): Observable<string> {
    return this.musiques.asObservable();
  }

  updatedEmployeeList(data: string){
    this.musiques.next(data);
  }

  fetch(): Observable<Musique[]> {
    return this.http.get<Musique[]>(this.urlServer.toutesLesMusiques);
  }

  search(titre: string): Observable<Musique[]> {
    return this.http.get<Musique[]>(this.urlServer.rechercheTitre.replace(':title', titre));
  }

  fetchRandom(): Observable<Musique> {
    return this.http.get<Musique>(this.urlServer.randomMusique);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.urlServer.deleteMusique.replace(':id', id));
  }

  create(msq: Musique): Observable<Musique> {
    return this.http.post<Musique>(this.urlServer.createMusique, msq);
  }

  fetchOne(id: number): Observable<Musique> {
    return this.http.get<Musique>(this.urlServer.uneMusique.replace(':id', id));
  }

  update(msq: Musique): Observable<Musique> {
    return this.http.put<Musique>(this.urlServer.modifMusique.replace(':id', msq.id), msq);
  }
}
