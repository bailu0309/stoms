package com.creating.service.basic;

import com.creating.dao.mapper.basic.DepartDao;
import com.creating.dao.mapper.entity.basic.TreeNodeEty;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author mabailu
 * @Date 2018/2/26 14:22
 * @Description
 */
@Service
public class DepartService {

    @Autowired
    private DepartDao departDao;

    public JSONArray queryDepartTree4Task(TreeNodeEty treeNodeEty) throws InterruptedException {
        JSONArray jsonArray = new JSONArray();
        List<TreeNodeEty> ls = departDao.queryDepart4Task(treeNodeEty);

        for (TreeNodeEty tree : ls) {
            tree.setPersonid(treeNodeEty.getPersonid());
            List<TreeNodeEty> ls1 = departDao.queryUserByDepart4Task(tree);
            if (ls1 != null && ls1.size() > 0) {
                tree.setLeaf(false);
                tree.setChildren(ls1);
            }
            jsonArray.add(tree);
        }
        return jsonArray;

       /* ThreadPoolExecutor executor = new ThreadPoolExecutor(4, 10, 200, TimeUnit.MILLISECONDS,
                new ArrayBlockingQueue<>(5));

        int i = 0;
        for (TreeNodeEty tree : ls) {
            i++;
            int finalI = i;
            executor.execute(() -> {
                TimeCostUtils.begin();
                List<TreeNodeEty> ls1 = departDao.queryUserByDepart4Task(tree);
                System.out.println(ls1);
                if (ls1 != null && ls1.size() > 0) {
                    tree.setLeaf(false);
                    tree.setChildren(ls1);
                }
                synchronized (jsonArray) {
                    jsonArray.add(tree);
                }
                System.out.println("线程" + finalI + "耗时：" + TimeCostUtils.end());
            });
        }
        while (true) {
            if (executor.getActiveCount() < 1) {
                executor.shutdown();
                return jsonArray;
            } else {
                Thread.sleep(50);
            }
        }*/
    }

    public JSONArray queryDepartTree4SelfEval(TreeNodeEty treeNodeEty) throws InterruptedException {
        JSONArray jsonArray = new JSONArray();
        List<TreeNodeEty> ls = departDao.queryDepartTree4SelfEval(treeNodeEty);

        for (TreeNodeEty tree : ls) {
            tree.setLeaf(true);
            jsonArray.add(tree);
        }
        return jsonArray;


    }
}
