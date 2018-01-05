package com.jyss.mst.util;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

public class ResponseJson {

	public static void responseOutWithJson(HttpServletResponse response,
			Map<String, String> m) {
		// 将实体对象转换为JSON Object转换
		String responseStr = "";
		responseStr = JSON.toJSONString(m);
		// JSONObject responseJSONObject =
		// JSONObject.parseObject(responseObject);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=utf-8");
		PrintWriter out = null;
		try {
			out = response.getWriter();
			// out.append(responseJSONObject.toString());
			out.append(responseStr);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
			}
		}
	}
}
