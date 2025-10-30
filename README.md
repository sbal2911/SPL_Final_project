# SPL Final Project
# Healthcare Behavioral Group Therapy  
**Team:** Code-Blooded  
**Language:** F#, Express.js, MongoDB  

---

## Project Overview
The **Healthcare Behavioral Group Therapy** application is designed to support **group therapy sessions** in a secure, compliant, and effective manner. The system aims to help therapists, patients, and healthcare administrators manage sessions, users, and RSVPs efficiently while ensuring **HIPAA compliance** and data security.

---

## Objectives
- Develop a secure, scalable platform for managing **group therapy sessions**.  
- Enable patients and therapists to schedule, join, and manage sessions.  
- Ensure **HIPAA compliance** and strict data privacy standards.  
- Provide both a **functional F# backend API** and an **Express.js frontend** for easy access.

---

## System Architecture

### **1. Backend (F# Business API Layer)**
- Core API endpoints for patient registration, session scheduling, and therapist session management.  
- Secure connections to MongoDB for CRUD operations.  
- Authentication and authorization implemented for all endpoints.  
- Unit and integration tests with **95% passing rate**.

### **2. Frontend (Express.js Application)**
- Handles user interactions and session management views.  
- Provides pages for registration, login, session listing, and RSVP management.  
- Frontend development is scheduled for **early November 2025**.

### **3. Database (MongoDB)**
- Stores patient, therapist, event, and RSVP data.  
- Encrypted user credentials and secure access.  
- Supports flexible schema evolution.

---

## Features Implemented

| Use Case | Status | Completion Date |
|-----------|---------|----------------|
| Register New User | ✅ Completed | Oct 6, 2025 |
| Login / Authenticate User | ✅ Completed | Oct 7, 2025 |
| Get Current User Profile | ✅ Completed | Oct 8, 2025 |
| Reset Password | ✅ Completed | Oct 9, 2025 |
| List All Users | ✅ Completed | Oct 10, 2025 |
| Create Event / Group Therapy Session | ✅ Completed | Oct 13, 2025 |
| Create RSVP | ✅ Completed | Oct 13, 2025 |
| List All Events / Group Sessions | ✅ Completed | Oct 14, 2025 |
| Update RSVP | ✅ Completed | Oct 14, 2025 |
| Get Event Details | ✅ Completed | Oct 22, 2025 |
| Delete RSVP | ✅ Completed | Oct 22, 2025 |
| Update Group Therapy Session | ✅ Completed | Oct 23, 2025 |
| Encrypt User Credentials | ✅ Completed | Oct 23, 2025 |
| Cancel Group Therapy Session | ✅ Completed | Oct 24, 2025 |
| List RSVPs for an Event | ✅ Completed | Oct 27, 2025 |
| List RSVPs for a User | ✅ Completed | Oct 28, 2025 |
| Event and RSVPs Models | ✅ Completed | Oct 30, 2025 |
| Designing User Models | 🚧 In Progress | Oct 31, 2025 |
| UI Development | 🕓 Currently in the planning phase and the majority of work is done, will move to the implementation phase soon | Nov 4–7, 2025 |

---

## Key Achievements
- ✅ Designed and implemented a **RESTful F# API**  
- 🔐 Established authentication and authorization flows  
- 🧪 Achieved **95% unit/integration test pass rate**  
- 🗄️ Seamless MongoDB integration for secure CRUD operations  
- 🧾 Structured data models for user, event, and RSVP management  

---

## Team Contributions until October 30th, 2025

**Rucha & Nidhi** – *EventController*  
- Connected to MongoDB and managed the `events` collection.  
- Implemented `GetEvent`, `CreateEvent`, `UpdateEvent`, and `DeleteEvent` endpoints.  
- Ensured proper JSON serialization and logging for API actions.  
- Added validation and summary response generation for new events.

**Sanjyot** – *UserController*  
- Managed the `users` collection in MongoDB.  
- Developed `GetUsers`, `CreateUser`, and `Login` endpoints.  
- Implemented insertion and logging logic for new user and login operations.  
- Handled JSON responses and simple authentication flow.

**Chetan** – *RsvpController/Rsvp Data Models*  
- Created endpoints for RSVP management (`GetRsvps`, `CreateRsvp`, `DeleteRsvp`).  
- Ensured smooth CRUD operations and robust logging.  
- Validated RSVP creation and deletion processes.

**Sudeepta** – *Event Data Models*  
- Defined `Event`, `newEvent`, `GetEvent`, and `UpdateEvent` models.  
- Integrated BSON attributes to align F# types with MongoDB schema.  
- Simplified host handling for event retrievals and updates.  

---

## Challenges Faced
- Difficulty integrating **F# APIs** with **Express.js frontend** due to data format mismatches.  
- Limited resources for advanced **F# functional programming** practices.  
- Managing multiple MongoDB controllers occasionally caused model conflicts.  
- Pending **HIPAA compliance review** for full production readiness.  
- Tight timeline led to intense debugging and coordination cycles.

These challenges improved the team’s debugging, collaboration, and time management skills.

---

## Next Steps
- Begin frontend integration via **Express.js**.  
- Conduct **User Acceptance Testing (UAT)** with a sample dataset.  
- Finalize HIPAA compliance review and perform security audits.  
- Prepare documentation and deployment scripts before **Nov 15, 2025**.

---

## Testing
- Unit and integration tests completed for all backend APIs (95% pass rate).  
- Frontend and UAT testing scheduled post-integration phase.

---

## Repository
**GitHub:** [https://github.com/sbal2911/SPL_Final_project](https://github.com/sbal2911/SPL_Final_project)

---

## Timeline
- **Backend Completion:** October 2025  
- **Frontend Development:** November 1–7, 2025  
- **Project Completion Target:** November 15, 2025  

---

## Compliance & Security
- All data is encrypted in MongoDB collections.  
- Authentication and authorization implemented using secure tokens.  
- HIPAA compliance review in progress to ensure regulatory alignment.

---

## Team Code-Blooded
| Name | Responsibilities | 
|------|------|
| Rucha | Developer and Testing activities | 
| Nidhi | Developer and Testing activities | 
| Sanjyot | Developer and Documentation  | 
| Chetan | Developer and Testing activities | 
| Sudeepta | Developer and Documentation | 

---

## Technologies Used
- **F#** – Core backend business logic  
- **Express.js** – Web application framework for frontend integration  
- **MongoDB** – NoSQL database for secure and flexible data storage  
- **Node.js** – Runtime environment for Express app  
- **Unit Testing (F#)** – Integration and validation tests  
- **Logging** – Structured logs for debugging and audit trails  

---

## Screenshots

<img width="614" height="368" alt="image" src="https://github.com/user-attachments/assets/8d1efce4-af09-4075-9444-fb9f1362cb5c" />

---

## License
This project is intended for educational purposes and follows institutional academic guidelines for secure healthcare software development.

---

> *Developed by Team Code-Blooded, Fall 2025 – UNC Charlotte*  
> *Backend: F# | Frontend: Express.js | Database: MongoDB*

