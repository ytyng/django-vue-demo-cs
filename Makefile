venv:
	python3.6 -m venv venv

printemail:
	echo $(shell git config --get user.email)

adminuser:
	cd django_vue_demo; \
	./manage.py createsuperuser --username=admin --email=$(shell git config --get user.email)

server:
	python3.6 -m venv venv
	. venv/bin/activate; \
	pip install -r requirements/base.txt; \
	cd django_vue_demo; \
	./manage.py migrate; \
	./manage.py make_random_products; \
	./manage.py createsuperuser --username=admin --email=$(shell git config --get user.email)

client:
	cd webpack; \
	npm install;

reset:
	rm -rf venv
	rm django_vue_demo/db.sqlite3
	rm -rf webpack/node_modules
