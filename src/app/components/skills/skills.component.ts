import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { Skill } from 'src/app/interface/skill'
import { AuthService } from 'src/app/service/auth.service'
import { SkillService } from 'src/app/service/skill.service'

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  emptySkill: Skill = {
    title: '',
    percentage: 0,
  }

  skills: Skill[] = []

  constructor(
    private authService: AuthService,
    private skillService: SkillService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.skillService.getSkills().subscribe(
      (res) => {
        if(res.data.skills){
          this.skills=res.data.skills
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }

  isLogged() {
    return this.authService.loggedIn()
  }

  private deleteSkill(ski: Skill) {
    if (ski.id) {
      this.skillService.deleteSkill(ski.id).subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }

  openDialog(ski: Skill): void {
    const dialogRef = this.dialog.open(SkillEditDialog, {
      width: '50%',
      data: { ...ski },
    })

    dialogRef.afterClosed().subscribe((result: Skill) => {
      if (result) {
        console.log(result)
        this.skillService.updateSkill(result).subscribe(
          (res) => {
            if (res.data.skill) {
              this.skills = this.skills.filter((ski) => ski.id != result.id)
              this.skills.push(res.data.skill)
            }
            console.log(this.skills)
          },
          (err) => {
            console.log(err)
          }
        )
      }
    })
  }

  openDeleteDialog(ski: Skill) {
    const dialogRef = this.dialog.open(SkillDeleteDialog, {
      width: '20rem',
      data: { ...ski },
    })

    dialogRef.afterClosed().subscribe((result: Skill) => {
      if (result) {
        this.skills=this.skills.filter((ski)=>ski.id!=result.id)
        this.deleteSkill(result)
      }
    })
  }
}

@Component({
  selector: 'skill-edit-dialog',
  templateUrl: 'skill-edit-dialog.html',
})
export class SkillEditDialog {
  editar = false
  constructor(
    public dialogRef: MatDialogRef<SkillEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Skill
  ) {
    this.editar = data.title != ''
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  isEditar() {
    return this.editar
  }
  formatLabel(value:number){
    return `${value}%`
  }
}

@Component({
  selector: 'skill-delete-dialog',
  templateUrl: 'skill-delete-dialog.html',
})
export class SkillDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<SkillDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Skill
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
}
