/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/store/auth.service';
import { AuthModule } from './auth/auth.module';
import { authReducer } from './auth/store/auth.reducer';
import { HttpErrorHandler } from './error.service';
import { OwnersModule } from './owners/owners.module';
import { PartsModule } from './parts/parts.module';
import { PetsModule } from './pets/pets.module';
import { PetTypesModule } from './pettypes/pettypes.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { VetsModule } from './vets/vets.module';
import { VisitsModule } from './visits/visits.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    OwnersModule,
    PetsModule,
    VisitsModule,
    PetTypesModule,
    VetsModule,
    SpecialtiesModule,
    PartsModule,
    BrowserAnimationsModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot({ 
      auth: authReducer,
     }, {}),
  ],
  providers: [
    HttpErrorHandler,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
