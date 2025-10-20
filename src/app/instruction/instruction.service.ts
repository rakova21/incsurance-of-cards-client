import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";
import {AlertService} from "../alert/alert.service";

@Injectable({
	providedIn: 'root'
})

export class InstructionService {

	instructionSubject = new BehaviorSubject<any>({
		instructions: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService,
		private alert: AlertService,
	) {
	}

	private get url() {
		return this.global.backendURL + '/instructions'
	}

	findAll() {
		this.http.get(
			this.url,
		).subscribe({
			next: (res: any) => this.instructionSubject.next({
				...this.instructionSubject.value,
				instructions: res.data,
			}),
			error: (e: any) => this.global.alert(e),
		})
	}

	find(id: number) {
		return this.http.get(
			this.url + `/${id}`,
			{headers: this.global.headersToken}
		)
	}

	save(instruction: any, img: any) {
		this.http.post(
			this.url,
			JSON.stringify(instruction),
			{headers: this.global.headersJsonToken}
		).subscribe({
			next: (res: any) => this.updateImg(res.data.id, img),
			error: (e: any) => this.alert.add(e.error.message)
		})
	}

	update(id: number, instruction: any, img: any) {
		this.http.put(
			this.url + `/${id}`,
			JSON.stringify(instruction),
			{headers: this.global.headersJsonToken}
		).subscribe({
			next: (res: any) => {
				if (img !== null) this.updateImg(res.data.id, img)
				else this.global.page('instructions')
			},
			error: (e: any) => this.alert.add(e.error.message)
		})
	}

	private updateImg(id: number, img: any) {
		let formData = new FormData()
		for (let i = 0; i < img.length; i++) {
			formData.append('files', img[i])
		}
		this.http.patch(
			this.url + `/${id}/img`,
			formData,
			{headers: this.global.headersMultipartToken}
		).subscribe({
			next: () => this.global.page('instructions'),
			error: (e: any) => this.alert.add(e.error.message)
		})
	}

	delete(id: number) {
		this.http.delete(
			this.url + `/${id}`,
			{headers: this.global.headersToken}
		).subscribe({
			next: () => {
				let instructions = this.instructionSubject.value.instructions;
				instructions = instructions.filter((i: any) => i.id !== id);
				this.instructionSubject.next({
					...this.instructionSubject.value,
					instructions: instructions,
				})
			},
			error: (e: any) => this.global.alert(e),
		})
	}

}
