#!/usr/bin/env bash

cd $(dirname $0)


if [ ! -d venv ]; then
    echo "Django環境が作られていません。作ります。"
    make server
fi

if [ ! -d webpack/node_modules ]; then
    echo "Webpack環境が作られていません。作ります。"
    make client
fi

. venv/bin/activate
cd django_vue_demo
./manage.py runserver &
django_pid=$?
cd ../webpack
bash -c "sleep 2s; open http://127.0.0.1:8080" &
npm run devserver
kill ${django_pid}
