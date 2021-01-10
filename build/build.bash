#!/bin/bash

TplFileXhtml="./src/EdColorPicker-template.xhtml"
TplFileJs="./src/EdColorPicker-template.js"

IFileXhtml="./res/css-colors.xhtml"
IFileJs="./res/css-colors.js"

TmpFileXhtml="./tmp/EdColorPicker.xhtml"
TmpFileJs="./tmp/EdColorPicker.js"

echo "> generating colors .js & .xhtml"
cd res
./css-colors--generate-js.bash
cd ../

echo "> generating xhtml file"

echo " ...converting file fore sed"
CssXhtml=$( sed '$!s/$/\\n/'  "${IFileXhtml}" | tr -d '\n'  | sed 's/\//\\\//g' )
#echo "${CssXhtml}"

echo " ...inserting xhtml code"
sed "s/__ERG_MARK__CSS_COLORS_XHTML_01__/${CssXhtml}/" "${TplFileXhtml}" > "${TmpFileXhtml}"

echo " ...copy xhtml file"
cp "${TmpFileXhtml}" "/home/sys/usr/local/Thunderbird/omni/chrome/messenger/content/messenger/messengercompose/EdColorPicker.xhtml"



echo "> generating js file"

echo " ...converting file fore sed"
CssJs=$( sed '$!s/$/\\n/'  "${IFileJs}" | tr -d '\n'  | sed 's/\//\\\//g' )
#echo "${CssJs}"

echo " ...inserting js code"
sed "s/__ERG_MARK__CSS_COLORS_JS_01__/${CssJs}/" "${TplFileJs}" > "${TmpFileJs}"

echo " ...copy xhtml file"
cp "${TmpFileJs}" "/home/sys/usr/local/Thunderbird/omni/chrome/messenger/content/messenger/messengercompose/EdColorPicker.js"
