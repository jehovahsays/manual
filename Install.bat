@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Are you sure you want to Install (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO start

:start
start https://jehovahsays.github.io/root/

exit
