package test;

import com.creating.dao.base.BaseEntity;
import com.creating.dao.mapper.basic.UserDao;
import com.creating.dao.mapper.entity.basic.ResultInfo;
import com.creating.dao.mapper.entity.goods.*;
import com.creating.dao.mapper.goods.GoodsEtyMapper;
import com.creating.service.dictionary.DictionaryService;
import com.creating.service.goods.GoodsService;
import com.creating.util.Utils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockMultipartHttpServletRequest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.GenericXmlContextLoader;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Random;


@RunWith(value = SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:application-context.xml"}, loader = GenericXmlContextLoader.class)
public class MyTest {

    @Autowired
    GoodsService goodsService;

    @Autowired
    GoodsEtyMapper mapper;

    public void testDict() {
        List<GoodsEty> ls = mapper.queryGoods(new GoodsEty());

        System.out.println(ls);

        for (int i = 0; i < 10; i++) {
            String randomJianHan = Utils.getRandomJianHan(4);
            System.out.println(randomJianHan);
        }
    }


    //    @Test
    public void testSaveWareHouse() throws IOException {


        for (int i = 1; i < 10; i++) {
            WareHousesEty ety = new WareHousesEty();
            ety.setCode(i + "");
            ety.setName(i + "号仓库");
            ety.setPosition(Utils.getRandomJianHan(2));
            ety.setRemark(Utils.getRandomJianHan(4));
            goodsService.saveWareHouse(ety);
        }
    }

    //        @Test
    public void testSaveSup() throws IOException {

        for (int i = 1; i < 100; i++) {
            SuppliersEty ety = new SuppliersEty();
            ety.setCode(i + "");
            String name = Utils.getName();
            ety.setName(name + "商贸有限公司");
            ety.setLxr(name);
            ety.setLxdh(Utils.getTel());
            ety.setRemark(Utils.getRandomJianHan(4));
            goodsService.saveSupplier(ety);
        }
    }

    //    @Test
    public void testSaveWg() throws Exception {
        List<GoodsEty> gds = goodsService.queryGoods(new GoodsEty());
        List<WareHousesEty> whs = goodsService.queryWareHouses(new WareHousesEty());

        for (int i = 1; i < 100; i++) {
            Random random = new Random();
            int n = random.nextInt(gds.size());
            GoodsEty goodsEty = gds.get(n);
            int n1 = random.nextInt(whs.size());
            WareHousesEty wareHousesEty = whs.get(n1);


            WareHousesGoodsEty ety = new WareHousesGoodsEty();
            ety.setGid(goodsEty.getId());
            ety.setGcode(goodsEty.getCode());
            ety.setGname(goodsEty.getName());
            ety.setSid(goodsEty.getSid());
            ety.setScode(goodsEty.getScode());
            ety.setSname(goodsEty.getSname());
            ety.setWid(wareHousesEty.getId());
            ety.setWcode(wareHousesEty.getCode());
            ety.setWname(wareHousesEty.getName());
            ety.setAmount(goodsEty.getAmount() / 2);
            goodsService.saveWareHouseGoods(ety);
        }
    }


    @Test
    public void testInstore() throws Exception {
        List<SuppliersEty> sups = goodsService.querySuppliers(new SuppliersEty());
        List<GoodsEty> gds = goodsService.queryGoods(new GoodsEty());
        List<WareHousesGoodsEty> wareHousesGoodsEties = goodsService.queryWareHouseGoods(new WareHousesGoodsEty());

        for (int i = 1; i < 100; i++) {
            InstoreEty ety = new InstoreEty();
            ety.setCode(i + "");
            ety.setName("第" + i + "号入库单");
            ety.setIid(i);
            ety.setIname(Utils.getName());
            ety.setIntime(new Date());
            Random random = new Random();
            int n = random.nextInt(sups.size());
            SuppliersEty suppliersEty = sups.get(n);
            ety.setSid(suppliersEty.getId());
            ety.setScode(suppliersEty.getCode());
            ety.setSname(suppliersEty.getName());
            ResultInfo s = goodsService.saveInstore(ety);
            Integer id = Integer.valueOf(s.getInfo());

            Random r1 = new Random();
            int v = r1.nextInt(10);

            for (int i1 = 0; i1 < v; i1++) {

                Random rx = new Random();
                int gv = rx.nextInt(wareHousesGoodsEties.size());
                WareHousesGoodsEty goodsEty = wareHousesGoodsEties.get(gv);
                InstoreItemsEty itemsEty = new InstoreItemsEty();
                itemsEty.setInid(id);
                itemsEty.setIncode(ety.getCode());
                itemsEty.setInname(ety.getName());
                itemsEty.setGid(goodsEty.getGid());
                itemsEty.setGcode(goodsEty.getGcode());
                itemsEty.setGname(goodsEty.getGname());
                itemsEty.setSid(goodsEty.getSid());
                itemsEty.setScode(goodsEty.getScode());
                itemsEty.setSname(goodsEty.getSname());
                itemsEty.setWcode(goodsEty.getWcode());
                itemsEty.setWid(goodsEty.getWid());
                itemsEty.setWname(goodsEty.getWname());
                itemsEty.setAmount(goodsEty.getAmount() / 2);
                goodsService.saveInstoreItems(itemsEty);

            }

        }
    }


    @Test
    public void testRecieve() throws Exception {
        List<SuppliersEty> sups = goodsService.querySuppliers(new SuppliersEty());
        List<WareHousesGoodsEty> wareHousesGoodsEties = goodsService.queryWareHouseGoods(new WareHousesGoodsEty());

        for (int i = 1; i < 100; i++) {
            RecieveEty ety = new RecieveEty();
            ety.setName("第" + i + "号出库单");
            ety.setOutnumber(i + "");
            ety.setRecid(i + "");
            ety.setRecname(Utils.getName());
            ety.setRectime(new Date());
            ety.setOuttype(i % 2 + "");
            ety.setOutid(i % 2 + "");
            int id = goodsService.saveRecieve(ety);


            Random r1 = new Random();
            int v = r1.nextInt(10);

            for (int i1 = 0; i1 < v; i1++) {

                Random rx = new Random();
                int gv = rx.nextInt(wareHousesGoodsEties.size());
                WareHousesGoodsEty goodsEty = wareHousesGoodsEties.get(gv);
                RecieveItemsEty itemsEty = new RecieveItemsEty();
                itemsEty.setRid(id);
                itemsEty.setRcode(ety.getOutnumber());
                itemsEty.setRname(ety.getName());
                itemsEty.setGid(goodsEty.getGid());
                itemsEty.setGcode(goodsEty.getGcode());
                itemsEty.setGname(goodsEty.getGname());
                itemsEty.setSid(goodsEty.getSid());
                itemsEty.setScode(goodsEty.getScode());
                itemsEty.setSname(goodsEty.getSname());
                itemsEty.setWcode(goodsEty.getWcode());
                itemsEty.setWid(goodsEty.getWid());
                itemsEty.setWname(goodsEty.getWname());
                itemsEty.setAmount(goodsEty.getAmount() / 2);
                goodsService.saveRecieveItems(itemsEty);

            }

        }
    }
}
