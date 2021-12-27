#!/bin/bash
# **************************************************************************************************
source "${ERG__PATH_BINARIES}/build-tools/erg.build-tools_main.bash"

erg_bt__init
# **************************************************************************************************
PARAM1="$1"

OptGenColors=""
OptExport=""
OptExportHelpers=""

DirExport="/home/sys/usr/local/Thunderbird"

TplFileXhtml="./src/EdColorPicker-template.xhtml"
TplFileJs="./src/EdColorPicker-template.js"
VersionFileTb="./notes/version-current-tb.txt"
VersionFileLpc="./notes/version-current-lpc.txt"
HelperFiles="./build/0brun-tb.bash ./build/0srun-tb.bash ./build/0build-assets.bash ./build/0check.bash"
HelperFiles="./build/0brun-tb.bash"

IFileCssXhtml="./res/css-colors.xhtml"
IFileCssJs="./res/css-colors.js"

TmpFileXhtml="./obj/tmp/EdColorPicker.xhtml"
TmpFileXhtml0="./obj/tmp/EdColorPicker.tmp0.xhtml"
TmpFileXhtml1="./obj/tmp/EdColorPicker.tmp1.xhtml"
TmpFileXhtml2="./obj/tmp/EdColorPicker.tmp2.xhtml"
TmpFileXhtml3="./obj/tmp/EdColorPicker.tmp3.xhtml"
TmpFileJs="./obj/tmp/EdColorPicker.js"

# Version
VersionTb=$( cat "${VersionFileTb}" )
VersionLpc=$( cat "${VersionFileLpc}" )
Version="TB-${VersionTb}--V-${VersionLpc}"

# Boxes sizing
LpcBoxSize=20
LpcRstSize=$(( LpcBoxSize * 5 + ( 5 - 1 ) * 4 ))
LpcPopSize=$(( LpcRstSize + 20 ))

LpcCssBoxSize="min-width:10px; max-width:20px; min-height:10px; max-height:20px;"
LpcCssRhaSize="width:${LpcRstSize}px;"
LpcCssPopSize="min-width:10px; width:${LpcPopSize}px; min-height:10px; max-height:124px;"
# ##################################################################################################
function  ecp_export__release_file
{
  # example :
  # TbVersionNum="91.04.01"
  # LpcVersionNum="011"
  erg_bt__msg "copying version file"

  echo -e "TbVersionNum=\"${VersionTb}\"\nLpcVersionNum=\"${VersionLpc}\"\n" > "${DirExport}/release.include.bash"
}

function  ecp_export__helpers
{
  erg_bt__msg "copying helpers"

  cp -f ${HelperFiles} "${DirExport}"
}

function  ecp_export__EdColorPicker_xhtml
{
  erg_bt__msg "copy xhtml file"
  cp "${TmpFileXhtml}" "${DirExport}/omni/chrome/messenger/content/messenger/messengercompose/EdColorPicker.xhtml"
}

function  ecp_export__EdColorPicker_js
{
  erg_bt__msg "copy js file"
  cp "${TmpFileJs}" "${DirExport}/omni/chrome/messenger/content/messenger/messengercompose/EdColorPicker.js"
}
# **************************************************************************************************
function  ecp_gen__EdColorPicker_xhtml
{
  # multiple tmp files are used for debugging purpose

  erg_bt__msg "generating EdColorPicker.xhtml"

  erg_bt__log_spc_inc

    erg_bt__msg     "inserting version"
    erg_bt__msg_cnt "inserting xhtml code"
    sed "s/__ERG_MARK_XHTML__VERSION__/${Version}/" "${TplFileXhtml}" > "${TmpFileXhtml0}"

    erg_bt__msg     "inserting CSS colors"
    erg_bt__msg_cnt "converting CSS color file for sed"
    CssXhtml=$( sed '$!s/$/\\n/'  "${IFileCssXhtml}" | tr -d '\n'  | sed 's/\//\\\//g' )
    #echo "${CssXhtml}"

    erg_bt__msg_cnt "inserting xhtml code"
    sed "s/__ERG_MARK_XHTML__CSS_COLORS__/${CssXhtml}/" "${TmpFileXhtml0}" > "${TmpFileXhtml1}"

    erg_bt__msg     "sizing the popup menu"
    erg_bt__msg_cnt "inserting xhtml code"
    sed "s/__ERG_MARK_XHTML__LPC_CSS_POP_SIZE__/${LpcCssPopSize}/" "${TmpFileXhtml1}" > "${TmpFileXhtml2}"

    erg_bt__msg     "sizing the Lpc boxes"
    erg_bt__msg_cnt "inserting xhtml code"
    sed "s/__ERG_MARK_XHTML__LPC_CSS_BOX_SIZE__/${LpcCssBoxSize}/" "${TmpFileXhtml2}" > "${TmpFileXhtml3}"

    erg_bt__msg     "sizing the reset / help / about buttons"
    erg_bt__msg_cnt "inserting xhtml code"
    sed "s/__ERG_MARK_XHTML__LPC_CSS_RHA_SIZE__/${LpcCssRhaSize}/" "${TmpFileXhtml3}" > "${TmpFileXhtml}"

  erg_bt__log_spc_dec

}
function  ecp_gen__EdColorPicker_js
{
  erg_bt__msg     "generating EdColorPicker.js"

  erg_bt__msg_cnt "converting file for sed"
  CssJs=$( sed '$!s/$/\\n/'  "${IFileCssJs}" | tr -d '\n'  | sed 's/\//\\\//g' )

  erg_bt__msg_cnt "inserting js code"
  sed "s/__ERG_MARK_JS__CSS_COLORS__/${CssJs}/" "${TplFileJs}" > "${TmpFileJs}"
}
# ##################################################################################################
for Opt in "$@" ; do

  if [[ "${Opt}" == "--gencolors"       ]]  ; then OptGenColors="1"       ; fi
  if [[ "${Opt}" == "--export"          ]]  ; then OptExport="1"          ; fi
  if [[ "${Opt}" == "--export-helpers"  ]]  ; then OptExportHelpers="1"   ; fi

done
# **************************************************************************************************
if [[ "${OptGenColors}" == "1" ]] ; then

  erg_bt__msg "generating colors (.js & .xhtml )"

    erg_bt__log_spc_inc
    erg_bt__vars_export
    cd res
    chmod u=rwx "css-colors--generate.bash"
    ./css-colors--generate.bash
    cd ../
    erg_bt__vars_import
    erg_bt__log_spc_dec

fi

if [[ "${OptExportHelpers}" == "1" ]] ; then

  ecp_export__helpers

fi

if [[ "${OptExport}" == "1" ]] ; then

  ecp_gen__EdColorPicker_js

  ecp_gen__EdColorPicker_xhtml

  ecp_export__release_file

  ecp_export__EdColorPicker_xhtml

  ecp_export__EdColorPicker_js

fi
