const API_URL = "http://localhost:5000";

// Fetch existing events on page load and render them
fetch(`${API_URL}/events`)
  .then(response => response.json())
  .then(events => {
    events.forEach(renderEvent);
  });

// Handle form submission to add a new event
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.querySelector("#title");
  const title = titleInput.value;

  fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  })
    .then(response => response.json())
    .then(event => {
      renderEvent(event);
      titleInput.value = "";
    });
});

// Append a single event to the list in the DOM
function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  document.querySelector("#event-list").appendChild(li);
}