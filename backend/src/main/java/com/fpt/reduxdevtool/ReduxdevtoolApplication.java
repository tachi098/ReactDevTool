package com.fpt.reduxdevtool;

import com.fpt.reduxdevtool.seed.SeedEmployeeTable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import javax.naming.Context;
import java.text.ParseException;

@SpringBootApplication
public class ReduxdevtoolApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReduxdevtoolApplication.class, args);
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) throws ParseException {
        SeedEmployeeTable.insertData();
    }
}
