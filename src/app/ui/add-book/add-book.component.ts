import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EndpointsService } from 'src/app/endpoints.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})

/**
 * Class for Uploading a Book, it's thumbnail and other pages.
 */
export class AddBookComponent implements OnInit {

  private bookTitle: string;

  private uploadedBookId: any;

  private selectedThumbnailFile: File;

  private imagePreview: any;

  private selectedPageFile: File;

  private bookPageCount: number;

  private currentPageIndex: number;

  private  pageFilesArraySelected: Array<File> = [];

  @ViewChild('slickModal') slickModal;

  slides = [
    {img: "http://placehold.it/400x150/37a8f5"},
    {img: "http://placehold.it/400x150/37a8f5"},
    {img: "http://placehold.it/400x150/37a8f5"},
    {img: "http://placehold.it/400x150/37a8f5"},
    {img: "http://placehold.it/400x150/37a8f5"},
    {img: "http://placehold.it/400x150/37a8f5"},
    {img: "http://placehold.it/400x150/37a8f5"},
    {img: "http://placehold.it/400x150/37a8f5"},
    {img: "http://placehold.it/400x150/37a8f5"},

  ];

  slideConfig = { "slidesToShow": 8, "slidesToScroll": 1,

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

  addSlide() {
    this.slides.push({ img: "http://placehold.it/400x150/37a8f5" })
    this.slideConfig.slidesToScroll = this.bookPageCount;
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

  constructor(private endpointService: EndpointsService, private http: HttpClient,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    //this.uploadedBookId = "5c178cd0656e3964db0e160b";//Test book
    this.currentPageIndex = 0;
    
  }


  /**
   * Performs validation of basic book information.
   * @param $book_title 
   * @param $book_author_information 
   * @param $book_description 
   */
  private validateFieldValues($book_title, $book_author_information, $book_description) {
    if ($book_title == null || $book_title.trim().length < 3) {
      $('#book_title_minlength_error').css('display', 'block');
      return false;
    }

    if ($book_author_information == null || $book_author_information.trim().length < 3) {
      $('#book_author_minlength_error').css('display', 'block');
      return false;
    }

    if ($book_description == null || $book_description.trim().length < 10) {
      $('#book_description_minlength_error').css('display', 'block');
      return false;
    }
    return true;
  }

  /**
   * Shows Add Page Component
   */
  showAddPageComponents(){
    $("#add_book_thumbnail_container").css("display", "none");
    $("#add_page_container").css("display", "block");

    if(this.bookTitle != null) {
      $("#book-title-carousel").text("Books > " + this.bookTitle);
    }
  }
  /**
   * Uploads the Page of a Book.
   */
  onPageUpload(){
    $("#error-upload-page").css("display", "none");
    if(this.uploadedBookId == null){
      $("#error-upload-page").text("Book details missing, the session may have been lost. Please login afresh and try again.");
      $("#error-upload-page").css("display", "block");
      return;
    }//if

    if (this.selectedPageFile == null) {
      $('#error-upload-page').text("Please select a PNG or JPG file to upload.");
      $("#error-upload-page").css("display", "block");
      return;
    }
    
    let page_json = {
      jsonClass: "Page",
      purpose: "page",
      selector: {
        jsonClass: "QualitativeSelector",
      },
      source: this.uploadedBookId,
    };

    const httpUploadOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json' }),
      withCredentials: true
    };

    const uploadData = new FormData();
    uploadData.append('files', this.selectedPageFile);
    uploadData.set("files_purpose", "pagination");
    uploadData.set("resource_json", JSON.stringify(page_json));


    this.spinner.show();
    return this.http.post(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources', uploadData,
      httpUploadOptions).subscribe(
        response => {
          this.spinner.hide();
          $('#page-image-file').val('');
          $('#info-upload-page').text("Page uploaded successfully. Continue to add more pages or click on Finish to go to the dashboard.");
          //Uploads sample Page; replace with original Page thumbnail
          this.addSlide();
          this.selectedPageFile = null;
        },
        error => {
          this.spinner.hide();
          $("#error-upload-page").css("display", "block");
          let errorCode = this.getResponseErrorCode(error);
          if (errorCode == 403) {
            $("#error-add-book").text("Repository not set, perhaps login was not proper. Please logout and login afresh before next attempt.");
          } else if (errorCode == 401) {
            $("#error-add-book").text("Unauthorized call, session may have expired. Please login afresh and retry.");
          } else if (errorCode == 400) {
            $("#error-add-book").text("Bad Request. Please contact the platform administartor.");
          }else{
            $("#error-upload-page").text("Unable to upload the page. Please retry or contact the platform administrator.");
          }
        }
      );
  }
  
   /**
   *  Upload multiple pages of a book.
   * 
   */
  onMultiPageUpload(){
    $("#error-upload-multi-pages").css("display", "none");
    if(this.uploadedBookId == null){
      $("#error-upload-multi-pages").text("Book details missing, the session may have been lost. Please login afresh and try again.");
      $("#error-upload-multi-pages").css("display", "block");
      return;
    }//if

    if (this.pageFilesArraySelected == null || this.pageFilesArraySelected.length == 0) {
      $('#error-upload-multi-pages').text("Please select at least one PNG or JPG file to upload.");
      $("#error-upload-multi-pages").css("display", "block");
      return;
    }
    
    var json_array = [];
    var single_page_meta_data = {
      jsonClass: "Page",
      purpose: "page",
      selector: {
        jsonClass: "QualitativeSelector",
      },
      source: this.uploadedBookId,
    };
   

    const httpUploadOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json' }),
      withCredentials: true
    };
   
    const formData: any = new FormData();
    formData.set("files_purpose", "pagination");
    for(let i =0; i < this.pageFilesArraySelected.length; i++) {
      json_array.concat(single_page_meta_data);
      formData.append("files", this.pageFilesArraySelected[i]);
    }
    formData.set("resource_json", JSON.stringify(json_array));
    
   
    this.spinner.show();
    return this.http.post(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources', formData,
      httpUploadOptions).subscribe(
        response => {
          this.spinner.hide();
          $('#multiple-pages-images-files').val('');
          $('#multi-pages-upload-info').text("Pages uploaded successfully. Continue to add more pages or click on Finish to go to the dashboard.");
          //Uploads sample Page; replace with original Page thumbnail
          this.addSlide();
          this.pageFilesArraySelected = null;
        },
        error => {
          this.spinner.hide();
          $("#error-upload-multi-pages").css("display", "block");
          let errorCode = this.getResponseErrorCode(error);
          if (errorCode == 403) {
            $("#error-add-book").text("Repository not set, perhaps login was not proper. Please logout and login afresh before next attempt.");
          } else if (errorCode == 401) {
            $("#error-add-book").text("Unauthorized call, session may have expired. Please login afresh and retry.");
          } else if (errorCode == 400) {
            $("#error-add-book").text("Bad Request. Please contact the platform administartor.");
          }else{
            $("#error-upload-multi-pages").text("Unable to upload the selected pages. Please retry or contact the platform administrator.");
          }
        }
    );
  }


