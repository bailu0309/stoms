package com.creating.constants;

/**
 * 护理数据统计
 */
public enum NurseDataStatisType {


    QYCHB("全院床护比", "1"),
    BQCHB("病区床护比", "2"),
    BBHHB("白班护患比", "3"),
    YBHHB("夜班护换比", "4"),
    HLSS("护理时数", "5"),
    DNGFJHBGL("导尿管非计划拔管率", "6"),
    WGFJHBGFSL("胃管非计划拔管发生率", "7"),
    ZXDGFJHBGFSL("中心导管非计划拔管发生率", "8"),
    QGDGFJHBGFSL("气管导管非计划拔管发生率", "9"),
    VAP("呼吸机相关性肺炎发生率VAP", "10"),
    CRBSI("中心导管相关血流感染发生率CRBSI", "11"),
    DNGXGXGRFSL("导尿管相关性感染发生率", "12"),
    YNYCFSL("院内压疮发生率", "13"),
    EQJYSYNYCFSL("二期及以上院内压疮发生率", "14"),
    ZYHZDDFSL("住院患者跌倒发生率", "15"),
    ZYHZDDSHL("住院患者跌倒伤害率", "16"),
    DDSHDJBL("跌倒伤害等级比例", "17"),
    ZCZB("职称占比", "18"),
    XLZB("学历占比", "19"),
    GZNXZB("工作年限占比", "20"),
    ZCLZZB("职称离职占比", "21"),
    XLLZZB("学历离职占比", "22");

    private String name;
    private String value;

    NurseDataStatisType(String name, String value) {
        this.name = name;
        this.value = value;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
