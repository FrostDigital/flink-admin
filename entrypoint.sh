#!/bin/sh

# Create the env-config.js file
cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = {
  APIURL: "$APIURL",
  APPNAME: "$APPNAME",
  // Add more environment variables here
};
EOF

# Start Nginx
nginx -g "daemon off;"
