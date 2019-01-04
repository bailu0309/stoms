package com.creating.util.export;

import com.creating.util.json.DateUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.CellRangeAddress;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExportExcelUtils {
    /**
     * 多行表头
     * dataList：导出的数据；sheetName：表头名称； head0：表头第一行列名；headnum0：第一行合并单元格的参数
     * head1：表头第二行列名；headnum1：第二行合并单元格的参数；detail：导出的表体字段
     */
    public void exportMergeXls(HttpServletRequest request, HttpServletResponse response, List<Map> dataList,
                               String sheetName, String[] head0, String[] headnum0,
                               String[] head1, String[] headnum1, String[] detail, int[] width) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(sheetName);// 创建一个表
        // 表头标题样式
        HSSFFont headfont = workbook.createFont();
        headfont.setFontName("宋体");
        headfont.setFontHeightInPoints((short) 22);// 字体大小
        HSSFCellStyle headstyle = workbook.createCellStyle();
        headstyle.setFont(headfont);
        headstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        headstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        headstyle.setLocked(true);
        // 表头时间样式
        HSSFFont datefont = workbook.createFont();
        datefont.setFontName("宋体");
        datefont.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle datestyle = workbook.createCellStyle();
        datestyle.setFont(datefont);
        datestyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        datestyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        datestyle.setLocked(true);
        // 列名样式
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle style = workbook.createCellStyle();
//        style.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style.setFont(font);
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        style.setLocked(true);
        // 普通单元格样式（中文）
        HSSFFont font2 = workbook.createFont();
        font2.setFontName("宋体");
        font2.setFontHeightInPoints((short) 12);
        HSSFCellStyle style2 = workbook.createCellStyle();
//        style2.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style2.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style2.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style2.setFont(font2);
        style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style2.setWrapText(true); // 换行
        style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中

        for (int k = 0; k < detail.length; k++) {
            // 设置列宽  （第几列，宽度）
//            for (int i = 0; i < width.length; i++) {
            if (width.length > k) {
                sheet.setColumnWidth(k, width[k] * 1000);
            } else {
                sheet.setColumnWidth(k, 3000);
            }
//            }
        }
        sheet.setDefaultRowHeight((short) 360);//设置行高
        // 第一行表头标题
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, detail.length - 1));
        HSSFRow row = sheet.createRow(0);
        row.setHeight((short) 0x349);
        HSSFCell cell = row.createCell(0);
        cell.setCellStyle(headstyle);
        CellUtil.setCellValue(cell, sheetName);
        // 第二行表头列名
        row = sheet.createRow(1);
        for (int i = 0; i < head0.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(head0[i]);
            cell.setCellStyle(style);
        }
        //动态合并单元格
        for (int i = 0; i < headnum0.length; i++) {
            mergeRegion(headnum0[i], sheet);
        }
        //设置合并单元格的参数并初始化带边框的表头（这样做可以避免因为合并单元格后有的单元格的边框显示不出来）
        row = sheet.createRow(2); //因为下标从0开始，所以这里表示的是excel中的第四行
        for (int i = 0; i < head1.length; i++) {
            cell = row.createCell(i);
            cell.setCellStyle(style);
            cell.setCellValue(head1[i]);
        }
        //动态合并单元格
        for (int i = 0; i < headnum1.length; i++) {
            mergeRegion(headnum1[i], sheet);
        }
        // 设置列值-内容
        for (int i = 0; i < dataList.size(); i++) {
            row = sheet.createRow(i + 3);
            for (int j = 0; j < detail.length; j++) {
                Map tempmap = (HashMap) dataList.get(i);
                Object data = tempmap.get(detail[j]);
                cell = row.createCell(j);
                cell.setCellStyle(style2);
                cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                CellUtil.setCellValue(cell, data);
            }
        }
        String fileName = new String(sheetName.getBytes("gb2312"), "ISO8859-1");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        response.setContentType("application/x-download;charset=utf-8");
        response.addHeader("Content-Disposition", "attachment;filename=" + fileName + ".xls");
        OutputStream os = response.getOutputStream();
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        byte[] b = new byte[1024];
        while ((bais.read(b)) > 0) {
            os.write(b);
        }
        bais.close();
        os.flush();
        os.close();
    }

    private void mergeRegion(String s, HSSFSheet sheet) {
        String[] temp = s.split(",");
        Integer startrow = Integer.parseInt(temp[0]);
        Integer overrow = Integer.parseInt(temp[1]);
        Integer startcol = Integer.parseInt(temp[2]);
        Integer overcol = Integer.parseInt(temp[3]);
        sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
    }


    /**
     * 多行表头
     * dataList：导出的数据；sheetName：表头名称； head0：表头第一行列名；headnum0：第一行合并单元格的参数
     * head1：表头第二行列名；headnum1：第二行合并单元格的参数；detail：导出的表体字段
     */
    public void exportMergeXlsNullZero(HttpServletRequest request, HttpServletResponse response, List<Map> dataList,
                                       String sheetName, String[] head0, String[] headnum0,
                                       String[] head1, String[] headnum1, String[] detail, int[] width) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(sheetName);// 创建一个表
        // 表头标题样式
        HSSFFont headfont = workbook.createFont();
        headfont.setFontName("宋体");
        headfont.setFontHeightInPoints((short) 22);// 字体大小
        HSSFCellStyle headstyle = workbook.createCellStyle();
        headstyle.setFont(headfont);
        headstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        headstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        headstyle.setLocked(true);
        // 表头时间样式
        HSSFFont datefont = workbook.createFont();
        datefont.setFontName("宋体");
        datefont.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle datestyle = workbook.createCellStyle();
        datestyle.setFont(datefont);
        datestyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        datestyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        datestyle.setLocked(true);
        // 列名样式
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle style = workbook.createCellStyle();
//        style.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style.setFont(font);
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        style.setLocked(true);
        // 普通单元格样式（中文）
        HSSFFont font2 = workbook.createFont();
        font2.setFontName("宋体");
        font2.setFontHeightInPoints((short) 12);
        HSSFCellStyle style2 = workbook.createCellStyle();
