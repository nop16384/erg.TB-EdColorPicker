#!/bin/bash
# **************************************************************************************************
source "${ERG__PATH_BINARIES}/build-tools/erg.build-tools_main.bash"

erg_bt__vars_import
# **************************************************************************************************
Types="pink red orange yellow brown green cyan blue purple white grey"
declare -a RawArray

echo -n '' > "css-colors.js"
echo -n '' > "css-colors.xhtml"

n=0

Spc="              "

for Type in ${Types} ; do

  erg_bt__msg "Processing type [${Type}]"

  xhtml=""
  xhtml="${Spc}<menu label=\"${Type}\">\n"
  xhtml="${xhtml}${Spc}  <menupopup"
  xhtml="${xhtml} id=\"erg_LPC_menu_${Type}\""
  xhtml="${xhtml} style=\"font-size:11px;\">\n"

  File="css-colors-147-${Type}--raw.txt"

  while read -r -a RawArray  ; do

    vname=$( echo "${RawArray[0]}" | tr '[:upper:]' '[:lower:]' )
    vhex="#${RawArray[1]}${RawArray[2]}${RawArray[3]}"
    vtype="${Type}"

    s="gErgEcp.Colors.Css[${n}]=new ErgEcpCssColor(\"${vhex}\", \"${vname}\", \"${vtype}\")"

    n=$(( n + 1 ))

    echo -e "${s}" >> "css-colors.js"

    xhtml="${xhtml}${Spc}    <menuitem"
            xhtml="${xhtml} label=\"${vname}\""
            xhtml="${xhtml} value=\"${vhex}\""
            xhtml="${xhtml} style=\"background-color:${vhex}\""
            xhtml="${xhtml} />\n"

  done < "${File}"

  xhtml="${xhtml}${Spc}  </menupopup>\n"
  xhtml="${xhtml}${Spc}</menu>\n"

  echo -e "${xhtml}" >> "css-colors.xhtml"

done


