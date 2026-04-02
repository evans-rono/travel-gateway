import { Component, Input, Output, EventEmitter } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { Trip } from '../../models/trip'; 
 
@Component({ 
  selector: 'app-trip-card', 
  standalone: true, 
  templateUrl: './trip-card.component.html', 
  styleUrls: ['./trip-card.component.css'] 
}) 
export class TripCardComponent { 
  @Input() trip!: Trip; 
 
  constructor(private router: Router) {} 
 
  editTrip(): void { 
    this.router.navigate(['/edit-trip', this.trip.code]); 
  } 
 
  onDelete(): void { 
    if (confirm(`Delete "${this.trip.name}"? This cannot be undone.`)) { 
      this.deleteTrip.emit(this.trip.code); 
    } 
  } 
} 
