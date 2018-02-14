import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-form-label',
    templateUrl: './form-label.component.html',
    styleUrls: ['./form-label.component.css']
})
export class FormLabelComponent implements OnInit {
    @Input() title:string;

    constructor() { }

    ngOnInit() {
    }

}
