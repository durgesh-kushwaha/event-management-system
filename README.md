# Smart Event Manager

## Overview

This is a standalone smart event management system built purely with **HTML**, **CSS**, and **JavaScript**. It allows users to add, edit, delete, search, and filter events with a clean and responsive user interface. The application stores event data locally in the browser using the `localStorage` API, so no backend or external services are required.

---

## File Structure

- `index.html` — The main HTML file containing the structure of the application, including the event list, search/filter controls, modal for adding/editing events, notification area, and footer.
- `styles.css` — Contains all the custom CSS styles for the UI, including layout, colors, animations, and responsive design.
- `script.js` — Contains all the JavaScript logic for managing events, handling UI interactions, and persisting data.

---

## JavaScript Workflow and Explanation

### State Management

- The application maintains an array of event objects in the variable `events`.
- Each event object contains:
  - `id`: A unique identifier (timestamp string).
  - `title`: Event title.
  - `date`: Event date (ISO string).
  - `category`: Event category (work, personal, hobby, other).
  - `description`: Optional event description.
  - `createdAt`: Timestamp of creation.

- The `events` array is saved to and loaded from `localStorage` under the key `"events"` to persist data across page reloads.

### Initialization

- On page load (`DOMContentLoaded`), the app:
  - Loads events from `localStorage`.
  - Renders the event list.
  - Sets up event listeners for UI controls.

### UI Controls and Event Listeners

- **Add New Event Button**: Opens the modal form to add a new event.
- **Cancel Button**: Closes the modal without saving.
- **Event Form Submission**: Handles both adding new events and editing existing ones.
- **Search Input**: Filters events by title and description in real-time.
- **Category Filter Dropdown**: Filters events by selected category.

### Modal Handling

- The modal is used for both adding and editing events.
- When editing, the form fields are pre-filled with the selected event's data.
- On form submission, the event is either added or updated in the `events` array and saved to `localStorage`.
- The modal closes after successful submission.

### Rendering Events

- The event list is rendered dynamically based on the current `events` array and any active filters.
- Events are sorted by date ascending.
- If no events match the filters, a friendly empty state message is shown.
- Each event card displays the title, formatted date, description, category badge, and action buttons (Edit/Delete).

### Editing and Deleting Events

- **Edit**: Opens the modal with the event's data for modification.
- **Delete**: Prompts for confirmation, then removes the event from the array and updates `localStorage`.

### Notifications

- Success and error messages are shown as temporary notifications at the top-right corner.
- Notifications automatically disappear after 3 seconds.

---

## How to Use

1. Open `index.html` in any modern web browser.
2. Use the **Add New Event** button to create events.
3. Use the search box and category filter to find specific events.
4. Edit or delete events using the buttons on each event card.
5. All changes are saved locally and persist on page reload.

---

## Technologies Used

- **HTML5**: Semantic markup for structure.
- **CSS3**: Custom styles with flexbox, grid, animations, and responsive design.
- **JavaScript (ES6+)**: DOM manipulation, event handling, localStorage API.

---

## Notes

- No external libraries, frameworks, or backend services are used.
- Data is stored only in the browser's localStorage, so clearing browser data will erase events.
- The UI is designed to be clean, modern, and user-friendly.

---

## Author

Made with ❤️ by Durgesh Kushwaha
