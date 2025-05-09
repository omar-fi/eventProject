import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';
import { Event } from '../../../models/event.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  events: Event[] = [];
  users: User[] = [];
  error: string = '';

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadEvents();
    this.loadUsers();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des événements';
      }
    });
  }

  loadUsers() {
    // À implémenter avec le service d'authentification
    // this.authService.getUsers().subscribe({
    //   next: (users) => {
    //     this.users = users;
    //   },
    //   error: (error) => {
    //     this.error = 'Erreur lors du chargement des utilisateurs';
    //   }
    // });
  }

  deleteEvent(eventId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.loadEvents();
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression de l\'événement';
        }
      });
    }
  }

  deleteUser(userId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      // À implémenter avec le service d'authentification
      // this.authService.deleteUser(userId).subscribe({
      //   next: () => {
      //     this.loadUsers();
      //   },
      //   error: (error) => {
      //     this.error = 'Erreur lors de la suppression de l\'utilisateur';
      //   }
      // });
    }
  }
} 