// lib/mysql.ts
import mysql from 'mysql2/promise';

// Use the environment variables from .env.local
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * Executes a raw SQL query using the connection pool.
 * @param sql The SQL query string (use '?' for placeholders).
 * @param values An array of values to safely substitute into the query.
 * @returns A Promise resolving to an array of result rows.
 */
export async function query<T>(sql: string, values: any[] = []): Promise<T[]> {
    try {
        // pool.execute is preferred over pool.query for security (prepared statements)
        const [rows] = await pool.execute(sql, values);
        return rows as T[];
    } catch (error) {
        console.error('MySQL Query Error:', error);
        throw new Error('Database query failed.');
    }
}