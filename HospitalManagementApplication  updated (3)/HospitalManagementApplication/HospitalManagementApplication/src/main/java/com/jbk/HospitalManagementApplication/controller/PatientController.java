package com.jbk.HospitalManagementApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jbk.HospitalManagementApplication.entity.Patient;
import com.jbk.HospitalManagementApplication.repo.PatientRepository;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")  // Allow CORS for all origins (for simplicity in testing)
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }
    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        Patient patient = patientRepository.findById(id).orElseThrow();
        patient.setName(patientDetails.getName());
        patient.setAge(patientDetails.getAge());
        patient.setDisease(patientDetails.getDisease());
        return patientRepository.save(patient);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientRepository.deleteById(id);
    }
}
