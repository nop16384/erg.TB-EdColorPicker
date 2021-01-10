/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* import-globals-from ../editorUtilities.js */
/* import-globals-from EdDialogCommon.js */

// Cancel() is in EdDialogCommon.js

//  ################################################################################################
function ErgEcpColor(_i_name, _i_hex, _i_type)
{
  this.name   = _i_name;
  this.hex    = _i_hex;

  if ( _i_type == undefined )
  {
    this.type = ""
  }
  else
  {
    this.type   = _i_type;
  }
}

function  erg_init_colors_array()
{
__ERG_MARK__CSS_COLORS_JS_01__
}
//  ################################################################################################
var insertNew = true;
var tagname = "TAG NAME";
var gColor = "";
var LastPickedColor = "";
var ColorType = "Text";
var TextType = false;
var HighlightType = false;
var TableOrCell = false;
var NoDefault = false;
var gColorObj;

var     erg_LPC_box;
var     erg_LPC_bt_lpc;
var     erg_LPC_menulist;
var     erg_LPC_grid;
var     erg_LPC_grid_rows;
var     erg_LPC_menupopup;

var     erg_LPC_input;

var     gErgEcpColors = new Array();

const   eErgColorValidity = {"Y":1, "P":2, "N":3 };
Object.freeze(eErgColorValidity)

// dialog initialization code

document.addEventListener("dialogaccept", onAccept);
document.addEventListener("dialogcancel", onCancelColor);

