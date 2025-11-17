const express = require("express");
const Pool = require('pg').Pool;
const bodyParser = require("body-parser");
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

// connect to database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password:'postgres',
    port: 5432,
});

app.get("/api/viewGoals", (req, res) => {

    // retrieve goals from database based on userid


    const userID = 1; // change this later!!


    const sql = "SELECT * FROM goals WHERE user_id = $1";

    pool.query(sql, [userID], (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows);
    });
});

app.post("/api/viewGoals/save", (req, res) => {

    
    // get userID
    const userID = 1; // change this later because it is hardcoded


    // check for goals, can be null meaning there isn't anything there
    const dailyGoal = req.body.dailyGoals || null;
    const shortGoal = req.body.shortTermGoals || null;
    const longGoal = req.body.longTermGoals || null;

    // check if everything is empty (in this case they can't put anything into database)
    if (dailyGoal === "" && shortGoal === "" && longGoal === ""){
        res.status(500).send("invalid");
    };

    // send stuff to database
    const SQL = "INSERT INTO goals (user_id, dailyGoal, shortGoal, longGoal) VALUES($1, $2, $3, $4);";

    const data = [userID, dailyGoal, shortGoal, longGoal];

    pool.query(SQL, data, (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows);
    });
});

app.delete("/api/viewGoals/delete/:id", (req, res) => {
    // get id from request
    const id = req.params.id;
    
    // delete from database
    const SQL = "DELETE FROM goals WHERE id = $1";

    pool.query(SQL, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Goal deleted");
    });
});

app.listen(80, () => {
    console.log("Listening on port 80");
});
