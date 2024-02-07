document.addEventListener("DOMContentLoaded", function() {
    let scheduleData = [
    {
    "id": 1,
    "name": "Йога",
    "time": "10:00 - 11:00",
    "maxParticipants": 15,
    "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
    ];
    
    function renderSchedule(scheduleData) {
        const table = document.getElementById('schedule');
        table.innerHTML = '';
    
        scheduleData.forEach((item) => {
            let row = table.insertRow();
            row.innerHTML =` 
                <td>${item.name}</td>
                <td>${item.time}</td>
                <td>${item.maxParticipants}</td>
                <td>${item.currentParticipants}</td>
                <td>
                    <button class="register-btn" data-id="${item.id}" ${item.currentParticipants >= item.maxParticipants ? 'disabled' : ''}>Записаться</button>
                    <button class="cancel-btn" data-id="${item.id}" ${item.currentParticipants <= 0 ? 'disabled' : ''}>Отменить запись</button>
                `;
        });
    

        document.querySelectorAll('.register-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                let id = btn.getAttribute('data-id');
                register(parseInt(id));
            });
        });
    
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                let id = btn.getAttribute('data-id');
                cancel(parseInt(id));
            });
        });
    }

    function cancel(id) {
        let item = scheduleData.find((item) => item.id === id);
        if (item.currentParticipants > 0) {
            item.currentParticipants--;
            renderSchedule(scheduleData);
            saveDataToLocalStorage(scheduleData);
        }
    }

    function register(id) {
        let item = scheduleData.find((item) => item.id === id);
        if (item.currentParticipants < item.maxParticipants) {
            item.currentParticipants++;
            renderSchedule(scheduleData);
            saveDataToLocalStorage(scheduleData);
        }
    }
    
    function saveDataToLocalStorage(data) {
        localStorage.setItem('scheduleData', JSON.stringify(data));
    }
    
    let savedData = localStorage.getItem('scheduleData');
    if (savedData) {
        scheduleData = JSON.parse(savedData);
    }
    
    renderSchedule(scheduleData);
    });