import {Component, OnInit} from '@angular/core';
import {NgApexchartsModule} from "ng-apexcharts";
import {FormsModule} from "@angular/forms";
import {GlobalService} from "../global.service";
import {StatsCategoriesComponent} from "./stats-categories/stats-categories.component";

@Component({
	selector: 'app-stats',
	standalone: true,
	imports: [
		NgApexchartsModule,
		FormsModule,
		StatsCategoriesComponent
	],
	templateUrl: './stats.component.html',
})

export class StatsComponent implements OnInit {

	constructor(
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
		if (this.global.role !== 'ADMIN') this.global.page('login');
	}

}
