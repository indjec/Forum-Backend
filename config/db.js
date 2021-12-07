// import mysql from "mysql";

// const connectDB = async () => {
//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "forums",
//   });

//   connection.connect((err) => {
//     if (err) throw err;
//     console.log("MySQL Connected");
//   });
// };

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "forums",
//   multipleStatements: true,
// });
// export { connectDB, pool };
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("seq_test_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
