Set msys=System32
if "%PROCESSOR_ARCHITECTURE%" == "x86" Set msys=System32
if "%PROCESSOR_ARCHITECTURE%" == "AMD64" Set msys=SysWOW64
copy iWebFile2005.ocx %windir%\%msys%\iWebFile2005.ocx /Y
regsvr32 %windir%\%msys%\iWebFile2005.ocx "-u" "-s"
regsvr32 %windir%\%msys%\iWebFile2005.ocx
