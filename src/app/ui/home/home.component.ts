import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { EndpointsService } from 'src/app/endpoints.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  private currentPageIndex: number;

  private bookImages: any;
  
  @ViewChild('slickModal') slickModal;
   
  // stores the images of books.
  slides = [];

  slideConfig = {"slidesToShow": 8, "slidesToScroll": 1,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 764,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1
        }
      },
    ]

  };
  
  // adding book image to slides object.

  addSlide(fileIds) {
    if(fileIds !=null){
      this.slides.push({img: this.endpointService.getBaseUrl() + "/iiif_image/v1/"
       + this.endpointService.getRepositoryName()
       + "/ullekhanam/"+fileIds+"/full/100,150/0/default.jpg"});
    }else{
      this.slides.push({img:"assets/default-book-īmg.png"});
    }
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }
  slideLeft(){
    this.currentPageIndex--;
    if(this.currentPageIndex < 0){
      this.currentPageIndex = 0;
      return;
    }//if
    this.slickModal.slickGoTo(this.currentPageIndex);
  }

  slideRight(){
    this.currentPageIndex++;
    if(this.currentPageIndex >=  this.slides.length){
      this.currentPageIndex = this.slides.length - 1 ;
      return;
    }//if
    this.slickModal.slickGoTo(this.currentPageIndex);
  }


  constructor(private endpointService: EndpointsService, private http: HttpClient, ) {

  }
 /**
   * POST request to set the working repository.
   *
   * @returns
   * @memberof LoginService
   */
  
  setRepository() {
    const httpUploadOptions = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}), 
                        withCredentials: true };
    return this.http.post(this.endpointService.getBaseUrl() + '/store/v1/repos', 'repo_name=demo',
     httpUploadOptions);
  }

  ngOnInit() {
    this.currentPageIndex = 0;
    // get the book Id for image thumbnail.
    
    $('#home-books-img-dev').css('display', 'none');
    this.setRepository().subscribe(
      success => {
          let params = new HttpParams()
                  .append('selector_doc','{"jsonClass": "BookPortion"}')
                  .append('associated_resources','{"files": {"purpose":"thumbnail"}}')
                  .append('start','0').set('numbers','16');              

          let headers: HttpHeaders = new HttpHeaders({
              'Content-Type':'application/json',
          });          
        
         this.http.get(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources' ,
               {headers:headers,params:params,withCredentials: true,})
         .subscribe(
            response  => {
              this.bookImages = response;
              if(this.bookImages != null && this.bookImages.length != 0){
                $('#home-books-img-dev').show();
                //getting  the files id 
                for(let i=0;i<this.bookImages.length;i++){
                  var bookImage = this.bookImages[i];
                  if(bookImage == null){
                    continue;
                  }
                  if(bookImage.hasOwnProperty("associated_resources") && bookImage["associated_resources"].hasOwnProperty("files")){
                    this.addSlide(bookImage["associated_resources"]["files"][0]);
                  }
                }//for
               
              }//if
            },
          );                   
      },
      error => null
    );  
  }
}
