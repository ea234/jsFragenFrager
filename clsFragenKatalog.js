  
  function clsFragenKatalog()
  {
    /*
     * Variable fuer den Vektor (Array)
     */
    this.m_frage_vector = undefined;

    /*
     * Speichert den Index zum Navigieren im Vektor
     */
    this.m_daten_satz_zeiger = 0;

    /*
     * Kennzeichenvariable, welche das Verhalten des Datensatzzeigers beim 
     * Erreichen des letzten bzw. ersten Elementes steuert.
     * 
     * Dieses Kennzeichen wird in den Funktionen "moveNext" 
     * und "movePrevious ausgewertet
     * 
     * Steht die Variable auf TRUE, beginnt der Datensatzzeiger wieder beim ersten Element
     * 
     * Steht die Variable auf FALSE, bleibt der Datensatzzeiger auf dem ersten oder letzten
     * Element stehen.
     */
    this.m_knz_auto_reset = true;

    /*
     * Speichert den Dateinamen des Fragenkataloges
     */
    this.m_datei_name = "";

    /*
     * Kennzeichenvariable, ob sich der Fragenkatalog noch im Originalzustand befindet. 
     * 
     * Originalzustand = Einziger Fragenbestand aus einer geladenen XML-Datei
     * 
     * Werden Fragen aus einer anderen XML-Datei hinzugefuegt, ist es nicht mehr 
     * der originale Zustand, da nun mehr Fragen vorhanden sind. 
     * 
     * Dieses Kennzeichen ist beim Export des Fragenkataloges wichtig.
     * Ist es nicht mehr der Originalzustand, kann fuer den Loesungsbogen 
     * nicht mehr die originale Fragennummerierung genutzt werden.
     * Es kommen evtl. mehrfach dieselben Fragennummern vor, weswegen der 
     * Loesungsbogen nicht mehr eindeutig waere.
     * 
     * In so einem Fall, werden die Fragen einfach neu durchnummeriert.
     * Das erfolgt nur beim Export.
     */
    this.m_knz_original_zustand = undefined;
  }


  /**
   * @return TRUE = Fragenkatalog liegt im Originalzustand vor, FALSE = es sind mehr Fragenkataloge zusammengefuegt worden
   */
  clsFragenKatalog.prototype.getKnzOriginalZustand = function()
  {
    return this.m_knz_original_zustand;
  }


  /**
   * @param pKnzOriginalZustand das zu setzende Kennzeichen
   */
  clsFragenKatalog.prototype.setKnzOriginalZustand = function( pKnzOriginalZustand )
  {
    this.m_knz_original_zustand = pKnzOriginalZustand;
  }


  /**
   * @return den Index des Datensatzzeigers
   */
  clsFragenKatalog.prototype.getDatenSatzZeiger = function()
  {
    return this.m_daten_satz_zeiger;
  }


  /**
   * @return den Dateinamen des Fragenkataloges
   */
  clsFragenKatalog.prototype.getDateiName = function()
  {
    return this.m_datei_name;
  }


  /**
   * Setzt den Dateinamen des Fragenkataloges
   *
   * @param pDateiName der Dateiname des Fragenkataloges
   */
  clsFragenKatalog.prototype.setDateiName = function( pDateiName )
  {
    this.m_datei_name = pDateiName;
  }


  /**
   * Loescht alle Elemente im Vektor und stellt die Vektorinstanz auf undefined.
   */
  clsFragenKatalog.prototype.clear = function()
  {
    /*
     * Pruefung: Variable "m_calc_zahlung_vector" ungleich undefined?
     *
     * Ist der Vektor nicht vorhanden, sind auch keine Elemente zum loeschen vorhanden
     */
    if ( this.m_frage_vector != undefined )
    {
      var aktueller_index = 0;

      var frage_vector_anzahl = this.getAnzahlFragen();

      /*
       * While-Schleife ueber alle Vektor-Elemente
       */
      while ( aktueller_index < frage_vector_anzahl )
      {
        try
        {
          /*
           * Bei jedem gesetztem Vektor-Element wird die Funktion "clear" aufgerufen
           *
           * Eventuell auftretende Fehler werden abgefangen.
           */
          if ( this.m_frage_vector[ aktueller_index ] != undefined )
          {
            this.m_frage_vector[ aktueller_index ].clear();
          }
        }
        catch ( err_inst )
        {
          //
        }

        /*
         * Nachdem die Klasseninstanz fuer sich gecleared wurde, wird  
         * die Vektorposition auf undefined gestellt.
         */
        this.m_frage_vector[ aktueller_index ] = undefined;

        /*
         * Am Ende der While-Schleife wird der Indexzaehler erhoeht.
         */
        aktueller_index++;
      }
    }

    this.m_datei_name = undefined;

    /*
     * Der Datensatzzeiger wird auf 0 gestellt.
     */
    this.m_daten_satz_zeiger = 0;

    /*
     * Am Funktionsende wird die Vektorinstanz auf undefined gestellt.
     */
    this.m_frage_vector = undefined;
  }


  /**
   * Versucht die Instanz aus dem Parameter dem Vektor hinzuzufuegen.
   * 
   * Ist die Parameter-Instanz "undefined" wird nichts hinzugefuegt und FALSE zurueckgegeben.
   * 
   * @param pClsFrage die hinzuzufuegende InstanZ
   * 
   * @return TRUE wenn die Instanz dem Vektor hinzugefuegt werden konnte, sonst FALSE 
   */
  clsFragenKatalog.prototype.addFrage = function( pClsFrage )
  {
    /*
     * Pruefung: Parameterinstanz ungleich "undefined" ?
     */
    if ( pClsFrage != undefined )
    {
      try
      {
        /*
         * Ist die Parameterinstanz vorhanden, wird diese mit der Funktion "push" dem Vektor hinzugefuegt. 
         */
        this.getVektor().push( pClsFrage );

        /*
         * Bei der Frageninstanz wird die laufende Nummer gesetzt.
         * 
         * Die Nummer ist in diesem Fall, der Index der hinzugefuegten Frage.
         * 
         * Das ist gleichzeitig auch die Gesamtanzahl der Fragen.
         */
        pClsFrage.setLfdNummer( this.getAnzahlFragen() );

        /*
         * Der Aufrufder bekommt TRUE zurueck 
         */
        return true;
      }
      catch ( err_inst )
      {
        //System.Console.WriteLine("Fehler: errAddFrage " + err_inst.Message);
      }
    }

    /*
     * Vorgaberueckgabe ist FALSE (Fehler oder Parameterinstanz nicht gesetzt)
     */
    return false;
  }


  /**
   * @return die Vektorinstanz. Ist diese noch nicht vorhanden, wird diese erstellt.
   */
  clsFragenKatalog.prototype.getVektor = function()
  {
    /*
     * Pruefung: Vektor noch nicht erstellt ?
     */
    if ( this.m_frage_vector == undefined )
    {
      /*
       * Ist die Vektorinstanz noch undefined, wird eine neue 
       * Instanz der Klasse Array erstellt und dem  
       * Vektor zugewiesen.
       */
      this.m_frage_vector = new Array();
    }

    return this.m_frage_vector;
  }


  /**
   * @return die Frage am Index des Datensatzzeigers
   */
  clsFragenKatalog.prototype.getAktuelleFrage = function()
  {
    /*
     * Pruefung: Datensatzzeiger innerhalb Array-Grenzen ?
     */
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      return this.m_frage_vector[ this.m_daten_satz_zeiger ];
    }

    /*
     * Es wird "undefined" bei einem Indexfehler zurueckgegeben.
     */
    return undefined;
  }


  /**
   * @param pIndex der Index der abzurufenden Frage
   * 
   * @return die Frage am Index des Datensatzzeigers
   */
  clsFragenKatalog.prototype.getIndex = function( pIndex )
  {
    /*
     * Pruefung: Vektor ungleich "undefined" ?
     */
    if ( this.m_frage_vector != undefined )
    {
      try
      {
        /*
         * Pruefung: Parameter "pIndex" innerhalb Array-Grenzen ?
         * 
         * Befindet sich der abgefrage Index innerhalb der Array-Grenzen, 
         * wird die Frage am Abfrageindex zurueckgegeben
         */
        if ( ( pIndex >= 0 ) && ( pIndex < this.getAnzahlFragen() ) )
        {
          return this.m_frage_vector[ pIndex ];
        }
      }
      catch ( err_inst )
      {
        //
      }
    }

    /*
     * Bei Fehler wird "undefined" zurueckgegeben.
     */
    return undefined;
  }


  /**
   * @return die Anzahl der maximal vorhandenen Antworten ueber alle Fragen
   */
  clsFragenKatalog.prototype.getAnzahlMaxVorhandeneAntworten = function()
  {
    var max_vorhanden = 0;

    var aktueller_index = 0;

    var frage_vector_anzahl = this.getAnzahlFragen();

    while ( aktueller_index < frage_vector_anzahl )
    {
      max_vorhanden = Math.max( this.m_frage_vector[ aktueller_index ].getAnzahlKorrekteAntworten(), max_vorhanden );

      aktueller_index++;
    }

    return max_vorhanden;
  }


  /**
   * @return die Anzahl der maximal vorhandenen korrekten Antworten ueber alle Fragen
   */
  clsFragenKatalog.prototype.getAnzahlMaxKorrekteAntworten = function()
  {
    var max_vorhanden = 0;

    var aktueller_index = 0;

    var frage_vector_anzahl = this.getAnzahlFragen();

    while ( aktueller_index < frage_vector_anzahl )
    {
      max_vorhanden = Math.max( this.m_frage_vector[ aktueller_index ].getAnzahlKorrekteAntworten(), max_vorhanden );

      aktueller_index++;
    }

    return max_vorhanden;
  }


  /**
   * @return  die Anzahl der im Vektor gespeicherten Elemente
   */
  clsFragenKatalog.prototype.getAnzahlFragen = function()
  {
    /*
     * Pruefung: Ist der Vektor vorhanden ?
     * 
     * Ist der Vektor vorhanden, bekommt der Aufrufer den Wert der Funktion "length" zurueck.
     * 
     * Ist der Vektor noch nicht vorhanden, koennen noch keine Elemente
     * gespeichert worden sein. Der Aufrufer bekommt 0 zurueck.
     * 
     */
    if ( this.m_frage_vector != undefined )
    {
      return this.m_frage_vector.length;
    }

    return 0;
  }


  /**
   * @return  eine Auflistung der gespeicherten Elemente
   */
  clsFragenKatalog.prototype.getDebugString = function()
  {
    var erg_str = "";
    var mycr    = "\n";

    var aktueller_index = 0;
    var frage_vector_anzahl = this.getAnzahlFragen();

    while ( aktueller_index < frage_vector_anzahl )
    {
      erg_str = erg_str + mycr + this.m_frage_vector[ aktueller_index ].getNummer();

      aktueller_index++;
    }

    return erg_str;
  }


  /**
   * Setzt den Datensatzzeiger auf das erste Arrayelement.
   *
   * @return TRUE wenn der Datensatzzeiger auf das erste Arrayelement gestellt werden konnte, sonst FALSE
   */
  clsFragenKatalog.prototype.moveFirst = function()
  {
    /*
     * Pruefung: Daten im Vektor vorhanden ?
     */
    if ( this.getAnzahlFragen() > 0 )
    {
      /*
       * Ist die Vektoranzahl groesser 0, wird der Datensatzzeiger
       * auf den ersten Speicherindex im Vektor gesetzt.
       */
      this.m_daten_satz_zeiger = 0;

      /*
       * Es wird TRUE zurueckgegeben
       */
      return true;
    }

    /*
     * Ist die Vektoranzahl gleich 0, bekommt der Aufrufer FALSE zurueck
     */
    return false;
  }


  /**
   * Setzt den Datensatzzeiger auf das letzte Arrayelement.
   *
   * @return TRUE wenn der Datensatzzeiger auf das letzte Arrayelement gestellt werden konntet, sonst FALSE
   */
  clsFragenKatalog.prototype.moveLast = function()
  {
    /*
     * Pruefung: Daten im Vektor vorhanden ?
     */
    if ( this.getAnzahlFragen() > 0 )
    {
      /*
       * Ist die Vektoranzahl groesser 0, wird der Datensatzzeiger
       * auf den letzten Speicherindex im Vektor gesetzt.
       *
       * Da die Speicherung im Vektor bei Arrayelement 0 beginnt, ist der
       * letzte Speicherindex gleich dem Datenzaehler minus 1.
       */
      this.m_daten_satz_zeiger = this.getAnzahlFragen() - 1;

      /*
       * Es wird TRUE zurueckgegeben
       */
      return true;
    }

    /*
     * Ist die Vektoranzahl gleich 0, bekommt der Aufrufer FALSE zurueck
     */
    return false;
  }


  /**
   * Setzt den Datensatzzeiger auf das naechste Arrayelement.
   *
   * @return TRUE wenn der Datensatzzeiger veraendert worden ist (dieser auf ein neues Arrayelement zeigt), sonst FALSE
   */
  clsFragenKatalog.prototype.moveNext = function()
  {
    /*
     * Das Funktionsergebnis wird auf FALSE gestellt
     */
    var knz_ergebnis_move_next = false;

    /*
     * Pruefung, ob ueberhaupt Daten im Vektor vorhanden sind.
     */
    if ( this.getAnzahlFragen() > 0 )
    {
      /*
       * Kennzeichen "Auto Reset" auswerten
       */
      if ( this.m_knz_auto_reset )
      {
        /*
         * "Auto Reset" = TRUE
         *
         * 1. Datensatzzeiger um eins erhoehen
         *
         * 2. Pruefung, ob das Vektorende ueberschritten worden ist.
         *    Bei "ja" den Datensatzzeiger auf den ersten
         *    Speicherindex im Vektor stellen
         *
         * 3. Funktionsergebnis auf TRUE stellen
         */
        this.m_daten_satz_zeiger++;

        if ( this.m_daten_satz_zeiger >= this.getAnzahlFragen() )
        {
          this.m_daten_satz_zeiger = 0;
        }

        knz_ergebnis_move_next = true;
      }
      else
      {
        /*
         * "Auto Reset" = FALSE
         *
         * 1. Pruefung, ob es noch weitere Daten hinter dem aktuellen
         *    Arrayelement gibt (Kann der Datensatzzeiger erhoeht werden?)
         *
         * 2. Gibt es noch weitere Daten, wird der Datensatzzeiger um
         *    eine Position erhoeht und das Funktionsergebnis wird
         *    auf TRUE gestellt
         *
         *    Gibt es keine weiteren Elemente, wird der Datensatzzeiger
         *    nicht erhoeht und der Aufrufer bekommt FALSE zurueck.
         */
        if ( ( this.m_daten_satz_zeiger + 1 ) < this.getAnzahlFragen() )
        {
          this.m_daten_satz_zeiger++;

          knz_ergebnis_move_next = true;
        }
      }
    }

    /*
     * Am Funktionsende dem Aufrufer das Ergebnis zurueckgeben
     */
    return knz_ergebnis_move_next;
  }


  /**
   * Setzt den Datensatzzeiger auf das vorherige Arrayelement.
   *
   * @return TRUE wenn der Datensatzzeiger veraendert worden ist (dieser auf ein neues Arrayelement zeigt), sonst FALSE
   */
  clsFragenKatalog.prototype.movePrevious = function()
  {
    /*
     * Das Funktionsergebnis wird auf FALSE gestellt
     */
    var knz_ergebnis_move_previous = false;

    /*
     * Pruefung, ob ueberhaupt Daten im Vektor vorhanden sind.
     */
    if ( this.getAnzahlFragen() > 0 )
    {
      /*
       * Kennzeichen "Auto Reset" auswerten
       */
      if ( this.m_knz_auto_reset )
      {
        /*
         * "Auto Reset" = TRUE
         *
         * 1. Datensatzzeiger um eins reduzieren
         *
         * 2. Pruefung, ob der Datenzatzzeiger kleiner 0 ist.
         *    Bei "ja" den Datensatzzeiger auf das letzte Arrayelement stellen.
         *
         * 3. Funktionsergebnis auf TRUE stellen
         */
        this.m_daten_satz_zeiger--;

        if ( this.m_daten_satz_zeiger < 0 )
        {
          this.m_daten_satz_zeiger = this.getAnzahlFragen() - 1;
        }

        knz_ergebnis_move_previous = true;
      }
      else
      {
        /*
         * "Auto Reset" = FALSE
         *
         * 1. Pruefung, ob es noch weitere Daten vor dem aktuellen Arrayelement
         *    gibt (Kann der Datensatzzeiger reduziert werden?)
         *
         * 2. Gibt es noch weitere Daten, wird der Datensatzzeiger um
         *    eine Position vermindert und das Funktionsergebnis wird
         *    auf TRUE gestellt
         *
         *    Gibt es keine weiteren Elemente, wird der Datensatzzeiger
         *    nicht vermindert und der Aufrufer bekommt FALSE zurueck.
         */
        if ( this.m_daten_satz_zeiger - 1 >= 0 )
        {
          this.m_daten_satz_zeiger--;

          knz_ergebnis_move_previous = true;
        }
      }
    }

    /*
     * Am Funktionsende dem Aufrufer das Ergebnis zurueckgeben
     */
    return knz_ergebnis_move_previous;
  }


  /**
   * @param pIndex der Index
   * @return TRUE wenn der Datensatzzeiger gesetzt werden konnte, sonst false
   */
  clsFragenKatalog.prototype.moveTo = function( pIndex )
  {
    /*
     * Pruefung, ob ueberhaupt Daten im Vektor vorhanden sind.
     */
    if ( this.getAnzahlFragen() > 0 )
    {
      /*
       * Sind Vektordaten vorhanden, wird der interne Datensatzzeiger auf
       * den Index aus dem Parameter "pIndex" gestellt.
       *
       * Liegt der Parameterwert aussserhalb der Vektorgrenzen, wird der
       * Datensatzzeiger auf den ersten Index gestellt.
       */
      if ( ( pIndex >= 0 ) && ( pIndex < this.getAnzahlFragen() ) )
      {
        this.m_daten_satz_zeiger = pIndex;
      }
      else
      {
        this.m_daten_satz_zeiger = 1;
      }

      /*
       * Es wird TRUE zurueckgegeben, wenn alles OK ist
       */
      return true;
    }

    /*
     * Es wird FALSE zurueckgegeben, wenn keine Daten vorhanden sind
     */
    return false;
  }


  /**
   * @return TRUE wenn der Datensatzzeiger sich automatisch resettet, sonst false
   */
  clsFragenKatalog.prototype.getKnzAutoReset = function()
  {
    return this.m_knz_auto_reset;
  }


  /**
   * @param pKnzAutoReset  das Kennzeichen, ob der Datensatzzeiger automatisch am Ende wieder auf den Anfang gesetzt werden soll
   */
  clsFragenKatalog.prototype.setKnzAutoReset = function( pKnzAutoReset )
  {
    this.m_knz_auto_reset = pKnzAutoReset;
  }


  /**
   * Ruft bei jeder Frage die Funkton "startAntwortReduktion" auf.
   */
  clsFragenKatalog.prototype.startAntwortReduktion = function( pAnzahlFalscheAntwortenJeKorrekterAntwort )
  {
    /*
     * Pruefung: Variable "m_calc_zahlung_vector" ungleich undefined?
     *
     * Ist der Vektor nicht vorhanden, sind auch keine Elemente zum loeschen vorhanden
     */
    if ( this.m_frage_vector != undefined )
    {
      var aktueller_index = 0;

      var frage_vector_anzahl = this.getAnzahlFragen();

      /*
       * While-Schleife ueber alle Vektor-Elemente
       */
      while ( aktueller_index < frage_vector_anzahl )
      {
        try
        {
          /*
           * Bei jedem gesetztem Vektor-Element wird die Funktion "startAntwortReduktion" aufgerufen
           *
           * Eventuell auftretende Fehler werden abgefangen.
           */
          if ( this.m_frage_vector[ aktueller_index ] != undefined )
          {
            this.m_frage_vector[ aktueller_index ].startAntwortReduktion( pAnzahlFalscheAntwortenJeKorrekterAntwort );
          }
        }
        catch ( err_inst )
        {
          //
        }

        /*
         * Am Ende der While-Schleife wird der Indexzaehler erhoeht.
         */
        aktueller_index++;
      }
    }
  }


  /**
   * Vertauscht die Reihenfolge der Fragen im Fragenkatalog.
   * 
   * @return TRUE wenn die Tauschfunktion durchlaufen worden ist, sonst FALSE (=keine Umstellungen)
   */
  clsFragenKatalog.prototype.startFragenUmstellung = function()
  {
    /*
     * Ermittlung der Anzahl der vorhandenen Fragen 
     */
    var anzahl_fragen_vektor = this.getAnzahlFragen();

    /*
     * Pruefung: Anzahl Fragen zu klein ?
     *
     * Die Anzahl der Fragen muss mindestens 3 Fragen fuer eine Vertauschung sein.
     *
     * Sind es weniger Fragen, wird die Funktion mit FALSE verlassen.
     */
    if ( anzahl_fragen_vektor < 2 ) 
    {
      return false;
    }

    /*
     * Definition einer Ober- und Untergrenze fuer die Vertauschungen
     */
    var umstellung_index_obergrenze  = anzahl_fragen_vektor;
    var umstellung_index_untergrenze = -1;

    var index_position_neu          = 0;
    var index_position_alt          = 0;

    var zaehler_such_schleife       = 0;
    var knz_naechster_wert_gefunden = false;

    /*
     * Temporaere Instanz fuer die Vertauschungen der Vektorpositionen
     */
    var temp_inst_frage             = undefined;

    /*
     * While-Schleife ueber alle Fragen.
     *
     * Jede Frage wird einmal in der Position vertauscht.
     *
     */
    while ( ( index_position_alt < anzahl_fragen_vektor ) && ( index_position_alt < 32123 ) )
    {
      /* 
       * Das Kennzeichen fuer die erfolgreiche Ermittlung eines neuen 
       * Fragenindexes wird fuer die neue Suche auf FALSE gestellt.
       */
      knz_naechster_wert_gefunden = false;

      /* 
       * Der Endlosschleifenverhinderungszaehler wird auf 0 gestellt.
       */
      zaehler_such_schleife = 0;

      /* 
       * While-Schleife fuer die Ermittlung eines Fragenindexes
       */
      while ( ( knz_naechster_wert_gefunden == false ) && ( zaehler_such_schleife < 1000 ) )
      {
        /*
         * Neuer Fragenindex
         * 
         * Es wird per Zufall ein Index zwischen der Ober- und Untergrenze ausgewaehlt
         * 
         * Die Zufallszahl wird mit der Obergrenze multipliziert. 
         * 
         * Das stellt sicher, dass der Index nicht groesser als die Obergrenze sein kann.
         */
        index_position_neu = Math.floor( Math.random() * umstellung_index_obergrenze );

        if ( ( umstellung_index_untergrenze >= 0 ) && ( index_position_neu < umstellung_index_untergrenze ) )
        {
          /*
           * Einhaltung Untergrenze
           * 
           * Ist die Untergrenze groesser als 0, darf der Index nicht 
           * kleiner als der Index der Untergrenze sein.
           * 
           * Ist der Index kleiner als die Untegrenze, ist in diesem 
           * Durchgang kein neuer gueltiger Fragenindex ermittelt worden.
           */
        }
        else if ( ( umstellung_index_obergrenze >= 0 ) && ( index_position_neu > umstellung_index_obergrenze ) )
        {
          /*
           * Einhaltung Obergrenze
           * 
           * Ist die Obergrenze groesser als 0, darf der Index nicht 
           * groesser als der Index der Obergrenze sein.
           * 
           * Ist der Index kleiner als die Obergrenze, ist in diesem 
           * Durchgang kein neuer gueltiger Fragenindex ermittelt worden.
           */
        }
        else if ( ( this.m_frage_vector[ index_position_alt ] == undefined ) || ( this.m_frage_vector[ index_position_neu ] == undefined ) ) 
        {
          /*
           * Vermeidung, dass eine der gefundenen Indexpositonen auf "undefined" steht.
           */
        }
        else
        {
          /*
           * Pruefung: Tauschpaar gefunden ?
           * 
           * Ein Tauschpar ist gefunden, wenn 
           * - die beiden Index-Positionen muessen groesser als 0 sein
           * - die beiden Index-Positionen duerfen nicht gleich sein
           */
          knz_naechster_wert_gefunden = ( ( index_position_neu >= 0 ) && ( index_position_alt >= 0 ) && ( index_position_neu != index_position_alt ) )
        }

        /*
         * Am Schleifenende wid der Schleifenzaehler um eins hochgezaehlt. 
         */
        zaehler_such_schleife = zaehler_such_schleife + 1;
      }

      /* 
       * Pruefung: Neuen Frageindex gefunden?
       *
       * Nach der While-Schleife werde nochmals die Bedingungen fuer das
       * Tauschpaar geprueft. Die Suchschleife koennte auch durch den 
       * Endlosschleifenverhinderungszaehler beendet worden sein.
       */
      if ( ( index_position_neu >= 0 ) && ( index_position_alt >= 0 ) && ( index_position_neu != index_position_alt ) )
      {
        if ( ( this.m_frage_vector[ index_position_alt ] != undefined ) && ( this.m_frage_vector[ index_position_neu ] != undefined ) ) 
        {
          temp_inst_frage = this.m_frage_vector[ index_position_alt ];

          this.m_frage_vector[ index_position_alt ] = this.m_frage_vector[ index_position_neu ];

          this.m_frage_vector[ index_position_neu ] = temp_inst_frage;
        }
      }

      /* 
       * Der Index fuer die alte Position wird um 1 erhoeht
       */
      index_position_alt++;
    }

    /* 
     * Am Funktionsende wird die temporaere Instanz von "clsFrage"
     * auf "undefined" gestellt.
     */
    temp_inst_frage = undefined;

    /* 
     * Es wird TRUE zurueckgegeben, da die Tauschfuntkion durchlaufen worden ist.
     */
    return true;
  }

