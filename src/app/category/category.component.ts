import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import {CategoryService} from "./category.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryCardComponent} from "./category-card/category-card.component";

@Component({
	selector: 'app-category',
	imports: [
		ReactiveFormsModule,
		CategoryCardComponent
	],
	templateUrl: './category.component.html',
	standalone: true,
})

export class CategoryComponent implements OnInit {

	categories: any[] = [];

	categoryFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private global: GlobalService,
		private categoryService: CategoryService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'ADMIN') this.global.page('login');

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})
		this.categoryService.findAll();
	}

	save() {
		this.categoryService.save(this.categoryFormGroup.value);
		this.categoryFormGroup.reset();
	}
}
