import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showHtml : boolean = false;

  constructor(private httpClient : HttpClient, private domSanitizer : DomSanitizer){
  }
  
  tableHtml  : any;
  html  : any;
  inlineHtml  : any;
  styledTable : any;
  inlineMulti : any;


  ngOnInit(): void {
    this.httpClient.get('assets/table.html', {responseType: 'text'})
    .subscribe(data=>{
      this.tableHtml = this.domSanitizer.bypassSecurityTrustHtml(data);
    });

    this.httpClient.get('assets/inline.html', {responseType: 'text'})
    .subscribe(data=>{
      this.inlineHtml = this.domSanitizer.bypassSecurityTrustHtml(data);
    });

    this.httpClient.get('assets/other.html', {responseType: 'text'})
    .subscribe(data=>{
       this.html = this.domSanitizer.bypassSecurityTrustHtml(data);
    });

    this.httpClient.get('assets/styled-table.html', {responseType: 'text'})
    .subscribe(data=>{
      this.styledTable = this.domSanitizer.bypassSecurityTrustHtml(data);
    });

    this.httpClient.get('assets/inline-multi.html', {responseType: 'text'})
    .subscribe(data=>{
      this.inlineMulti = this.domSanitizer.bypassSecurityTrustHtml(data);
    });

  }

  generateHtml(){
    this.showHtml = true;
  }

  generatePDF() {

    let doc = new jsPDF.jsPDF('p', 'px', 'a4');

    let element  = document.getElementById("myHtml") as HTMLElement;

  //  doc.addFileToVFS("MouhitsuBold.ttf", MouhitsuBold);
 // doc.addFont('MouhitsuBold.ttf', 'Mouhitsu', 'bold');
    
  doc.setFont('Mouhitsu', 'bold'); // set font

    //doc.addFont('NotoSansCJKjp-Regular.ttf', 'NotoSansCJKjp', 'normal');
    //doc.setFont('NotoSansCJKjp');
    
    doc.html(element, {
      margin : [50,15,50,15],
      autoPaging : true,

      callback: function (doc) {

        var iframe = document.createElement('iframe');
				iframe.setAttribute('style', 'position:absolute;right:0; top:0; bottom:0; height:100%; width:50%');
				document.body.appendChild(iframe);
				iframe.src = doc.output('datauristring');
        
      }
   });

  }
}
