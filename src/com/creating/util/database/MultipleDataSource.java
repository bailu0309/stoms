package com.creating.util.database;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

/**
 * @Author mabailu
 * @Date 2018/5/18 9:27
 * @Description 多数据源切换
 */
public class MultipleDataSource extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
        return DataSourceContextHolder.getDataSourceType();
    }


}