  /**
   * Creates a Book Entry on the Vedavaapi Platform.
   * @param $book_title 
   * @param $book_author_information 
   * @param $book_type 
   * @param $book_description 
   */
  createBookEntry($book_title, $book_author_information,
    $book_type, $book_description) {

    this.hideErrorDivs();

    if (!this.validateFieldValues($book_title, $book_author_information, $book_description)) {
      return;
    }

    this.bookTitle = $book_title;
    
    this.spinner.show();

    let author_array = $book_author_information.split(',');
    let authors_object_array = [];
    for (let author of author_array) {
      let name_json = { chars: author, jsonClass: "Text", metadata: [], script: "itrans" };

      let object = { agentClass: "Person", jsonClass: "Agent", name: name_json };
      authors_object_array.push(object);
    }

    let metadataJson = [
      {
        jsonClass: "MetadataItem",
        label: "description",
        value: $book_description
      }];


    let titleJson = {
      chars: $book_title,
      jsonClass: "Text",
      metadata: [],
      script: "itrans",
      type: "dctypes:Text"
    };

    let book_type = "book";
    if ($book_type != null && $book_type.trim().length > 0) {
      book_type = $book_type;
    }

    let requestJson = {
      authorsList: authors_object_array, jsonClassLabel: book_type,
      jsonClass: "BookPortion", metadata: metadataJson,
      title: titleJson
    };

    const httpUploadOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      withCredentials: true
    };

