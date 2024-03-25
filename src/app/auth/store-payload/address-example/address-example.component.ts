import { Component, OnInit } from '@angular/core';
import { AddressState } from '../address-field.reducer';
// import { AppState } from '../address-field.reducer';
import { Store } from '@ngrx/store';
import { SetLabel } from '../address-field.actions';
import { Observable } from 'rxjs';
import { VetService } from 'app/vets/vet.service';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-example',
  templateUrl: './address-example.component.html',
  styleUrls: ['./address-example.component.css']
})
export class AddressExampleComponent implements OnInit {

  // x$: Observable<string>;
  address$: Observable<AddressState>;


  // { auth: AuthState }

  // constructor(private store: Store<AppState>,
  constructor(private store: Store<{ addressField: AddressState}>,

    private addressService: AddressService,
     private vetService: VetService
  ) { 

    this.address$ = this.store.select('addressField');
    this.address$.subscribe(value => console.log(value));
  }

  ngOnInit(): void {
      // this.addressService.getFields().subscribe(x => {
      //   this.store.dispatch(SetLabel({ addressField: x }));
      // });
  }

}
