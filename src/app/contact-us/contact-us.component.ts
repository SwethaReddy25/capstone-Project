import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private router:Router) {}

  ngOnInit(): void {
  }
  onSubmit(){
    alert("successfully submitted");
    this.router.navigate(['/home'])
    
  }

}
