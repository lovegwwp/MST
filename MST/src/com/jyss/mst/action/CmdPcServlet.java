package com.jyss.mst.action;

import com.jyss.mst.util.CommTool;
import com.jyss.mst.util.MstpcUtil;
import com.jyss.mst.util.ResponseJson;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CmdPcServlet
  extends HttpServlet
{
  public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-type", "text/html;charset=UTF-8");
    response.setCharacterEncoding("UTF-8");
    Boolean flagOpen = Boolean.valueOf(false);
    Boolean flagClose = Boolean.valueOf(false);
    Map<String, String> m = new HashMap();
    String cmdType = request.getParameter("cmdType");
    String exeTitle = request.getParameter("exeTitle");
    String exeUrl = request.getParameter("exeUrl");
    String exeTime = request.getParameter("exeTime");
    String exeMode = request.getParameter("exeMode");
    if ((exeMode == null) || (exeMode.equals(""))) {
      exeMode = "1";
    }
    if ((exeTime == null) || (exeTime.equals(""))) {
      exeMode = "300";
    }
    System.out.println("exeUrl" + exeUrl);
    ///虚拟屏幕启动
    if (cmdType.equals("1")) {
      flagOpen = Boolean.valueOf(cmdOperate(exeUrl));
      m.put("status", flagOpen+"");
      System.out.println("cmdOperatestatus");
      ResponseJson.responseOutWithJson(response, m);
    }
    ////虚拟屏幕关闭
    else if (cmdType.equals("2")) {
      flagClose = Boolean.valueOf(cmdClose());
      
      m.put("status", flagClose+"");
      
      ResponseJson.responseOutWithJson(response, m);
    }
    ////抓取设备号以及设备驱动MD5码
    else if (cmdType.equals("3")) {
      String macId = MstpcUtil.getTxtId3();
      String MD5Str = MstpcUtil.getFileMd5Str("C://MSTAPP//mstid.exe");
      System.out.println("oldMacid2===>" + macId);
      System.out.println("MD5Str===>" + MD5Str);
      
      m.put("MACID", macId);
      m.put("MD5Str", MD5Str);
      ResponseJson.responseOutWithJson(response, m);
    }
    ///抓取IP
    else if (cmdType.equals("4"))
    {
      try {
        InetAddress addr = InetAddress.getLocalHost();
        String hostAddr = addr.getHostAddress();
        String hostName = addr.getHostName();
        request.setAttribute("IP", hostAddr);
        request.setAttribute("HOSTNAME", hostName);
        System.out.println("本地IP地址：" + hostAddr);
        System.out.println("本地的机器名称：" + hostName);
        m.put("PCIP", hostAddr);
        ResponseJson.responseOutWithJson(response, m);
      } catch (UnknownHostException e) {
        e.printStackTrace();
      }
    }
    ///读取评测信息
    else if (cmdType.equals("6")) {
      boolean isExist = false;
      String url = exeUrl.substring(0, exeUrl.indexOf("exe") - 1);
      url = url + "_Data\\StreamingAssets\\result.txt";
      System.out.println("url====>" + url);
      isExist = cmdFindFile(url);
      if (isExist)
      {
        String pcInfo = MstpcUtil.getPcCommentInfo(url);
        m.put("status", "true");
        m.put("pcInfo", pcInfo);
        ResponseJson.responseOutWithJson(response, m);
      }
      
      m.put("status", "false");
      m.put("pcInfo", "");
      ResponseJson.responseOutWithJson(response, m);
    }
    ///游戏训练开始启动
    else if (cmdType.equals("7")) {
      flagOpen = Boolean.valueOf(cmdOperateTest(exeMode, exeTime, exeUrl));
      m.put("status", flagOpen+"");
      ResponseJson.responseOutWithJson(response, m);
    }
    ///游戏训练关闭
    else if (cmdType.equals("8")) {
      flagOpen = Boolean.valueOf(cmdOperateTestClose(exeUrl));
      m.put("status", flagOpen+"");
      ResponseJson.responseOutWithJson(response, m);
    }
   ///游戏训练=结果读取
    else if (cmdType.equals("9")) {
      m = cmdOperateTestResult(exeUrl);
      
      ResponseJson.responseOutWithJson(response, m);
    }
    ///互动中心=游戏中心
    else if (cmdType.equals("10")) {
      m = hdzxOperate(exeUrl);
      ResponseJson.responseOutWithJson(response, m);
    }
    ////虚拟摄像头去下标
    else if (cmdType.equals("11")) {
      boolean isExist = false;
      String txtStr = "C://MSTAPP//camera.txt";
      isExist = cmdFindFile(txtStr);
      if (isExist)
      {
        m = MstpcUtil.getCameratxt(txtStr);
        ResponseJson.responseOutWithJson(response, m);
      } else {
        m.put("status", "true");
        m.put("bdCamera", "0");
        m.put("xnCamera", "1");
        ResponseJson.responseOutWithJson(response, m);
      }
      System.out.println("bdCamera=m：" + (String)m.get("bdCamera"));
      System.out.println("xnCamera=m：" + (String)m.get("xnCamera"));
    }
    ///项目整体--清除缓存---清除所有视频
    else if (cmdType.equals("12")) {
      m = clearOperate();
      ResponseJson.responseOutWithJson(response, m);
    }
  }
  
  
  public static Map<String, String> clearOperate()
  {
    Map<String, String> m = new HashMap<String, String>();  
    String urlStr = "C:\\MSTAPP\\apache-tomcat-7.0.79\\apache-tomcat-7.0.79\\webapps\\uploadVedio";
    boolean isSucc = CommTool.deleteDir(urlStr);
    m.put("status", "fasle");
    if (isSucc) {
    	 m.put("status", "true");
	}   
    return m;
  }
  
  public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    doGet(request, response);
  }
  
  public boolean cmdOperate(String url)
  {
    String path = "C:" + File.separator + "MSTAPP" + File.separator + 
      "ScreenCap.exe";
    Runtime run = Runtime.getRuntime();
    try
    {
      run.exec("cmd.exe /k start " + path);
      
      run.exec("cmd.exe /k start " + url);
    }
    catch (IOException e) {
      e.printStackTrace();
      return false;
    }
    return true;
  }
  
  public boolean cmdClose()
  {
    String closeUrl = "C:" + File.separator + "MSTAPP" + File.separator + 
      "ScreenCapture_OFF.exe";
    Runtime run = Runtime.getRuntime();
    try {
      run.exec("cmd.exe /c start " + closeUrl);
    }
    catch (IOException e) {
      e.printStackTrace();
      return false;
    }
    return true;
  }
  
  public boolean cmdFindFile(String urlStr)
  {
    File f = new File(urlStr);
    boolean flag = false;
    flag = f.exists();
    return flag;
  }
  
  public boolean cmdOperateTest(String mode, String opentime, String urlStr)
  {
    int minu = 5;
    
    if ((mode == null) || (mode.equals(""))) {
      mode = "1";
    }
    if (!opentime.isEmpty()) {
      minu = Integer.parseInt(opentime) / 60;
    }
    urlStr = urlStr.substring(0, urlStr.indexOf("exe") - 1);
    String path = urlStr + " " + minu + " mstsyzmotion 0";
    
    String frompath = urlStr + "_Data\\StreamingAssets\\config" + mode + 
      ".txt";
    String topath = urlStr + "_Data\\StreamingAssets\\config.txt";
    try {
      MstpcUtil.copyFile(frompath, topath);
    }
    catch (IOException e1) {
      e1.printStackTrace();
      return false;
    }
    Runtime run = Runtime.getRuntime();
    try {
      run.exec("cmd.exe /k start " + path);
    }
    catch (IOException e) {
      e.printStackTrace();
      return false;
    }
    return true;
  }
  
  public boolean cmdOperateTestClose(String urlStr)
  {
    String path = urlStr.substring(0, urlStr.indexOf("exe") - 1);
    path = path + "_Data\\StreamingAssets";
    String fileName = "cmd_end.txt";
    return CommTool.createFile(path, fileName);
  }
  
  //第三方训练文件读取
  /////轮训文件是否存在，存在读取，启动下一个exe操作。不存在,不做处理
  public Map<String, String> cmdOperateTestResult(String urlStr)
  {
    Map<String, String> m = new HashMap();
    String path = urlStr.substring(0, urlStr.indexOf("exe") - 1);
    path = path + "_Data\\StreamingAssets";
    String fileName = "ResultRecord.txt";
    boolean flag = cmdFindFile(path + "\\" + fileName);
    if (flag) {
    	m = CommTool.findFileAndGetInfo(path + "\\" + fileName);
	}else{
		m.put("status", "false");
        m.put("info", "");
	}
    
    return m;
  }
  
  public static Map<String, String> hdzxOperate(String urlStr)
  {
    Map<String, String> m = new HashMap();
    if ( (urlStr == null)||(urlStr.equals("")) ) {
      urlStr = "c:\\mstperson\\thirdtrain\\08\\hall.exe 1 mstsyzmotion 1";
    }
    urlStr = urlStr + " 1 mstsyzmotion 1";
    
    Runtime run = Runtime.getRuntime();
    try {
      run.exec("cmd.exe /k start " + urlStr);
    }
    catch (IOException e) {
      e.printStackTrace();
      m.put("status", "false");
      return m;
    }
    m.put("status", "true");
    return m;
  }
  
  public static void main(String[] args)
  {
   // hdzxOperate("C:\\Temp\\Third\\001.exe 1 mstsyzmotion 0");
   //System.out.println(clearOperate());
  }
}
