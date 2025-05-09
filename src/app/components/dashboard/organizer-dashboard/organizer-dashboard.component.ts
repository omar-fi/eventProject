import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './organizer-dashboard.component.html',
  styleUrls: ['./organizer-dashboard.component.css']
})
export class OrganizerDashboardComponent implements OnInit {
  eventForm: FormGroup;
  events: Event[] = [];
  error: string = '';
  success: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private authService: AuthService
  ) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.eventService.getEventsByOrganizer(currentUser.id!).subscribe({
        next: (events) => {
          this.events = events;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement des événements';
        }
      });
    }
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      return;
    }

    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.error = 'Vous devez être connecté pour créer un événement';
      return;
    }

    const eventData = {
      ...this.eventForm.value,
      organizerId: currentUser.id
    };

    this.eventService.createEvent(eventData).subscribe({
      next: () => {
        this.success = 'Événement créé avec succès';
        this.eventForm.reset();
        this.loadEvents();
      },
      error: (error) => {
        this.error = 'Erreur lors de la création de l\'événement';
      }
    });
  }

  deleteEvent(eventId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.success = 'Événement supprimé avec succès';
          this.loadEvents();
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression de l\'événement';
        }
      });
    }
  }
} 