//        style2.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style2.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style2.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style2.setFont(font2);
        style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style2.setWrapText(true); // 换行
        style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中

        for (int k = 0; k < detail.length; k++) {
            // 设置列宽  （第几列，宽度）
//            for (int i = 0; i < width.length; i++) {
            if (width.length > k) {
                sheet.setColumnWidth(k, width[k] * 1000);
            } else {
                sheet.setColumnWidth(k, 3000);
            }
//            }
        }
        sheet.setDefaultRowHeight((short) 360);//设置行高
        // 第一行表头标题
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, detail.length - 1));
        HSSFRow row = sheet.createRow(0);
        row.setHeight((short) 0x349);
        HSSFCell cell = row.createCell(0);
        cell.setCellStyle(headstyle);
        CellUtil.setCellValue(cell, sheetName);
        // 第二行表头列名
        row = sheet.createRow(1);
        for (int i = 0; i < head0.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(head0[i]);
            cell.setCellStyle(style);
        }
        //动态合并单元格
        for (int i = 0; i < headnum0.length; i++) {
            mergeRegion(headnum0[i], sheet);
        }
        //设置合并单元格的参数并初始化带边框的表头（这样做可以避免因为合并单元格后有的单元格的边框显示不出来）
        row = sheet.createRow(2); //因为下标从0开始，所以这里表示的是excel中的第四行
        for (int i = 0; i < head1.length; i++) {
            cell = row.createCell(i);
            cell.setCellStyle(style);
            cell.setCellValue(head1[i]);
        }
        //动态合并单元格
        for (int i = 0; i < headnum1.length; i++) {
            mergeRegion(headnum1[i], sheet);
        }
        // 设置列值-内容
        for (int i = 0; i < dataList.size(); i++) {
            row = sheet.createRow(i + 3);
            for (int j = 0; j < detail.length; j++) {
                Map tempmap = (HashMap) dataList.get(i);
                Object data = tempmap.get(detail[j]);
                cell = row.createCell(j);
                cell.setCellStyle(style2);
                cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                CellUtil.setCellValueNullZero(cell, data);
            }
        }
        String fileName = new String(sheetName.getBytes("gb2312"), "ISO8859-1");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        response.setContentType("application/x-download;charset=utf-8");
        response.addHeader("Content-Disposition", "attachment;filename=" + fileName + ".xls");
        OutputStream os = response.getOutputStream();
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        byte[] b = new byte[1024];
        while ((bais.read(b)) > 0) {
            os.write(b);
        }
        bais.close();
        os.flush();
        os.close();
    }

    /**
     * 单表头
     */
    public void exportXls(HttpServletRequest request, HttpServletResponse response, List<Map<String, Object>> dataList,
                          String sheetName, String[] head, String[] detail, int[] width) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(sheetName);// 创建一个表
        // 表头标题样式
        HSSFFont headfont = workbook.createFont();
        headfont.setFontName("宋体");
        headfont.setFontHeightInPoints((short) 22);// 字体大小
        HSSFCellStyle headstyle = workbook.createCellStyle();
        headstyle.setFont(headfont);
        headstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        headstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        headstyle.setLocked(true);
        // 表头时间样式
        HSSFFont datefont = workbook.createFont();
        datefont.setFontName("宋体");
        datefont.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle datestyle = workbook.createCellStyle();
        datestyle.setFont(datefont);
        datestyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        datestyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        datestyle.setLocked(true);
        // 列名样式
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle style = workbook.createCellStyle();
//        style.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style.setFont(font);
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        style.setLocked(true);
        // 普通单元格样式（中文）
        HSSFFont font2 = workbook.createFont();
        font2.setFontName("宋体");
        font2.setFontHeightInPoints((short) 12);
        HSSFCellStyle style2 = workbook.createCellStyle();
