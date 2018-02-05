
package com.jyss.mst.action;

import com.alibaba.fastjson.JSON;
import com.jyss.mst.util.DownLoadEntity;
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

public class MyDownLoadServlet extends HttpServlet {
    public MyDownLoadServlet() {
    }
    int count =0;///下载记录数
   // int failCount =0;///下载记录数
    
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        HashMap m = new HashMap();
        String loadType = request.getParameter("loadType");//1=下载，2=查询下载数
        if (loadType.equals("1")) {
        	count = 0;///下载清空
        	m.put("status", "true");
   		    m.put("message", "等待下载");
        	String myJson = request.getParameter("myJson");//待下载数组
        	 if ((myJson == null) || (myJson.equals(""))) {
        		 m.put("status", "false");
        		 m.put("message", "发送数据为空!");
			}
			DownLoadEntity downLoadEntity = null;
			try {
				downLoadEntity = JSON.parseObject(myJson, DownLoadEntity.class);
			} catch (Exception e) {
				e.printStackTrace();
				m.put("status", "false");
				m.put("message", "解析错误！");
			}
			if (downLoadEntity == null) {
				m.put("status", "false");
				m.put("message", "解析错误！");
			}
			int len = downLoadEntity.getArrLen();
			String[] strArr =  downLoadEntity.getStrArr();
			if (strArr==null||strArr.length==0||(strArr.length!=len)) {
				m.put("status", "false");
				m.put("message", "数据错误");
			}
		
			System.out.println("开始下载！");
			for (String str : strArr) {
				if (str!=null&&!(str.equals(""))) {
					DoMyLoad(request,str);
				}	
				count++;
				System.out.println("已下载=====>"+count);
			}
			System.out.println("走完下载！");
			ResponseJson.responseOutWithJson(response, m);
		}else if (loadType.equals("2")) {
			///下载记录数
			m.put("status", "true");
			m.put("message", count);
			ResponseJson.responseOutWithJson(response, m);
		}
        
        
    }
    
    public  void DoMyLoad(HttpServletRequest request,String fileName){
        HashMap m = new HashMap();        
        String url = "http://121.40.29.64:8081/" + fileName;
        System.out.println("资源路径======>" + url);
        fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        String filePath = request.getSession().getServletContext().getRealPath("/");
        System.out.println("原始路径" + filePath);
        int index = filePath.lastIndexOf("MST");
      //  System.out.println("index" + index);
        filePath = filePath.substring(0, index) + "uploadVedio" + File.separator;
        System.out.println("下载路径" + filePath);
        File file = new File(filePath);
        if(!file.exists()) {
            file.mkdirs();
        }
        //judgeSame
        File fileSame = new File(filePath+ fileName);
		if (fileSame.exists()) {
			System.out.println(fileName + "文件已存在，不下载！");
		} else {
			FileOutputStream fileOut = null;
			HttpURLConnection conn = null;
			InputStream inputStream = null;

			try {
				URL e = new URL(url);
				conn = (HttpURLConnection) e.openConnection();
				conn.setRequestMethod("POST");
				conn.setDoInput(true);
				conn.setDoOutput(true);
				conn.setUseCaches(false);
				conn.connect();
				inputStream = conn.getInputStream();
				BufferedInputStream bis = new BufferedInputStream(inputStream);
				if (!filePath.endsWith("/")) {
					filePath = filePath + "/";
				}

				fileOut = new FileOutputStream(filePath + fileName);
				BufferedOutputStream bos = new BufferedOutputStream(fileOut);
				byte[] buf = new byte[4096];

				for (int length = bis.read(buf); length != -1; length = bis
						.read(buf)) {
					bos.write(buf, 0, length);
				}

				bos.close();
				bis.close();
				conn.disconnect();
				///count++;
				System.out.println("OKOKOKOKOKOKOK！！" + fileName);
				m.put("status", "true");
			} catch (Exception var17) {
				var17.printStackTrace();
				//count++;
				System.out.println("抛出异常！！");
				m.put("status", "false");
			}
		}
    	
    }
}
