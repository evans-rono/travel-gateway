import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router'; 
import { TripCardComponent } from '../trip-card/trip-card.component'; 
import { TripDataService } from '../../services/trip-data.service'; 
import { Trip } from '../../models/trip'; 
 
@Component({ 
  selector: 'app-trip-listing', 
  standalone: true, 
  imports: [CommonModule, RouterLink, TripCardComponent], 
  templateUrl: './trip-listing.component.html', 
  styleUrls: ['./trip-listing.component.css'] 
}) 
export class TripListingComponent implements OnInit { 
 
  trips: Trip[] = []; 
  loading: boolean = true; 
  error: string = ''; 
 
  constructor(private tripDataService: TripDataService) {} 
 
  ngOnInit(): void { 
    this.loadTrips(); 
  } 
 
  loadTrips(): void { 
    this.loading = true; 
    this.error = ''; 
 
    this.tripDataService.getTrips().subscribe({ 
      next: (trips: Trip[]) =
        this.trips = trips; 
        this.loading = false; 
      }, 
      error: (err) =
        this.error = 'Failed to load trips. Is the server running?'; 
        this.loading = false; 
        console.error(err); 
      } 
    }); 
  } 
 
  onDeleteTrip(code: string): void { 
    this.tripDataService.deleteTrip(code).subscribe({ 
      next: () =
        this.trips = this.trips.filter(t = !== code); 
      }, 
      error: (err) =
        this.error = `Failed to delete trip ${code}`; 
        console.error(err); 
      } 
    }); 
  } 
} 