function Startup() {
  if (!window.arguments[1]) {
    dump("EdColorPicker: Missing color object param\n");
    return;
  }

  // window.arguments[1] is object to get initial values and return color data
  gColorObj = window.arguments[1];
  gColorObj.Cancel = false;

  gDialog.ColorPicker = document.getElementById("ColorPicker");
  gDialog.ColorInput = document.getElementById("ColorInput");
    // ERG+
    //      gDialog.LastPickedButton = document.getElementById("LastPickedButton");
    //      gDialog.LastPickedColor = document.getElementById("LastPickedColor");
    // ERG-
  gDialog.CellOrTableGroup = document.getElementById("CellOrTableGroup");
  gDialog.TableRadio = document.getElementById("TableRadio");
  gDialog.CellRadio = document.getElementById("CellRadio");
  gDialog.ColorSwatch = document.getElementById("ColorPickerSwatch");
  gDialog.Ok = document.querySelector("dialog").getButton("accept");

    erg_LPC_box             =   document.getElementById("erg_LPC_box");
    erg_LPC_bt_lpc          =   document.getElementById("erg_LPC_bt_lpc");
    erg_LPC_menulist        =   document.getElementById("erg_LPC_menulist");
    erg_LPC_grid            =   document.getElementById("erg_LPC_grid");
    erg_LPC_grid_rows       =   document.getElementById("erg_LPC_grid_rows");
    erg_LPC_menupopup       =   document.getElementById("erg_LPC_menupopup");
    erg_LPC_ml_named_colors =   document.getElementById("erg_LPC_ml_named_colors");

    erg_LPC_bt_inp          =   document.getElementById("erg_LPC_bt_inp");

    erg_LPC_menu_red        =   document.getElementById("erg_LPC_menu_red");
    erg_LPC_menu_pink       =   document.getElementById("erg_LPC_menu_pink");

    erg_init_colors_array();
    //mi = document.createElement("menuitem");
    //mi.setAttribute("label", "abcdef");
    //erg_LPC_menu_red.appendChild(mi);

    erg_LPC_input       =   document.getElementById("ColorInput");

    //erg_LPC_menulist.setAttribute("pickedColors", "");

    console.log("Startup():s[" + erg_LPC_menulist.getAttribute("pickedColors") + "]");

    erg_LPC_lpc_update_xul_grid();

    erg_LPC_menulist.setAttribute("label", "Last-picked colors");
    erg_LPC_ml_named_colors.setAttribute("label", "CSS colors");

  // The type of color we are setting:
  //  text: Text, Link, ActiveLink, VisitedLink,
  //  or background: Page, Table, or Cell
  if (gColorObj.Type) {
    ColorType = gColorObj.Type;
    // Get string for dialog title from passed-in type
    //   (note constraint on editor.properties string name)
    let IsCSSPrefChecked = Services.prefs.getBoolPref("editor.use_css");

    if (GetCurrentEditor()) {
      if (ColorType == "Page" && IsCSSPrefChecked && IsHTMLEditor()) {
        document.title = GetString("BlockColor");
      } else {
        document.title = GetString(ColorType + "Color");
      }
    }
  }

  gDialog.ColorInput.value = "";
  var tmpColor;
  var haveTableRadio = false;

  switch (ColorType) {
    case "Page":
      tmpColor = gColorObj.PageColor;
      if (tmpColor && tmpColor.toLowerCase() != "window") {
        gColor = tmpColor;
      }
      break;
    case "Table":
      if (gColorObj.TableColor) {
        gColor = gColorObj.TableColor;
      }
      break;
    case "Cell":
      if (gColorObj.CellColor) {
        gColor = gColorObj.CellColor;
      }
      break;
    case "TableOrCell":
      TableOrCell = true;
      document.getElementById("TableOrCellGroup").collapsed = false;
      haveTableRadio = true;
      if (gColorObj.SelectedType == "Cell") {
        gColor = gColorObj.CellColor;
        gDialog.CellOrTableGroup.selectedItem = gDialog.CellRadio;
        gDialog.CellRadio.focus();
      } else {
        gColor = gColorObj.TableColor;
        gDialog.CellOrTableGroup.selectedItem = gDialog.TableRadio;
        gDialog.TableRadio.focus();
      }
      break;
    case "Highlight":
      HighlightType = true;
      if (gColorObj.HighlightColor) {
        gColor = gColorObj.HighlightColor;
      }
      break;
    default:
      // Any other type will change some kind of text,
      TextType = true;
      tmpColor = gColorObj.TextColor;
      if (tmpColor && tmpColor.toLowerCase() != "windowtext") {
        gColor = gColorObj.TextColor;
      }
      break;
  }

  // Set initial color in input field and in the colorpicker
  erg_LPC_set_current_color(gColor);
  gDialog.ColorPicker.value = gColor;

  // Use last-picked colors passed in, or those persistent on dialog
  if (TextType) {
    if (!("LastTextColor" in gColorObj) || !gColorObj.LastTextColor) {
        // ERG+
        //    gColorObj.LastTextColor = gDialog.LastPickedColor.getAttribute(
        //    "LastTextColor"
        //    );
        gColorObj.LastTextColor = erg_LPC_box.getAttribute("LastTextColor");
        // ERG-
    }
    LastPickedColor = gColorObj.LastTextColor;
  } else if (HighlightType) {
    if (!("LastHighlightColor" in gColorObj) || !gColorObj.LastHighlightColor) {
        // ERG+
        //      gColorObj.LastHighlightColor = gDialog.LastPickedColor.getAttribute(
        //      "LastHighlightColor"
        //      );
        gColorObj.LastTextColor = erg_LPC_box.getAttribute("LastHighlightColor");
        // ERG-
    }
    LastPickedColor = gColorObj.LastHighlightColor;
  } else {
    if (
      !("LastBackgroundColor" in gColorObj) ||
      !gColorObj.LastBackgroundColor
       ) {
            // ERG+
            //      gColorObj.LastBackgroundColor = gDialog.LastPickedColor.getAttribute(
            //      "LastBackgroundColor"
            //      );
            gColorObj.LastBackgroundColor = erg_LPC_box.getAttribute("LastBackgroundColor");
            // ERG-
    }
    LastPickedColor = gColorObj.LastBackgroundColor;
  }

  // Set method to detect clicking on OK button
  //  so we don't get fooled by changing "default" behavior
  //gDialog.Ok.setAttribute("onclick", "SetDefaultToOk()");

  if ( ! LastPickedColor )
  {
    console.log("Startup():!LastPickedColor");
    alert("Startup():!LastPickedColor");
    // Hide the button, as there is no last color available.
    // ERG+
    //      gDialog.LastPickedButton.hidden = true;
    // ERG-
  } else
  {
    // ERG+
    //      gDialog.LastPickedColor.setAttribute(
    //      "style",
    //      "background-color: " + LastPickedColor
    //      );
    erg_LPC_bt_lpc.style.setProperty("background-color", LastPickedColor);
    erg_LPC_bt_lpc.setAttribute("bgColHex", LastPickedColor);

    erg_LPC_lpc_update_colors_list(LastPickedColor);
    erg_LPC_lpc_update_xul_grid();

    // ERG-

    // Make "Last-picked" the default button, until the user selects a color.
    //gDialog.Ok.removeAttribute("default");
    // ERG+
    //      gDialog.LastPickedButton.setAttribute("default", "true");
    //erg_LPC_bt_lpc.setAttribute("default", "true");
    // ERG-
  }

  // Caller can prevent user from submitting an empty, i.e., default color
  NoDefault = gColorObj.NoDefault;
  if (NoDefault) {
    // Hide the "Default button -- user must pick a color
    document.getElementById("DefaultColorButton").collapsed = true;
  }

  // Set focus to colorpicker if not set to table radio buttons above
  if (!haveTableRadio) {
    gDialog.ColorPicker.focus();
  }

  SetWindowLocation();
}
//  ################################################################################################
function SelectColor() {
  var color = gDialog.ColorPicker.value;
  if (color) {
    erg_LPC_set_current_color(color);
  }
}

