import { NgModule } from '@angular/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {DragDropModule} from '@angular/cdk/drag-drop'

const MaterialComponents = [
  MatDialogModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  DragDropModule
]
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
