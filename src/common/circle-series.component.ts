import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as moment from 'moment';
import ObjectId from "../utils/object-id";

@Component({
  selector: 'g[circleSeries]',
  template: `
    <svg:g *ngFor="let circle of circles">
      <svg:rect
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="color"
        class="tooltip-bar"
        style="pointerEvents: 'none'; opacity: 0;"
      />

      <svg:g circle
        [attr.class]="className"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="color"
        [stroke]="strokeColor"
        [pointerEvents]="circle.value === 0 ? 'none': 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (clickHandler)="click($event, circle.label)"
      />
    </svg:g>
  `
})
export class CircleSeries implements OnChanges {
  areaPath: any;
  circles: any[];

  @Input() data;
  @Input() type = 'standard';
  @Input() xScale;
  @Input() yScale;
  @Input() color;
  @Input() strokeColor;
  @Input() scaleType;

  @Output() clickHandler = new EventEmitter();

  ngOnChanges() {
    this.update();
  }

  update() {
    this.circles = this.getCircles();
  }

  getCircles() {
    return this.data.series.map((d, i) => {
      let value = d.value;
      let label = d.name;


      if (value) {
        let cx;
        if (this.scaleType === 'time') {
          cx = this.xScale(moment(label).toDate());
        } else if (this.scaleType === 'linear') {
          cx = this.xScale(Number(label));
        } else {
          cx = this.xScale(label);
        }

        let cy = this.yScale(this.type === 'standard' ? value : d.d1);
        let radius = 5;
        let height = this.yScale.range()[0] - cy;

        // TODO: figure out if this is needed here
        let gradientIdRect = 'grad' + ObjectId().toString();

        return {
          classNames: [`circle-data-${i}`],
          value: value,
          label: label,
          cx: cx,
          cy: cy,
          radius: radius,
          height: height,
          gradientIdRect: gradientIdRect
        };
      }
    }).filter((circle) => circle !== undefined);
  }

  click(value, label) {
    this.clickHandler.emit({
      name: label,
      value: value
    });
  }
}
