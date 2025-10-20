import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GlobalService} from "../../global.service";
import {InstructionService} from "../instruction.service";
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-instruction-add',
	imports: [
		NavigateDirective,
		ReactiveFormsModule
	],
	templateUrl: './instruction-add.component.html',
	standalone: true,
})

export class InstructionAddComponent implements OnInit {

	typeFormGroup = new FormGroup({
		description: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(5000)]),
	})

	img: any = null;

	constructor(
		private global: GlobalService,
		private service: InstructionService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'ADMIN') this.global.page('login')
	}

	changeImg(event: any) {
		this.img = event.target.files;
	}

	get checkSubmit(): boolean {
		if (this.typeFormGroup.invalid) return true;
		if (this.img === null) return true;

		return false;
	}

	save() {
		this.service.save(this.typeFormGroup.value, this.img)
	}

}
