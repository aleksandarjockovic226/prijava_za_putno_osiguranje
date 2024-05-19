# Use the official PHP 7.4 FPM image as a base
FROM php:7.4-fpm

# Install the necessary extensions
RUN docker-php-ext-install pdo pdo_mysql

# Set working directory
WORKDIR /var/www/html
