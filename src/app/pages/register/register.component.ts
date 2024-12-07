import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { IUser } from '../../models/iuser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,          // Para las directivas estructurales como *ngIf y *ngFor.
    ReactiveFormsModule,   // Para los formularios reactivos.          // Para la navegación entre rutas.
    HttpClientModule,      // Para realizar solicitudes HTTP.
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    // Definir el formulario reactivo con los campos necesarios
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  close(): void {
    this.closeModal.emit();
  }

  register(): void {
    if (this.registerForm.valid) {
      const userData: IUser = this.registerForm.value;
      this.userService.register(userData).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          alert('Registro exitoso');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
          alert('Error al registrar usuario');
        },
      });
    } else {
      alert('Por favor, llena todos los campos correctamente.');
    }
  }
}
