

package com.jyss.mst.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;


public class MstpcUtil {
    public MstpcUtil() {
    }

    public static String getTxtId() {
        String macId = "";
        String filePath = "c:" + File.separator + "mstperson" + File.separator + "temp";

        try {
            String e = "c:" + File.separator + "mstperson" + File.separator + "temp" + File.separator + "idmst.txt";
            File fName = new File(e);

            BufferedReader rd;
            String tempInfo;
            for(rd = new BufferedReader(new FileReader(fName)); (tempInfo = rd.readLine()) != null; macId = macId + tempInfo) {   
                ;
            }

            rd.close();
            if(fName.delete()) {
                System.out.println("删除成功！！！！");
            }
        } catch (IOException var6) {
            var6.printStackTrace();
        }

        System.out.println(macId);
        return macId;
    }

    public static String getTxtId2() {
        String macId = "";
        String fileStr = "c:" + File.separator + "mstperson" + File.separator + "temp" + File.separator + "idmst.txt";

        File file = new File(fileStr);
        FileInputStream fis = null;
        try {
        	fis = new FileInputStream(file);
        	byte[] buf = new byte[1024];
        	StringBuffer sb = new StringBuffer();
        	int len = 0;       
        	while((len = fis.read(buf)) != -1) {
        		sb.append(new String(buf, 0 , len, "utf-8"));
        	}
        	macId = sb.toString().trim();
        	System.out.println(macId);
            fis.close();
        } catch (Exception e) {
           e.printStackTrace();
           return "";
        }      
        return macId;
    }
    
