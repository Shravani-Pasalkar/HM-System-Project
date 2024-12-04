package com.jbk.HospitalManagementApplication.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.jbk.HospitalManagementApplication.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
