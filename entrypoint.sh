#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
    exec npm run dev
else
    exec npm run build && npm run serve
fi