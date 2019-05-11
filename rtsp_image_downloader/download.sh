#!/bin/bash
filename="./data/"$(date "+%Y.%m.%d-%H.%M.%S")."jpg"
ffmpeg -y -i rtsp://192.168.42.1/live -vframes 1 $filename
