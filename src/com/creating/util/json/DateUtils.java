package com.creating.util.json;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author xuelei
 * @ClassName: DateUtils
 * @Description: 多种时间处理方式
 * @date 2012-3-10 下午10:42:38
 */
public class DateUtils {
    private static Logger logger = Logger.getLogger(DateUtils.class);
    public static SimpleDateFormat datetimeFormat = new SimpleDateFormat(
            "yyyy-MM-dd HH:mm:ss", Locale.US);
    public static SimpleDateFormat datetimeFormat1 = new SimpleDateFormat(
            "yyyy-MM-dd HH", Locale.US);
    public static SimpleDateFormat datetimeFormat2 = new SimpleDateFormat(
            "yyyy-MM-dd HH:mm", Locale.US);
    public static SimpleDateFormat dateFormat = new SimpleDateFormat(
            "yyyy-MM-dd", Locale.US);
    public static SimpleDateFormat dateFormat43 = new SimpleDateFormat(
            "yyyy.MM.dd", Locale.US);
    public static SimpleDateFormat timeFormat = new SimpleDateFormat(
            "HH:mm:ss", Locale.US);
    public static SimpleDateFormat dateTimeNumber = new SimpleDateFormat(
            "yyyyMMddHHmmss");
    public static SimpleDateFormat dateTimeNumber2 = new SimpleDateFormat(
            "yyyyMMdd");
    public static SimpleDateFormat simpleDateTimeFormat = new SimpleDateFormat(
            "MM-dd HH:mm", Locale.US);
    public static SimpleDateFormat monthDateFormat = new SimpleDateFormat(
            "MM-dd", Locale.US);

    public static SimpleDateFormat monthDateFormat2 = new SimpleDateFormat(
            "M月d日", Locale.US);

