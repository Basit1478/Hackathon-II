-- TaskFlow Pro Database Maintenance Scripts
-- Neon PostgreSQL Database: phase-2-todo-app

-- ========================================
-- 1. DATABASE HEALTH CHECKS
-- ========================================

-- Check table sizes
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS table_size,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) AS index_size
FROM pg_tables
WHERE schemaname = 'public' AND tablename IN ('users', 'tasks')
ORDER BY tablename;

-- Check row counts
SELECT
    'users' as table_name,
    COUNT(*) as row_count
FROM users
UNION ALL
SELECT
    'tasks' as table_name,
    COUNT(*) as row_count
FROM tasks;

-- Verify all indexes
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
    AND tablename IN ('users', 'tasks')
ORDER BY tablename, indexname;

-- ========================================
-- 2. VERIFY DATA INTEGRITY
-- ========================================

-- Check for orphaned tasks (should always be 0)
SELECT COUNT(*) as orphaned_tasks
FROM tasks t
WHERE NOT EXISTS (
    SELECT 1 FROM users u WHERE u.id = t.user_id
);

-- User task summary
SELECT
    u.id as user_id,
    u.email,
    u.name,
    COUNT(t.id) as total_tasks,
    COUNT(CASE WHEN t.completed THEN 1 END) as completed_tasks,
    COUNT(CASE WHEN NOT t.completed THEN 1 END) as pending_tasks
FROM users u
LEFT JOIN tasks t ON u.id = t.user_id
GROUP BY u.id, u.email, u.name
ORDER BY total_tasks DESC;

-- ========================================
-- 3. PERFORMANCE MONITORING
-- ========================================

-- Check index usage statistics
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
    AND tablename IN ('users', 'tasks')
ORDER BY tablename, indexname;

-- Check table statistics
SELECT
    schemaname,
    relname as table_name,
    seq_scan as sequential_scans,
    seq_tup_read as seq_tuples_read,
    idx_scan as index_scans,
    idx_tup_fetch as idx_tuples_fetched,
    n_tup_ins as inserts,
    n_tup_upd as updates,
    n_tup_del as deletes
FROM pg_stat_user_tables
WHERE schemaname = 'public'
    AND relname IN ('users', 'tasks');

-- ========================================
-- 4. CONSTRAINT VERIFICATION
-- ========================================

-- Verify all foreign key constraints
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    rc.delete_rule,
    rc.update_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
JOIN information_schema.referential_constraints AS rc
    ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public';

-- ========================================
-- 5. CLEANUP OPERATIONS
-- ========================================

-- Remove users with no tasks (use with caution)
-- UNCOMMENT TO USE:
-- DELETE FROM users
-- WHERE id NOT IN (SELECT DISTINCT user_id FROM tasks)
-- AND created_at < NOW() - INTERVAL '30 days';

-- Archive completed tasks older than 6 months (example)
-- UNCOMMENT TO USE:
-- DELETE FROM tasks
-- WHERE completed = true
-- AND updated_at < NOW() - INTERVAL '6 months';

-- ========================================
-- 6. RECREATE INDEXES (if needed)
-- ========================================

-- Drop and recreate indexes (if they become corrupted)
-- UNCOMMENT TO USE:

-- DROP INDEX IF EXISTS ix_tasks_user_id;
-- DROP INDEX IF EXISTS ix_tasks_completed;
-- DROP INDEX IF EXISTS ix_tasks_user_completed;

-- CREATE INDEX ix_tasks_user_id ON tasks(user_id);
-- CREATE INDEX ix_tasks_completed ON tasks(completed);
-- CREATE INDEX ix_tasks_user_completed ON tasks(user_id, completed);

-- ========================================
-- 7. TEST CASCADE DELETE
-- ========================================

-- Test CASCADE delete behavior (creates and deletes test data)
-- UNCOMMENT TO RUN TEST:

-- BEGIN;
--
-- -- Create test user
-- INSERT INTO users (id, email, name, password_hash, created_at, updated_at)
-- VALUES ('test_cascade_delete', 'cascade_test@delete.com', 'Test Delete', 'hash', NOW(), NOW());
--
-- -- Create test task
-- INSERT INTO tasks (title, description, completed, user_id, created_at, updated_at)
-- VALUES ('Test Task', 'Testing cascade', false, 'test_cascade_delete', NOW(), NOW());
--
-- -- Verify task created
-- SELECT COUNT(*) as tasks_before FROM tasks WHERE user_id = 'test_cascade_delete';
--
-- -- Delete user (should cascade delete task)
-- DELETE FROM users WHERE id = 'test_cascade_delete';
--
-- -- Verify task deleted
-- SELECT COUNT(*) as tasks_after FROM tasks WHERE user_id = 'test_cascade_delete';
--
-- COMMIT;

-- ========================================
-- 8. BACKUP VERIFICATION
-- ========================================

-- Check last backup time (Neon-specific)
SELECT
    NOW() as current_time,
    'Neon handles backups automatically' as backup_status,
    'Point-in-time recovery available for 24 hours (free tier)' as note;

-- ========================================
-- 9. CONNECTION MONITORING
-- ========================================

-- Check active connections
SELECT
    datname as database,
    usename as username,
    application_name,
    client_addr,
    state,
    query_start,
    state_change
FROM pg_stat_activity
WHERE datname = 'neondb'
ORDER BY query_start DESC;

-- ========================================
-- 10. VACUUM AND ANALYZE (Maintenance)
-- ========================================

-- Analyze tables for query optimization
-- UNCOMMENT TO USE:
-- ANALYZE users;
-- ANALYZE tasks;

-- Vacuum to reclaim storage (Neon handles this automatically)
-- Note: VACUUM FULL requires table locks, use with caution
-- VACUUM ANALYZE users;
-- VACUUM ANALYZE tasks;
