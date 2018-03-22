package com.core.base.action;
import java.io.UnsupportedEncodingException;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class Base64Encrypt
{
    /**
     * 加密
     * 
     */
    public static String getBase64(String str) {  
        byte[] b = null;  
        String s = null;  
        try {  
            b = str.getBytes("utf-8");  
        } catch (UnsupportedEncodingException e) {  
            e.printStackTrace();  
        }  
        if (b != null) {  
            s = new BASE64Encoder().encode(b);  
        }  
        return s;  
    }  
  
    // 解密  
    public static String getFromBase64(String s) {  
        byte[] b = null;  
        String result = null;  
        if (s != null) {  
            BASE64Decoder decoder = new BASE64Decoder();  
            try {  
                b = decoder.decodeBuffer(s);  
                result = new String(b, "utf-8");  
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
        }  
        return result;  
    }  

    /**
     * @param args
     */
    public static void main(String[] args)
    {
        String content = "admin";//UDEyMzQ1Ng==   MTIzNDU2
        String aaa = getBase64(content);
        System.out.println("解密前：" + aaa);
        String ccc = getFromBase64(aaa);
        System.out.println("解密后：" + ccc);
    }

}
