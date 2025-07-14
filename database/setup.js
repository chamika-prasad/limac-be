import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
};

const SQL_STATEMENTS = [
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "limacdb"}`,
  `USE ${process.env.DB_NAME || "limacdb"}`,
  `CREATE TABLE IF NOT EXISTS admin (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `,
  `CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(36) PRIMARY KEY,
        projectName VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        topDescription TEXT,
        bottomDescription TEXT,
        topImages TEXT,
        bottomImages TEXT,
        highlights TEXT,
        status VARCHAR(50) DEFAULT 'ongoing'
      )
    `,
  `CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(36) PRIMARY KEY,
        serviceName VARCHAR(255) NOT NULL,
        logo VARCHAR(255),
        includes TEXT,
        image VARCHAR(255)
      )
    `,
  `CREATE TABLE IF NOT EXISTS clients (
        id VARCHAR(36) PRIMARY KEY,
        clientName VARCHAR(255) NOT NULL,
        logo VARCHAR(255)
      )
    `,
];

async function setupDatabase() {
  let connection;
  try {
    // 1. Connect to MySQL server (without specifying a database)
    connection = await mysql.createConnection(DB_CONFIG);
    console.log("✅ Connected to MySQL server");

    // Execute statements one by one
    for (const sql of SQL_STATEMENTS) {
      try {
        await connection.query(sql);
        console.log(`✓ Executed: ${sql.split(" ").slice(0, 6).join(" ")}...`);
      } catch (error) {
        console.error(`⚠️ Error executing: ${sql.substring(0, 50)}...`);
        throw error;
      }
    }
    console.log("🎉 Database and tables created successfully!");
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
  } finally {
    // 3. Close the connection
    if (connection) await connection.end();
  }
}

// Execute the setup
setupDatabase();
