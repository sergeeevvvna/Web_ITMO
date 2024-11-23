document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scheduleForm');
    const scheduleContainer = document.getElementById('scheduleContainer');

    const savedSettings = JSON.parse(localStorage.getItem('scheduleSettings'));
    const savedData = JSON.parse(localStorage.getItem('scheduleData')) || {};

    if (savedSettings) {
        form.elements.weekType.value = savedSettings.weekType;
        form.elements.maxLessons.value = savedSettings.maxLessons;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const settings = {
            weekType: form.elements.weekType.value,
            maxLessons: form.elements.maxLessons.value
        };
        localStorage.setItem('scheduleSettings', JSON.stringify(settings));

        generateSchedule(settings);
    });

    function generateSchedule(settings) {
        scheduleContainer.innerHTML = '';

        const days = settings.weekType == 5 ? 
            ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'] : 
            ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

        const maxLessons = settings.maxLessons;
        const table = document.createElement('table');
        table.classList.add('schedule-table');

        const headerRow = document.createElement('tr');
        const emptyHeaderCell = document.createElement('th');
        headerRow.appendChild(emptyHeaderCell);

        for (let i = 1; i <= maxLessons; i++) {
            const lessonHeader = document.createElement('th');
            lessonHeader.textContent = `Урок ${i}`;
            headerRow.appendChild(lessonHeader);
        }
        table.appendChild(headerRow);

        days.forEach(day => {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = day;
            row.appendChild(dayCell);

            for (let i = 1; i <= maxLessons; i++) {
                const lessonCell = document.createElement('td');
                lessonCell.contentEditable = true; 

                              const cellKey = `${day}-${i}`;
                if (savedData[cellKey]) {
                    lessonCell.textContent = savedData[cellKey];
                }

                              lessonCell.addEventListener('input', () => {
                    savedData[cellKey] = lessonCell.textContent;
                    localStorage.setItem('scheduleData', JSON.stringify(savedData));
                });

                row.appendChild(lessonCell);
            }
            table.appendChild(row);
        });

        scheduleContainer.appendChild(table);
    }


    if (savedSettings) {
        generateSchedule(savedSettings);
    }
});
