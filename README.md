# <img src="/public/logoBlue.png alt="Holidaze Logo" style="height:40px; vertical-align: middle; margin-right:10px;" /> Holidaze

Holidaze is a modern accommodation booking platform where users can search for and book venues for their getaways.
Venue managers can register, add, edit, and delete venues.
The application features responsive design, interactive components, and comprehensive testing.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Register, login, and logout functionality with secure token handling.
- **Venue Listings:** Browse, search, and sort venues with pagination and “load more” options.
- **Venue Details:** View detailed venue information including image carousels (for venues with multiple images), pricing, location, and owner information.
- **Profile Management:** Update your profile, manage your venues and bookings, and view your profile picture in the header.
- **Booking System:** Book venues, view booking details, and cancel bookings.
- **Responsive Design:** Adaptive layouts for desktop and mobile devices with a centered search bar on desktop and a hamburger menu on mobile.

## Technologies

- **Frontend:** React, React Router, Bootstrap
- **Testing:** Jest, React Testing Library
- **API:** Noroff API for authentication, venue data, profiles, and bookings

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/robfil50219/project-exam-2.git

   ```

2. **Navigate to the project directory:**

- cd holidaze

3. **Install dependencies**

- npm install

4. **Start the development server:**

- npm start
- The app will run at http://localhost:3000.

## Usage

**User Authentication**

- Register / Login: Use your Noroff email credentials to register or log in. Once logged in, your profile, venues, and booking options will be available.

**Venue Listings & Search**

- Browse & Search: The home page displays venue cards with basic details. Use the search bar in the header to filter venues by name, description, or location.
  Sorting options let you view venues by newest or by price.

**Venue Details**

- Detailed View: Click on a venue card to see detailed information—including an image carousel (if multiple images are available), pricing, location, and booking options.

**Profile Managment**

- Manage Your Profile: Access your profile page to update your bio, profile picture, and banner. Manage your venues and bookings from your profile page.

**Booking System**

- Book & Cancel: Book venues from the detailed venue pages. View booking details and cancel bookings directly from your profile.

## Testing

- To run the test suite, use the following command:
  npm test
  This command runs all tests located in the /tests folder using Jest and React Testing Library.

## Project Structure

holidaze/
├── public/
│ ├── favicon.ico
│ ├── logoBlue.png
│ ├── manifest.json
│ └── ... (other assets)
├── src/
│ ├── components/
│ │ ├── Header.js
│ │ ├── Footer.js
│ │ ├── VenueCard.js
│ │ ├── VenueSearch.js
│ │ └── ... (other reusable components)
│ ├── pages/
│ │ ├── Home.js
│ │ ├── VenueDetails.js
│ │ ├── Login.js
│ │ ├── Register.js
│ │ ├── Profile.js
│ │ ├── AddVenue.js
│ │ ├── EditVenue.js
│ │ ├── BookVenue.js
│ │ └── ... (other pages)
│ ├── tests/
│ │ └── ... (test files)
│ ├── apiConfig.js
│ └── App.js
└── README.md

## API Integration

Holidaze uses the Noroff API (https://v2.api.noroff.dev/holidaze) for fetching and managing data such as venues, profiles, and bookings.
The API endpoints and keys are configured via the apiConfig.js file.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
For major changes, open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
