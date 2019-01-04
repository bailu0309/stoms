package com.creating.dao.mapper.basic;

import java.util.List;

import com.creating.dao.base.BaseDao;
import com.creating.dao.mapper.entity.basic.BaseData;

public interface BaseDataDao extends BaseDao<BaseData>{

	public List<BaseData> getBaseDataListByType(BaseData baseData);

}
