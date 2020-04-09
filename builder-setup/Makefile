DOCKER_REPOSITORY ?= artifacts.tet.wtf:6557
DOCKER_USERNAME ?= h4re1
DOCKER_PASSWORD := $$(cat ~/.jfrog/jfrog-cli.conf | jq -r '.artifactory | .[] | select(.serverId == "artifactory-sjc-b4") | .apiKey')
PDF_PRINTER_IMAGE ?= $(DOCKER_REPOSITORY)/pdf-printer
ITER ?= 1
DESCRIPTION ?= 'Tetration Compliance Report Printer'

all: build

HOME_DIR=/home/h4ci1
SHA=$(shell git rev-parse HEAD)

.PHONY: prepare
.ONESHELL:
prepare:
	sudo yum install -y ansible
	sudo yum install -y which
	sudo chown -R h4ci1:h4ci1 $(HOME_DIR)/pdf-printer-build
	sudo yum groupinstall -y "Development Tools"
	sudo yum install -y epel-release
	sudo yum -y update || echo ''
# http_proxy: http://proxy.esl.cisco.com:80
# https_proxy: http://proxy.esl.cisco.com:80
# no_proxy: tet.wtf,ocean.af,tetrationanalytics.com,localhost,127.0.0.1
.PHONY: build
build: prepare
	ansible-playbook $(HOME_DIR)/pdf-printer-build/builder-setup/ansible/playbooks/pdf_printer_build_pkgr.yml -i $(HOME_DIR)/pdf-printer-build/builder-setup/ansible/inventory/builder -v -e "build_version=${VERSION} no_proxy=${no_proxy} http_proxy=${http_proxy} https_proxy=${https_proxy}" -c local

.PHONY: rpm
rpm:
	fpm -C docker -s dir \
    --rpm-os linux  \
		-t rpm \
		-n tetration_os_cspm_k9 \
		-v $(VERSION) \
		--iteration $(ITER) \
		-x *.rpm \
		-x Dockerfile \
		-a noarch \
	  --depends 'tetration_os_adhoc_k9 >= $(VERSION)' \
		--vendor Tetration \
    --maintainer 'Cisco Tetration Analytics' \
		--description "$(DESCRIPTION)" \
		pdf-printer-$(VERSION)-$(TAG).tar.gz=/local/binaries/adhoc/pdf-printer-$(VERSION)-$(TAG).tar.gz \
    cspm-version=/local/binaries/cspm-version
	pwd && ls
  jfrog rt upload docker/pdf-printer-$(VERSION)-$(TAG).tar.gz acceptance-local/$(VERSION)/ --build-name=${JOB_NAME} --build-number=${BUILD_NUMBER} --flat=true --fail-no-op=true --props "commit=$(SHA)"

.PHONY: deliver
deliver:
	jfrog rt upload tetration_os_cspm_k9-$(VERSION)-1.noarch.rpm acceptance-local/$(VERSION)/ --build-name=${JOB_NAME} --build-number=${BUILD_NUMBER} --flat=true --fail-no-op=true --props "commit=$(SHA)"
	jfrog rt build-publish ${JOB_NAME} ${BUILD_NUMBER}

.PHONY: sign-rpm
sign-rpm:
	sudo chown $(USER):$(USER) tetration_os_cspm_k9-$(VERSION)-1.noarch.rpm
	$(HOME)/bin/rpm-sign.exp tetration_os_cspm_k9-$(VERSION)-1.noarch.rpm

.PHONY: promote
promote:
	jfrog rt cp "acceptance-local/pdf_printer/tetration_os_cspm_k9-$(VERSION)-1.noarch.rpm" union-local/

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
