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
  private showCount : number= 0;
  //stores book images, title.
  private bookStoreData = [];
  
  constructor(private endpointService: EndpointsService, private http: HttpClient) {

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
    return this.http.post(this.endpointService.getBaseUrl() + '/store/v1/repos', 'repo_name=' + this.endpointService.getRepositoryName(),
     httpUploadOptions);
  }
   
 
//  passing the book image and title to template
  addBookDetails(imgFileIds,bookNames){
    var iif_image_url = null;

    if(imgFileIds !=null){
      iif_image_url = this.endpointService.getBaseUrl() + "/iiif_image/v1/" + this.endpointService.getRepositoryName()
                      + "/ullekhanam/"+imgFileIds+"/full/100,150/0/default.jpg";
    }else{
      iif_image_url ="assets/default-book-īmg.png";   
    }
    this.bookStoreData.push({Name:bookNames,img:iif_image_url});
  }

  /**
   * Method Load more button
   *
  */
  public loadMore(){
      $('#load-more-btn-wrapper').css('display','none');
      $('#loadding-gif-icon').show();

    this.setRepository().subscribe(
      success => {
        let httpImageParams = new HttpParams().append('selector_doc','{"jsonClass": "BookPortion"}')
         .append('associated_resources','{"files": {"purpose":"thumbnail"}}')
         .append('start',this.showCount.toString())
         .append('numbers','24');
         this.showCount = this.showCount + 24;

        let httpImageHeaders : HttpHeaders = new HttpHeaders({
          'Content-Type':'application/json',
        });  
        
        this.http.get(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources' , {headers:httpImageHeaders,params:httpImageParams,withCredentials: true,})
        .subscribe(          
          response =>{
            this.bookDetails = response;  
            if(this.bookDetails.length != 0 ){ 
              $('#loadding-gif-icon').css('display','none');
              for(let i=0;i<this.bookDetails.length;i++){
                if(this.bookDetails[i].hasOwnProperty("associated_resources") &&  this.bookDetails[i].hasOwnProperty("title")
                  && this.bookDetails[i]["associated_resources"].hasOwnProperty("files") 
                  &&  this.bookDetails[i]["title"].hasOwnProperty("chars")){
                    this.addBookDetails(this.bookDetails[i]["associated_resources"]["files"][0],this.bookDetails[i]["title"]["chars"]);
                }
              }//for 
            }//if

            if(this.bookDetails.length >= 24){
              $('#load-more-btn-wrapper').show();
            }else{             
              $('#load-more-btn-wrapper').css('display','none');
            } 
          }
        );
      },
      error => {
        //TODO: Show error 
      }
    );
  }
 

  ngOnInit() {
   
    $('#load-more-btn-wrapper').css('display','none');
    $('#loadding-gif-icon').show();
  //  get book details
    this.setRepository().subscribe(
      success => {
        let httpImageParams = new HttpParams().append('selector_doc','{"jsonClass": "BookPortion"}')
          .append('associated_resources','{"files": {"purpose":"thumbnail"}}')
          .append('start',this.showCount.toString())
          .append('numbers','24');
          this.showCount = this.showCount + 24;
        let httpImageHeaders : HttpHeaders = new HttpHeaders({
          'Content-Type':'application/json',
        });  
        
        this.http.get(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources' , {headers:httpImageHeaders,params:httpImageParams,withCredentials: true,})
        .subscribe(          
          response =>{
            this.bookDetails = response;              
            $('#loadding-gif-icon').css('display','none');

            if(this.bookDetails != null && this.bookDetails.length != 0){
              $('#load-more-btn-wrapper').show(); 
              for(let i=0;i<this.bookDetails.length;i++){
                
                if(this.bookDetails[i].hasOwnProperty("associated_resources") &&  this.bookDetails[i].hasOwnProperty("title")
                    && this.bookDetails[i]["associated_resources"].hasOwnProperty("files") 
                    &&  this.bookDetails[i]["title"].hasOwnProperty("chars")){

                    if(this.bookDetails[i]["title"]["chars"] ==null){
                      $('#load-more-btn-wrapper').css('display','none');
                    }else{
                      this.addBookDetails(this.bookDetails[i]["associated_resources"]["files"][0],this.bookDetails[i]["title"]["chars"]);
                    }
                }              
              }
            } else{
              $('#load-more-btn-wrapper').css('display','none');
            } //if-else
          }//response callback
        );
      },
      error => {
        //TODO: Display error message
      }
    );
  }

}//end of class declaration

