let alarms = [];

// Update time dynamically
setInterval(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
    document.getElementById('currentTime').innerText = timeString;

    // Check if the current time matches any set alarm
    alarms.forEach((alarmTime, index) => {
        if (timeString === alarmTime) {
            triggerAlarm(index);
        }
    });
}, 1000);

// Set an alarm
function setAlarm() {
    const hour = document.getElementById('hour').value.padStart(2, '0');
    const minute = document.getElementById('minute').value.padStart(2, '0');
    const second = document.getElementById('second').value.padStart(2, '0');

    // Validate if time is entered correctly
    if (hour && minute && second) {
        const alarmTime = `${hour}:${minute}:${second}`;
        if (!alarms.includes(alarmTime)) {
            alarms.push(alarmTime);
            updateAlarmList();
            document.getElementById('alarmMessage').innerText = `Alarm set for ${alarmTime}`;
        } else {
            alert("This alarm is already set!");
        }
    } else {
        alert("Please enter a valid time!");
    }
}

// Update alarm list
function updateAlarmList() {
    const alarmList = document.getElementById('alarmList');
    alarmList.innerHTML = "<h3>Set Alarms:</h3>";

    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('div');
        alarmItem.innerHTML = `
            ${alarm}
            <button onclick="deleteAlarm(${index})">Delete</button>
            <button onclick="modifyAlarm(${index})">Modify</button>
        `;
        alarmList.appendChild(alarmItem);
    });
}

// Delete an alarm
function deleteAlarm(index) {
    alarms.splice(index, 1);
    updateAlarmList();
}

// Modify an alarm
function modifyAlarm(index) {
    const newTime = prompt("Enter new time (HH:MM:SS):", alarms[index]);
    if (newTime && !alarms.includes(newTime)) {
        alarms[index] = newTime;
        updateAlarmList();
    } else {
        alert("Invalid or duplicate time!");
    }
}

// Upload custom alarm sound
function uploadSound() {
    const soundFile = document.getElementById('soundUpload').files[0];
    if (soundFile) {
        const fileSizeInMB = soundFile.size / (1024 * 1024); // Convert size to MB

        // Check if file size exceeds 15MB
        if (fileSizeInMB > 15) {
            alert("The file is too large! Please upload a file smaller than 15MB.");
        } else {
            const alarmSound = document.getElementById('alarmSound');
            alarmSound.src = URL.createObjectURL(soundFile);
            alert("Alarm sound updated!");
        }
    } else {
        alert("Please upload a valid audio file!");
    }
}

// Trigger the alarm when current time matches the alarm time
function triggerAlarm(index) {
    const alarmContainer = document.querySelector('.clock-container');
    alarmContainer.classList.add('alarm-active');

    const alarmSound = document.getElementById('alarmSound');
    alarmSound.play();

    // Stop the alarm sound after 15 seconds
    setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0; // Reset sound to start position
        alarmContainer.classList.remove('alarm-active');
    }, 15000); // 15 seconds
}
