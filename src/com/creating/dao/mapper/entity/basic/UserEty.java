package com.creating.dao.mapper.entity.basic;

import com.creating.dao.base.BaseEntity;

import java.util.Date;

public class UserEty extends BaseEntity {

    private RoleEty roleEty;

    private Integer id;
    private Integer group_id;
    private String name;
    private String password;
    private Date insert_date;
    private String status;// 1 可用 0不可用
    private String username;
    private String qccid;

    private String roleids;
    private String rolenames;
    private String depid;
    private String depname;
    private String mtype;
    private String muserid;
    private String musername;
    private String contactname;
    private String email;
    private String tel;

    public String getQccid() {
        return qccid;
    }

    public void setQccid(String qccid) {
        this.qccid = qccid;
    }

    public String getContactname() {
        return contactname;
    }

    public void setContactname(String contactname) {
        this.contactname = contactname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public RoleEty getRoleEty() {
        return roleEty;
    }

    public void setRoleEty(RoleEty roleEty) {
        this.roleEty = roleEty;
    }

    public String getMtype() {
        return mtype;
    }

    public void setMtype(String mtype) {
        this.mtype = mtype;
    }

    public String getMuserid() {
        return muserid;
    }

    public void setMuserid(String muserid) {
        this.muserid = muserid;
    }

    public String getMusername() {
        return musername;
    }

    public void setMusername(String musername) {
        this.musername = musername;
    }

    public String getRolenames() {
        return rolenames;
    }

    public void setRolenames(String rolenames) {
        this.rolenames = rolenames;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getGroup_id() {
        return group_id;
    }

    public void setGroup_id(Integer group_id) {
        this.group_id = group_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getInsert_date() {
        return insert_date;
    }

    public void setInsert_date(Date insert_date) {
        this.insert_date = insert_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoleids() {
        return roleids;
    }

    public void setRoleids(String roleids) {
        this.roleids = roleids;
    }

    public String getDepid() {
        return depid;
    }

    public void setDepid(String depid) {
        this.depid = depid;
    }

    public String getDepname() {
        return depname;
    }

    public void setDepname(String depname) {
        this.depname = depname;
    }
}
