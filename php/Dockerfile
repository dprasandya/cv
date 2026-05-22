FROM php:7.4-apache

# Update repository dan install dependency untuk Firebird DAN Mcrypt
RUN apt-get update && apt-get install -y \
    firebird-dev \
    libfbclient2 \
    libmcrypt-dev \
    # Install Firebird
    && docker-php-ext-install pdo_firebird \
    # Install Mcrypt via PECL
    && pecl install mcrypt-1.0.4 \
    && docker-php-ext-enable mcrypt \
    # Bersihkan cache untuk memperkecil ukuran image
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Aktifkan mod_rewrite Apache
RUN a2enmod rewrite

WORKDIR /var/www/html

# (Jika Anda masih menggunakan COPY, biarkan baris ini)
# COPY ./html /var/www/html/
# RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html