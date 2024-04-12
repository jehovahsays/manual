@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Are you sure you want to UnInstall (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

:END

start "" /wait cmd /c "echo UnInstall Completed!&echo(&pause"

exit
