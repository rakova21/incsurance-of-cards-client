import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import {OrderingService} from "./ordering.service";
import {NavigateDirective} from "../navigate.directive";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-ordering',
	imports: [
		NavigateDirective,
		NgIf
	],
	templateUrl: './ordering.component.html',
	standalone: true,
})

export class OrderingComponent implements OnInit {

	orderings: any[] = [];

	get orderingsSorted() {
		let res = this.orderings;

		return res;
	}

	constructor(
		private global: GlobalService,
		private service: OrderingService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		if (this.role !== 'USER' && this.role !== 'SENIOR_MANAGER') this.global.page('login')

		this.service.orderingSubject.subscribe(value => {
			this.orderings = value.orderings;
		})
		this.service.findAll();
	}

}
