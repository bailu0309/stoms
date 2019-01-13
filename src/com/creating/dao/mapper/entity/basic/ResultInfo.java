package com.creating.dao.mapper.entity.basic;

/**
 * Created by bailu on 2017/9/13.
 */
public class ResultInfo {
    private boolean success;
    private String result;
    private String info;
    private String id;

    @Override
    public String toString() {
        return "{" +
                "success:" + success +
                ", result:'" + result + '\'' +
                ", info:'" + info + '\'' +
                ", id:'" + id + '\'' +
                '}';
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public static ResultInfo ok() {
        ResultInfo resultInfo = new ResultInfo();
        resultInfo.setSuccess(true);
        return resultInfo;

    }

}
