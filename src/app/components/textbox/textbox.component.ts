import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  SimpleChange,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class TextboxComponent {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() errMsg!: string;
  @Input() btnClicked: boolean = false;

  ngOnChanges() {
    if (this.btnClicked) {
      this.formGroup.controls[this.name].markAsTouched();
    }
  }

  keyPressAlphaNumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
