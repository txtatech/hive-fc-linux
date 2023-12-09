#!/bin/bash

# Start
python3 hive_file_chunkerV2.py

# Wait
wait

# Start
bash ./create_html.sh

# Wait
wait

chromium %U --user-data-dir="~/chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials --allow-file-access-from-files --allow-insecure-localhost ./start.html

# Start
echo Done!

# Wait
wait


