import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Estados {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css']
})
export class ActivityItemComponent implements OnInit {
  @Input() item: any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
  @Output() emitCardItem: EventEmitter<{ card: any; increase: boolean }> = new EventEmitter();
  @Output() emitDeleteCard: EventEmitter<number> = new EventEmitter();

  commentInput = ''
  open = false;

  estados: Estados[] = [
    {value: '0', viewValue: 'En proceso'},
    {value: '1', viewValue: 'Finalizado'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onOpenComment() {
    this.open = !this.open
  }

  onCardItemEmit(card: any, increase: boolean) {
    this.emitCardItem.emit({ card, increase });
  }

  onCardDelete(id: number) {
    this.emitDeleteCard.emit(id)
  }
}
