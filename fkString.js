var fkString = {

  /**
   * <pre>
   * Schneidet Anzahl-Stellen von dem uebergebenen String ab und gibt diesen zurueck.
   *
   * Ist der Parameter "pString" gleich "undefined", wird "undefined" zurueckgegeben.
   *
   * Uebersteigt die Anazhl der abzuschneidenden Stellen die Stringlaenge, wird der
   * Quellstring insgesamt zurueckgegeben.
   *
   * Ist die Anzahl der abzuschneidenden Stellen negativ oder 0, wird ein Leerstring zurueckgegeben.
   *
   * </pre>
   * 
   * @param pString der Quellstring
   * @param pAnzahlStellen die Anzahl der von links abzuschneidenden Stellen
   * @param den sich ergebenden String, Leerstring wenn die Anzahl der Stellen negativ ist oder pString null ist
   */
  left : function( pString, pAnzahlStellen )
  {
    /*
     * Pruefung: Parameter "pString" gesetzt?
     * Ist der Parameter "pString" gleich "undefined", wird auch "undefined" zurueckgegeben.
     */
    if ( pString === undefined )
    {
      return undefined;
    }

    /*
     * Pruefung: Anzahl der Stellen negativ?
     * Ist die Anzahl der abzuschneidenden Stellen negativ, bleibt
     * kein Teil von pString uebrig. Dieser Fall wird analog einer
     * Uebergabe von 0 Zeichen abschneiden behandelt.
     *
     * Der Aufrufer bekommt einen Leerstring zurueck.
     */
    if ( pAnzahlStellen < 0 )
    {
      return '';
    }

    /*
     * Pruefung: Teilstring zurueckgeben?
     * Ist die Anzahl der Stellen kleiner als die Laenge von "pString",
     * wird ein Teilstring zurueckgegeben.
     *
     * Der Aufrufer bekommt den Teilstring ab der Position 0 bis zur
     * Anzahl der abzuschneidenden Stellen zuruek.
     */
    if ( pAnzahlStellen < pString.length )
    {
      return pString.substring( 0, pAnzahlStellen );
    }

    /*
     * Ueberschreitet die Anzahl der abzuschneidenden Stellen die
     * Laenge des Eingabestrings, muss kein Zeichen vom Eingabestring
     * abgeschnitten werden.
     *
     * Der Aufrufer bekommt die Eingabe zuruek.
     */
    return pString;
  },

  /**
   * <pre>
   * Schneidet die Anzahl-Stellen von dem uebergebenen String ab und gibt diesen zurueck.
   *
   * Uebersteigt die Anazhl der abzuschneidenden Stellen die Stringlaenge, wird der
   * Quellstring insgesamt zurueckgegeben.
   *
   * Ist die Anzahl der abzuschneidenden Stellen negativ oder 0, wird ein Leerstring zurueckgegeben.
   *
   * FkString.right( "ABC.DEF.GHI.JKL",  7 ) = "GHI.JKL"
   * FkString.right( "ABC.DEF.GHI.JKL", 20 ) = "ABC.DEF.GHI.JKL" = Anzahl Stellen uebersteigt Stringlaenge
   * FkString.right( "ABC.DEF.GHI.JKL",  0 ) = ""                = 0 Stellen abschneiden = Leerstring
   * FkString.right( "ABC.DEF.GHI.JKL", -7 ) = ""                = negative Anzahl       = Leerstring
   * 
   * </pre>
   * 
   * @param pString der Quellstring
   * @param pAnzahlStellen die Anzahl der von rechts abzuschneidenden Stellen
   * @return der ermittelte Teilstring
   */
  right : function( pString, pAnzahlStellen )
  {
    /*
     * Pruefung: Parameter "pString" ungleich "undefined" ?
     *
     * Ist der Parameter "pString" gleich "undefined", wird "undefined" zurueckgegeben.
     */
    if ( pString != undefined )
    {
      /*
       * Pruefung: Parameter "pAnzahlStellen" kleiner 0 ?
       *
       * Ist die Anzahl der abzuschneidenden Stellen negativ,
       * wird vor dem String abgeschnitten.
       *
       * Es wird ein Leerstring zurueckgegeben.
       */
      if ( pAnzahlStellen < 0 )
      {
        return '';
      }

      /*
       * Pruefung: Anzahl Stellen kleiner Stringlaenge ?
       *
       * Die SubString-Funktion muss nur ausgefuehrt werden, wenn
       * die Anzahl der abzuschneidenden Stellen kleiner als die
       * Stringlaenge von "pString" ist.
       *
       * Ist die Anzahl kleiner als die Stringlaenge, wird die
       * AB-Position fuer die Rueckgabe berechnet.
       *
       * Die Ab-Position ist die Stringlaenge abzueglich der
       * abzuschneidenden Stellen ( von rechts ).
       *
       * Danach wird der Sub-String zurueckgegeben.
       */
      if ( pAnzahlStellen < pString.length )
      {
        return pString.substring( pString.length - pAnzahlStellen, pString.length );
      }
    }

    /*
     * Ist "pString" gleich "undefined", wird "pString" zurueckgegeben (... ist ja "undefined")
     *
     * Ist "pString" laenger als die abzuschneidenden Stellen, wird "pString" zurueckgegeben.
     * In diesem Fall sollte mehr abgeschnitten werden, als was vorhanden ist.
     */
    return pString;
  },

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
  pos : function( pString, pSuchString, pAbPosition )
  {
    try
    {
      return pString.indexOf( pSuchString, pAbPosition );
    }
    catch ( err_inst )
    {
      // console.println( '\nFehler Funktion pos ' + err_inst.name + ': ' + err_inst.message );
    }

    return -1;
  },

  /**
   * <pre>
   * Wandelt den uebergebenen String in Grossbuchstaben um.
   *
   * Fuehrt im Endeffekt "pString.toUpperCase()" aus
   * </pre>
   * 
   * @param pString die zu wandelnde Zeichenkette
   * @return der String in Grossbuchstaben, oder einen Leerstring
   */
  ucase : function( pString )
  {
    if ( pString === undefined )
    {
      return '';
    }

    return pString.toUpperCase();
  },

  /**
   * <pre>
   * Wandelt den uebergebenen String in Kleinbuchstaben um.
   *
   * Fuehrt im Endeffekt "pString.toLowerCase()" aus
   * </pre>
   * 
   * @param pString die zu wandelnde Zeichenkette
   * @return der String in Kleinbuchstaben, oder einen Leerstring
   */
  lcase : function( pString )
  {
    if ( pString === undefined )
    {
      return '';
    }

    return pString.toLowerCase();
  },

  /**
   * <pre>
   * New Line 2 BR-Tag
   * Wandelt Zeilenumbrueche aus Java-String zu einem BR-Tag
   * JavaScript-Version der gleichnamigen PHP-Funktion.
   * </pre>
   * 
   * @param pString der zu konvertierende Text
   * @return den Eingabetext mit gewandelten Zeilenumbruechen im Html-Format
   */
  nl2br : function( pString )
  {
    /*
     * Pruefung: Parameter "pString" gesetzt?
     * Ist der Parameter "pString" nicht gesetzt, wird ein Leerstring zurueckgegeben.
     */
    if ( pString === undefined ) return '';

    /*
     * Ist der Parameter "pString" gesetzt, wird ueber einen regulaeren Ausdruck
     * jeder Zeilenumbruch in ein HTML-BR-Tag gewandelt.
     */
    return ( pString + '' ).replace( /([^>\r\n ]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2' );

    //
    //var eingabe_str_len = pString.length();
    //
    //var index_eingabe = 0;
    //
    //var str_ergebnis = '';
    //
    //while ( index_eingabe < eingabe_str_len )
    //{
    //  var akt_zeichen = pString.charAt( index_eingabe );
    //
    //  if ( akt_zeichen === '\n' )
    //  {
    //    str_ergebnis += '<br />';
    //  }
    //  else 
    //  {
    //    str_ergebnis += akt_zeichen;
    //  }
    //
    //  index_eingabe++;
    //}
    //
  },

  /**
   * <pre>
   * Stellt die Zeichen der Eingabe zufaellig um.
   *
   * Ist "pString" gleich undefined, wird undefined zurueckgegeben.
   * 
   * Ist die Laenge von "pString" gleich 1, wird "pString" zurueckgegeben.
   *
   * Ist "pAnzahlDurchlaeufe" kleiner 1, wird ein Vertauschungsdurchlauf gemacht.
   *
   * Eingabe: 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
   * Ausgabe: Z9j7LmPHIKA58JdgWfaFv2SCklGDYpstRXq0o1u6iVcNnr4eByzhMUEb3TOwxQ
   * </pre>
   *
   * @param pAnzahlDurchlaeufe die Anzahl der Vertauschungsdurchlaeufe
   * @param pString die umzustellende Eingabezeichenfolge
   * @return die Eingabezeichenfolge mit zufaelliger Umstellung der Zeichenpositionen
   */
  getRandomUmgestellt : function( pAnzahlDurchlaeufe, pString )
  {
    /*
     * Pruefung: pString gleich "undefined" ?
     *
     * Ist pString nicht gesetzt, wird "undefined" zurueckgegeben.
     *
     */
    if ( pString == undefined )
    {
      return undefined;
    }

    /*
     * Pruefung: Laenge gleich 1 Zeichen ?
     *
     * Ist die Laenge von "pString" gleich 1, wird keine Umstellung gemacht.
     * Es gibt keine sinnvolle Umstellung. Der Aufrufer bekommt "pString" zurueck.
     */
    if ( pString.length == 1 )
    {
      return pString;
    }

    /*
     * Keine negativen Durchlaeufe und mindestens ein Durchlauf
     */
    if ( pAnzahlDurchlaeufe < 1 )
    {
      pAnzahlDurchlaeufe = 1;
    }

    /*
     * Die Vertauschungen werden in einem Array durchgefuehrt
     */
    var array_ergebnis = pString.split( "" );

    /*
     * Hilfsvariable fuer den Tausch
     */
    var temp_char = ' ';

    var anzahl_tausch_operationen = pString.length;

    var random_zahl_grenze = pString.length - 1;

    var tausch_position_1 = 0;

    var tausch_position_2 = 0;

    /*
     * Verhinderung einer Endlosschleife
     */
    var zaehler = 0;

    /*
     * Der Zaehler fuer die Anzahl der Durchlaeufe wird auf 1 gestellt.
     */
    var nr_durchlauf = 1;

    /*
     * While-Schleife fuer die Vertauschungslaeufe.
     * Die While-Schleife laeuft solange, wie der Zaehler fuer die  Durchlaeufe noch
     * nicht die Anzahl aus dem Parameter "pAnzahlDurchlaeufe" erreicht hat.
     */
    while ( nr_durchlauf <= pAnzahlDurchlaeufe )
    {
      /*
       * Jeder Tauschdurchlauf startet beim ersten Zeichen des Strings.
       * Die Tausposition 1 wird auf 0 gestellt.
       */
      tausch_position_1 = 0;

      /*
       * Pruefung: Stringlaenge gleich 2 Zeichen ?
       *
       * Hat der zu vertauschende String nur 2 Zeichen, wird die
       * Tauschposition 2 auf das zweite Zeichen eingestellt und
       * die Positionen werden vertauscht.
       *
       * Sind mehr Zeichen im zu vertauschenden String vorhanden,
       * wird eine While-Schleife gestartet.
       */
      if ( anzahl_tausch_operationen == 2 )
      {
        tausch_position_2 = 1;

        temp_char = array_ergebnis[ tausch_position_1 ];

        array_ergebnis[ tausch_position_1 ] = array_ergebnis[ tausch_position_2 ];

        array_ergebnis[ tausch_position_2 ] = temp_char;

        /*
         * Per Zufall wird bestimmt, ob es noch einen weiteren Tausch-Durchlauf geben soll.
         *
         * Es wird eine Zufallszahl zwischen 0 und 100 erstellt.
         * Ist die Zufallszahl groesser 50, gibt es keinen zweiten Durchlauf
         *
         * Soll es keinen weiteren Durchlauf mehr geben, wird der Durchlaufzaehler auf
         * die Maximalanzahl der Durchlaeufe gesetzt.
         */
        if ( Math.floor( Math.random() * 100 ) > 50 )
        {
          nr_durchlauf = pAnzahlDurchlaeufe + 1;
        }
      }
      else
      {
        /*
         * While-Schleife fuer jedes Zeichen der Eingabe.
         * Jede Position des Eingabestrings wird einmal vertauscht.
         */
        while ( tausch_position_1 < anzahl_tausch_operationen )
        {
          try
          {
            /*
             * Position 1 der Vertauschungen ist der Index der inneren While-Schleife
             *
             * Position 2 der Vertauschungen wird per Zufall gewaehlt
             */
            tausch_position_2 = Math.floor( Math.random() * pString.length );
  
            zaehler = 0;
  
            /*
             * Mit einer dritten While-Schleife wird verhindert, dass die
             * beiden Tauschpositionen gleich sind.
             *
             * In der While-Schleife wird die Tauschpositon 2 neu vergeben,
             * sollte diese gleich der ersten Tauschpositon sein.
             *
             * Es wird 10 mal versucht, unterschiedliche Tauschpositionen zu beommen
             */
            while ( ( tausch_position_2 == tausch_position_1 ) && ( zaehler < 10 ) )
            {
              tausch_position_2 = Math.floor( Math.random() * pString.length );
  
              zaehler++;
            }
  
            /*
             * Pruefung: Tauschpositionen unterschiedlich ?
             *
             * Sind die Tauschpositionen unterschiedlich, wird die Vertauschung gemacht.
             *
             * Sind die Tauschpoistionen gleich, wird keine Vertauschung gemacht.
             */
            if ( tausch_position_2 != tausch_position_1 )
            {
              temp_char = array_ergebnis[ tausch_position_1 ];
  
              array_ergebnis[ tausch_position_1 ] = array_ergebnis[ tausch_position_2 ];
  
              array_ergebnis[ tausch_position_2 ] = temp_char;
            }
          }
          catch ( err_inst )
          {
            // nicht vorhandener Index
          }
  
          /*
           * Am Ende der zweiten While-Schleife wird die Tauschposition 1 um
           * eine Position weitergestellt.
           */
          tausch_position_1++;
        }
      }

      /*
       * Am Ende der ersten While-Schleife wird der Durchlaufzaehler um 1 erhoeht
       */
      nr_durchlauf++;
    }

    /*
     * Am Ende der Funktion wird dem Aufrufer der umgestellte String zurueckgegeben.
     */
    return array_ergebnis.join( "" );
  }
}
