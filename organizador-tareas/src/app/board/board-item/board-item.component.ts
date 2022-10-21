import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DialogTaskComponent } from 'src/app/components/dialog/dialog-task/dialog-task.component';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit {
  @Input() item: any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
  @Output() emitCardItem: EventEmitter<{ card: any; increase: boolean }> = new EventEmitter();
  @Output() emitDeleteCard: EventEmitter<number> = new EventEmitter();

  commentInput = ''
  open = false;

  constructor(private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    let days = this.difference(new Date(), new Date(this.item.fechaFin))//new Date().getDay() - new Date(this.item.fechaFin).getDay()
    console.log(days)
  }

  difference(date1: Date, date2: Date) {
    if (date2 !== undefined) {
      const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
      let day = 1000 * 60 * 60 * 24;
      return (date2utc - date1utc) / day
    } else {
      return false;
    }
  }

  onOpenComment() {
    this.open = !this.open
  }

  onCommentTextEmit(id: number) {
    this.emitText.emit({ id, text: this.commentInput });
    this.commentInput = ''
  }

  onCardItemEmit(card: any, increase: boolean) {
    this.emitCardItem.emit({ card, increase });
  }

  onCardDelete(id: number) {
    this.emitDeleteCard.emit(id)
  }

  onCardCopy(id: number) {
    const objeto = { id, name };
    const objetoClonado = Object.assign({}, objeto);
  }

}
