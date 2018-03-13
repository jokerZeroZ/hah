<%@ page contentType="text/html; charset=gb2312" %>
<%@ page import="java.io.*,java.text.*,java.util.*,java.sql.*" %>
<%@page import="com.chinacreator.iWebOffice2006.iDBManager2000"%>
<%
String mSignatureID = new String(request.getParameter("SignatureID"));
boolean mResult=false;

iDBManager2000 DbaObj=new iDBManager2000();
if (DbaObj.OpenConnection())
{
  java.sql.PreparedStatement prestmt=null;
  String mSql = "Delete from Signature where SignatureID = " + mSignatureID;
  prestmt =DbaObj.Conn.prepareStatement(mSql);;
  DbaObj.Conn.setAutoCommit(true) ;
  prestmt.execute();
  DbaObj.Conn.commit();
  prestmt.close();
  mResult=true;
}
else
{
  mResult=false;
}
DbaObj.CloseConnection() ;

if (mResult)
{
  response.sendRedirect("SignatureList.jsp");
}

%>
