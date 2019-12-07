  
  function clsAnwFragenFrager()
  {
    /*
     * Programmmodus beim Start des Programmes 
     */
    this.MODUS_KEINE_FRAGEN_GELADEN    = 1;

    /*
     * Programmmodus, wenn ein Fragenkatalog geladen ist.
     */
    this.MODUS_FRAGEN_KATALOG_ANZEIGEN = 2;

    /*
     * Programmmodus, wenn eine Fragensitzung aktiv ist.
     */
    this.MODUS_ABFRAGEN_LERNFRABRIK    = 3;

    /*
     * Speichert den Programmmodus
     */
    this.m_modus                       = 1;

    /*
     * Instanz fuer die Klasse "clsFragenKatalog"
     * Speichert die Fragen des aktuell geladenen Fragenkataloges
     */
    this.m_fragen_katalog              = undefined;

    /*
     * Instanz fuer die Klasse "clsLernFabrik"
     * Speichert die abzufragenden Fragen aus dem Fragenkatalog.
     */
    this.m_lern_fabrik                 = undefined;

    /*
     * Speichert den Pfad auf die Bild-Dateien.
     */
    this.m_aktuelles_bild_verzeichnis  = undefined;
  }


  /**
   * @return die Instanz fuer die Lernfabrik
   */
  clsAnwFragenFrager.prototype.getLernFrabrik = function()
  {
    /*
     * Pruefung: Instanz der Lernfabrik vorhanden ?
     */
    if ( this.m_lern_fabrik == undefined )
    {
      /*
       * Ist die Instanz noch undefined, wird eine neue 
       * Instanz der Klasse clsLernFrabrik erstellt und   
       * der Membervariablen "m_lern_fabrik" zugewiesen.
       */
      this.m_lern_fabrik = new clsLernFrabrik();
    }

    return this.m_lern_fabrik;
  }


  /**
   * @return die Instanz fuer den Fragenkatalog
   */
  clsAnwFragenFrager.prototype.getFragenKatalog = function()
  {
    /*
     * Pruefung: Instanz des Fragenkataloges vorhanden ?
     */
    if ( this.m_fragen_katalog == undefined )
    {
      /*
       * Ist die Instanz noch undefined, wird eine neue 
       * Instanz der Klasse clsFragenKatalog erstellt und   
       * der Membervariablen "m_fragen_katalog" zugewiesen.
       */
      this.m_fragen_katalog = new clsFragenKatalog();
    }

    return this.m_fragen_katalog;
  }


  /**
   * @return die Anzahl der Fragen im aktuellen Fragenkatalog. Ist kein Fragenkatalog geladen -1
   */
  clsAnwFragenFrager.prototype.getAnzahlFragen = function()
  {
    /*
     * Pruefung: Fragenkatalog-Instanz vorhanden ?
     * 
     * Ist die Fragenkatalog-Instanz vorhanden, wird 
     * dem Aufrufer das Funktionsergebnis der Funktion 
     * "getAnzahlFragen" zurueckgegeben.
     * 
     * Ist kein Fragenkatalog vorhanden, bekommt der 
     * Aufrufder -1 zurueck.
     */
    if ( this.m_fragen_katalog != undefined )
    {
      this.m_fragen_katalog.getAnzahlFragen();
    }

    return -1;
  }


  /**
   * Gibt die benutzten Resourcen wieder frei.
   *
   * Ruft die Funktion "clear" beim Fragenkatalog und bei
   * der Lernfabrik auf.
   *
   * Setzt anschliessend alle Membervariablen auf undefined.
   */
  clsAnwFragenFrager.prototype.clear = function()
  {
    /*
     * Ist eine Instanz des Fragenkataloges vorhanden, wird 
     * bei dieser die Funktion "clear" aufgerufen.
     * 
     * Das sorgt fuer die Resourcen-Freigabe der Instanz.
     */
    if ( this.m_fragen_katalog != undefined )
    {
      this.m_fragen_katalog.clear();
    }

    /*
     * Ist eine Instanz der Lernfabrik vorhanden, wird 
     * bei dieser ebenfalls die Funktion "clear" aufgerufen.
     */
    if ( this.m_lern_fabrik != undefined )
    {
      this.m_lern_fabrik.clear();
    }

    /*
     * Es werden die Variablen des Fragenkataloges, der 
     * Lernfabrik und des Bildverzeichnisses auf 
     * "undefined" gestellt.
     */
    this.m_fragen_katalog = undefined;

    this.m_lern_fabrik = undefined;

    this.m_aktuelles_bild_verzeichnis = undefined;

    /*
     * Der Modus wird auf "MODUS_KEINE_FRAGEN_GELADEN" gestellt.
     */
    this.m_modus = this.MODUS_KEINE_FRAGEN_GELADEN;
  }


  /**
   * @return TRUE wenn der Fragenkatalog geparst werden konnte, sonst FALSE
   */
  clsAnwFragenFrager.prototype.ladeXmlFragenKatalogJavaScript = function( pXmlDateiInhalt, pKnzClearFragenkatalog )
  {
    var fkt_ergebnis = false;

    /*
     * Pruefung: Soll der bestehende Fragenkatalog geloescht werden.
     */
    if ( pKnzClearFragenkatalog ) 
    {
      /*
       * Es wird die "clear"-Funktion dieser Klasse gerufen
       * um einen sauberen Variablen-Stand zu bekommen.
       */
      this.clear();
    }
    else 
    {
      /*
       * Wird zu einem bestehendem Fragenkatalog ein weiterer
       * Fragenkatalog hinzugefuegt, wird dass Kennzeichen 
       * fuer den Originalzustand auf FALSE gesetzt.
       * 
       * (Export Fragenkatalog -> Fragennummer ist dann laufende Nummer)
       * 
       */
      this.getFragenKatalog().setKnzOriginalZustand( false );
    }

    /*
     * Es wird eine Instanz der Klasse "clsFkFragenKatalogLaden" erstellt.
     */
    var inst_cls_fragen_lader = new clsFkFragenKatalogLaden();

    var knz_fragenkatalog_geladen = false;

    try
    {
      /*
       * Es wird die Funktion zum parsen der XML-Daten aufgerufen.
       * 
       * Das Ergebnis wird in der Variabeln "knz_fragenkatalog_geladen" gespeichert.
       * 
       * Wird beim Parsen eine Exception ausgeloest wird das Funktionsergebnis 
       * auf FALSE gestellt. Die Datei konnte nicht korrekt geparst werden.
       */
      knz_fragenkatalog_geladen = inst_cls_fragen_lader.startImportXmlDateiInhaltJavaScript( pXmlDateiInhalt, this.getFragenKatalog() );
    }
    catch ( err_inst )
    {
      knz_fragenkatalog_geladen = false;
    }

    inst_cls_fragen_lader = undefined;

    if ( knz_fragenkatalog_geladen )
    {
      try
      {
        //var currentDirectory = Path.GetDirectoryName( pXmlDateiName );

        //var fullPathOnly = Path.GetFullPath( currentDirectory );

        //this.m_aktuelles_bild_verzeichnis = fullPathOnly + "\\";

        this.m_aktuelles_bild_verzeichnis = undefined;
      }
      catch ( err_inst )
      {
      }

      /*
       * Der Modus wird auf "Fragenkatalog anzeigen" gesetzt.
       */
      this.m_modus = this.MODUS_FRAGEN_KATALOG_ANZEIGEN;

      /*
       * Das Funktionsergebnis wird auf TRUE gestellt.
       */
      fkt_ergebnis = true;
    }

    return fkt_ergebnis;
  }


  /**
   * @return TRUE wenn der Testfragenkatalog erstellt werden konnte, sonst FALSE
   */
  clsAnwFragenFrager.prototype.erstelleTestFragenKatalog = function()
  {
    var fkt_ergebnis = false;

    /*
     * Es wird die "clear"-Funktion dieser Klasse gerufen
     * um einen sauberen Variablen-Stand zu bekommen.
     */
    this.clear();

    var knz_fragenkatalog_geladen = false;

    try
    {
      /*
       * Es wird die Funktion zum erstellen des Testfragenkataloges aufgerufen.
       * 
       * Wird beim Erstellen eine Exception ausgeloest, wird 
       * das Funktionsergebnis auf FALSE gestellt. 
       */
      this.m_fragen_katalog = fkTestErstellungFragenkatalog.getTestFragenKatalog();

      this.m_modus = this.MODUS_FRAGEN_KATALOG_ANZEIGEN;

      fkt_ergebnis = true;
    }
    catch ( err_inst )
    {
      fkt_ergebnis = false;
    }

    return fkt_ergebnis;
  }


  /**
   * @return den Pfad auf das aktuelle Verzeichnis fuer Bilder.
   */
  clsAnwFragenFrager.prototype.getAktuellesBildVerzeichnis = function()
  {
    return this.m_aktuelles_bild_verzeichnis;
  }


  /**
   * @param pAktuellesBildVerzeichnis das zu verwendende Bildverzeichnis
   */
  clsAnwFragenFrager.prototype.setAktuellesBildVerzeichnis = function( pAktuellesBildVerzeichnis )
  {
    this.m_aktuelles_bild_verzeichnis = pMAtuellesBildVerzeichnis;
  }


  /**
   * Initialisiert die Anwendungsklasse
   */
  clsAnwFragenFrager.prototype.initAnwFragenFrager = function()
  {
    this.m_fragen_katalog = undefined;

    this.m_lern_fabrik = undefined;

    this.m_modus = this.MODUS_KEINE_FRAGEN_GELADEN;

    return true;
  }


  /**
   * @return TRUE wenn der Modus gleich MODUS_ABFRAGEN_LERNFRABRIK ist, sonst FALSE
   */
  clsAnwFragenFrager.prototype.istModusAbfragen = function()
  {
    return ( this.m_modus == this.MODUS_ABFRAGEN_LERNFRABRIK );
  }


  /**
   * @return TRUE wenn der Modus gleich MODUS_FRAGEN_KATALOG_ANZEIGEN ist, sonst FALSE
   */
  clsAnwFragenFrager.prototype.istModusFragenKatalogAnzeigen = function()
  {
    return ( this.m_modus === this.MODUS_FRAGEN_KATALOG_ANZEIGEN );
  }


  /**
   * Setzt den Modus auf MODUS_FRAGEN_KATALOG_ANZEIGEN
   */
  clsAnwFragenFrager.prototype.setModusFragenKatalogAnzeigen = function()
  {
    this.m_modus = this.MODUS_FRAGEN_KATALOG_ANZEIGEN;
  }


  /**
   * Ruft je nach Modus die gleichnamige Funktion im Fragenkatalog
   * oder in der Lernfrabrik auf und gibt dessen Funktionsergebnis 
   * zurueck.
   * 
   * Ist der Modus "MODUS_KEINE_FRAGEN_GELADEN" wird FALSE zurueckgegeben.
   * 
   * @return TRUE wenn zur ersten Frage verzweigt werden konnte, sonst FALSE
   */
  clsAnwFragenFrager.prototype.moveFirst = function()
  {
    if ( this.m_modus === this.MODUS_FRAGEN_KATALOG_ANZEIGEN )
    {
      return this.getFragenKatalog().moveFirst();
    }

    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().moveFirst();
    }

    return false;
  }


  /**
   * Ruft je nach Modus die gleichnamige Funktion im Fragenkatalog
   * oder in der Lernfrabrik auf und gibt dessen Funktionsergebnis 
   * zurueck.
   * 
   * Ist der Modus "MODUS_KEINE_FRAGEN_GELADEN" wird FALSE zurueckgegeben.
   * 
   * @return TRUE wenn zur letzten Frage verzweigt werden konnte, sonst FALSE
   */
  clsAnwFragenFrager.prototype.moveLast = function()
  {
    if ( this.m_modus === this.MODUS_FRAGEN_KATALOG_ANZEIGEN )
    {
      return this.getFragenKatalog().moveLast();
    }

    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().moveLast();
    }

    return false;
  }


  /**
   * Ruft je nach Modus die gleichnamige Funktion im Fragenkatalog
   * oder in der Lernfrabrik auf und gibt dessen Funktionsergebnis 
   * zurueck.
   * 
   * Ist der Modus "MODUS_KEINE_FRAGEN_GELADEN" wird FALSE zurueckgegeben.
   * 
   * @return TRUE wenn zur naechsten Frage verzweigt werden konnte, sonst FALSE
   */
  clsAnwFragenFrager.prototype.moveNext = function()
  {
    if ( this.m_modus === this.MODUS_FRAGEN_KATALOG_ANZEIGEN )
    {
      return this.getFragenKatalog().moveNext();
    }

    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().moveNext();
    }

    return false;
  }


  /**
   * Ruft je nach Modus die gleichnamige Funktion im Fragenkatalog
   * oder in der Lernfrabrik auf und gibt dessen Funktionsergebnis 
   * zurueck.
   * 
   * Ist der Modus "MODUS_KEINE_FRAGEN_GELADEN" wird FALSE zurueckgegeben.
   * 
   * @return TRUE wenn zur vorigen Frage verzweigt werden konnte, sonst FALSE
   */
  clsAnwFragenFrager.prototype.movePrevious = function()
  {
    if ( this.m_modus === this.MODUS_FRAGEN_KATALOG_ANZEIGEN )
    {
      return this.getFragenKatalog().movePrevious();
    }

    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().movePrevious();
    }

    return false;
  }


  /**
   * Gibt je nach Modus die aktuelle Frage aus dem Fragenkatalog
   * oder der Lernfabrik zurueck. 
   * 
   * Ist der Modus "MODUS_KEINE_FRAGEN_GELADEN" wird undefined zurueckgegeben
   * 
   * @return eine Instanz der Klasse "clsFrage" wenn es eine aktuelle Frage gibt, sonst undefined
   */
  clsAnwFragenFrager.prototype.getAktFrage = function()
  {
    if ( this.m_modus === this.MODUS_FRAGEN_KATALOG_ANZEIGEN )
    {
      return this.getFragenKatalog().getAktuelleFrage();
    }

    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getFragenKatalog().getIndex( this.getLernFrabrik().getAktAbfrageIndex() );
    }

    return undefined;
  }


  /**
   * Gibt je nach Modus die Bezeichnung fuer die Anzeige der
   * "Anzahl Fragen" zurueck.
   * 
   * @return einen Text fuer die Anzahl der Fragen
   */
  clsAnwFragenFrager.prototype.getAnzahlLabel = function()
  {
    if ( this.m_modus === this.MODUS_FRAGEN_KATALOG_ANZEIGEN )
    {
      return "" + this.getFragenKatalog().getAnzahlFragen();
    }

    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().getAnzahlFragen() + " von " + this.getFragenKatalog().getAnzahlFragen();
    }

    return "0";
  }


  /**
   * Gibt je nach Modus den Text fuer die Statuszeile zurueck.
   * 
   * @return einen Text fuer die Anzeige im Status-Text
   */
  clsAnwFragenFrager.prototype.getTextStatusFragenIndex = function()
  {
    if ( this.m_modus === this.MODUS_FRAGEN_KATALOG_ANZEIGEN )
    {
      return "Fragenkatalog anzeigen, Index " + this.getFragenKatalog().getDatenSatzZeiger() + " von " + this.getFragenKatalog().getAnzahlFragen();
    }

    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return "Abfragemodus, Index " + this.getLernFrabrik().getDatenSatzZeiger() + " = " + this.getLernFrabrik().getAktAbfrageIndex();
    }
    
    return "keine Fragen geladen";    
  }


  /**
   * Wechselt in den Modus "MODUS_FRAGEN_KATALOG_ANZEIGEN", wenn ein
   * Fragenkatalog vorhanden ist. Es wird TRUE zurueckgegeben.
   * 
   * Ist kein Fragenkatalog geladen, wird der Modus auf
   * "MODUS_KEINE_FRAGEN_GELADEN" gesetzt und es wird 
   * FALSE zurueckgegeben.
   *
   * @return TRUE wenn in den Modus "MODUS_FRAGEN_KATALOG_ANZEIGEN" gewechselt werden konnte, sonst FALSE.
   */
  clsAnwFragenFrager.prototype.startAnzeigeFragenKatalog = function()
  {
    var fkt_ergebnis = false;

    this.m_modus = this.MODUS_KEINE_FRAGEN_GELADEN;

    if ( this.m_fragen_katalog != undefined )
    {
      if ( this.m_fragen_katalog.getAnzahlFragen() > 0 )
      {
        this.m_modus = this.MODUS_FRAGEN_KATALOG_ANZEIGEN;

        fkt_ergebnis = true;
      }
    }

    return fkt_ergebnis;
  }


  /**
   * Initialisiert eine Fragensitzung mit den Parameterangaben.
   * 
   * Wechselt in den Modus "MODUS_ABFRAGEN_LERNFRABRIK".
   *
   * Ist kein Fragenkatalog geladen, wird FALSE zurueckgegeben.
   *
   * @return TRUE wenn in den Modus "MODUS_ABFRAGEN_LERNFRABRIK" gewechselt werden konnte, sonst FALSE.
   */
  clsAnwFragenFrager.prototype.startAbfrageSitzung = function( pKnzModusZufaellig, pAnzahlFragen, pUntergrenze, pObergrenze )
  {
    if ( this.m_fragen_katalog != undefined )
    {
      try
      {
        if ( this.getLernFrabrik().initAbfrageSitzung( pKnzModusZufaellig, this.getFragenKatalog().getAnzahlFragen(), pAnzahlFragen, pUntergrenze, pObergrenze ) )
        {
          this.m_modus = this.MODUS_ABFRAGEN_LERNFRABRIK;

          return true;
        }
      }
      catch ( err_inst )
      {
        //        
      }
    }

    return false;
  }


  /**
   * Exportiert den Fragenkatalog mit den Parameterkennzeichen
   *
   * Ist kein Fragenkatalog geladen, wird nichts exportiert und FALSE zurueckgegeben.
   *
   * @return TRUE wenn der Export erfolgreich war, sonst FALSE
   */
  clsAnwFragenFrager.prototype.exportFrageBogenFragenKatalog = function( pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen )
  {
    var fkt_ergebnis = false;

    if ( this.m_modus != this.MODUS_KEINE_FRAGEN_GELADEN )
    {
      var fk_exp = new clsExportFrageBogen();

      fkt_ergebnis = fk_exp.startExportFbFragenKatalog( this.getFragenKatalog(), pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen );
    }

    return fkt_ergebnis;
  }


  /**
   * Exportiert die aktuelle Fragensitzung mit den Parameterkennzeichen
   *
   * Ist kein Fragenkatalog geladen, wird nichts exportiert und FALSE zurueckgegeben.
   *
   * @return TRUE wenn der Export erfolgreich war, sonst FALSE
   */
  clsAnwFragenFrager.prototype.exportFrageBogenLernFabrik = function( pExportModus, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen )
  {
    var fkt_ergebnis = false;

    if ( this.m_modus == this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      var fk_exp = new clsExportFrageBogen();

      fkt_ergebnis = fk_exp.startExportFbLernFabrik( this.getFragenKatalog(), this.getLernFrabrik(), pExportModus, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen );
    }

    return fkt_ergebnis;
  }


  /**
   * Ist der Modus "Abfragen", werden die Fragen der aktuellen Lernsitzung exportiert.
   *
   * @return TRUE wenn der Export erfolgreich war, sonst FALSE
   */
  clsAnwFragenFrager.prototype.exportFrageBogenLernFabrikXml = function( pExportModus )
  {
    var fkt_ergebnis = false;

    if ( this.m_modus == this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      fkt_ergebnis = fkExportXmlFragenKatalog.startExportXmlLernFabrik( this.getFragenKatalog(), this.getLernFrabrik(), pExportModus );
    }

    return fkt_ergebnis;
  }


  /**
   * Ist der Modus "Abfragen", wird die "updateKnzGewaehlt"-Funktion der
   * Klasse "clsLernFabrik" gerufen. Es handelt sich um ein 
   * Durchreichen der Antwort.
   */
  clsAnwFragenFrager.prototype.updateKnzGewaehlt = function( pKnzAntwortA, pKnzAntwortB, pKnzAntwortC, pKnzAntwortD, pKnzAntwortE, pKnzAntwortF, pKnzAntwortG, pKnzAntwortH )
  {
    if ( this.m_modus == this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      this.getLernFrabrik().updateKnzGewaehlt( pKnzAntwortA, pKnzAntwortB, pKnzAntwortC, pKnzAntwortD, pKnzAntwortE, pKnzAntwortF, pKnzAntwortG, pKnzAntwortH );
    }
  }


  /**
   * Ist der Modus "Abfragen", wird die "updateZaehler"-Funktion der
   * Klasse "clsLernFabrik" gerufen. Es handelt sich um ein 
   * Durchreichen der Antwort.
   */
  clsAnwFragenFrager.prototype.updateZaehler = function( pKnzBeantwortet, pKnzKorrektBeantwortet, pKnzFalschBeantwortet )
  {
    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      this.getLernFrabrik().updateZaehler( pKnzBeantwortet, pKnzKorrektBeantwortet, pKnzFalschBeantwortet );
    }
  }


  /**
   * Liefert die Information zurueck, ob die Antwort A der
   * aktuellen Frage im Modus "Abfragen" gewaehlt ist.
   * 
   * @return TRUE wenn die Antwort gewaehlt ist, sonst FALSE
   */
  clsAnwFragenFrager.prototype.getKnzAntwortAGewaehlt = function()
  {
    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().getKnzAntwortAGewaehlt();
    }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob die Antwort B der
   * aktuellen Frage im Modus "Abfragen" gewaehlt ist.
   * 
   * @return TRUE wenn die Antwort gewaehlt ist, sonst FALSE
   */
  clsAnwFragenFrager.prototype.getKnzAntwortBGewaehlt = function()
  {
    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().getKnzAntwortBGewaehlt();
    }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob die Antwort C der
   * aktuellen Frage im Modus "Abfragen" gewaehlt ist.
   * 
   * @return TRUE wenn die Antwort gewaehlt ist, sonst FALSE
   */
  clsAnwFragenFrager.prototype.getKnzAntwortCGewaehlt = function()
  {
    if ( this.m_modus == this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().getKnzAntwortCGewaehlt();
    }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob die Antwort D der
   * aktuellen Frage im Modus "Abfragen" gewaehlt ist.
   * 
   * @return TRUE wenn die Antwort gewaehlt ist, sonst FALSE
   */
  clsAnwFragenFrager.prototype.getKnzAntwortDGewaehlt = function()
  {
    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().getKnzAntwortDGewaehlt();
    }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob die Antwort E der
   * aktuellen Frage im Modus "Abfragen" gewaehlt ist.
   * 
   * @return TRUE wenn die Antwort gewaehlt ist, sonst FALSE
   */
  clsAnwFragenFrager.prototype.getKnzAntwortEGewaehlt = function()
  {
    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().getKnzAntwortEGewaehlt();
    }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob die Antwort F der
   * aktuellen Frage im Modus "Abfragen" gewaehlt ist.
   * 
   * @return TRUE wenn die Antwort gewaehlt ist, sonst FALSE
   */
  clsAnwFragenFrager.prototype.getKnzAntwortFGewaehlt = function()
  {
    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().getKnzAntwortFGewaehlt();
    }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob die Antwort G der
   * aktuellen Frage im Modus "Abfragen" gewaehlt ist.
   * 
   * @return TRUE wenn die Antwort gewaehlt ist, sonst FALSE
   */
  clsAnwFragenFrager.prototype.getKnzAntwortGGewaehlt = function()
  {
    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().getKnzAntwortGGewaehlt();
    }

    return false;
  }


  /**
   * Liefert die Information zurueck, ob die Antwort H der
   * aktuellen Frage im Modus "Abfragen" gewaehlt ist.
   * 
   * @return TRUE wenn die Antwort gewaehlt ist, sonst FALSE
   */
  clsAnwFragenFrager.prototype.getKnzAntwortHGewaehlt = function()
  {
    if ( this.m_modus === this.MODUS_ABFRAGEN_LERNFRABRIK )
    {
      return this.getLernFrabrik().getKnzAntwortHGewaehlt();
    }

    return false;
  }


  /**
   * Leitet die Anforderung an die Klasse "clsFragenKatalog" weiter.
   */
  clsAnwFragenFrager.prototype.startAntwortReduktion = function( pAnzahlFalscheAntwortenJeKorrekterAntwort )
  {
    /*
     * Pruefung: Fragenkatalog vorhanden ?
     *
     * Ist ein Fragenkatalog vorhanden, wird bei diesem die 
     * Funktion "startAntwortReduktion" aufgerufen.
     */
    if ( this.m_fragen_katalog != undefined )
    {
      this.m_fragen_katalog.startAntwortReduktion( pAnzahlFalscheAntwortenJeKorrekterAntwort );
    }
  }


  /**
   * Leitet die Anforderung an die Klasse "clsFragenKatalog" weiter.
   */
  clsAnwFragenFrager.prototype.startFragenUmstellung = function()
  {
    /*
     * Pruefung: Fragenkatalog vorhanden ?
     *
     * Ist ein Fragenkatalog vorhanden, wird bei diesem die 
     * Funktion "startFragenUmstellung" aufgerufen.
     */
    if ( this.m_fragen_katalog != undefined )
    {
      this.m_fragen_katalog.startFragenUmstellung();
    }
  }

