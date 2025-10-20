import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "./account.service";
import {AlertService} from "../alert/alert.service";

@Component({
	selector: 'app-account',
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './account.component.html',
	standalone: true,
})

export class AccountComponent implements OnInit {

	userFormGroup = new FormGroup({
		fio: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		birthday: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		address: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		contact: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		email: new FormControl("", [Validators.email, Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		passport: new FormControl("", [Validators.pattern("^[A-Z]{2}\\d{7}$"), Validators.required, Validators.minLength(1), Validators.maxLength(9)]),
	})

	constructor(
		private global: GlobalService,
		private service: AccountService,
		private alert: AlertService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'USER') this.global.page('login');

		this.service.find().subscribe({
			next: (res: any) => {
				this.userFormGroup.setValue({
					fio: res.data.fio,
					birthday: res.data.birthday,
					address: res.data.address,
					contact: res.data.contact,
					email: res.data.email,
					passport: res.data.passport,
				})
			},
			error: (e: any) => this.alert.add(e.error.message)
		})
	}

	update() {
		this.service.update(this.userFormGroup.value).subscribe({
			next: (res: any) => this.alert.add("Данные обновлены!", "success"),
			error: (e: any) => this.alert.add(e.error.message)
		})
	}

}
