import { NgModule } from '@angular/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSliderModule } from '@angular/material/slider'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

const MaterialComponents = [
  MatDialogModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  DragDropModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatDatepickerModule,
  MatNativeDateModule
]
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
