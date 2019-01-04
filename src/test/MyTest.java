package test;

import com.creating.dao.mapper.basic.UserDao;
import com.creating.service.dictionary.DictionaryService;
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
import java.util.List;


@RunWith(value = SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:application-context.xml"}, loader = GenericXmlContextLoader.class)
public class MyTest {


  /*  @Autowired
    GoodsMapper mapper;

    @Test
    public void testDict() {
        List<Goods> ls = mapper.queryGoods(new Goods());

        System.out.println(ls);
    }
*/
}
