package com.creating.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * @Author mabailu
 * @Date 2018/5/10 14:29
 * @Description 文件操作工具类
 */
public class FileUtils {


    public static void savFile(String path, MultipartFile multipartFile) throws IOException {
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
        multipartFile.transferTo(file);
    }

}
