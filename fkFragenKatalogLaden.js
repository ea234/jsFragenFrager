  
  function clsFkFragenKatalogLaden()
  {
    /* 
     * XML-Tag-Konstanten fuer den Fragenkatalog
     */
    this.TAG_FRAGENKATALOG            = "FragenKatalog";
    this.TAG_FRAGENKATALOGBEZEICHNUNG = "KatalogBezeichnung";

    /* 
     * XML-Tag-Konstanten fuer die Fragen
     */
    this.XML_TAG_FRAGE                = "FRAGE";
    this.XML_TAG_BEMERKUNG            = "BEMERKUNG";
    this.XML_TAG_BILD_1               = "BILD_1";
    this.XML_TAG_BILD_2               = "BILD_2";
    this.XML_TAG_BILD_3               = "BILD_3";
    this.XML_TAG_BILD_4               = "BILD_4";
    this.XML_TAG_GELTUNGSBEREICH      = "GELTUNGSBEREICH";
    this.XML_TAG_ID                   = "ID";
    this.XML_TAG_NUMMER               = "NUMMER";
    this.XML_TAG_TEXT_1               = "TEXT_1";
    this.XML_TAG_TEXT_2               = "TEXT_2";

    /* 
     * XML-Tag-Konstanten fuer die Antworten
     */
    this.XML_TAG_ANTWORT              = "Antwort";
    this.XML_TAG_ANTWORT_TEXT         = "Text";
    this.XML_TAG_ANTWORT_BEZEICHNUNG  = "Bezeichnung";
    this.XML_TAG_ANTWORT_BEMERKUNG    = "Bemerkung";
    this.XML_TAG_ANTWORT_KORREKT      = "Korrekt";

    /*
     * Konstante fuer einen Leerstring
     */
    this.LEERSTRING = "";

    /*
     * Maximale Anzahl der zu lesenden XML-Klammern
     */
    this.MAX_ANZAHL_XML_KLAMMER_LESEN = 1234;
  }

  /**
   * <pre>
   * Startfunktion fuer das parsen eines Fragenkataloges.
   *
   * </pre>
   *
   * @param xml_datei_inhalt der XML-Dateiinhalt
   * @param pFragenKatalog eine Instanz von "clsFragenKatalog" in welchem die Fragen gespeichert werden sollen.
   * @return TRUE wenn der XML-Dateiinhalt geparst werden konnte, sonst FALSE
   */
  clsFkFragenKatalogLaden.prototype.startImportXmlDateiInhaltJavaScript = function( xml_datei_inhalt, pFragenKatalog )
  {
    var knz_xml_datei_geparst = false;
    var xml_node_zaehler      = 0;
    var akt_root              = "";

    /* 
     * Pruefung: Instanz fuer die Speicherung der Fragen vorhanden ?
     * 
     * Ist keine Speicherinstanzt uebergeben, bekommt der Aufrufer FALSE zurueck.
     */
    if ( pFragenKatalog == undefined )
    {
      // Keine Instanz fuer die Speicherung vorhanden
    }
    /* 
     * Pruefung: XML-Daten vorhanden ?
     * 
     * Wurde kein XML-Dateiinhalt uebergeben, bekommt der Aufrufer FALSE zurueck.
     * 
     * Ist ein XML-Dateiihalt vorhanden, wird die Verarbeitungsroutine gestartet.
     */
    else if ( xml_datei_inhalt != undefined )
    {
      /* 
       * Dateiname im Fragenkatalog setzen
       */
      pFragenKatalog.setDateiName( "DateiNichtBekannt.xml" );

      /* 
       * Den Klammerzaehler auf 1 stellen.
       */
      xml_node_zaehler = 1;

      /* 
       * Erste XML-Klammern "FRAGE" ermitteln.
       */
      akt_root = this.getTagString( xml_datei_inhalt, this.XML_TAG_FRAGE, xml_node_zaehler );

      /* 
       * While-Schleife
       * Die While-Schleife laeuft solange wie:
       * ... es noch XML-Klammern gibt, die Variable "akt_root" kein Leerstring ist.
       * ... der Index-Zaehler noch nicht die Maximalgrenze der einzulesenden Objekte erreicht hat.
       */
      while ( ( akt_root != "" ) && ( xml_node_zaehler < this.MAX_ANZAHL_XML_KLAMMER_LESEN ) )
      {
        /* 
         * Aufruf der Parse-Funktion fuer ein Element der Klasse "clsFrage".
         * Die Ergenibsinstanz wird dem Vektor hinzugefuegt.
         */
        pFragenKatalog.addFrage( this.parseClsFrage( akt_root ) );

        /* 
         * Index-Zaehler um 1 erhoehen
         */
        xml_node_zaehler = xml_node_zaehler + 1;

        /* 
         * Naechste Root-XML-Klammer "FRAGE" aus dem XML-String holen.
         */
        akt_root = this.getTagString( xml_datei_inhalt, this.XML_TAG_FRAGE, xml_node_zaehler );
      }

      /* 
       * Nachdem alle Fragen geladen worden sind, wird 
       * das Funktionsergebnis auf TRUE gestellt
       */
      knz_xml_datei_geparst = true;
    }
    else
    {
      /* 
       * Fehlerfall: XML-Datei konnte nicht geparst werden.
       */
      knz_xml_datei_geparst = false;
    }

    /*
     * Am Funktionsende wird zurueckgegeben, ob die XML-Datei geparst werden konnte.
     */
    return knz_xml_datei_geparst;
  }

  /**
   * <pre>
   * Parst eine Instanz der Klasse "clsFrage".
   *
   * Ist der Parameter "pRootFrage" gleich undefined, wird undefined zurueckgegeben.
   *
   * </pre>
   *
   * @param pRootFrage  XML-Rootelement mit den zu parsenden Daten 
   * @return eine Instanz mit den geparsten Daten, oder undefined im Fehlefall
   */
  clsFkFragenKatalogLaden.prototype.parseClsFrage = function( pRootFrage )
  {
    /* 
     * Pruefung: Parameter "pBeanRootFrage" gesetzt?
     */
    if ( pRootFrage != undefined )
    {
      /*
       * Ist der Parameter "pRootFrage" gesetzt, wird 
       * eine neue Instanz der Klasse "clsFrage" erstellt.
       */
      var inst_frage = new clsFrage();

      /*
       * Die XML-Daten der Frage werden in die neue Instanz uebertragen
       */
      inst_frage.setId(              this.getTagString( pRootFrage, this.XML_TAG_ID,              -1 ) );
      inst_frage.setNummer(          this.getTagString( pRootFrage, this.XML_TAG_NUMMER,          -1 ) );
      inst_frage.setGeltungsbereich( this.getTagString( pRootFrage, this.XML_TAG_GELTUNGSBEREICH, -1 ) );
      inst_frage.setText1(           this.getTagString( pRootFrage, this.XML_TAG_TEXT_1,          -1 ) );
      inst_frage.setText2(           this.getTagString( pRootFrage, this.XML_TAG_TEXT_2,          -1 ) );
      inst_frage.setBemerkung(       this.getTagString( pRootFrage, this.XML_TAG_BEMERKUNG,       -1 ) );
      inst_frage.setBild1(           this.getTagString( pRootFrage, this.XML_TAG_BILD_1,          -1 ) );
      inst_frage.setBild2(           this.getTagString( pRootFrage, this.XML_TAG_BILD_2,          -1 ) );
      inst_frage.setBild3(           this.getTagString( pRootFrage, this.XML_TAG_BILD_3,          -1 ) );
      inst_frage.setBild4(           this.getTagString( pRootFrage, this.XML_TAG_BILD_4,          -1 ) );

      /*
       * Jede Antwort wird durch den Aufruf der Funktion "parseClsAntwort" 
       * geparst und der Fragen-Instanz zugewiesen.
       */
      inst_frage.setAntwortA( this.parseClsAntwort( this.getTagString( pRootFrage, this.XML_TAG_ANTWORT, 1 ) ) );
      inst_frage.setAntwortB( this.parseClsAntwort( this.getTagString( pRootFrage, this.XML_TAG_ANTWORT, 2 ) ) );
      inst_frage.setAntwortC( this.parseClsAntwort( this.getTagString( pRootFrage, this.XML_TAG_ANTWORT, 3 ) ) );
      inst_frage.setAntwortD( this.parseClsAntwort( this.getTagString( pRootFrage, this.XML_TAG_ANTWORT, 4 ) ) );
      inst_frage.setAntwortE( this.parseClsAntwort( this.getTagString( pRootFrage, this.XML_TAG_ANTWORT, 5 ) ) );
      inst_frage.setAntwortF( this.parseClsAntwort( this.getTagString( pRootFrage, this.XML_TAG_ANTWORT, 6 ) ) );
      inst_frage.setAntwortG( this.parseClsAntwort( this.getTagString( pRootFrage, this.XML_TAG_ANTWORT, 7 ) ) );
      inst_frage.setAntwortH( this.parseClsAntwort( this.getTagString( pRootFrage, this.XML_TAG_ANTWORT, 8 ) ) );

      /*
       * Die Frageninstanz wird zurueckgegeben.
       */
      return inst_frage;
    }

    /*
     * Ist der Parameter "undefined", wird "undefined" zurueckgegeben.
     */
    return undefined;
  }

  /**
   * <pre>
   * Parst eine Instanz der Klasse "clsAntwort".
   *
   * Ist der Parameter "pRootAntwort" gleich undefined, wird undefined zurueckgegeben.
   *
   * </pre>
   *
   * @param pRootAntwort XML-Rootelement mit den zu parsenden Daten 
   * @return eine Instanz mit den geparsten Daten, oder undefined im Fehlefall
   */
  clsFkFragenKatalogLaden.prototype.parseClsAntwort = function( pRootAntwort )
  {
    /* 
     * Pruefung: Parameter "pRootAntwort" gesetzt?
     * 
     * Ist der Parameter "pRootAntwort" undefined, wird undefined zurueckgegeben.
     * Die zu parsende Frage hat an der entsprechenden Postion dann keine Antwort.
     * 
     * Ist der Parameter "pRootAntwort" ungleich einem Leerstring, wird die 
     * Antwort geparst und es wird eine neue Instanz der Klasse "clsAntwort" 
     * zurueckgegeben.
     * 
     * Ist der Parameter "pRootAntwort" gleich einem Leerstring, wird ebenfalls
     * undefined an den Aufrufer zurueckgegeben.
     */
    if ( pRootAntwort == undefined )
    {
      return undefined;
    }
    else if ( pRootAntwort != "" )
    {
      var inst_cls_antwort = new clsAntwort();

      inst_cls_antwort.setAntwortBez(  this.getTagString( pRootAntwort, this.XML_TAG_ANTWORT_BEZEICHNUNG, -1 ) );
      inst_cls_antwort.setAntwortText( this.getTagString( pRootAntwort, this.XML_TAG_ANTWORT_TEXT,        -1 ) );
      inst_cls_antwort.setBemerkung(   this.getTagString( pRootAntwort, this.XML_TAG_ANTWORT_BEMERKUNG,   -1 ) );
      inst_cls_antwort.setKnzKorrekt(  this.getTagString( pRootAntwort, this.XML_TAG_ANTWORT_KORREKT,     -1 ) === "1" );

      return inst_cls_antwort;
    }

    return undefined;
  }

  /**
   * <pre>
   * Liefert den Inhalt des XML-Tags
   *
   * Bedingung ist, dass die XML-Klammern so gebildet sind:
   * 
   * xml_tag_start = "<"  + pXmlTagName + ">"
   * xml_tag_ende  = "</" + pXmlTagName + ">"
   * 
   * Ein XML-End-Tag wie "<XML-TAG />" wird nicht erkannt.
   *
   * </pre>
   * 
   * @param pXmlString XML-Eingabestring
   * @param pXmlTagName XML-Tag-Name
   * @param pXmlTagIndex Tag-Index (kleiner 1 ergibt das erste Element, max 32123)
   * @param pPositionAb Optionale Angabe, ab welcher Position im XML-String mit der Suche gestartet werden soll (-1 gleich Startposition 0)
   * @return der Wert des XML-Tags, undefined wenn das XML-Tag selber oder der XML-Tag-Index nicht existiert oder es zu einem Fehler kam
   */
  clsFkFragenKatalogLaden.prototype.getTagString = function( pXmlString, pXmlTagName, pXmlTagIndex )
  {
    var pPositionAb         = 0;
    var position_start      = 0; // Speichert die Startposition fuer die Rueckgabe
    var position_ende       = 1; // Speichert die naechste Position des Trennzeichens ab der Startposition
    var position_temp_start = 1; // Position eines eventuellen Starttags zwischen Position-Start und Position-Ende

    /*
     * Der Rueckgabewert wird mit undefined als Vorgaberueckgabe versehen
     */
    var ergebnis_xml_wert = undefined;

    /*
     * Pruefung: Parameter gesetzt?
     * Der XML-String muss vorhanden sein.
     * Der XML-Tag-Name muss vorhanden und darf kein Leerstring sein. 
     */
    if ( ( pXmlString != undefined ) && ( pXmlTagName != undefined ) && ( pXmlTagName.trim().length > 0 ) )
    {
      try
      {
        var xml_tag_index_zaehler = 0; // Zaehler fuer die XML-Tag Suchschleife 
        var xml_tag_index_gesucht = 1; // Der zu suchende XML-Tag-Index (das wievielte Tag soll es sein)

        /*
         * Pruefung: pXmlTagIndex uebergeben?
         * 
         * Ist im Parameter "pXmlTagIndex" ein Wert zwischen 0 und 32123 uebergeben worden,
         * wird dieser Wert in der Varaiblen "xml_tag_index_gesucht" gespeichert.
         * 
         * Liegt der Parameter-Wert ausserhalb der Grenzen, wird der Parameter "pXmlTagIndex" ignoriert.
         * Es wird die erste XML-Klammer mit dem Tag-Namen gesucht
         */
        if ( ( pXmlTagIndex > 0 ) && ( pXmlTagIndex <= 32123 ) )
        {
          xml_tag_index_gesucht = pXmlTagIndex;
        }

        var xml_tag_start =  "<" + pXmlTagName + ">";
        var xml_tag_ende  = "</" + pXmlTagName + ">";

        /*
         * Position Starttag
         * 
         * Wurde im Parameter "pPositionAb" ein Startwert groesser 0 uebergeben,
         * wird die Suche der Start-XML-Klammer ab dieser Position begonnen.
         * 
         * Ist der Parameter kleiner als 0, wird die Suche des XML-Tags ab Position 0 begonnen.
         */
        if ( pPositionAb > 0 )
        {
          position_start = pXmlString.indexOf( xml_tag_start, pPositionAb );
        }
        else
        {
          position_start = pXmlString.indexOf( xml_tag_start );
        }

        /*
         * Suchschleife XML-Tag-Position
         * 
         * Die While-Schleife laeuft solange wie:
         * ... der Ergebnis-Index noch nicht gefunden wurde
         * ... die XML-Tag-Startposition groesser gleich 0 ist
         * ... die XML-Tag-Endposition groesser 0 ist
         */
        while ( ( xml_tag_index_zaehler < xml_tag_index_gesucht ) && ( position_start >= 0 ) && ( position_ende > 0 ) )
        {
          /*
           * XML-Tag-Index-Suchzaehler erhoehen.
           */
          xml_tag_index_zaehler++;

          /*
           * Pruefung: Nochmaliger Durchlauf?
           * Soll nicht die erste XML-Klammer zurueckgegeben werden, wird in einem 
           * weiteren Durchlauf die naechste Startposition des XML-Tags gesucht.
           * 
           * Die Positionssuche startet ab der aktuellen Endposition plus 1.
           */
          if ( xml_tag_index_zaehler > 1 )
          {
            position_start = position_ende + 1;

            position_start = pXmlString.indexOf( xml_tag_start, position_start );
          }

          /*
           * Pruefung: Startposition gefunden?
           * Wurde kein Starttag gefunden, muss auch keine End-Position gesucht werden.
           * 
           * Wurde ein Starttag gefunden, wird nach dem Endtag gesucht.
           */
          if ( position_start >= 0 )
          {
            /* 
             * End-Xml-Tag suchen
             * Das End-Xml-Tag wird ab der Startposition der Rueckgabe gesucht.
             * Der Suchstring ist jetzt das Muster fuer ein XML-Endtag.
             */
            position_ende = pXmlString.indexOf( xml_tag_ende, position_start );

            /*
             * Pruefung: XML-Endtag gefunden?
             */
            if ( position_ende == -1 )
            {
              /*
               * Kein XML-Endtag vorhanden
               * Es gibt 2 Moeglichkeiten:
               * 
               * 1. Keine Rueckgabe
               *    
               * 2. Reststring ab dem Starttag
               */
              position_ende = pXmlString.length;
            }
            else
            {
              /*
               * XML-Endtag wurde gefunden
               * 
               * Pruefung: Geschachtelte XML-Tags vorhanden?
               */
              position_temp_start = position_start + 1;

              while ( ( position_temp_start > position_start ) && ( position_temp_start < position_ende ) )
              {
                /*
                 * Suche ein Starttag zwischen der oben gefundenen 
                 * Startposition und dem gefundenen Endtag. 
                 * 
                 * Dazwischen darf kein weiteres Starttag vorhanden sein. 
                 * 
                 * Wird ein Starttag gefunden, ist das erste Endtag ungueltig. 
                 * Es muss ein neues Endtag, ab der gerade gefundenen End-Tag-Position, gesucht werden.
                 */
                position_temp_start = pXmlString.indexOf( xml_tag_start, position_temp_start + 1 );

                if ( ( position_temp_start > 0 ) && ( position_temp_start < position_ende ) )
                {
                  position_ende = pXmlString.indexOf( xml_tag_ende, position_ende + 1 );
                }
              }
            }
          }
        }

        /*
         * Pruefung: Wurde ein Starttag und Endtag gefunden ?
         * 
         * Das ist der Fall, wenn die Startposition groesser gleich 0 ist
         * und die Endposition hinter der Startposition liegt.
         * 
         * Ist das nicht der Fall, bekommt der Aufrufer "undefined" zurueck. 
         * 
         * Ist das der Fall, wird der Tag-Inhalt der Ergebnisvariable zugewiesen.
         */
        if ( ( position_start >= 0 ) && ( position_ende > position_start ) )
        {
          /*
           * Anpassung Startposition
           * Damit die Startposition auf das erste Zeichen der Rueckgabe zeigt,
           * wird zu der Startposition die Laenge des Suchstringes hinzuaddiert.
           * Zusaetzlich kommen noch 2 Zeichen fuer die eckigen Klammern hinzu.
           */
          position_start = position_start + pXmlTagName.length + 2;

          /*
           * Pruefung nach Anpassung der Startposition
           * Nach der Anpassung, muss die Startpositoion immer noch vor der 
           * End-Position liegen.
           * 
           * Ist das nicht der Fall, handelt es sich um eine leere XML-Klammer.
           */
          if ( position_ende > position_start )
          {
            /* 
             * Ergebnissstring setzen
             * Der Ergebnisstring ist der Teilstring ab der Startposition 
             * bis zur Endposition. 
             */
            ergebnis_xml_wert = pXmlString.substring( position_start, position_ende ); // trim
          }
        }
      }
      catch ( err_inst )
      {
        /*
         * Bei einem Fehler, wird die Ergebnisvariable auf "undefined" gesetzt.
         */
        ergebnis_xml_wert = undefined;
      }
    }

    /*
     * Es wird die Ergebnisvariable zurueckgegeben.
     */
    return ergebnis_xml_wert;
  }

