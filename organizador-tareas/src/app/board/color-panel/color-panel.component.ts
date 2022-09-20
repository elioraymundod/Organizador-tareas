import { Component, OnInit, Output, EventEmitter } from '@angular/core';

enum colors {
  RED = "#CD6155",
  GREEN = "#009886",
  BLUE = "#1976D2",
  VIOLET = "#6e1d96",
  YELLOW = "#FF8F00",
  PINK = "#EC407A",
  GRAY = "#34495E"
}

@Component({
  selector: 'app-color-panel',
  templateUrl: './color-panel.component.html',
  styleUrls: ['./color-panel.component.css']
})
export class ColorPanelComponent implements OnInit {
  @Output() emitColor: EventEmitter<string> = new EventEmitter();

  colorsData = Object.values(colors)

  constructor() { }

  ngOnInit(): void {
  }

  onColorEmit(color: string) {
    this.emitColor.emit(color);
  }
}
