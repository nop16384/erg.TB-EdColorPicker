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
    console.log("ErgEcpLpcBuffer::Dump():"+this.d_array.length);
    for ( i = 0 ; i != Math.min(this.d_array.length, this.a_max_card) ; i ++ )
    {
      console.log("[" + i + "]:" + "[" + this.d_array[i] + "]");
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
    a             = s.split(" ");
    this.d_array  = new Array();

    for ( i = 0 ; i < Math.min(a.length, this.a_max_card) ; i++ )
    {
      this.d_array[i] = a[i];
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
    //  console.log("Prepend");

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


b=new ErgEcpLpcBuffer("a b c d e f g h i j k", 4);
b.dump();

b.prepend("A");
b.dump();

b.prepend("B");
b.dump();

b.prepend("C");
b.dump();

b.prepend("D");
b.dump();

b.prepend("E");
b.dump();

b.prepend("F");
b.dump();

b.prepend("0");
b.dump();


console.log( "[" + b.get_string() + "]" );
