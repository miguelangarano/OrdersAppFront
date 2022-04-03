import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() disabled: boolean = false;
  @Input() currentValue: string | number | undefined = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Output() onInputChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event:any){
    this.onInputChange.emit(event);
  }

}
