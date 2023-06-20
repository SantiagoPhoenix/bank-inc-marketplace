import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { API_ROUTERS } from 'src/app/shared/const/ApiRouters'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlBase: string = ''

  constructor(private http: HttpClient) {
    this.urlBase = API_ROUTERS.URL_BASE;
  }

  /**
   * Method that gets the info by the url
   * @param relUrl -> Specific url of the service and url params
   * @returns Observable<any> -> Returns an observable with the data from the api
   */

  getInfo(relUrl: string): Observable<any> {
    const url = this.urlBase + relUrl;
    return this.http.get<any>(url);
  }
}
