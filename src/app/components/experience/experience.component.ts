import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { Experience } from 'src/app/interface/experience'
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
      (res) => {
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
  isEmpty():boolean{
    return this.experiences.length==0;
  }

  emptyExperience: Experience = {
    companyImg: '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',
    title: '',
    period: '',
    description: '',
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.experiences, event.previousIndex, event.currentIndex)
  }

  private deleteExperience(exp: Experience) {
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
  editar = false
  constructor(
    public dialogRef: MatDialogRef<ExperienceEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Experience
  ) {
    this.editar=data.title!=''

  }

  onNoClick(): void {
    this.dialogRef.close()
  }
  isEditar() {
    return this.editar
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


