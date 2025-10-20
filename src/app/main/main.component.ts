import {Component} from '@angular/core';
import {NavigateDirective} from "../navigate.directive";

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [
		NavigateDirective
	],
	templateUrl: './main.component.html',
})

export class MainComponent {

}
