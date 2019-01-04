package com.creating.util.thread;

/**
 * 执行耗时工具
 *
 * @Author mabailu
 * @Date 2018/2/26 17:05
 * @Description
 */
public class TimeCostUtils {
    private static final ThreadLocal<Long> TIME_THREADLOCAL = new ThreadLocal<Long>() {
        @Override
        protected Long initialValue() {
            return System.currentTimeMillis();
        }
    };

    public static final void begin() {
        TIME_THREADLOCAL.set(System.currentTimeMillis());
    }

    public static final long end() {
        return System.currentTimeMillis() - TIME_THREADLOCAL.get();

    }

}
