#!/bin/bash

curl --silent --show-error https://getcomposer.org/installer | php \
  && chmod +x composer.phar \
  && mv composer.phar /usr/bin/composer \
  && composer -v

curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
php wp-cli.phar --info
chmod +x wp-cli.phar
mv wp-cli.phar /usr/local/bin/wp