    let request_params = "resource_json=" + encodeURIComponent(JSON.stringify(requestJson));
    return this.http.post(this.endpointService.getBaseUrl() + '/ullekhanam/v1/resources', request_params,
      httpUploadOptions).subscribe(
        response => {
          this.spinner.hide();

          $("#upload_book_container").css("display", "none");
          $("#book_title").attr("readonly", "true");
          $("#book_type").attr("readonly", "true");
          $("#book_author").attr("readonly", "true");
          $("#book_description").attr("readonly", "true");
          $("#add_book_thumbnail_container").css("display", "block");

          const responseStr = JSON.stringify(response);
          JSON.parse(responseStr, (key, value) => {
            if (key === '_id') {
              this.uploadedBookId = value;
            }
            return value;
          });

          if (this.uploadedBookId == null) {
            $("#error-add-book").text("Server did not send the book Id. Cannot continue with the upload process. Plese retry.");
            $("#error-add-book").css("display", "block");
            return;
          }

          $("#info-book-created").text("The book '" + $book_title + "' has been created. Please upload the thumbnail.");
          this.bookTitle = $book_title;
        },
        error => {
          this.spinner.hide();
          let errorCode = this.getResponseErrorCode(error);
          if (errorCode == 403) {
            $("#error-add-book").text("Repository not set, perhaps login did not occur properly. Please logout and login afresh before next attempt.");
          } else if (errorCode == 401) {
            $("#error-add-book").text("Unauthorized call, session may have expired. Please login afresh and retry.");
          } else if (errorCode == 400) {
            $("#error-add-book").text("Bad Request. Please contact the platform administartor.");
          } else {
            $("#error-add-book").text("Unknown erorr, please contact the platform administrator or retry after some time.");
          }

          $("#error-add-book").css("display", "block");

        }
      );
  }


  /*
  * display bulk book uploaded
  */
 private showBulkUploadBooks() {
   $('#add_page_container').css('display','none');
   $('#upload-bulk-image').css('display','block');
 }
  
  /**
   * Hides the Error Div elements
   */
  private hideErrorDivs() {
    $('#book_title_minlength_error').css('display', 'none');
    $('#book_author_minlength_error').css('display', 'none');
    $('#book_description_minlength_error').css('display', 'none');
  }

  /**
   * 
   * @param error Returns the Error Code.
   */
  private getResponseErrorCode(error) {
    const errorStr = JSON.stringify(error);
    let errorCode = -1;
    JSON.parse(errorStr, (key, value) => {
      if (key === 'code') {
        errorCode = value;
      }
      return value;
    });
    return errorCode;
  }


  /**
   * Image file for Page selected callback.
   * @param event
   */
  onPageImageSelected(event){
    this.selectedPageFile = event.target.files[0];

  }

  /**
   * Multiple files selected callback.
   * @param event 
   */
  onMultiPageImageSelected(fileInput: any){
    this.pageFilesArraySelected = <Array<File>>fileInput.target.files;
  }
    

  /**
   * On Thumbnail File changed callback.
   * @param event 
   */
  onThumbnailFileChanged(event) {
    this.selectedThumbnailFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      $("#img_book_thumbnail").attr('src', this.imagePreview);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  

  /**
   * Method uploads Book thumbnail.
   */
  onThumbnailUpload() {
    if (this.uploadedBookId == null || this.uploadedBookId.trim().length == 0) {
      $('#error-upload-thumbnail').text("Book Entry not created. Perhaps the session expired. please retry after some time.");
      return;
    }

    if (this.selectedThumbnailFile == null) {
      $('#error-upload-thumbnail').text("Please select a PNG or JPG file to upload.");
      return;
    }

    if (this.selectedThumbnailFile.name == null) {
      $('#error-upload-thumbnail').text("The file seems to be corrupt. Please select a different file.");
      return;
    }

    //Content-Type not required;
    // https://stackoverflow.com/questions/46787612/file-upload-angular2-via-multipart-form-data-400-error

    this.spinner.show();
    const httpUploadOptions = {
      headers: new HttpHeaders(
        { 'Accept': 'application/json' }),
      withCredentials: true
    };

    const uploadData = new FormData();
    uploadData.append('files', this.selectedThumbnailFile);
    uploadData.set("files_purpose", "thumbnail");

    this.http.post(this.endpointService.getBaseUrl() + "/ullekhanam/v1/resources/"
      + this.uploadedBookId + "/files", uploadData, httpUploadOptions)
      .subscribe(
        response => {
          this.spinner.hide();
          console.log(response);
          $("#add_book_thumbnail_container").css('display', 'none');
          $("#add_page_container").css('display', 'block');
          if(this.bookTitle != null) {
            $("#book-title-carousel").text("Books > " + this.bookTitle);
          }
        },
        error => {
          this.spinner.hide();

          if (error != null) {
            let errorCode = this.getResponseErrorCode(error);
            if (errorCode == 403) {
              $("#error-upload-thumbnail").text("Repository not set, perhaps login did not occur properly. Please logout and login afresh before next attempt.");
            } else if (errorCode == 401) {
              $("#error-upload-thumbnail").text("Unauthorized call, session may have expired. Please login afresh and retry.");
            } else if (errorCode == 400) {
              $("#error-upload-thumbnail").text("Bad Request. Please contact the platform administartor.");
            } else {
              $("#error-upload-thumbnail").text("Unknown erorr, please contact the platform administrator or retry after some time.");
            }
          } else {
            $("#error-upload-thumbnail").text("Unknown erorr, please contact the platform administrator or retry after some time.");
          }
        }
      )
  }
}// end of class declaration