function RemoveColor() {
  erg_LPC_set_current_color("");
  gDialog.ColorInput.focus();
  //SetDefaultToOk();
}

function SelectColorByKeypress(aEvent) {
  if (aEvent.charCode == aEvent.DOM_VK_SPACE) {
    SelectColor();
    //SetDefaultToOk();
  }
}

function erg_LPC_set_current_color(color)
{
  // TODO: Validate color?

  let c = gColor;

  if ( !color )
  {
    color = "";
  }

  gColor = TrimString(color).toLowerCase();

  if ( gColor == "mixed" )
  {
    gColor = "";
  }

  erg_LPC_set_color_swatch(gColor);

  console.log("erg_LPC_set_current_color():gColor[" + c + "] -- > [" + gColor + "]");
}

function erg_LPC_set_color_swatch(_i_c)
{
  gDialog.ColorSwatch.setAttribute(
    "style",
    `background-color: ${TrimString(_i_c) || "inherit"}`
    );

  erg_LPC_bt_inp.style.setProperty("background-color", _i_c);

  console.log("erg_LPC_set_color_swatch():[" + _i_c + "]");
}

/*
function SetDefaultToOk() {

    console.log("SetDefaultToOk():+");

    // ERG+
    //      gDialog.LastPickedButton.removeAttribute("default");
    erg_LPC_bt_lpc.removeAttribute("default");
    // ERG-
  gDialog.Ok.setAttribute("default", "true");
}
*/
//  ################################################################################################
function erg_LPC_is_hexdigit(_i_c)
{
  if  (
            ( ( _i_c >= 48 ) && ( _i_c <= 57 ) )  ||
            ( ( _i_c >= 65 ) && ( _i_c <= 70 ) )  ||
            ( ( _i_c >= 97 ) && ( _i_c <= 102) )
      )
  {
    return true;
  }
  return false;
}

function erg_LPC_check_color_validity__hex(_i_s)
{
  var l, i, c;
  //  ..............................................................................................
  l = _i_s.length;

  if ( ( l == 0 ) || ( l > 7 ) )
    return false;

  if ( _i_s[0] != '#' )
  {
    return false;
  }

  for ( i = 1 ; i != l ; i++ )
  {
    c = _i_s.charCodeAt(i);

    console.log("--> " + c);

    if  ( ! erg_LPC_is_hexdigit(c) )
    {
      console.log("    bad");
      return false;
    }
    else
    {
      console.log("    ok");
    }
  }
  return true;
}

