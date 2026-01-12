# TaskFlow Pro - Full Stack Todo Application

TaskFlow Pro is a modern, full-stack todo application designed for Gen Z productivity with a sleek aesthetic and intuitive user experience.

## 🌟 Features

### Frontend
- **Modern UI/UX**: Glassmorphic design with gradient backgrounds and smooth animations
- **Authentication**: Complete login/signup flow with JWT token management
- **Task Management**: Create, update, complete, and delete tasks with optimistic UI updates
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Animations**: Framer Motion integration for smooth transitions
- **State Management**: Zustand for efficient state management

### Backend
- **FastAPI Framework**: High-performance Python web framework
- **PostgreSQL Database**: Powered by Neon with SQLModel ORM
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: bcrypt hashing with 12 rounds
- **RESTful API**: Well-structured endpoints for all operations
- **Data Validation**: Pydantic models for request/response validation

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL via Neon
- **ORM**: SQLModel
- **Authentication**: JWT tokens with python-jose
- **Password Hashing**: passlib with bcrypt
- **Validation**: Pydantic
- **Environment**: python-dotenv

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- uv (Python package manager)
- PostgreSQL (or Neon account)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd taskflow-pro
```

2. Set up the backend:
```bash
cd backend
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e .
uv pip install 'pydantic[email]'
```

3. Configure the database connection in `.env`:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/taskflow_pro
BETTER_AUTH_SECRET=your-secret-key
CORS_ORIGINS=http://localhost:3000
```

4. Set up the frontend:
```bash
cd ../frontend
npm install
```

5. Configure frontend environment in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
uv run uvicorn app.main:app --reload --port 8000
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. Open your browser and visit `http://localhost:3000` (or the port shown in the terminal)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login existing user

### Tasks
- `GET /api/{user_id}/tasks` - Get user's tasks (with optional status filtering)
- `POST /api/{user_id}/tasks` - Create a new task
- `PATCH /api/{user_id}/tasks/{task_id}/complete` - Toggle task completion
- `DELETE /api/{user_id}/tasks/{task_id}` - Delete a task

### Health Check
- `GET /health` - Health check endpoint

## 🎯 Gen Z Appeal Features

- **Vibrant Color Scheme**: Gradient backgrounds with purple, cyan, and pink colors
- **Smooth Animations**: Subtle motion effects using Framer Motion
- **Modern UI Elements**: Glassmorphic cards and contemporary design patterns
- **Emoji Integration**: Fun emoji usage throughout the interface
- **Interactive Elements**: Hover effects and micro-interactions
- **Mobile Optimized**: Touch-friendly interface for mobile devices

## 🏗 Architecture

The application follows a clean architecture pattern:
- **Frontend**: Next.js 15 with App Router for routing and layout management
- **Backend**: FastAPI with dependency injection and proper separation of concerns
- **Database**: PostgreSQL with SQLModel for ORM functionality
- **Authentication**: JWT-based with secure token handling
- **Security**: Input validation, password hashing, and CSRF protection

## 🧪 Testing

To run tests:
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 🚢 Deployment

### Backend (Render)
1. Create a Render account
2. Connect your GitHub repository
3. Create a new Web Service for the backend
4. Set environment variables including DATABASE_URL
5. Deploy!

### Frontend (Vercel)
1. Create a Vercel account
2. Import your project from GitHub
3. Set environment variables
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

TaskFlow Pro - Built for Gen Z productivity.

---

Built with ❤️ for the modern workforce!