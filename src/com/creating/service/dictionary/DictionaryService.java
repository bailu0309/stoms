package com.creating.service.dictionary;

import com.creating.dao.mapper.dictionary.DictionaryItemDao;
import com.creating.dao.mapper.dictionary.DictionaryTypeDao;
import com.creating.dao.mapper.entity.dictionary.DictionaryItem;
import com.creating.dao.mapper.entity.dictionary.DictionaryType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.*;

/**
 * @Author mabailu
 * @Date 2018/5/9 14:21
 * @Description
 */

@Service
public class DictionaryService {

    @Autowired
    DictionaryTypeDao dictionaryTypeDao;
    @Autowired
    DictionaryItemDao dictionaryItemDao;

    public List<Map<String, Map>> queryDict() {
        List<Map<String, Map>> ls = new ArrayList();

        List<Map> items = dictionaryItemDao.queryAllDictItems();
        Map<String, Map> dict = new LinkedHashMap<>();
        String temp = "";
        Map tempMap = new LinkedHashMap();
        int i = 0;
        for (Map item : items) {
            String typeid = (String) item.get("typeid");
            if (i == 0) {
                temp = typeid;
            }
            if (!temp.equals(typeid)) {
                dict.put(temp, tempMap);
                temp = typeid;
                tempMap = new LinkedHashMap();
            }
            tempMap.put(item.get("code"), item.get("text"));

            i++;
        }
        ls.add(dict);
        return ls;
    }

    /**
     * 新增字典类型
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void addDictionayType(DictionaryType dt) throws IOException {
        dictionaryTypeDao.insertDictionaryType(dt);
    }

    /**
     * 更新字典类型
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void modifyDictionayType(DictionaryType dt) throws IOException {
        dictionaryTypeDao.updateDictionaryType(dt);
    }

    /**
     * 删除字典类型
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void removeDictionayType(DictionaryType dt) throws IOException {
        dictionaryTypeDao.deleteDictionaryType(dt);
    }

    /************************************字典项维护***************************************************/
    /**
     * 新增字典项
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void addDictionayItem(DictionaryItem di) throws IOException {
        dictionaryItemDao.insertDictionaryItem(di);
    }

    /**
     * 更新字典项
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void modifyDictionayItem(DictionaryItem di) throws IOException {
        dictionaryItemDao.updateDictionaryItem(di);
    }

    /**
     * 删除字典项
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void removeDictionayItem(DictionaryItem di) throws IOException {
        dictionaryItemDao.deleteDictionaryItem(di);
    }

}