function erg_LPC_check_color_validity__named(_i_name)
{
  var s, l, i;
  //  ..............................................................................................
  l = _i_name.length;

  if ( l == 0 )
    return false;

  s = _i_name.toLowerCase();

  for ( i = 0 ; i != gErgEcpColors.length ; i++ )
  {
    if ( gErgEcpColors[i].name == s )
    {
      return true;
    }
  }
  return false;
}

function erg_LPC_check_color_validity(_i_name)
{
  //  ..............................................................................................
  if ( _i_name.length == 0 )
    return false;

  if ( _i_name[0] == '#' )
  {
    return erg_LPC_check_color_validity__hex(_i_name);
  }

  return erg_LPC_check_color_validity__named(_i_name);
}
//  ################################################################################################
function onAccept(event)
{
  if ( NoDefault && !gColor )
  {
    ShowInputErrorMessage(GetString("NoColorError"));
    SetTextboxFocus(gDialog.ColorInput);
    event.preventDefault();
    return false;
  }
  //  ..............................................................................................
  //  update last picked colors list
  //  dont update the grid because we are leaving the dialog
  if ( gColor.length > 0 )
  {
    erg_LPC_lpc_update_colors_list(gColor);
  }
  //  ..............................................................................................
  //  Set return values and save in persistent color attributes
  if (TextType) {
    gColorObj.TextColor = gColor;
    if (gColor.length > 0) {
        //  ERG+
        //      gDialog.LastPickedColor.setAttribute("LastTextColor", gColor);
        erg_LPC_box.setAttribute("LastTextColor", gColor);
        // ERG-
      gColorObj.LastTextColor = gColor;
    }
  } else if (HighlightType) {
    gColorObj.HighlightColor = gColor;
    if (gColor.length > 0) {
        // ERG+
        //      gDialog.LastPickedColor.setAttribute("LastHighlightColor", gColor);
        erg_LPC_box.setAttribute("LastHighlightColor", gColor);
        // ERG-
      gColorObj.LastHighlightColor = gColor;
    }
  } else {
    gColorObj.BackgroundColor = gColor;
    if (gColor.length > 0) {
        // ERG+
        //      gDialog.LastPickedColor.setAttribute("LastBackgroundColor", gColor);
        erg_LPC_box.setAttribute("LastBackgroundColor", gColor);
        // ERG-
      gColorObj.LastBackgroundColor = gColor;
    }
    // If table or cell requested, tell caller which element to set on
    if (TableOrCell && gDialog.TableRadio.selected) {
      gColorObj.Type = "Table";
    }
  }

  SaveWindowLocation();
  return true;
}

function onCancelColor() {
  // Tells caller that user canceled
  gColorObj.Cancel = true;
  SaveWindowLocation();
}
//  ################################################################################################
function erg_LPC_css_cbk_changed(_i_evt)
{
  erg_LPC_bt_css.style.setProperty("background-color", _i_evt.target.value);
  erg_LPC_bt_css.setAttribute("bgColHex", _i_evt.target.value);

  //  change the global selected color, avoiding the user having to click the button
  erg_LPC_set_current_color(_i_evt.target.value);

  return true;
}

function erg_LPC_css_cbk_select()
{
  //  if we read the "background-color" property value, we get rgb(a,b,c) crap
  //  so we have to store it in a additionnal attribute "bgColHex"
  let c = erg_LPC_bt_css.getAttribute("bgColHex");

  // set global color
  erg_LPC_set_current_color(c);

  return true;
}
//  ################################################################################################
function erg_LPC_inp_set_input_validity(b)
{
  //  ..............................................................................................
  if ( b )
  {
    erg_LPC_input.style.setProperty("background-color", "#ffffff");
  }
  else
  {
    erg_LPC_input.style.setProperty("background-color", "#fac5c6");
  }
}

function erg_LPC_inp_check_input_validity()
{
  var s, l, i, c;
  //  ..............................................................................................
  s = erg_LPC_input.value;
  l = s.length;

  //  empty color is OK, it is "default" color
  if ( l == 0 )
    return true;

  return erg_LPC_check_color_validity(s);
}

