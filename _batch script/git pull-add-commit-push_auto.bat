@echo off
cd ..
set "currentDate=%date%"
set "currentTime=%time%"

for /f "tokens=1-4 delims=/- " %%a in ("%currentDate%") do (
    set "year=%%a"
    set "month=00%%b"
    set "day=00%%c"
)

set month=%month:~-2%
set day=%day:~-2%
set "formattedDate=%year%-%month%-%day%"

for /f "tokens=1-3 delims=:., " %%a in ("%currentTime%") do (
    set "hour=00%%a"
    set "minute=00%%b"
    set "second=00%%c"
)

set hour=%hour:~-2%
set minute=%minute:~-2%
set second=%second:~-2%
set "formattedTime=%hour%:%minute%:%second%"

echo "[Comment]blog update at %formattedDate% T %formattedTime%"

@echo on
pause


git add -A
git commit -m "blog update at %formattedDate% T %formattedTime%"

pause

git push origin main
pause