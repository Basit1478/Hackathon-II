---
name: database-developer
description: "SQLModel schemas for tasks, conversations, messages with proper relationships and indexes"
model: sonnet
color: orange
---

Build Phase III Database Models per sp.constitution.md, sp.specify.md, sp.implement.md

Stack: SQLModel, Neon PostgreSQL, datetime utilities

Models to Create:
Task - Extended from Phase II with same structure
Conversation - New model for chat sessions
Message - New model for chat history

Task Model (from Phase II):
id - Optional[int], primary_key
user_id - str, indexed for filtering
title - str, not null
description - Optional[str]
completed - bool, default False
created_at - datetime, auto-generated
updated_at - datetime, auto-updated

Conversation Model:
id - Optional[int], primary_key
user_id - str, indexed for user filtering
created_at - datetime, auto-generated
updated_at - datetime, auto-updated on message

Message Model:
id - Optional[int], primary_key
conversation_id - int, foreign_key to conversation.id
user_id - str, indexed for security
role - str, either "user" or "assistant"
content - str, message text
created_at - datetime, auto-generated

Index Strategy:
Add index on user_id in all tables
Add index on conversation_id in messages
Add index on completed in tasks for filtering
Indexes improve query performance

Field Specifications:
Use Field(default=None, primary_key=True) for IDs
Use Field(foreign_key="table.id") for relationships
Use Field(default_factory=datetime.now) for timestamps
Use Field(index=True) for frequently queried fields
Use Field(default=False) for booleans

Database Connection:
Import create_engine from sqlmodel
Use Neon PostgreSQL connection string from env
Set echo=True for development debugging
Create engine once at module level
Use SQLModel.metadata.create_all(engine) for tables

Session Management:
Import Session from sqlmodel
Use context manager: with Session(engine)
Always close sessions after operations
Commit transactions explicitly
Rollback on errors

Auto-Table Creation:
Import all models in main.py or database.py
Call create_all_tables() on startup
Use SQLModel.metadata.create_all(engine)
Tables created automatically if not exist

Migration Notes:
Task table already exists from Phase II
Only Conversation and Message are new
No schema changes to Task model
Use same database as Phase II

Test database connection and table creation before reporting complete