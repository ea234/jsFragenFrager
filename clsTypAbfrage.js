  
  function clsTypAbfrage()
  {
    /*
     * Index der anzuzeigenden Frage aus dem Fragenkatalog.
     * 
     * Steuert, welche Frage angezeigt werden soll.
     */
    this.m_index_fragen_katalog             = 0;

    /*
     * Speichert die Anzahl, wie oft diese Frage beantwortet worden ist.
     */
    this.m_anzahl_beantwortet_ja            = 0;

    /*
     * Speichert die anzahl, wie oft diese Frage unbeantwortet geblieben ist.
     */
    this.m_anzahl_beantwortet_nein          = 0;

    /*
     * Speichert die Anzahl, wie oft diese Frage falsch beantwortet worden ist.
     */
    this.m_anzahl_falsch_beantwortet        = 0;

    /*
     * Speichert die Anzahl, wie oft diese Frage korrekt beantwortet worden ist.
     */
    this.m_anzahl_korrekt_beantwortet       = 0;

    /*
     * Kennzeichenvariablen, welche Antworten beim letzten
     * Anzeigen ausgewaehlt worden waren.
     * 
     * Diese Kennzeichen dienen zur Restaurierung der Auswahlen
     * beim naechsten Anzeigen der Frage.
     */
    this.m_knz_antwort_a_gewaehlt           = false;
    this.m_knz_antwort_b_gewaehlt           = false;
    this.m_knz_antwort_c_gewaehlt           = false;
    this.m_knz_antwort_d_gewaehlt           = false;
    this.m_knz_antwort_e_gewaehlt           = false;
    this.m_knz_antwort_f_gewaehlt           = false;
    this.m_knz_antwort_g_gewaehlt           = false;
    this.m_knz_antwort_h_gewaehlt           = false;

    /*
     * Kennzeichen, ob die Frage beim letzten Anzeigen korrekt beantwortet worden ist.
     * 
     * Dient dazu, einen Export von nur den falsch oder nur den korrekt
     * beantworteten Fragen machen zu koennen. 
     */
    this.m_knz_frage_letzte_antwort_korrekt = false;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getIndexFragenKatalog = function()
  {
    return this.m_index_fragen_katalog;
  }

  /* 

   * ################################################################################
   */
  clsTypAbfrage.prototype.setIndexFragenKatalog = function( pIndexFragenKatalog )
  {
    this.m_index_fragen_katalog = pIndexFragenKatalog;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getAnzahlBeantwortetJa = function()
  {
    return this.m_anzahl_beantwortet_ja;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setAnzahlBeantwortetJa = function( pAnzahlBeantwortetJa )
  {
    this.m_anzahl_beantwortet_ja = pAnzahlBeantwortetJa;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.incAnzahlBeantwortetJa = function()
  {
    this.m_anzahl_beantwortet_ja++;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getAnzahlBeantwortetNein = function()
  {
    return this.m_anzahl_beantwortet_nein;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setAnzahlBeantwortetNein = function( pAnzahlBeantwortetNein )
  {
    this.m_anzahl_beantwortet_nein = pAnzahlBeantwortetNein;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.incAnzahlBeantwortetNein = function()
  {
    this.m_anzahl_beantwortet_nein++;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getAnzahlFalschBeantwortet = function()
  {
    return this.m_anzahl_falsch_beantwortet;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setAnzahlFalschBeantwortet = function( pAnzahlFalschBeantwortet )
  {
    this.m_anzahl_falsch_beantwortet = pAnzahlFalschBeantwortet;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.incAnzahlFalschBeantwortet = function()
  {
    this.m_anzahl_falsch_beantwortet++;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getAnzahlKorrektBeantwortet = function()
  {
    return this.m_anzahl_korrekt_beantwortet;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setAnzahlKorrektBeantwortet = function( pAnzahlKorrektBeantwortet )
  {
    this.m_anzahl_korrekt_beantwortet = pAnzahlKorrektBeantwortet;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.incAnzahlKorrektBeantwortet = function()
  {
    this.m_anzahl_korrekt_beantwortet++;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getKnzAntwortAGewaehlt = function()
  {
    return this.m_knz_antwort_a_gewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setKnzAntwortAGewaehlt = function( pKnzAntwortAGewaehlt )
  {
    this.m_knz_antwort_a_gewaehlt = pKnzAntwortAGewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getKnzAntwortBGewaehlt = function()
  {
    return this.m_knz_antwort_b_gewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setKnzAntwortBGewaehlt = function( pKnzAntwortBGewaehlt )
  {
    this.m_knz_antwort_b_gewaehlt = pKnzAntwortBGewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getKnzAntwortCGewaehlt = function()
  {
    return this.m_knz_antwort_c_gewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setKnzAntwortCGewaehlt = function( pKnzAntwortCGewaehlt )
  {
    this.m_knz_antwort_c_gewaehlt = pKnzAntwortCGewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getKnzAntwortDGewaehlt = function()
  {
    return this.m_knz_antwort_d_gewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setKnzAntwortDGewaehlt = function( pKnzAntwortDGewaehlt )
  {
    this.m_knz_antwort_d_gewaehlt = pKnzAntwortDGewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getKnzAntwortEGewaehlt = function()
  {
    return this.m_knz_antwort_e_gewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setKnzAntwortEGewaehlt = function( pKnzAntwortEGewaehlt )
  {
    this.m_knz_antwort_e_gewaehlt = pKnzAntwortEGewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getKnzAntwortFGewaehlt = function()
  {
    return this.m_knz_antwort_f_gewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setKnzAntwortFGewaehlt = function( pKnzAntwortFGewaehlt )
  {
    this.m_knz_antwort_f_gewaehlt = pKnzAntwortFGewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getKnzAntwortGGewaehlt = function()
  {
    return this.m_knz_antwort_g_gewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setKnzAntwortGGewaehlt = function( pKnzAntwortGGewaehlt )
  {
    this.m_knz_antwort_g_gewaehlt = pKnzAntwortGGewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getKnzAntwortHGewaehlt = function()
  {
    return this.m_knz_antwort_h_gewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setKnzAntwortHGewaehlt = function( pKnzAntwortHGewaehlt )
  {
    this.m_knz_antwort_h_gewaehlt = pKnzAntwortHGewaehlt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getKnzFrageLetzteAntwortKorrekt = function()
  {
    return this.m_knz_frage_letzte_antwort_korrekt;
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.getKnzFrageLetzteAntwortFalsch = function()
  {
    return ( this.m_knz_frage_letzte_antwort_korrekt == false );
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.setKnzFrageLetzteAntwortKorrekt = function( pKnzFrageLetzteAntwortKorrekt )
  {
    this.m_knz_frage_letzte_antwort_korrekt = pKnzFrageLetzteAntwortKorrekt;
  }

  /**
   * Setzt die internen Variablen auf die Initialwerte.
   */
  clsTypAbfrage.prototype.resetZaehler = function()
  {
    this.m_anzahl_beantwortet_ja = 0;

    this.m_anzahl_beantwortet_nein = 0;

    this.m_anzahl_falsch_beantwortet = 0;

    this.m_anzahl_korrekt_beantwortet = 0;

    this.m_knz_antwort_a_gewaehlt = false;

    this.m_knz_antwort_b_gewaehlt = false;

    this.m_knz_antwort_c_gewaehlt = false;

    this.m_knz_antwort_d_gewaehlt = false;

    this.m_knz_antwort_e_gewaehlt = false;

    this.m_knz_antwort_f_gewaehlt = false;

    this.m_knz_antwort_g_gewaehlt = false;

    this.m_knz_antwort_h_gewaehlt = false;

    this.m_knz_frage_letzte_antwort_korrekt = false;
  }

  /**
   * Funktion um die Resourcen wieder freigeben zu koennen.
   *
   * Aktuell werden die Variablen alle auf Vorgabewerte gestellt.
   * Eine richtige Resourcenfreigabe passiert hier nicht.
   */
  clsTypAbfrage.prototype.clear = function()
  {
    this.m_index_fragen_katalog = 0;

    this.resetZaehler();
  }

  /* 
   * ################################################################################
   */
  clsTypAbfrage.prototype.ToStringX = function()
  {
    var temp_str = "";

    temp_str += "\nm_index_fragen_katalog             =>" + this.m_index_fragen_katalog + "<";

    temp_str += "\nm_anzahl_beantwortet_ja            =>" + this.m_anzahl_beantwortet_ja + "<";

    temp_str += "\nm_anzahl_beantwortet_nein          =>" + this.m_anzahl_beantwortet_nein + "<";

    temp_str += "\nm_anzahl_falsch_beantwortet        =>" + this.m_anzahl_falsch_beantwortet + "<";

    temp_str += "\nm_anzahl_korrekt_beantwortet       =>" + this.m_anzahl_korrekt_beantwortet + "<";

    temp_str += "\nm_knz_antwort_a_gewaehlt           =>" + this.m_knz_antwort_a_gewaehlt + "<";

    temp_str += "\nm_knz_antwort_b_gewaehlt           =>" + this.m_knz_antwort_b_gewaehlt + "<";

    temp_str += "\nm_knz_antwort_c_gewaehlt           =>" + this.m_knz_antwort_c_gewaehlt + "<";

    temp_str += "\nm_knz_antwort_d_gewaehlt           =>" + this.m_knz_antwort_d_gewaehlt + "<";

    temp_str += "\nm_knz_antwort_e_gewaehlt           =>" + this.m_knz_antwort_e_gewaehlt + "<";

    temp_str += "\nm_knz_antwort_f_gewaehlt           =>" + this.m_knz_antwort_f_gewaehlt + "<";

    temp_str += "\nm_knz_antwort_g_gewaehlt           =>" + this.m_knz_antwort_g_gewaehlt + "<";

    temp_str += "\nm_knz_antwort_h_gewaehlt           =>" + this.m_knz_antwort_h_gewaehlt + "<";

    temp_str += "\nm_knz_frage_letzte_antwort_korrekt =>" + this.m_knz_frage_letzte_antwort_korrekt + "<";

    return temp_str;
  }

