package com.creating.dao.mapper.basic;

import com.creating.dao.base.BaseDao;
import com.creating.dao.mapper.entity.basic.DepartEty;
import com.creating.dao.mapper.entity.basic.TreeNodeEty;
import com.creating.dao.mapper.entity.goods.GoodsEty;

import java.util.List;

public interface DepartDao extends BaseDao<DepartEty> {

    List<DepartEty> queryDepartOrder(DepartEty departEty);


    List queryDept4Pad();

    List<TreeNodeEty> queryDepart4Task(TreeNodeEty departEty);

    List<TreeNodeEty> queryDepartTree4SelfEval(TreeNodeEty departEty);

    List<TreeNodeEty> queryUserByDepart4Task(TreeNodeEty treeNodeEty);

    List<GoodsEty> queryAllGoods(GoodsEty goodsEty);
}


