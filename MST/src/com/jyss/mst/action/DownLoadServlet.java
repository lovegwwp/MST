
package com.jyss.mst.action;

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

public class DownLoadServlet extends HttpServlet {
    public DownLoadServlet() {
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        HashMap m = new HashMap();
        String fileName = request.getParameter("fileName");
        System.out.println("fileName=======>" + fileName);
        String url = "http://121.40.29.64:8081/" + fileName;
        fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        String filePath = request.getSession().getServletContext().getRealPath("/");
        System.out.println("原始路径" + filePath);
        int index = filePath.lastIndexOf("MST");
        System.out.println("index" + index);
        filePath = filePath.substring(0, index) + "uploadVedio" + File.separator;
        System.out.println("下载路径" + filePath);
        File file = new File(filePath);
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
            if(!filePath.endsWith("/")) {
                filePath = filePath + "/";
            }

            fileOut = new FileOutputStream(filePath + fileName);
            BufferedOutputStream bos = new BufferedOutputStream(fileOut);
            byte[] buf = new byte[4096];

            for(int length = bis.read(buf); length != -1; length = bis.read(buf)) {
                bos.write(buf, 0, length);
            }

            bos.close();
            bis.close();
            conn.disconnect();
            System.out.println("OKOKOKOKOKOKOK！！" + fileName);
            m.put("status", "true");
        } catch (Exception var17) {
            var17.printStackTrace();
            System.out.println("抛出异常！！");
            m.put("status", "false");
        }

        ResponseJson.responseOutWithJson(response, m);
    }
}
