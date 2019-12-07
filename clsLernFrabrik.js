  
  function clsLernFrabrik()
  {
    /*
     * Variable fuer die Aufnahme der Liste der abzufragenden Fragen
     */
    this.m_abfrage_vector = undefined;

    /*
     * Index fuer die Navigation durch die erstellte Fragensitzung
     */
    this.m_daten_satz_zeiger = 0;

    /*
     * Kennzeichenvariable, welche das Verhalten des Datensatzzeigers beim 
     * Erreichen des letzten bzw. ersten Elementes steuert.
     * 
     * Dieses Kennzeichen wird in den Funktionen "moveNext" 
     * und "movePrevious ausgewertet
     * 
     * Steht die Variable auf TRUE, beginnt der Datensatzzeiger 
     * wieder beim ersten Element.
     * 
     * Steht die Variable auf FALSE, bleibt der Datensatzzeiger 
     * auf dem ersten oder letzten Element stehen.
     */
    this.m_knz_auto_reset = true;
  }


  /**
   * @return den Index des Datensatzzeigers
   */
  clsLernFrabrik.prototype.getDatenSatzZeiger = function()
  {
    return this.m_daten_satz_zeiger;
  }


  /**
   * @return die Vektorinstanz. Ist diese noch nicht vorhanden, wird diese erstellt.
   */
  clsLernFrabrik.prototype.getVektor = function()
  {
    /*
     * Pruefung: Vektor noch nicht erstellt ?
     */
    if ( this.m_abfrage_vector == undefined )
    {
      /*
       * Ist die Vektorinstanz noch undefined, wird eine neue 
       * Instanz der Klasse Array erstellt und dem  
       * Vektor zugewiesen.
       */
      this.m_abfrage_vector = new Array();
    }

    return this.m_abfrage_vector;
  }


  /**
   * @return  die Anzahl der im Vektor gespeicherten Elemente
   */
  clsLernFrabrik.prototype.getAnzahlFragen = function()
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
    if ( this.m_abfrage_vector != undefined )
    {
      return this.m_abfrage_vector.length;
    }

    return 0;
  }


  /**
   * Loescht alle Elemente im Vektor und stellt die Vektorinstanz auf "undefined".
   */
  clsLernFrabrik.prototype.clear = function()
  {
    /*
     * Pruefung: Variable "m_abfrage_vector" ungleich undefined?
     *
     * Ist der Vektor nicht vorhanden, sind auch keine Elemente zum loeschen vorhanden
     */
    if ( this.m_abfrage_vector != undefined )
    {
      var aktueller_index   = 0;

      var anzahl_elemente_vector = this.getAnzahlFragen();

      /*
       * While-Schleife ueber alle Vektor-Elemente
       */
      while ( aktueller_index < anzahl_elemente_vector )
      {
        try
        {
          /*
           * Bei jedem gesetztem Vektor-Element wird die Funktion "clear" aufgerufen
           *
           * Eventuell auftretende Fehler werden abgefangen.
           */
          if ( this.m_abfrage_vector[ aktueller_index ] != undefined )
          {
            this.m_abfrage_vector[ aktueller_index ].clear();
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
        this.m_abfrage_vector[ aktueller_index ] = undefined;

        /*
         * Am Ende der While-Schleife wird der Indexzaehler erhoeht.
         */
        aktueller_index++;
      }
    }

    /*
     * Der Datensatzzeiger wird auf 0 gestellt.
     */
    this.m_daten_satz_zeiger = 0;

    /*
     * Am Funktionsende wird die Vektorinstanz auf "undefined" gestellt.
     */
    this.m_abfrage_vector = undefined;
  }


  /**
   * Versucht die Instanz aus dem Parameter dem Vektor hinzuzufuegen.
   * 
   * Ist die Parameter-Instanz undefined wird nichts hinzugefuegt und FALSE zurueckgegeben.
   * 
   * @param pClsTypAbfrage die dem Vektor hinzuzufuegende Frage
   * 
   * @return TRUE wenn die Instanz dem Vektor hinzugefuegt werden konnte, sonst FALSE 
   */
  clsLernFrabrik.prototype.addClsTypAbfrage = function( pClsTypAbfrage )
  {
    if ( pClsTypAbfrage != undefined )
    {
      try
      {
        this.getVektor().push( pClsTypAbfrage );

        return true;
      }
      catch ( err_inst )
      {
        //System.Console.WriteLine( "Fehler: errAddClsTypAbfrage " + err_inst.Message );
      }
    }

    return false;
  }


  /**
   * Erstellt mit den Parameterangaben eine Fragensitzung nach 
   * Reihenfolge der Fragen im Fragenkatalog.
   * 
   * @param pAnzahlGesamtFragen die Anzahl der Fragen im Fragenkatalog
   * @param pAnzahlAbfragen die Anzahl der Fragen in der Fragensitzung
   * @param pUntergrenze der Index, ab welchen die Fragen aus dem Fragenkatalog genommen werden sollen
   * @param pObergrenze der Index, bis zu welchem die Fragen aus dem Fragenkatatlog genommen werden sollen
   * 
   * @return TRUE wenn die Fragensitzung erstellt werden konnte, sonst FALSE
   */
  clsLernFrabrik.prototype.erstelleFragenSitzungReihenfolge = function( pAnzahlGesamtFragen, pAnzahlAbfragen, pUntergrenze, pObergrenze )
  {
    var fkt_ergebnis = false;

    var index_fragen_katalog = 0;

    var index_ab = 0;

    var index_bis = 0;

    var knz_rueckwaerts = false;

    /* 
     * Pruefung: pUntergrenze groesser pObergrenze
     * 
     * Liegt der Untergrenzen-Index nach dem Obergrenzen-Index, wird 
     * die Reihenfolge wieder korrigiert.
     */
    if ( pUntergrenze > pObergrenze )
    {
      index_ab = pObergrenze;

      index_bis = pUntergrenze;
    }
    else
    {
      index_ab = pUntergrenze;

      index_bis = pObergrenze;
    }

    /* 
     * Pruefung: "Index Ab" negativ ?
     * Wurde im Parameter "pUntergrenze" ein Wert kleiner 0 uebergeben,
     * wird der Untergrenzen-Index fuer die Ermittlung auf 0 gestellt.
     */
    if ( index_ab < 0 )
    {
      index_ab = 0;
    }

    /* 
     * Pruefung: "Index Ab" groesser als Anzahl der Fragen ?
     */
    if ( index_bis > pAnzahlGesamtFragen )
    {
      index_bis = pAnzahlGesamtFragen - 1;
    }

    var inst_cls_abfrage = undefined;

    /* 
     * Pruefung: Fragen von hinten nach vorne aufnehmen ?
     */
    if ( knz_rueckwaerts )
    {
      /* 
       * While-Schleife Rueckwaerts
       * 
       * Die Fragen werden von hinten nach vorne in die Fragensitzung aufgenommen.
       */
      index_fragen_katalog = index_bis;

      while ( index_fragen_katalog >= index_ab )
      {
        inst_cls_abfrage = new clsTypAbfrage();

        inst_cls_abfrage.setIndexFragenKatalog( index_fragen_katalog );

        inst_cls_abfrage.resetZaehler();

        addClsTypAbfrage( inst_cls_abfrage );

        index_fragen_katalog--;
      }
    }
    else
    {
      /* 
       * While-Schleife Rueckwaerts
       * 
       * Die Fragen werden von vorne nach hinten in die Fragensitzung aufgenommen.
       */
      index_fragen_katalog = index_ab;

      while ( index_fragen_katalog <= index_bis )
      {
        inst_cls_abfrage = new clsTypAbfrage();

        inst_cls_abfrage.setIndexFragenKatalog( index_fragen_katalog );

        inst_cls_abfrage.resetZaehler();

        this.addClsTypAbfrage( inst_cls_abfrage );

        index_fragen_katalog++;
      }
    }

    inst_cls_abfrage = undefined;

    fkt_ergebnis = true;

    return fkt_ergebnis;
  }


  /**
   * Erstellt mit den Parameterangaben eine Fragensitzung mit einer
   * zufaelligen Reihenfolge der Fragen aus dem Fragenkatalog.
   * 
   * @return TRUE wenn die Fragensitzung erstellt werden konnte, sonst FALSE
   */
  clsLernFrabrik.prototype.erstelleZufallsFragenSitzung = function( pAnzahlGesamtFragen, pAnzahlAbfragen, pUntergrenze, pObergrenze )
  {
    var index_fragen_katalog        = 0;
    var index_lern_fabrik           = 1;
    var zaehler_such_schleife       = 0;
    var zaehler_reset_vorh_string   = pAnzahlGesamtFragen;
    var str_bereits_vorhandene_ids  = "";
    var knz_naechster_wert_gefunden = false;
    var inst_cls_abfrage            = undefined;

    /* 
     * While-Schleife Aufbau Fragensitzung
     */
    while ( ( index_lern_fabrik <= pAnzahlAbfragen ) && ( index_lern_fabrik < 3212 ) )
    {
      /* 
       * Uebersteigt die Anzahl der Zufallsfragen die Gesamtanzahl aller Fragen,
       * wird der String mit den bereits aufgenommenen Fragennummern wieder 
       * auf einen Leerstring gestellt.
       * 
       * Ansonsten wuerde die Funktion 100 mal versuchen eine neue Fragennummer
       * zu ermitteln, welches nicht gehen wuerde, da schon alle Grundfragen im
       * String vorhanden waeren. Der Prozess wird beschleunigt.
       */
      if ( index_lern_fabrik > zaehler_reset_vorh_string )
      {
        str_bereits_vorhandene_ids = "";

        zaehler_reset_vorh_string = index_lern_fabrik + pAnzahlGesamtFragen;
      }

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
         */
        index_fragen_katalog = Math.floor( Math.random() * pObergrenze );

        if ( ( pUntergrenze >= 0 ) && ( index_fragen_katalog < pUntergrenze ) )
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
        else if ( ( pObergrenze >= 0 ) && ( index_fragen_katalog > pObergrenze ) )
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
        else
        {
          /*
           * Vermeidung doppelter Fragen
           *
           * Es werden alle schon einmal benutzten Indexe in einer Stringvariable 
           * kommasepariert gespeichert.
           * 
           * Es wird geprueft, ob der aktuelle Index sich bereits in diesem 
           * Stringspeicher befindet. Die Funktion "indexOf" muss -1 fuer 
           * "nicht gefunden" zurueck liefern.
           *
           * Ist der Index enthalten, ist die Variable "knz_naechster_wert_gefunden" FALSE.
           * Ist der Index nicht enthalten, ist die Variable "knz_naechster_wert_gefunden" TRUE.
           *
           * Die Variable "knz_naechster_wert_gefunden" steuert diese Suchschleife.
           *
           * Die Pruefung auf "Index schon vorhanden" wird nur 100 mal gemacht. 
           * Beim 101 Durchlauf wird der gefundene Fragenindex ungeprueft uebernommen.
           * Die Variable  "knz_naechster_wert_gefunden" wird dann auf TRUE gestellt.
           */
          if ( zaehler_such_schleife < 100 )
          {
            knz_naechster_wert_gefunden = str_bereits_vorhandene_ids.indexOf( "," + index_fragen_katalog + ",", 0 ) == -1;
          }
          else
          {
            knz_naechster_wert_gefunden = true;
          }
        }

        /*
         * Am Schleifenende wid der Schleifenzaehler um eins hochgezaehlt. 
         */
        zaehler_such_schleife++;
      }

      /* 
       * Pruefung: Neuen Frageindex gefunden?
       */
      if ( knz_naechster_wert_gefunden )
      {
        /*
         * Ist der aktuelle Fragenindex in Ordnung, wird eine neue Instanz 
         * der Klasse "clsTypAbfrage" erstellt. 
         * 
         * Diese Instanz bekommt den Fragenindex aus dem Fragenkatalog zugewiesen.
         * 
         * Auf die Zaehlervariablen wird ein Reset gemacht.
         */
        inst_cls_abfrage = new clsTypAbfrage();

        inst_cls_abfrage.setIndexFragenKatalog( index_fragen_katalog );

        inst_cls_abfrage.resetZaehler();

        /*
         * Die Instanz wird dem Vektor fuer die Abfragen hinzugefuegt.
         */
        this.addClsTypAbfrage( inst_cls_abfrage );

        /*
         * Der neu aufgenommene Fragenindex wird in der Speichervariablen 
         * fuer die schon benutzten Fragenindexe aufgenommen.
         */
        str_bereits_vorhandene_ids = str_bereits_vorhandene_ids + "," + index_fragen_katalog + ",";
      }

      /* 
       * Der Index fuer die Lernfabrik wird um 1 erhoeht
       */
      index_lern_fabrik++;
    }

    /* 
     * Am Funktionsende wird die temporaere Instanz von clsTypAbfrage
     * auf "undefined" gestellt.
     */
    inst_cls_abfrage = undefined;

    return true;
  }


  /**
   * Erstellt mit den Parameterangaben eine Fragensitzung und 
   * liefert zurueck, ob die Erstellung erfolgreich war.
   * 
   * @return TRUE wenn die Fragensitzung erstellt werden konnte, sonst FALSE
   */
  clsLernFrabrik.prototype.initAbfrageSitzung = function( pKnzModusZufaellig, pAnzahlGesamtFragen, pAnzahlFragen, pUntergrenze, pObergrenze )
  {
    var fkt_ergebnis  = false;
    var temp_index    = 0;
    var anzahl_fragen = pAnzahlFragen;
    var index_ab      = pUntergrenze;
    var index_bis     = pObergrenze;

    /* 
     * Pruefung: Anzahl Fragen negativ ?
     * Ist der Parameter "pAnzahlFragen" kleiner 0, wird die Anzahl der 
     * insgesamt aufzunehmenden Fragen auf die Gesamtanzahl der Fragen 
     * gestellt.
     */
    if ( pAnzahlFragen < 0 )
    {
      anzahl_fragen = pAnzahlGesamtFragen;
    }

    /* 
     * Pruefung: "Index Ab" negativ ?
     * Wurde im Parameter "pUntergrenze" ein Wert kleiner 0 uebergeben,
     * wird der Untergrenzen-Index fuer die Ermittlung auf 0 gestellt.
     */
    if ( index_ab < 0 )
    {
      index_ab = 0;
    }

    /* 
     * Pruefung: "Index Bis" negativ ?
     * Wurde im Parameter "pObergrenze" ein Wert kleiner 0 uebergeben,
     * wird der Obergrenzen-Index fuer die Ermittlung auf die 
     * Gesamtanzahl aller Fragen gestellt.
     */
    if ( index_bis < 0 )
    {
      index_bis = pAnzahlGesamtFragen - 1;
    }

    /* 
     * Pruefung: Index-Ab groesser Index-Bis
     * 
     * Liegt der Untergrenzen-Index nach dem Obergrenzen-Index, wird 
     * die Reihenfolge wieder korrigiert.
     */
    if ( index_ab > index_bis )
    {
      temp_index = index_ab;

      index_ab = index_bis;

      index_bis = temp_index;
    }

    if ( anzahl_fragen > 0 )
    {
      /* 
       * Der bisherige Vektor wird mit der "Clear"-Funktion geloescht.
       */
      this.clear();

      /* 
       * Der Datensatzzeiger wird auf 0 gestellt. (Erste Frage)
       */
      this.m_daten_satz_zeiger = 0;

      /* 
       * Erstellung Fragensitzung
       * 
       * Es wird geprueft, ob die Fragensitzung nach der Reihenfolge oder 
       * nach einer zufaelligen Reihenfolge erstellt werden soll. 
       * 
       * Dem entsprechend werden die Funktionen fuer die Erstellung der 
       * Fragensitzung aufgerufen.
       * 
       * Dessen Funktionsergebnis wird dem Aufrufer zurueckgegeben.
       */
      if ( pKnzModusZufaellig )
      {
        fkt_ergebnis = this.erstelleZufallsFragenSitzung( pAnzahlGesamtFragen, anzahl_fragen, index_ab, index_bis );
      }
      else
      {
        fkt_ergebnis = this.erstelleFragenSitzungReihenfolge( pAnzahlGesamtFragen, anzahl_fragen, index_ab, index_bis );
      }
    }

    return fkt_ergebnis;
  }


  /**
   * @return TRUE wenn der Datensatzzeiger sich automatisch resettet, sonst false
   */
  clsLernFrabrik.prototype.getKnzAutoReset = function()
  {
    return this.m_knz_auto_reset;
  }


  /**
   * @param pKnzAutoReset  das Kennzeichen, ob der Datensatzzeiger automatisch am Ende wieder auf den Anfang gesetzt werden soll
   */
  clsLernFrabrik.prototype.setKnzAutoReset = function( pKnzAutoReset )
  {
    this.m_knz_auto_reset = pKnzAutoReset;
  }


  /**
   * @return den Index des Datensatzzeigers
   */
  clsLernFrabrik.prototype.getDatenSatzZeiger = function()
  {
    return this.m_daten_satz_zeiger;
  }


  /**
   * @return Gibt das gespeicherte Element am Datensatzzeiger zurueck. Liefert undefined zurueck, wenn der Datensatzzeiger sich ausserhalb der Vektorgrenzen befindet
   */
  clsLernFrabrik.prototype.getElementDatensatzzeiger = function()
  {
    /*
     * Pruefung: Befindet sich der Datensatzzeiger in den Vektorgrenzen ?
     */
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      return this.m_abfrage_vector[ this.m_daten_satz_zeiger ];
    }

    return undefined;
  }


  /**
   * Setzt den Datensatzzeiger auf das erste Arrayelement.
   *
   * @return TRUE wenn der Datensatzzeiger auf das erste Arrayelement gestellt werden konnte, sonst FALSE
   */
  clsLernFrabrik.prototype.moveFirst = function()
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
  clsLernFrabrik.prototype.moveLast = function()
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
  clsLernFrabrik.prototype.moveNext = function()
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
  clsLernFrabrik.prototype.movePrevious = function()
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
  clsLernFrabrik.prototype.moveTo = function( pIndex )
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
   * @return den Index der abzufragenden Frage im Fragenkatalog, -1 wenn kein Index vorhanden ist
   */
  clsLernFrabrik.prototype.getAktAbfrageIndex = function()
  {
    /*
     * Pruefung: Datensatzzeiger in Arraygrenzen ?
     */
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      /* 
       * Im Abfragevektor wird mit dem Datensatzzeiger die aktuelle 
       * Instanz der Klasse "clsAbfrageTyp" referenziert.
       * 
       * An dieser Instanz wird die Funktion "getIndexFragenKatalog" aufgerufen.
       * 
       * Das Ergebnis ist der Index der anzuzeigenden Frage im aktuellen Fragenkatalog
       * der Frage erstellt worden sein kann.
       */
      return this.m_abfrage_vector[ this.m_daten_satz_zeiger ].getIndexFragenKatalog();
    }

    /*
     * Vorgaberueckgabe ist -1
     */
    return -1;
  }


  /**
   * Liefert den Index des Fragenkataloges nur, wenn die Frage beim letzten 
   * Anzeigen korrekt beantwortet worden ist. 
   *
   * Sonst liefert die Funktion -1 zurueck
   */
  clsLernFrabrik.prototype.getAbfrageIndexKorrekt = function( pIndex )
  {
    if ( ( pIndex >= 0 ) && ( pIndex < this.getAnzahlFragen() ) )
    {
      if ( this.m_abfrage_vector[ pIndex ] != undefined )
      {
        /* 
         * Abfrage auf "Anzahl korrekt beantwortet" eigentlich ueberfluessig,
         * da das Kennzeichen "Korrekt beantwortet" nur durch eine Beantwortung
         * der Frage erstellt worden sein kann.
         */
        if ( ( this.m_abfrage_vector[ pIndex ].getAnzahlKorrektBeantwortet() > 0 ) && ( this.m_abfrage_vector[ pIndex ].getKnzFrageLetzteAntwortKorrekt() ) )
        {
          return this.m_abfrage_vector[ pIndex ].getIndexFragenKatalog();
        }
      }
    }

    return -1;
  }


  /**
   * Liefert den Index des Fragenkataloges nur, wenn die Frage beim letzten 
   * Anzeigen falsch beantwortet worden ist. 
   *
   * Sonst liefert die Funktion -1 zurueck
   */
  clsLernFrabrik.prototype.getAbfrageIndexFalsch = function( pIndex )
  {
    if ( ( pIndex >= 0 ) && ( pIndex < this.getAnzahlFragen() ) )
    {
      if ( this.m_abfrage_vector[ pIndex ] != undefined )
      {
        if ( ( this.m_abfrage_vector[ pIndex ].getAnzahlFalschBeantwortet() > 0 ) && ( this.m_abfrage_vector[ pIndex ].getKnzFrageLetzteAntwortFalsch() ) )
        {
          return this.m_abfrage_vector[ pIndex ].getIndexFragenKatalog();
        }
      }
    }

    return -1;
  }


  /**
   * Liefert den Index des Fragenkataloges an der abgefragten Indexposition.
   * 
   * Ist der Index ausserhalb der Grenzen, oder ist an der Indexposition 
   * keine Antwort vorhanden, wird -1 zurueckgegeben.
   */
  clsLernFrabrik.prototype.getAbfrageIndex = function( pIndex )
  {
    if ( ( pIndex >= 0 ) && ( pIndex < this.getAnzahlFragen() ) )
    {
      if ( this.m_abfrage_vector[ pIndex ] != undefined )
      {
        return this.m_abfrage_vector[ pIndex ].getIndexFragenKatalog();
      }
    }

    return -1;
  }


  /*
   * ################################################################################
   */
  clsLernFrabrik.prototype.updateKnzGewaehlt = function( pKnzAntwortA, pKnzAntwortB, pKnzAntwortC, pKnzAntwortD, pKnzAntwortE, pKnzAntwortF, pKnzAntwortG, pKnzAntwortH )
  {
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      this.m_abfrage_vector[ this.m_daten_satz_zeiger ].setKnzAntwortAGewaehlt( pKnzAntwortA );
      this.m_abfrage_vector[ this.m_daten_satz_zeiger ].setKnzAntwortBGewaehlt( pKnzAntwortB );
      this.m_abfrage_vector[ this.m_daten_satz_zeiger ].setKnzAntwortCGewaehlt( pKnzAntwortC );
      this.m_abfrage_vector[ this.m_daten_satz_zeiger ].setKnzAntwortDGewaehlt( pKnzAntwortD );
      this.m_abfrage_vector[ this.m_daten_satz_zeiger ].setKnzAntwortEGewaehlt( pKnzAntwortE );
      this.m_abfrage_vector[ this.m_daten_satz_zeiger ].setKnzAntwortFGewaehlt( pKnzAntwortF );
      this.m_abfrage_vector[ this.m_daten_satz_zeiger ].setKnzAntwortGGewaehlt( pKnzAntwortG );
      this.m_abfrage_vector[ this.m_daten_satz_zeiger ].setKnzAntwortHGewaehlt( pKnzAntwortH );
    }
  }


  /*
   * ################################################################################
   */
  clsLernFrabrik.prototype.updateZaehler = function( pKnzBeantwortet, pKnzKorrektBeantwortet, pKnzFalschBeantwortet )
  {
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      if ( pKnzBeantwortet )
      {
        this.m_abfrage_vector[ this.m_daten_satz_zeiger ].setKnzFrageLetzteAntwortKorrekt( pKnzKorrektBeantwortet );

        this.m_abfrage_vector[ this.m_daten_satz_zeiger ].incAnzahlBeantwortetJa();

        if ( pKnzKorrektBeantwortet )
        {
          this.m_abfrage_vector[ this.m_daten_satz_zeiger ].incAnzahlKorrektBeantwortet();
        }

        if ( pKnzFalschBeantwortet )
        {
          this.m_abfrage_vector[ this.m_daten_satz_zeiger ].incAnzahlFalschBeantwortet();
        }
      }
      else
      {
        this.m_abfrage_vector[ this.m_daten_satz_zeiger ].incAnzahlBeantwortetNein();

        this.m_abfrage_vector[ this.m_daten_satz_zeiger ].setKnzFrageLetzteAntwortKorrekt( false );
      }
    }
  }


  /*
   * ################################################################################
   */
  clsLernFrabrik.prototype.getKnzAntwortAGewaehlt = function()
  {
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      return this.m_abfrage_vector[ this.m_daten_satz_zeiger ].getKnzAntwortAGewaehlt();
    }

    return false;
  }


  /*
   * ################################################################################
   */
  clsLernFrabrik.prototype.getKnzAntwortBGewaehlt = function()
  {
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      return this.m_abfrage_vector[ this.m_daten_satz_zeiger ].getKnzAntwortBGewaehlt();
    }

    return false;
  }


  /*
   * ################################################################################
   */
  clsLernFrabrik.prototype.getKnzAntwortCGewaehlt = function()
  {
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      return this.m_abfrage_vector[ this.m_daten_satz_zeiger ].getKnzAntwortCGewaehlt();
    }

    return false;
  }


  /*
   * ################################################################################
   */
  clsLernFrabrik.prototype.getKnzAntwortDGewaehlt = function()
  {
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      return this.m_abfrage_vector[ this.m_daten_satz_zeiger ].getKnzAntwortDGewaehlt();
    }

    return false;
  }

  /*
   * ################################################################################
   */
  clsLernFrabrik.prototype.getKnzAntwortEGewaehlt = function()
  {
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      return this.m_abfrage_vector[ this.m_daten_satz_zeiger ].getKnzAntwortEGewaehlt();
    }

    return false;
  }


  /*
   * ################################################################################
   */
  clsLernFrabrik.prototype.getKnzAntwortFGewaehlt = function()
  {
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      return this.m_abfrage_vector[ this.m_daten_satz_zeiger ].getKnzAntwortFGewaehlt();
    }

    return false;
  }


  /*
   * ################################################################################
   */
  clsLernFrabrik.prototype.getKnzAntwortGGewaehlt = function()
  {
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      return this.m_abfrage_vector[ this.m_daten_satz_zeiger ].getKnzAntwortGGewaehlt();
    }

    return false;
  }


  /*
   * ################################################################################
   */
  clsLernFrabrik.prototype.getKnzAntwortHGewaehlt = function()
  {
    if ( ( this.m_daten_satz_zeiger >= 0 ) && ( this.m_daten_satz_zeiger < this.getAnzahlFragen() ) )
    {
      return this.m_abfrage_vector[ this.m_daten_satz_zeiger ].getKnzAntwortHGewaehlt();
    }

    return false;
  }

