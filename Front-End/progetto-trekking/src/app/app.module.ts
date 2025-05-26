import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { LoginComponent } from './componenti/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './componenti/home/home.component';
import { PostTrekkingComponent } from './componenti/post-trekking/post-trekking.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ModificaCredenzialiComponent } from './componenti/modifica-credenziali/modifica-credenziali.component';
import {MatListModule} from '@angular/material/list';
import { AggiungiTrekkingComponent } from './componenti/aggiungi-trekking/aggiungi-trekking.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSelectModule } from '@angular/material/select';
import { VisualizzaTrekingPersonaliComponent } from './componenti/visualizza-treking-personali/visualizza-treking-personali.component';
import { ModificaTrekkingPersonaliComponent } from './componenti/modifica-trekking-personali/modifica-trekking-personali.component';
import { VisualizzaPrenotaTrekkingComponent } from './componenti/visualizza-prenota-trekking/visualizza-prenota-trekking.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrazioneComponent,
    LoginComponent,
    HomeComponent,
    PostTrekkingComponent,
    ModificaCredenzialiComponent,
    AggiungiTrekkingComponent,
    VisualizzaTrekingPersonaliComponent,
    ModificaTrekkingPersonaliComponent,
    VisualizzaPrenotaTrekkingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule, 
    MatMenuModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatSelectModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
