import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { CustomResponse } from 'src/app/interface/custom-response'
import { Profile } from 'src/app/interface/profile'
import { ProfileService } from 'src/app/service/profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: Profile = {
    id: 0,
    bannerImg:
      '',
    profileImg:
      '',
    name: '',
    title: 'Full Stack Developer Jr.',
    description:
      ''
  }
  constructor(private profileService:ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile(3).subscribe((res)=>{
      if (res.data.profile) this.profile=res.data.profile;
    })
  }
}
