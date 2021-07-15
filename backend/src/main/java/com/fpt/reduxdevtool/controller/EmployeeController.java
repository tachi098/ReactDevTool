package com.fpt.reduxdevtool.controller;

import com.fpt.reduxdevtool.entity.Employee;
import com.fpt.reduxdevtool.payload.response.messageResponse;
import com.fpt.reduxdevtool.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private IEmployeeRepository iEmployeeRepository;

    @GetMapping("")
    public ResponseEntity<List<Employee>> getAll(){
        List<Employee> employees = iEmployeeRepository.findAll();
        return new ResponseEntity(employees, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> addEmployee(@RequestBody Employee employee){
        if (!iEmployeeRepository.existsEmployeeByEmail(employee.getEmail())){
            Employee employeeNew = new Employee(employee.getName(), employee.getEmail(), employee.getPhone(), employee.getBirthday());
            iEmployeeRepository.save(employeeNew);
            return new ResponseEntity(employeeNew, HttpStatus.OK);
        }else{
            return ResponseEntity.badRequest().body(new messageResponse("Email existed..."));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmpoyee(@PathVariable("id") long id){
        if(iEmployeeRepository.existsEmployeesById(id)){
            Employee employee = iEmployeeRepository.findById(id).get();
            iEmployeeRepository.deleteById(id);
            return new ResponseEntity(employee, HttpStatus.OK);
        }else{
            return ResponseEntity.badRequest().body(new messageResponse("employee is not exist..."));
        }
    }

    @PutMapping("")
    public ResponseEntity<?> updateEmployee(@RequestBody Employee employee){
        if(iEmployeeRepository.existsEmployeesById(employee.getId())){
            Employee employeeUpdate = iEmployeeRepository.findById(employee.getId()).get();
            employeeUpdate.setName(employee.getName());
            employeeUpdate.setEmail(employee.getEmail());
            employeeUpdate.setPhone(employee.getPhone());
            employeeUpdate.setBirthday(employee.getBirthday());
            iEmployeeRepository.save(employeeUpdate);
            return new ResponseEntity(employeeUpdate, HttpStatus.OK);
        }else{
            return ResponseEntity.badRequest().body(new messageResponse("Employee is not exist..."));
        }
    }
}
