
package com.jyss.mst.action;

import com.jyss.mst.util.CommTool;
import com.jyss.mst.util.ResponseJson;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UploadWarServlet extends HttpServlet {
    public UploadWarServlet() {
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        HashMap m = new HashMap();
        String filePath = request.getSession().getServletContext().getRealPath("/");
        int index = filePath.indexOf("MST");
        index = filePath.lastIndexOf("MST");
        filePath = filePath.substring(0, index);
        System.out.println("filePath" + filePath);
        String type = request.getParameter("upType");
        boolean isUp = false;
        boolean isSucc = false;
        if(type.equals("1")) {
            isUp = this.upNotify(request, response, filePath);
            m.put("status", String.valueOf(isUp));
        } else if(type.equals("2")) {
            isSucc = this.upLoadWar(request, response, filePath);
            m.put("status", String.valueOf(isSucc));
        }

        ResponseJson.responseOutWithJson(response, m);
    }

    public boolean upNotify(HttpServletRequest request, HttpServletResponse response, String fileRunPath) {
        boolean isSame = true;
        fileRunPath = fileRunPath + "MST.war";
        System.out.println("===============>" + fileRunPath);
        long size = Long.parseLong(request.getParameter("size"));
        long localSize = CommTool.getFileSize(fileRunPath);
        if(size == localSize) {
            isSame = false;
        }

        return isSame;
    }

    public boolean upLoadWar(HttpServletRequest request, HttpServletResponse response, String fileRunPath) {
        boolean isSucc = false;
        boolean isFinalSucc = false;
        String fileName = request.getParameter("fileName");
        System.out.println("fileName=======>" + fileName);
        String url = "http://121.40.29.64:8081/" + fileName;
        fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        File file = new File(fileRunPath);
        if(!file.exists()) {
            file.mkdirs();
        }

        FileOutputStream fileOut = null;
        HttpURLConnection conn = null;
        InputStream inputStream = null;

        try {
            URL e = new URL(url);
            conn = (HttpURLConnection)e.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoInput(true);
            conn.setDoOutput(true);
            conn.setUseCaches(false);
            conn.connect();
            inputStream = conn.getInputStream();
            BufferedInputStream bis = new BufferedInputStream(inputStream);
            if(!fileRunPath.endsWith("/")) {
                fileRunPath = fileRunPath + "/";
            }

            String secondPath = fileRunPath + "MSTUP.war";
            fileOut = new FileOutputStream(secondPath);
            BufferedOutputStream bos = new BufferedOutputStream(fileOut);
            byte[] buf = new byte[4096];

            for(int length = bis.read(buf); length != -1; length = bis.read(buf)) {
                bos.write(buf, 0, length);
            }

            bos.close();
            bis.close();
            conn.disconnect();
            System.out.println("OKOKOKOKOKOKOK！！" + fileName);
            isSucc = true;
            boolean isDoReplace = false;
            if(isSucc) {
                isDoReplace = CommTool.doFileRename(fileRunPath, secondPath);
                if(isDoReplace) {
                    isFinalSucc = true;
                }
            }
        } catch (Exception var19) {
            var19.printStackTrace();
            System.out.println("抛出异常！！");
            isFinalSucc = true;
        }

        return isFinalSucc;
    }
}
