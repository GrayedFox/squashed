#!/usr/bin/env bash

git rev-list $1 --not origin/develop --count
