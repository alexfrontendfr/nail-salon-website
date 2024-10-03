# Nail Factory Groningen Website

This is the official website for Nail Factory Groningen, a nail salon based in Groningen, Netherlands. The website allows customers to view services, book appointments, and provides an admin interface for managing time slots.

## Features

- Responsive design
- Service showcase
- Online booking system
- Admin interface for managing time slots
- Integration with Firebase for data storage

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Firebase (Firestore)
- Framer Motion for animations

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   git clone https://github.com/alexfrontendfr/nail-salon-website.git
   cd nail-salon-website

2. Install dependencies:
   npm install
   or
   yarn install

3. Create a `.env.local` file in the root directory and add your Firebase configuration:
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_ADMIN_CODE=your_admin_code

4. Run the development server:
   npm run dev
   or
   yarn dev

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

1. Build the project:
   npm run build
   or
   yarn build

2. Deploy to your preferred hosting platform (e.g., Vercel, Netlify, or Firebase Hosting).

## Admin Access

To access the admin interface:

1. Navigate to `/admin` on your deployed site.
2. Enter the admin code (set in your environment variables).
3. You can now add, edit, or remove time slots for bookings.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
