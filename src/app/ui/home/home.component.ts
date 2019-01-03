import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { EndpointsService } from 'src/app/endpoints.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  private currentPageIndex: number;

  @ViewChild('slickModal') slickModal;
   
  slides = [
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=Aq46vgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},  
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
    {img: "http://books.google.com/books/content?id=aGzFtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
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
      }
    ]

  };
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
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


  constructor(private endpointService: EndpointsService) {

  }

  ngOnInit() {
    this.currentPageIndex = 0;
  }


}
