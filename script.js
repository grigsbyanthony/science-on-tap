document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const snowToggle = document.querySelector('.snow-toggle');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Move snow toggle into mobile menu when it's open
            if (snowToggle) {
                if (navLinks.classList.contains('active')) {
                    navLinks.appendChild(snowToggle);
                } else {
                    document.querySelector('.navbar').appendChild(snowToggle);
                }
            }
        });
    }

    // Only initialize features if we're on the home page
    const calendarElement = document.getElementById('calendar');
    if (calendarElement) {
        initializeCalendar();
        initializeCountdown();
    }
});

function initializeCountdown() {
    // Get next event date (last Monday of current month)
    const nextEvent = getNextEventDate();
    
    // Update countdown every second
    updateCountdown(nextEvent);
    setInterval(() => updateCountdown(nextEvent), 1000);
}

function getNextEventDate() {
    // Next event is January 28, 2025 at 6:30 PM
    const nextEvent = new Date(2025, 0, 28, 18, 30, 0, 0);
    const now = new Date();
    
    // If the event has passed, return null or handle accordingly
    if (nextEvent < now) {
        // You might want to update this to show "Event has passed" or get the next month's event
        return nextEvent; // For now, still show countdown to demonstrate the timer
    }
    
    return nextEvent;
}

function updateCountdown(eventDate) {
    const now = new Date();
    const timeLeft = eventDate - now;
    
    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update DOM elements
    document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
    document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
}

function initializeCalendar() {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    
    // Create array with the actual event date
    const eventDates = [new Date(2025, 0, 28)]; // January 28, 2025
    
    renderCalendar(currentMonth, currentYear, eventDates);
}

function renderCalendar(month, year, eventDates) {
    const calendarElement = document.getElementById('calendar');
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    let calendarHTML = `
        <div class="calendar-header">
            <h3>${monthNames[month]} ${year}</h3>
        </div>
        <div class="calendar-grid">
            <div class="calendar-day-header">Sun</div>
            <div class="calendar-day-header">Mon</div>
            <div class="calendar-day-header">Tue</div>
            <div class="calendar-day-header">Wed</div>
            <div class="calendar-day-header">Thu</div>
            <div class="calendar-day-header">Fri</div>
            <div class="calendar-day-header">Sat</div>
    `;
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const isEvent = eventDates.some(eventDate => 
            eventDate.getDate() === day && 
            eventDate.getMonth() === month
        );
        
        calendarHTML += `
            <div class="calendar-day${isEvent ? ' event-day' : ''}">
                ${day}
                ${isEvent ? '<div class="event-indicator"></div>' : ''}
            </div>
        `;
    }
    
    calendarHTML += '</div>';
    
    // Add calendar styles
    const styles = `
        <style>
            .calendar-header {
                text-align: center;
                margin-bottom: 1rem;
                color: var(--primary-blue);
            }
            
            .calendar-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 4px;
            }
            
            .calendar-day-header {
                text-align: center;
                font-weight: bold;
                color: var(--dark-brown);
                padding: 0.5rem;
            }
            
            .calendar-day {
                position: relative;
                text-align: center;
                padding: 0.5rem;
                background: white;
                border-radius: 4px;
                min-height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: default;
            }
            
            .calendar-day.empty {
                background: transparent;
            }
            
            .calendar-day.event-day {
                color: var(--primary-blue);
                font-weight: bold;
                background: rgba(255, 143, 0, 0.1);
                border: 1px solid var(--warm-amber);
            }
            
            .event-indicator {
                position: absolute;
                bottom: 4px;
                left: 50%;
                transform: translateX(-50%);
                width: 6px;
                height: 6px;
                background: var(--warm-amber);
                border-radius: 50%;
            }
        </style>
    `;
    
    calendarElement.innerHTML = styles + calendarHTML;
}
