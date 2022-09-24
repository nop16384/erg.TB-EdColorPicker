#!/bin/bash

#	sample:
#	-------
#	TB-EdColorPicker__tb-91.04.01--v-010__omni.ja.zip

echo "-----------------"
echo "build-assets.bash"
echo "-----------------"

#	------------------------------------------------------------------------------------------------

echo "(inf)sourcing release file"
source "release.include.bash"

if [[ -z "${TbVersionNum}" ]] ; then
  echo "(err)no TB version given - exiting"
  exit 1
fi

if [[ -z "${LpcVersionNum}" ]] ; then
  echo "(err)no LPC version given - exiting"
  exit 1
fi

TbVersionStr="tb-${TbVersionNum}"
LpcVersionStr="v-${LpcVersionNum}"

Version="${TbVersionStr}--${LpcVersionStr}"
echo "(inf)Version [${Version}]"

#	------------------------------------------------------------------------------------------------messengercompose.xhtml

echo "(inf)>Building 2-files zip archive"

zip -q9XD "TB-EdColorPicker__${Version}__3-files.zip" "omni/chrome/messenger/content/messenger/messengercompose/EdColorPicker.xhtml" "omni/chrome/messenger/content/messenger/messengercompose/EdColorPicker.js" "omni/chrome/messenger/content/messenger/messengercompose/.xhtml"

#	------------------------------------------------------------------------------------------------
echo "(inf)>Building omni.ja 7z archive"

Name="TB-EdColorPicker__${Version}__omni.ja.zip"

if [[ -f "${Name}" ]] ; then
  echo "(inf)  removing existing file"
  rm -f "${Name}"
fi

echo "(inf)  cd in omni"
cd omni

echo "(inf)  creating archive..."
echo -ne "\e[33m"
zip -qr9XD "../${Name}" *
echo -ne "\e[0m"

echo "(inf)  cd .."
cd ..

