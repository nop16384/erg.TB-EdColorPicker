/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* import-globals-from ../editorUtilities.js */
/* import-globals-from EdDialogCommon.js */

//  ################################################################################################
//                      Objects
//  ################################################################################################
function ErgEcpLpcBuffer(_i_str, _i_max_card)
{
  //  **********************************************************************************************
  //  d_array
  //  a_max_card
  //  **********************************************************************************************
  this.dump=function()
  {
    var i;
    //  ............................................................................................
    _erg_ecp_log("buf","Dump():" + this.d_array.length);
    for ( i = 0 ; i != Math.min(this.d_array.length, this.a_max_card) ; i ++ )
    {
      _erg_ecp_log("buf", "[" + i + "]:" + "[" + this.d_array[i] + "]")
      //console.log("[" + i + "]:" + "[" + this.d_array[i] + "]");
    }
  }
  //  ==============================================================================================
  this.construct=function(_i_str, _i_max_card)
  {
    var s, a, i;
    //  ............................................................................................
    if ( ( _i_str != undefined ) && ( _i_str != null ) )
    {
      s  = _i_str.trim();
    }
    else
    {
      s = "";
    }
    //  ............................................................................................
    if ( ( _i_max_card == undefined ) || ( _i_max_card == null ) || ( _i_max_card < 0 ) )
    {
      this.a_max_card = 10;
    }
    else
    {
      this.a_max_card = _i_max_card;
    }
    //  ............................................................................................
    this.d_array  = new Array();

    //  __ERG_TEK__ When you split an empty string, javascript returns an array with 1 element
    //  containing 1 empty string. Why does it not return an empty array ??????
    if ( _i_str.length != 0 )
    {
      a = _i_str.split(" ");

      for ( i = 0 ; i < Math.min(a.length, this.a_max_card) ; i++ )
      {
        this.d_array[i] = a[i];
      }
    }
  }
  //  ==============================================================================================
  this.reset=function()
  {
    this.d_array=new Array();
  }
  //  ==============================================================================================
  this.has=function(_i_s)
  {
    var i;
    var s;
    //  ............................................................................................
    for ( i = 0; i < this.d_array.length ; i++ )
    {
        s = this.d_array[i];

        if ( _i_s.localeCompare(s) == 0 )
        {
            return i;
        }
    }

    return -1;
  }
  //  ==============================================================================================
  this.prepend=function(_i_str)
  {
    var l, m, i, p;
    //  ............................................................................................
    l = this.d_array.length;
    m = this.a_max_card;

    if    ( l == m )    { p = m - 1;  }
    else                { p = l;      }

    for ( i = p ; i >= 1 ; i-- )
    {
      this.d_array[i] = this.d_array[i-1];
    }

    this.d_array[0] = _i_str;
  }
  //  ==============================================================================================
  this.del=function(_i_ix)
  {
    var l, i;
    //  ............................................................................................
    l = this.d_array.length;

    if ( ( _i_ix < 0 ) || ( _i_ix >= l ) )
      return;

    for ( i = _i_ix ; i <= ( l - 2 ) ; i++ )
    {
      this.d_array[i] = this.d_array[i+1];
    }

    if ( l > 0 )
      this.d_array[l - 1] = "#cccccc";
  }
  //  ==============================================================================================
  this.get=function(_i_i)
  {
    //  ............................................................................................
    if ( ( _i_i >= 0 ) && ( _i_i < this.d_array.length ) )
    {
      return this.d_array[_i_i];
    }
    else
    {
      return null;
    }
  }

  this.set=function(_i_i, _i_s)
  {
    //  ............................................................................................
    if ( ( _i_i >= 0 ) && ( _i_i < this.d_array.length ) )
    {
      this.d_array[_i_i] = _i_s;
    }
  }
  //  ==============================================================================================
  this.get_string=function()
  {
    return this.d_array.join(' ');
  }
  //  **********************************************************************************************
  this.construct(_i_str, _i_max_card);
}

function ErgEcpCssColor(_i_hex, _i_css_name, _i_color_family)
{
  this.hex            = _i_hex;
  this.css_name       = _i_css_name;
  this.color_family   = _i_color_family;
}

function  erg_init_colors_array()
{
__ERG_MARK_JS__CSS_COLORS__
}
//  ################################################################################################
//                      Utils
//  ################################################################################################
function _erg_ecp_log(_i_cha, _i_s)
{
  if ( ! eval("gErgEcp.Log." + _i_cha ) )
    return;

  console.log("(ErgEcp)" + _i_cha + "::" + _i_s);
}

