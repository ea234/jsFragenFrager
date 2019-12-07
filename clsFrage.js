  
  function clsFrage()
  {
    /*
     * Die eindeutige der Frage ID im Fragenkatalog
     */
    this.m_id                  = "";

    /*
     * Die Fragen-Nummer im Fragenkatalog
     */
    this.m_nummer              = "";

    /*
     * Die laufende Nummer der Frage im aktuellen Fragenkatalog.
     * 
     * Diese Nummer wird beim hinzufuegen einer Frage zum Fragenkatalog gesetzt.
     * 
     * Die laufende Nummer wird als String gespeichdert, da es ansonsten 
     * zu Problemen beim Fragenexport kommt. 
     * (Stichwort fehlende Typisierung von JavaScript)
     */
    this.m_lfd_nummer          = "-1";

    /*
     * Geltungsbereich
     * Zuordnung der Frage zu Bereichen, in welchen die Frage zur gueltig ist.
     * 
     * Im Fragenkatalog fuer den Luftfahrerschein, gibt es z.B. Geltungsbereiche fuer
     * 
     * Ballon, Hubschrauber, Segelflugzeuge und Motorflugzeuge.
     * 
     * Wobei eine Frage auch fuer mehrere Geltungsbereiche gueltig sein kann.
     */
    this.m_geltungsbereich     = "";

    /*
     * Fragetext
     * Fragetext 1 wird oben angezeigt und leitet die Frage ein.
     * Ein eventuell zweiter Fragentext wird unter den Antworten angezeigt.
     */
    this.m_text_1              = "";
    this.m_text_2              = "";

    /*
     * Eine Bemerkung zur Frage.
     */
    this.m_bemerkung           = "";

    /*
     * Verweise auf die Dateinamen von Bildern. 
     * 
     * In den Bildern duerfen keine Pfadangaben stehen.
     * 
     * Es wird ein Resourcenverzeichnis im Fragenkatalog defniert, aus 
     * welchem dann diese Bilder geladen werden.
     */
    this.m_bild_1              = undefined;
    this.m_bild_2              = undefined;
    this.m_bild_3              = undefined;
    this.m_bild_4              = undefined;

    /*
     * Die aktuelle Vertauschreihenfolge
     * Der String fuer die Umstellung wird in der Klasse gespeichert, 
     * um bei jeder Vertauschung eine schon vertauschte Grundmenge 
     * zu haben.
     */
    this.m_str_vertausch_reihenfolge = "12345678";

    /*
     * Antworten
     * Die Membervariablen "m_antwort_instanz_<a-h>" speichern die 
     * Antworten der Frage in ihrer originalen Reihenfolge.
     * 
     * Ist die entsprechende Variable "undefined", ist an der  
     * Stelle der Reihenfolge keine Antwort vorhanden.
     */
    this.m_antwort_instanz_a = undefined;
    this.m_antwort_instanz_b = undefined;
    this.m_antwort_instanz_c = undefined;
    this.m_antwort_instanz_d = undefined;
    this.m_antwort_instanz_e = undefined;
    this.m_antwort_instanz_f = undefined;
    this.m_antwort_instanz_g = undefined;
    this.m_antwort_instanz_h = undefined;

    /*
     * Antwort Aktiv Felder
     * 
     * Es koennen Antworten auf "inaktiv" gestellt werden.
     * Mit diesen Feldern wird das erscheinen von falschen 
     * Antworten in der Oberflaeche und im Fragenexport 
     * gesteuert bzw. beeeinflusst.
     * 
     * Es soll der Reduzierung von falschen Antworten dienen.
     * 
     * Der Anwender soll nicht alle falschen Antworten sehen.
     */
    this.m_antwort_aktiv_a = true;
    this.m_antwort_aktiv_b = true;
    this.m_antwort_aktiv_c = true;
    this.m_antwort_aktiv_d = true;
    this.m_antwort_aktiv_e = true;
    this.m_antwort_aktiv_f = true;
    this.m_antwort_aktiv_g = true;
    this.m_antwort_aktiv_h = true;

    /*
     * UI-Positionen - Antwortreihenfolge
     * 
     * Die Membervariablen "m_ui_position_antwort_<a-h>" speichern 
     * die Position der Antwort auf der Benutzeroberflaeche.
     * 
     * Bei den UI-Positionen wird nicht darauf geachtet, ob die Frage
     * auch eine entsprechende Instanz der Klasse "clsAntwort" hat.
     * Die UI-Positionen sind auch von den Aktiv-Feldern unabhaengig.
     *
     * Es gibt 8 Positionen welche den Antworten zugewiesen werden.
     */
    this.m_ui_position_antwort_a = 1;
    this.m_ui_position_antwort_b = 2;
    this.m_ui_position_antwort_c = 3;
    this.m_ui_position_antwort_d = 4;
    this.m_ui_position_antwort_e = 5;
    this.m_ui_position_antwort_f = 6;
    this.m_ui_position_antwort_g = 7;
    this.m_ui_position_antwort_h = 8;
  }


  clsFrage.prototype.startAntwortReduktionAufNFalscheAntworten = function( pAnzahlFalscheAntwortenSichtbar )
  {
    /*  
     * Aufruf der Funktion, um alle Antwortfelder auf "aktiv" zu stellen.
     */
    this.resetAntwortKnzAktiv();

    /*  
     * Mit der Anzahl der falschen Antworten, wird der Ausblendstring ermittelt.
     */
    var ausblend_str = undefined;
 
    /*  
     * Pruefung: Ausblendanzahl korrekt ?
     * 
     * Die Anzahl der Fragen, welche je korrekter Antwort drinbleiben sollen
     * muss groesser als 0 und kleiner 8 sein.
     * 
     */
    if ( ( pAnzahlFalscheAntwortenSichtbar > 0 ) && ( pAnzahlFalscheAntwortenSichtbar < 8 ) )
    {
      /*  
       * Es wird die Anzahl der falschen Antworten ermittelt.
       */
      var anzahl_falsche_antworten = this.getAnzahlFalscheAntworten(); 

      if ( pAnzahlFalscheAntwortenSichtbar >= anzahl_falsche_antworten ) 
      {
        var anzahl_antworten_raus = anzahl_falsche_antworten - anzahl_falscher_antworten_die_bleiben;

        /* 
         * Erstellung Ausblendstring 
         * 
         * Fuer jede Antwort, die "inaktiv" werden soll, gibt es eine "1".
         * 
         * Fuer jede Antwort, die "aktiv" bleiben soll, gibt es eine "0"
         */
        ausblend_string = fkString.left( "11111111", anzahl_antworten_raus ) + fkString.left( "00000000", anzahl_falscher_antworten_die_bleiben ) ;
      }
    }
  }


  clsFrage.prototype.startAntwortReduktion = function( pAnzahlFalscheAntwortenJeKorrekterAntwort )
  {
    /*  
     * Aufruf der Funktion, um alle Antwortfelder auf "aktiv" zu stellen.
     */
    this.resetAntwortKnzAktiv();

    /*  
     * Mit der Anzahl der falschen Antworten, wird der Ausblendstring ermittelt.
     */
    var ausblend_str = undefined;
 
    /*  
     * Pruefung: Ausblendanzahl korrekt ?
     * 
     * Die Anzahl der Fragen, welche je korrekter Antwort drinbleiben sollen
     * muss groesser als 0 und kleiner 8 sein.
     */
    if ( ( pAnzahlFalscheAntwortenJeKorrekterAntwort > 0 ) && ( pAnzahlFalscheAntwortenJeKorrekterAntwort < 8 ) )
    {
      /*  
       * Es wird die Anzahl der korrekten Antworten ermittelt.
       */
      var anzahl_korrekte_antworten = this.getAnzahlKorrekteAntworten(); 

      /*  
       * Anzahl der falschen Antworten berechnen, welche drin bleiben sollen
       */
      var anzahl_falscher_antworten_die_bleiben = anzahl_korrekte_antworten * pAnzahlFalscheAntwortenJeKorrekterAntwort;

      /*  
       * Es wird die Anzahl der falschen Antworten ermittelt.
       */
      var anzahl_falsche_antworten = this.getAnzahlFalscheAntworten(); 

      /*  
       * Die Anzahl der Antworten, die bleiben, muss kleiner als 
       * die Gesamtanzahl der falschen Antworten sein.
       * 
       * Ist die Anzahl der bleibenden Antworten groesser als die 
       * Gesamtanzahl der falschen Antworten, dann bleiben eh alle 
       * falschen Antworten erhalten.
       */
      if ( anzahl_falscher_antworten_die_bleiben < anzahl_falsche_antworten )
      {
        var anzahl_antworten_raus = anzahl_falsche_antworten - anzahl_falscher_antworten_die_bleiben;

        /* 
         * Erstellung Ausblendstring 
         * 
         * Fuer jede Antwort, die "inaktiv" werden soll, gibt es eine "1".
         * 
         * Fuer jede Antwort, die "aktiv" bleiben soll, gibt es eine "0"
         */
        ausblend_string = fkString.left( "11111111", anzahl_antworten_raus ) + fkString.left( "00000000", anzahl_falscher_antworten_die_bleiben );

        /* 
         * Der Ausblendstring wird per Zufall umgestellt.
         */
        ausblend_string = fkString.getRandomUmgestellt( 20, ausblend_string );

        /*
         * 1 korrekte Antwort * 2 je drin bleiben = 2 bleiben drin
         * 
         * Gibt es 3 falsche Antworten 
         * 
         * 2 bleiben drin < 3 falsche Antworten = 1 Antwort muss raus
         * 
         * ------------------------------------------------------------------
         * 2 korrekte Antwort * 2 je drin bleiben = 4 bleiben drin
         * 
         * Gibt es 3 falsche Antworten 
         * 
         * 4 bleiben drin < 3 falsche Antworten = 0 Antworten raus
         * 
         ********************************************************************** 
         * 
         * 1 korrekte Antwort * 1 je drin bleiben = 1 falsche Antwort bleibt drin
         * 
         * Gibt es 3 falsche Antworten 
         * 
         * 1 bleibt drin < 3 falsche Antworten = 2 Antworten muessen raus
         * 
         * ------------------------------------------------------------------
         * 3 korrekte Antwort * 1 je drin bleiben = 3 bleiben drin
         * 
         * Gibt es 5 falsche Antworten 
         * 
         * 3 bleiben drin < 5 falsche Antworten = 2 Antworten muessen raus
         */

        this.setAntwortAktivFelderByAusblendString( ausblend_string );
      }
    }
  }


  clsFrage.prototype.setAntwortAktivFelderByAusblendString = function( pAusblendString )
  {
    if ( pAusblendString != undefined )
    {
      /* 
       * Die Variable "index_ausblend_string" gibt die derzeitige Position
       * im Ausblendmuster an und bekommt eine 0 als Startwert.
       */
      var index_ausblend_string = 0;
   
      if ( this.m_antwort_instanz_a != undefined )
      {
        if ( this.m_antwort_instanz_a.getKnzKorrekt() == false )
        {
          this.m_antwort_aktiv_a = pAusblendString.charAt( index_ausblend_string ) === '0';
     
          index_ausblend_string++;
        }
      } 
      
      if ( this.m_antwort_instanz_b != undefined )
      {
        if ( this.m_antwort_instanz_b.getKnzKorrekt() == false )
        {
           this.m_antwort_aktiv_b = pAusblendString.charAt( index_ausblend_string ) === '0';
     
          index_ausblend_string++;
        }
      } 
 
      if ( this.m_antwort_instanz_c != undefined )
      {
        if ( this.m_antwort_instanz_c.getKnzKorrekt() == false )
        {
          this.m_antwort_aktiv_c = pAusblendString.charAt( index_ausblend_string ) === '0';
     
          index_ausblend_string++;
        }
      } 
 
      if ( this.m_antwort_instanz_d != undefined )
      {
        if ( this.m_antwort_instanz_d.getKnzKorrekt() == false )
        {
          this.m_antwort_aktiv_d = pAusblendString.charAt( index_ausblend_string ) === '0';
     
          index_ausblend_string++;
        }
      } 
 
      if ( this.m_antwort_instanz_e != undefined )
      {
        if ( this.m_antwort_instanz_e.getKnzKorrekt() == false )
        {
          this.m_antwort_aktiv_e = pAusblendString.charAt( index_ausblend_string ) === '0';
     
          index_ausblend_string++;
        }
      } 
 
      if ( this.m_antwort_instanz_f != undefined )
      {
        if ( this.m_antwort_instanz_f.getKnzKorrekt() == false )
        {
          this.m_antwort_aktiv_f = pAusblendString.charAt( index_ausblend_string ) === '0';
     
          index_ausblend_string++;
        }
      } 
 
      if ( this.m_antwort_instanz_g != undefined )
      {
        if ( this.m_antwort_instanz_g.getKnzKorrekt() == false )
        {
          this.m_antwort_aktiv_g = pAusblendString.charAt( index_ausblend_string ) === '0';
     
          index_ausblend_string++;
        }
      } 
 
      if ( this.m_antwort_instanz_h != undefined )
      {
        if ( this.m_antwort_instanz_h.getKnzKorrekt() == false )
        {
          this.m_antwort_aktiv_h = pAusblendString.charAt( index_ausblend_string ) === '0';
     
          index_ausblend_string++;
        }
      }
    } //  pAusblendString != undefined 
  }


  /**
   * Fuehrt einen Reset auf die Aktiv-Felder der Antworten aus.
   * Setzt alle Antworten auf Aktiv = true.
   */
  clsFrage.prototype.resetAntwortKnzAktiv = function()
  {
    this.m_antwort_aktiv_a = true;
    this.m_antwort_aktiv_b = true;
    this.m_antwort_aktiv_c = true;
    this.m_antwort_aktiv_d = true;
    this.m_antwort_aktiv_e = true;
    this.m_antwort_aktiv_f = true;
    this.m_antwort_aktiv_g = true;
    this.m_antwort_aktiv_h = true;
  }


  /**
   * Vertauscht die Antwortpositionen
   */
  clsFrage.prototype.startAntwortReihenfolgeUmstellen = function()
  {
    var fkt_ergebnis = true;

    /*
     * Vertauschen der Antwortreihenfolge
     * 
     * Fuer jede Antwort gibt es auf der Oberflaeche eine Position von 1 bis 8.
     * 
     * Im Normalfall ist Antwort A auf Position 1 und Antwort B auf 2 und so weiter.
     * 
     * In dieser Funktion wird jeder Antwort eine neue UI-Position zugewiesen.
     * 
     * Die Grundmenge von "12345678" steht jeweils fuer eine UI-Position.
     * 
     * Diese Grundmenge wird per Zufall umgestellt.
     * 
     * Danach bekommt Antwort A die UI-Position von dem ersten Zeichen und 
     * und B vom zweiten Zeichen der umgestellten Grundmenge. Das wird fuer 
     * alle Antworten gemacht.
     * 
     * Es werden immer alle 8 UI-Positionen benutzt. 
     * 
     * Sind weniger als 8 Antworten vorhanden, werden die nicht benutzten 
     * UI-Positionen beim Anzeigen der Frage ausgeblendet.
     */

    this.m_str_vertausch_reihenfolge = fkString.getRandomUmgestellt( 5, this.m_str_vertausch_reihenfolge );

    /*  
     * Index-Position Neu
     * Aus dem String der neuen UI-Positionen wird fuer jede Antwort die neue Index-Position gelesen.
     */  
    this.m_ui_position_antwort_a = parseInt( this.m_str_vertausch_reihenfolge.charAt( 0 ), 10 );
    this.m_ui_position_antwort_b = parseInt( this.m_str_vertausch_reihenfolge.charAt( 1 ), 10 );
    this.m_ui_position_antwort_c = parseInt( this.m_str_vertausch_reihenfolge.charAt( 2 ), 10 );
    this.m_ui_position_antwort_d = parseInt( this.m_str_vertausch_reihenfolge.charAt( 3 ), 10 );
    this.m_ui_position_antwort_e = parseInt( this.m_str_vertausch_reihenfolge.charAt( 4 ), 10 );
    this.m_ui_position_antwort_f = parseInt( this.m_str_vertausch_reihenfolge.charAt( 5 ), 10 );
    this.m_ui_position_antwort_g = parseInt( this.m_str_vertausch_reihenfolge.charAt( 6 ), 10 );
    this.m_ui_position_antwort_h = parseInt( this.m_str_vertausch_reihenfolge.charAt( 7 ), 10 );

    return fkt_ergebnis;
  }


  /**
   * Liefert fuer die angegebene UI-Position, die dort angezeigte Antwort zurueck.
   * 
   * Ist die UI-Position nicht 1 bis 8 wird undefined zurueckgegeben.
   * 
   * @param pUiPosition die abgefragte UI-Position (1 - 8)
   * @return die angezeigte Antwort an der UI-Position, oder undefined wenn dort keine Antwort vorhanden ist
   */
  clsFrage.prototype.getAntwortAnUiPosition = function( pUiPosition )
  {    
    /*
     * Es wird nachgeschaut, welche Antwort die abgefragte UI-Position 
     * zugewiesen bekommen hat. 
     * 
     * Bei einer Uebereinstimmung, wird die Membervariable der Antwort zurueckgegeben.
     * Diese Variable kann ihrerseits wiederum "undefined" sein, wenn die Antwort 
     * bei der Frage nicht definiert ist.
     * 
     * Wird keine Uebereinstimmung gefunden, wird "undefined" zurueckgegeben.
     */
    if ( pUiPosition == this.m_ui_position_antwort_a ) { return ( this.m_antwort_aktiv_a ? this.m_antwort_instanz_a : undefined ); }
    if ( pUiPosition == this.m_ui_position_antwort_b ) { return ( this.m_antwort_aktiv_b ? this.m_antwort_instanz_b : undefined ); }
    if ( pUiPosition == this.m_ui_position_antwort_c ) { return ( this.m_antwort_aktiv_c ? this.m_antwort_instanz_c : undefined ); }
    if ( pUiPosition == this.m_ui_position_antwort_d ) { return ( this.m_antwort_aktiv_d ? this.m_antwort_instanz_d : undefined ); }
    if ( pUiPosition == this.m_ui_position_antwort_e ) { return ( this.m_antwort_aktiv_e ? this.m_antwort_instanz_e : undefined ); }
    if ( pUiPosition == this.m_ui_position_antwort_f ) { return ( this.m_antwort_aktiv_f ? this.m_antwort_instanz_f : undefined ); }
    if ( pUiPosition == this.m_ui_position_antwort_g ) { return ( this.m_antwort_aktiv_g ? this.m_antwort_instanz_g : undefined ); }
    if ( pUiPosition == this.m_ui_position_antwort_h ) { return ( this.m_antwort_aktiv_h ? this.m_antwort_instanz_h : undefined ); }

    return undefined;
  }


  /**
   * Fuehrt einen Reset auf die UI-Positionen der Antworten durch.
   * Antwort A erscheint fest auf UI-Position 1, usw
   */
  clsFrage.prototype.resetAntwortIndexPosition = function()
  {
    this.m_ui_position_antwort_a = 1;
    this.m_ui_position_antwort_b = 2;
    this.m_ui_position_antwort_c = 3;
    this.m_ui_position_antwort_d = 4;
    this.m_ui_position_antwort_e = 5;
    this.m_ui_position_antwort_f = 6;
    this.m_ui_position_antwort_g = 7;
    this.m_ui_position_antwort_h = 8;
  }

  /**
   * Funktion zum Abfragen, ob an einer UI-Position eine Antwort vorhanden ist.
   * 
   * Ist an der Position eine Antwort definiert, wird TRUE zurueckgegeben.
   * Ist an der Position keine Antwort definiert, wird FALSE zurueckgegeben.
   */
  clsFrage.prototype.hasUiPositionAntwort = function( pUiPosition ) 
  { 
    return this.getAntwortAnUiPosition( pUiPosition ) != undefined; 
  }


  /**
   * Funktion zum Abfragen der Antwortbezeichnung an einer UI-Position.
   * 
   * Ist an der Position keine Antwort definiert, wird ein Leerstring zurueckgegeben.
   */
  clsFrage.prototype.getUiPositionAntwortBez = function( pUiPosition ) 
  { 
    return ( this.getAntwortAnUiPosition( pUiPosition ) != undefined ? this.getAntwortAnUiPosition( pUiPosition ).getAntwortBez() : "" ); 
  }


  /**
   * Funktion zum Abfragen des Antworttextes an einer UI-Position.
   * 
   * Ist an der Position keine Antwort definiert, wird ein Leerstring zurueckgegeben.
   */
  clsFrage.prototype.getUiPositionAntwortText = function( pUiPosition ) 
  { 
    return ( this.getAntwortAnUiPosition( pUiPosition ) != undefined ? this.getAntwortAnUiPosition( pUiPosition ).getAntwortText() : "" ); 
  }


  /**
   * Funktion zum Abfragen, ob eine Antwort an einer UI-Position korrekt ist.
   * 
   * Ist an der Position keine Antwort definiert, wird false zurueckgegeben.
   */
  clsFrage.prototype.getUiPositionAntwortKorrekt = function( pUiPosition ) 
  { 
    return ( this.getAntwortAnUiPosition( pUiPosition ) != undefined ? this.getAntwortAnUiPosition( pUiPosition ).getKnzKorrekt() : false ); 
  }


  /**
   * Schaut nach, welche Antwort der UI-Position zugewiesen ist
   * und gibt das entsprechende Kennzeichenfeld aus den Parametern 
   * zurueck.
   * 
   * Ist der Parameter "pUiPosition" nicht im Bereich von 1 bis 8,
   * wird FALSE zurueckgegeben.
   * 
   * Mit dieser Funktion werden die einmal getroffenen Antwortauswahlen,
   * den neuen UI-Positionen zugewiesen.
   * 
   * 
   * @param pUiPosition die abgefragte UI-Position (1 - 8)
   * @param pKnzAntwortA Kennzeichenfeld, ob Antwort A schon einmal ausgewaehlt war
   * @param pKnzAntwortB Kennzeichenfeld, ob Antwort B schon einmal ausgewaehlt war
   * @param pKnzAntwortC Kennzeichenfeld, ob Antwort C schon einmal ausgewaehlt war
   * @param pKnzAntwortD Kennzeichenfeld, ob Antwort D schon einmal ausgewaehlt war
   * @param pKnzAntwortE Kennzeichenfeld, ob Antwort E schon einmal ausgewaehlt war
   * @param pKnzAntwortF Kennzeichenfeld, ob Antwort F schon einmal ausgewaehlt war
   * @param pKnzAntwortG Kennzeichenfeld, ob Antwort G schon einmal ausgewaehlt war
   * @param pKnzAntwortH Kennzeichenfeld, ob Antwort H schon einmal ausgewaehlt war
   * @return das Kennzeichenfeld der Antwort, wenn die Antwort an der UI-Position angezeigt wird, sonst FALSE
   */
  clsFrage.prototype.istUiPositionChecked = function( pUiPosition, pKnzAntwortA, pKnzAntwortB, pKnzAntwortC, pKnzAntwortD, pKnzAntwortE, pKnzAntwortF, pKnzAntwortG, pKnzAntwortH )
  {
    if ( pUiPosition == this.m_ui_position_antwort_a ) { return pKnzAntwortA; }
    if ( pUiPosition == this.m_ui_position_antwort_b ) { return pKnzAntwortB; }
    if ( pUiPosition == this.m_ui_position_antwort_c ) { return pKnzAntwortC; }
    if ( pUiPosition == this.m_ui_position_antwort_d ) { return pKnzAntwortD; }
    if ( pUiPosition == this.m_ui_position_antwort_e ) { return pKnzAntwortE; }
    if ( pUiPosition == this.m_ui_position_antwort_f ) { return pKnzAntwortF; }
    if ( pUiPosition == this.m_ui_position_antwort_g ) { return pKnzAntwortG; }
    if ( pUiPosition == this.m_ui_position_antwort_h ) { return pKnzAntwortH; }

    return false;
  }


  /**
   * Liefert die Anzahl der korrekten Antworten zurueck.
   * 
   * Bei jeder vorhandenen und korrekten Antwort wird ein Zaehler erhoeht.
   * 
   * Diese Funktion beruecksichtigt alle Antworten. 
   * Keine Funktion fuer die UI-Oberflaeche.
   * 
   * @return die Anzahl der insgesamt korrekten Antworten
   */
  clsFrage.prototype.getAnzahlKorrekteAntworten = function()
  {
    var anzahl_antworten_korrekt = 0;

    if ( this.m_antwort_instanz_a != undefined ) { anzahl_antworten_korrekt += this.m_antwort_instanz_a.getKnzKorrektInt(); }
    if ( this.m_antwort_instanz_b != undefined ) { anzahl_antworten_korrekt += this.m_antwort_instanz_b.getKnzKorrektInt(); }
    if ( this.m_antwort_instanz_c != undefined ) { anzahl_antworten_korrekt += this.m_antwort_instanz_c.getKnzKorrektInt(); }
    if ( this.m_antwort_instanz_d != undefined ) { anzahl_antworten_korrekt += this.m_antwort_instanz_d.getKnzKorrektInt(); }
    if ( this.m_antwort_instanz_e != undefined ) { anzahl_antworten_korrekt += this.m_antwort_instanz_e.getKnzKorrektInt(); }
    if ( this.m_antwort_instanz_f != undefined ) { anzahl_antworten_korrekt += this.m_antwort_instanz_f.getKnzKorrektInt(); }
    if ( this.m_antwort_instanz_g != undefined ) { anzahl_antworten_korrekt += this.m_antwort_instanz_g.getKnzKorrektInt(); }
    if ( this.m_antwort_instanz_h != undefined ) { anzahl_antworten_korrekt += this.m_antwort_instanz_h.getKnzKorrektInt(); }

    return anzahl_antworten_korrekt;
  }


  /**
   * Liefert die Anzahl der falschen Antworten zurueck.
   * 
   * Bei jeder vorhandenen und falschen Antwort wird ein Zaehler erhoeht.
   * 
   * Diese Funktion beruecksichtigt alle Antworten. 
   * Keine Funktion fuer die UI-Oberflaeche.
   * 
   * @return die Anzahl der insgesamt korrekten Antworten
   */
  clsFrage.prototype.getAnzahlFalscheAntworten = function()
  {
    var anzahl_antworten_falsch = 0;

    if ( this.m_antwort_instanz_a != undefined ) { anzahl_antworten_falsch += this.m_antwort_instanz_a.getKnzFalschInt(); }
    if ( this.m_antwort_instanz_b != undefined ) { anzahl_antworten_falsch += this.m_antwort_instanz_b.getKnzFalschInt(); }
    if ( this.m_antwort_instanz_c != undefined ) { anzahl_antworten_falsch += this.m_antwort_instanz_c.getKnzFalschInt(); }
    if ( this.m_antwort_instanz_d != undefined ) { anzahl_antworten_falsch += this.m_antwort_instanz_d.getKnzFalschInt(); }
    if ( this.m_antwort_instanz_e != undefined ) { anzahl_antworten_falsch += this.m_antwort_instanz_e.getKnzFalschInt(); }
    if ( this.m_antwort_instanz_f != undefined ) { anzahl_antworten_falsch += this.m_antwort_instanz_f.getKnzFalschInt(); }
    if ( this.m_antwort_instanz_g != undefined ) { anzahl_antworten_falsch += this.m_antwort_instanz_g.getKnzFalschInt(); }
    if ( this.m_antwort_instanz_h != undefined ) { anzahl_antworten_falsch += this.m_antwort_instanz_h.getKnzFalschInt(); }

    return anzahl_antworten_falsch;
  }


  /**
   * Liefert die Anzahl der vorhandenen Antworten zurueck
   * 
   * Bei jeder vorhandenen Antwort wird ein Zaehler erhoeht.
   * 
   * Diese Funktion beruecksichtigt alle Antworten. 
   * Keine Funktion fuer die UI-Oberflaeche.
   * 
   * @return die Anzahl der insgesamt korrekten Antworten
   */
  clsFrage.prototype.getAnzahlVorhandeneAntworten = function()
  {
    var anzahl_antworten_vorhanden = 0;

    anzahl_antworten_vorhanden += ( this.m_antwort_instanz_a != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.m_antwort_instanz_b != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.m_antwort_instanz_c != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.m_antwort_instanz_d != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.m_antwort_instanz_e != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.m_antwort_instanz_f != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.m_antwort_instanz_g != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.m_antwort_instanz_h != undefined ? 1 : 0 );

    return anzahl_antworten_vorhanden;
  }


  /**
   * Liefert die Information zurueck, ob Antwort A mit der Checkbox ausgewaehlt wurde.
   * 
   * @return den Wert des Kennzeichenfeldes der UI-Position, oder FALSE wenn die UI-Position nicht belegt ist.
   */
  clsFrage.prototype.istAntwortAChecked = function( pKnzChekboxUiPos1, pKnzChekboxUiPos2, pKnzChekboxUiPos3, pKnzChekboxUiPos4, pKnzChekboxUiPos5, pKnzChekboxUiPos6, pKnzChekboxUiPos7, pKnzChekboxUiPos8 )
  {
    /*  
     * Es kommen alle Kennzeichenfelder der Checkboxen rein (TRUE gewaehlt, FALSE nicht gewaehlt)
     * 
     * Es wird geprueft, an welcher UI-Position Antwort A steht. 
     * Es wird die Kennzeichenvariable zurueckgegeben, an dessen UI-Position Antwort A steht.
     * 
     * Steht Antwort A auf Position 1, wird die Kennzeichenvariable fuer 1 zurueck gegeben.
     * Steht Antwort A auf Position 2, wird die Kennzeichenvariable fuer 2 zurueck gegeben.
     * 
     * Ist Antwort A unbelegt (Position 9) wird FALSE zurueckgegeben.
     */  
    if ( this.m_ui_position_antwort_a == 1 ) { return pKnzChekboxUiPos1; }
    if ( this.m_ui_position_antwort_a == 2 ) { return pKnzChekboxUiPos2; }
    if ( this.m_ui_position_antwort_a == 3 ) { return pKnzChekboxUiPos3; }
    if ( this.m_ui_position_antwort_a == 4 ) { return pKnzChekboxUiPos4; }
    if ( this.m_ui_position_antwort_a == 5 ) { return pKnzChekboxUiPos5; }
    if ( this.m_ui_position_antwort_a == 6 ) { return pKnzChekboxUiPos6; }
    if ( this.m_ui_position_antwort_a == 7 ) { return pKnzChekboxUiPos7; }
    if ( this.m_ui_position_antwort_a == 8 ) { return pKnzChekboxUiPos8; }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob Antwort B mit der Checkbox ausgewaehlt wurde.
   * 
   * @return den Wert des Kennzeichenfeldes der UI-Position, oder FALSE wenn die UI-Position nicht belegt ist.
   */
  clsFrage.prototype.istAntwortBChecked = function( pKnzChekboxUiPos1, pKnzChekboxUiPos2, pKnzChekboxUiPos3, pKnzChekboxUiPos4, pKnzChekboxUiPos5, pKnzChekboxUiPos6, pKnzChekboxUiPos7, pKnzChekboxUiPos8 )
  {
    if ( this.m_ui_position_antwort_b == 1 ) { return pKnzChekboxUiPos1; }
    if ( this.m_ui_position_antwort_b == 2 ) { return pKnzChekboxUiPos2; }
    if ( this.m_ui_position_antwort_b == 3 ) { return pKnzChekboxUiPos3; }
    if ( this.m_ui_position_antwort_b == 4 ) { return pKnzChekboxUiPos4; }
    if ( this.m_ui_position_antwort_b == 5 ) { return pKnzChekboxUiPos5; }
    if ( this.m_ui_position_antwort_b == 6 ) { return pKnzChekboxUiPos6; }
    if ( this.m_ui_position_antwort_b == 7 ) { return pKnzChekboxUiPos7; }
    if ( this.m_ui_position_antwort_b == 8 ) { return pKnzChekboxUiPos8; }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob Antwort C mit der Checkbox ausgewaehlt wurde.
   * 
   * @return den Wert des Kennzeichenfeldes der UI-Position, oder FALSE wenn die UI-Position nicht belegt ist.
   */
  clsFrage.prototype.istAntwortCChecked = function( pKnzChekboxUiPos1, pKnzChekboxUiPos2, pKnzChekboxUiPos3, pKnzChekboxUiPos4, pKnzChekboxUiPos5, pKnzChekboxUiPos6, pKnzChekboxUiPos7, pKnzChekboxUiPos8 )
  {
    if ( this.m_ui_position_antwort_c == 1 ) { return pKnzChekboxUiPos1; }
    if ( this.m_ui_position_antwort_c == 2 ) { return pKnzChekboxUiPos2; }
    if ( this.m_ui_position_antwort_c == 3 ) { return pKnzChekboxUiPos3; }
    if ( this.m_ui_position_antwort_c == 4 ) { return pKnzChekboxUiPos4; }
    if ( this.m_ui_position_antwort_c == 5 ) { return pKnzChekboxUiPos5; }
    if ( this.m_ui_position_antwort_c == 6 ) { return pKnzChekboxUiPos6; }
    if ( this.m_ui_position_antwort_c == 7 ) { return pKnzChekboxUiPos7; }
    if ( this.m_ui_position_antwort_c == 8 ) { return pKnzChekboxUiPos8; }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob Antwort D mit der Checkbox ausgewaehlt wurde.
   * 
   * @return den Wert des Kennzeichenfeldes der UI-Position, oder FALSE wenn die UI-Position nicht belegt ist.
   */
  clsFrage.prototype.istAntwortDChecked = function( pKnzChekboxUiPos1, pKnzChekboxUiPos2, pKnzChekboxUiPos3, pKnzChekboxUiPos4, pKnzChekboxUiPos5, pKnzChekboxUiPos6, pKnzChekboxUiPos7, pKnzChekboxUiPos8 )
  {
    if ( this.m_ui_position_antwort_d == 1 ) { return pKnzChekboxUiPos1; }
    if ( this.m_ui_position_antwort_d == 2 ) { return pKnzChekboxUiPos2; }
    if ( this.m_ui_position_antwort_d == 3 ) { return pKnzChekboxUiPos3; }
    if ( this.m_ui_position_antwort_d == 4 ) { return pKnzChekboxUiPos4; }
    if ( this.m_ui_position_antwort_d == 5 ) { return pKnzChekboxUiPos5; }
    if ( this.m_ui_position_antwort_d == 6 ) { return pKnzChekboxUiPos6; }
    if ( this.m_ui_position_antwort_d == 7 ) { return pKnzChekboxUiPos7; }
    if ( this.m_ui_position_antwort_d == 8 ) { return pKnzChekboxUiPos8; }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob Antwort E mit der Checkbox ausgewaehlt wurde.
   * 
   * @return den Wert des Kennzeichenfeldes der UI-Position, oder FALSE wenn die UI-Position nicht belegt ist.
   */
  clsFrage.prototype.istAntwortEChecked = function( pKnzChekboxUiPos1, pKnzChekboxUiPos2, pKnzChekboxUiPos3, pKnzChekboxUiPos4, pKnzChekboxUiPos5, pKnzChekboxUiPos6, pKnzChekboxUiPos7, pKnzChekboxUiPos8 )
  {
    if ( this.m_ui_position_antwort_e == 1 ) { return pKnzChekboxUiPos1; }
    if ( this.m_ui_position_antwort_e == 2 ) { return pKnzChekboxUiPos2; }
    if ( this.m_ui_position_antwort_e == 3 ) { return pKnzChekboxUiPos3; }
    if ( this.m_ui_position_antwort_e == 4 ) { return pKnzChekboxUiPos4; }
    if ( this.m_ui_position_antwort_e == 5 ) { return pKnzChekboxUiPos5; }
    if ( this.m_ui_position_antwort_e == 6 ) { return pKnzChekboxUiPos6; }
    if ( this.m_ui_position_antwort_e == 7 ) { return pKnzChekboxUiPos7; }
    if ( this.m_ui_position_antwort_e == 8 ) { return pKnzChekboxUiPos8; }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob Antwort F mit der Checkbox ausgewaehlt wurde.
   * 
   * @return den Wert des Kennzeichenfeldes der UI-Position, oder FALSE wenn die UI-Position nicht belegt ist.
   */
  clsFrage.prototype.istAntwortFChecked = function( pKnzChekboxUiPos1, pKnzChekboxUiPos2, pKnzChekboxUiPos3, pKnzChekboxUiPos4, pKnzChekboxUiPos5, pKnzChekboxUiPos6, pKnzChekboxUiPos7, pKnzChekboxUiPos8 )
  {
    if ( this.m_ui_position_antwort_f == 1 ) { return pKnzChekboxUiPos1; }
    if ( this.m_ui_position_antwort_f == 2 ) { return pKnzChekboxUiPos2; }
    if ( this.m_ui_position_antwort_f == 3 ) { return pKnzChekboxUiPos3; }
    if ( this.m_ui_position_antwort_f == 4 ) { return pKnzChekboxUiPos4; }
    if ( this.m_ui_position_antwort_f == 5 ) { return pKnzChekboxUiPos5; }
    if ( this.m_ui_position_antwort_f == 6 ) { return pKnzChekboxUiPos6; }
    if ( this.m_ui_position_antwort_f == 7 ) { return pKnzChekboxUiPos7; }
    if ( this.m_ui_position_antwort_f == 8 ) { return pKnzChekboxUiPos8; }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob Antwort G mit der Checkbox ausgewaehlt wurde.
   * 
   * @return den Wert des Kennzeichenfeldes der UI-Position, oder FALSE wenn die UI-Position nicht belegt ist.
   */
  clsFrage.prototype.istAntwortGChecked = function( pKnzChekboxUiPos1, pKnzChekboxUiPos2, pKnzChekboxUiPos3, pKnzChekboxUiPos4, pKnzChekboxUiPos5, pKnzChekboxUiPos6, pKnzChekboxUiPos7, pKnzChekboxUiPos8 )
  {
    if ( this.m_ui_position_antwort_g == 1 ) { return pKnzChekboxUiPos1; }
    if ( this.m_ui_position_antwort_g == 2 ) { return pKnzChekboxUiPos2; }
    if ( this.m_ui_position_antwort_g == 3 ) { return pKnzChekboxUiPos3; }
    if ( this.m_ui_position_antwort_g == 4 ) { return pKnzChekboxUiPos4; }
    if ( this.m_ui_position_antwort_g == 5 ) { return pKnzChekboxUiPos5; }
    if ( this.m_ui_position_antwort_g == 6 ) { return pKnzChekboxUiPos6; }
    if ( this.m_ui_position_antwort_g == 7 ) { return pKnzChekboxUiPos7; }
    if ( this.m_ui_position_antwort_g == 8 ) { return pKnzChekboxUiPos8; }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob Antwort H mit der Checkbox ausgewaehlt wurde.
   * 
   * @return den Wert des Kennzeichenfeldes der UI-Position, oder FALSE wenn die UI-Position nicht belegt ist.
   */
  clsFrage.prototype.istAntwortHChecked = function( pKnzChekboxUiPos1, pKnzChekboxUiPos2, pKnzChekboxUiPos3, pKnzChekboxUiPos4, pKnzChekboxUiPos5, pKnzChekboxUiPos6, pKnzChekboxUiPos7, pKnzChekboxUiPos8 )
  {
    if ( this.m_ui_position_antwort_h == 1 ) { return pKnzChekboxUiPos1; }
    if ( this.m_ui_position_antwort_h == 2 ) { return pKnzChekboxUiPos2; }
    if ( this.m_ui_position_antwort_h == 3 ) { return pKnzChekboxUiPos3; }
    if ( this.m_ui_position_antwort_h == 4 ) { return pKnzChekboxUiPos4; }
    if ( this.m_ui_position_antwort_h == 5 ) { return pKnzChekboxUiPos5; }
    if ( this.m_ui_position_antwort_h == 6 ) { return pKnzChekboxUiPos6; }
    if ( this.m_ui_position_antwort_h == 7 ) { return pKnzChekboxUiPos7; }
    if ( this.m_ui_position_antwort_h == 8 ) { return pKnzChekboxUiPos8; }

    return false;
  }


  /**
   * Liefert die Anzahl der korrekten aktiven Antworten zurueck.
   * 
   * Bei jeder vorhandenen und korrekten Antwort wird ein Zaehler erhoeht.
   * 
   * @return die Anzahl der insgesamt korrekten aktiven Antworten
   */
  clsFrage.prototype.getUiAnzahlKorrekteAntworten = function()
  {
    var anzahl_antworten_korrekt = 0;

    if ( this.getAntwortAnUiPosition( 1 ) != undefined ) { anzahl_antworten_korrekt += this.getAntwortAnUiPosition( 1 ).getKnzKorrektInt(); }
    if ( this.getAntwortAnUiPosition( 2 ) != undefined ) { anzahl_antworten_korrekt += this.getAntwortAnUiPosition( 2 ).getKnzKorrektInt(); }
    if ( this.getAntwortAnUiPosition( 3 ) != undefined ) { anzahl_antworten_korrekt += this.getAntwortAnUiPosition( 3 ).getKnzKorrektInt(); }
    if ( this.getAntwortAnUiPosition( 4 ) != undefined ) { anzahl_antworten_korrekt += this.getAntwortAnUiPosition( 4 ).getKnzKorrektInt(); }
    if ( this.getAntwortAnUiPosition( 5 ) != undefined ) { anzahl_antworten_korrekt += this.getAntwortAnUiPosition( 5 ).getKnzKorrektInt(); }
    if ( this.getAntwortAnUiPosition( 6 ) != undefined ) { anzahl_antworten_korrekt += this.getAntwortAnUiPosition( 6 ).getKnzKorrektInt(); }
    if ( this.getAntwortAnUiPosition( 7 ) != undefined ) { anzahl_antworten_korrekt += this.getAntwortAnUiPosition( 7 ).getKnzKorrektInt(); }
    if ( this.getAntwortAnUiPosition( 8 ) != undefined ) { anzahl_antworten_korrekt += this.getAntwortAnUiPosition( 8 ).getKnzKorrektInt(); }

    return anzahl_antworten_korrekt;
  }


  /**
   * Liefert die Anzahl der falschen aktiven Antworten zurueck.
   * 
   * Bei jeder vorhandenen und falschen Antwort wird ein Zaehler erhoeht.
   * 
   * @return die Anzahl der insgesamt falschen aktiven Antworten
   */
  clsFrage.prototype.getUiAnzahlFalscheAntworten = function()
  {
    var anzahl_antworten_falsch = 0;

    if ( this.getAntwortAnUiPosition( 1 ) != undefined ) { anzahl_antworten_falsch += this.getAntwortAnUiPosition( 1 ).getKnzFalschInt(); }
    if ( this.getAntwortAnUiPosition( 2 ) != undefined ) { anzahl_antworten_falsch += this.getAntwortAnUiPosition( 2 ).getKnzFalschInt(); }
    if ( this.getAntwortAnUiPosition( 3 ) != undefined ) { anzahl_antworten_falsch += this.getAntwortAnUiPosition( 3 ).getKnzFalschInt(); }
    if ( this.getAntwortAnUiPosition( 4 ) != undefined ) { anzahl_antworten_falsch += this.getAntwortAnUiPosition( 4 ).getKnzFalschInt(); }
    if ( this.getAntwortAnUiPosition( 5 ) != undefined ) { anzahl_antworten_falsch += this.getAntwortAnUiPosition( 5 ).getKnzFalschInt(); }
    if ( this.getAntwortAnUiPosition( 6 ) != undefined ) { anzahl_antworten_falsch += this.getAntwortAnUiPosition( 6 ).getKnzFalschInt(); }
    if ( this.getAntwortAnUiPosition( 7 ) != undefined ) { anzahl_antworten_falsch += this.getAntwortAnUiPosition( 7 ).getKnzFalschInt(); }
    if ( this.getAntwortAnUiPosition( 8 ) != undefined ) { anzahl_antworten_falsch += this.getAntwortAnUiPosition( 8 ).getKnzFalschInt(); }

    return anzahl_antworten_falsch;
  }


  /**
   * Liefert die Anzahl der vorhandenen aktiven Antworten zurueck
   * 
   * Bei jeder vorhandenen Antwort wird ein Zaehler erhoeht.
   * 
   * @return die Anzahl der insgesamt korrekten aktiven Antworten
   */
  clsFrage.prototype.getUiAnzahlVorhandeneAntworten = function()
  {
    var anzahl_antworten_vorhanden = 0;

    anzahl_antworten_vorhanden += ( this.getAntwortAnUiPosition( 1 ) != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.getAntwortAnUiPosition( 2 ) != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.getAntwortAnUiPosition( 3 ) != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.getAntwortAnUiPosition( 4 ) != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.getAntwortAnUiPosition( 5 ) != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.getAntwortAnUiPosition( 6 ) != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.getAntwortAnUiPosition( 7 ) != undefined ? 1 : 0 );
    anzahl_antworten_vorhanden += ( this.getAntwortAnUiPosition( 8 ) != undefined ? 1 : 0 );

    return anzahl_antworten_vorhanden;
  }


  /**
   * Liefert den String mit den Statusangaben zurueck, welche Antwort aktiv ist.
   * 
   * Ist die Antwort aktiv wird eine "1" dem Ergebnisstring hinzugefuegt, sonst eine "0".
   * 
   * @return den aktuellen Aktiv-String
   */
  clsFrage.prototype.getUiAktivString = function()
  {
    var str_antworten_aktiv = " AktivString: ";

    str_antworten_aktiv += ( this.getAntwortAnUiPosition( 1 ) != undefined ? "1" : "0" );
    str_antworten_aktiv += ( this.getAntwortAnUiPosition( 2 ) != undefined ? "1" : "0" );
    str_antworten_aktiv += ( this.getAntwortAnUiPosition( 3 ) != undefined ? "1" : "0" );
    str_antworten_aktiv += ( this.getAntwortAnUiPosition( 4 ) != undefined ? "1" : "0" );
    str_antworten_aktiv += ( this.getAntwortAnUiPosition( 5 ) != undefined ? "1" : "0" );
    str_antworten_aktiv += ( this.getAntwortAnUiPosition( 6 ) != undefined ? "1" : "0" );
    str_antworten_aktiv += ( this.getAntwortAnUiPosition( 7 ) != undefined ? "1" : "0" );
    str_antworten_aktiv += ( this.getAntwortAnUiPosition( 8 ) != undefined ? "1" : "0" );

    return str_antworten_aktiv;
  }


  /*
   * Funktionen zum setzen der Antworten 
   */

  clsFrage.prototype.setAntwortA = function( pAntwortA ) { this.m_antwort_instanz_a = pAntwortA; }
  clsFrage.prototype.setAntwortB = function( pAntwortB ) { this.m_antwort_instanz_b = pAntwortB; }
  clsFrage.prototype.setAntwortC = function( pAntwortC ) { this.m_antwort_instanz_c = pAntwortC; }
  clsFrage.prototype.setAntwortD = function( pAntwortD ) { this.m_antwort_instanz_d = pAntwortD; }
  clsFrage.prototype.setAntwortE = function( pAntwortE ) { this.m_antwort_instanz_e = pAntwortE; }
  clsFrage.prototype.setAntwortF = function( pAntwortF ) { this.m_antwort_instanz_f = pAntwortF; }
  clsFrage.prototype.setAntwortG = function( pAntwortG ) { this.m_antwort_instanz_g = pAntwortG; }
  clsFrage.prototype.setAntwortH = function( pAntwortH ) { this.m_antwort_instanz_h = pAntwortH; }


  /*
   * Funktionen zum holen der Antworten nach normaler Reihenfolge
   */

  clsFrage.prototype.getAntwortA = function() { return this.m_antwort_instanz_a; }
  clsFrage.prototype.getAntwortB = function() { return this.m_antwort_instanz_b; }
  clsFrage.prototype.getAntwortC = function() { return this.m_antwort_instanz_c; }
  clsFrage.prototype.getAntwortD = function() { return this.m_antwort_instanz_d; }
  clsFrage.prototype.getAntwortE = function() { return this.m_antwort_instanz_e; }
  clsFrage.prototype.getAntwortF = function() { return this.m_antwort_instanz_f; }
  clsFrage.prototype.getAntwortG = function() { return this.m_antwort_instanz_g; }
  clsFrage.prototype.getAntwortH = function() { return this.m_antwort_instanz_h; }


  /*
   * Funktionen zum Abfragen, ob eine Antwort vorhanden ist nach normaler Reihenfolge
   */

  clsFrage.prototype.hasAntwortA = function() { return this.m_antwort_instanz_a != undefined; }
  clsFrage.prototype.hasAntwortB = function() { return this.m_antwort_instanz_b != undefined; }
  clsFrage.prototype.hasAntwortC = function() { return this.m_antwort_instanz_c != undefined; }
  clsFrage.prototype.hasAntwortD = function() { return this.m_antwort_instanz_d != undefined; }
  clsFrage.prototype.hasAntwortE = function() { return this.m_antwort_instanz_e != undefined; }
  clsFrage.prototype.hasAntwortF = function() { return this.m_antwort_instanz_f != undefined; }
  clsFrage.prototype.hasAntwortG = function() { return this.m_antwort_instanz_g != undefined; }
  clsFrage.prototype.hasAntwortH = function() { return this.m_antwort_instanz_h != undefined; }


  /*
   * Funktionen zum holen des Antwort-Textes
   */

  clsFrage.prototype.getAntwortAText = function() { return ( this.m_antwort_instanz_a != undefined ? this.m_antwort_instanz_a.getAntwortText() : "" ); }
  clsFrage.prototype.getAntwortBText = function() { return ( this.m_antwort_instanz_b != undefined ? this.m_antwort_instanz_b.getAntwortText() : "" ); }
  clsFrage.prototype.getAntwortCText = function() { return ( this.m_antwort_instanz_c != undefined ? this.m_antwort_instanz_c.getAntwortText() : "" ); }
  clsFrage.prototype.getAntwortDText = function() { return ( this.m_antwort_instanz_d != undefined ? this.m_antwort_instanz_d.getAntwortText() : "" ); }
  clsFrage.prototype.getAntwortEText = function() { return ( this.m_antwort_instanz_e != undefined ? this.m_antwort_instanz_e.getAntwortText() : "" ); }
  clsFrage.prototype.getAntwortFText = function() { return ( this.m_antwort_instanz_f != undefined ? this.m_antwort_instanz_f.getAntwortText() : "" ); }
  clsFrage.prototype.getAntwortGText = function() { return ( this.m_antwort_instanz_g != undefined ? this.m_antwort_instanz_g.getAntwortText() : "" ); }
  clsFrage.prototype.getAntwortHText = function() { return ( this.m_antwort_instanz_h != undefined ? this.m_antwort_instanz_h.getAntwortText() : "" ); }


  /*
   * 
   */

  clsFrage.prototype.getAntwortAKorrekt = function() { return ( this.m_antwort_instanz_a != undefined ? this.m_antwort_instanz_a.getKnzKorrekt() : false ); }
  clsFrage.prototype.getAntwortBKorrekt = function() { return ( this.m_antwort_instanz_b != undefined ? this.m_antwort_instanz_b.getKnzKorrekt() : false ); }
  clsFrage.prototype.getAntwortCKorrekt = function() { return ( this.m_antwort_instanz_c != undefined ? this.m_antwort_instanz_c.getKnzKorrekt() : false ); }
  clsFrage.prototype.getAntwortDKorrekt = function() { return ( this.m_antwort_instanz_d != undefined ? this.m_antwort_instanz_d.getKnzKorrekt() : false ); }
  clsFrage.prototype.getAntwortEKorrekt = function() { return ( this.m_antwort_instanz_e != undefined ? this.m_antwort_instanz_e.getKnzKorrekt() : false ); }
  clsFrage.prototype.getAntwortFKorrekt = function() { return ( this.m_antwort_instanz_f != undefined ? this.m_antwort_instanz_f.getKnzKorrekt() : false ); }
  clsFrage.prototype.getAntwortGKorrekt = function() { return ( this.m_antwort_instanz_g != undefined ? this.m_antwort_instanz_g.getKnzKorrekt() : false ); }
  clsFrage.prototype.getAntwortHKorrekt = function() { return ( this.m_antwort_instanz_h != undefined ? this.m_antwort_instanz_h.getKnzKorrekt() : false ); }


  /*
   * 
   */

  clsFrage.prototype.getAntwortAFalsch = function() { return ( this.m_antwort_instanz_a != undefined ? this.m_antwort_instanz_a.getKnzFalsch() : false ); }
  clsFrage.prototype.getAntwortBFalsch = function() { return ( this.m_antwort_instanz_b != undefined ? this.m_antwort_instanz_b.getKnzFalsch() : false ); }
  clsFrage.prototype.getAntwortCFalsch = function() { return ( this.m_antwort_instanz_c != undefined ? this.m_antwort_instanz_c.getKnzFalsch() : false ); }
  clsFrage.prototype.getAntwortDFalsch = function() { return ( this.m_antwort_instanz_d != undefined ? this.m_antwort_instanz_d.getKnzFalsch() : false ); }
  clsFrage.prototype.getAntwortEFalsch = function() { return ( this.m_antwort_instanz_e != undefined ? this.m_antwort_instanz_e.getKnzFalsch() : false ); }
  clsFrage.prototype.getAntwortFFalsch = function() { return ( this.m_antwort_instanz_f != undefined ? this.m_antwort_instanz_f.getKnzFalsch() : false ); }
  clsFrage.prototype.getAntwortGFalsch = function() { return ( this.m_antwort_instanz_g != undefined ? this.m_antwort_instanz_g.getKnzFalsch() : false ); }
  clsFrage.prototype.getAntwortHFalsch = function() { return ( this.m_antwort_instanz_h != undefined ? this.m_antwort_instanz_h.getKnzFalsch() : false ); }


  /**
   * Liefert die ID der Antwort zurueck
   * 
   * @return die Antwort-ID
   */
  clsFrage.prototype.getId = function()
  {
    return this.m_id;
  }


  clsFrage.prototype.setId = function( pId )
  {
    this.m_id = pId;
  }


  /**
   * Liefert die Nummer der Antwort zurueck
   * 
   * @return die Antwortnummer
   */
  clsFrage.prototype.getNummer = function()
  {
    return this.m_nummer;
  }

  clsFrage.prototype.setNummer = function( pNummer )
  {
    this.m_nummer = pNummer;
  }


  /**
   * Liefert den Geltungsbereich der Antwort zurueck.
   * 
   * @return einen String, welcher den Geltungsbereich angibt
   */
  clsFrage.prototype.getGeltungsbereich = function()
  {
    return this.m_geltungsbereich;
  }

  clsFrage.prototype.setGeltungsbereich = function( pGeltungsbereich )
  {
    this.m_geltungsbereich = pGeltungsbereich;
  }

  clsFrage.prototype.getStrVertauschReihenfolge = function()
  {
    return this.m_str_vertausch_reihenfolge;
  }

  clsFrage.prototype.getText1 = function()
  {
    return this.m_text_1;
  }

  clsFrage.prototype.setText1 = function( pText1 )
  {
    this.m_text_1 = pText1;
  }

  clsFrage.prototype.getText2 = function()
  {
    return this.m_text_2;
  }

  clsFrage.prototype.setText2 = function( pText2 )
  {
    this.m_text_2 = pText2;
  }

  clsFrage.prototype.hasText2 = function()
  {
    return ( this.m_text_2 != undefined ) && ( this.m_text_2.length > 0 );
  }

  clsFrage.prototype.getBemerkung = function()
  {
    return this.m_bemerkung;
  }

  clsFrage.prototype.setBemerkung = function( pBemerkung )
  {
    this.m_bemerkung = pBemerkung;
  }

  clsFrage.prototype.getBild1 = function()
  {
    return this.m_bild_1;
  }

  clsFrage.prototype.setBild1 = function( pBild1 )
  {
    this.m_bild_1 = pBild1;

    if ( this.m_bild_1 != undefined )
    {
      if ( this.m_bild_1.trim() === "" )
      {
        this.m_bild_1 = undefined;
      }
    }
  }

  clsFrage.prototype.getBild2 = function()
  {
    return this.m_bild_2;
  }

  clsFrage.prototype.setBild2 = function( pBild2 ) 
  {
    this.m_bild_2 = pBild2; 
  }

  clsFrage.prototype.getBild3 = function() 
  { 
    return this.m_bild_3;
  }

  clsFrage.prototype.setBild3 = function( pBild3 ) 
  {
    this.m_bild_3 = pBild3;
  }

  clsFrage.prototype.getBild4 = function()
  {
    return this.m_bild_4;
  }

  clsFrage.prototype.setBild4 = function( pBild4 ) 
  {
    this.m_bild_4 = pBild4;
  }

  clsFrage.prototype.getLfdNummer = function()
  {
    return this.m_lfd_nummer;
  }

  clsFrage.prototype.setLfdNummer = function( pLfdNummer )
  {
    this.m_lfd_nummer = "" + pLfdNummer;
  }

  /**
   * Setzt alle Variablen auf "undefined".
   * 
   * Bei allen vorhandenen Antworten, wird vorher die "clear"-Funktion aufgerufen.
   */
  clsFrage.prototype.clear = function() 
  {
    this.m_id              = undefined;
    this.m_nummer          = undefined;
    this.m_geltungsbereich = undefined;
    this.m_text_1          = undefined;
    this.m_text_2          = undefined;
    this.m_bemerkung       = undefined;
    this.m_bild_1          = undefined;
    this.m_bild_2          = undefined;
    this.m_bild_3          = undefined;
    this.m_bild_4          = undefined;

    if ( this.m_antwort_instanz_a != undefined )
    {
      this.m_antwort_instanz_a.clear();
    }

    if ( this.m_antwort_instanz_b != undefined )
    {
      this.m_antwort_instanz_b.clear();
    }

    if ( this.m_antwort_instanz_c != undefined )
    {
      this.m_antwort_instanz_c.clear();
    }

    if ( this.m_antwort_instanz_d != undefined )
    {
      this.m_antwort_instanz_d.clear();
    }

    if ( this.m_antwort_instanz_e != undefined )
    {
      this.m_antwort_instanz_e.clear();
    }

    if ( this.m_antwort_instanz_f != undefined )
    {
      this.m_antwort_instanz_f.clear();
    }

    if ( this.m_antwort_instanz_g != undefined )
    {
      this.m_antwort_instanz_g.clear();
    }

    if ( this.m_antwort_instanz_h != undefined )
    {
      this.m_antwort_instanz_h.clear();
    }

    this.m_antwort_instanz_a = undefined;
    this.m_antwort_instanz_b = undefined;
    this.m_antwort_instanz_c = undefined;
    this.m_antwort_instanz_d = undefined;
    this.m_antwort_instanz_e = undefined;
    this.m_antwort_instanz_f = undefined;
    this.m_antwort_instanz_g = undefined;
    this.m_antwort_instanz_h = undefined; 
  }


  clsFrage.prototype.toString = function() 
  {
    var str_buffer = "";
    var mycr       = "\n";

    str_buffer = str_buffer + mycr + "---------- clsFrage ----------";

    str_buffer = str_buffer + mycr + "m_id              >" + this.m_id + "<";
    str_buffer = str_buffer + mycr + "m_nummer          >" + this.m_nummer + "<";
    str_buffer = str_buffer + mycr + "m_geltungsbereich >" + this.m_geltungsbereich + "<";
    str_buffer = str_buffer + mycr + "m_text_1          >" + this.m_text_1 + "<";
    str_buffer = str_buffer + mycr + "m_text_2          >" + this.m_text_2 + "<";
    str_buffer = str_buffer + mycr + "m_bemerkung       >" + this.m_bemerkung + "<";
    str_buffer = str_buffer + mycr + "m_bild_1          >" + this.m_bild_1 + "<";
    str_buffer = str_buffer + mycr + "m_bild_2          >" + this.m_bild_2 + "<";
    str_buffer = str_buffer + mycr + "m_bild_3          >" + this.m_bild_3 + "<";
    str_buffer = str_buffer + mycr + "m_bild_4          >" + this.m_bild_4 + "<";

    str_buffer = str_buffer + mycr + "m_antwort_aktiv_a       >" + this.m_antwort_aktiv_a + "<";
    str_buffer = str_buffer + mycr + "m_ui_position_antwort_a >" + this.m_ui_position_antwort_a + "<";

    if ( this.m_antwort_instanz_a == undefined )
    {
      str_buffer = str_buffer + mycr + "m_antwort_a     >undefined<";
    }
    else
    {
      str_buffer = str_buffer + mycr + "m_antwort_a     >" + this.m_antwort_instanz_a.toString() + "<";
    }

    str_buffer = str_buffer + mycr + "m_antwort_aktiv_b       >" + this.m_antwort_aktiv_b + "<";
    str_buffer = str_buffer + mycr + "m_ui_position_antwort_b >" + this.m_ui_position_antwort_b + "<";

    if ( this.m_antwort_instanz_b == undefined )
    {
      str_buffer = str_buffer + mycr + "m_antwort_b     >undefined<";
    }
    else
    {
      str_buffer = str_buffer + mycr + "m_antwort_b     >" + this.m_antwort_instanz_b.toString() + "<";
    }

    str_buffer = str_buffer + mycr + "m_antwort_aktiv_c       >" + this.m_antwort_aktiv_c + "<";
    str_buffer = str_buffer + mycr + "m_ui_position_antwort_c >" + this.m_ui_position_antwort_c + "<";

    if ( this.m_antwort_instanz_c == undefined )
    {
      str_buffer = str_buffer + mycr + "m_antwort_c     >undefined<";
    }
    else
    {
      str_buffer = str_buffer + mycr + "m_antwort_c     >" + this.m_antwort_instanz_c.toString() + "<";
    }

    str_buffer = str_buffer + mycr + "m_antwort_aktiv_d       >" + this.m_antwort_aktiv_d + "<";
    str_buffer = str_buffer + mycr + "m_ui_position_antwort_d >" + this.m_ui_position_antwort_d + "<";

    if ( this.m_antwort_instanz_d == undefined )
    {
      str_buffer = str_buffer + mycr + "m_antwort_d     >undefined<";
    }
    else
    {
      str_buffer = str_buffer + mycr + "m_antwort_d     >" + this.m_antwort_instanz_d.toString() + "<";
    }

    str_buffer = str_buffer + mycr + "m_antwort_aktiv_e       >" + this.m_antwort_aktiv_e + "<";
    str_buffer = str_buffer + mycr + "m_ui_position_antwort_e >" + this.m_ui_position_antwort_e + "<";

    if ( this.m_antwort_instanz_e == undefined )
    {
      str_buffer = str_buffer + mycr + "m_antwort_e     >undefined<";
    }
    else
    {
      str_buffer = str_buffer + mycr + "m_antwort_e     >" + this.m_antwort_instanz_e.toString() + "<";
    }

    str_buffer = str_buffer + mycr + "m_antwort_aktiv_f       >" + this.m_antwort_aktiv_f + "<";
    str_buffer = str_buffer + mycr + "m_ui_position_antwort_f >" + this.m_ui_position_antwort_f + "<";

    if ( this.m_antwort_instanz_f == undefined )
    {
      str_buffer = str_buffer + mycr + "m_antwort_f     >undefined<";
    }
    else
    {
      str_buffer = str_buffer + mycr + "m_antwort_f     >" + this.m_antwort_instanz_f.toString() + "<";
    }

    str_buffer = str_buffer + mycr + "m_antwort_aktiv_g       >" + this.m_antwort_aktiv_g + "<";
    str_buffer = str_buffer + mycr + "m_ui_position_antwort_g >" + this.m_ui_position_antwort_g + "<";

    if ( this.m_antwort_instanz_g == undefined )
    {
      str_buffer = str_buffer + mycr + "m_antwort_g     >undefined<";
    }
    else
    {
      str_buffer = str_buffer + mycr + "m_antwort_g     >" + this.m_antwort_instanz_g.toString() + "<";
    }

    str_buffer = str_buffer + mycr + "m_antwort_aktiv_h       >" + this.m_antwort_aktiv_h + "<";
    str_buffer = str_buffer + mycr + "m_ui_position_antwort_h >" + this.m_ui_position_antwort_h + "<";

    if ( this.m_antwort_instanz_h == undefined )
    {
      str_buffer = str_buffer + mycr + "m_antwort_h     >undefined<";
    }
    else
    {
      str_buffer = str_buffer + mycr + "m_antwort_h     >" + this.m_antwort_instanz_h.toString() + "<";
    }

    return str_buffer; 
 }


