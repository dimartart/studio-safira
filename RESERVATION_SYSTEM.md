# Studio Safira - Reservation System

## 🎯 Overview

A comprehensive reservation system for Studio Safira beauty salon, featuring client booking, admin management, and responsive design.

## ✨ Features

### Client Booking System
- **Date & Time Selection**: Choose from available dates (next 30 days, excluding Sundays)
- **Service Selection**: Book appointments for various services (Hair, Cosmetics, Massage, Pedicure, Lymphatic)
- **Form Validation**: Real-time validation for all required fields
- **Availability Check**: Prevents double-booking
- **Responsive Design**: Works perfectly on mobile and desktop

### Admin Panel
- **Dashboard**: Overview of all reservations with statistics
- **Filtering**: Filter by status, date, and service type
- **Status Management**: Update reservation status (Pending, Confirmed, Cancelled, Completed)
- **Detailed View**: View full reservation details in modal
- **Delete Functionality**: Remove reservations with confirmation
- **Real-time Updates**: Changes reflect immediately

### Security
- **Password Protection**: Admin panel requires login (Demo: `admin123`)
- **Session Management**: Login state persists across browser sessions
- **Data Validation**: Server-side validation for all inputs

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Usage

#### For Clients
1. Navigate to the reservation section on the website
2. Fill out the booking form with your details
3. Select your preferred service, date, and time
4. Submit the reservation
5. Wait for confirmation via phone or email

#### For Administrators
1. Click the admin button (gear icon) in the bottom-right corner
2. Enter the admin password: `admin123`
3. Access the admin panel to manage reservations
4. Use filters to find specific reservations
5. Update status or delete reservations as needed

## 📋 Reservation Process

### Booking Flow
1. **Client fills form** → Name, email, phone, service, date, time, notes
2. **System validates** → Checks all required fields and availability
3. **Reservation saved** → Stored in localStorage (demo) or database (production)
4. **Status set to pending** → Awaiting admin confirmation
5. **Admin reviews** → Can confirm, cancel, or modify reservation
6. **Client notified** → Via phone/email (manual process in demo)

### Status Types
- **Pending** (Čekající): New reservation awaiting confirmation
- **Confirmed** (Potvrzeno): Approved by admin
- **Cancelled** (Zrušeno): Cancelled by client or admin
- **Completed** (Dokončeno): Service completed

## 🛠 Technical Details

### Components Structure
```
src/
├── components/
│   ├── Reservation.jsx          # Client booking form
│   ├── AdminPanel.jsx           # Admin management interface
│   ├── AdminAccess.jsx          # Admin login
│   └── ...                      # Other existing components
├── utils/
│   └── reservationUtils.js      # Utility functions
└── App.jsx                      # Main app with routing
```

### Data Storage
- **Demo**: localStorage (browser storage)
- **Production**: Database (MySQL, PostgreSQL, etc.)
- **Data Structure**: JSON format with reservation objects

### Key Functions
- `getAvailableDates()`: Generate available booking dates
- `checkAvailability()`: Prevent double-booking
- `validateReservation()`: Form validation
- `saveReservation()`: Store new reservation
- `updateReservation()`: Modify existing reservation
- `getReservationStats()`: Generate dashboard statistics

## 🎨 Customization

### Adding New Services
1. Update `getServices()` in `reservationUtils.js`
2. Add service to the services array in `Reservation.jsx`
3. Update admin panel service filters

### Modifying Time Slots
1. Edit `getTimeSlots()` in `reservationUtils.js`
2. Update opening hours in the reservation form

### Changing Business Rules
1. Modify `getAvailableDates()` for different availability
2. Update validation rules in `validateReservation()`
3. Adjust booking constraints in `checkAvailability()`

## 🔧 Configuration

### Business Hours
- **Monday - Friday**: 9:00 - 19:00
- **Saturday**: 9:00 - 17:00
- **Sunday**: Closed

### Services & Duration
- **Hair (Kadeřnictví)**: 60 minutes
- **Cosmetics (Kosmetika)**: 45 minutes
- **Massage (Masáže)**: 60 minutes
- **Pedicure (Pedikúra)**: 45 minutes
- **Lymphatic (Lymfa)**: 90 minutes

### Booking Rules
- Reservations available 30 days in advance
- Sundays excluded
- 24-hour cancellation policy
- 10-minute early arrival recommended

## 🚀 Production Deployment

### Database Integration
Replace localStorage with proper database:
```javascript
// Example with API calls
const saveReservation = async (data) => {
  const response = await fetch('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};
```

### Email Notifications
Add email service integration:
```javascript
// Example with email service
const sendConfirmationEmail = async (reservation) => {
  await emailService.send({
    to: reservation.email,
    subject: 'Reservation Confirmation',
    template: 'confirmation',
    data: reservation
  });
};
```

### Security Enhancements
- Implement proper authentication (JWT, OAuth)
- Add rate limiting for booking attempts
- Use HTTPS for all communications
- Implement CSRF protection

## 📱 Mobile Optimization

The reservation system is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Optimized form layout
- Mobile-first design approach
- Fast loading times

## 🔍 Troubleshooting

### Common Issues
1. **Reservation not saving**: Check localStorage permissions
2. **Admin login not working**: Clear browser cache and try again
3. **Date selection issues**: Ensure JavaScript is enabled
4. **Mobile display problems**: Check viewport meta tag

### Debug Mode
Enable debug logging by adding to browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## 📞 Support

For technical support or customization requests:
- Email: support@studiosafira.com
- Phone: +420 607 191 088

## 📄 License

This reservation system is developed for Studio Safira. All rights reserved.

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Developer**: Studio Safira Team 