function erg_ecpl_ctp(_i_s)                                                                         //  Color TyPe
{
  _erg_ecp_log("ctp", _i_s)
}

function erg_ecpl_lpc(_i_s)                                                                         //  Last Picked Color
{
  _erg_ecp_log("lpc", _i_s)
}

function erg_ecpl_csv_hex(_i_s)                                                                     //  Color Srting Validity Hex
{
  _erg_ecp_log("csvhex", _i_s)
}

function erg_ecpl_curswa(_i_s)                                                                      //  CURrent color SWAtch
{
  _erg_ecp_log("curswa", _i_s)
}

function erg_ecpl_curcol(_i_s)                                                                      //  CURrent Col
{
  _erg_ecp_log("curcol", _i_s)
}

function erg_ecpl_inp(_i_s)                                                                         //  color INPut
{
  _erg_ecp_log("inp", _i_s)
}

function erg_ecpl_xug(_i_s)                                                                         //  XUl Grid
{
  _erg_ecp_log("xug", _i_s)
}

function erg_ecpl_cds(_i_s)                                                                         //  Color Dom String
{
  _erg_ecp_log("cds", _i_s)
}

function erg_ecpl_set_all(_i_b)
{
  gErgEcp.Log.buf     = _i_b;

  gErgEcp.Log.ctp     = _i_b;
  gErgEcp.Log.lpc     = _i_b;
  gErgEcp.Log.csvhex  = _i_b;
  gErgEcp.Log.curswa  = _i_b;
  gErgEcp.Log.curcol  = _i_b;
  gErgEcp.Log.inp     = _i_b;
  gErgEcp.Log.xug     = _i_b;
  gErgEcp.Log.cds     = _i_b;
}
//  ************************************************************************************************
function erg_ecp_util__set_window_location()
{
  gLocation = document.getElementById("location");
  if (gLocation)
  {

    var px = window.opener.screenX;
    var py = window.opener.screenY;

    var ox = gLocation.getAttribute("offsetX");
    var oy = gLocation.getAttribute("offsetY");

    var aw = screen.availWidth;
    var ah = screen.availHeight;

    var iw = window.innerWidth;
    var ih = window.innerHeight;

    var cx = Number(px) + Number(ox);
    var cy = Number(py) + Number(oy);

    window.moveTo(cx,cy);
  }
}

function erg_ecp_util__is_hexdigit(_i_c)
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

function erg_ecp_util__check_color_string_validity__hex(_i_s)
{
  var l, i, c;
  //  ..............................................................................................
  l = _i_s.length;

  if ( ( l == 0 ) || ( l > 7 ) )
    return eErgEcpColorValidity.N;

  if ( _i_s[0] != '#' )
  {
    return eErgEcpColorValidity.N;
  }

  if ( l == 1 )
    return eErgEcpColorValidity.MHEX;

  for ( i = 1 ; i != l ; i++ )
  {
    c = _i_s.charCodeAt(i);

    erg_ecpl_csv_hex("c[" + c + "]");

    if  ( ! erg_ecp_util__is_hexdigit(c) )
    {
      erg_ecpl_csv_hex("bad");
      return eErgEcpColorValidity.N;
    }
    else
    {
      erg_ecpl_csv_hex("ok");
    }
  }
  return eErgEcpColorValidity.YHEX;
}

function erg_ecp_util__check_color_string_validity__css(_i_name)
{
  var s, l, i;
  //  ..............................................................................................
  l = _i_name.length;

  if ( l == 0 )
    return eErgEcpColorValidity.N;

  s = _i_name.toLowerCase();

  for ( i = 0 ; i != gErgEcp.Colors.Css.length ; i++ )
  {
    if ( gErgEcp.Colors.Css[i].css_name.startsWith(s) )
    {
      if ( gErgEcp.Colors.Css[i].css_name == s )
      {
        return eErgEcpColorValidity.YCSS;
      }
      else
      {
        return eErgEcpColorValidity.MCSS;
      }
    }
  }
  return eErgEcpColorValidity.N;
}

function erg_ecp_util__check_color_string_validity(_i_s)
{
  if ( _i_s.length == 0 )
    return eErgEcpColorValidity.N;

  if ( _i_s[0] == '#' )
    return erg_ecp_util__check_color_string_validity__hex(_i_s);

  return erg_ecp_util__check_color_string_validity__css(_i_s);
}

