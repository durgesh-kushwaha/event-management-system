const eventsGrid = document.getElementById('eventsGrid');
const eventModal = document.getElementById('eventModal');
const eventForm = document.getElementById('eventForm');
const modalTitle = document.getElementById('modalTitle');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const addEventBtn = document.getElementById('addEventBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const notification = document.getElementById('notification');

const eventTitle = document.getElementById('eventTitle');
const eventDate = document.getElementById('eventDate');
const eventCategory = document.getElementById('eventCategory');
const eventDescription = document.getElementById('eventDescription');

let events = JSON.parse(localStorage.getItem('events')) || [];
let editingEventId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
    setupEventListeners();
});

function setupEventListeners() {
    addEventBtn.addEventListener('click', openAddModal);
    cancelBtn.addEventListener('click', closeModal);
    eventForm.addEventListener('submit', handleFormSubmit);
    searchInput.addEventListener('input', filterEvents);
    categoryFilter.addEventListener('change', filterEvents);

    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeModal();
        }
    });
}

function openAddModal() {
    editingEventId = null;
    modalTitle.textContent = 'Add New Event';
    eventForm.reset();
    eventModal.classList.add('show');
    eventTitle.focus();
}

function openEditModal(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    editingEventId = eventId;
    modalTitle.textContent = 'Edit Event';
    eventTitle.value = event.title;
    eventDate.value = event.date;
    eventCategory.value = event.category;
    eventDescription.value = event.description;
    eventModal.classList.add('show');
    eventTitle.focus();
}

function closeModal() {
    eventModal.classList.remove('show');
    eventForm.reset();
    editingEventId = null;
}

function handleFormSubmit(e) {
    e.preventDefault();

    const eventData = {
        title: eventTitle.value.trim(),
        date: eventDate.value,
        category: eventCategory.value,
        description: eventDescription.value.trim()
    };

    if (editingEventId) {
        updateEvent(editingEventId, eventData);
        showNotification('Event updated successfully!', 'success');
    } else {
        addEvent(eventData);
        showNotification('Event added successfully!', 'success');
    }

    closeModal();
}

function addEvent(eventData) {
    const newEvent = {
        id: Date.now().toString(),
        ...eventData,
        createdAt: new Date().toISOString()
    };

    events.push(newEvent);
    saveEvents();
    renderEvents();
}

function updateEvent(eventId, eventData) {
    const index = events.findIndex(e => e.id === eventId);
    if (index !== -1) {
        events[index] = { ...events[index], ...eventData };
        saveEvents();
        renderEvents();
    }
}

function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(e => e.id !== eventId);
        saveEvents();
        renderEvents();
        showNotification('Event deleted successfully!', 'success');
    }
}

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function renderEvents(filteredEvents = null) {
    const eventsToRender = filteredEvents || events;
    eventsGrid.innerHTML = '';

    if (eventsToRender.length === 0) {
        eventsGrid.innerHTML = `
            <div class="empty-state">
                <h3>${filteredEvents ? 'No events found' : 'No events yet'}</h3>
                <p>${filteredEvents ? 'Try adjusting your search or filter.' : 'Click "Add New Event" to get started!'}</p>
            </div>
        `;
        return;
    }

    eventsToRender.sort((a, b) => new Date(a.date) - new Date(b.date));

    eventsToRender.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h3 class="event-title">${event.title}</h3>
            <div class="event-date">${formatDate(event.date)}</div>
            <div class="event-description">${event.description || 'No description provided.'}</div>
            <span class="event-category category-${event.category}">${event.category}</span>
            <div class="event-actions">
                <button class="btn btn-secondary" onclick="openEditModal('${event.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteEvent('${event.id}')">Delete</button>
            </div>
        `;
        eventsGrid.appendChild(eventCard);
    });
}

function filterEvents() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;

    let filteredEvents = events;

    if (category !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.category === category);
    }

    if (searchTerm) {
        filteredEvents = filteredEvents.filter(event =>
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
    }

    renderEvents(filteredEvents);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

window.openEditModal = openEditModal;
