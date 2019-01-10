import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from 'src/app/endpoints.service';


@Component({
  selector: 'app-view-all-books',
  templateUrl: './view-all-books.component.html',
  styleUrls: ['./view-all-books.component.scss']
})
export class ViewAllBooksComponent implements OnInit {

  private repoImgResponse : any;
  private imgFileId :number[] = [];
  private bookName : string[] = [];
  public bookStoreData = {};
  public keys=["BookName","BookImages"];
  
  public showCount : number= 0;
  
  constructor(private endpointService: EndpointsService, private http: HttpClient) {

  }
  
  bookImages = [];
  bookNameStore =[];
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
 
  addImages(imgFileId) {
    if(imgFileId !=null){
      this.bookImages.push({img:"https://api.vedavaapi.org/py/iiif_image/v1/demo/ullekhanam/"+imgFileId+"/full/100,150/0/default.jpg"});
    }else{
      this.bookImages.push({img:"assets/book-default-test-thumbnail.png"});
     
    }
  }

  addBookName(bookName){
     
    this.bookNameStore.push({Name:bookName});
  
  }

  public loadMore(){
      console.log("Show count start:",this.showCount);
      this.bookName = [];
      this.imgFileId = [];
      
    this.setRepository().subscribe(
      data => {
        let httpImageParams = new HttpParams().set('selector_doc','{"jsonClass": "BookPortion"}')
         .set('associated_resources','{"files": {"purpose":"thumbnail"}}')
         .set('start',this.showCount.toString()).set('numbers','10');
         this.showCount = this.showCount + 10;
        let httpImageHeaders : HttpHeaders = new HttpHeaders({
          'Content-Type':'application/json',
        });  
        
        this.http.get(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources' , {headers:httpImageHeaders,params:httpImageParams,withCredentials: true,})
        .subscribe(          
          Response =>{
            this.repoImgResponse = Response;  
                   
            for(let i=0;i<this.repoImgResponse.length;i++){
              this.imgFileId.push(this.repoImgResponse[i]["associated_resources"]["files"][0]);
              this.bookName.push(this.repoImgResponse[i]["title"]["chars"]);
              
            }
            for(let index in this.imgFileId){
              this.addImages(this.imgFileId[index]);
            }
            for(let index in this.bookName){
              this.addBookName(this.bookName[index]);
            }
            this.bookStoreData["BookName"] = new Array();
            this.bookStoreData["BookImages"] = new Array();
            for(let index in this.bookImages){
              this.bookStoreData["BookImages"].push(this.bookImages[index]);
              this.bookStoreData["BookName"].push(this.bookNameStore[index])
            }
            
            for(let key in this.bookStoreData){
              for(let index in this.bookStoreData[key]){
                console.log(this.bookNameStore[index]["Name"])
              }
            }
          }
        );
      }
    );
      this.showCount = this.showCount+10;

  }
 

  ngOnInit() {
   
    this.setRepository().subscribe(
      data => {
        let httpImageParams = new HttpParams().set('selector_doc','{"jsonClass": "BookPortion"}')
         .set('associated_resources','{"files": {"purpose":"thumbnail"}}')
         .set('start',this.showCount.toString()).set('numbers','10');
         this.showCount = this.showCount + 10;
        let httpImageHeaders : HttpHeaders = new HttpHeaders({
          'Content-Type':'application/json',
        });  
        
        this.http.get(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources' , {headers:httpImageHeaders,params:httpImageParams,withCredentials: true,})
        .subscribe(          
          Response =>{
            this.repoImgResponse = Response;  
                   
            for(let i=0;i<this.repoImgResponse.length;i++){
              this.imgFileId.push(this.repoImgResponse[i]["associated_resources"]["files"][0]);
              this.bookName.push(this.repoImgResponse[i]["title"]["chars"]);
              
            }
            for(let index in this.imgFileId){
              this.addImages(this.imgFileId[index]);
            }
            for(let index in this.bookName){
              this.addBookName(this.bookName[index]);
            }
            this.bookStoreData["BookName"] = new Array();
            this.bookStoreData["BookImages"] = new Array();
            for(let index in this.bookImages){
              this.bookStoreData["BookImages"].push(this.bookImages[index]);
              this.bookStoreData["BookName"].push(this.bookNameStore[index]);
              console.log(this.bookStoreData);
            }
            
            for(let key in this.bookStoreData){
              for(let index in this.bookStoreData[key]){
                console.log(this.bookNameStore[index]["Name"])
              }
            }
          }
        );
      }
    );
  }

}

