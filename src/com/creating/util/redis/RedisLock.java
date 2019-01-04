package com.creating.util.redis;

import com.creating.util.Utils;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;

import java.util.List;

/**
 * @Author mabailu
 * @Date 2018/1/3 14:44
 * @Description
 */
public class RedisLock {
    public String getLock(String key, int timeout) {
        try {
            Jedis jedis = RedisUtil.getJedis();
            String value = Utils.getUUID(); //UUID
            long end = System.currentTimeMillis() + timeout;
            while (System.currentTimeMillis() < end) {//阻塞
                if (jedis.setnx(key, value) == 1) {
                    jedis.expire(key, timeout);
                    //锁设置成功，redis操作成功
                    return value;
                }
                if (jedis.ttl(key) == -1) { //检测过期时间
                    jedis.expire(key, timeout);
                }
                Thread.sleep(1000);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean releaseLock(String key, String value) {
        try {
            Jedis jedis = RedisUtil.getJedis();
            while (true) {
                jedis.watch(key);  //watch
                if (value.equals(jedis.get(key))) { //判断获得锁的线程和当前redis中存的锁是同一个
                    Transaction transaction = jedis.multi();
                    transaction.del(key);
                    List<Object> list = transaction.exec();
                    if (list == null) {
                        continue;
                    }
                    return true;
                }
                jedis.unwatch();
                break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public static void main(String[] args) {
        RedisLock redisLock = new RedisLock();
        String lockId = redisLock.getLock("lock:aaa", 10000);
        if (null != lockId) {
            System.out.println("获得锁成功");
        }
        //   System.out.println("失败");

        String l = redisLock.getLock("lock:aaa", 10000);
        System.out.println(l);
    }

}
