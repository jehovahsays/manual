@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Are you sure you want to Install (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO start

:start
start http://morgansbyers.scienceontheweb.net/core/

exit
