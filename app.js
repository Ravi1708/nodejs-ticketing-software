const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const conferenceName = "Marvel";
let conferenceTickets = 50;
let remainingTickets = 50;

console.log(`Welcome to ${conferenceName} booking application\n`);
console.log(
	`We have a total of ${remainingTickets} tickets, and ${remainingTickets} tickets are still available\n`
);
console.log("Book your tickets here to attend");

const bookings = [];

rl.question("Enter your first name: ", (firstName) => {
	rl.question("Enter your last name: ", (lastName) => {
		rl.question("Enter your Email: ", (email) => {
			rl.question("Enter the number of Tickets: ", (userTicketsInput) => {
				const userTickets = parseInt(userTicketsInput);

				if (userTickets <= remainingTickets) {
					remainingTickets -= userTickets;
					const fullName = `${firstName} ${lastName}`;
					bookings.push(fullName);

					console.log(`Total bookings: ${bookings}`);
					console.log(
						`Thank you ${fullName} for booking ${userTickets} tickets. You will receive a confirmation email.\n`
					);
				} else {
					console.log(
						"Insufficient tickets available. Booking failed.\n"
					);
				}

				rl.close();
			});
		});
	});
});