    public static SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
            "HH:mm", Locale.US);

    public static SimpleDateFormat datetimeFormat4 = new SimpleDateFormat(
            "yyyy/MM/dd HH:mm:ss", Locale.US);

    /**
     * 取得当前格式化的日期，时间 HHmm
     *
     * @return
     */
    public static String formatDateNumber(final Date date) {
        String str = simpleDateFormat.format(date);
        return str;
    }

    public static String formatDateNumber(final long datetime) {
        String str = simpleDateFormat.format(new Date(datetime));
        return str;
    }

    public static String formatDateBySimple(Date date, String simple) {
        if (date == null || simple == null) {
            return null;
        }
        SimpleDateFormat format = new SimpleDateFormat(simple, Locale.US);
        return format.format(date);
    }

    /**
     * 取得格式化的日期，时间 yyyyMMddHHmmss
     *
     * @return
     */
    public static String formatDateTimeNumber(final long datetime) {
        String str = dateTimeNumber.format(new Date(datetime));
        return str;
    }

    /**
     * 取得当前格式化的日期，时间 yyyyMMddHHmmss
     *
     * @return
     */
    public static String formatCurrDateTimeNumber() {
        String str = dateTimeNumber.format(new Date());
        return str;
    }

    /**
     * 取得当前格式化的日期，时间 yyyyMMdd
     *
     * @return
     */

    public static String formatDateTimeNumber2(final long datetime) {
        String str = dateTimeNumber2.format(new Date(datetime));
        return str;
    }

    /**
     * 把日期格式化为yyyy-MM-dd hh:mm
     *
     * @param datetime
     * @return
     */
    public static String formatDateTime2(final Date datetime) {
        if (datetime == null) {
            return "";
        }
        String str = datetimeFormat2.format(datetime);
        return str;
    }

    /**
     * 把日期格式化为yyyy-MM-dd hh
     *
     * @param datetime
     * @return
     */
    public static String formatDateTime1(final Date datetime) {
        if (datetime == null) {
            return "";
        }
        String str = datetimeFormat1.format(datetime);
        return str;
    }

    /**
     * 取得当前格式化的日期，时间 yyyy-MM-dd HH:mm:ss
     *
     * @return
     */
    public static String getCurrentDateTime() {
        Date now = new Date();
        return formatDateTime(now);
    }

    /**
     * 取得当前格式化的日期 yyyy-MM-dd
     *
     * @return
     */
    public static String getCurrentDate() {
        Date now = new Date();
        return formatDate(now);
    }

    /**
     * 把格式为yyyy-MM-dd HH:mm:ss转换为Date.
     *
     * @param str
     * @return
     */
    public static Date parseDateTime(final String str) {
        if (StringUtils.isEmpty(str)) {
            return null;
        }
        Date date = null;
        try {
            date = datetimeFormat.parse(str);
        } catch (ParseException ex) {

        }
        return date;
    }

    /**
     * 把格式为yyyy-MM-dd HH:mm:ss转换为Date.
     *
     * @param str
     * @return
     */
    public static Date parseDate(final String str, String end) {
        Date date = null;
        try {
            date = datetimeFormat.parse(str + (end == null ? "" : " " + end));
        } catch (ParseException e) {

        }
        return date;
    }

    public static Date parseDate(final String str) {
        if (StringUtils.isEmpty(str)) {
            return null;
        }
        Date date = null;
        try {
            date = dateFormat.parse(str);
        } catch (ParseException e) {

        }
        return date;
    }

    /**
     * 把日期格式化为 MM月dd日
     *
     * @return
     */
    public static String formatMonthDate(final long lngTime) {
        String str = monthDateFormat.format(new Date(lngTime));
        return str;
    }

    public static String formatMonthDate2(final long lngTime) {
        String str = monthDateFormat2.format(new Date(lngTime));
        return str;
    }

    public static String formatMonthDate2(final Date datetime) {
        if (datetime == null) {
            return "";
        }
        String str = monthDateFormat2.format(datetime);
        return str;
    }

    /**
     * 把日期格式化为yyyy-MM-dd hh:mm:ss
     *
     * @param datetime
     * @return
     */
    public static String formatDateTime(final Date datetime) {
        if (datetime == null) {
            return "";
        }
        String str = datetimeFormat.format(datetime);
        return str;
    }

    /**
     * 把日期格式化为yyyy/MM/dd hh:mm:ss
     *
     * @param datetime
     * @return
     */
    public static String formatDateTime4(final Date datetime) {
        if (datetime == null) {
            return "";
        }
        String str = datetimeFormat4.format(datetime);
        return str;
    }

    /**
     * 把日期格式化为MM-dd hh:mm
     *
     * @param datetime
     * @return
     */
    public static String formatSimpleDateTime(final Date datetime) {
        if (datetime == null) {
            return "";
        }
        String str = simpleDateTimeFormat.format(datetime);
        return str;
    }

    /**
     * 把日期格式化为yyyy-MM-dd hh:mm:ss
     *
     * @param datetime long
     * @return
     */
    public static String formatDateTime(final long datetime) {
        String str = datetimeFormat.format(new Date(datetime));
        return str;
    }

    public static String formatDate(final long date) {
        String str = dateFormat.format(new Date(date));
        return str;
    }

    // 把日期格式化为yyyy-MM-dd格式
    public static String formatDate(final Date date) {
        if (date == null) {
            return "";
        }
        String str = dateFormat.format(date);
        return str;
    }

    // 把日期格式化为yyyy-MM-dd格式
    public static String formatDate43(final Date date) {
        String str = dateFormat43.format(date);
        return str;
    }

    public static String formatTime(final Date date) {
        String str = timeFormat.format(date);
        return str;
    }

    public static Date stringToDate(String str) throws Exception {
        Date date = null;
        date = dateFormat.parse(str);
        return date;
    }

    public static Date stringToDateTime(String str) {
        Date date = null;
        try {
            date = datetimeFormat.parse(str);
        } catch (ParseException e) {

        }
        return date;
    }

    /**
     * @deprecated
     */
    public static Date StringToDate(String str) {
        Date date = null;
        try {
            date = datetimeFormat.parse(str);
        } catch (ParseException e) {

        }
        return date;
    }

    /**
     * @deprecated
     */
    public static String DateToString(Date date) {
        String str = datetimeFormat.format(date);
        return str;
    }

    /**
     * 取得当前时间
     *
     * @deprecated
     */
    public static String getFormattedNowDate() {
        DateFormat df = DateFormat.getDateTimeInstance();
        Date date = new Date();
        return df.format(date);
    }

    /**
     * 取得当前年度
     *
     * @deprecated
     */
    public static String getNowYear() {
        DateFormat df = DateFormat.getDateTimeInstance();
        Date date = new Date();
        return (df.format(date) + "").substring(0, 4);

    }

    /**
     * 取得当前时间之后n分钟时间 日期格式为yyyy-MM-dd hh:mm:ss
     *
     * @deprecated
     */
    public static String getFormattedNowDateDelayMin(int n) {
        String dateMin = "";
        try {
            // SimpleDateFormat sdf = new
            // SimpleDateFormat("HH:mm:ss.SSS");//时:分:秒.毫秒
            // 当前时间加五分钟
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            GregorianCalendar gc = new GregorianCalendar();
            System.out.println(sdf.format(gc.getTime()));
            // //////////////增加n分钟
            gc.add(GregorianCalendar.MINUTE, n);
            System.out.println(sdf.format(gc.getTime()));
            dateMin = "" + sdf.format(gc.getTime());
            System.out.println(dateMin);
        } catch (Exception e) {
            logger.error("取得当前时间之后n分钟时间 日期格式为yyyy-MM-dd hh:mm:ss", e);
            e.printStackTrace();
        }
        return dateMin;
    }

    /**
     * 取得当前时间之前n分钟时间 日期格式为yyyy-MM-dd hh:mm:ss
     *
     * @deprecated
     */
    public static String getFormattedNowDateBeforeMin(int n) {
        String dateMin = "";
        try {
            // SimpleDateFormat sdf = new
            // SimpleDateFormat("HH:mm:ss.SSS");//时:分:秒.毫秒
            // 当前时间减五分钟
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 用hh表示用12小时制，HH表示用24小时制。MM定然是大写!

            GregorianCalendar gc = new GregorianCalendar();
            // //////////////减n分钟
            gc.add(GregorianCalendar.MINUTE, -n);

            dateMin = "" + sdf.format(gc.getTime());
        } catch (Exception e) {
            logger.error("取得当前时间之前n分钟时间 日期格式为yyyy-MM-dd hh:mm:ss", e);
            e.printStackTrace();
        }
        return dateMin;
    }

    /**
     * 取得当前时间 yyyyMMddHHmmss
     *
     * @return
     */
    public static String formatDateTime() {
        String str = dateTimeNumber.format(new Date());
        return str;
    }

    /**
     * 判断当前日期是星期几<br>
     * <br>
     *
     * @return dayForWeek 判断结果<br>
     * @Exception 发生异常 <br>
     */
    public static int dayForWeek() throws Exception {
        DateFormat fm = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.setTime(fm.parse(getCurrentDate()));// 当前日期
        int dayForWeek = 0;
        if (c.get(Calendar.DAY_OF_WEEK) == 1) {
            dayForWeek = 7;
        } else {
            dayForWeek = c.get(Calendar.DAY_OF_WEEK) - 1;
        }
        return dayForWeek;
    }

    /**
     * 推算当前之前或之后多少天的日期,之前用负值
     *
     * @param year  by number years(before or after this year) default:0
     * @param month by number months(before or after this month)default:0,no
     *              change
     * @param day   by number day(before or after this day)default:0,no change
     * @return yyyy-MM-dd
     */
    public static String getCountDate(int year, int month, int day) {

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.YEAR, year);
        cal.add(Calendar.MONDAY, month);
        cal.add(Calendar.DATE, day);

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String temp = format.format(cal.getTime());
        return temp;
    }

    /**
     * @param @param  sj1
     * @param @param  jj
     * @param @return
     * @return String 返回类型
     * @throws
     * @Title: getPreTime
     * @Description: 向前或向后推迟**分钟， jj表示分钟
     */
    public static String getPreTime(String sj1, String jj) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String mydate1 = "";
        try {
            Date date1 = format.parse(sj1);
            long Time = (date1.getTime() / 1000) + Integer.parseInt(jj) * 60;
            date1.setTime(Time * 1000);
            mydate1 = format.format(date1);
        } catch (Exception e) {

        }
        return mydate1;
    }

    /**
     * @param @param  thisYear
     * @param @return
     * @return String 返回类型
     * @throws
     * @Title: lastYear
     * @Description: 获取去年同一天日期字符串
     */
    public static String lastYear(String yearStr) {
        Date thisYear = parseDate(yearStr);
        Calendar c = Calendar.getInstance();
        c.setTime(thisYear);
        c.add(Calendar.YEAR, -1);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String temp = format.format(c.getTime());
        return temp;
    }


    /**
     * @param @param  thisYear
     * @param @return
     * @return String 返回类型
     * @throws
     * @Title: lastYear
     * @Description: 获取去年同一天日期字符串
     */
    public static String lastYear2(String yearStr) {
        Date thisYear = parseDate(yearStr);
        Calendar c = Calendar.getInstance();
        c.setTime(thisYear);
        c.add(Calendar.YEAR, -1);
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String temp = format.format(c.getTime());
        return temp;
    }

    /**
     * * 取得enddate 之间 startdate的年数 *
     *
     * @param startdate Date *
     * @param enddate   Date *
     * @return int
     */
    public static int getYears(Date startdate, Date enddate) {
        long time = enddate.getTime() - startdate.getTime();
        // int totalS = new Long(time / (1000*60*60*24).intValue(); //天数
        // int totalS = new Long(time / 1000).intValue(); //秒数

        int totalS = new Long(time / (1000 * 60 * 60 * 24 * 365)).intValue();
        return totalS;
    }

    /**
     * 计算格式为yyyy-MM-dd之前或之后多少天的日期Date.
     *
     * @param date
     * @return
     */
    public static String getDateBeforeNum(Date date, int n) {
        // Date date = null;
        String dateStr = "";
        try {
            long mms = 1000 * 60 * 60 * 24 * n;
            // date = dateFormat.parse(str);
            long temp_mms = date.getTime() + mms;

            dateStr = datetimeFormat.format(new Date(temp_mms));
            dateStr = dateStr.substring(0, 10);
        } catch (Exception e) {

        }
        return dateStr;
    }

    /**
     * @param stype 返回值类型 0为多少天，1为多少个月，2为多少年
     * @return
     */
    public static int compareDate(String date1, String date2, int stype) {
        int n = 0;

        String[] u = {"天", "月", "年"};
        String formatStyle = "yyyy-MM-dd";
        DateFormat df = new SimpleDateFormat(formatStyle);
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        try {
            c1.setTime(df.parse(date1));
            c2.setTime(df.parse(date2));
        } catch (Exception e3) {
            System.out.println("wrong occured");
        }
        while (!c1.after(c2)) {
            n++;
            if (stype == 1) {
                c1.add(Calendar.MONTH, 1);// 比较月份，月份+1
            } else if (stype == 0) {
                c1.add(Calendar.DATE, 1); // 比较天数，日期+1
            } else if (stype == 2) {
                c1.add(Calendar.YEAR, 1);
            }
        }

        n = n - 1;

        System.out.println(date1 + " -- " + date2 + " 相差多少" + u[stype] + ":"
                + n);
        return n;
    }


    /**
     * @param @return
     * @return String 返回类型
     * @throws
     * @Title: getTransactionIdByTime
     * @Description: 根据当前时间和随机数产生唯一id
     */
    public String getTransactionIdByTime() {
        Calendar day = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String times_str = sdf.format(day.getTime());
        int temp_num = (int) (Math.random() * 1000000);
        return times_str + temp_num;
    }


    /**
     * @param @return
     * @return String 返回类型
     * @throws
     * @Title: getTransactionIdByTime
     * @Description: 根据当前时间和随机数产生唯一id
     */
    public String getTransactionIdByLongTime() {
        Calendar day = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String times_str = sdf.format(day.getTime());
        int temp_num = (int) (Math.random() * 1000000000);
        return times_str + temp_num;
    }


    private static SimpleDateFormat dateFormat_hf = null;

    static {
        dateFormat_hf = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat_hf.setLenient(false);
    }

    /**
     * @param @param  s
     * @param @return
     * @return boolean 返回类型
     * @throws
     * @Title: isValidDate
     * @Description: 判断日期是否合法
     */
    public static boolean isValidDate(String s) {
        try {
            dateFormat_hf.parse(s);
            return true;
        } catch (Exception e) { // 如果throw
            // java.text.ParseException或者NullPointerException，就说明格式不对
            return false;
        }
    }

    /**
     * @param @param  time1
     * @param @param  time2
     * @param @return
     * @return long    返回类型
     * @throws
     * @Title: getQuot
     * @Description: 计算两个日期相差天数
     */
    public static long getQuot(String time1, String time2) {
        long quot = 0;
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date1 = ft.parse(time1);
            Date date2 = ft.parse(time2);
            quot = date1.getTime() - date2.getTime();
            quot = quot / 1000 / 60 / 60 / 24;
        } catch (ParseException e) {
            logger.error("计算两个日期相差天数 ", e);
            e.printStackTrace();
        }
        return quot;
    }


    /**
     * @param @param  time1
     * @param @param  time2
     * @param @return
     * @return long    返回类型
     * @throws
     * @Title: getQuotYear
     * @Description: 计算与当天相差年数
     */
    public static long getQuotYear(Date time) {
        long quot = 0;
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = new Date();
        Date date2 = time;
        quot = date1.getYear() - date2.getYear();
        return quot;
    }

    /**
     * @param @param  time1
     * @param @param  time2
     * @param @return
     * @return long    返回类型
     * @throws
     * @Title: getQuot2
     * @Description: 计算两个日期相差天数 2
     */
    public static long getQuot2(String time1, String time2) {
        long quot = 0;
        SimpleDateFormat ft = new SimpleDateFormat("yyyyMMdd");
        try {
            Date date1 = ft.parse(time1);
            Date date2 = ft.parse(time2);
            quot = date1.getTime() - date2.getTime();
            quot = quot / 1000 / 60 / 60 / 24;
        } catch (ParseException e) {
            logger.error("计算两个日期相差天数 2 ", e);
            e.printStackTrace();
        }
        return quot;
    }

    //获取月度最后一天的日期格式
    public static String lastDayOfMonth(String date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(parseDate(date));
        cal.set(Calendar.DAY_OF_MONTH, 1);
        cal.roll(Calendar.DAY_OF_MONTH, -1);

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String temp = format.format(cal.getTime());
        return temp;
//		return cal.getTime(); 
    }

    //获取月度最后一天的日期格式yyyyMMdd
    public static String getLastDayOfMonth(String date) {
        Calendar cal = Calendar.getInstance();
        Date dates = null;
        try {
            dates = dateTimeNumber2.parse(date);
        } catch (ParseException e) {

        }
        cal.setTime(dates);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        cal.roll(Calendar.DAY_OF_MONTH, -1);

        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String temp = format.format(cal.getTime());
        return temp;
//			return cal.getTime(); 
    }

    //获取月度第一天的日期格式yyyyMMdd
    public static String getFirstDayOfMonth(String date) {
        Calendar cal = Calendar.getInstance();
        Date dates = null;
        try {
            dates = dateTimeNumber2.parse(date);
        } catch (ParseException e) {

        }
        cal.setTime(dates);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        cal.roll(Calendar.DAY_OF_MONTH, -1);

        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String temp = format.format(cal.getTime());

        return temp.substring(0, 6) + "01";
    }

    /**
     * 把格式为yyyy.MM.dd HH:mm:ss转换为Date.
     *
     * @param str
     * @return
     */
    public static Date parseDateTime2(String str) {
        Date date = null;
        try {
            str = str.replaceAll(".", "-");
            date = datetimeFormat.parse(str);
        } catch (ParseException ex) {

        }
        return date;
    }

    public static int datexj(String date1, String date2) {
        long day;
        Calendar cal = Calendar.getInstance();
        Date sdf;
        Date sdf1;
        try {
            sdf = new SimpleDateFormat("yyyy.MM.dd").parse(date1);
            sdf1 = new SimpleDateFormat("yyyy.MM.dd").parse(date2);
            cal.setTime(sdf);
            Date d1 = cal.getTime();
            cal.setTime(sdf1);
            Date d2 = cal.getTime();
            long daterange = d2.getTime() - d1.getTime();
            long time = 1000 * 3600 * 24;
            day = daterange / time;
            return (int) day;
        } catch (ParseException e) {
            logger.error("计算date2-date1两个日期相差天数 ", e);
            e.printStackTrace();
        }
        return 0;
    }

    /**
     * 获取周几
     *
     * @param date
     * @return
     */
    public static int getWeek(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(Calendar.DAY_OF_WEEK);
    }

    /**
     * 获取哪年
     *
     * @param date
     * @return
     */
    public static int getYear(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(Calendar.YEAR);
    }

    /**
     * 获取哪月
     *
     * @param date
     * @return
     */
    public static int getMonth(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(Calendar.MONTH) + 1;
    }

    /**
     * 获取当前小时
     *
     * @return
     */
    public static int getHour() {
        Calendar rightNow = Calendar.getInstance();
        int hour = rightNow.get(Calendar.HOUR_OF_DAY);
        return hour;
    }

    /**
     * 获取当前日期减去秒数的日期
     *
     * @param now 当前日期
     * @param i   需要减去的秒数（正数）
     * @return 减去后的日期
     */
    public static Date minusSecond(Date now, int i) {
        Date rtn = null;
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(now);
        cal.add(13, -i);
        rtn = cal.getTime();
        return rtn;
    }

    /**
     * 获取当前时间加天数（可正负）后的时间
     *
     * @param now 当前时间
     * @param i   天数（正负）
     * @return 时间
     */
    public static Date addDays(Date now, int i) {
        Date rtn = null;
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(now);
        cal.add(Calendar.DATE, i);
        rtn = cal.getTime();
        return rtn;
    }


    /**
     * 获取当前时间加月（可正负）后的时间
     *
     * @param now 当前时间
     * @param i   天数（正负）
     * @return 时间
     */
    public static Date addMonths(Date now, int i) {
        Date rtn = null;
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(now);
        cal.add(Calendar.MONTH, i);
        rtn = cal.getTime();
        return rtn;
    }

    /**
     * 获取当前时间加星期（可正负）后的时间
     *
     * @param now 当前时间
     * @param i   天数（正负）
     * @return 时间
     */
    public static Date addWeeks(Date now, int i) {
        Date rtn = null;
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(now);
        cal.add(Calendar.WEEK_OF_YEAR, i);
        rtn = cal.getTime();
        return rtn;
    }

    /**
     * 获取当前时间加年（可正负）后的时间
     *
     * @param now 当前时间
     * @param i   天数（正负）
     * @return 时间
     */
    public static Date addYears(Date now, int i) {
        Date rtn = null;
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(now);
        cal.add(Calendar.YEAR, i);
        rtn = cal.getTime();
        return rtn;
    }

    public static Date getLastDay(Date now) {
        Date rtn = null;
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(now);
        cal.set(cal.get(Calendar.YEAR), 11, 31);
        rtn = cal.getTime();
        return rtn;
    }

    /**
     * 获取某月的最后一天
     *
     * @throws
     * @Title:getLastDayOfMonth
     * @Description:
     * @param:@param year
     * @param:@param month
     * @param:@return
     * @return:String
     */
    public static String getLastDayOfMonth(int year, int month) {
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR, year);
        //设置月份
        cal.set(Calendar.MONTH, month - 1);
        //获取某月最大天数
        int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最大天数
        cal.set(Calendar.DAY_OF_MONTH, lastDay);
        //格式化日期
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String lastDayOfMonth = sdf.format(cal.getTime());

        return lastDayOfMonth;
    }


    public static List<Date> findDates(Date dBegin, Date dEnd) {
        List lDate = new ArrayList();
        Calendar calBegin = Calendar.getInstance();
        // 使用给定的 Date 设置此 Calendar 的时间
        calBegin.setTime(dBegin);
        Calendar calEnd = Calendar.getInstance();
        // 使用给定的 Date 设置此 Calendar 的时间
        calEnd.setTime(dEnd);
        // 测试此日期是否在指定日期之后
        while (dEnd.compareTo(calBegin.getTime()) >= 0) {
            lDate.add(calBegin.getTime());
            calBegin.add(Calendar.DAY_OF_MONTH, 1);
        }
        return lDate;
    }

    public static void main(String[] args) throws Exception {
        Calendar cal = Calendar.getInstance();
        String start = "2016-02-01";
        String end = "2016-03-02";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dBegin = sdf.parse(start);
        Date dEnd = sdf.parse(end);
        List<Date> lDate = findDates(dBegin, dEnd);
        for (Date date : lDate) {
            System.out.println(sdf.format(date));
        }
    }
}

