#!/bin/sh

set -e -x

LOGS_DIR=/local/logs/tetration/pdf-printer

mkdir -p ${LOGS_DIR}
chown -R ${APP_USER}:${APP_GROUP} ${LOGS_DIR}

