@echo off
setlocal

:MENU
CLS
ECHO.
ECHO ****************************************************
ECHO * Website Management Tool (CLI Launcher) *
ECHO ****************************************************
ECHO.
ECHO   1. Visit Website (Open in Browser)
ECHO   2. Update Web Settings (Set localStorage Variables)
ECHO   3. Exit Tool
ECHO.
SET /P CHOICE=Enter your choice (1, 2, or 3): 

IF "%CHOICE%"=="1" GOTO VISIT
IF "%CHOICE%"=="2" GOTO UPDATE_WEB_SETTINGS
IF "%CHOICE%"=="3" GOTO END
GOTO INVALID

:VISIT
ECHO Opening website...
start https://jehovahsays.github.io/mev/
GOTO END

:UPDATE_WEB_SETTINGS
ECHO Launching website to initiate local storage update...
REM This command uses the query parameter ?action=cli_update to trigger JavaScript on the page
start https://jehovahsays.github.io/mev/?action=cli_update
GOTO END

:INVALID
ECHO.
ECHO Invalid selection. Please choose 1, 2, or 3.
timeout /t 2 /nobreak > nul
GOTO MENU

:END
ECHO.
ECHO Thank you for using the tool.
pause
exit
