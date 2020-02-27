ARG BASE_IMAGE=artifacts.tet.wtf:6557/pdf-printer-base:latest
FROM $BASE_IMAGE

ARG RPM_VERSION

USER root
WORKDIR /opt/pdf_printer

#TODO: Move this step to base image
RUN apt-get update && apt-get install -yq  alien dpkg-dev debhelper build-essential

ENV NODE_ENV=development
ENV PDF_PORT=19090
ENV PDF_ALLOW_HTTP=true
ENV PDF_BASEHOST=localhost:3000
ENV PDF_PROTOCOL=http
ENV PDF_USERNAME_SELECTOR=#h4_user_email
ENV PDF_PASSWD_SELECTOR=#h4_user_password
ENV PDF_SIGN_IN_SELECTOR=[name=commit]
ENV PDF_AUTH_PATH=h4_users/sign_in
ENV PDF_ALLOW_UNKNOWN_BODY=true
ENV PDF_HDFS_USER=root
ENV PDF_HDFS_HOST=localhost
ENV PDF_HDFS_PORT=9870
ENV PDF_HDFS_PATH=/external/apps/compliance/
ENV PDF_IGNORE_HTTPS_ERRORS=true
ENV PDF_DEBUG_MODE=false

COPY pdf_printer-$RPM_VERSION-1.x86_64.rpm ./

# Use alien command instead
RUN alien -i  pdf_printer-1.0.0-1.x86_64.rpm
RUN rm pdf_printer-1.0.0-1.x86_64.rpm

EXPOSE 19090
CMD ["/usr/local/bin/npm", "start"]

