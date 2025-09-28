# Task Manager App

A modern React Native task manager app built with Expo and Supabase, featuring authentication, task management, and local notifications.

## Features

- 🔐 **Authentication**: Email/password and Google OAuth login
- ✅ **Task Management**: Create, edit, and delete tasks
- 📅 **Due Dates & Times**: Set reminders for your tasks
- 🔔 **Local Notifications**: Get reminded when tasks are due
- 🎨 **Modern UI**: Clean, minimal design with smooth animations
- 📱 **Cross-Platform**: Works on iOS and Android

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL + Auth)
- **State Management**: React Context API
- **Notifications**: Expo Notifications
- **Navigation**: Expo Router

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Supabase account

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd task-manager
npm install
```

### 2. Supabase Setup

1. Follow the detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
2. Create a Supabase project
3. Run the provided SQL schema
4. Update `lib/supabase.ts` with your credentials

### 3. Start Development Server

```bash
npm start
```

### 4. Run on Device/Simulator

- **iOS**: Press `i` in the terminal or scan QR code with Expo Go app
- **Android**: Press `a` in the terminal or scan QR code with Expo Go app
- **Web**: Press `w` in the terminal

## Project Structure

```
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab navigation
│   ├── auth/              # Authentication screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── TaskCard.tsx      # Task display component
│   └── TaskModal.tsx     # Add/Edit task modal
├── contexts/             # React Context providers
│   ├── AuthContext.tsx   # Authentication state
│   └── TaskContext.tsx   # Task management state
├── services/             # API and external services
│   ├── taskService.ts    # Task CRUD operations
│   └── notificationService.ts # Local notifications
├── lib/                  # Configuration and utilities
│   └── supabase.ts       # Supabase client setup
└── SUPABASE_SETUP.md     # Database setup instructions
```

## Key Features Implementation

### Authentication
- Email/password authentication with Supabase Auth
- Google OAuth integration
- Persistent login sessions
- Automatic redirect to login when not authenticated

### Task Management
- Full CRUD operations for tasks
- Real-time updates with Supabase
- User-specific task isolation with Row Level Security
- Optimistic UI updates

### Notifications
- Local notification scheduling
- Automatic cleanup of old notifications
- Permission handling
- Cross-platform notification support

### UI/UX
- Modern card-based design
- Smooth animations and transitions
- Responsive layout
- Dark/light theme support
- Pull-to-refresh functionality

## Database Schema

The app uses a simple `tasks` table with the following structure:

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  due_time TIME,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Environment Variables

For production deployment, set these environment variables:

```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for setup issues
2. Review the Expo documentation for build issues
3. Open an issue in this repository"# task-manager" 
