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


The following javascript file is for handling blob urls:

blobHandler.js


This is used to handle gzip compression.

pako_inflate.min.js

It can be found here: https://unpkg.com/pako@0.2.7/dist/pako_inflate.min.js
