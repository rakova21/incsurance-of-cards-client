import {Component, OnInit} from '@angular/core';
import {KeyValuePipe, NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GlobalService} from "../../global.service";
import {OrderingService} from "../ordering.service";
import {EnumService} from "../../enum.service";
import {AlertService} from "../../alert/alert.service";
import {UserService} from "../../user/user.service";

@Component({
	selector: 'app-ordering-add-user',
	imports: [
		KeyValuePipe,
		NgForOf,
		ReactiveFormsModule
	],
	templateUrl: './ordering-add-user.component.html',
	standalone: true,
})

export class OrderingAddUserComponent implements OnInit {

	orderingFormGroup = new FormGroup({
		cardStart: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{4}$")]),
		cardEnd: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{4}$")]),
		cardTerm: new FormControl("", [Validators.pattern("^(0[1-9]|1[0-2])/([0-9]{2})$")]),
		cardBank: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),

		account: new FormControl("", [Validators.maxLength(255)]),
		accountTerm: new FormControl("", [Validators.pattern("^(0[1-9]|1[0-2])/([0-9]{2})$")]),
		accountBank: new FormControl("", [Validators.maxLength(255)]),

		ewallet: new FormControl("", [Validators.maxLength(255)]),
		ewalletTerm: new FormControl("", [Validators.pattern("^(0[1-9]|1[0-2])/([0-9]{2})$")]),
		ewalletName: new FormControl("", [Validators.maxLength(255)]),
	})

	cardCategories: any[] = [];
	cardCategory: string = "";

	users: any[] = [];
	userId: number = 0;

	constructor(
		private global: GlobalService,
		private service: OrderingService,
		private enumService: EnumService,
		private alert: AlertService,
		private userService: UserService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'MANAGER') this.global.page('login')

		this.enumService.enumSubject.subscribe(value => {
			this.cardCategories = value.cardCategories;
		})
		this.enumService.cardCategories();

		this.userService.findAllUser().subscribe({
			next: (res: any) => this.users = res.data,
			error: (e: any) => this.alert.add(e.error.message)
		});
	}

	changeCardCategory(event: any) {
		this.cardCategory = event.target.value;
	}

	changeUserId(event: any) {
		this.userId = event.target.value;
	}

	get checkSubmit(): boolean {
		if (this.orderingFormGroup.invalid) return true;
		if (this.cardCategory === '') return true;
		if (this.userId === 0) return true;

		return false;
	}

	save() {
		this.service.saveUser(this.orderingFormGroup.value, this.cardCategory, this.userId).subscribe({
			next: () => {
				this.orderingFormGroup.reset()
				this.alert.add("Заявка оформлена", "success")
			},
			error: (e: any) => this.alert.add(e.error.message),
		})
	}

}
