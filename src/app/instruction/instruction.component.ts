import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import {InstructionService} from "./instruction.service";
import {NavigateDirective} from "../navigate.directive";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-instruction',
	imports: [
		NavigateDirective,
		NgIf
	],
	templateUrl: './instruction.component.html',
	standalone: true,
})

export class InstructionComponent implements OnInit {

	instructions: any[] = [];

	get instructionsSorted() {
		let res = this.instructions;

		return res;
	}

	constructor(
		private global: GlobalService,
		private service: InstructionService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		this.service.instructionSubject.subscribe(value => {
			this.instructions = value.instructions;
		})
		this.service.findAll();
	}

	delete(id: number) {
		this.service.delete(id);
	}

}
