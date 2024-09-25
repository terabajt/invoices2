#!/bin/bash

# Pobranie wartości zmiennych z pliku .secrets
ENV_FILE=$(grep ENV_FILE .secrets | cut -d '"' -f2)
AWS_ACCESS_KEY_ID=$(grep AWS_ACCESS_KEY_ID .secrets | cut -d '=' -f2)
AWS_SECRET_ACCESS_KEY=$(grep AWS_SECRET_ACCESS_KEY .secrets | cut -d '=' -f2)

# Uruchomienie polecenia act z przekazanymi zmiennymi
act -s ENV_FILE="$ENV_FILE" -s AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" -s AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY"