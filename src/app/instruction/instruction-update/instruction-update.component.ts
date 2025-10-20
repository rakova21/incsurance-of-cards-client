import {Component, OnInit} from '@angular/core';
import {NavigateDirective} from "../../navigate.directive";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../global.service";
import {InstructionService} from "../instruction.service";

@Component({
	selector: 'app-instruction-update',
	imports: [
		NavigateDirective,
		ReactiveFormsModule
	],
	templateUrl: './instruction-update.component.html',
	standalone: true,
})

export class InstructionUpdateComponent implements OnInit {

	id: number = 0;

	typeFormGroup = new FormGroup({
		description: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(5000)]),
	})

	img: any = null;

	constructor(
		private router: Router,
		private global: GlobalService,
		private service: InstructionService,
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
						description: res.data.description,
					})
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
	}

	changeImg(event: any) {
		this.img = event.target.files;
	}

	get checkSubmit(): boolean {
		if (this.typeFormGroup.invalid) return true;

		return false;
	}

	update() {
		this.service.update(this.id, this.typeFormGroup.value, this.img)
	}

}
