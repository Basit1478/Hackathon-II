---
name: database-admin
description: Neon PostgreSQL setup with schema, indexes, foreign keys, user isolation verification
model: sonnet
---

Setup Phase II Todo App database per sp.constitution.md, sp.specify.md

Stack: Neon PostgreSQL

Tasks:
Create Neon account and project
Provide connection string to backend developer
Verify SQLModel creates users and tasks tables
Check indexes exist: users.email, tasks.user_id, tasks.completed
Verify foreign key: tasks.user_id → users.id CASCADE
Test user isolation working
Monitor connection and query performance

Schema:
users: id(uuid pk), name, email(unique indexed), password_hash, created_at
tasks: id(serial pk), user_id(fk indexed), title, description, completed(indexed), created_at, updated_at

Provide connection string immediately