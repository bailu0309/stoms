package com.creating.controller.basic;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.beans.propertyeditors.CustomNumberEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.support.ByteArrayMultipartFileEditor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;


@Controller
@RequestMapping(value = "/PreviewController/")
public class PreviewController {


    @InitBinder
    public void initBibder(WebDataBinder binder) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        df.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(df, true));
        binder.registerCustomEditor(byte[].class, new ByteArrayMultipartFileEditor());
        binder.registerCustomEditor(Integer.class, null, new CustomNumberEditor(Integer.class, null, true));
        binder.registerCustomEditor(Long.class, null, new CustomNumberEditor(Long.class, null, true));
        binder.registerCustomEditor(Double.class, null, new CustomNumberEditor(Double.class, null, true));
    }


    @RequestMapping(value = "/getimage", method = RequestMethod.GET)
    public String getImage(HttpServletRequest request, HttpServletResponse response, String picName) throws Exception {
        FileInputStream hFile = null;
        OutputStream toClient = null;
        if (StringUtils.isNotEmpty(picName)) {
            try {
                hFile = new FileInputStream(picName); // 以byte流的方式打开文件

                int i = hFile.available(); // 得到文件大小
                byte data[] = new byte[i];
                hFile.read(data); // 读数据
                response.setContentType("image/*"); // 设置返回的文件类型
                toClient = response.getOutputStream(); // 得到向客户端输出二进制数据的对象
                toClient.write(data); // 输出数据
                toClient.flush();
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (null != toClient) {
                    toClient.close();
                }
                if (null != hFile) {
                    hFile.close();
                }
            }
        }
        return null;
    }


    @RequestMapping(value = "priviewPDF.sdo")
    public
    @ResponseBody
    void priviewPDF(HttpServletRequest request, HttpServletResponse response, String fileadd) throws Exception {

        FileInputStream hFile = null;
        OutputStream toClient = null;
        if (StringUtils.isNotEmpty(fileadd)) {
            try {
                hFile = new FileInputStream(fileadd); // 以byte流的方式打开文件

                int i = hFile.available(); // 得到文件大小
                byte data[] = new byte[i];
                hFile.read(data); // 读数据
                response.setContentType("pdf/*"); // 设置返回的文件类型
                toClient = response.getOutputStream(); // 得到向客户端输出二进制数据的对象
                toClient.write(data); // 输出数据
                toClient.flush();
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (null != toClient) {
                    toClient.close();
                }
                if (null != hFile) {
                    hFile.close();
                }
            }
        }

    }
}
