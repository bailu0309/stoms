package com.creating.dao.mapper.entity.basic;

import com.creating.dao.base.BaseEntity;

import java.util.List;

public class OffimEty extends BaseEntity {

	
	private String fid;
	private String fdesc;
	private String fqun;
	private String fqun2;
	private String ftype;
	private String fst;
	private String fseq;
	private String icon;//图标地址
	private String openIcon;//大图标地址
	private boolean leaf;//是否为子节点
	private List<OffimEty> children;//子节点
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getOpenIcon() {
		return openIcon;
	}
	public void setOpenIcon(String openIcon) {
		this.openIcon = openIcon;
	}
	public String getFid() {
		return fid;
	}
	public void setFid(String fid) {
		this.fid = fid;
	}
	public String getFdesc() {
		return fdesc;
	}
	public void setFdesc(String fdesc) {
		this.fdesc = fdesc;
	}
	public String getFqun() {
		return fqun;
	}
	public void setFqun(String fqun) {
		this.fqun = fqun;
	}
	public String getFqun2() {
		return fqun2;
	}
	public void setFqun2(String fqun2) {
		this.fqun2 = fqun2;
	}
	public String getFtype() {
		return ftype;
	}
	public void setFtype(String ftype) {
		this.ftype = ftype;
	}
	public String getFst() {
		return fst;
	}
	public void setFst(String fst) {
		this.fst = fst;
	}
	public String getFseq() {
		return fseq;
	}
	public void setFseq(String fseq) {
		this.fseq = fseq;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public List<OffimEty> getChildren() {
		return children;
	}
	public void setChildren(List<OffimEty> children) {
		this.children = children;
	}
	
	
	
	
}
