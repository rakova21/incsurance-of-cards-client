import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import {TypeService} from "./type.service";
import {NavigateDirective} from "../navigate.directive";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-type',
	imports: [
		NavigateDirective,
		NgIf
	],
	templateUrl: './type.component.html',
	standalone: true,
})

export class TypeComponent implements OnInit {

	types: any[] = [];

	get typesSorted() {
		let res = this.types;

		return res;
	}

	constructor(
		private global: GlobalService,
		private service: TypeService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		this.service.typeSubject.subscribe(value => {
			this.types = value.types;
		})
		this.service.findAll();
	}

	delete(id: number) {
		this.service.delete(id);
	}

}
