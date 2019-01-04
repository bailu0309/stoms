package com.creating.util.md;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Java标准包的MD5加密，返回的a-f是小�?
 */
public class JavaMD5 {

    /**
     * Java标准包的MD5加密，长度为32位字符串，返回的a-f是小�?
     */
    public static String getMD5ofStr(String inStr) {
        if (inStr == null) {
            inStr = "";
        }
        MessageDigest md = null;
        String outStr = null;
        try {
            md = MessageDigest.getInstance("MD5");        //可以选中其他的算法如SHA
            byte[] digest = md.digest(inStr.getBytes());//返回的是byet[]，要转化为String存储比较方便
            outStr = bytetoString(digest);
        } catch (NoSuchAlgorithmException nsae) {
            nsae.printStackTrace();
        }
        return outStr;
    }

    /**
     * Java标准包的MD5加密，长度为32位字符串，返回的a-f是大�?
     */
    public static String getUpperMD5ofStr(String inStr) {
        return getMD5ofStr(inStr).toUpperCase();
    }

    public static String bytetoString(byte[] digest) {
        String str = "";
        String tempStr = "";
        for (int i = 0; i < digest.length; i++) {
            tempStr = (Integer.toHexString(digest[i] & 0xff));
            if (tempStr.length() == 1) {
                str = str + "0" + tempStr;
            } else {
                str = str + tempStr;
            }
        }
        return str;
    }


    public static void main(String args[]) {
        System.out.println("MD5=" + JavaMD5.getUpperMD5ofStr("admin"));
        System.out.println("MD5.length()=" + JavaMD5.getUpperMD5ofStr("").length());
    }

}