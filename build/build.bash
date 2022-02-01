#!/bin/bash
# **************************************************************************************************
source "${ERG__PATH_BINARIES}/build-tools/erg.build-tools_main.bash"

erg_bt__init
# **************************************************************************************************
OptGenColors=""
OptExport=""
OptExportHelpers=""
OptBldType="R"
OptBldMC="org"

DirExport="/home/sys/usr/local/Thunderbird"

# Debug / Release
declare -A BldType;
BldType["R"]="const gErgEcp__BUILD_TYPE = \"R\";"
BldType["D"]="const gErgEcp__BUILD_TYPE = \"D\";"

# Get Versions
VersionFileTb="./src/version-current-tb.txt"
VersionFileLpc="./src/version-current-lpc.txt"
VersionFileMCXhtml="./src/version-current-mcxhtml.txt"

VersionTb=$( cat "${VersionFileTb}" )
VersionLpc=$( cat "${VersionFileLpc}" )
VersionMCXhtml=$( cat "${VersionFileMCXhtml}" )
Version="TB-${VersionTb}--V-${VersionLpc}"

TplFileMCXhtml=""
TplFileMCXhtml_erg="./src/messengercompose-template.xhtml"
TplFileMCXhtml_org="./src/messengercompose-${VersionMCXhtml}.xhtml"
TplFileXhtml="./src/EdColorPicker-template.xhtml"
TplFileJs="./src/EdColorPicker-template.js"

HelperFiles="./build/0brun-tb.bash ./build/0srun-tb.bash ./build/0build-assets.bash ./build/0check.bash"

IFileCssXhtml="./res/css-colors.xhtml"
IFileCssJs="./res/css-colors.js"

TmpFileMCXhtml="./obj/tmp/messengercompose.xhtml"
TmpFileXhtml0="./obj/tmp/EdColorPicker.tmp0.xhtml"
TmpFileXhtml1="./obj/tmp/EdColorPicker.tmp1.xhtml"
TmpFileXhtml2="./obj/tmp/EdColorPicker.tmp2.xhtml"
TmpFileXhtml3="./obj/tmp/EdColorPicker.tmp3.xhtml"
TmpFileXhtml="./obj/tmp/EdColorPicker.xhtml"

TmpFileJs0="./obj/tmp/EdColorPicker.tmp0.js"
TmpFileJs="./obj/tmp/EdColorPicker.js"

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

function  ecp_export__messengercompose_xhtml
{
  erg_bt__msg "copy messengercompose.xhtml file"
  cp "${TmpFileMCXhtml}" "${DirExport}/omni/chrome/messenger/content/messenger/messengercompose/messengercompose.xhtml"
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
function  ecp_gen__messengercompose_xhtml
{
  local f
  # ................................................................................................
  erg_bt__msg "generating messengercompose.xhtml"

  erg_bt__log_spc_inc

  if [[ "${OptBldMC}" == "erg" ]] ; then
    TplFileMCXhtml="${TplFileMCXhtml_erg}"
  else
    TplFileMCXhtml="${TplFileMCXhtml_org}"
  fi

  cp  "${TplFileMCXhtml}" "${TmpFileMCXhtml}"

  erg_bt__log_spc_dec
}

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
  local s;
  # ................................................................................................
  eval "s=\${BldType[${OptBldType}]}"

  erg_bt__msg     "generating EdColorPicker.js"

  erg_bt__log_spc_inc

    erg_bt__msg     "inserting build type"
    erg_bt__msg_cnt "inserting build type js code"
    sed "s/__ERG_MARK_JS__BUILD_TYPE__/${BldType[${OptBldType}]}/" "${TplFileJs}" > "${TmpFileJs0}"

    erg_bt__msg     "inserting css colors"
    erg_bt__msg_cnt "converting css-colors file for sed"
    CssJs=$( sed '$!s/$/\\n/'  "${IFileCssJs}" | tr -d '\n'  | sed 's/\//\\\//g' )
    erg_bt__msg_cnt "inserting css-colors js code"
    sed "s/__ERG_MARK_JS__CSS_COLORS__/${CssJs}/" "${TmpFileJs0}" > "${TmpFileJs}"

  erg_bt__log_spc_dec
}
# ##################################################################################################
for Opt in "$@" ; do

  if [[ "${Opt}" == "--buildR"          ]]  ; then OptBldType="R"         ; fi
  if [[ "${Opt}" == "--buildD"          ]]  ; then OptBldType="D"         ; fi
  if [[ "${Opt}" == "--buildMC"         ]]  ; then OptBldMC="erg"         ; fi
  if [[ "${Opt}" == "--gencolors"       ]]  ; then OptGenColors="1"       ; fi
  if [[ "${Opt}" == "--export"          ]]  ; then OptExport="1"          ; fi
  if [[ "${Opt}" == "--export-helpers"  ]]  ; then OptExportHelpers="1"   ; fi

done
# **************************************************************************************************
if [[ "${OptBldType}" == "R" ]] ; then
  erg_bt__msg "build type: *** RELEASE ***"
else
  erg_bt__msg "build type:*** DEBUG ***"
fi

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

  ecp_gen__messengercompose_xhtml

  ecp_export__release_file

  ecp_export__EdColorPicker_xhtml

  ecp_export__EdColorPicker_js

  ecp_export__messengercompose_xhtml

fi
