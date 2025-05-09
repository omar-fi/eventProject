export interface User {
    id?: number;
    email: string;
    password: string;
    role: 'client' | 'organizer' | 'admin';
    firstName: string;
    lastName: string;
    createdAt?: Date;
} 