function  erg_LPC_inp_cbk_select()
{
  var b;
  //  ..............................................................................................
  //  verify the syntax of input text
  //  color has to be #xxxxxx, or empty
  b = erg_LPC_inp_check_input_validity();

  erg_LPC_inp_set_input_validity(b);

  if ( b )
    erg_LPC_set_current_color(erg_LPC_input.value);

  //console.log("erg_LPC_inp_cbk_select():s[" + s + "]");
}
//  ################################################################################################
function erg_LPC_lpc_update_xul_grid()
{
    let s, r, c;
    let i;
    //  ............................................................................................
    s = erg_LPC_menulist.getAttribute("pickedColors");

    //console .log("erg_LPC_lpc_uxg():grid [" + erg_LPC_grid + "]");
    //console .log("erg_LPC_lpc_uxg():rows [" + erg_LPC_grid_rows + "]");
    //console .log("erg_LPC_lpc_uxg():#rows[" + erg_LPC_grid_rows.childNodes.length + "]");

    r = s.split(" ");

    console.log("erg_LPC_lpc_uxg():   s:[" + s + "]");
    console.log("erg_LPC_lpc_uxg():  #r:[" + r.length + "]");
    //console.log("erg_LPC_lpc_uxg():r[0]:[" + r[0] + "]");
    //console.log("erg_LPC_lpc_uxg():r[1]:[" + r[1] + "]");

    for ( i = 0; i < 4 ; i++ )
    {
        row = erg_LPC_grid_rows.childNodes[i];

        for ( j = 0; j < 4 ; j++ )
        {
            mi = row.childNodes[j];

            //console .log("erg_LPC_update_last_picked_colors():row [" + row + "]");
            //console .log("erg_LPC_update_last_picked_colors(): mi [" + mi  + "]");

            k = i * 4 + j;

            if ( r.length > k )
            {
                c = r[k];
            }
            else
            {
                c = "#cccccc";
            }

            mi.style.setProperty("background-color", c);
            mi.value = c;

            //console.log("erg_LPC_lpc_uxg():[" + i + "][" + j + "]=[" + c + "]");
        }
     }
}

function erg_LPC_lpc_update_colors_list(_i_c)
{
    let s, r, d;
    let i;
    //  ............................................................................................
    s = erg_LPC_menulist.getAttribute("pickedColors");

    r = s.split(" ");

    for ( i = 0; i < r.length; i++ )
    {
        d = r[i];

        if ( _i_c.localeCompare(d) == 0 )
        {
            console.log("erg_LPC_lpc_ucl():already present [" + _i_c + "]");
            break;
        }
    }

    if ( i == r.length )
    {
        s = _i_c + " " + s;
        s = s.trim();

        console.log("erg_LPC_lpc_ucl():added [" + _i_c + "]");
    }


    erg_LPC_menulist.setAttribute("pickedColors", s);
    console.log("erg_LPC_lpc_ucl():s[" + s + "]");
}

function erg_LPC_lpc_cbk_changed(_i_evt)
{
  erg_LPC_bt_lpc.style.setProperty("background-color", _i_evt.target.value);
  erg_LPC_bt_lpc.setAttribute("bgColHex", _i_evt.target.value);

  erg_LPC_menulist.setAttribute("label", "Last-picked colors");

  //  change the global selected color, avoiding the user having to click the button
  erg_LPC_set_current_color(_i_evt.target.value);
}

function erg_LPC_lpc_cbk_select()
{
  //  if we read the "background-color" property value, we get rgb(a,b,c) crap
  //  so we have to store it in a additionnal attribute "bgColHex"
  let c = erg_LPC_bt_lpc.getAttribute("bgColHex");

  // set global color
  erg_LPC_set_current_color(c);

  return true;
}


//  gDialog.LastPickedButton.style["background-color"] = e.target.value;
//  erg_LPC_box.style.setProperty("background-color", "#555555");
//  erg_LPC_bt_lpc.setAttribute("background-color", e.target.value); NO

