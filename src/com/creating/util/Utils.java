package com.creating.util;

import com.creating.constants.RoleType;
import com.creating.util.json.SessionEntity;
import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;
import java.util.UUID;
import java.util.regex.Pattern;

/**
 * @Author mabailu
 * @Date 2018/5/8 17:32
 * @Description
 */
public class Utils {
    /**
     * 获得32位uuid
     *
     * @return 返回32的uuid
     */
    public static String getUUID() {
        String uuid = "";
        uuid = UUID.randomUUID().toString().replaceAll("-", "");
        return uuid;
    }


    public static boolean isAdmin(HttpServletRequest request) {
        if (Objects.equals(SessionEntity.getRole(request), RoleType.ADMIN.getValue()) || Objects.equals(SessionEntity.getRole(request), RoleType.PROVQC.getValue())) {
            return true;
        }
        return false;
    }

    public static boolean isProvince(HttpServletRequest request) {
        if (Objects.equals(SessionEntity.getRole(request), RoleType.PROVQC.getValue())) {
            return true;
        }
        return false;
    }


    public static boolean isCity(HttpServletRequest request) {
        if (Objects.equals(SessionEntity.getRole(request), RoleType.CITYQC.getValue())) {
            return true;
        }
        return false;
    }

    public static boolean isHospital(HttpServletRequest request) {
        if (Objects.equals(SessionEntity.getRole(request), RoleType.HOSPITAL.getValue())) {
            return true;
        }
        return false;
    }

    public static boolean isDecimal(String str) {
        if (null == str || "".equals(str)) {
            return false;
        }
        Pattern p = Pattern.compile("^(\\-|\\+)?\\d+(\\.\\d+)?$");

        return p.matcher(str).matches();
    }

    public static boolean isWholenumber(String str) {
        if (null == str || "".equals(str)) {
            return false;
        }
        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");

        return pattern.matcher(str).matches();
    }


    public static boolean isDouble(String str) {
        boolean bCheckResult;
        if (StringUtils.isEmpty(str)) {
            return false;
        }
        try {
            Double dCheckValue = Double.parseDouble(str);
            bCheckResult = dCheckValue instanceof Double;
        } catch (NumberFormatException e) {
            bCheckResult = false;
        }
        return bCheckResult;
    }

    public static boolean isInteger(String str) {
        boolean bCheckResult;
        if (StringUtils.isEmpty(str)) {
            return false;
        }
        try {
            Integer iCheckValue = Integer.parseInt(str);
            bCheckResult = iCheckValue instanceof Integer;
        } catch (NumberFormatException e) {
            bCheckResult = false;
        }
        return bCheckResult;
    }

}
