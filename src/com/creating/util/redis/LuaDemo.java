package com.creating.util.redis;

import redis.clients.jedis.Jedis;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author mabailu
 * @Date 2018/1/3 15:13
 * @Description
 */
public class LuaDemo {

    public static void main(String[] args) throws Exception {

        Jedis jedis = RedisUtil.getJedis();

        String lua = "local num=redis.call('incr',KEYS[1])\n" +
                "if tonumber(num)==1 then\n" +
                "   redis.call('expire',KEYS[1],ARGV[1])\n" +
                "   return 1\n" +
                "elseif tonumber(num)>tonumber(ARGV[2]) then\n" +
                "   return 0\n" +
                "else\n" +
                "   return 1\n" +
                "end";
        List<String> keys = new ArrayList<>();
        keys.add("phone:limit:177,,,");
        //  String sha=jedis.scriptLoad(lua);
        //   System.out.println(sha);
        List<String> arggs = new ArrayList<>();
        arggs.add("6000");
        arggs.add("10");
        Object obj = jedis.evalsha("8a8ee74e246c39d3ac49ddfc938fa2942c56e087", keys, arggs);
        System.out.println(obj);
    }

}
