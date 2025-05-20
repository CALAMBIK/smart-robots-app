import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private _snackBar = inject(MatSnackBar);

  public formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telegram: new FormControl('', [
      Validators.required,
      Validators.pattern(/^@[a-zA-Z0-9_]{3,100}$/),
    ]),
    type: new FormControl('tech-problem', Validators.required),
    description: new FormControl(''),
    experience: new FormControl('Новичок'),
  });

  public onClick() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      const message = `
        Данные формы:
        Имя: ${formData.name || 'Не указано'}
        Email: ${formData.email || 'Не указан'}
        Telegram: ${formData.telegram || 'Не указан'}
        Тип обращения: ${this.getTypeLabel(formData.type || 'tech-problem')}
        Опыт: ${formData.experience || 'Не указан'}
        Описание: ${formData.description || 'Нет описания'}
      `;

      this._snackBar.open(message, 'Закрыть', {
        duration: 15000,
        panelClass: ['custom-snackbar'],
      });
    } else {
      this._snackBar.open(
        'Пожалуйста, заполните все обязательные поля правильно',
        'ОК',
        { duration: 5000 }
      );
    }
  }

  private getTypeLabel(type: string | null): string {
    const types: { [key: string]: string } = {
      'tech-problem': 'Техническая проблема',
      api: 'Вопрос по интеграции API',
      func: 'Предложение по функционалу',
      request: 'Запрос на коммерческое сотрудничество',
      review: 'Отзыв о платформе',
    };
    return type ? types[type] || type : 'Не указан';
  }
}
