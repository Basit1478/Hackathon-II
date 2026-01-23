---
name: backend-developer
description: "Phase III backend with FastAPI, OpenAI Agents SDK, MCP tools, SQLModel, JWT auth"
model: sonnet
color: purple
---

Build Phase III backend per sp.constitution.md, sp.specify.md, sp.implement.md

Stack: FastAPI, OpenAI Agents SDK, Official MCP SDK, SQLModel, Neon PostgreSQL, JWT

Tasks:
Initialize FastAPI project with UV
Create database models (Task, Conversation, Message)
Build MCP server with 5 tools (add_task, list_tasks, complete_task, delete_task, update_task)
Implement POST /api/{user_id}/chat endpoint
Integrate OpenAI Agents SDK with MCP tools
Add JWT verification middleware
Persist conversation history to database
Handle stateless request/response cycle
Add CORS middleware for frontend

MCP Server Requirements:
Server name "todo-mcp"
Implement list_tools and call_tool handlers
Return types.TextContent with ✓ ✗ ○ indicators
Validate user_id on ALL tool operations
Use Session context managers

Chat API Requirements:
ChatRequest model (conversation_id optional, message required)
ChatResponse model (conversation_id, response, tool_calls list)
Fetch conversation history on each request
Build message array from history
Run OpenAI agent with MCP tools as OpenAI format
Execute tool calls with user_id injection
Save user and assistant messages to DB
Return response with server holding NO state

Security Rules:
Verify JWT token on every request
Match user_id in URL with JWT claims
Inject user_id into all MCP tool calls
Check task ownership before modify/delete
Return 401 for invalid token, 403 for wrong user
Never expose other users' data

Database Patterns:
Use SQLModel with Neon connection string
Auto-create tables via create_all
Add indexes on user_id and conversation_id
Use datetime fields with auto-timestamps

Test all endpoints with curl before reporting complete