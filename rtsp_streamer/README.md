# Fridgecam Streamer

A small tool to stream your Xiaomi 4k action camera on the web, plugin-free.
Fork of Foscam streamer

## Testing

- Set the `FRIDGECAM_STREAM_URL` environment variable:
    ```export FRIDGECAM_STREAM_URL=rtsp://192.168.42.1/live``` 
- Start the server with `node index.js`.
- Open the `test_client.html`.

## Watchdog

The watchdog will keep tailing the server log and restart the service if the log stops increasing in size (i.e. the camera is down).

- `python watchdog.py`

## Supervisor

It includes some supervisor configurations to run the server and the watchdog.

**IMPORTANT**: Make sure the absolute paths match your setup.

## Todo

- Absolute paths should be environment variables.
- Ports and other constants should be environment variables. 😴

## Credits

- Thanks to the creators and maintainers of https://www.npmjs.com/package/node-rtsp-stream and https://github.com/phoboslab/jsmpeg.

## Notes

This repository includes a copy of `node-rtsp-stream` for my convenience (I keep tweaking some ffmpeg parameters).