<%@ page contentType="text/html; charset=gb2312" %>
<%@ page import="java.io.*" %>
<%@ page import="java.text.*" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.lang.*" %>
<%@ page import="java.util.*" %>
<%@ page import="javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="oracle.sql.BLOB" %>
<%@ page import="oracle.jdbc.*" %>
<%@page import="com.chinacreator.iWebOffice2006.iDBManager2000"%>
<%@page import="com.chinacreator.iWebOffice2006.iFileUpLoad2000"%><html>
<%!
boolean mResult;
int i=0;
iFileUpLoad2000 FileObj;
iDBManager2000 DbaObj;
String mUserName;
String mSignatureID;
int mMarkSize;
String mMarkType;
String mMarkPath;
byte[] mMarkBody;


private void PutAtBlob(BLOB vField,int vSize) throws IOException
{
  try
  {
    OutputStream outstream=vField.getBinaryOutputStream();
    outstream.write(mMarkBody,0, vSize);
    outstream.close();
  }
  catch(SQLException e)
  {

  }
}
%>
<head>
<title>iWebOffice2003\u2014\u2014印签管理</title>
<link rel='stylesheet' type='text/css' href='../test.css'>
</head>
<body bgcolor="#ffffff">
<div align="center"><font size=4 color=ff0000>办公自动化网络文档处理示例[iWebOffice2003嵌入版]\u2014\u2014印签管理〖印签修改〗</font></div>
<hr size=1>
<br>
<%
FileObj = new iFileUpLoad2000(request);
DbaObj=new iDBManager2000();

String mSignatureID=FileObj.Request("SignatureID");
String mUserName=FileObj.Request("UserName");
String mPassword=FileObj.Request("Password");
String mMarkName=FileObj.Request("MarkName");
if (FileObj.FileName("MarkFile").equalsIgnoreCase("")) {
  mMarkSize=0;
}
else {
  mMarkSize=FileObj.FileSize("MarkFile");
  mMarkType=FileObj.ExtName("MarkFile");
  mMarkBody=FileObj.FileBody("MarkFile");
}

if (DbaObj.OpenConnection())
{
   String mSql="select MarkName from Signature where  SignatureID <>" + mSignatureID + " and MarkName='" + mMarkName + "'";
   try
   {
     ResultSet result=DbaObj.ExecuteQuery(mSql) ;
     if (result.next())
     {
       out.write("保存失败，数据库中已存在相同的印签〖" + mMarkName + "〗<input type='button' value='返 回' onclick='javascript:history.back();'");
       mResult=false;
     }
     else
     {
       mSql="Update Signature Set UserName=?,Password=?,MarkName=?,MarkSize=?,MarkType=?,MarkBody=EMPTY_BLOB()  Where SignatureID="+mSignatureID;
       mResult=true;
     }
     result.close();
   }
   catch(Exception e)
   {
     System.out.println(e.toString());
   }

   if (mResult)
   {
     java.sql.PreparedStatement prestmt=null;
     try
     {
       DbaObj.Conn.setAutoCommit(false) ;
       prestmt =DbaObj.Conn.prepareStatement(mSql);
       prestmt.setString(1, mUserName);
       prestmt.setString(2, mPassword);
       prestmt.setString(3, mMarkName);
       prestmt.setInt(4, mMarkSize);
       prestmt.setString (5 ,mMarkType);
       prestmt.execute();
       prestmt.close();


       Statement stmt=null;
       DbaObj.Conn.setAutoCommit(false) ;
       stmt = DbaObj.Conn.createStatement();
       OracleResultSet update=(OracleResultSet)stmt.executeQuery("select MarkBody from Signature where SignatureID=" + mSignatureID);
       if (update.next()){
         if(!FileObj.FileName("MarkFile").equalsIgnoreCase(""))
         {
           mMarkSize=mMarkBody.length;
           PutAtBlob(((oracle.jdbc.OracleResultSet)update).getBLOB("MarkBody"),mMarkSize);
         }
       }
       update.close();
       stmt.close();
       DbaObj.Conn.commit();
       mMarkBody=null;
       mResult=true;
     }
     catch(SQLException e)
     {
       System.out.println(e.toString());
       mResult=false;
     }
  }
  DbaObj.CloseConnection() ;
}

if (mResult)
{
  response.sendRedirect("SignatureList.jsp");
}
%>
</body>
</html>