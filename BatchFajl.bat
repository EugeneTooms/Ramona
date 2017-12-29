@rem Neki komentar.
@echo off
call git.exe pull
ng build
start "" http://localhost:2000
nodemon bin\www
@pause