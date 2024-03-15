import { Injectable } from '@angular/core';
import {Observable, map, switchMap, forkJoin} from 'rxjs';
import { DataService } from './data.service';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MessageInterface } from '../Interface/message.interface';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {

  constructor(private dataService: DataService) {

  }

  /**
   * Charge les attractions de la base de données
   * @returns Observable<AttractionInterface[]>
   */
  public getAllAttraction() : Observable<AttractionInterface[]> {
    const url = "http://127.0.0.1:5000/attraction"
    const data = this.dataService.getData(url);
    return data as Observable<AttractionInterface[]>;
  }

  /**
   * Charge les attractions de la base de données avec la moyenne des notes
   * @returns Observable<AttractionInterface[]>
   * @description Cette méthode charge les attractions de la base de données en utilisant le service attractionService.
   */
  public getAllAttractionWithMoyenne(): Observable<AttractionInterface[]> {
    return this.getAllAttraction().pipe(
      switchMap(attractions => forkJoin(
        attractions.map(attraction =>
          this.getMoyenne(attraction.attraction_id).pipe(
            map(moyenne => ({ ...attraction, moyenne }))
          )
        )
      ))
    );
  }

  /**
   * Charge une attraction de la base de données
   * @param attraction - L'attraction à charger
   * @returns Observable<AttractionInterface> - L'attraction chargée
   */
  public postAttraction(attraction: AttractionInterface): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/attraction";
    const data = this.dataService.postData(url, attraction);
    return data as Observable<MessageInterface>;
  }


  /**
   * Charge la moyenne des notes d'une attraction
   * @param attraction_id - L'identifiant de l'attraction
   * @returns Observable<number> - La moyenne des notes de l'attraction
   */
  public getMoyenne(attraction_id: number | null): Observable<number> {
    const url = "http://127.0.0.1:5000/moyenneNote/" + attraction_id;
    const data = this.dataService.getData(url);
    return data as Observable<number>;
  }
}