//        style2.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style2.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style2.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style2.setFont(font2);
        style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style2.setWrapText(true); // 换行
        style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中

        for (int k = 0; k < detail.length; k++) {
            // 设置列宽  （第几列，宽度）
//            for (int i = 0; i < width.length; i++) {
            if (width.length > k) {
                sheet.setColumnWidth(k, width[k] * 1000);
            } else {
                sheet.setColumnWidth(k, 3000);
            }
//            }
        }
        sheet.setDefaultRowHeight((short) 360);//设置行高
        // 第一行表头标题
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, detail.length - 1));
        HSSFRow row = sheet.createRow(0);
        row.setHeight((short) 0x349);
        HSSFCell cell = row.createCell(0);
        cell.setCellStyle(headstyle);
        CellUtil.setCellValue(cell, sheetName);
        // 第二行表头列名
        row = sheet.createRow(1);
        for (int i = 0; i < head.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(head[i]);
            cell.setCellStyle(style);
        }
        // 设置列值-内容
        for (int i = 0; i < dataList.size(); i++) {
            row = sheet.createRow(i + 2);
            for (int j = 0; j < detail.length; j++) {
                Map tempmap = (HashMap) dataList.get(i);
                Object data = tempmap.get(detail[j]);
                cell = row.createCell(j);
                cell.setCellStyle(style2);
                cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                CellUtil.setCellValue(cell, data);
            }
        }
        String fileName = new String(sheetName.getBytes("gb2312"), "ISO8859-1");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        response.setContentType("application/x-download;charset=utf-8");
        response.addHeader("Content-Disposition", "attachment;filename=" + fileName + ".xls");
        OutputStream os = response.getOutputStream();
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        byte[] b = new byte[1024];
        while ((bais.read(b)) > 0) {
            os.write(b);
        }
        bais.close();
        os.flush();
        os.close();
    }

    /**
     * 单表头
     */
    public void exportXlsNullZero(HttpServletRequest request, HttpServletResponse response, List<Map<String, Object>> dataList,
                                  String sheetName, String[] head, String[] detail, int[] width) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(sheetName);// 创建一个表
        // 表头标题样式
        HSSFFont headfont = workbook.createFont();
        headfont.setFontName("宋体");
        headfont.setFontHeightInPoints((short) 22);// 字体大小
        HSSFCellStyle headstyle = workbook.createCellStyle();
        headstyle.setFont(headfont);
        headstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        headstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        headstyle.setLocked(true);
        // 表头时间样式
        HSSFFont datefont = workbook.createFont();
        datefont.setFontName("宋体");
        datefont.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle datestyle = workbook.createCellStyle();
        datestyle.setFont(datefont);
        datestyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        datestyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        datestyle.setLocked(true);
        // 列名样式
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle style = workbook.createCellStyle();
//        style.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style.setFont(font);
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        style.setLocked(true);
        // 普通单元格样式（中文）
        HSSFFont font2 = workbook.createFont();
        font2.setFontName("宋体");
        font2.setFontHeightInPoints((short) 12);
        HSSFCellStyle style2 = workbook.createCellStyle();
