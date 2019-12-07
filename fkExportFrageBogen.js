  
  function clsExportFrageBogen()
  {
    this.EXPORT_LERN_FABRIK_ALLES          = 1;
    this.EXPORT_LERN_FABRIK_KORREKT        = 2;
    this.EXPORT_LERN_FABRIK_FALSCH         = 3;

    this.KNZ_LOESUNGSBOGEN_VERSON_1        = false;
    this.KNZ_SET_TRENNZEILE                = true;

    this.MINDEST_ZEILEN_LOESUNGSBOGEN      = 10;
    this.VORGABE_ANZ_STELLEN               = 74;
    this.ANZ_STELLEN_FRAGENNR              = 8;
    this.ANZ_STELLEN_ANTWORTBEZEICHNUNG    = 8;
    this.LEERZEICHEN                       = " ";
    this.NEW_LINE                          = "\n";
    this.STR_TRENN_STRING                  = " - ";
    this.ALTERNATIVE_ANTWORT_BEZEICHNUNG   = "#)";
    this.ABSTAND_FBEZ_ANTWORT              = " ";
    this.ABSTAND_FNR_FRAGE                 = " ";
    this.VORGABE_KORREKT_MARKIERUNG        = "**";

    this.LOESUNGSBOGEN_ANTWORT_A           = "A";
    this.LOESUNGSBOGEN_ANTWORT_B           = "B";
    this.LOESUNGSBOGEN_ANTWORT_C           = "C";
    this.LOESUNGSBOGEN_ANTWORT_D           = "D";
    this.LOESUNGSBOGEN_ANTWORT_E           = "E";
    this.LOESUNGSBOGEN_ANTWORT_F           = "F";
    this.LOESUNGSBOGEN_ANTWORT_G           = "G";
    this.LOESUNGSBOGEN_ANTWORT_H           = "H";

    this.m_loesungsbogen_antwort_a         = "";
    this.m_loesungsbogen_antwort_b         = "";
    this.m_loesungsbogen_antwort_c         = "";
    this.m_loesungsbogen_antwort_d         = "";
    this.m_loesungsbogen_antwort_e         = "";
    this.m_loesungsbogen_antwort_f         = "";
    this.m_loesungsbogen_antwort_g         = "";
    this.m_loesungsbogen_antwort_h         = "";

    this.m_knz_loesungsbogen_version_1     = false;

    this.m_max_anzahl_vorhandene_antworten = 0;
    this.m_max_anzahl_korrekte_antworten   = 0;

    this.m_einzug_frage                    = undefined;
    this.m_einzug_antwort                  = undefined;

    this.knz_use_lfd_nr = false;

    this.str_trennzeile_fragen = "--------------------------------------------------------------------------------------------------------------";
  }


  /** 
   * Initialisierung der internen Variablen
   */
  clsExportFrageBogen.prototype.initLoesungsbogenVar = function( pKnzLoesungsbogenVersion1, pFragenKatalog )
  {
    this.m_knz_loesungsbogen_version_1 = pKnzLoesungsbogenVersion1;

    if ( this.m_knz_loesungsbogen_version_1 )
    {
      this.m_loesungsbogen_antwort_a = this.LOESUNGSBOGEN_ANTWORT_A;
      this.m_loesungsbogen_antwort_b = this.LOESUNGSBOGEN_ANTWORT_B;
      this.m_loesungsbogen_antwort_c = this.LOESUNGSBOGEN_ANTWORT_C;
      this.m_loesungsbogen_antwort_d = this.LOESUNGSBOGEN_ANTWORT_D;
      this.m_loesungsbogen_antwort_e = this.LOESUNGSBOGEN_ANTWORT_E;
      this.m_loesungsbogen_antwort_f = this.LOESUNGSBOGEN_ANTWORT_F;
      this.m_loesungsbogen_antwort_g = this.LOESUNGSBOGEN_ANTWORT_G;
      this.m_loesungsbogen_antwort_h = this.LOESUNGSBOGEN_ANTWORT_H;
    }
    else
    {
      this.m_loesungsbogen_antwort_a = "X";
      this.m_loesungsbogen_antwort_b = "X";
      this.m_loesungsbogen_antwort_c = "X";
      this.m_loesungsbogen_antwort_d = "X";
      this.m_loesungsbogen_antwort_e = "X";
      this.m_loesungsbogen_antwort_f = "X";
      this.m_loesungsbogen_antwort_g = "X";
      this.m_loesungsbogen_antwort_h = "X";
    }

    this.m_max_anzahl_vorhandene_antworten = pFragenKatalog.getAnzahlMaxVorhandeneAntworten();
    this.m_max_anzahl_korrekte_antworten   = pFragenKatalog.getAnzahlMaxKorrekteAntworten();

    if ( pFragenKatalog.getAnzahlFragen() < 1000 )
    {
      this.ANZ_STELLEN_FRAGENNR = 7;
    }
    else 
    {
      this.ANZ_STELLEN_FRAGENNR = 9;
    }

    this.knz_use_lfd_nr = pFragenKatalog.getKnzOriginalZustand() == false;

    this.m_loesungsbogen_antwort_a = this.LOESUNGSBOGEN_ANTWORT_A;
    this.m_loesungsbogen_antwort_b = this.LOESUNGSBOGEN_ANTWORT_B;
    this.m_loesungsbogen_antwort_c = this.LOESUNGSBOGEN_ANTWORT_C;
    this.m_loesungsbogen_antwort_d = this.LOESUNGSBOGEN_ANTWORT_D;
    this.m_loesungsbogen_antwort_e = this.LOESUNGSBOGEN_ANTWORT_E;
    this.m_loesungsbogen_antwort_f = this.LOESUNGSBOGEN_ANTWORT_F;
    this.m_loesungsbogen_antwort_g = this.LOESUNGSBOGEN_ANTWORT_G;
    this.m_loesungsbogen_antwort_h = this.LOESUNGSBOGEN_ANTWORT_H;

    this.m_einzug_frage   = fkString.right( "                                                  ", this.ANZ_STELLEN_FRAGENNR           ) + this.ABSTAND_FNR_FRAGE;
    this.m_einzug_antwort = fkString.right( "                                                  ", this.ANZ_STELLEN_ANTWORTBEZEICHNUNG ) + this.ABSTAND_FBEZ_ANTWORT;
  }


  /**
   * Zeigt den uebergebenen Text in einem neuem Browserfenster an.
   * 
   * @param pText der anzuzeigende Text
   */
  clsExportFrageBogen.prototype.showExportErgebnisInNewWindow = function( pText )
  {
    var new_window_inst = window.open( "", "idNewWindow", "width=600,height=600,scrollbars=1,resizable=1" )

    var new_window_html = "<html><head></head><body><pre>" + pText + "</pre></body></html>"

    new_window_inst.document.open();

    new_window_inst.document.write( new_window_html );

    new_window_inst.document.close();

    new_window_inst = undefined;
  }


  /** 
   * Exportstartfunktion fuer den Export eines Fragenkataloges
   */
  clsExportFrageBogen.prototype.startExportFbFragenKatalog = function( pFragenKatalog, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen )
  {

/*
 * HINWEIS: In dieser Funktion wuerde normalerweise die Auswahl der Zieldatei enthalten sein. 
 *
 *          In dieser Version gibt es jedoch keine Dateiauswahl, weswegen diese Funktion auch 
 *          entfernt werden koennte. 
 *
 *          Das ist hier nur die Vorstufe fuer den eigentlichen Export.
 */

    var fkt_ergebnis = false;

    /*
     * Pruefung: Parameter "pFragenKatalog" gleich "undefined" ?
     *
     * Wurde kein Fragenkatalog uebergeben, wird die Funktion mit FALSE verlassen.
     */
    if ( pFragenKatalog == undefined )
    {
      return fkt_ergebnis;
    }

    /*
     * Pruefung: Sind Fragen vorhanden ?
     * 
     * Sind im Fragenkatalog keine Fragen vorhanden, wird die Funktion mit FALSE verlassen.
     */
    if ( pFragenKatalog.getAnzahlFragen() === 0 )
    {
      return fkt_ergebnis;
    }

    var datei_name = "export_x.txt";

    if ( datei_name != undefined )
    {
      /* 
       * Aufruf der Initialisierungsfunktion
       */
      this.initLoesungsbogenVar( this.KNZ_LOESUNGSBOGEN_VERSON_1, pFragenKatalog );

      /* 
       * Aufruf der Exportfunktion fuer den Fragenkatalog
       */
      fkt_ergebnis = this.exportTextFragenKatalog( pFragenKatalog, datei_name, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen );
    }

    return fkt_ergebnis;
  }


  /**
   * Exportfunktion fuer den Fragenkatalog. 
   * 
   * Erstellt den Text fuer den Export und oeffnet diesen in einem neuem Browserfenster
   */
  clsExportFrageBogen.prototype.exportTextFragenKatalog = function( pFragenKatalog, pDateiName, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen )
  {
    if ( pKnzErstelleLoesungsbogen == undefined ) 
    { 
      pKnzErstelleLoesungsbogen  = true; 
    }

    if ( pKnzMarkiereAntwortKorrekt == undefined ) 
    { 
      pKnzMarkiereAntwortKorrekt = true; 
    }

    var lb_reihenfolge = new clsStringArray();

    /*
     * Dummyzeile fuer Arry-Position 0
     * 
     * Die Identifizierung der Spaltenpositionen im Loesungsbogen werden ueber* eine Formel gemacht. 
     * 
     * Diese Formel ist einfacher zu handhaben, wenn die auszugebenden Positionen bei Index 1 anfangen.
     * 
     * Damit ein Wert in der ersten Arrayposition vorhanden ist, wird dort ein Dummy-String hinterlegt.
     */
    lb_reihenfolge.addString( "000000000000000000000000Dummyzeile fuer Arrayposition 0" );

    var temp_frage = undefined;

    var string_datei_inhalt = "Export Abfrage Sitzung - " + pFragenKatalog.getDateiName() + this.NEW_LINE;

    var fkt_ergebnis = true;

    var index_fragen_katalog = 0;

    /*
     * While-Schleife ueber alle Fragen im Fragenkatalog.
     */
    while ( index_fragen_katalog < pFragenKatalog.getAnzahlFragen() )
    {
      try
      {
        /* 
         * Frage am aktuellem Index aus dem Fragenkatalog holen.
         */
        temp_frage = pFragenKatalog.getIndex( index_fragen_katalog );

        /* 
         * Pruefung: Frage gesetzt ?
         * 
         * Ist an der aktuellen Indexpositon keine Frage vorhanden, ist das Ergebnis
         * der Funktion "getIndex" gleich "undefined". In so einem Fall wird mit dem
         * naechsten Index weiter gemacht.
         *
         * Ist eine Frage vorhanden, wird diese exportiert.
         */
        if ( temp_frage != undefined )
        {
          string_datei_inhalt += this.getFrageExportString( temp_frage, this.NEW_LINE, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzAntwortReihenfolgeUmstellen );

          /*
           * Korrekt-String !
           * 
           * Fuer die Erstellung des Loesungsbogens wird ein String aufgebaut, welcher 
           * die Frage-Nummer und die korekten Antworten enthaelt. 
           * 
           * Die korrekten Antworten werden dabei durch die Fragenbezeichnung dargestellt.
           * 
           * Die erstellten Strings werden in einer Instanz von "clsStringArray" gespeichert.
           * 
           * Der Loesungsbogen soll nach den Fragennummern sortiert dargestellt werden.
           * 
           * Die ersten 20 Stellen sind fuer die aufsteigende Sortierung vorhanden.
           * 
           * Diese ersten 20 Stellen werden nach der Sortierung entfernt und erscheinen
           * nicht im letztendlich aufgebauten Loesungsbogen.
           */
          lb_reihenfolge.addString( fkString.right( "000000000000000000000" + ( this.knz_use_lfd_nr ? '' + temp_frage.getLfdNummer() : temp_frage.getNummer() ), 20 ) + this.getFrageKorrektString( temp_frage ) );
        }
      }
      catch ( err_inst )
      {
        //Console.WriteLine( "Fehler: errExportTextFragenKatalog\n" + err_inst.Message + "\n\n" + err_inst.StackTrace );
      }

      /* 
       * Index der Fragen im Fragenkatalog um eins erhoehen und mit 
       * der naechsten Frage weitermachen.
       */
      index_fragen_katalog++;
    }

    /*
     * Erstellung des Loesungsbogens
     * Es wird die Funktion fuer die Erstellung des Loesungsbogens aufgerufen.
     */
    string_datei_inhalt += this.getSringLoesungsbogen( pKnzErstelleLoesungsbogen, lb_reihenfolge );

    /*
     * Stringarray mit den Daten fuer den Loesungsbogen "clearen"
     * und anschliessend auf "undefined" stellen.
     */
    lb_reihenfolge.clear();

    lb_reihenfolge = undefined;

    /*
     * Erstellten Fragebogen in einem neuen Fenster darstellen.
     */
    this.showExportErgebnisInNewWindow( string_datei_inhalt );

    /*
     * Funktionsergebnis zurueckgeben
     */
    return fkt_ergebnis;
  }


  /* 
   * ################################################################################
   */
  clsExportFrageBogen.prototype.startExportFbLernFabrik = function( pFragenKatalog, pLernFrabrik, pExportModus, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen )
  {
    var fkt_ergebnis = false;

    /*
     * Pruefung: Parameter "pFragenKatalog" gleich "undefined" ?
     *
     * Wurde kein Fragenkatalog uebergeben, wird die Funktion mit FALSE verlassen.
     */
    if ( pFragenKatalog == undefined )
    {
      return fkt_ergebnis;
    }

    /*
     * Pruefung: Parameter "pLernFrabrik" gleich "undefined" ?
     *
     * Wurde keine Lernfrabrik uebergeben, wird die Funktion mit FALSE verlassen.
     */
    if ( pLernFrabrik == undefined )
    {
      return fkt_ergebnis;
    }

    /*
     * Pruefung: Sind Fragen im Fragenkatalog vorhanden ?
     * 
     * Sind im Fragenkatalog keine Fragen vorhanden, wird die Funktion mit FALSE verlassen.
     */
    if ( pFragenKatalog.getAnzahlFragen() === 0 )
    {
      return fkt_ergebnis;
    }

    /*
     * Pruefung: Sind Fragen in der Lernfabrik vorhanden ?
     * 
     * Sind in der Lernfabrik keine Fragen vorhanden, wird die Funktion mit FALSE verlassen.
     */
    if ( pLernFrabrik.getAnzahlFragen() === 0 )
    {
      return fkt_ergebnis;
    }

    var datei_name = "Fragensitzung.txt";

    if ( datei_name != undefined )
    {
      /* 
       * Aufruf der Initialisierungsfunktion
       */
      this.initLoesungsbogenVar( this.KNZ_LOESUNGSBOGEN_VERSON_1, pFragenKatalog );

      /* 
       * Aufruf der Exportfunktion fuer die aktuelle Lernsitzung
       */
      fkt_ergebnis = this.exportTextLernFabrik( pFragenKatalog, pLernFrabrik, pExportModus, datei_name, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen );
    }

    return fkt_ergebnis;
  }


  /*
   * ################################################################################
   */
  clsExportFrageBogen.prototype.exportTextLernFabrik = function( pFragenKatalog, pLernFrabrik, pExportModus, pDateiName, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen )
  {
    if ( pKnzErstelleLoesungsbogen  == undefined ) { pKnzErstelleLoesungsbogen  = true; }

    if ( pKnzMarkiereAntwortKorrekt == undefined ) { pKnzMarkiereAntwortKorrekt = true; }

    var lb_reihenfolge = new clsStringArray();

    lb_reihenfolge.addString( "000000000000000000000000Dummyzeile" );

    var temp_frage = undefined;

    var string_datei_inhalt = "Export Abfrage Sitzung - " + pFragenKatalog.getDateiName() + this.NEW_LINE;

    var fkt_ergebnis = true;

    var index_fragen_katalog = 0;

    var index_lern_fabrik = 0;

    /*
     * While-Schleife ueber alle Fragen der Lernfabrik
     */
    while ( index_lern_fabrik < pLernFrabrik.getAnzahlFragen() )
    {
      /* 
       * Bestimmung: Index Fragenkatalog
       * 
       * Es wird zuerst der Fragen-Index aus der Fragensitzung ermittelt.
       * 
       * Mit dem Index wird dann die konkrete Frage aus dem Fragenkatalog geholt.
       * 
       * Es gibt 3 unterschiedliche Exportarten:
       * - alle korrekt beantworteten Fragen
       * - alle falsch beantworteten Fragen
       * - alle Fragen
       * 
       * Je nach Exportmodus wird die entsprechende Funktion in der Lernfabrik aufgerufen, 
       * welche den Index der naechsten zu exportierenden Frage ermittelt.
       */
      if ( pExportModus == this.EXPORT_LERN_FABRIK_KORREKT )
      {
        index_fragen_katalog = pLernFrabrik.getAbfrageIndexKorrekt( index_lern_fabrik );
      }
      else if ( pExportModus == this.EXPORT_LERN_FABRIK_FALSCH )
      {
        index_fragen_katalog = pLernFrabrik.getAbfrageIndexFalsch( index_lern_fabrik );
      }
      else
      {
        index_fragen_katalog = pLernFrabrik.getAbfrageIndex( index_lern_fabrik );
      }

      /* 
       * Pruefung: Index im Fragenkatalog vorhanden ?
       * 
       * Der Index fuer die Frage aus dem Fragenkatalog muss groesser gleich 0 sein.
       * 
       * Ist der Index kleiner als 0, wird nichts exportiert. 
       */
      if ( index_fragen_katalog >= 0 )
      {
        try
        {
          /* 
           * Aus dem Fragenkatalog wird die Frage am ermittelten Index geholt.
           */
          temp_frage = pFragenKatalog.getIndex( index_fragen_katalog );

          /* 
           * Ist eine Frage vorhanden, wird diese exportiert.
           */
          if ( temp_frage != undefined )
          {
            string_datei_inhalt += this.getFrageExportString( temp_frage, this.NEW_LINE, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzAntwortReihenfolgeUmstellen );

            lb_reihenfolge.addString( fkString.right( "000000000000000000000" + ( this.knz_use_lfd_nr ? '' + temp_frage.getLfdNummer() : temp_frage.getNummer() ), 20 ) + this.getFrageKorrektString( temp_frage ) );
          }
          else 
          {
            window.console.log( "Fehler: Frage " + index_fragen_katalog + " nicht vorhanden" );
          }
        }
        catch ( err_inst )
        {
          window.console.log( "Fehler: Frage " + index_fragen_katalog + " errExportTextLernFabrik  " + err_inst.message );
        }
      }

      /* 
       * Es wird der Index fuer die Lernfabrik um eins erhoeht und 
       * mit der naechsten Frage aus der Lernsitzung weitergemacht.
       */
      index_lern_fabrik++;
    }

    /*
     * Erstellung des Loesungsbogens
     * Es wird die Funktion fuer die Erstellung des Loesungsbogens aufgerufen.
     */
    string_datei_inhalt += this.getSringLoesungsbogen( pKnzErstelleLoesungsbogen, lb_reihenfolge );

    /*
     * Stringarray mit den Daten fuer den Loesungsbogen "clearen"
     * und anschliessend auf "undefined" stellen.
     */
    lb_reihenfolge.clear();

    lb_reihenfolge = undefined;

    /*
     * Erstellten Fragebogen in einem neuen Fenster darstellen.
     */
    this.showExportErgebnisInNewWindow( string_datei_inhalt );

    /*
     * Funktionsergebnis zurueckgeben
     */
    return fkt_ergebnis;
  }


  /** 
   * Erstellt den Exportstring fuer eine Frage und gibt diesen zurueck.
   */
  clsExportFrageBogen.prototype.getFrageExportString = function( pFrage, pNewLineZeichen, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzAntwortReihenfolgeUmstellen )
  {
    /*
     * Definition des Ergebnisstrings.
     * Initialisierung mit einem Leerstring.
     */
    var str_fragentext = "";
  
    var antwort_bezeichnung = undefined;
  
    /* 
     * Pruefung: Ist die Eingabe ungleich "undefined" ?
     * 
     * Ist die Eingabe "undefined" ist das Ergebnis ein Leerstring.
     */
    if ( pFrage != undefined )
    {
      /* 
       * Aufbereitung Fragenexport
       *
       * Zuerst kommen 2 New-Line Zeichen fuer den Abstand
       */
      str_fragentext = pNewLineZeichen + pNewLineZeichen;
  
      /* 
       * Fragen-Nummer mit der Breite fuer die Frangennummer.
       * 
       * Die Fragen-Nummer wird rechts ausgerichtet.
       */
      str_fragentext += this.getStringRight( ( this.knz_use_lfd_nr ? "" + pFrage.getLfdNummer() : pFrage.getNummer() ), this.ANZ_STELLEN_FRAGENNR );
  
      /* 
       * Abstand zwischen Frage-Nummer und dem Fragentext
       */
      str_fragentext += this.ABSTAND_FNR_FRAGE;
  
      /* 
       * Der Fragentext als Block formatiert mit dem Abschliessendem New-Line-Zeichen
       * 
       * Soll der Fragentext nicht exportiert werden, wird ein Leerstring dem Ergebnis hinzugefuegt.
       */
      str_fragentext += ( pKnzExportiereFragentext ? this.getStringMaxCols( pFrage.getText1(), this.VORGABE_ANZ_STELLEN, this.m_einzug_frage, pNewLineZeichen ) : "" ) + pNewLineZeichen;

      /* 
       * Auswertung: Antwortreihenfolge-Umstellung
       * 
       * Soll die Antwortreihenfolge umgestellt werden, wird an der Frage die Funktion 
       * fuer die Umstellung der Antwortreihenfolge aufgerufen. 
       * 
       * Soll die Antwortreihenfolge nicht umgestellt werden, wird an der Frage 
       * die Funktion fuer den Reset der Antwortreihenfolge aufgerufen. 
       */
      if ( pKnzAntwortReihenfolgeUmstellen )
      {
        pFrage.startAntwortReihenfolgeUmstellen();
      }
      else
      {
        pFrage.resetAntwortIndexPosition();
      }

      /* 
       * Export der Antworten
       *
       * Mit einer While-Schleife werden alle 8 Antwortpositionen abgefragt.
       *
       * Fuer jede vorhandene Antwort werden folgende Schritte gemacht:
       *
       * 1. Kennzeichenermittlung, ob die Antwort aktiv ist
       * 2. Kennzeichenermittlung, ob die Antwort exportiert werden soll
       * 3. Wenn die Antwort exportiert werden soll, wird der Antworttext
       *    dem Ergebnisstring formartiert hinzugefuegt.
       */
      var akt_ui_position = 1;

      while ( akt_ui_position < 9 ) 
      {
        /* 
         * Ermittlung Kennzeichen Antwort exportieren
         * 
         * Eine Antwort an einer UI-Position wird exportiert, wenn:
         *
         * - die Antwort aktiv ist
         *      - Antwort an UI-Position vorhanden
         *      - Antwort an UI-Position aktiv
         * 
         * - die Antwort korrekt ist und korrekte Antworten exportiert werden sollen
         * 
         *   oder
         * 
         *   die Antwort falsch ist und falsche Antworten exportiert werden sollen
         */
        var knz_antwort_exportieren = pFrage.hasUiPositionAntwort( akt_ui_position ) && ( pFrage.getUiPositionAntwortKorrekt( akt_ui_position ) ? pKnzExportiereKorrekteAntworten : pKnzExportiereFalscheAntworten );
 
        /* 
         * Erstellung des Antwortstrings
         * 
         * Es wird geprueft, ob die Antwort exportiert werden soll. 
         * 
         * Dann wird die Antwortbezeichnung exportiert.
         * 
         * Und es wird der Antworttext selber dem Ergebnisstring hinzugefuegt.
         */
        if ( knz_antwort_exportieren )
        {
          antwort_bezeichnung = ( pKnzExportiereAntwortBezeichnung ? pFrage.getUiPositionAntwortBez( akt_ui_position ) : this.ALTERNATIVE_ANTWORT_BEZEICHNUNG );
    
          str_fragentext += pNewLineZeichen + this.getStringRight( ( pFrage.getUiPositionAntwortKorrekt( akt_ui_position ) && pKnzMarkiereAntwortKorrekt ? this.VORGABE_KORREKT_MARKIERUNG : this.LEERZEICHEN ) + this.LEERZEICHEN + antwort_bezeichnung, this.ANZ_STELLEN_ANTWORTBEZEICHNUNG ) + this.ABSTAND_FBEZ_ANTWORT + this.getStringMaxCols( pFrage.getUiPositionAntwortText( akt_ui_position ), this.VORGABE_ANZ_STELLEN, this.m_einzug_antwort, pNewLineZeichen ) + pNewLineZeichen;
        }
  
        /* 
         * Den Index fuer die UI-Position erhoehen und mit dem 
         * naechsten Schleifendurchlauf starten.
         */
        akt_ui_position++;
      } 
  
      /* 
       * Antworttext 2
       *
       * Nach dem Export aller Antworten wird geprueft, ob die Frage
       * noch einen zweiten Abschlusstext hat.
       * 
       * Ist dass der Fall, wird geprueft, ob der Fragentext exportiert  
       * werden soll. Ist das der Fall, wird dem Funktionsergebnis der 
       * zweite Fragentext angefuegt.
       */
      if ( pFrage.hasText2() )
      {
        if ( pKnzExportiereFragentext )
        {
          str_fragentext += pNewLineZeichen + this.getStringRight( " ", this.ANZ_STELLEN_FRAGENNR ) + this.ABSTAND_FBEZ_ANTWORT + this.getStringMaxCols( pFrage.getText2(), this.VORGABE_ANZ_STELLEN, this.m_einzug_antwort, pNewLineZeichen ) + pNewLineZeichen;
        }
      }
    }
  
    /* 
     * Trennzeile
     * 
     * Ist die Variable "this.KNZ_SET_TRENNZEILE" gleich true, wird 
     * dem Fragentext noch eine Trennzeile angefuegt.
     */
    if ( this.KNZ_SET_TRENNZEILE )
    {
      str_fragentext += pNewLineZeichen + this.str_trennzeile_fragen;
    }
  
    return str_fragentext;
  }


  /**
   * Erstellt fuer die Frage, den String fuer den Loesungsbogen und gibt diesen zurueck.
   */
  clsExportFrageBogen.prototype.getFrageKorrektString = function( pFrage )
  {
    var str_korrekte_antworten = "";

    var str_fragen_nummer      = "";
  
    /* 
     * Pruefung: Parameter "pFrage" ungleich "undefined" ?
     * 
     * Ist die Eingabe "undefined" ist das Ergebnis ein Leerstring.
     */
    if ( pFrage != undefined )
    {
      /* 
       * String Fragennummer
       * 
       * Im Loesungsbogen gibt es immer eine Fragennummer.
       * 
       * Befindet sich der Fragenkatalog noch im Originalzustand, wird die 
       * originaere Fragennummer genommen. Wurde ein weiterer Fragenkatalog
       * dem bestehenden Fragenkatalog hinzugefuegt, wird die laufende Nr genommen.
       */
      str_fragen_nummer = ( this.knz_use_lfd_nr ? "" + pFrage.getLfdNummer() : pFrage.getNummer() );

      /* 
       * String korrekte Antworten 
       * 
       * Ist die Antwort korrekt, wird der Buchstabe der Antwort genommen. 
       * 
       * Ist die Antwort falsch, wird ein Leerzeichen dem Loesungsstring hinzugefuegt.
       * 
       * Es werden hier nicht UI-Positionen abgefragt, da dort dank Antwortumstellung 
       * auch eine falsche Antwort stehen kann. 
       * 
       * Es wird hier die originaere Antwortreihenfolge der Frage genommen.
       */
      str_korrekte_antworten += ( pFrage.getAntwortAKorrekt() ? this.m_loesungsbogen_antwort_a : " " );
      str_korrekte_antworten += ( pFrage.getAntwortBKorrekt() ? this.m_loesungsbogen_antwort_b : " " );
      str_korrekte_antworten += ( pFrage.getAntwortCKorrekt() ? this.m_loesungsbogen_antwort_c : " " );
      str_korrekte_antworten += ( pFrage.getAntwortDKorrekt() ? this.m_loesungsbogen_antwort_d : " " );
      str_korrekte_antworten += ( pFrage.getAntwortEKorrekt() ? this.m_loesungsbogen_antwort_e : " " );
      str_korrekte_antworten += ( pFrage.getAntwortFKorrekt() ? this.m_loesungsbogen_antwort_f : " " );
      str_korrekte_antworten += ( pFrage.getAntwortGKorrekt() ? this.m_loesungsbogen_antwort_g : " " );
      str_korrekte_antworten += ( pFrage.getAntwortHKorrekt() ? this.m_loesungsbogen_antwort_h : " " );
    }

    /* 
     * Aufbau String fuer Loesungsbogen
     * 
     * Es wird ein String nach folgendem Muster erstellt:
     * 
     * Fragennummer + Trennstring + String korrekte Antworten
     * 
     * Dabei bekommt der String eine feste Breite.
     * 
     * Soll kein Loesungsbogen erstellt werden, sind die Strings nicht gesetzt.
     * Es wird ein Leerstring in einer festen Breite zurueckgegeben.
     */
    return this.getStringRight( str_fragen_nummer, this.ANZ_STELLEN_FRAGENNR ) + this.STR_TRENN_STRING + this.getStringLeft( str_korrekte_antworten, this.m_max_anzahl_vorhandene_antworten );
  }


  /**
   * Erstellt den Loesungsbogen fuer den Export.
   */
  clsExportFrageBogen.prototype.getSringLoesungsbogen = function( pKnzErstelleLoesungsbogen, pStringArrayLoesungsbogen )
  {
    var string_loesungsbogen = "";

    try
    {
      /*
       * Pruefung: Soll ein Loesungsbogen erstellt werden ?
       * 
       * Soll kein Loesungsbogen erstellt werden, bekommt der 
       * Aurufer einen Leerstring zurueck. 
       */
      if ( pKnzErstelleLoesungsbogen )
      {
        /* 
         * Sortierung Loesungsbogen
         * Die exportierten Fragen muessen nicht in der Reihenfolge des Fragenkataloges 
         * kommen. Somit ergibt sich das Problem, dass der Loesungsbogen auch nicht 
         * in einer sortierten Reihenfolge erstellt worden ist.
         *
         * Der Loesungsbogen wird aufsteigend sortiert.
         */
        pStringArrayLoesungsbogen.startSortierungAufsteigend();
   
        /* 
         * Spaltenbreite 1
         * Jede Frage im Loesungsbogen vereinamt eine Anzahl von Spalten.
         * Das ist die Fragennummer, zuzueglich der Trennzeichenbreite und
         * der Anzahl der maxmimal vorhandenen Antworten.
         */
        var spalten_breite_1 = this.ANZ_STELLEN_FRAGENNR + this.STR_TRENN_STRING.length + this.m_max_anzahl_vorhandene_antworten;
  
        /* 
         * Anzahl der Fragen in einer Reihe des Loesungsbogens.
         * Die Breite des Loesungsbogens durch die Spaltenbreite 1.
         */
        var lb_anzahl_spalten = this.ConvertToInt32( this.VORGABE_ANZ_STELLEN / spalten_breite_1 );

        if ( lb_anzahl_spalten < 1 ) 
        {
          lb_anzahl_spalten = 1;
        }
  
        /* 
         * Anzahl der benoetigten Zeilen
         * Die Anzahl der benoetigten Zeilen ist gleich der Anzahl der Fragen dividiert
         * durch die Anzahl der Loesungsbogenspalten (lb_anzahl_spalten). Das Ergebnis
         * der Division wird um 0.9 erhoeht, um auf die naechsthoehere Zahl zu kommen.
         * Dieses Ergebnis wird mit CINT auf den Ganzzahlteil beschraenkt.
         * 
         * Die Anzahl der Fragen ergibt sich aus der Anzahl der gespeicherten Loesungen.
         * (= Anzahl der Zeilen aus pStringArrayLoesungsbogen)
         */
        var lb_anzahl_zeilen = this.ConvertToInt32( ( pStringArrayLoesungsbogen.getAnzahlStrings() / lb_anzahl_spalten ) + 0.9 );

        /* 
         * Pruefung: Mindestanzahl Zeilen Loesungsbogen
         * 
         * Ist die Anzahl der Zeilen fuer den Loesungsbogen kleiner als die 
         * definierte Mindestzeilenanzahl, wird die Zeilenanzahl auf die 
         * Mindestzeilenanzahl gesetzt.
         */
        if ( lb_anzahl_zeilen < this.MINDEST_ZEILEN_LOESUNGSBOGEN ) 
        {
          lb_anzahl_zeilen = this.MINDEST_ZEILEN_LOESUNGSBOGEN;
        }
  
        var lb_zeilen_zaehler  = 1;
  
        var lb_spalten_zaehler = 1;
  
        var lb_ausgabe_string  = "";
  
        var akt_string = undefined;
  
        string_loesungsbogen += this.NEW_LINE;

        /* 
         * Bei der Ausgabe der Fragenanzahl muss die erste Zeile aus dem
         * Stringarray abgezogen werden.
         * 
         * Index 0 ist nur eine Dummyzeile.
         */
        string_loesungsbogen += this.NEW_LINE + this.NEW_LINE + "Loesungsbogen: (" + ( pStringArrayLoesungsbogen.getAnzahlStrings() - 1 ) + ")" + this.NEW_LINE;
  
        /* 
         * Loesungsbogen
         * 
         * Es gibt eine auessere While-Schleife fuer alle Zeilen des Loesungsbogens.  
         * 
         * Es gibt eine innere While-Schleife fuer alle Spalten des Loesungsbogens.
         * 
         * Der Loesungsbogen ist spaltenweise aufgebaut. Die Fragennummern stehen in 
         * aufsteigender Reihenfolge je Spalte. Damit diese aufsteigende Reihenfolge 
         * aufgebaut werden kann, wird ueber eine Formel der Index im Stringarray 
         * berechnet an welcher die naechste anzuzeigende Loesungsbogeninformation 
         * steht. 
         * 
         * Ist an der berechneten Indexposition kein String im Stringarray gespeichert,
         * wird von der Funktion "getStringIndex" ein "undefined" zurueckgegeben. 
         * Dieses kann in der letzten Spalte auftreten.
         * 
         * Nur wenn eine Information zurueckgegeben wird, wird diese Information  
         * der aktuellen Zeile des Loesungsbogens hinzugefuegt. 
         * 
         * Die hinzugefuegten Strings bestizen alle schon die notwendige Breite.
         * Eine zusaetzliche Formatierung auf eine feste Breite wird bei der 
         * Loesungsbogenerstellung nicht gemacht.
         * 
         * Die ersten 21 Stellem im Loesungsbogen sind nur fuer die Sortierung 
         * aufgenommen worden. Diese Zeichen sind nicht Bestandteil des 
         * Loesungsbogens und werden geloescht.
         * 
         * Nach der inneren While-Schleife, wird die aktuelle Zeile mit einem 
         * Zeilenumbruch abgeschlossen.
         */
        while ( lb_zeilen_zaehler <= lb_anzahl_zeilen )
        {
          lb_ausgabe_string = "";
  
          lb_spalten_zaehler = 1;
  
          while ( lb_spalten_zaehler <= lb_anzahl_spalten )
          {
            akt_string = pStringArrayLoesungsbogen.getStringIndex( lb_zeilen_zaehler + ( lb_spalten_zaehler - 1 ) * lb_anzahl_zeilen );
  
            if ( akt_string != undefined )
            {
              lb_ausgabe_string += akt_string.substring( 21 );
            }
  
            lb_spalten_zaehler = lb_spalten_zaehler + 1;
          }
  
          string_loesungsbogen += lb_ausgabe_string + this.NEW_LINE;
  
          lb_zeilen_zaehler = lb_zeilen_zaehler + 1;
        }
      }
    }
    catch ( err_inst )
    {
      /*
       * Ein Fehler wird abgefangen.
       */
      // Console.WriteLine( "Fehler: errGetSringLoesungsbogen\n" + err_inst.Message + "\n\n" + err_inst.StackTrace );
    }

    /*
     * Am Funktionsende wird der erstellte Loesungsbogen zurueckgegeben.
     */
    return string_loesungsbogen;
  }


  /**
   * <pre>
   * Liefert einen String mit mindestens der geforderten Laenge zurueck.
   *
   * Der Eingabestring "pString" wird dabei rechts hinzugefuegt.
   *
   * Ist "pString" laenger als die geforderte Laenge, wird "pString" zurueckgegeben.
   *
   * Ist "pString" kuerzer als die geforderte Laenge, werden die fehlenden Stellen
   * durch Leerzeichen aufgefuellt.
   * </pre>
   *
   * @param pString der Quellstring
   * @param pMindestLaenge die Mindestlaenge des Rueckgabestrings
   * @return ein String mit mindestens der geforderten Laenge und einer Rechtsausrichtung von "pString"
   */
  clsExportFrageBogen.prototype.getStringRight = function( pString, pMaxLen )
  {
    /*
     * Pruefung: Parameter "pString" gleich "undefined" ?
     *
     * Ist der Parameter "pString" gleich "undefined", ist das Ergebnis
     * ein String der geforderten Laenge mit Leerzeichen.
     */
    if ( pString == undefined )
    {
      return new String( ' ', pMaxLen );
    }

    /*
     * Pruefung: Parameter "pString" laenger als "pMindestLaenge" ?
     *
     * Ist der Parameter "pString" laenger als die geforderte MaxLaenge,
     * ist das Ergebnis "pString" selber.
     */
    if ( pString.length >= pMaxLen )
    {
      return pString;
    }

    /*
     * Ist der Parameter "pString" kuerzer als die geforderte MaxLaenge,
     * werden die fehlenden Zeichen durch Leerzeichen aufgefuellt.
     */
    return this.getStringX( ' ', pMaxLen - pString.length ) + pString;
  }


  /*
   * ################################################################################
   */
  clsExportFrageBogen.prototype.getStringLeft = function( pString, pMaxLen )
  {
    /*
     * Pruefung: Parameter "pString" gleich "undefined" ?
     *
     * Ist der Parameter "pString" gleich "undefined", ist das Ergebnis
     * ein String der geforderten Laenge mit Leerzeichen.
     */
    if ( pString == undefined )
    {
      return new String( ' ', pMaxLen );
    }

    /*
     * Pruefung: Parameter "pString" laenger als "pMindestLaenge" ?
     *
     * Ist der Parameter "pString" laenger als die geforderte MaxLaenge,
     * ist das Ergebnis "pString" selber.
     */
    if ( pString.length >= pMaxLen )
    {
      return pString;
    }

    /*
     * Ist der Parameter "pString" kuerzer als die geforderte MaxLaenge,
     * werden die fehlenden Zeichen durch Leerzeichen aufgefuellt.
     */
    return pString + this.getStringX( ' ', pMaxLen - pString.length );
  }


  /*
   * ################################################################################
   */
  clsExportFrageBogen.prototype.getStringX = function( pString, pAnzahl ) 
  {
    /*
     * https://stackoverflow.com/questions/202605/repeat-string-javascript
     */

    var str_ergebnis = '';

    while ( pAnzahl > 1 ) 
    {
      /*
       * "pAnzahl & 1" ist TRUE, wenn das letzte Bit auf 1 steht
       */
      if ( pAnzahl & 1 ) 
      { 
        str_ergebnis += pString; 
      }

      pAnzahl >>= 1, pString += pString;
    }
  
    return str_ergebnis + pString;
  }


  /**
   * <pre>
   * Fuehrt im Endeffekt <code>pString.indexOf( pSuchString, pAbPosition )</code> aus.
   * </pre>
   * 
   * @param pString der Eingabestring
   * @param pSuchString das zu suchende Zeichen als char
   * @param pAbPosition die Position ab welcher die Suche beginnen soll
   * @return die Position des Auftretens, oder -1 sofern der Suchstring nicht vorhanden oder pString = null ist
   */
  clsExportFrageBogen.prototype.pos = function( pString, pSuchString, pAbPosition )
  {
    try
    {
      return pString.indexOf( pSuchString, pAbPosition );
    }
    catch ( err_inst )
    {
      //   console.println( '\nFehler Funktion pos ' + err_inst.name + ': ' + err_inst.message );
    }

    return -1;
  }


  clsExportFrageBogen.prototype.ConvertToInt32 = function( pDoubleZahl )
  {
    return parseInt( pDoubleZahl, 10 );
  }


  /**
   * <pre>
   * Formatiert einen Text spaltenweise
   * 
   * Auf Wortebene wird aufgrund der kuerzesten Differenz zur berechneten BIS-Position getrennt.
   * 
   * 
   * 
   * String eingabe_string = "A B C D E F G H ";
   * 
   * String ausgabe_string = FkStringText.getStringMaxCols( eingabe_string + eingabe_string + eingabe_string + eingabe_string + " A      Z", eingabe_string.length(), "...", "\n" );
   * 
   * wl( ausgabe_string );
   * 
   * 
   *                     =          10        20        30        40        50        60        70        80        90 
   *                     = 12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012
   *                     = A B C D E F G H A B C D E F G H A B C D E F G H A B C D E F G H  A      Z
   *  Breite          16 =                |               |               |               |               |
   * 
   * Von     0 bis    17 = A B C D E F G H A
   * Von    18 bis    35 = B C D E F G H A B
   * Von    36 bis    53 = C D E F G H A B C
   * Von    54 bis    70 = D E F G H  A    
   * Von    72 bis    73 = Z
   * 
   * A B C D E F G H A
   * ...B C D E F G H A B
   * ...C D E F G H A B C
   * ...D E F G H  A    
   * ...Z
   * 
   * </pre>
   * 
   * @param pEingabe der zu formartierende Text
   * @param pAnzahlZeichenJeZeile die Anzahl der Zeichen je Zeile
   * @param pEinzug der Einzug, welcher ab Zeile 2 hinzugefuegt wird
   * @param pNewLineZeichen das zu benutzende New-Line-Zeichen (ab Zeile 2)
   * @return den formartierten Text
   */
  clsExportFrageBogen.prototype.getStringMaxCols = function( pEingabe, pAnzahlZeichenJeZeile, pEinzug, pNewLineZeichen )
  {
    var char_leer_zeichen  = ' ';
    var char_zeilenumbruch = '\n';

    var str_ergebnis   = "";
    var str_neue_zeile = "";
    var my_cr          = "";

    var trenn_position_ab        = -1;
    var trenn_position_bis_init  = -1;
    var trenn_position_bis_plus  = 0;
    var trenn_position_bis_minus = -1;

    var max_ueberspringen_anzahl = 5;
    var max_ueberspringen_pos    = 0;

    var zaehler = 0;

    /* 
     * Pruefung: Parameter pAnzahlZeichenJeZeile kleiner gleich 10?
     * Ist der Parameter kleiner der Mindesspaltenanzahl von 10, wird die
     * Anzahl der der Spalten auf die Vorgabe von 10 Stellen gesetzt.
     */
    if ( pAnzahlZeichenJeZeile <= 10 )
    {
      pAnzahlZeichenJeZeile = 10;
    }

    /*
     * Pruefung: Parameter "pEingabe" ungleich "undefined" ?
     * 
     * Ist der Parameter "pEingabe" gleich "undefined", bekommt der Aufrufer den 
     * mit einem Leerstring initialisierten Ergebnisstring zurueck.
     * 
     * Ist der Parameter "pEingabe" ungleich "undefined" wird die Verarbeitung gestartet.
     */
    if ( pEingabe != undefined )
    {
      var max_str_pos = pEingabe.length - 1;

      var akt_char = char_leer_zeichen;

      /* 
       * Die Schleife laeuft solange wie
       * ... die BIS-Position noch kleiner der Laenge der Eingabe ist.
       * ... der Endlosschleifenverhinderungszaehler kleiner 32123 ist.
       */
      while ( ( trenn_position_bis_plus < max_str_pos ) && ( zaehler < 32123 ) )
      {
        /* 
         * Startposition
         * 
         * Die Position ab welcher die neue Zeile aus der Eingabe herausgetrennt 
         * wird, ist die letzte Bis-Trennposition. 
         * 
         * Die BIS-Position wurde bei der Deklaration mit "0" initialisiert. 
         * 
         * Die BIS-Position ist nie Bestandteil der aktuellen Zeile.
         * (Bei der letzten Zeile evtl. schon)
         */
        trenn_position_ab = trenn_position_bis_plus;

        /*
         * Es wird das Zeichen an der Startposition gelesen 
         */
        akt_char = pEingabe.charAt( trenn_position_ab );

        /*
         * Pruefung: Zeichen an Startpositon kein Zeilenumbruch ?
         * 
         * Ist das Zeichen an der Startposition kein Zeilenumbruch, werden
         * eventuell vorhandene Leerzeichen am Start uebersprungen. 
         * 
         * Es wird nur eine festgelegt Anzahl von Leerzeichen uebersprungen.
         * Werden Leerzeichen in der Anzahl der Zeilenbreite uebersprungen, 
         * wird dieses im Ergebnis auch zu einer Leerzeile.  
         * 
         * Nach dem Ueberspringen der Leerzeichen, muss nochmals geprueft
         * werden, ob an der Startposition ein Zeilenumbruchszeichen steht.
         */
        if ( akt_char != char_zeilenumbruch )
        {
          /*
           * Es wird die Position berechnet, bis zu welcher die Leerzeichen 
           * maximal uebersprungen werden sollen.
           */
          max_ueberspringen_pos = trenn_position_ab + max_ueberspringen_anzahl;

          /*
           * Liegt die Max-Ueberspringen-Pos hinter dem Stringenede, wird diese 
           * Position auf das Stringende gelegt.
           */
          if ( max_ueberspringen_pos > max_str_pos )
          {
            max_ueberspringen_pos = max_str_pos;
          }

          /*
           * While-Schleife fuer das Ueberspringen
           */
          while ( ( trenn_position_ab < max_ueberspringen_pos ) && ( akt_char == char_leer_zeichen ) )
          {
            trenn_position_ab++;

            akt_char = pEingabe.charAt( trenn_position_ab );
          }

          /*
           * Pruefung: Maximale Anzahl der zu ueberspringenden Leerzeichen eingehalten ?
           * 
           * Ist die AB-Position gleich der berechneten Grenzpositon fuer das 
           * Ueberspringen, wird die Ab-Positon wieder auf die letzte Bis-Postion
           * gesetzt.
           */
          if ( trenn_position_ab == max_ueberspringen_pos )
          {
            trenn_position_ab = trenn_position_bis_plus;
          }
        }

        /*
         * Pruefung: Start mit Zeilenumbruch ?
         * 
         * Ist das Zeichen an der Abschneideposition ein Zeilenumbruch, ist 
         * die naechste Zeile gefunden.
         * 
         * Die Trennposition bis wird auf das naechste Zeichen gestellt. 
         * 
         * Die neue Zeile ist ein Leerstring, da ein Zeilenumbruch weiter
         * unten hinzugefuegt wird.
         * 
         * Die aktuell hinzuzufuegende Zeile besitzt selber nie einen Zeilenumbruch.
         */
        if ( akt_char == char_zeilenumbruch )
        {
          trenn_position_bis_plus = trenn_position_ab + 1;

          str_neue_zeile = "";
        }
        /*
         * Pruefung: Startposition gleich Stringende ?
         */
        else if ( trenn_position_ab == max_str_pos )
        {
          trenn_position_bis_plus = trenn_position_ab + 1;

          str_neue_zeile = pEingabe.substring( trenn_position_ab );
        }
        else
        {
          /*
           * End-Positon
           * 
           * Es wird die naechste initialie Trennposition berechnet.
           * 
           * Diese berechnet sich aus der Startposition zuzueglich der Anzahl von  
           * Zeichen aus dem Parameter "pAnzahlZeichenJeZeile".
           */
          trenn_position_bis_plus = trenn_position_ab + pAnzahlZeichenJeZeile;

          /*
           * Pruefung: BIS-Position nach Stringende ?
           * 
           * Liegt die berechnete Bis-Positon nach dem Stringende, wird die 
           * Bis-Positon auf das Stringende gesetzt. 
           * 
           * Es muss in diesem Fall nur die Pruefung auf eventuelle 
           * Zeilenumbrueche innerhalb des Teilstrings gemacht werden. 
           */
          if ( trenn_position_bis_plus >= max_str_pos )
          {
            trenn_position_bis_plus = max_str_pos;
          }
          else
          {
            /*
             * Liegt die BIS-Position vor dem Stringende, wird die berechnete 
             * Bis-Positon in der Variablen "trenn_position_bis_init" gespeichert.
             * 
             * Die berechnete BIS-Position wird durch die naechste While-Schleife
             * veraendert. Die Ausgangsposition muss fuer die nachfolgenden 
             * Berechnungen erhalten bleiben.
             */
            trenn_position_bis_init = trenn_position_bis_plus;

            /*
             * Suche nach dem naechsten Leer- oder Newline-Zeichen ab der BIS-Position
             * 
             * Ist das Zeichen an der Bis-Positon schon ein Trennzeichen, wird die 
             * Schleife nicht gestartet.
             * 
             * Befindet sich an der BIS-Position ein anderes Zeichen, wird die Suchschleife gestartet.
             * 
             * Die Suche in der Schleife bewegt sich zum Stringende hin.
             */
            akt_char = pEingabe.charAt( trenn_position_bis_plus );

            while ( ( trenn_position_bis_plus < max_str_pos ) && ( ( akt_char != char_leer_zeichen ) && ( akt_char != char_zeilenumbruch ) ) )
            {
              trenn_position_bis_plus++;

              akt_char = pEingabe.charAt( trenn_position_bis_plus );
            }

            /*
             * Flattersatz vermeiden
             * 
             * Liegt die naechste Trennposition mehr als 5 Zeichen hinter der initialen
             * Startposition wird in einer weiteren Suchschleife, das letzte Trennzeichen
             * ab der BIS-Position gesucht.
             */
            if ( ( trenn_position_bis_plus - trenn_position_bis_init ) > 5 )
            {
              /*
               * Startwert fuer die Suchschleife ist die berechnete initiale Trennpositon.
               */
              trenn_position_bis_minus = trenn_position_bis_init;

              /*
               * Suche nach dem letztem Leer- oder Newline-Zeichen von der BIS-Position
               * 
               * Die Suche in der Schleife bewegt sich zur Startposition hin.
               */
              akt_char = pEingabe.charAt( trenn_position_bis_minus );

              while ( ( trenn_position_bis_minus > trenn_position_ab ) && ( ( akt_char != char_leer_zeichen ) && ( akt_char != char_zeilenumbruch ) ) )
              {
                trenn_position_bis_minus--;

                akt_char = pEingabe.charAt( trenn_position_bis_minus );
              }

              /*
               * Trennpositionsermittlung
               * 
               * Von der initialen BIS-Position werden die Zeichen bis zum naechsten Trennzeichen gezaehlt.
               *  
               * Das einmal in Richtung Startposition und in Richtung Stringende.
               * 
               * Es wird die kleinere Distanz-Position ab der initial berechneten 
               * BIS-Position fuer das Ende der neuen Zeile genommen. 
               */
              if ( ( trenn_position_bis_init - trenn_position_bis_minus ) < ( trenn_position_bis_plus - trenn_position_bis_init ) )
              {
                trenn_position_bis_plus = trenn_position_bis_minus;
              }
            }
          }

          /*
           * Pruefung auf Zeilenumbruch im neuen Teilstring. 
           * 
           * Es wird der erste Zeilenumbruch nach der Startposition gesucht.
           * 
           * Ein Zeilenumbruch zwischen den berechneten Postionen teilt die Eingabe.
           * Damit der eventuell vorhandene Einzug korrekt gesetzt wird, muss der 
           * Zeilenumbruch beruecksichtigt werden. 
           * 
           * Die Suche wird aktuell von der Endposition zur Startposition gesucht. 
           */
          trenn_position_bis_init = -1;

          trenn_position_bis_minus = trenn_position_bis_plus;

          akt_char = pEingabe.charAt( trenn_position_bis_minus );

          while ( trenn_position_bis_minus > trenn_position_ab )
          {
            akt_char = pEingabe.charAt( trenn_position_bis_minus );

            if ( akt_char == char_zeilenumbruch )
            {
              trenn_position_bis_init = trenn_position_bis_minus;
            }

            trenn_position_bis_minus--;
          }

          /*
           * Pruefung: Zeilenumbruch gefunden ?
           * 
           * Wurde ein Zeilenumbruch gefunden, wird die Bis-Positon auf die 
           * Position des Zeilenumbruches gestellt.
           */
          if ( trenn_position_bis_init != -1 )
          {
            trenn_position_bis_plus = trenn_position_bis_init;
          }

          /*
           * Pruefung: BIS-Position nach Stringende ?
           * 
           * Liegt die berechnete BIS-Position auf oder nach dem Stringende, 
           * ist das Ergebnis gleich dem Rest des Eingabestrings ab der 
           * Startposition.
           * 
           * Liegt die berechnete End-Position genau auf dem Stringende, darf 
           * nicht mit der Substring-Funktkion gearbeitet werden, da diese 
           * Funktion nur bis zur angegebenen Position abschneided.
           */
          if ( trenn_position_bis_plus >= max_str_pos )
          {
            str_neue_zeile = pEingabe.substring( trenn_position_ab );
          }
          else
          {
            /*
             * Teilstring liegt im String
             * Liegt die berechnete BIS-Position vor dem Stringende, ist die neue Zeile
             * gleich dem Teilstring ab der AB-Position bis zur BIS-Position.
             * 
             * Die BIS-Position ist nicht Bestandteil des Ergebnisstrings.
             */
            str_neue_zeile = pEingabe.substring( trenn_position_ab, trenn_position_bis_plus );
          }
        }

        /*
         * Pruefung: neue Zeile gefunden ?
         */
        if ( str_neue_zeile != undefined )
        {
          str_ergebnis = str_ergebnis + my_cr + str_neue_zeile;
        }

        my_cr = pNewLineZeichen + pEinzug;

        zaehler++;
      }
    }

    return str_ergebnis;
  }

