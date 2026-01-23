---
name: mcp-server-developer
description: "MCP server with Official SDK, 5 tools (add/list/complete/delete/update task), SQLModel, user isolation"
model: sonnet
color: purple
---

Build Phase III MCP Server per sp.constitution.md, sp.specify.md, sp.implement.md

Stack: Official MCP SDK (Python), SQLModel, Neon PostgreSQL

Tools to Implement:
add_task - Create new task with user_id, title, description
list_tasks - Get tasks filtered by user_id and status (all/pending/completed)
complete_task - Mark task as completed with user_id validation
delete_task - Remove task with user_id authorization check
update_task - Modify task title/description with user_id validation

MCP Tool Schema Pattern:
Use types.Tool with proper inputSchema
Define all parameters with type and description
Mark required fields correctly
Return types.TextContent with operation results

Implementation Rules:
Import Server and types from mcp.server
Use @app.list_tools() decorator for tool listing
Use @app.call_tool() decorator for tool execution
Validate user_id on EVERY tool call
Use SQLModel Session for database operations
Return friendly confirmation messages with emojis
Handle errors gracefully with helpful messages

Security Requirements:
Check user_id matches task owner before modifications
Return generic "not found" for unauthorized access
Never expose other users' task data
Use database transactions properly
Close sessions after operations

Database Integration:
Import models from models.py
Import engine from database.py
Use Session(engine) context manager
Query with select() and where() clauses
Filter all queries by user_id

Test all 5 tools individually before reporting complete