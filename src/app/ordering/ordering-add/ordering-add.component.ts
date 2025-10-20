import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";
import {OrderingService} from "../ordering.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EnumService} from "../../enum.service";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {AlertService} from "../../alert/alert.service";

@Component({
	selector: 'app-ordering-add',
	imports: [
		ReactiveFormsModule,
		NgForOf,
		KeyValuePipe
	],
	templateUrl: './ordering-add.component.html',
	standalone: true,
})

export class OrderingAddComponent implements OnInit {

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

	constructor(
		private global: GlobalService,
		private service: OrderingService,
		private enumService: EnumService,
		private alert: AlertService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'USER') this.global.page('login')

		this.enumService.enumSubject.subscribe(value => {
			this.cardCategories = value.cardCategories;
		})
		this.enumService.cardCategories();
	}

	changeCardCategory(event: any) {
		this.cardCategory = event.target.value;
	}

	get checkSubmit(): boolean {
		if (this.orderingFormGroup.invalid) return true;
		if (this.cardCategory === '') return true;

		return false;
	}

	save() {
		this.service.save(this.orderingFormGroup.value, this.cardCategory).subscribe({
			next: () => {
				this.orderingFormGroup.reset()
				this.alert.add("Заявка оформлена", "success")
			},
			error: (e: any) => this.alert.add(e.error.message),
		})
	}

}
