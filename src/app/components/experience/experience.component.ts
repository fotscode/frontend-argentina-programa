import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { Experience } from 'src/app/interface/experience'
import { ExperienceResponse } from 'src/app/interface/experience-response'
import { AuthService } from 'src/app/service/auth.service'
import { ExperienceService } from 'src/app/service/experience.service'

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = []
  constructor(
    private authService: AuthService,

    public dialog: MatDialog,
    private experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    this.experienceService.getExperiences().subscribe(
      (res: ExperienceResponse) => {
        if (res.data.experiences) {
          this.experiences = res.data.experiences
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }

  isLogged(): boolean {
    return this.authService.loggedIn()
  }

  emptyExperience: Experience = {
    companyImg: '',
    title: '',
    period: '',
    description: '',
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.experiences, event.previousIndex, event.currentIndex)
  }
  deleteExperience(exp: Experience) {
    if (exp.id) {
      this.experienceService.deleteExperience(exp.id).subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }

  openDialog(exp: Experience): void {
    const dialogRef = this.dialog.open(ExperienceEditDialog, {
      width: '50%',
      data: { ...exp },
    })

    dialogRef.afterClosed().subscribe((result: Experience) => {
      if (result) {
        this.experienceService.updateExperience(result).subscribe(
          (res) => {
            //this.profile = {...result} TODO cambiar to set result.id
            if (res.data.experience) {
              this.experiences = this.experiences.filter(
                (exp) => exp.id != result.id
              )
              this.experiences.push(res.data.experience)
            }
            console.log(this.experiences)
          },
          (err) => {
            console.log(err)
          }
        )
      }
    })
  }

  openDeleteDialog(exp: Experience) {
    const dialogRef = this.dialog.open(ExperienceDeleteDialog, {
      width: '20rem',
      data: { ...exp },
    })

    dialogRef.afterClosed().subscribe((result: Experience) => {
      if (result) {
        this.experiences=this.experiences.filter((exp)=>exp.id!=result.id)
        this.deleteExperience(result)
      }
    })
  }
}

@Component({
  selector: 'experience-edit-dialog',
  templateUrl: 'experience-edit-dialog.html',
})
export class ExperienceEditDialog {
  constructor(
    public dialogRef: MatDialogRef<ExperienceEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Experience
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
  isEditar() {
    return this.data.title != ''
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#compImg')

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        this.data.companyImg = this._arrayBufferToBase64(e.target.result)
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

@Component({
  selector: 'experience-delete-dialog',
  templateUrl: 'experience-delete-dialog.html',
})
export class ExperienceDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<ExperienceDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Experience
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
}
