import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car-rac',
  templateUrl: './add-car-rac.component.html',
  styleUrls: ['./add-car-rac.component.css']
})
export class AddCarRacComponent implements OnInit {

  myUrl: string;
  myModel: string = "AMG 730 Disel";
  myDailyPrice: string = "100€";

  form = new FormGroup({
    from: new FormControl('', [
      Validators.required
    ]),
    to: new FormControl('', [
      Validators.required
    ]),
    date1: new FormControl('', [
      Validators.required
    ]),
    date2: new FormControl('', [
      Validators.required
    ]),
    time2: new FormControl('', [
      Validators.required
    ])
  })
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.myUrl = event.target.result.toString();
      }
    }
}

onSubmit() {
  if (this.form.valid)
    this.router.navigate(['/flights']);
  else
    alert("Bad input.");
}
}
