import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { CritiqueInterface } from '../Interface/critiques.interface';
import { MessageInterface } from '../Interface/message.interface';
@Injectable({
  providedIn: 'root',
})
export class CritiqueService {

  constructor(private dataService: DataService) {}

  /**
   * Charge les critiques de la base de données
   * @returns Observable<CritiqueInterface[]> - Les critiques chargées
 *   @description Cette méthode charge les critiques de la base de données en utilisant le service critiqueService.
   */
  public getAllCritiques(): Observable<CritiqueInterface[]> {
    const url = "http://127.0.0.1:5000/critiques";
    const data = this.dataService.getData(url);
    return data as Observable<CritiqueInterface[]>;
  }

  /**
   * Enregistrez une critique dans la base de données
   * @param critique - La critique à enregistrer
   * @returns Observable<MessageInterface> - Le message de la requête
   * @description Cette méthode envoie une requête POST à votre API pour enregistrer la critique dans la base de données.
   */
  public postCritique(critique: CritiqueInterface): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/critiques";
    const data = this.dataService.postData(url, critique);
    return data as Observable<MessageInterface>;
  }

  /**
   * Charge les critiques de la base de données avec la pagination
   * @param pageSize - La taille de la page
   * @param pageIndex - L'index de la page
   * @returns Observable<any> - Les critiques chargées
   * @description Cette méthode charge les critiques de la base de données en utilisant le service critiqueService.
   */
  public getCritiquesWithPagination(pageSize: number, pageIndex: number): Observable<any> {
    const url = `http://127.0.0.1:5000/critique/paginated?pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return this.dataService.getData(url);
  }

  /**
   * Charge les critiques de la base de données avec la pagination pour une attraction spécifiée
   * @param attractionId - L'identifiant de l'attraction
   * @param pageSize - La taille de la page
   * @param pageIndex - L'index de la page
   * @returns Observable<any> - Les critiques chargées
   * @description Cette méthode charge les critiques de la base de données en utilisant le service critiqueService.
   */
  public getCritiquesWithPaginationByAttractionId(attractionId: number, pageSize: number, pageIndex: number): Observable<any> {
    const url = `http://127.0.0.1:5000/critiquesAttractions/${attractionId}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return this.dataService.getData(url);
  }
}
