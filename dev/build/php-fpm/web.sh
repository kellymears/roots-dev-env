#!/bin/bash

##
# Acorn
##
cd /acorn

composer install

##
# Bedrock
##
cd /bedrock

composer install

wp core install \
    --url=$WP_HOME \
    --title=roots \
    --admin_user=admin \
    --admin_email=admin@example.com \
    --admin_password=password

##
# Sage
##
cd /bedrock/web/app/themes/sage
ln -s /acorn vendor/roots/acorn

composer install

cd /bedrock

wp theme activate sage