    ///bom格式处理
    public static String getTxtId3() {
        String macId = "";
        String fileStr = "c:" + File.separator + "mstperson" + File.separator + "temp" + File.separator + "idmst.txt";
       // URL url = new URL("http://****/***/test.txt");   
        File f  = new File(fileStr);  
            String enc = null; // or NULL to use systemdefault
			try {
				UnicodeInputStream uin = new UnicodeInputStream(new FileInputStream(f),enc);
			   //如果是本地将url.openStream -> new FileInputStream(f)
	            enc = uin.getEncoding(); // check and skip possible BOM bytes
	            InputStreamReader in;	          
	            if (enc == null){
	                in = new InputStreamReader(uin);
	            }else {            
					in = new InputStreamReader(uin, enc);	
				}		           
	            BufferedReader reader = new BufferedReader(in);
	            //BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream("D:/tags.txt"),"utf-8"));	           
	            macId =reader.readLine();//读取一行
			}catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
				return "";
			} 
			System.out.println(macId);
        return macId;
    }
    
    public static String getPcCommet() {
        String filePath = "c:" + File.separator + "mstperson" + File.separator + "temp";
        File file = new File(filePath);
        if(!file.exists()) {
            file.mkdirs();
        }

        String fileName = "c:" + File.separator + "mstperson" + File.separator + "temp" + File.separator + "testresult.txt";
        String pcInfo = "";

        try {
            File e = new File(fileName);

            BufferedReader rd;
            String tempInfo;
            for(rd = new BufferedReader(new FileReader(e)); (tempInfo = rd.readLine()) != null; pcInfo = tempInfo) {
                ;
            }

            rd.close();
            System.out.println("PcInfo：" + pcInfo);
        } catch (IOException var7) {
            var7.printStackTrace();
        }

        return pcInfo;
    }

    public static Map<String, String> getCameratxt(String txtStr) {
        HashMap m = new HashMap();
        int count = 0;
        String cameraInfo = "";

        try {
            File e = new File(txtStr);

            BufferedReader rd;
            String tempInfo;
            for(rd = new BufferedReader(new FileReader(e)); (tempInfo = rd.readLine()) != null; ++count) {
                tempInfo = tempInfo.trim();
                if(count == 0) {
                    if(tempInfo == null || tempInfo.equals("") || tempInfo.length() != 1 || !tempInfo.equals("0") && !tempInfo.equals("1")) {
                        m.put("bdCamera", "0");
                    } else {
                        m.put("bdCamera", tempInfo);
                    }

                    System.out.println("bdCamera：" + tempInfo);
                }

                if(count == 1) {
                    if(tempInfo == null || tempInfo.equals("") || tempInfo.length() != 1 || !tempInfo.equals("0") && !tempInfo.equals("1")) {
                        m.put("xnCamera", "1");
                    } else {
                        m.put("xnCamera", tempInfo);
                    }

                    System.out.println("xnCamera：" + tempInfo);
                    System.out.println("xnCamera：" + (String)m.get("xnCamera"));
                }
            }

            rd.close();
            m.put("status", "true");
        } catch (IOException var7) {
            var7.printStackTrace();
            m.put("status", "true");
            m.put("bdCamera", "0");
            m.put("xnCamera", "1");
        }

        if(count == 1) {
            m.put("xnCamera", "1");
        }

        System.out.println("bdCamera=m：" + (String)m.get("bdCamera"));
        System.out.println("xnCamera=m：" + (String)m.get("xnCamera"));
        System.out.println(count);
        return m;
    }

    public static String getPcCommet2() {
        String filePath = "c:" + File.separator + "mstperson" + File.separator + "temp";
        File file = new File(filePath);
        if(!file.exists()) {
            file.mkdirs();
        }

        String fileName = "c:" + File.separator + "mstperson" + File.separator + "temp" + File.separator + "testresult.txt";
        String pcInfo = "";

        try {
            File e = new File(fileName);

            BufferedReader rd;
            String tempInfo;
            for(rd = new BufferedReader(new FileReader(e)); (tempInfo = rd.readLine()) != null; pcInfo = pcInfo + tempInfo) {
                ;
            }

            if(pcInfo.length() > 50) {
                pcInfo = pcInfo.substring(0, 40);
            }

            rd.close();
            System.out.println("PcInfo：" + pcInfo);
        } catch (IOException var7) {
            var7.printStackTrace();
        }

        return pcInfo;
    }

    public static String getPcCommentInfo(String urll) {
        String pcInfo = "";

        try {
            File e = new File(urll);

            BufferedReader rd;
            String tempInfo;
            for(rd = new BufferedReader(new FileReader(e)); (tempInfo = rd.readLine()) != null; pcInfo = pcInfo + tempInfo) {
                ;
            }

            if(pcInfo.length() > 300) {
                pcInfo = pcInfo.substring(0, 280);
            }

            rd.close();
            System.out.println(pcInfo);
        } catch (IOException var5) {
            var5.printStackTrace();
        }

        return pcInfo.trim();
    }

    public static void copyFile(String fromStr, String toStr) throws IOException {
        File fromFile = new File(fromStr);
        File toFile = new File(toStr);
        FileInputStream ins = new FileInputStream(fromFile);
        FileOutputStream out = new FileOutputStream(toFile);
        byte[] b = new byte[1024];
        boolean n = false;

        int n1;
        while((n1 = ins.read(b)) != -1) {
            out.write(b, 0, n1);
        }

        ins.close();
        out.close();
    }

    public static String getFileMd5Str(String url) {
        String FileMd5Str = "";

        try {
            File e = new File(url);
            FileInputStream fis = new FileInputStream(e);
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] buffer = new byte[1024];
            boolean length = true;

            int length1;
            while((length1 = fis.read(buffer, 0, 1024)) != -1) {
                md.update(buffer, 0, length1);
            }

            BigInteger bigInt = new BigInteger(1, md.digest());
            FileMd5Str = bigInt.toString(16);
            System.out.println("文件md5值：" + bigInt.toString(16));
        } catch (FileNotFoundException var8) {
            var8.printStackTrace();
        } catch (NoSuchAlgorithmException var9) {
            var9.printStackTrace();
        } catch (IOException var10) {
            var10.printStackTrace();
        }

        return FileMd5Str;
    }

    public static void main(String[] args) {
       // String path = "C://MSTAPP//camera.txt";
       /// getCameratxt(path);
    	String path = "C://MSTAPP//idmst.txt";
        //getFileMd5Str(path);
    	getTxtId3();
    }
}
