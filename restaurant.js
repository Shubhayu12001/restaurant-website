const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw-a1nEW5G19Br43nWwoo8fuApDFjACZLLWglRGM8wo5f6Yt2BZMprgrQbcD6ArHI9H/exec";

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
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    statusEl.textContent = "✅ Reservation submitted! We'll confirm shortly via email.";
    form.reset();
  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Failed to submit. Please try again.";
  }
});
