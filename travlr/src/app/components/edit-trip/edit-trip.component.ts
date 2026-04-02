import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { TripDataService } from '../../services/trip-data.service'; 
import { Trip } from '../../models/trip'; 
 
@Component({ 
  selector: 'app-edit-trip', 
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './edit-trip.component.html', 
  styleUrls: ['./edit-trip.component.css'] 
}) 
export class EditTripComponent implements OnInit { 
 
  trip: Trip = {} as Trip; 
  loading: boolean = true; 
  submitting: boolean = false; 
  error: string = ''; 
  tripCode: string = ''; 
 
  constructor(private tripDataService: TripDataService, private router: Router, private route: ActivatedRoute) {} 
 
  ngOnInit(): void { 
    this.loadTrip(); 
  } 
 
  loadTrip(): void { 
    this.tripDataService.getTripByCode(this.tripCode).subscribe({ 
      next: (trip: Trip) = this.trip = trip; this.loading = false; }, 
      error: (err) = this.error = `Could not load trip ${this.tripCode}`; this.loading = false; } 
    }); 
  } 
 
  onSubmit(): void { 
    this.submitting = true; 
    this.error = ''; 
    this.tripDataService.updateTrip(this.tripCode, this.trip).subscribe({ 
      next: () = this.router.navigate(['/']); }, 
    }); 
  } 
 
  onCancel(): void { this.router.navigate(['/']); } 
} 