//        style2.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style2.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style2.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style2.setFont(font2);
        style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style2.setWrapText(true); // 换行
        style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中

        for (int k = 0; k < detail.length; k++) {
            // 设置列宽  （第几列，宽度）
            for (int i = 0; i < width.length; i++) {
                if (k == i) {
                    sheet.setColumnWidth(k, width[i] * 1000);
                } else {
                    sheet.setColumnWidth(k, 3000);
                }
            }
        }
        sheet.setDefaultRowHeight((short) 360);//设置行高
        // 第一行表头标题
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, detail.length - 1));
        HSSFRow row = sheet.createRow(0);
        row.setHeight((short) 0x349);
        HSSFCell cell = row.createCell(0);
        cell.setCellStyle(headstyle);
        CellUtil.setCellValue(cell, sheetName);
        // 第二行表头列名
        row = sheet.createRow(1);
        for (int i = 0; i < head.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(head[i]);
            cell.setCellStyle(style);
        }
        // 设置列值-内容
        for (int i = 0; i < dataList.size(); i++) {
            row = sheet.createRow(i + 2);
            for (int j = 0; j < detail.length; j++) {
                Map tempmap = (HashMap) dataList.get(i);
                Object data = tempmap.get(detail[j]);
                cell = row.createCell(j);
                cell.setCellStyle(style2);
                cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                CellUtil.setCellValueNullZero(cell, data);
            }
        }
        String fileName = new String(sheetName.getBytes("gb2312"), "ISO8859-1");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        response.setContentType("application/x-download;charset=utf-8");
        response.addHeader("Content-Disposition", "attachment;filename=" + fileName + ".xls");
        OutputStream os = response.getOutputStream();
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        byte[] b = new byte[1024];
        while ((bais.read(b)) > 0) {
            os.write(b);
        }
        bais.close();
        os.flush();
        os.close();
    }


    /**
     * 单表头
     */
    public void exportEntityExcel(HttpServletRequest request, HttpServletResponse response, List<?> dataList,
                                  String sheetName, String[] head, Object detail, int[] width) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(sheetName);// 创建一个表
        // 表头标题样式
        HSSFFont headfont = workbook.createFont();
        headfont.setFontName("宋体");
        headfont.setFontHeightInPoints((short) 22);// 字体大小
        HSSFCellStyle headstyle = workbook.createCellStyle();
        headstyle.setFont(headfont);
        headstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        headstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        headstyle.setLocked(true);
        // 表头时间样式
        HSSFFont datefont = workbook.createFont();
        datefont.setFontName("宋体");
        datefont.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle datestyle = workbook.createCellStyle();
        datestyle.setFont(datefont);
        datestyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        datestyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        datestyle.setLocked(true);
        // 列名样式
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle style = workbook.createCellStyle();
//        style.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style.setFont(font);
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        style.setLocked(true);
        // 普通单元格样式（中文）
        HSSFFont font2 = workbook.createFont();
        font2.setFontName("宋体");
        font2.setFontHeightInPoints((short) 12);
        HSSFCellStyle style2 = workbook.createCellStyle();
