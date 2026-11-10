// Destination Data

const destinations = [

    {
        name: "Goa",
        country: "India",
        price: 5999,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600"
    },

    {
        name: "Manali",
        country: "India",
        price: 7999,
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600"
    },

    {
        name: "Dubai",
        country: "UAE",
        price: 24999,
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600"
    },

    {
        name: "Paris",
        country: "France",
        price: 39999,
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600"
    },

    {
        name: "Bali",
        country: "Indonesia",
        price: 29999,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600"
    },

    {
        name: "Maldives",
        country: "Maldives",
        price: 34999,
        rating: "5.0",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600"
    }

];


// Display Destinations

const container = document.getElementById("destinationContainer");

function displayDestinations(data) {

    container.innerHTML = "";

    if (data.length === 0) {

        container.innerHTML =
        "<h3>No destinations found!</h3>";

        return;
    }

    data.forEach((place) => {

        const card = document.createElement("div");

        card.className = "destination-card";

        card.innerHTML = `

            <img src="${place.image}" alt="${place.name}">

            <div class="card-content">

                <h3>${place.name}, ${place.country}</h3>

                <p>⭐ ${place.rating} Rating</p>

                <div class="price">
                    ₹${place.price.toLocaleString("en-IN")} / person
                </div>

                <button class="book-btn"
                onclick="openBooking('${place.name}')">

                    Book Now

                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


// Search Function

function searchDestination() {

    const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase().trim();

    const filtered = destinations.filter((place) => {

        return place.name.toLowerCase().includes(searchValue)
        || place.country.toLowerCase().includes(searchValue);

    });

    displayDestinations(filtered);

    document.getElementById("destinations")
    .scrollIntoView({ behavior: "smooth" });

}


// Booking Function

let selectedPlace = null;

function openBooking(name) {

    selectedPlace = destinations.find(
        place => place.name === name
    );

    const modal = document.getElementById("bookingModal");

    const travellers = Number(
        document.getElementById("travellers").value
    );

    document.getElementById("bookingDetails").innerHTML = `

        <p><strong>Destination:</strong> ${selectedPlace.name}</p>

        <p><strong>Travellers:</strong> ${travellers}</p>

        <p><strong>Price per person:</strong> ₹${selectedPlace.price.toLocaleString("en-IN")}</p>

        <p><strong>Total Price:</strong> ₹${(selectedPlace.price * travellers).toLocaleString("en-IN")}</p>

    `;

    modal.style.display = "flex";

}


// Close Modal

function closeModal() {

    document.getElementById("bookingModal")
    .style.display = "none";

}


// Booking Confirmation

document.getElementById("bookingForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value;

    const email = document.getElementById("customerEmail").value;

    const checkin = document.getElementById("checkin").value;

    const checkout = document.getElementById("checkout").value;

    const travellers = Number(
        document.getElementById("travellers").value
    );

    if (!checkin || !checkout) {

        alert("Please select your travel dates!");

        return;

    }

    if (new Date(checkin) < new Date().setHours(0,0,0,0)) {

        alert("Check-in date cannot be in the past!");

        return;

    }

    if (new Date(checkout) <= new Date(checkin)) {

        alert("Check-out must be after check-in!");

        return;

    }

    const total = selectedPlace.price * travellers;

    const booking = {

        customer: name,
        email: email,
        destination: selectedPlace.name,
        checkin: checkin,
        checkout: checkout,
        travellers: travellers,
        totalPrice: total

    };

    console.log("Booking Details:", booking);

    alert(

        "Booking Successful! 🎉\n\n" +

        "Name: " + name + "\n" +

        "Destination: " + selectedPlace.name + "\n" +

        "Travellers: " + travellers + "\n" +

        "Total: ₹" + total.toLocaleString("en-IN")

    );

    closeModal();

    this.reset();

});


// Login Demo

function showLogin() {

    alert("Welcome to TravelX! Login feature coming soon.");

}


// Initial Display

displayDestinations(destinations);