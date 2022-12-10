#!/bin/bash

FILE_NAME=$1
TITLE=$2

if [ -e ${FILE_NAME} ];then
    echo Create to new article...
    
    touch ./posts/${FILE_NAME}.md

    ARTICLE_PATH=./posts/${FILE_NAME}.md

    echo --- >> ${ARTICLE_PATH}
    echo title: ${TITLE} >> ${ARTICLE_PATH}
    echo slug: ${FILE_NAME} >> ${ARTICLE_PATH}
    echo date: `date "+%Y-%m-%d %H:%M"` >> ${ARTICLE_PATH}
    echo --- >> ${ARTICLE_PATH}

    echo Created to ${FILE_NAME}.md!!
else
    echo Article already exists.
fi
