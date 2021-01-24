import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Option } from '../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  apiUrl = environment.apiLink;
  optionsFromRoom : Option[] = [];
  roomID: number;
  constructor(private http: HttpClient) { }

  getOptions(): Observable<Option[]>{
    return this.http.get<Option[]>(this.apiUrl + "api/option");
  }

  getOption(id: number): Observable<Option>{
    return this.http.get<Option>(this.apiUrl + "api/option/" + id);
  }

  updateOption(id: number, option: Option){
    return this.http.put<Option>(this.apiUrl + "api/option/" + id, option)
  }

  addOption(option: Option){
    return this.http.post<Option>(this.apiUrl + "api/option" , option);
  }

  deleteOption(id: number){
    return this.http.delete<Option>(this.apiUrl + "api/option/" + id)
  }
}
