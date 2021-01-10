#!/bin/bash

Types="pink red orange yellow brown green cyan blue purple white grey"
declare -a RawArray

echo -n '' > "css-colors.js"
echo -n '' > "css-colors.xhtml"

n=0

Spc="              "

for Type in ${Types} ; do

  echo "Processing type [${Type}]"

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

    s="gErgEcpColors[${n}]=new ErgEcpColor(\"${vname}\", \"${vhex}\", \"${vtype}\")"

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