function erg_ecp_util__get_color_hex_from_css(_i_css)
{
  var s, i;
  //  ..............................................................................................
  s = _i_css.toLowerCase();

  for ( i = 0 ; i != gErgEcp.Colors.Css.length ; i++ )
  {
    if ( gErgEcp.Colors.Css[i].css_name == _i_css )
    {
      return gErgEcp.Colors.Css[i].hex;
    }
  }
  return "";
}
//  ************************************************************************************************
function erg_ecp_util__rget_all_menuitems(_i_node)
{
  //erg_ecpl_lpc( "nodeName:" + _i_node.nodeName );

  if ( _i_node.nodeName == "menuitem" )
  {
    if (  ( _i_node.value != "#HELP"  )   &&
          ( _i_node.value != "#ABOUT" )   )
    {
      gErgEcp.Widgets.Lpc.mitems.push(_i_node);
    }

    return;
  }

  for ( var i = 0; i < _i_node.childNodes.length; i++ )
  {
    var child = _i_node.childNodes[i];

    erg_ecp_util__rget_all_menuitems(child);
  }

  return;
}
//  ################################################################################################
//                    Currently selected color
//  ################################################################################################
function erg_ecp_cur__set_swatch(_i_c)
{
  gDialog.ColorSwatch.setAttribute(
    "style",
    `background-color: ${TrimString(_i_c) || "inherit"}`
    );

  gErgEcp.Widgets.Input.btn.style.setProperty("background-color", _i_c);

  erg_ecpl_curswa("erg_ecp_cur__set_swatch():[" + _i_c + "]");
}

