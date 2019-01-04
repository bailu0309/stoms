package com.creating.util;

import com.creating.util.json.DateUtils;
import org.apache.poi.hssf.record.formula.functions.T;

import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.util.*;

/**
 * @Author mabailu
 * @Date 2018/12/24 15:11
 * @Description
 */
public class BeanUtils {


    /**
     * 集合实体转集合map
     *
     * @param beans
     * @return
     */
    public static List<Map> ListBeanToListMap(List beans) {
        List<Map> ls = new ArrayList<>();

        for (Object bean : beans) {
            Map map = BeanToMap(bean);
            ls.add(map);
        }

        return ls;
    }

    /**
     * 实体类非空属性转map
     *
     * @param bean 实体类
     */
    public static <T> Map BeanToMap(T bean) {
        Map map = new HashMap();
        Class clazz = bean.getClass();
        Arrays.stream(clazz.getDeclaredFields()).forEach(field -> {
            setMap(field, bean, map);
        });
        return map;
    }

    /**
     * 获取所需字段的值转map
     *
     * @param bean   实体类
     * @param fields 获取字段(逗号分割)
     */
    public static <T> Map BeanToMap(T bean, String fields) {
        Map map = new HashMap();
        Class clazz = bean.getClass();
        Arrays.stream(clazz.getDeclaredFields())
                .filter(field -> fields.indexOf(field.getName()) != -1 ? true : false)
                .forEach(field -> setMap(field, bean, map));
        return map;
    }

    /**
     * 获取字段的值map
     *
     * @param field
     */
    public static <T> void setMap(Field field, T bean, Map map) {
        //访问private限制
        field.setAccessible(true);
        try {
            Object fieldValue = field.get(bean);
            String simpleName = field.getType().getSimpleName();

            if (fieldValue != null) {
                if (Objects.equals("Date", simpleName) || Objects.equals("Timestamp", simpleName)) {
                    fieldValue = DateUtils.datetimeFormat.format(field.get(bean));
                }
                map.put(field.getName(), fieldValue);
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }

}
