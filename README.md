gwt-api-exporter
================

Export a java API converted with GWT

installation
----------------

npm install

usage
----------------

node index.js -i 'path/to/xxx.cache.html'

options
----------------

-i, --input Path to the GWT-generated html file
-o, --output    Path for the output file (default: output.js)
-e, --exports   Exported name of the API