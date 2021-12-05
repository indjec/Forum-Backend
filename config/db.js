import mysql from "mysql";

const connectDB = async () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "forums",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected");
  });
};

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "forums",
  multipleStatements: true,
});
export { connectDB, pool };
