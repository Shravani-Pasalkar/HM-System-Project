package com.jbk.HospitalManagementApplication.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jbk.HospitalManagementApplication.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
