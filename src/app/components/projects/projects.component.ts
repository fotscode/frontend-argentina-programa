import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { Project } from 'src/app/interface/project'
import { Skill } from 'src/app/interface/skill'
import { AuthService } from 'src/app/service/auth.service'
import { ProjectService } from 'src/app/service/project.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  emptyProject: Project = {
    title: '',
    releaseDate: new Date(),
    description: '',
    projectUrl: '',
    projectImg:
      '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',
  }

  projects: Project[] = []

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (res) => {
        if (res.data.projects) {
          this.projects = res.data.projects
          this.projects.forEach(
            (proj) => (proj.releaseDate = new Date(proj.releaseDate))
          )
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }
  isEmpty(): boolean {
    return this.projects.length == 0
  }

  isLogged() {
    return this.authService.loggedIn()
  }

  openDialog(proj: Project) {
    const dialogRef = this.dialog.open(ProjectEditDialog, {
      width: '50%',
      data: { ...proj },
    })

    dialogRef.afterClosed().subscribe((result: Project) => {
      if (result) {
        this.projectService.updateProject(result).subscribe(
          (res) => {
            if (res.data.project) {
              this.projects = this.projects.filter(
                (proj) => proj.id != result.id
              )
              res.data.project.releaseDate = new Date(
                res.data.project.releaseDate
              )
              this.projects.push(res.data.project)
            }
          },
          (err) => {
            console.log(err)
          }
        )
      }
    })
  }
  openDeleteDialog(exp: Project) {
    const dialogRef = this.dialog.open(ProjectDeleteDialog, {
      width: '20rem',
      data: { ...exp },
    })

    dialogRef.afterClosed().subscribe((result: Project) => {
      if (result) {
        this.projects = this.projects.filter((exp) => exp.id != result.id)
        this.deleteAndRefreshCarousel()
        this.deleteProject(result)
      }
    })
  }

  private deleteAndRefreshCarousel() {
    let $carousel = $('#carouselExampleCaptions')
    var ActiveElement = $carousel.find('.carousel-item.active')
    ActiveElement.remove()
    var NextElement = $carousel.find('.carousel-item').first()
    NextElement.addClass('active')
  }

  private deleteProject(exp: Project) {
    if (exp.id) {
      this.projectService.deleteProject(exp.id).subscribe(
        (res) => {
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }
}

@Component({
  selector: 'project-edit-dialog',
  templateUrl: 'project-edit-dialog.html',
})
export class ProjectEditDialog {
  editar = false
  constructor(
    public dialogRef: MatDialogRef<ProjectEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {
    this.editar = data.title != ''
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
  isEditar() {
    return this.editar
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#projImg')

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        this.data.projectImg = this._arrayBufferToBase64(e.target.result)
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
  selector: 'project-delete-dialog',
  templateUrl: 'project-delete-dialog.html',
})
export class ProjectDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<ProjectDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
}
