import { Component, Inject, OnInit } from '@angular/core'
import { User } from 'src/app/interface/user'
import { AuthService } from 'src/app/service/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
  }

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router:Router
  ) {}
  ngOnInit(): void {}

  logIn() {
    this.authService.logIn(this.user).subscribe(
      (res) => {
        localStorage.setItem('token', res.access_token)
        localStorage.setItem('refresh_token', res.refresh_token)
        this.snackBar.open('Se ha iniciado sesion', void 0, { duration: 3000 })
        this.router.navigate(["/"])
      },
      (err) => {
        this.snackBar.open('El usuario o la contraseña es invalido', void 0, {
          duration: 3000,
        })
      }
    )
  }
}
