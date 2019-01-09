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
  public reppoResponse : any;
  public fileId:string[] = [];
  
  @ViewChild('slickModal') slickModal;
   
  slides = [
    
  ];

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
  
  addSlide(fileId) {
    this.slides.push({img: "https://api.vedavaapi.org/py/iiif_image/v1/demo/ullekhanam/"+fileId+"/full/,255/0/default.jpg"})
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
      data => {
          let params = new HttpParams().set('selector_doc','{"jsonClass": "BookPortion"}')
                  .set('associated_resources','{"files": {"purpose":"thumbnail"}}')
                  .set('start','0').set('numbers','16');              
          let headers: HttpHeaders = new HttpHeaders({
              'Content-Type':'application/json',
          });          
        
         this.http.get(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources' , {headers:headers,params:params,withCredentials: true,})
         .subscribe(
            Response  => {
              $('#home-books-img-dev').show();
              this.reppoResponse = Response;
              //getting  the files id 
              for(let i=0;i<this.reppoResponse.length;i++){
                this.fileId.push(this.reppoResponse[i]["associated_resources"]["files"][0]);
              }
              //passing filesid to carousel
              for(let index in this.fileId){
                this.addSlide(this.fileId[index]);
              }
            },
          );                   
      }
     
    );
     
  
  }
}
