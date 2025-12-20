@echo off
setlocal

REM =========================================================
REM Configuration Variables
REM ---------------------------------------------------------
REM OFFICIAL_URL is the GitHub-hosted public version
set "OFFICIAL_URL=https://jehovahsays.github.io/mev/"
REM LOCAL_URL should be set by the user if they run a local server (e.g., PHP -S localhost:8080)
set "LOCAL_URL=http://localhost:8080/"
REM =========================================================

:MENU
CLS
ECHO.
ECHO ****************************************************
ECHO * MEV Wiki CLI Launcher *
ECHO ****************************************************
ECHO.
ECHO   1. Visit Official Hosted Website (GitHub)
ECHO   2. Visit Local Web Server (e.g. http://localhost:8080)
ECHO   3. Change Local Server URL
ECHO   4. Exit Tool
ECHO.
ECHO Current Local URL: %LOCAL_URL%
ECHO.
SET /P CHOICE=Enter your choice (1, 2, 3, or 4): 

IF "%CHOICE%"=="1" GOTO VISIT_OFFICIAL
IF "%CHOICE%"=="2" GOTO VISIT_LOCAL
IF "%CHOICE%"=="3" GOTO CHANGE_LOCAL_URL
IF "%CHOICE%"=="4" GOTO END
GOTO INVALID

:VISIT_OFFICIAL
ECHO Opening official website: %OFFICIAL_URL%
start %OFFICIAL_URL%
GOTO END

:VISIT_LOCAL
ECHO Opening local server website: %LOCAL_URL%
start %LOCAL_URL%
GOTO END

:CHANGE_LOCAL_URL
ECHO.
ECHO Enter the new local server address (e.g., http://127.0.0.1:8000/):
SET /P NEW_URL=New Local URL: 
IF NOT "%NEW_URL%"=="" (
    set "LOCAL_URL=%NEW_URL%"
    ECHO.
    ECHO Local URL updated successfully to: %LOCAL_URL%
) ELSE (
    ECHO.
    ECHO Invalid input. Keeping old URL.
)
timeout /t 2 /nobreak > nul
GOTO MENU

:INVALID
ECHO.
ECHO Invalid selection. Please choose 1, 2, 3, or 4.
timeout /t 2 /nobreak > nul
GOTO MENU

:END
ECHO.
ECHO Thank you for using the tool.
pause
exit

