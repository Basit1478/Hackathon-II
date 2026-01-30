# TaskMaster Pro AI - Phase III

Natural language todo management powered by OpenAI Agents and MCP tools.

🔗 **Live Demo:** [https://phase-3-ai-assistant.vercel.app](https://phase-3-ai-assistant.vercel.app)

---

## 🎯 Overview

TaskMaster Pro AI is an intelligent chat interface that lets you manage your todo list using natural language. Just talk to the AI like you would to a personal assistant - no forms, no buttons, just conversation.

### Key Features

✅ **Natural Language Interface** - "Add buy groceries" instead of filling forms  
✅ **Conversation Persistence** - Resume chats across sessions  
✅ **Stateless Architecture** - Horizontally scalable from day one  
✅ **Modern UI** - Built with Tailwind CSS + shadcn/ui  
✅ **Dark Mode** - Easy on the eyes  
✅ **Mobile Responsive** - Works on all devices  
✅ **AI-Powered** - OpenAI Agents SDK with MCP tools

---

## 🚀 Quick Start

### Try It Live

Visit: [https://phase-3-ai-assistant.vercel.app](https://phase-3-ai-assistant.vercel.app)

**Example Commands:**
```
"Add a task to buy groceries"
"Show me all my tasks"
"What's pending?"
"Mark task 3 as done"
"Delete the meeting task"
"Change task 1 to buy fruits"
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React, TypeScript |
| **UI Framework** | Tailwind CSS 3.4+ |
| **Components** | shadcn/ui |
| **Icons** | Lucide React |
| **Backend** | FastAPI (Python) |
| **AI Engine** | OpenAI Agents SDK |
| **MCP Layer** | Official MCP SDK |
| **Database** | Neon Serverless PostgreSQL |
| **ORM** | SQLModel |
| **Auth** | Better Auth (JWT) |
| **Deployment** | Vercel (Frontend) + Railway (Backend) |

---

## 📁 Project Structure
```
taskmaster-pro/
├── frontend/                # Next.js application
│   ├── app/
│   │   ├── chat/           # Chat page
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/             # Base components (Button, Input, etc.)
│   │   └── chat/           # Chat components (MessageBubble, etc.)
│   └── lib/
│       └── api/            # API client
│
├── backend/                 # FastAPI server
│   ├── models/             # Database models
│   │   ├── conversation.py
│   │   └── task.py
│   ├── mcp_server/         # MCP tools
│   │   ├── tools/
│   │   │   ├── add_task.py
│   │   │   ├── list_tasks.py
│   │   │   ├── complete_task.py
│   │   │   ├── delete_task.py
│   │   │   └── update_task.py
│   │   └── server.py
│   ├── ai/                 # AI agent
│   │   ├── prompts.py
│   │   └── agent.py
│   ├── routes/
│   │   └── chat.py         # Chat endpoint
│   └── db/
│       └── conversation_utils.py
│
├── skills/                  # Reusable Agent Skills
│   ├── task_intent/
│   ├── conversation/
│   └── validation/
│
├── specs/                   # Specification files
│   ├── sp.constitution.md
│   ├── sp.specify.md
│   ├── sp.plan.md
│   ├── sp.tasks.md
│   └── sp.implement.md
│
└── README.md
```

---

## 🎨 Features in Detail

### 1. Natural Language Processing

The AI understands various ways of expressing the same intent:

**Adding Tasks:**
- "Add buy groceries"
- "I need to call mom"
- "Remind me to finish the report"

**Listing Tasks:**
- "Show my tasks"
- "What do I need to do?"
- "What's on my list?"

**Completing Tasks:**
- "Mark task 3 as done"
- "I finished buying groceries"
- "Complete the first one"

**Deleting Tasks:**
- "Delete task 5"
- "Remove the meeting"
- "Cancel that task"

**Updating Tasks:**
- "Change task 1 to buy fruits"
- "Update the description"
- "Rename the first task"

### 2. MCP Tools Architecture

Five standardized tools power all task operations:

1. **add_task** - Create new tasks
2. **list_tasks** - Retrieve tasks (with filters)
3. **complete_task** - Mark tasks done
4. **delete_task** - Remove tasks
5. **update_task** - Modify task details

### 3. Stateless Backend

Every request:
1. Fetches conversation from database
2. Processes with AI agent
3. Saves results back to database
4. Forgets everything

**Benefits:**
- No session management complexity
- Any server can handle any request
- Zero data loss on server restart
- Easy horizontal scaling

### 4. Modern UI Components

Built with shadcn/ui patterns:
- **Button** - Multiple variants (default, outline, ghost)
- **Input** - Focus states and validation
- **Textarea** - Auto-resize on input
- **MessageBubble** - User (indigo) vs Assistant (slate)
- **Avatar** - Bot and User icons

---

## 🔧 Local Development Setup

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL (or Neon account)
- GROQ API key

### Frontend Setup
```bash
# Clone repository
git clone <repo-url>
cd taskmaster-pro/frontend

# Install dependencies
npm install

# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=your_secret_key

# Run development server
npm run dev
```

Frontend runs on: `http://localhost:3000`

### Backend Setup
```bash
# Navigate to backend
cd taskmaster-pro/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
DATABASE_URL=postgresql://user:pass@host/db
GROQ_API_KEY=your_groq_key
BETTER_AUTH_SECRET=your_secret_key

# Run database migrations
alembic upgrade head

# Start server
uvicorn main:app --reload
```

Backend runs on: `http://localhost:8000`

API docs available at: `http://localhost:8000/docs`

---

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

**Environment Variables (Vercel):**
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_OPENAI_DOMAIN_KEY`
- `BETTER_AUTH_SECRET`

### Backend (Render)
```bash
cd backend
railway up
```

**Environment Variables (Render):**
- `DATABASE_URL`
- `GROQ_API_KEY`
- `BETTER_AUTH_SECRET`

---

## 📚 API Documentation

### POST /api/{user_id}/chat

**Request:**
```json
{
  "conversation_id": 123,  // Optional, null creates new
  "message": "Add buy groceries"
}
```

**Response:**
```json
{
  "conversation_id": 123,
  "response": "I've added 'Buy groceries' to your list!",
  "tool_calls": [
    {
      "tool": "add_task",
      "arguments": { "user_id": "user123", "title": "Buy groceries" },
      "result": { "task_id": 42, "status": "created" }
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Conversation not found
- `500` - Server error

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/
```

**Test Coverage:**
- Unit tests for MCP tools
- Integration tests for chat endpoint
- E2E tests for natural language flows

### Frontend Tests
```bash
cd frontend
npm test
```

**Test Coverage:**
- Component rendering
- User interactions
- API integration

---

## 🏗️ Architecture

### System Flow
```
User → Next.js UI → FastAPI Server → OpenAI Agent → MCP Tools → PostgreSQL
                                           ↓
                                   Conversation State
                                   (Stateless Server)
```

### Conversation Persistence
```sql
-- conversations table
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations(id),
  user_id VARCHAR(255),
  role VARCHAR(20),  -- 'user' or 'assistant'
  content TEXT,
  created_at TIMESTAMP
);
```

---

## 🎯 Roadmap

### Phase IV (Upcoming)
- [ ] Local Kubernetes deployment (Minikube)
- [ ] Helm charts
- [ ] kubectl-ai integration
- [ ] AIOps monitoring

### Phase V (Future)
- [ ] Cloud deployment (DigitalOcean/GKE/AKS)
- [ ] Event-driven architecture (Kafka)
- [ ] Dapr integration
- [ ] Advanced features (recurring tasks, priorities, tags)

---

## 🤝 Contributing

This is a hackathon project built for GIAIC Q2 Hackathon Phase III.

**Built with:**
- Spec-Driven Development
- Claude Code for code generation
- Reusable Agent Skills
- Modern UI/UX principles

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

**Basit ali**  
GIAIC Q2 Hackathon - Phase III 

---

## 🙏 Acknowledgments

- GIAIC/Panaversity for the hackathon opportunity
- OpenAI for the Agents SDK
- Anthropic for Claude Code
- Vercel for hosting
- Render for backend deployment
- Neon for serverless PostgreSQL

---

## 📞 Support

**Live Demo:** [https://phase-3-ai-assistant.vercel.app](https://phase-3-ai-assistant.vercel.app)

**Issues:** Open an issue in the GitHub repository

**Contact:** [ba876943@gmail.com]

---

**⭐ If you find this project helpful, please star the repository!**
