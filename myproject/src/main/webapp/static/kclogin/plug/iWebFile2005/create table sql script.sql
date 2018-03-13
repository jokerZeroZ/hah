/*
注意：要为使用上传文件插件的功能先建表；
   以下是  OA_FILEUPLOAD_PAPER 的create sql script   代表 记录PAPER（即信息报送 模块）的上传文件信息的表
举例： 如为知识库（KBM）建表，可以把PAPER替换为KBM，即 OA_FILEUPLOAD_KBM
*/

---drop table  OA_FILEUPLOAD_PAPER;   有必时就先删

create table OA_FILEUPLOAD_PAPER
(
  file_id         VARCHAR2(40) not null,
  file_name       VARCHAR2(150),
  file_type       VARCHAR2(30),
  serverfile_name VARCHAR2(200),
  file_extra      VARCHAR2(30),
  serverfile_path VARCHAR2(100),
  file_size       VARCHAR2(30),
  parentfile_id   VARCHAR2(30),
  user_id         VARCHAR2(30),
  depart_id       VARCHAR2(100),
  upload_time     DATE,
  is_share        VARCHAR2(30),
  is_systemcreate VARCHAR2(30),
  creatortime     DATE,
  attach_id       VARCHAR2(200),
  yearfolder      VARCHAR2(4),
  monthfolder     VARCHAR2(2)
);
comment on column OA_FILEUPLOAD_PAPER.file_id
  is '附件id';
comment on column OA_FILEUPLOAD_PAPER.file_name
  is '附件名称';
comment on column OA_FILEUPLOAD_PAPER.file_type
  is '附件类型';
comment on column OA_FILEUPLOAD_PAPER.file_extra
  is '附件扩展名称';
comment on column OA_FILEUPLOAD_PAPER.file_size
  is '附件大小';
comment on column OA_FILEUPLOAD_PAPER.creatortime
  is '创建时间';
comment on column OA_FILEUPLOAD_PAPER.attach_id
  is '关联附件ID';
comment on column OA_FILEUPLOAD_PAPER.yearfolder
  is '年度';
comment on column OA_FILEUPLOAD_PAPER.monthfolder
  is '月份';
alter table OA_FILEUPLOAD_PAPER
  add constraint PK_OA_FILEUPLOAD_PAPER primary key (FILE_ID);
