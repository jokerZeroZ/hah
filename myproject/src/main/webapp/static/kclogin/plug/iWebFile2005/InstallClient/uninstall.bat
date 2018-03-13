Set msys=System32
if "%PROCESSOR_ARCHITECTURE%" == "x86" Set msys=System32
if "%PROCESSOR_ARCHITECTURE%" == "AMD64" Set msys=SysWOW64
regsvr32 %windir%\%msys%\iWebFile2005.ocx "-u"