import { Component, Inject, OnInit } from '@angular/core'
import { Profile } from 'src/app/interface/profile'
import { ProfileService } from 'src/app/service/profile.service'
import { AuthService } from 'src/app/service/auth.service'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: Profile = {
    id: 0,
    bannerImg: '',
    profileImg: '',
    name: '',
    title: '',
    description: '',
  }

  editedProfile: Profile = { ...this.profile }
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile(3).subscribe((res) => {
      if (res.data.profile) {
        this.profile = res.data.profile
        this.editedProfile = { ...this.profile }
      }
    })
  }
  isLogged(): Boolean {
    return this.authService.loggedIn()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProfileEditDialog, {
      width: '50%',
      data: this.editedProfile,
    })

    dialogRef.afterClosed().subscribe((result: Profile) => {
      if (result) {
        this.profileService.updateProfile(result).subscribe(
          (res) => {
            this.profile = result
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
      }
    })
  }
}

@Component({
  selector: 'profile-edit-dialog',
  templateUrl: 'profile-edit-dialog.html',
})
export class ProfileEditDialog {
  constructor(
    public dialogRef: MatDialogRef<ProfileEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Profile
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
  onBannerSelected() {
    const inputNode: any = document.querySelector('#banImg')

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        this.data.bannerImg = this._arrayBufferToBase64(e.target.result)
      }

      reader.readAsArrayBuffer(inputNode.files[0])
    }
  }
  onProfileSelected() {
    const inputNode: any = document.querySelector('#profImg')

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        this.data.profileImg = this._arrayBufferToBase64(e.target.result)
      }

      reader.readAsArrayBuffer(inputNode.files[0])
    }
  }

  _arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = ''
    var bytes = new Uint8Array(buffer)
    var len = bytes.byteLength
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }
}
