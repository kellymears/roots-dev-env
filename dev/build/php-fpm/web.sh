#!/bin/bash

cd /acorn
git checkout $acorn_branch
composer install

cd /support
composer install

cd /bedrock
composer install
wp core install \
    --url=$WP_HOME \
    --title=roots \
    --admin_user=admin \
    --admin_email=admin@example.com \
    --admin_password=password

cd /bedrock/web/app/themes/sage
ln -s /support vendor/roots/support
ln -s /acorn vendor/roots/acorn
composer install
wp theme activate sage
