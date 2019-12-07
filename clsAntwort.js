  
  function clsAntwort()
  {
    /*
     * Die eindeutige ID der Antwort
     */
    this.m_id           = 0;

    /*
     * Die Antwortbezeichnung "A", "B" oder evtl "1", "2" ...
     */
    this.m_antwort_bez  = "";

    /*
     * Der Text der Antwort
     */
    this.m_antwort_text = "";

    /*
     * Eventuell eine Bemerkung zur Antwort.
     * - Warum die Antwort falsch bzw. richtig ist
     * - ein externer Link auf eine Seite im WWW
     */
    this.m_bemerkung    = "";

    /*
     * Kennzeichen, ob die Antwort korrekt oder falsch ist.
     */
    this.m_knz_korrekt  = false;
  }


  clsAntwort.prototype.getId = function()
  {
    return this.m_id;
  }


  clsAntwort.prototype.setId = function( pId )
  {
    this.m_id = pId;
  }


  clsAntwort.prototype.getAntwortBez = function()
  {
    return this.m_antwort_bez;
  }


  clsAntwort.prototype.setAntwortBez = function( pAntwortBez )
  {
    this.m_antwort_bez = pAntwortBez;
  }


  clsAntwort.prototype.getAntwortText = function()
  {
    return this.m_antwort_text;
  }


  clsAntwort.prototype.setAntwortText = function( pAntwortText )
  {
    this.m_antwort_text = pAntwortText;
  }


  clsAntwort.prototype.getBemerkung = function()
  {
    return this.m_bemerkung;
  }


  clsAntwort.prototype.setBemerkung = function( pBemerkung )
  {
    this.m_bemerkung = pBemerkung;
  }


  clsAntwort.prototype.getKnzKorrektInt = function()
  {
    return ( this.m_knz_korrekt ? 1 : 0 );
  }


  clsAntwort.prototype.getKnzFalschInt = function()
  {
    return ( this.m_knz_korrekt ? 0 : 1 );
  }


  clsAntwort.prototype.getKnzKorrekt = function()
  {
    return this.m_knz_korrekt;
  }


  clsAntwort.prototype.getKnzFalsch = function()
  {
    return this.m_knz_korrekt == false;
  }


  clsAntwort.prototype.setKnzKorrekt = function( pKnzKorrekt )
  {
    this.m_knz_korrekt = pKnzKorrekt;
  }


  clsAntwort.prototype.toString = function()
  {
    return this.m_antwort_text;
  }


  clsAntwort.prototype.clear = function()
  {
    this.m_id           = 0;

    this.m_antwort_bez  = undefined;

    this.m_antwort_text = undefined;

    this.m_bemerkung    = undefined;

    this.m_knz_korrekt  = false;
  }
   
