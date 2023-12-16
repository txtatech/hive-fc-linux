v86-NodeVM is from: https://github.com/superdinmc/v86-NodeVM

All required files are included in this repo.

The main entry point:

start.html


NOTES:

To chunk files located in the 'inputs' folder into JSON use:

hive_file_chunkerV2.py

This is not required but to test the integrity of the chunked files do:

hive_file_dechunkerV2.py

To create an html containing all chunked JSON files:

create_html.sh

The resulting JSON chunks are stored here:

chunky.html

Decode chunky.html with:

hive_file_chunky_decoder.py

Launch linux in node with:

start_node_chunky.py