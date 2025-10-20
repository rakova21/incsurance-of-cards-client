import {Component, OnInit} from '@angular/core';
import {NavigateDirective} from "../../navigate.directive";
import {GlobalService} from "../../global.service";
import {TypeService} from "../type.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryService} from "../../category/category.service";

@Component({
	selector: 'app-type-add',
	imports: [
		NavigateDirective,
		ReactiveFormsModule
	],
	templateUrl: './type-add.component.html',
	standalone: true,
})

export class TypeAddComponent implements OnInit {

	typeFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		sum: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(1000000)]),
		prize: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(1000000)]),
		term: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		conditions: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	categories: any[] = [];
	categoryId: number = 0;

	constructor(
		private global: GlobalService,
		private service: TypeService,
		private categoryService: CategoryService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'ADMIN') this.global.page('login')

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})
		this.categoryService.findAll();
	}

	changeCategoryId(event: any) {
		this.categoryId = event.target.value;
	}

	get checkSubmit(): boolean {
		if (this.typeFormGroup.invalid) return true;
		if (this.categoryId == 0) return true;

		return false;
	}

	save() {
		this.service.save(this.typeFormGroup.value, this.categoryId)
	}

}
