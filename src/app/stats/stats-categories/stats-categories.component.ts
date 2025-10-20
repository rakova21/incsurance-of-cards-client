import {Component, OnInit} from '@angular/core';
import {StatsService} from "../stats.service";
import {ChartComponent} from "ng-apexcharts";

@Component({
	selector: 'app-stats-categories',
	imports: [
		ChartComponent
	],
	templateUrl: './stats-categories.component.html',
	standalone: true,
})

export class StatsCategoriesComponent implements OnInit {

	chartOptions: any;

	names: any[] = [];
	values: any[] = [];

	constructor(
		private statsService: StatsService,
	) {
	}

	ngOnInit(): void {
		this.statsService.categories().subscribe({
			next: (res: any) => {
				this.names = res.data.names;
				this.values = res.data.values;
				this.draw();
			}
		})
	}

	draw() {
		this.chartOptions = {
			series: this.values,
			labels: this.names,
			chart: {
				height: 400,
				type: "polarArea",
			},
			stroke: {
				colors: ["#fff"]
			},
			fill: {
				opacity: 0.8
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200
						},
						legend: {
							position: "bottom"
						}
					}
				}
			]
		};
	}

}
