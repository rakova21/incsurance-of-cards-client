import {Component, OnInit} from '@angular/core';
import {UserCardComponent} from "./user-card/user-card.component";
import {UserService} from "./user.service";
import {NgIf} from "@angular/common";
import {EnumService} from "../enum.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GlobalService} from "../global.service";

@Component({
	selector: 'app-user',
	standalone: true,
	imports: [
		UserCardComponent,
		NgIf,
		ReactiveFormsModule,
		FormsModule
	],
	templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

	users: any[] = [];

	constructor(
		private userService: UserService,
		private enumService: EnumService,
		private global: GlobalService,
	) {
	}

	ngOnInit() {
		if (this.global.role !== 'ADMIN') this.global.page('login')

		this.userService.userSubject.subscribe(value => {
			this.users = value.users;
		})

		this.enumService.roles();
		this.userService.findAll();
	}

	getSortedUsers() {
		return this.users.sort((a: any, b: any) => {
			if (a.id > b.id) return -1;
			if (a.id < b.id) return 1;
			return 0;
		});
	}

	get userid() {
		return this.global.userid;
	}
}
