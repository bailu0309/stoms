package com.creating.dao.mapper.entity.basic;

import com.creating.dao.base.BaseEntity;

public class DqbmEty extends BaseEntity {

	
	private String area_short;
	private String area_code;
	private String area_full;
	private String qun;
	private String communitycode;
	private String communityname;
	private String citytag;
	private String administrative;
	private String fst;

	public String getFst() {
		return fst;
	}

	public void setFst(String fst) {
		this.fst = fst;
	}

	public String getArea_short() {
		return area_short;
	}
	public void setArea_short(String area_short) {
		this.area_short = area_short;
	}
	public String getArea_code() {
		return area_code;
	}
	public void setArea_code(String area_code) {
		this.area_code = area_code;
	}
	public String getArea_full() {
		return area_full;
	}
	public void setArea_full(String area_full) {
		this.area_full = area_full;
	}
	public String getQun() {
		return qun;
	}
	public void setQun(String qun) {
		this.qun = qun;
	}
	public String getCommunitycode() {
		return communitycode;
	}
	public void setCommunitycode(String communitycode) {
		this.communitycode = communitycode;
	}
	public String getCommunityname() {
		return communityname;
	}
	public void setCommunityname(String communityname) {
		this.communityname = communityname;
	}
	public String getCitytag() {
		return citytag;
	}
	public void setCitytag(String citytag) {
		this.citytag = citytag;
	}
	public String getAdministrative() {
		return administrative;
	}
	public void setAdministrative(String administrative) {
		this.administrative = administrative;
	}
}
