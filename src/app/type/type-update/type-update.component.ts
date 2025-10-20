import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../global.service";
import {TypeService} from "../type.service";
import {CategoryService} from "../../category/category.service";
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-type-update',
	imports: [
		FormsModule,
		NavigateDirective,
		ReactiveFormsModule
	],
	templateUrl: './type-update.component.html',
	standalone: true,
})

export class TypeUpdateComponent implements OnInit {

	id: number = 0;

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
		private router: Router,
		private global: GlobalService,
		private service: TypeService,
		private categoryService: CategoryService,
		private activatedRoute: ActivatedRoute,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'ADMIN') this.global.page('login')

		this.activatedRoute.queryParams.subscribe(value => {
			this.id = value['id'];
			this.service.find(value['id']).subscribe({
				next: (res: any) => {
					this.typeFormGroup.setValue({
						name: res.data.name,
						sum: res.data.sum,
						prize: res.data.prize,
						term: res.data.term,
						conditions: res.data.conditions,
					})
					this.categoryId = res.data.categoryId
				},
				error: (e: any) => {
					if (e.error.code === 404) {
						this.router.navigate(['/error'], {queryParams: {message: e.error.message}})
					} else {
						this.global.page('login')
					}
				}
			})
		})

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

	update() {
		this.service.update(this.id, this.typeFormGroup.value, this.categoryId)
	}

}
