package com.creating.controller.dictionary;

import com.creating.constants.ConfigConstants;
import com.creating.constants.StringConstants;
import com.creating.dao.mapper.dictionary.DictionaryItemDao;
import com.creating.dao.mapper.dictionary.DictionaryTypeDao;
import com.creating.dao.mapper.entity.dictionary.DictionaryItem;
import com.creating.dao.mapper.entity.dictionary.DictionaryType;
import com.creating.service.dictionary.DictionaryService;
import com.creating.util.json.JSONGrid;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * @Author mabailu
 * @Date 2018/5/9 14:19
 * @Description 字典表控制层
 */
@Controller
@RequestMapping(value = "/DictionaryController/")
public class DictionaryController {

    @Autowired
    DictionaryService dictionaryService;
    @Autowired
    DictionaryTypeDao dictionaryTypeDao;
    @Autowired
    DictionaryItemDao dictionaryItemDao;

    /**
     * 查询字典类型
     */
    @RequestMapping(value = "queryDictionaryType.sdo")
    public
    @ResponseBody
    String queryDictionaryType(HttpServletRequest request, HttpServletResponse response, DictionaryType dt) throws Exception {
        List<DictionaryType> list = dictionaryTypeDao.selectDictionaryType(dt);
        JSONObject retObj = JSONGrid.toJSon(list);
        return retObj.toString();
    }


    @RequestMapping(value = "queryDict.sdo")
    public
    @ResponseBody
    String queryDict(HttpServletRequest request, HttpServletResponse response, DictionaryType dt) throws Exception {

        List ls = dictionaryService.queryDict();

        JSONObject retObj = JSONGrid.toJSon(ls, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }

    /**
     * 查询字典项
     */
    @RequestMapping(value = "queryDictionaryItem.sdo")
    public
    @ResponseBody
    String queryDictionaryItem(HttpServletRequest request, HttpServletResponse response, DictionaryItem di) throws Exception {
        int count = dictionaryItemDao.selectDictionaryItemCount(di);
        List<DictionaryItem> list = dictionaryItemDao.selectDictionaryItem(di);
        JSONObject retObj = JSONGrid.toJSon(list, count, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }

    /**
     * 新增/更新字典类型
     */
    @RequestMapping(value = "saveDictionaryType.sdo", method = RequestMethod.POST)
    public @ResponseBody
    String saveDictionaryType(HttpServletRequest request, HttpServletResponse response, DictionaryType dt) throws Exception {
        JSONObject obj = new JSONObject();
        if (StringUtils.isNotEmpty(dt.getFid())) {
            dictionaryService.modifyDictionayType(dt);
        } else {
            dictionaryService.addDictionayType(dt);
        }
        obj.put(StringConstants.SUCCESS, true);
        obj.put(StringConstants.RESULT, StringConstants.SUCCESS);
        obj.put(StringConstants.INFO, "保存成功");
        return obj.toString();
    }

    /**
     * 删除字典类型
     */
    @RequestMapping(value = "deleteDictionaryType.sdo", method = RequestMethod.POST)
    public @ResponseBody
    String deleteDictionaryType(HttpServletRequest request, HttpServletResponse response, DictionaryType dt) throws Exception {
        JSONObject obj = new JSONObject();
        dictionaryService.removeDictionayType(dt);
        obj.put(StringConstants.SUCCESS, true);
        obj.put(StringConstants.RESULT, StringConstants.SUCCESS);
        obj.put(StringConstants.INFO, "删除成功");
        return obj.toString();
    }

    /***********************************字典项操作***************************************************/
    /**
     * 新增/更新字典项
     */
    @RequestMapping(value = "saveDictionaryItem.sdo", method = RequestMethod.POST)
    public @ResponseBody
    String saveDictionaryItem(HttpServletRequest request, HttpServletResponse response, DictionaryItem di) throws Exception {
        JSONObject obj = new JSONObject();
        if (StringUtils.isNotEmpty(di.getFid())) {
            dictionaryService.modifyDictionayItem(di);
        } else {
            dictionaryService.addDictionayItem(di);
        }
        obj.put(StringConstants.SUCCESS, true);
        obj.put(StringConstants.RESULT, StringConstants.SUCCESS);
        obj.put(StringConstants.INFO, "保存成功");
        return obj.toString();
    }

    /**
     * 删除字典项
     */
    @RequestMapping(value = "deleteDictionaryItem.sdo", method = RequestMethod.POST)
    public @ResponseBody
    String deleteDictionaryItem(HttpServletRequest request, HttpServletResponse response, DictionaryItem di) throws Exception {
        JSONObject obj = new JSONObject();
        dictionaryService.removeDictionayItem(di);
        obj.put(StringConstants.SUCCESS, true);
        obj.put(StringConstants.RESULT, StringConstants.SUCCESS);
        obj.put(StringConstants.INFO, "删除成功");
        return obj.toString();
    }

}
