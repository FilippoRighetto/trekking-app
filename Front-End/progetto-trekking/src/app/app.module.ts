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


@NgModule({
  declarations: [
    AppComponent,
    RegistrazioneComponent,
    LoginComponent,
    HomeComponent,
    PostTrekkingComponent,
    ModificaCredenzialiComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
