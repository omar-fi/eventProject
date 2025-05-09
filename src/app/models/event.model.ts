export interface Event {
    id?: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    organizerId: number;
    createdAt?: Date;
    organizer?: {
        firstName: string;
        lastName: string;
    };
} 