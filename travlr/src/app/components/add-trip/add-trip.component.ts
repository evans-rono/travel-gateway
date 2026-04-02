import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { TripDataService } from '../../services/trip-data.service'; 
import { Trip } from '../../models/trip'; 
 
@Component({ 
  selector: 'app-add-trip', 
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './add-trip.component.html', 
  styleUrls: ['./add-trip.component.css'] 
}) 
export class AddTripComponent { 
 
  trip: Trip = { code: '', name: '', length: '', start: new Date(), resort: '', perPerson: 0, image: '', description: '' }; 
  submitting: boolean = false; 
  error: string = ''; 
 
  constructor(private tripDataService: TripDataService, private router: Router) {} 
 
  onSubmit(): void { 
    this.submitting = true; 
    this.error = ''; 
    this.tripDataService.addTrip(this.trip).subscribe({ 
      next: () = this.router.navigate(['/']); }, 
    }); 
  } 
 
  onCancel(): void { this.router.navigate(['/']); } 
} 