function erg_ecp_cur__set(_i_c)
{
  var c;
  //  ..............................................................................................
  erg_ecpl_curcol("erg_ecp_cur__set():[" + _i_c + "]");

  c = _i_c;

  if ( ( c == undefined ) || ( c == null ) )
  {
    c = "";
  }

  gColor = TrimString(c).toLowerCase();

  if ( gColor == "mixed" )
  {
    gColor = "";
  }

  erg_ecp_cur__set_swatch(gColor);
}
//  ################################################################################################
//                    Dialog box buttons ( OK, Cancel, ... )
//  ################################################################################################
function onAccept(event)
{
  if ( NoDefault && !gColor )
  {
    ShowInputErrorMessage(GetString("NoColorError"));
    SetTextboxFocus(gErgEcp.Widgets.Input.txt);
    event.preventDefault();
    return false;
  }
  //  ..............................................................................................
  //  update last picked colors list
  //  dont update the grid because we are leaving the dialog
  //  memorize the buffer in the DOM string
  if ( gColor.length > 0 )
  {
    erg_ecp_lpc__colors_list__prepend_color(gColor);
  }
  erg_ecp_lpc__colors_list__save_to_DOM();
  //  ..............................................................................................
  //  Set return values and save in persistent color attributes
  if (TextType) {
    gColorObj.TextColor = gColor;
    if (gColor.length > 0) {
        //  ERG+
        //      gDialog.LastPickedColor.setAttribute("LastTextColor", gColor);
        gErgEcp.Widgets.Lpc.vbox.setAttribute("LastTextColor", gColor);
        // ERG-
      gColorObj.LastTextColor = gColor;
    }
  } else if (HighlightType) {
    gColorObj.HighlightColor = gColor;
    if (gColor.length > 0) {
        // ERG+
        //      gDialog.LastPickedColor.setAttribute("LastHighlightColor", gColor);
        gErgEcp.Widgets.Lpc.vbox.setAttribute("LastHighlightColor", gColor);
        // ERG-
      gColorObj.LastHighlightColor = gColor;
    }
  } else {
    gColorObj.BackgroundColor = gColor;
    if (gColor.length > 0) {
        // ERG+
        //      gDialog.LastPickedColor.setAttribute("LastBackgroundColor", gColor);
        gErgEcp.Widgets.Lpc.vbox.setAttribute("LastBackgroundColor", gColor);
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

function onCancelColor()
{
  //  This function is called when user clicks the Cancel button, or dismiss the dialog
  //  by clicking on the windowmanager's "close window" button

  // Tells caller that user canceled
  gColorObj.Cancel = true;
  SaveWindowLocation();
}

function onDefault()
{
  erg_ecp_cur__set("");
  gErgEcp.Widgets.Input.txt.focus();
  //SetDefaultToOk();
}
//  ################################################################################################
//                    Color Picker
//  ################################################################################################
function erg_ecp_cpk__cbk_changed()
{
  var color = gDialog.ColorPicker.value;
  if (color)
  {
    erg_ecp_cur__set(color);                                                                        //  hex color
  }
}

function erg_ecp_cpk__cbk_keypress(aEvent)
{
  if (aEvent.charCode == aEvent.DOM_VK_SPACE) {
    erg_ecp_cpk__cbk_changed();
    //SetDefaultToOk();
  }
}
//  ################################################################################################
//                    CSS colors
//  ################################################################################################
function erg_ecp_css__cbk_changed(_i_evt)
{
  gErgEcp.Widgets.Css.btn.style.setProperty("background-color", _i_evt.target.value);
  gErgEcp.Widgets.Css.btn.setAttribute("erg_ecp_VDOM_css__btn_bg_col_hex", _i_evt.target.value);

  //  change the global selected color, avoiding the user having to click the button
  erg_ecp_cur__set(_i_evt.target.value);                                                            //  hex color

  return true;
}

function erg_ecp_css__cbk_clicked()
{
  //  if we read the "background-color" property value, we get rgb(a,b,c) crap
  //  so we have to store it in a additionnal attribute "erg_ecp_VDOM_css__btn_bg_col_hex"
  let c = gErgEcp.Widgets.Css.btn.getAttribute("erg_ecp_VDOM_css__btn_bg_col_hex");

  // set global color
  erg_ecp_cur__set(c);                                                                              //  hex color

  return true;
}
//  ################################################################################################
//                    INPUT colors
//  ################################################################################################
function erg_ecp_inp__set_input_validity(_i_v)
{
  //  ..............................................................................................
  if  (
        ( _i_v == eErgEcpColorValidity.Y    )   ||
        ( _i_v == eErgEcpColorValidity.YHEX )   ||
        ( _i_v == eErgEcpColorValidity.YCSS )
      )
  {
    gErgEcp.Widgets.Input.txt.style.setProperty("background-color", "#dafad9");
    return;
  }

  if  (
        ( _i_v == eErgEcpColorValidity.YDEF )   ||
        ( _i_v == eErgEcpColorValidity.M    )   ||
        ( _i_v == eErgEcpColorValidity.MHEX )   ||
        ( _i_v == eErgEcpColorValidity.MCSS )
      )
  {
    gErgEcp.Widgets.Input.txt.style.setProperty("background-color", "#ffffff");
    return;
  }

  if ( _i_v == eErgEcpColorValidity.N )
  {
    gErgEcp.Widgets.Input.txt.style.setProperty("background-color", "#fac5c6");
    return;
  }
}

function erg_ecp_inp__check_input_validity()
{
  var s, l, i, c;
  //  ..............................................................................................
  s = gErgEcp.Widgets.Input.txt.value;
  l = s.length;

  //  empty color is OK, it is "default" color
  if ( l == 0 )
    return eErgEcpColorValidity.YDEF;

  return erg_ecp_util__check_color_string_validity(s);
}

function erg_ecp_inp__cbk_input()
{
  var v;
  //  ..............................................................................................
  //  verify the syntax of input text
  //  color has to be #xxxxxx, css color name, or empty
  //  expected value :
  //  eErgEcpColorValidity. N
  //                        YDEF
  //                        MHEX
  //                        YHEX
  //                        MCSS
  //                        YCSS
  v = erg_ecp_inp__check_input_validity();

  erg_ecp_inp__set_input_validity(v);

  if  (
        ( v == eErgEcpColorValidity.YDEF )  ||
        ( v == eErgEcpColorValidity.YHEX )
      )
  {
    erg_ecp_cur__set(gErgEcp.Widgets.Input.txt.value);                                              //  hex / ""
    return;
  }

  if  ( v == eErgEcpColorValidity.YCSS )
  {
    erg_ecp_cur__set(erg_ecp_util__get_color_hex_from_css(gErgEcp.Widgets.Input.txt.value));        //  css -> hex
    return;
  }
}
//  ################################################################################################
//                    Last Picked Colors
//  ################################################################################################
function erg_ecp_lpc__update_xul_grid()
{
  var i;
  var c;
  var mi;
  //  ............................................................................................
  for ( i = 0; i < gErgEcp.Lpc.card ; i++ )
  {
    mi  = gErgEcp.Widgets.Lpc.mitems[i];

    // there is a range check in the get() method, so we can call directly
    c = gErgEcp.Lpc.buffer.get(i);

    if ( c == null )
    {
        c = "#cccccc";
    }

    mi.style.setProperty("background-color", c);
    mi.value = c;

    erg_ecpl_xug("erg_LPC_lpc_uxg():[" + i + "]=[" + c + "]");
  }
}

function erg_ecp_lpc__colors_list__load_from_DOM()
{
  gErgEcp.Lpc.buffer                =   new ErgEcpLpcBuffer(
    gErgEcp.Widgets.Lpc.mnl.getAttribute("erg_ecp_VDOM_lpc__picked_colors") ,
    gErgEcp.Lpc.card                                                        );

  erg_ecpl_cds("erg_ecp_lpc__colors_list__load_from_DOM():");
  gErgEcp.Lpc.buffer.dump();
}

function erg_ecp_lpc__colors_list__save_to_DOM()
{
  erg_ecpl_cds("erg_ecp_lpc__colors_list__save_to_DOM():");
  gErgEcp.Lpc.buffer.dump();

  gErgEcp.Widgets.Lpc.mnl.setAttribute
    ( "erg_ecp_VDOM_lpc__picked_colors" ,
      gErgEcp.Lpc.buffer.get_string()   );
}

function erg_ecp_lpc__colors_list__prepend_color(_i_c)
{
    //  in this method we dont call update_xul_grid() but maybe we should ??                        //  _ERG_TODO_
    //  because actually the dialog is closed just after the call, because a color has been choosen;
    //  so the grid will be reconstructed at the next color change.
    //  But in the future this method could be called in other circumstances
    //  ............................................................................................
    var s;
    var a1, l1;
    var a2;
    var i, card;
    //  ............................................................................................
    erg_ecpl_lpc("erg_ecp_lpc__colors_list__prepend_color():[" + _i_c + "]");

    if ( gErgEcp.Lpc.buffer.has(_i_c) >= 0 )
    {
      erg_ecpl_lpc("erg_ecp_lpc__colors_list__prepend_color():already present [" + _i_c + "]");
      return;
    }

    //  roll the list and add the new color at the first place
    gErgEcp.Lpc.buffer.prepend(_i_c);
    gErgEcp.Lpc.buffer.dump();
}

function erg_ecp_lpc__colors_list__reset()
{
  erg_ecpl_lpc("erg_ecp_lpc__colors_list__reset()");
  gErgEcp.Lpc.buffer.reset();
  erg_ecp_lpc__update_xul_grid();

  //  In case of a future user's cancel, the reseted colors would not be saved. So save them now.
  erg_ecp_lpc__colors_list__save_to_DOM();
}

function erg_ecp_lpc__cbk_reset(_i_evt)
{
  var ak;
  //  ..............................................................................................
  ak  = _i_evt.altKey;
  //  ..............................................................................................
  if ( ak )
  {
    erg_ecpl_lpc("cbk_reset():reset colors")
    erg_ecp_lpc__colors_list__reset();
  }
}

function erg_ecp_lpc__cbk_changed(_i_evt)
{
  var v;
  var ak;
  var rr, rc, rx;
  //  ..............................................................................................
  //  Prevent events from buttons & checkbox contained in menulist ( id="erg_ecp_EDOM_lpc__mnl" )
  //  beeing processed here, so we spare some uglies _i_evt.stopPropagation() in
  //  erg_ecp_stg__cbk_clicked() and erg_ecp_stg__cbk_chk_clicked()
  if ( _i_evt.target.nodeName != "menuitem" )
    return;
  //  ..............................................................................................
  v   = _i_evt.target.value;
  ak  = _i_evt.altKey;
  //  ..............................................................................................
  //  no action for menuitems HELP and ABOUT
  if (  ( v.localeCompare("#HELP")  == 0 )    ||
        ( v.localeCompare("#ABOUT") == 0 )    )
  {
    return;
  }
  //  ..............................................................................................
  //  No Alt key :select a color
  if ( ! ak )
  {
    erg_ecpl_lpc("cbk_changed():select color")
    gErgEcp.Widgets.Lpc.btn.style.setProperty("background-color", v);
    gErgEcp.Widgets.Lpc.btn.setAttribute("erg_ecp_VDOM_lpc__btn_bg_col_hex", v);

    gErgEcp.Widgets.Lpc.mnl.setAttribute("label", "Last-picked colors");

    //  change the global selected color, avoiding the user having to click the button
    erg_ecp_cur__set(v);                                                                            //  hex color

    return;
  }
  //  ..............................................................................................
  //  Alt key : remove a color
  rr  = _i_evt.target.getAttribute("idr");
  rc  = _i_evt.target.getAttribute("idc");
  rx  = parseInt(rr,10) * gErgEcp__LPC_COLS + parseInt(rc,10);

  erg_ecpl_lpc("cbk_changed():remove color:row["  + rr + "] col[" + rc + "] ix[" + rx + "]");

  gErgEcp.Lpc.buffer.del(rx);
  erg_ecp_lpc__update_xul_grid();                                                                   //  mandatory
}

function erg_ecp_lpc__cbk_clicked()
{
  //  if we read the "background-color" property value, we get rgb(a,b,c) crap
  //  so we have to store it in a additionnal attribute "erg_ecp_VDOM_lpc__btn_bg_col_hex"
  let c = gErgEcp.Widgets.Lpc.btn.getAttribute("erg_ecp_VDOM_lpc__btn_bg_col_hex");

  // set global color
  erg_ecp_cur__set(c);                                                                              //  hex color

  return true;
}
//  ################################################################################################
//                    Settings
//  ################################################################################################
function erg_ecp_stg__cbk_clicked(_i_evt)
{
  var h = gErgEcp.Widgets.Lpc.Stg.vbox.getAttribute("hidden");

  if ( h == "true" )
  {
    gErgEcp.Widgets.Lpc.Stg.btn.setAttribute("label", "↑ Hide settings");
    gErgEcp.Widgets.Lpc.Stg.vbox.setAttribute("hidden", "false");
  }
  else
  {
    gErgEcp.Widgets.Lpc.Stg.btn.setAttribute("label", "↓ Show settings");
    gErgEcp.Widgets.Lpc.Stg.vbox.setAttribute("hidden", "true");
  }
}

function erg_ecp_stg__cbk_chk_clicked(_i_evt)
{
  if ( _i_evt.target == gErgEcp.Widgets.Lpc.Stg.chk[1] )
  {
    gErgEcp__stg_chk[1] = gErgEcp.Widgets.Lpc.Stg.chk[1].checked;
    erg_ecpl_set_all(gErgEcp__stg_chk[1]);                                                          //  set logs
  }
}
//  ################################################################################################
//                    Main
//  ################################################################################################

//
//  Generated vars
//

//  const gErgEcp__BUILD_TYPE = "D" / "R";
__ERG_MARK_JS__BUILD_TYPE__

//
//  Standard vars
//
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

var gErgEcp;
var gErgWidgets;

const   gErgEcp__LPC_ROWS = 5;
const   gErgEcp__LPC_COLS = 5;

var     gErgEcp__stg_chk      = [false, false, false, false];                                       // gErgEcp__stg_chk[0] is unused

const   eErgEcpColorValidity  =
{
  "Y"     :10   ,
  "YHEX"  :11   ,
  "YCSS"  :12   ,
  "YDEF"  :13   ,
  "M"     :20   ,
  "MHEX"  :21   ,
  "MCSS"  :22   ,
  "N"     :30
};
Object.freeze(eErgEcpColorValidity)

document.addEventListener("dialogaccept", onAccept);
document.addEventListener("dialogcancel", onCancelColor);

function Startup()
{
  if (!window.arguments[1])
  {
    dump("EdColorPicker: Missing color object param\n");
    return;
  }

  // window.arguments[1] is object to get initial values and return color data
  gColorObj = window.arguments[1];
  gColorObj.Cancel = false;

  gDialog.ColorPicker       = document.getElementById("ColorPicker");
  gDialog.CellOrTableGroup  = document.getElementById("CellOrTableGroup");
  gDialog.TableRadio        = document.getElementById("TableRadio");
  gDialog.CellRadio         = document.getElementById("CellRadio");
  gDialog.ColorSwatch       = document.getElementById("ColorPickerSwatch");
  gDialog.Ok                = document.querySelector("dialog").getButton("accept");
  gDialog.Location          = document.getElementById("location");
  //  ..............................................................................................
  gErgEcp                           =   new Object();

  gErgEcp.Log                       =   new Object();

    gErgEcp.Lpc                     =   new Object();

    gErgEcp.DefCol                  =   new Object();
      gErgEcp.DefCol.passed_in      =   new Object();

    gErgEcp.Widgets                 =   new Object();
      gErgEcp.Widgets.Lpc           =   new Object();
      gErgEcp.Widgets.Lpc.Stg       =   new Object();
      gErgEcp.Widgets.Lpc.Stg.chk   =   new Array();
      gErgEcp.Widgets.Css           =   new Object();
      gErgEcp.Widgets.Input         =   new Object();

    gErgEcp.Colors                  =   new Object();
      gErgEcp.Colors.Css            =   new Array();

  gErgEcp.Widgets.Lpc.vbox          =   document.getElementById("erg_ecp_EDOM_lpc__vbox");
  gErgEcp.Widgets.Lpc.btn           =   document.getElementById("erg_ecp_EDOM_lpc__btn");
  gErgEcp.Widgets.Lpc.mnl           =   document.getElementById("erg_ecp_EDOM_lpc__mnl");

  gErgEcp.Widgets.Lpc.vbox_mp       =   document.getElementById("erg_ecp_EDOM_lpc__vbox_mp");
  gErgEcp.Widgets.Lpc.mitems        =   new Array();

  gErgEcp.Widgets.Lpc.Stg.btn       =   document.getElementById("erg_ecp_EDOM_stg__btn");
  gErgEcp.Widgets.Lpc.Stg.vbox      =   document.getElementById("erg_ecp_EDOM_stg__vbox");
  gErgEcp.Widgets.Lpc.Stg.chk[1]    =   document.getElementById("erg_ecp_EDOM_stg__chk01");
  gErgEcp.Widgets.Lpc.Stg.chk[2]    =   document.getElementById("erg_ecp_EDOM_stg__chk02");
  gErgEcp.Widgets.Lpc.Stg.chk[3]    =   document.getElementById("erg_ecp_EDOM_stg__chk03");

  gErgEcp.Widgets.Css.mnl           =   document.getElementById("erg_ecp_EDOM_css__mnl");
  gErgEcp.Widgets.Css.btn           =   document.getElementById("erg_ecp_EDOM_css__btn");
  gErgEcp.Widgets.Input.btn         =   document.getElementById("erg_ecp_EDOM_inp__btn");
  gErgEcp.Widgets.Input.txt         =   document.getElementById("erg_ecp_EDOM_inp__txt");

  gErgEcp.Lpc.alt_key_pressed       =   false;

  if ( gErgEcp__BUILD_TYPE == "D" )
  {
    gErgEcp__stg_chk[1] = true;                                                                     // gErgEcp__stg_chk[0] is unused
    gErgEcp__stg_chk[2] = false;
    gErgEcp__stg_chk[3] = false;
  }
  else
  {
    gErgEcp__stg_chk[1] = false;                                                                    // gErgEcp__stg_chk[0] is unused
    gErgEcp__stg_chk[2] = false;
    gErgEcp__stg_chk[3] = false;
  }

  //  logs
  erg_ecpl_set_all(gErgEcp__stg_chk[1]);                                                            //  set logs

  if ( gErgEcp__BUILD_TYPE == "D" )                                                                 //  tune logs for debug mode
  {
    gErgEcp.Log.xug = false;                                                                        //  XUL grid
  }

  gErgEcp.Widgets.Lpc.Stg.chk[1].checked = gErgEcp__stg_chk[01];                                    //  Because it dont work by xhtml init
  gErgEcp.Widgets.Lpc.Stg.chk[2].checked = gErgEcp__stg_chk[02];
  gErgEcp.Widgets.Lpc.Stg.chk[3].checked = gErgEcp__stg_chk[03];

  erg_ecp_util__rget_all_menuitems(gErgEcp.Widgets.Lpc.vbox_mp);
  gErgEcp.Lpc.card                  =   gErgEcp.Widgets.Lpc.mitems.length;
  erg_ecpl_lpc("mitems card:" + gErgEcp.Lpc.card);

  erg_ecp_lpc__colors_list__load_from_DOM();
  gErgEcp.Lpc.buffer.dump();

  erg_init_colors_array();
  erg_ecp_lpc__update_xul_grid();

  gErgEcp.Widgets.Lpc.mnl.setAttribute("label", "Last-picked colors");
  gErgEcp.Widgets.Css.mnl.setAttribute("label", "CSS colors");
  //  ..............................................................................................
  //  determine the type of color we are setting:
  //     - text       : Text, Link, ActiveLink, VisitedLink,
  //  or - background : Page, Table, or Cell
  if (gColorObj.Type)
  {
    ColorType = gColorObj.Type;
    // Get string for dialog title from passed-in type
    //   (note constraint on editor.properties string name)
    let IsCSSPrefChecked = Services.prefs.getBoolPref("editor.use_css");

    if (GetCurrentEditor())
    {
      if (ColorType == "Page" && IsCSSPrefChecked && IsHTMLEditor())
      {
        document.title = GetString("BlockColor");
      }
      else
      {
        document.title = GetString(ColorType + "Color");
      }
    }
  }

  erg_ecpl_ctp("Startup():ColorType[" + ColorType + "]");

  var tmpColor;
  var haveTableRadio = false;
  //  ..............................................................................................
  //  determine the default color of the color type we are setting
  switch (ColorType)
  {
    case "Page":
      tmpColor = gColorObj.PageColor;
      if (tmpColor && tmpColor.toLowerCase() != "window")
      {
        gColor = tmpColor;
      }
      break;

    case "Table":
      if (gColorObj.TableColor)
      {
        gColor = gColorObj.TableColor;
      }
      break;

    case "Cell":
      if (gColorObj.CellColor)
      {
        gColor = gColorObj.CellColor;
      }
      break;

    case "TableOrCell":
      TableOrCell = true;
      document.getElementById("TableOrCellGroup").collapsed = false;
      haveTableRadio = true;
      if (gColorObj.SelectedType == "Cell")
      {
        gColor = gColorObj.CellColor;
        gDialog.CellOrTableGroup.selectedItem = gDialog.CellRadio;
        gDialog.CellRadio.focus();
      }
      else
      {
        gColor = gColorObj.TableColor;
        gDialog.CellOrTableGroup.selectedItem = gDialog.TableRadio;
        gDialog.TableRadio.focus();
      }
      break;

    case "Highlight":
      HighlightType = true;
      if (gColorObj.HighlightColor)
      {
        gColor = gColorObj.HighlightColor;
      }
      break;

    default:
      // Any other type will change some kind of text,
      TextType = true;
      tmpColor = gColorObj.TextColor;
      if (tmpColor && tmpColor.toLowerCase() != "windowtext")
      {
        gColor = gColorObj.TextColor;
      }
      break;
  }

  erg_ecpl_ctp("Startup():TextType[" + TextType + "]")

  // Set initial color in input field and in the colorpicker
  gErgEcp.DefCol.passed_in  = gColor;
  gDialog.ColorPicker.value = gColor;
  erg_ecp_cur__set(gColor);
  //  ..............................................................................................
  //  determine the last picked color of color type we are setting
  //  2 ways : use last-picked colors passed in, or those persistent on dialog
  if (TextType)
  {
    if (!("LastTextColor" in gColorObj) || !gColorObj.LastTextColor)
    {
        gColorObj.LastTextColor = gErgEcp.Widgets.Lpc.vbox.getAttribute("LastTextColor");
    }
    LastPickedColor = gColorObj.LastTextColor;
  }
  else if (HighlightType)
  {
    if (!("LastHighlightColor" in gColorObj) || !gColorObj.LastHighlightColor)
    {
        gColorObj.LastTextColor = gErgEcp.Widgets.Lpc.vbox.getAttribute("LastHighlightColor");
    }
    LastPickedColor = gColorObj.LastHighlightColor;
  }
  else
  {
    if ( !("LastBackgroundColor" in gColorObj) || !gColorObj.LastBackgroundColor )
    {
            gColorObj.LastBackgroundColor = gErgEcp.Widgets.Lpc.vbox.getAttribute("LastBackgroundColor");
    }
    LastPickedColor = gColorObj.LastBackgroundColor;
  }
  erg_ecpl_lpc("Startup():LastPickedColor[" + LastPickedColor + "]")
  //  ..............................................................................................
  //  set the widgets color according to the LastPickedColor
  if ( ! LastPickedColor )
  {
    erg_ecpl_lpc("Startup():! LastPickedColor");
    gErgEcp.Widgets.Lpc.btn.style.setProperty("background-color", "inherit");
    gErgEcp.Widgets.Lpc.btn.setAttribute("erg_ecp_VDOM_lpc__btn_bg_col_hex", "");
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
    gErgEcp.Widgets.Lpc.btn.style.setProperty("background-color", LastPickedColor);
    gErgEcp.Widgets.Lpc.btn.setAttribute("erg_ecp_VDOM_lpc__btn_bg_col_hex", LastPickedColor);

    erg_ecp_lpc__update_xul_grid();
    // ERG-

    // Set method to detect clicking on OK button
    //  so we don't get fooled by changing "default" behavior
    //gDialog.Ok.setAttribute("onclick", "SetDefaultToOk()");

    // Make "Last-picked" the default button, until the user selects a color.
    //gDialog.Ok.removeAttribute("default");
    // ERG+
    //      gDialog.LastPickedButton.setAttribute("default", "true");
    //gErgEcp.Widgets.Lpc.btn.setAttribute("default", "true");
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

  //SetWindowLocation();
  erg_ecp_util__set_window_location();
}
//  ################################################################################################
//                    Old code
//  ################################################################################################
/*
function SetDefaultToOk() {

    erg_ecp_log("SetDefaultToOk():+");

    // ERG+
    //      gDialog.LastPickedButton.removeAttribute("default");
    gErgEcp.Widgets.Lpc.btn.removeAttribute("default");
    // ERG-
  gDialog.Ok.setAttribute("default", "true");
}
*/

