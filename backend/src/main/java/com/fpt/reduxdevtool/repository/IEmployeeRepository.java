package com.fpt.reduxdevtool.repository;

import com.fpt.reduxdevtool.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IEmployeeRepository extends JpaRepository<Employee, Long> {
    Boolean existsEmployeeByEmail(String email);
    Boolean existsEmployeesById(Long id);
}
