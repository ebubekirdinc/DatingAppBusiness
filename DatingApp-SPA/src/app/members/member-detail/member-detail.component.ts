import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services/users.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/_models/IUser';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
user:IUser;
galleryOptions:NgxGalleryOptions[];
galleryImage:NgxGalleryImage[];
tabsSelectedIndex:number=0;

  constructor(
    private userService:UsersService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user=data["user"];
    });

    this.route.queryParams.subscribe(data=>{
      const selectedTabs=data["tab"];
            this.tabsSelectedIndex=selectedTabs>0?selectedTabs:0;
    });

    this.galleryOptions=[{
      width:"500px",
      height:"500px",
      imagePercent:100,
      thumbnailsColumns:4,
      imageAnimation:NgxGalleryAnimation.Slide,
      preview:false
    }];

    this.galleryImage=this.getImages();
  }

  changeTabs(tabsId:number){
    this.tabsSelectedIndex=tabsId;
  }

  getImages()
  {
    const imageUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imageUrls;

  }

}
