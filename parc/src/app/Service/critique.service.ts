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

  public getAllCritiques(): Observable<CritiqueInterface[]> {
    const url = "http://127.0.0.1:5000/critiques";
    const data = this.dataService.getData(url);
    return data as Observable<CritiqueInterface[]>;
  }

  public postCritique(critique: CritiqueInterface): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/critiques";
    const data = this.dataService.postData(url, critique);
    return data as Observable<MessageInterface>;
  }
}
