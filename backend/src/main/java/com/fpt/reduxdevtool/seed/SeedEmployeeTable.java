package com.fpt.reduxdevtool.seed;

import com.fpt.reduxdevtool.entity.Employee;
import com.fpt.reduxdevtool.repository.IEmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;

@Component
public class SeedEmployeeTable {
    private static IEmployeeRepository iEmployeeRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(SeedEmployeeTable.class);

    public SeedEmployeeTable(IEmployeeRepository iEmployeeRepository) {
        this.iEmployeeRepository = iEmployeeRepository;
    }

    public static void insertData() throws ParseException{
        long count = iEmployeeRepository.count();
        if (count == 0){
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

            Employee employee1 = new Employee("Pham Quang Huy", "huypq@gmail.com", "0933691822",format.parse("1998-04-04"));
            Employee employee2 = new Employee("Pham Xuan Hoai", "hoaixp@gmail.com", "0933691822",format.parse("1995-10-29"));

        //Insert data
            iEmployeeRepository.saveAll(Arrays.asList(
               employee1, employee2
            ));
            LOGGER.info("Employee table seeded");
        } else{
            LOGGER.info("Employee seeding not required");
        }
    }
}
