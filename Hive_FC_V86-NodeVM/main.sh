#!/bin/bash

# Start
python3 hive_file_chunkerV2.py

# Wait
wait

# Start
bash ./create_html.sh

# Wait
wait

# Start
python3 hive_file_chunky_decoder.py

# Start
echo Done!

# Start
python3 start_node_chunky.py

# Wait
wait


