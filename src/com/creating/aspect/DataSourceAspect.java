package com.creating.aspect;

import com.creating.util.database.DataSource;
import com.creating.util.database.DataSourceContextHolder;
import org.springframework.aop.AfterReturningAdvice;
import org.springframework.aop.MethodBeforeAdvice;

import java.lang.reflect.Method;

public class DataSourceAspect implements MethodBeforeAdvice, AfterReturningAdvice {

    @Override
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        DataSourceContextHolder.clearDataSourceType();
    }

    @Override
    public void before(Method method, Object[] args, Object target) throws Throwable {
        //根据方法名切换数据源

        if (1 == 1) {
        }

//        if (method.getDeclaringClass().getName().contains(".oracle.")) {
//            DataSourceContextHolder.setDataSourceType(DataSourceContextHolder.DATA_SOURCE_ORACLE);
//        } else {
//            DataSourceContextHolder.setDataSourceType(DataSourceContextHolder.DATA_SOURCE_MYSQL);
//        }

//        DataSourceContextHolder.setDataSourceType(DataSourceContextHolder.DATA_SOURCE_ORACLE);


        //根据注解切换数据源
        if (method.isAnnotationPresent(DataSource.class)) {
            DataSource la = method.getAnnotation(DataSource.class);
            if (la.name() != null) {
                DataSourceContextHolder.setDataSourceType(DataSourceContextHolder.DATA_SOURCE_ORACLE);
            }
        } else {
            DataSourceContextHolder.setDataSourceType(DataSourceContextHolder.DATA_SOURCE_MYSQL);
        }

    }


}
