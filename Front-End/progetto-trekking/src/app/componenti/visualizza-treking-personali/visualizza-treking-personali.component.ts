import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostTrekingServiceService } from 'src/app/servizi/post-treking-service.service';



@Component({
  selector: 'app-visualizza-treking-personali',
  templateUrl: './visualizza-treking-personali.component.html',
  styleUrls: ['./visualizza-treking-personali.component.css']
})
export class VisualizzaTrekingPersonaliComponent implements OnInit{
  
  
  mieiTrekking: any[] = [];
  messaggioRegistrazioneTrekking: string = '';

  

  constructor(private postTrekingService: PostTrekingServiceService, private router: Router){}
  
  ngOnInit(): void {
      const state = history.state;
      if(state && state.messaggioRegistrazione){
        this.messaggioRegistrazioneTrekking = state.messaggioRegistrazione;
      }
      
      this.visualizzaTrekingPersonali();
  }

  visualizzaTrekingPersonali(){
  const token = sessionStorage.getItem('authToken');
      if(token){
          this.postTrekingService.getTrekkingPersonali(token).subscribe({
            next: (trekkingList) => {
              console.log('Lista trekking personali:', trekkingList);
              this.mieiTrekking = trekkingList;
            },
            error: (err) => {
              console.error('Errore nel recuperare i trekking personali', err);
            },
          });
      }
  }

}
