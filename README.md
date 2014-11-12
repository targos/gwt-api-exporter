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

-i, --input: Path to the GWT-generated html file  
-o, --output:    Path for the output file (default: output.js)  
-e, --exports:   Exported name of the API  
-p, --package:   Path to a package.json file (default: null). If a path is provided, the generated file will contain a line with some metadata like the build date, version number...
