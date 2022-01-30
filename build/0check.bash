#!/bin/bash

Version1="$1"
Version2="$2"

if [[ -z "${Version1}" ]] ; then

  echo "No version1 given, exiting"
  exit 1

fi
if [[ -z "${Version2}" ]] ; then

  echo "No version2 given, exiting"
  exit 1

fi


Jar1="omni-${Version1}.ja.o"
Jar2="omni-${Version2}.ja.o"

DirJar1="tmp/DirJar1"
DirJar2="tmp/DirJar2"

F1="chrome/messenger/content/messenger/messengercompose/EdColorPicker.xhtml"
F2="chrome/messenger/content/messenger/messengercompose/EdColorPicker.js"
F3="chrome/messenger/content/messenger/messengercompose/messengercompose.xhtml"

if [[ ! -f "${Jar1}" ]] ; then

  echo "File [${Jar1}] not found, exiting"
  exit 1

fi

if [[ ! -f "${Jar2}" ]] ; then

  echo "File [${Jar2}] not found, exiting"
  exit 1

fi

echo "Checking ${Jar1} vs ${Jar2}"

echo "  emptying tmp directory"
  rm -rf "tmp/*"

echo "  creating tmp directories"
  mkdir -p "${DirJar1}"
  mkdir -p "${DirJar2}"


echo "  extracting ${Jar1}"
  unzip "${Jar1}" -d "${DirJar1}"

echo "  extracting ${Jar2}"
  unzip "${Jar2}" -d "${DirJar2}"

echo "  comparing extracting ${Jar2}"
  diff -q -s "${DirJar1}/${F1}" "${DirJar2}/${F1}"
  diff -q -s "${DirJar1}/${F2}" "${DirJar2}/${F2}"
  diff -q -s "${DirJar1}/${F3}" "${DirJar2}/${F3}"



