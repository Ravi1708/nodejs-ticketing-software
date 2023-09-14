const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MySQL database connection configuration
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "ticket_booking",
});

// connecting to the database
db.connect((err) => {
	if (err) {
		console.error("Error connecting to MySQL:", err);
	} else {
		console.log("Connected to MySQL database");
	}
});

// Create a table to store bookings if it doesn't exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        tickets INT
    )
`;

// Execute the query to create the table
db.query(createTableQuery, (err) => {
	if (err) {
		console.error("Error creating table:", err);
	} else {
		console.log("Table created or already exists");
	}
});

// Initial number of tickets and bookings
let remainingTickets = 100;

app.get("/", (req, res) => {
	const movieName = "The Matrix";
	res.json({
		message: `Welcome to ${movieName} booking application`,
		available_tickets: remainingTickets,
	});
});

// Function to get available tickets from the database
function getAvailableTickets(callback) {
	db.query("SELECT SUM(tickets) FROM bookings", (err, result) => {
		if (err) {
			console.error("Error fetching available tickets:", err);
			callback(remainingTickets);
		} else {
			const totalTicketsBooked = result[0]["SUM(tickets)"] || 0;
			const availableTickets = 100 - totalTicketsBooked;
			callback(availableTickets);
		}
	});
}

app.get("/get-tickets", (req, res) => {
	getAvailableTickets((availableTickets) => {
		res.json({ available_tickets: availableTickets });
	});
});

app.post("/book-tickets", (req, res) => {
	const data = req.body;
	const firstName = data.first_name;
	const lastName = data.last_name;
	const email = data.email;
	const userTickets = data.tickets;

	if (userTickets <= remainingTickets) {
		remainingTickets -= userTickets;
		const insertBookingQuery = `
            INSERT INTO bookings (first_name, last_name, email, tickets)
            VALUES (?, ?, ?, ?)
        `;

		db.query(
			insertBookingQuery,
			[firstName, lastName, email, userTickets],
			(err) => {
				if (err) {
					console.error("Error inserting booking:", err);
					res.status(500).json({
						message: "Booking failed",
						booking_status: "failed",
					});
				} else {
					res.json({
						message: `Thank you ${firstName} ${lastName} for booking ${userTickets} tickets.`,
						booking_status: "confirmed",
					});
				}
			}
		);
	} else {
		res.status(400).json({
			message: "Insufficient tickets available.",
			booking_status: "failed",
		});
	}
});

app.get("/bookings", (req, res) => {
	const getBookingsQuery = "SELECT first_name, last_name FROM bookings";
	db.query(getBookingsQuery, (err, result) => {
		if (err) {
			console.error("Error fetching bookings:", err);
			res.status(500).json({ bookings: [] });
		} else {
			const bookings = result.map(
				(row) => `${row.first_name} ${row.last_name}`
			);
			res.json({ bookings: bookings });
		}
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
