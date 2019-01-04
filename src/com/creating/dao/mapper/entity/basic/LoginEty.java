package com.creating.dao.mapper.entity.basic;

import java.io.Serializable;

/**
 * @Author mabailu
 * @Date 2017/12/28 14:48
 * @Description
 */
public class LoginEty implements Serializable {

    private String name;
    private String role;
    private String username;
    private String depid;
    private String depname;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
