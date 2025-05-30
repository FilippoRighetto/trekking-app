import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { LoginComponent } from './componenti/login/login.component';
import { HomeComponent } from './componenti/home/home.component';
import { PostTrekkingComponent } from './componenti/post-trekking/post-trekking.component';
import { ModificaCredenzialiComponent } from './componenti/modifica-credenziali/modifica-credenziali.component';
import { AggiungiTrekkingComponent } from './componenti/aggiungi-trekking/aggiungi-trekking.component';
import { VisualizzaTrekingPersonaliComponent } from './componenti/visualizza-treking-personali/visualizza-treking-personali.component';
import { ModificaTrekkingPersonaliComponent } from './componenti/modifica-trekking-personali/modifica-trekking-personali.component';
import { VisualizzaPrenotaTrekkingComponent } from './componenti/visualizza-prenota-trekking/visualizza-prenota-trekking.component';
import { PrenotazioneService } from './servizi/prenotazione.service';
import { PrenotazioniComponent } from './componenti/prenotazioni/prenotazioni.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  { path:'trekking', component: PostTrekkingComponent,
    children: [
      { path: '', redirectTo: 'visualizzaTuttiTrekking', pathMatch: 'full' },
      {path: 'aggiungi', component: AggiungiTrekkingComponent},
      {path: 'visualizzaPostPubblicati', component: VisualizzaTrekingPersonaliComponent},
      {path: 'modificaTrekPers/:id', component: ModificaTrekkingPersonaliComponent},
      {path: 'visualizzaTuttiTrekking', component: VisualizzaPrenotaTrekkingComponent},
      {path: 'prenotazioni', component: PrenotazioniComponent},
    ]
  },
  {path:'registrazione', component: RegistrazioneComponent},
  {path:'login', component: LoginComponent},
  {path:'modificaCredenziali', component: ModificaCredenzialiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
