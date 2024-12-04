const baseURL = "http://localhost:8080/api"; // Adjust to your backend's base URL

document.addEventListener('DOMContentLoaded', () => {
    showTab('patients');
    loadPatients();
    loadDoctors();

    // Add Patient
    document.getElementById('patientForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('patientName').value;
        const age = document.getElementById('patientAge').value;
        const disease = document.getElementById('patientDisease').value;

        await fetch(`${baseURL}/patients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, disease }),
        });
        loadPatients();
        document.getElementById('patientForm').reset();
    });

    // Add Doctor
    document.getElementById('doctorForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('doctorName').value;
        const specialization = document.getElementById('doctorSpecialization').value;
        const experience = document.getElementById('doctorExperience').value;

        await fetch(`${baseURL}/doctors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, specialization, experience }),
        });
        loadDoctors();
        document.getElementById('doctorForm').reset();
    });
});

// Load Patients
async function loadPatients() {
    const response = await fetch(`${baseURL}/patients`);
    const patients = await response.json();

    const tableBody = document.querySelector('#patientsTable tbody');
    tableBody.innerHTML = '';
    patients.forEach((patient) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.disease}</td>
            <td>
                <button onclick="deletePatient(${patient.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Load Doctors
async function loadDoctors() {
    const response = await fetch(`${baseURL}/doctors`);
    const doctors = await response.json();

    const tableBody = document.querySelector('#doctorsTable tbody');
    tableBody.innerHTML = '';
    doctors.forEach((doctor) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.experience}</td>
            <td>
                <button onclick="deleteDoctor(${doctor.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Delete Patient
async function deletePatient(id) {
    await fetch(`${baseURL}/patients/${id}`, { method: 'DELETE' });
    loadPatients();
}

// Delete Doctor
async function deleteDoctor(id) {
    await fetch(`${baseURL}/doctors/${id}`, { method: 'DELETE' });
    loadDoctors();
}

// Tab Switching
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach((tab) => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}
