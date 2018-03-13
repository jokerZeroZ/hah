<%@ page contentType="text/html; charset=gb2312" %>
<%@ page import="java.io.*,java.text.*,java.util.*,java.sql.*,DBstep.iDBManager2000.*" %>
<%
String mRecordID=request.getParameter("RecordID");
if (mRecordID==null) mRecordID="";
String mTemplate=new String(request.getParameter("Template").getBytes("8859_1"));
String mSubject=new String(request.getParameter("Subject").getBytes("8859_1"));
String mAuthor=new String(request.getParameter("Author").getBytes("8859_1"));
String mFileDate=new String(request.getParameter("FileDate").getBytes("8859_1"));
String mFileType=new String(request.getParameter("FileType").getBytes("8859_1"));
String mHTMLPath=new String(request.getParameter("HTMLPath").getBytes("8859_1"));
String mStatus="READ";

int mDocumentId=0;


DBstep.iDBManager2000 DbaObj=new DBstep.iDBManager2000();
if (DbaObj.OpenConnection())
{
  String mysql="SELECT DocumentID,RecordID from  Document Where RecordID='" + mRecordID + "'";
  //String mFileDate=DbaObj.GetDateTime() ;
  try
  {
    ResultSet result=DbaObj.ExecuteQuery(mysql) ;
    if (result.next())
    {
      mysql="update Document set DocumentID=?,RecordID=?,Template=?,Subject=?,Author=?,FileDate=?,FileType=?,HtmlPath=?,Status=? where RecordID='"+mRecordID+"'";
      mDocumentId=result.getInt("DocumentID");
    }
    else
    {
      mysql="insert into Document (DocumentID,RecordID,Template,Subject,Author,FileDate,FileType,HtmlPath,Status) values (?,?,?,?,?,?,?,?,?)";
      mDocumentId=DbaObj.GetMaxID("Document","DocumentID");
    }
    result.close();
  }
  catch(Exception e)
  {
      System.out.println(e.toString());
  }
  java.sql.PreparedStatement prestmt=null;
  try
  {
      prestmt=DbaObj.Conn.prepareStatement(mysql);
      prestmt.setInt(1,mDocumentId);
      prestmt.setString(2,mRecordID);
      prestmt.setString(3,mTemplate);
      prestmt.setString(4,mSubject);
      prestmt.setString(5,mAuthor);
      prestmt.setDate(6,DbaObj.GetDate());
      prestmt.setString(7,mFileType);
      prestmt.setString(8,mHTMLPath);
      prestmt.setString(9,"READ");

      DbaObj.Conn.setAutoCommit(true) ;
      prestmt.executeUpdate();
      DbaObj.Conn.commit();

  }
  catch(Exception e)
  {
      System.out.println(e.toString());
  }
  finally
  {
      prestmt.close();
  }
  DbaObj.CloseConnection() ;
}
else
{
  out.println("OpenDatabase Error") ;
}
response.sendRedirect("DocumentList.jsp");
%>