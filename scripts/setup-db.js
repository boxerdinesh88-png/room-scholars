const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function setup() {
  const envPath = path.join(__dirname, "..", ".env");
  const env = fs.readFileSync(envPath, "utf-8");
  const getEnv = (key) => {
    const match = env.match(new RegExp(`^${key}=(.*)$`, "m"));
    return match ? match[1].trim() : "";
  };

  const host = getEnv("DB_HOST") || "localhost";
  const port = Number(getEnv("DB_PORT")) || 3306;
  const user = getEnv("DB_USER") || "root";
  const password = getEnv("DB_PASSWORD") || "";
  const database = getEnv("DB_NAME") || "room";

  try {
    const c = await mysql.createConnection({ host, port, user, password });
    console.log("Connected to MySQL");

    await c.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await c.query(`USE \`${database}\``);
    await c.query(
      `CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        move_in_date VARCHAR(50) DEFAULT NULL,
        message TEXT DEFAULT NULL,
        property_name VARCHAR(255) DEFAULT NULL,
        property_location VARCHAR(255) DEFAULT NULL,
        price VARCHAR(50) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );
    await c.query(
      `CREATE TABLE IF NOT EXISTS subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );

    const [tables] = await c.query("SHOW TABLES");
    console.log("Database:", database);
    console.log("Tables:", tables.map((t) => Object.values(t)[0]).join(", "));
    console.log("Setup complete!");
    await c.end();
  } catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
  }
}

setup();