//        style2.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style2.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style2.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style2.setFont(font2);
        style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style2.setWrapText(true); // 换行
        style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中


        Field[] fields = detail.getClass().getDeclaredFields();

        for (int k = 0; k < fields.length; k++) {
            // 设置列宽  （第几列，宽度）
//            for (int i = 0; i < width.length; i++) {
            if (width.length > k) {
                sheet.setColumnWidth(k, width[k] * 1000);
            } else {
                sheet.setColumnWidth(k, 10000);
            }
//            }
        }
        sheet.setDefaultRowHeight((short) 360);//设置行高
        // 第一行表头标题
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, fields.length - 1));
        HSSFRow row = sheet.createRow(0);
        row.setHeight((short) 0x349);
        HSSFCell cell = row.createCell(0);
        cell.setCellStyle(headstyle);
        CellUtil.setCellValue(cell, sheetName);
        // 第二行表头列名
        row = sheet.createRow(1);

        for (int i = 0; i < head.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(head[i]);
            cell.setCellStyle(style);
        }

        // 设置列值-内容
        for (int i = 0; i < dataList.size(); i++) {
            Object o = dataList.get(i);
            Field[] fields1 = o.getClass().getDeclaredFields();
            row = sheet.createRow(i + 2);
            for (int j = 0; j < fields1.length; j++) {
                Field field = fields1[j];
                String name = field.getName();    //获取属性的名字
                name = name.substring(0, 1).toUpperCase() + name.substring(1);
                String type = field.getGenericType().toString();

                String data = "";
                if (type.equals("class java.util.Date")) {
                    Method m = o.getClass().getMethod("get" + name);
                    Date value = (Date) m.invoke(o);
                    data = DateUtils.formatDate(value);
                } else {
                    Method m = o.getClass().getMethod("get" + name);
                    data = (String) m.invoke(o);
                }
                cell = row.createCell(j);
                cell.setCellStyle(style2);
                cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                CellUtil.setCellValue(cell, data);
            }
        }
        String fileName = new String(sheetName.getBytes("gb2312"), "ISO8859-1");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        response.setContentType("application/x-download;charset=utf-8");
        response.addHeader("Content-Disposition", "attachment;filename=" + fileName + ".xls");
        OutputStream os = response.getOutputStream();
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        byte[] b = new byte[1024];
        while ((bais.read(b)) > 0) {
            os.write(b);
        }
        bais.close();
        os.flush();
        os.close();
    }

    public void exportXlsNoTitle(HttpServletRequest request, HttpServletResponse response, List<Map> dataList,
                                 String sheetName, String[] head, String[] detail, int[] width) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(sheetName);// 创建一个表
        // 表头标题样式
        HSSFFont headfont = workbook.createFont();
        headfont.setFontName("宋体");
        headfont.setFontHeightInPoints((short) 22);// 字体大小
        HSSFCellStyle headstyle = workbook.createCellStyle();
        headstyle.setFont(headfont);
        headstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        headstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        headstyle.setLocked(true);
        // 表头时间样式
        HSSFFont datefont = workbook.createFont();
        datefont.setFontName("宋体");
        datefont.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle datestyle = workbook.createCellStyle();
        datestyle.setFont(datefont);
        datestyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        datestyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        datestyle.setLocked(true);
        // 列名样式
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle style = workbook.createCellStyle();
//        style.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style.setFont(font);
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        style.setLocked(true);
        // 普通单元格样式（中文）
        HSSFFont font2 = workbook.createFont();
        font2.setFontName("宋体");
        font2.setFontHeightInPoints((short) 12);
        HSSFCellStyle style2 = workbook.createCellStyle();
//        style2.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
//        style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
//        style2.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//        style2.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
        style2.setFont(font2);
        style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style2.setWrapText(true); // 换行
        style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中

        for (int k = 0; k < detail.length; k++) {
            // 设置列宽  （第几列，宽度）
//            for (int i = 0; i < width.length; i++) {
            if (width.length > k) {
                sheet.setColumnWidth(k, width[k] * 1000);
            } else {
                sheet.setColumnWidth(k, 5000);
            }
//            }
        }
        sheet.setDefaultRowHeight((short) 360);//设置行高
        // 第一行表头标题
