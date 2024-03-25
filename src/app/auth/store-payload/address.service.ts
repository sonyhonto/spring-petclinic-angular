import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor() { }

  getFields(): Observable<string> {
    return of('field of address ');
  }

}
