package com.creating.dao.mapper.basic;

import com.creating.dao.base.BaseDao;
import com.creating.dao.mapper.entity.basic.DqbmEty;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DqbmDao extends BaseDao<DqbmEty> {

    /**
     * 县区
     *
     * @param tdEty
     * @return
     */
    public List<DqbmEty> listXq(DqbmEty tdEty);

    /**
     * 乡镇街道
     *
     * @param tdEty
     * @return
     */
    public List<DqbmEty> listXzjd(DqbmEty tdEty);

    /**
     * 村居委会社区
     *
     * @param tdEty
     * @return
     */
    public List<DqbmEty> listCjs(DqbmEty tdEty);

    List<DqbmEty> listCity(DqbmEty tdEty);
}
