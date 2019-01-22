import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from 'src/app/endpoints.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-view-all-books',
  templateUrl: './view-all-books.component.html',
  styleUrls: ['./view-all-books.component.scss']
})
export class ViewAllBooksComponent implements OnInit {

  private bookDetails : any;
  private imgFileIds :number[] = [];
  private bookNames : string[] = [];
  private image_id: any;
  public showCount : number= 0;
  
  constructor(private endpointService: EndpointsService, private http: HttpClient) {

  }
  // store book images, title.
  bookStoreData = [];
  
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
   
 
//  passing the book image and title to template
  addBookDetails(index,imgFileIds,bookNames){
    if(imgFileIds !=null){
      this.image_id="https://api.vedavaapi.org/py/iiif_image/v1/demo/ullekhanam/"+imgFileIds+"/full/100,150/0/default.jpg";
    }else{
      this.image_id="assets/default-book-īmg.png";   
    }
       this.bookStoreData.push({Name:bookNames,img:this.image_id});
  }

  /**
   * Method Load more button
   *
  */
  public loadMore(){
      this.bookNames = [];
      this.imgFileIds = [];
      $('#load-more-btn-wrapper').css('display','none');
      $('#loadding-gif-icon').show();
    this.setRepository().subscribe(
      data => {
        let httpImageParams = new HttpParams().set('selector_doc','{"jsonClass": "BookPortion"}')
         .set('associated_resources','{"files": {"purpose":"thumbnail"}}')
         .set('start',this.showCount.toString()).set('numbers','24');
         this.showCount = this.showCount + 24;
         let httpImageHeaders : HttpHeaders = new HttpHeaders({
          'Content-Type':'application/json',
        });  
        
        this.http.get(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources' , {headers:httpImageHeaders,params:httpImageParams,withCredentials: true,})
        .subscribe(          
          Response =>{
            this.bookDetails = Response;  
            if(this.bookDetails.length != 0 ){ 
              $('#loadding-gif-icon').css('display','none');
              for(let i=0;i<this.bookDetails.length;i++){
                this.imgFileIds.push(this.bookDetails[i]["associated_resources"]["files"][0]);
                this.bookNames.push(this.bookDetails[i]["title"]["chars"]); 
              }
              for(let index in this.bookNames){             
                this.addBookDetails(index,this.imgFileIds[index],this.bookNames[index]);
              }   
            }
            if(this.bookDetails.length >= 24){
              $('#load-more-btn-wrapper').show();
            }else{             
              $('#load-more-btn-wrapper').css('display','none');
            } 
          }
        );
      }
    );
      // this.showCount = this.showCount+24;
  }
 

  ngOnInit() {
   
    $('#load-more-btn-wrapper').css('display','none');
    $('#loadding-gif-icon').show();
  //  get book details
    this.setRepository().subscribe(
      data => {
        let httpImageParams = new HttpParams().set('selector_doc','{"jsonClass": "BookPortion"}')
          .set('associated_resources','{"files": {"purpose":"thumbnail"}}')
          .set('start',this.showCount.toString()).set('numbers','24');
          this.showCount = this.showCount + 24;
        let httpImageHeaders : HttpHeaders = new HttpHeaders({
          'Content-Type':'application/json',
        });  
        
        this.http.get(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources' , {headers:httpImageHeaders,params:httpImageParams,withCredentials: true,})
        .subscribe(          
          Response =>{
            this.bookDetails = Response;              
            $('#loadding-gif-icon').css('display','none');
            if(this.bookDetails.length != 0){
              $('#load-more-btn-wrapper').show(); 
              for(let i=0;i<this.bookDetails.length;i++){
                this.imgFileIds.push(this.bookDetails[i]["associated_resources"]["files"][0]);
                this.bookNames.push(this.bookDetails[i]["title"]["chars"]); 
                if(this.bookDetails[i]["title"]["chars"] ==null){
                  $('#load-more-btn-wrapper').css('display','none');
                }              
              }
              for(let index in this.bookNames){             
                this.addBookDetails(index,this.imgFileIds[index],this.bookNames[index]);
              }     
            } else{
              
              $('#load-more-btn-wrapper').css('display','none');
            }
          }
        );
      }
    );
  }

}

