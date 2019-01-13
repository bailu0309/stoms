package com.creating.dao.base;

public class BaseEntity {

    private Integer limit;//显示记录数
    private Integer start;//开始
    private Integer page;//当前页数
    private String sort;//排序列
    private String dir;//排序方式 ASC DESC
    private String sdate;
    private String edate;
    private String startdate;
    private String enddate;
    private Integer sval;
    private Integer eval;
    private String qv;

    public String getQv() {
        return qv;
    }

    public void setQv(String qv) {
        this.qv = qv;
    }

    public Integer getSval() {
        return sval;
    }

    public void setSval(Integer sval) {
        this.sval = sval;
    }

    public Integer getEval() {
        return eval;
    }

    public void setEval(Integer eval) {
        this.eval = eval;
    }

    public String getStartdate() {
        return startdate;
    }

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

    public String getEnddate() {
        return enddate;
    }

    public void setEnddate(String enddate) {
        this.enddate = enddate;
    }

    public String getSdate() {
        return sdate;
    }

    public void setSdate(String sdate) {
        this.sdate = sdate;
    }

    public String getEdate() {
        return edate;
    }

    public void setEdate(String edate) {
        this.edate = edate;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getDir() {
        return dir;
    }

    public void setDir(String dir) {
        this.dir = dir;
    }


}
