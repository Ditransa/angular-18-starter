import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() imageSrc: string | undefined;
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() imageClass: string = 'medium-image'; // Clase CSS por defecto
}
