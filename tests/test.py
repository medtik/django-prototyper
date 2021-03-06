from fabric.api import local, lcd
import os


local('ls -al')

local('python main.py /tmp/project1 --build')

with lcd('/tmp/project1/project1'):
    local('./manage.py check')
    local('./manage.py migrate --run-syncdb')
