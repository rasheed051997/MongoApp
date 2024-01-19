// import { Component, OnInit } from '@angular/core';
// import { TicketService } from 'src/app/services/ticket.service';

// @Component({
//   selector: 'app-ticket',
//   templateUrl: './ticket.component.html',
//   styleUrls: ['./ticket.component.css']
// })
// export class TicketComponent implements OnInit {
//   tickets: any[] = [];
//   newTicket: any = {};
//   updatedTicket: any = {};

//   constructor(private ticketService: TicketService) { }

//   ngOnInit(): void {
//     this.fetchTickets();
//   }

//   fetchTickets(): void {
//     const token = localStorage.getItem('token') || '';
//     this.ticketService.getTickets(token).subscribe(
//       (response: any) => {
//         this.tickets = response;
//       },
//       (error) => {
//         console.error(error);
//         // Handle error fetching tickets
//       }
//     );
//   }

//   createTicket(): void {
//     const token = localStorage.getItem('token') || '';
//     this.ticketService.createTicket(this.newTicket, token).subscribe(
//       (response: any) => {
//         // Handle successful ticket creation
//         console.log(response.message);
//         this.fetchTickets();
//         this.newTicket = {}; // Clear the form
//       },
//       (error) => {
//         console.error(error);
//         // Handle error creating ticket
//       }
//     );
//   }

//   updateTicket(ticketId: string): void {
//     const token = localStorage.getItem('token') || '';
//     this.ticketService.updateTicket(ticketId, this.updatedTicket, token).subscribe(
//       (response: any) => {
//         // Handle successful ticket update
//         console.log(response.message);
//         this.fetchTickets();
//         this.updatedTicket = {}; // Clear the form
//       },
//       (error) => {
//         console.error(error);
//         // Handle error updating ticket
//       }
//     );
//   }

//   deleteTicket(ticketId: string): void {
//     const token = localStorage.getItem('token') || '';
//     this.ticketService.deleteTicket(ticketId, token).subscribe(
//       (response: any) => {
//         // Handle successful ticket deletion
//         console.log(response.message);
//         this.fetchTickets();
//       },
//       (error) => {
//         console.error(error);
//         // Handle error deleting ticket
//       }
//     );
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { TicketService } from 'src/app/services/ticket.service';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-ticket',
//   templateUrl: './ticket.component.html',
//   styleUrls: ['./ticket.component.css']
// })
// export class TicketComponent implements OnInit {
//   tickets: any[] = [];
//   newTicket: any = {};
//   updatedTicket: any = {};

//   constructor(private ticketService: TicketService) { }

//   ngOnInit(): void {
//     this.fetchTickets();
//   }

//   fetchTickets(): void {
//     const token = localStorage.getItem('token') || '';
//     this.ticketService.getTickets(token).subscribe(
//       (response: any) => {
//         this.tickets = response;
//         console.log(this.tickets);
//       },
//       (error) => {
//         console.error(error);
//         // Handle error fetching tickets
//       }
//     );
//   }

//   createTicket(): void {
//     const token = localStorage.getItem('token') || '';
//     this.ticketService.createTicket(this.newTicket, token).subscribe(
//       (response: any) => {
//         // Handle successful ticket creation
//         console.log(response.message);
//         this.fetchTickets();
//         this.newTicket = {}; // Clear the form
//       },
//       (error) => {
//         console.error(error);
//         // Handle error creating ticket
//       }
//     );
//   }

//   startEdit(ticket: any): void {
//     ticket.isEditing = true;
//     this.updatedTicket = { ...ticket };
//     this.updatedTicket.subject = ticket.subject || ''; 
//     this.updatedTicket.description = ticket.description || ''; 
//     this.updatedTicket.status = ticket.status || ''; 
//   }

//   updateTicket(ticket: any): void {
//     if (!ticket || !ticket._id) {
//       console.error('Invalid ticket object or ID', ticket);
//       return;
//     }

//     const token = localStorage.getItem('token') || '';
//     this.ticketService.updateTicket(ticket._id, this.updatedTicket, token).subscribe(
//       (response: any) => {
//         // Handle successful ticket update
//         console.log(response.message);
//         this.fetchTickets();
//         ticket.isEditing = false;
//         this.updatedTicket = {}; // Clear the form
//       },
//       (error) => {
//         console.error(error);
//         // Handle error updating ticket
//       }
//     );
//   }

//   cancelEdit(ticket: any): void {
//     ticket.isEditing = false;
//     this.updatedTicket = {}; // Clear the form
//   }

//   deleteTicket(ticket: any): void {
//     if (!ticket || !ticket._id) {
//       console.error('Invalid ticket object or ID', ticket);
//       return;
//     }

//     const token = localStorage.getItem('token') || '';
//     this.ticketService.deleteTicket(ticket._id, token).subscribe(
//       (response: any) => {
//         // Handle successful ticket deletion
//         console.log(response.message);
//         this.fetchTickets();
//       },
//       (error) => {
//         console.error(error);
//         // Handle error deleting ticket
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  tickets: any[] = [];
  newTicket: any = {};
  updatedTicket: any = {};

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.fetchTickets();
  }

  fetchTickets(): void {
    const token = localStorage.getItem('token') || '';
    this.ticketService.getTickets(token).subscribe(
      (response: any) => {
        this.tickets = response;
      },
      (error) => {
        console.error(error);
        // Handle error fetching tickets
      }
    );
  }

  createTicket(): void {
    const token = localStorage.getItem('token') || '';
    this.ticketService.createTicket(this.newTicket, token).subscribe(
      (response: any) => {
        // Handle successful ticket creation
        console.log(response.message);
        this.fetchTickets();
        this.newTicket = {}; // Clear the form
      },
      (error) => {
        console.error(error);
        // Handle error creating ticket
      }
    );
  }

  startEdit(ticket: any): void {
    // Set isEditing only if the ticket object exists
    if (ticket) {
      ticket.isEditing = true;
      this.updatedTicket = { ...ticket };
    }
  }

  updateTicket(ticket: any): void {
    if (!ticket || !ticket._id) {
      console.error('Invalid ticket object or ID', ticket);
      return;
    }

    // Ensure the updatedTicket object is initialized
    if (!this.updatedTicket) {
      console.error('Invalid updatedTicket object');
      return;
    }

    // Update only the required fields
    const updateData = {
      subject: this.updatedTicket.subject,
      description: this.updatedTicket.description,
      status: this.updatedTicket.status
    };

    const token = localStorage.getItem('token') || '';
    this.ticketService.updateTicket(ticket._id, updateData, token).subscribe(
      (response: any) => {
        // Handle successful ticket update
        console.log(response.message);
        this.fetchTickets();
        ticket.isEditing = false;
        this.updatedTicket = {}; // Clear the form
      },
      (error) => {
        console.error(error);
        // Handle error updating ticket
      }
    );
  }

  cancelEdit(ticket: any): void {
    if (ticket) {
      ticket.isEditing = false;
      this.updatedTicket = {}; // Clear the form
    }
  }

  deleteTicket(ticket: any): void {
    if (!ticket || !ticket._id) {
      console.error('Invalid ticket object or ID', ticket);
      return;
    }

    const token = localStorage.getItem('token') || '';
    this.ticketService.deleteTicket(ticket._id, token).subscribe(
      (response: any) => {
        // Handle successful ticket deletion
        console.log(response.message);
        this.fetchTickets();
      },
      (error) => {
        console.error(error);
        // Handle error deleting ticket
      }
    );
  }
}
