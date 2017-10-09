import { Component ,Input} from '@angular/core';

@Component({
  selector: 'display',
  template: `<div innerHTML="{{html}}">/div>`,
  styleUrls: ['./app.component.css']
})
export class DisplayComponent {
	@Input() html:string;
}