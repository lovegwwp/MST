
package com.jyss.mst.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import org.apache.commons.codec.binary.Hex;

public class CommTool {
    public CommTool() {
    }

    public static String getSalt() {
        StringBuilder str = new StringBuilder();
        Random random = new Random();

        for(int i = 0; i < 8; ++i) {
            str.append(random.nextInt(10));
        }

        return str.toString();
    }

    public static String getYzm() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        for(int i = 0; i < 6; ++i) {
            sb.append(random.nextInt(10));
        }

        return sb.toString();
    }

    public static String getUUID() {
        UUID uuid = UUID.randomUUID();
        String str = uuid.toString();
        String uuidStr = str.replace("-", "");
        return uuidStr;
    }

    public static String getMyMac(String oldMac) {
        System.out.println(oldMac);
        String md5Str = generate(oldMac, "JYCS");
        System.out.println("md5Str========>" + md5Str);
        String OddStr = getOddString(md5Str);
        System.out.println("OddStr========>" + OddStr);
        String pjStr = getPjString(OddStr);
        System.out.println("pjStr========>" + pjStr.toUpperCase());
        return pjStr.toUpperCase();
    }

    public static String getOddString(String oldStr) {
        StringBuffer sb = new StringBuffer();
        if(oldStr == null) {
            return "";
        } else {
            int n = oldStr.length();

            for(int i = 0; i < n; ++i) {
                if(i % 2 == 0) {
                    sb.append(oldStr.charAt(i));
                }
            }

            return sb.toString();
        }
    }

    public static String getPjString(String oldStr) {
        StringBuffer strb = new StringBuffer();
        if(oldStr == null) {
            return "";
        } else {
            String temp = "";
            int startIndex = 0;
            int n = oldStr.length();

            for(int re = 1; re <= n; ++re) {
                if(re % 4 == 0) {
                    temp = oldStr.substring(startIndex, re);
                    startIndex = re;
                    strb.append(temp + "-");
                }
            }

            String var6 = strb.toString();
            return var6.substring(0, var6.length() - 1);
        }
    }

    public static String generate(String password, String salt) {
        new Random();
        password = md5Hex(password + salt);
        return password;
    }

    public static String md5Hex(String src) {
        try {
            MessageDigest e = MessageDigest.getInstance("MD5");
            byte[] bs = e.digest(src.getBytes());
            return new String((new Hex()).encode(bs));
        } catch (Exception var3) {
            return null;
        }
    }

    public static boolean createFile(String filePath, String fileName) {
        boolean isSucc = false;
        File file = new File(filePath);
        if(!file.exists()) {
            file.mkdirs();
        }

        File file2 = new File(filePath, filePath);
        if(!file2.exists()) {
            try {
                file2.createNewFile();
                isSucc = true;
            } catch (IOException var6) {
                var6.printStackTrace();
                isSucc = false;
            }
        }

        return isSucc;
    }

    public static boolean findFile(String filePath) {
        boolean isSucc = true;
        File file = new File(filePath);
        if(!file.exists()) {
            isSucc = false;
        }

        return isSucc;
    }

    public static Map<String, String> findFileAndGetInfo(String filePath) {
        HashMap m = new HashMap();
        System.out.println("filePath====>" + filePath);
        String info = "";
        File file = new File(filePath);
        if(!file.exists()) {
            m.put("status", "false");
            m.put("info", "");
            return m;
        } else {
            FileInputStream is = null;

            try {
                is = new FileInputStream(filePath);
            } catch (FileNotFoundException var9) {
                var9.printStackTrace();
                m.put("status", "false");
                m.put("info", "");
                file.delete();
                return m;
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(is));
            StringBuffer buffer = new StringBuffer();
            String line = "";

            try {
                while((line = in.readLine()) != null) {
                    line = line + ",";
                    buffer.append(line);
                }

                info = buffer.toString();
                in.close();
            } catch (IOException var10) {
                var10.printStackTrace();
                m.put("status", "false");
                m.put("info", "");
                file.delete();
                return m;
            }

            m.put("status", "true");
            m.put("info", info);
            file.delete();
            return m;
        }
    }

    public static long getFileSize(String filePath) {
        long fileSize = 0L;
        File file = new File(filePath);
        fileSize = file.length();
        return fileSize;
    }

    public static boolean doFileRename(String fileRunPath, String secondPath) {
        boolean isSucc = false;
        String url = fileRunPath + "MST.war";
        File file = new File(url);
        File file3 = new File(secondPath);
        if(file.delete() && file3.renameTo(file)) {
            isSucc = true;
        }

        return isSucc;
    }
    
    public static boolean deleteDir(String path){  
        File file = new File(path);  
        if(!file.exists()){//判断是否待删除目录是否存在  
            System.err.println("The dir are not exists!");  
            return false;  
        }  
          
        String[] content = file.list();//取得当前目录下所有文件和文件夹  
        for(String name : content){  
            File temp = new File(path, name);  
            if(temp.isDirectory()){//判断是否是目录  
                deleteDir(temp.getAbsolutePath());//递归调用，删除目录里的内容  
                temp.delete();//删除空目录  
            }else{  
                if(!temp.delete()){//直接删除文件  
                    System.err.println("Failed to delete " + name);  
                }  
            }  
        }  
        return true;  
    }  

    public static void main(String[] args) throws IOException {
        System.out.println((String)findFileAndGetInfo("C:\\Temp\\Third\\002_Data\\StreamingAssets\\ResultRecord.txt").get("info"));
    }
}
