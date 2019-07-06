import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { add, subtract } from 'add-subtract-date';
import { NgForm, FormGroup } from '@angular/forms';
import * as jsPDF from 'jspdf';
import swal from 'sweetalert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public fortyDaysDate: any;
  public sixtyDaysDate: any;
  public ninetyDaysDate: any;
  public myRetDatePlus45: Date;
  public myRetDatePlus60: Date;
  public myRetDatePlus90: Date;

  public midYear: any = 'Mid-Year';
  public endYear: any = 'End of Year';
  public midYearDetails: boolean = false;
  public endYearDetails: boolean = false;
  public backHome: any = 'GO BACK';
  public showForm: boolean = false;

  private _retireSet: Date;
  @Input() set retireSet(date: Date) {
    this._retireSet = new Date(date);
// this corrects the timezone offset if using "date" in html, only way to keep var as type date
   this.myRetDatePlus90 = add(this._retireSet, 1, "days");
    // console.log('ret is ' + this._retireSet + this.myRetDatePlus90);
  }

  private _retireSet60: Date;
  @Input() set retireSet60(date: Date) {
    this._retireSet60 = new Date(date);
    this.myRetDatePlus60 = add(this._retireSet60, 1, "days");
  }

  private _retireSet45: Date;
  @Input() set retireSet45(date: Date) {
    this._retireSet45 = new Date(date);
    this.myRetDatePlus45 = add(this._retireSet45, 1, "days");
  }

 
  constructor() { 
  }

  ngOnInit() {
    // boolean, alerts if using internet explorer (not compatible)
    let isIEOrEdge = /msie\s|trident\//i.test(window.navigator.userAgent);
  
    if(isIEOrEdge == true) {
      swal('Browser Warning','This website will not work in Internet Explorer.  Please open in Chrome, Edge, Mozilla Firefox or Safari.' );
    }

  }
// toggles trigger hide/show of div elements on click w/*ngIf
  toggleMid() {
    this.midYearDetails = !this.midYearDetails;
    if(this.midYearDetails)  
      this.midYear = "Mid-Year";
    else
      this.midYear = "Mid-Year";
  }

  toggleHome() {
    this.midYearDetails = !this.midYearDetails;
    if(this.midYearDetails)  
      this.backHome = "GO BACK";
    else
      this.backHome = "GO BACK";
  }
  toggleHomeEnd() {
    this.endYearDetails = !this.endYearDetails;
    if(this.endYearDetails)  
      this.backHome = "GO BACK";
    else
      this.backHome = "GO BACK";
  }

  togglePage() {
    this.endYearDetails = !this.endYearDetails;
    if(this.endYearDetails)  
      this.endYear = "End of Year";
    else
      this.endYear = "End of Year";
  }

// Sets create date, input/value is hidden in the view, used to check if enter after today
  RetireCalculatorCreateDate = new Date();

//Generate calendar calculation 
  public createThreeDates(): void { 
    if (this._retireSet <= this.RetireCalculatorCreateDate)
    swal("Warning", "You should probably enter a date after today.");

  let dNinety: Date = this.myRetDatePlus90;
  let ninetyDaysBack = subtract(dNinety, 90, "days");
  this.ninetyDaysDate = ninetyDaysBack;

  let dSixty: Date = this.myRetDatePlus60;
  let sixtyDaysBack = subtract(dSixty, 60, "days");
  this.sixtyDaysDate = sixtyDaysBack;
  // console.log('60 is ' + this.sixtyDaysDate);
 
  let dForty: Date = this.myRetDatePlus45;
  let fortyDaysBack = subtract(dForty, 45, "days");
  this.fortyDaysDate = fortyDaysBack;
 }


// Users can download a PDF copy of their dates
 downloadPdf() {
  let doc = new jsPDF();
  doc.addHTML(document.getElementById("pdfVersion"), function() {
     doc.save("dateCalculations.pdf");
  });
}




}
