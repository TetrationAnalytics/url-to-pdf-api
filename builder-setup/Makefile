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

.PHONY: build
build: prepare
	ansible-playbook $(HOME_DIR)/pdf-printer-build/builder-setup/ansible/playbooks/pdf_printer_build_pkgr.yml -i $(HOME_DIR)/pdf-printer-build/builder-setup/ansible/inventory/builder -v -e "build_version=${VERSION}" -c local

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
		--vendor Tetration \
    --maintainer 'Cisco Tetration Analytics' \
		--description "$(DESCRIPTION)" \
		pdf-printer-$(VERSION)-$(TAG).tar.gz=/local/binaries/adhoc/pdf-printer-$(VERSION)-$(TAG).tar.gz

	pwd && ls

.PHONY: deliver
deliver:
	jfrog rt upload tetration_os_cspm_k9-$(VERSION)-1.noarch.rpm acceptance-local/pdf_printer/ --build-name=${JOB_NAME} --build-number=${BUILD_NUMBER} --flat=true --fail-no-op=true --props "commit=$(SHA)"
	jfrog rt build-publish ${JOB_NAME} ${BUILD_NUMBER}

.PHONY: sign-rpm
sign-rpm:
	sudo chown $(USER):$(USER) tetration_os_cspm_k9-$(VERSION)-1.noarch.rpm
	$(HOME)/sign-rpm.exp tetration_os_cspm_k9-$(VERSION)-1.noarch.rpm

.PHONY: promote
promote:
	jfrog rt cp "acceptance-local/pdf_printer/tetration_os_cspm_k9-$(VERSION)-1.noarch.rpm" union-local/

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
