package com.creating.util.database;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DataSource {
    String name() default DataSource.testDataSource1;
 
    public static String testDataSource1 = "testDataSource1";
 
    public static String testDataSource2 = "testDataSource2";

 
}
