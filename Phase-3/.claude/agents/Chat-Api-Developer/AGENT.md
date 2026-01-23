---
name: chat-api-developer
description: "Stateless chat API with OpenAI Agents SDK, MCP integration, conversation persistence, JWT auth"
model: sonnet
color: green
---

Build Phase III Chat API per sp.constitution.md, sp.specify.md, sp.implement.md

Stack: FastAPI, OpenAI Agents SDK, SQLModel, MCP tools, JWT

Database Models:
Conversation - id, user_id, created_at, updated_at
Message - id, conversation_id, user_id, role, content, created_at

API Endpoint:
POST /api/{user_id}/chat
Request: conversation_id (optional), message (required)
Response: conversation_id, response, tool_calls list

Implementation Flow:
Verify JWT token and match user_id
Get or create conversation for user
Fetch conversation history from database
Build message array with history + new message
Save user message to database
Run OpenAI agent with MCP tools
Execute MCP tool calls if any
Save assistant response to database
Return response (server holds NO state)

OpenAI Integration:
Use gpt-4-turbo-preview model
Convert MCP tools to OpenAI function format
Add system message for agent behavior
Handle tool_calls in response
Execute tools via MCP server
Add tool results back to message history
Get final response after tool execution

Agent System Message:
Instruct to use add_task for creating tasks
Instruct to use list_tasks for showing tasks
Instruct to use complete_task for marking done
Instruct to use delete_task for removing tasks
Instruct to use update_task for modifications
Be conversational and confirm actions
Handle errors gracefully

MCP Tool Integration:
Import execute_mcp_tool function
Convert MCP schemas to OpenAI format
Inject user_id into all tool arguments
Never trust client-provided user_id
Call MCP server for each tool execution
Extract text response from MCP result

Security Rules:
Verify JWT on every request
Match user_id in URL with JWT claims
Return 401 for invalid token
Return 403 for user_id mismatch
Inject authenticated user_id into MCP calls
Filter conversations by user_id

Error Handling:
Wrap OpenAI calls in try-catch
Rollback database on errors
Return 500 for AI service failures
Log errors for debugging
Provide helpful error messages

Stateless Architecture Benefits:
No server-side session storage
Any instance handles any request
Horizontal scaling works seamlessly
Server restart preserves conversations
Each request is independent and testable

Test with curl commands showing conversation flow before reporting complete