//        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, detail.length - 1));
        HSSFRow row = sheet.createRow(0);
        row.setHeight((short) 0x349);
        HSSFCell cell = row.createCell(0);
        cell.setCellStyle(headstyle);
        CellUtil.setCellValue(cell, sheetName);
        // 第二行表头列名
        row = sheet.createRow(0);
        for (int i = 0; i < head.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(head[i]);
            cell.setCellStyle(style);
        }
        // 设置列值-内容
        for (int i = 0; i < dataList.size(); i++) {
            row = sheet.createRow(i + 1);
            for (int j = 0; j < detail.length; j++) {
                Map tempmap = (HashMap) dataList.get(i);
                Object data = tempmap.get(detail[j]);
                cell = row.createCell(j);
                cell.setCellStyle(style2);
                cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                CellUtil.setCellValue(cell, data);
            }
        }
        String fileName = new String(sheetName.getBytes("gb2312"), "ISO8859-1");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        response.setContentType("application/x-download;charset=utf-8");
        response.addHeader("Content-Disposition", "attachment;filename=" + fileName + ".xls");
        OutputStream os = response.getOutputStream();
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        byte[] b = new byte[1024];
        while ((bais.read(b)) > 0) {
            os.write(b);
        }
        bais.close();
        os.flush();
        os.close();
    }


    /**
     * 多行表头
     * dataList：导出的数据；sheetName：表头名称； head0：表头第一行列名；headnum0：第一行合并单元格的参数
     * head1：表头第二行列名；headnum1：第二行合并单元格的参数；detail：导出的表体字段
     */
    public void exportManyMergeXls(HttpServletRequest request, HttpServletResponse response, List<Map> dataList,
                                   String sheetName, List<String[]> heads, List<String[]> headnums,
                                   String[] detail, int[] width) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(sheetName);// 创建一个表
        // 表头标题样式
        HSSFFont headfont = workbook.createFont();
        headfont.setFontName("宋体");
        headfont.setFontHeightInPoints((short) 22);// 字体大小
        HSSFCellStyle headstyle = workbook.createCellStyle();
        headstyle.setFont(headfont);
        headstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        headstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        headstyle.setLocked(true);
        // 表头时间样式
        HSSFFont datefont = workbook.createFont();
        datefont.setFontName("宋体");
        datefont.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle datestyle = workbook.createCellStyle();
        datestyle.setFont(datefont);
        datestyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        datestyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        datestyle.setLocked(true);
        // 列名样式
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 12);// 字体大小
        HSSFCellStyle style = workbook.createCellStyle();
        style.setFont(font);
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        style.setLocked(true);
        // 普通单元格样式（中文）
        HSSFFont font2 = workbook.createFont();
        font2.setFontName("宋体");
        font2.setFontHeightInPoints((short) 12);
        HSSFCellStyle style2 = workbook.createCellStyle();
        style2.setFont(font2);
        style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        style2.setWrapText(true); // 换行
        style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中

        for (int k = 0; k < detail.length; k++) {
            // 设置列宽  （第几列，宽度）
//            for (int i = 0; i < width.length; i++) {
            if (width.length > k) {
                sheet.setColumnWidth(k, width[k] * 1000);
            } else {
                sheet.setColumnWidth(k, 5000);
            }
//            }
        }
        sheet.setDefaultRowHeight((short) 360);//设置行高
        // 第一行表头标题
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, detail.length - 1));
        HSSFRow row = sheet.createRow(0);
        row.setHeight((short) 0x349);
        HSSFCell cell = row.createCell(0);
        cell.setCellStyle(headstyle);
        CellUtil.setCellValue(cell, sheetName);
        // 第二行表头列名
        row = sheet.createRow(1);


        for (int i = 0; i < heads.size(); i++) {
            row = sheet.createRow(i + 1);

            String[] head = heads.get(i);
            String[] nums = headnums.get(i);

            for (int i1 = 0; i1 < head.length; i1++) {
                cell = row.createCell(i1);
                cell.setCellValue(head[i1]);
                cell.setCellStyle(style);

                if (nums.length > i1 && StringUtils.isNotEmpty(nums[i1])) {
                    mergeRegion(nums[i1], sheet);
                }
            }
        }

        // 设置列值-内容
        for (int i = 0; i < dataList.size(); i++) {
            row = sheet.createRow(i + heads.size() + 1);
            for (int j = 0; j < detail.length; j++) {
                Map tempmap = (HashMap) dataList.get(i);
                Object data = tempmap.get(detail[j]);
                cell = row.createCell(j);
                cell.setCellStyle(style2);
                cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                CellUtil.setCellValueNullZero(cell, data);
            }
        }
        String fileName = new String(sheetName.getBytes("gb2312"), "ISO8859-1");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        workbook.write(baos);
        response.setContentType("application/x-download;charset=utf-8");
        response.addHeader("Content-Disposition", "attachment;filename=" + fileName + ".xls");
        OutputStream os = response.getOutputStream();
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        byte[] b = new byte[1024];
        while ((bais.read(b)) > 0) {
            os.write(b);
        }
        bais.close();
        os.flush();
        os.close();
    }


}
