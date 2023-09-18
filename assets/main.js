document.addEventListener("DOMContentLoaded", function () {
	// Get available tickets on page load
	fetch("http://34.71.75.15:5000/get-tickets")
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("availableTickets").textContent =
				data.available_tickets;
		});

	// Get bookings on page load
	fetch("http://34.71.75.15:5000/bookings")
		.then((response) => response.json())
		.then((data) => {
			const bookingsList = document.getElementById("bookingsList");
			bookingsList.innerHTML = "";
			data.bookings.forEach((booking) => {
				const li = document.createElement("li");
				li.textContent = booking;
				bookingsList.appendChild(li);
			});
		});

	// Handle ticket booking form submission
	document
		.getElementById("bookTicketsForm")
		.addEventListener("submit", function (e) {
			e.preventDefault();

			const formData = {
				first_name: document.getElementById("first_name").value,
				last_name: document.getElementById("last_name").value,
				email: document.getElementById("email").value,
				tickets: parseInt(document.getElementById("tickets").value),
			};

			fetch("http://34.71.75.15:5000/book-tickets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.booking_status === "confirmed") {
						alert(data.message);
						// Refresh available tickets and bookings after successful booking
						fetch("/get-tickets")
							.then((response) => response.json())
							.then((data) => {
								document.getElementById(
									"availableTickets"
								).textContent = data.available_tickets;
							});

						fetch("/bookings")
							.then((response) => response.json())
							.then((data) => {
								const bookingsList =
									document.getElementById("bookingsList");
								bookingsList.innerHTML = "";
								data.bookings.forEach((booking) => {
									const li = document.createElement("li");
									li.textContent = booking;
									bookingsList.appendChild(li);
								});
							});
					} else {
						alert(data.message);
					}
				});
		});
});
