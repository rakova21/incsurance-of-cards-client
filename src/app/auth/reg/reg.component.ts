import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AlertService} from "../../alert/alert.service";

@Component({
	selector: 'app-reg',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
	],
	templateUrl: './reg.component.html',
})

export class RegComponent {

	repeat: any = null;

	regForm = new FormGroup({
		username: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		password: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private authService: AuthService,
		private alert: AlertService,
	) {
	}

	showPassword: boolean = false;

	passwordVisibility() {
		this.showPassword = !this.showPassword;
	}

	showRepeat: boolean = false;

	repeatVisibility() {
		this.showRepeat = !this.showRepeat;
	}

	changeRepeat(event: any) {
		this.repeat = event.target.value;
	}

	submit() {
		if (this.regForm.invalid) return true;
		if (this.repeat === null) return true;

		return false;
	}

	regFormSubmit() {
		let password: any = this.regForm.value.password;

		if (this.repeat !== password) {
			this.alert.add("Пароли не совпадают", "warning");
		} else {
			this.authService.reg(this.regForm.value);
		}
	}
}
