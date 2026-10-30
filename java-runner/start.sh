#!/bin/sh
# Virtual display for Swing programs, then the runner itself.
Xvfb :99 -screen 0 1280x800x24 -nolisten tcp >/dev/null 2>&1 &
export DISPLAY=:99
exec java -Xmx256m -XX:+UseSerialGC -XX:TieredStopAtLevel=1 -cp /app/runner.jar Runner
