import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { LoginComponent } from './componenti/login/login.component';
import { HomeComponent } from './componenti/home/home.component';
import { PostTrekkingComponent } from './componenti/post-trekking/post-trekking.component';
import { ModificaCredenzialiComponent } from './componenti/modifica-credenziali/modifica-credenziali.component';
import { AggiungiTrekkingComponent } from './componenti/aggiungi-trekking/aggiungi-trekking.component';
import { VisualizzaTrekingPersonaliComponent } from './componenti/visualizza-treking-personali/visualizza-treking-personali.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  { path:'trekking', 
    component: PostTrekkingComponent,
    children: [
      {path: 'aggiungi', component: AggiungiTrekkingComponent},
      {path: 'visualizzaPostPubblicati', component: VisualizzaTrekingPersonaliComponent},
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
