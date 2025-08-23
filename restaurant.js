const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz-AtXNDn0Dwk0V90H17hxcAzm-2Et1wb8k61ghPXi3sYf8Hotgf-7GTfNAmKit1Cn2/exec";

const form = document.getElementById("reservationForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    date: form.date.value,
    time: form.time.value,
    guests: form.guests.value
  };

  statusEl.textContent = "Submitting...";

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.status === "success") {
      statusEl.textContent = "✅ Reservation submitted! We'll confirm shortly via email.";
      statusEl.style.color = "green";
      form.reset();
    } else {
      statusEl.textContent = "❌ Error: " + result.message;
      statusEl.style.color = "red";
    }

  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Failed to connect. Please try again.";
    statusEl.style.color = "red";
  }
});
