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
  left: function (pString, pAnzahlStellen) {
    /*
     * Pruefung: Parameter "pString" gesetzt?
     * Ist der Parameter "pString" gleich "undefined", wird auch "undefined" zurueckgegeben.
     */
    if (pString === undefined) {
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
    if (pAnzahlStellen < 0) {
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
    if (pAnzahlStellen < pString.length) {
      return pString.substring(0, pAnzahlStellen);
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
  right: function (pString, pAnzahlStellen) {
    /*
     * Pruefung: Parameter "pString" ungleich "undefined" ?
     *
     * Ist der Parameter "pString" gleich "undefined", wird "undefined" zurueckgegeben.
     */
    if (pString != undefined) {
      /*
       * Pruefung: Parameter "pAnzahlStellen" kleiner 0 ?
       *
       * Ist die Anzahl der abzuschneidenden Stellen negativ,
       * wird vor dem String abgeschnitten.
       *
       * Es wird ein Leerstring zurueckgegeben.
       */
      if (pAnzahlStellen < 0) {
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
      if (pAnzahlStellen < pString.length) {
        return pString.substring(pString.length - pAnzahlStellen, pString.length);
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
  pos: function (pString, pSuchString, pAbPosition) {
    try {
      return pString.indexOf(pSuchString, pAbPosition);
    }
    catch (err_inst) {
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
  ucase: function (pString) {
    if (pString === undefined) {
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
  lcase: function (pString) {
    if (pString === undefined) {
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
  nl2br: function (pString) {
    /*
     * Pruefung: Parameter "pString" gesetzt?
     * Ist der Parameter "pString" nicht gesetzt, wird ein Leerstring zurueckgegeben.
     */
    if (pString === undefined) return '';

    /*
     * Ist der Parameter "pString" gesetzt, wird ueber einen regulaeren Ausdruck
     * jeder Zeilenumbruch in ein HTML-BR-Tag gewandelt.
     */
    return (pString + '').replace(/([^>\r\n ]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');

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
  getRandomUmgestellt: function (pAnzahlDurchlaeufe, pString) {
    /*
     * Pruefung: pString gleich "undefined" ?
     *
     * Ist pString nicht gesetzt, wird "undefined" zurueckgegeben.
     *
     */
    if (pString == undefined) {
      return undefined;
    }

    /*
     * Pruefung: Laenge gleich 1 Zeichen ?
     *
     * Ist die Laenge von "pString" gleich 1, wird keine Umstellung gemacht.
     * Es gibt keine sinnvolle Umstellung. Der Aufrufer bekommt "pString" zurueck.
     */
    if (pString.length == 1) {
      return pString;
    }

    /*
     * Keine negativen Durchlaeufe und mindestens ein Durchlauf
     */
    if (pAnzahlDurchlaeufe < 1) {
      pAnzahlDurchlaeufe = 1;
    }

    /*
     * Die Vertauschungen werden in einem Array durchgefuehrt
     */
    var array_ergebnis = pString.split("");

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
    while (nr_durchlauf <= pAnzahlDurchlaeufe) {
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
      if (anzahl_tausch_operationen == 2) {
        tausch_position_2 = 1;

        temp_char = array_ergebnis[tausch_position_1];

        array_ergebnis[tausch_position_1] = array_ergebnis[tausch_position_2];

        array_ergebnis[tausch_position_2] = temp_char;

        /*
         * Per Zufall wird bestimmt, ob es noch einen weiteren Tausch-Durchlauf geben soll.
         *
         * Es wird eine Zufallszahl zwischen 0 und 100 erstellt.
         * Ist die Zufallszahl groesser 50, gibt es keinen zweiten Durchlauf
         *
         * Soll es keinen weiteren Durchlauf mehr geben, wird der Durchlaufzaehler auf
         * die Maximalanzahl der Durchlaeufe gesetzt.
         */
        if (Math.floor(Math.random() * 100) > 50) {
          nr_durchlauf = pAnzahlDurchlaeufe + 1;
        }
      }
      else {
        /*
         * While-Schleife fuer jedes Zeichen der Eingabe.
         * Jede Position des Eingabestrings wird einmal vertauscht.
         */
        while (tausch_position_1 < anzahl_tausch_operationen) {
          try {
            /*
             * Position 1 der Vertauschungen ist der Index der inneren While-Schleife
             *
             * Position 2 der Vertauschungen wird per Zufall gewaehlt
             */
            tausch_position_2 = Math.floor(Math.random() * pString.length);

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
            while ((tausch_position_2 == tausch_position_1) && (zaehler < 10)) {
              tausch_position_2 = Math.floor(Math.random() * pString.length);

              zaehler++;
            }

            /*
             * Pruefung: Tauschpositionen unterschiedlich ?
             *
             * Sind die Tauschpositionen unterschiedlich, wird die Vertauschung gemacht.
             *
             * Sind die Tauschpoistionen gleich, wird keine Vertauschung gemacht.
             */
            if (tausch_position_2 != tausch_position_1) {
              temp_char = array_ergebnis[tausch_position_1];

              array_ergebnis[tausch_position_1] = array_ergebnis[tausch_position_2];

              array_ergebnis[tausch_position_2] = temp_char;
            }
          }
          catch (err_inst) {
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
    return array_ergebnis.join("");
  },


  jsonGetString: function (pElementName, pElementWert) 
  {
    if (typeof (pElementWert) == "number") 
    {
      return '\"' + pElementName + '\" : ' + pElementWert;
    }

    if (typeof (pElementWert) == "boolean") 
    {
      return '\"' + pElementName + '\" : ' + pElementWert;
    }

    if (typeof (pElementWert) == "bigint") 
    {
      return '\"' + pElementName + '\" : ' + pElementWert;
    }
      
    return '\"' + pElementName + '\" : \"' + this.jsonQuoteChars(pElementWert) + '\"';
  },

  jsonQuoteChars: function (pString) {
    var eingabe_str_len = pString.length;

    var index_eingabe = 0;

    var str_ergebnis = '';

    try {
      while (index_eingabe < eingabe_str_len) {

        var akt_zeichen = pString.charAt(index_eingabe);

        var char_code = pString.charCodeAt(index_eingabe);

        switch (char_code) {
          case 10: str_ergebnis += '\\n'; break;
          case 0x0022: str_ergebnis += "\u0022"; break; // DOUBLE_QUOTATION_MARK
          case 0x0026: str_ergebnis += "\u0026"; break; // AMPERSAND
          case 0x0027: str_ergebnis += "\u0027"; break; // APOSTROPHE
          case 0x003c: str_ergebnis += "\u003c"; break; // LESS_THAN_SIGN
          case 0x003e: str_ergebnis += "\u003e"; break; // GREATER_THAN_SIGN
          case 0x00a0: str_ergebnis += "\u00a0"; break; // NONBREAKING_SPACE
          case 0x00a1: str_ergebnis += "\u00a1"; break; // INVERTED_EXCLAMATION
          case 0x00a2: str_ergebnis += "\u00a2"; break; // CENT_SIGN
          case 0x00a3: str_ergebnis += "\u00a3"; break; // POUND_STERLING
          case 0x00a4: str_ergebnis += "\u00a4"; break; // GENERAL_CURRENCY_SIGN
          case 0x00a5: str_ergebnis += "\u00a5"; break; // YEN_SIGN
          case 0x00a6: str_ergebnis += "\u00a6"; break; // BROKEN_BAR
          case 0x00a7: str_ergebnis += "\u00a7"; break; // SECTION_SIGN
          case 0x00a8: str_ergebnis += "\u00a8"; break; // DIAERESIS
          case 0x00a9: str_ergebnis += "\u00a9"; break; // COPYRIGHT
          case 0x00aa: str_ergebnis += "\u00aa"; break; // FEMININE_ORDINAL
          case 0x00ab: str_ergebnis += "\u00ab"; break; // LEFT_ANGLE_QUOTE
          case 0x00ac: str_ergebnis += "\u00ac"; break; // NOT_SIGN
          case 0x00ad: str_ergebnis += "\u00ad"; break; // SOFT_HYPHEN
          case 0x00ae: str_ergebnis += "\u00ae"; break; // REGISTERED_TRADEMARK
          case 0x00af: str_ergebnis += "\u00af"; break; // MACRON
          case 0x00b0: str_ergebnis += "\u00b0"; break; // DEGREE_SIGN
          case 0x00b1: str_ergebnis += "\u00b1"; break; // PLUS_OR_MINUS
          case 0x00b2: str_ergebnis += "\u00b2"; break; // SUPERSCRIPT_TWO
          case 0x00b3: str_ergebnis += "\u00b3"; break; // SUPERSCRIPT_THREE
          case 0x00b4: str_ergebnis += "\u00b4"; break; // ACUTE_ACCENT
          case 0x00b5: str_ergebnis += "\u00b5"; break; // MICRO_SIGN
          case 0x00b6: str_ergebnis += "\u00b6"; break; // PARAGRAPH_SIGN
          case 0x00b7: str_ergebnis += "\u00b7"; break; // MIDDLE_DOT
          case 0x00b8: str_ergebnis += "\u00b8"; break; // CEDILLA
          case 0x00b9: str_ergebnis += "\u00b9"; break; // SUPERSCRIPT_ONE
          case 0x00ba: str_ergebnis += "\u00ba"; break; // MASCULINE_ORDINAL
          case 0x00bb: str_ergebnis += "\u00bb"; break; // RIGHT_ANGLE_QUOTE
          case 0x00bc: str_ergebnis += "\u00bc"; break; // ONE_FOURTH
          case 0x00bd: str_ergebnis += "\u00bd"; break; // ONE_HALF
          case 0x00be: str_ergebnis += "\u00be"; break; // THREE_FOURTHS
          case 0x00bf: str_ergebnis += "\u00bf"; break; // INVERTED_QUESTION_MARK
          case 0x00c0: str_ergebnis += "\u00c0"; break; // UPPERCASE_AGRAVE_ACCENT
          case 0x00c1: str_ergebnis += "\u00c1"; break; // UPPERCASE_AACUTE_ACCENT
          case 0x00c2: str_ergebnis += "\u00c2"; break; // UPPERCASE_ACIRCUMFLEX_ACCENT
          case 0x00c3: str_ergebnis += "\u00c3"; break; // UPPERCASE_ATILDE
          case 0x00c4: str_ergebnis += "\u00c4"; break; // UPPERCASE_AUMLAUT
          case 0x00c5: str_ergebnis += "\u00c5"; break; // UPPERCASE_ARING
          case 0x00c6: str_ergebnis += "\u00c6"; break; // UPPERCASE_AE
          case 0x00c7: str_ergebnis += "\u00c7"; break; // UPPERCASE_CCEDILLA
          case 0x00c8: str_ergebnis += "\u00c8"; break; // UPPERCASE_EGRAVE_ACCENT
          case 0x00c9: str_ergebnis += "\u00c9"; break; // UPPERCASE_EACUTE_ACCENT
          case 0x00ca: str_ergebnis += "\u00ca"; break; // UPPERCASE_ECIRCUMFLEX_ACCENT
          case 0x00cb: str_ergebnis += "\u00cb"; break; // UPPERCASE_EUMLAUT
          case 0x00cc: str_ergebnis += "\u00cc"; break; // UPPERCASE_IGRAVE_ACCENT
          case 0x00cd: str_ergebnis += "\u00cd"; break; // UPPERCASE_IACUTE_ACCENT
          case 0x00ce: str_ergebnis += "\u00ce"; break; // UPPERCASE_ICIRCUMFLEX_ACCENT
          case 0x00cf: str_ergebnis += "\u00cf"; break; // UPPERCASE_IUMLAUT
          case 0x00d0: str_ergebnis += "\u00d0"; break; // UPPERCASE_ETH_ICELANDIC
          case 0x00d1: str_ergebnis += "\u00d1"; break; // UPPERCASE_NTILDE
          case 0x00d2: str_ergebnis += "\u00d2"; break; // UPPERCASE_OGRAVE_ACCENT
          case 0x00d3: str_ergebnis += "\u00d3"; break; // UPPERCASE_OACUTE_ACCENT
          case 0x00d4: str_ergebnis += "\u00d4"; break; // UPPERCASE_OCIRCUMFLEX_ACCENT
          case 0x00d5: str_ergebnis += "\u00d5"; break; // UPPERCASE_OTILDE
          case 0x00d6: str_ergebnis += "\u00d6"; break; // UPPERCASE_OUMLAUT
          case 0x00d7: str_ergebnis += "\u00d7"; break; // MULTIPLICATION_SIGN
          case 0x00d8: str_ergebnis += "\u00d8"; break; // UPPERCASE_OSLASH
          case 0x00d9: str_ergebnis += "\u00d9"; break; // UPPERCASE_UGRAVE_ACCENT
          case 0x00da: str_ergebnis += "\u00da"; break; // UPPERCASE_UACUTE_ACCENT
          case 0x00db: str_ergebnis += "\u00db"; break; // UPPERCASE_UCIRCUMFLEX_ACCENT
          case 0x00dc: str_ergebnis += "\u00dc"; break; // UPPERCASE_UUMLAUT
          case 0x00dd: str_ergebnis += "\u00dd"; break; // UPPERCASE_YACUTE_ACCENT
          case 0x00de: str_ergebnis += "\u00de"; break; // UPPERCASE_THORN_ICELANDIC
          case 0x00df: str_ergebnis += "\u00df"; break; // LOWERCASE_SHARPS_GERMAN
          case 0x00e0: str_ergebnis += "\u00e0"; break; // LOWERCASE_AGRAVE_ACCENT
          case 0x00e1: str_ergebnis += "\u00e1"; break; // LOWERCASE_AACUTE_ACCENT
          case 0x00e2: str_ergebnis += "\u00e2"; break; // LOWERCASE_ACIRCUMFLEX_ACCENT
          case 0x00e3: str_ergebnis += "\u00e3"; break; // LOWERCASE_ATILDE
          case 0x00e4: str_ergebnis += "\u00e4"; break; // LOWERCASE_AUMLAUT
          case 0x00e5: str_ergebnis += "\u00e5"; break; // LOWERCASE_ARING
          case 0x00e6: str_ergebnis += "\u00e6"; break; // LOWERCASE_AE
          case 0x00e7: str_ergebnis += "\u00e7"; break; // LOWERCASE_CCEDILLA
          case 0x00e8: str_ergebnis += "\u00e8"; break; // LOWERCASE_EGRAVE_ACCENT
          case 0x00e9: str_ergebnis += "\u00e9"; break; // LOWERCASE_EACUTE_ACCENT
          case 0x00ea: str_ergebnis += "\u00ea"; break; // LOWERCASE_ECIRCUMFLEX_ACCENT
          case 0x00eb: str_ergebnis += "\u00eb"; break; // LOWERCASE_EUMLAUT
          case 0x00ec: str_ergebnis += "\u00ec"; break; // LOWERCASE_IGRAVE_ACCENT
          case 0x00ed: str_ergebnis += "\u00ed"; break; // LOWERCASE_IACUTE_ACCENT
          case 0x00ee: str_ergebnis += "\u00ee"; break; // LOWERCASE_ICIRCUMFLEX_ACCENT
          case 0x00ef: str_ergebnis += "\u00ef"; break; // LOWERCASE_IUMLAUT
          case 0x00f0: str_ergebnis += "\u00f0"; break; // LOWERCASE_ETH_ICELANDIC
          case 0x00f1: str_ergebnis += "\u00f1"; break; // LOWERCASE_NTILDE
          case 0x00f2: str_ergebnis += "\u00f2"; break; // LOWERCASE_OGRAVE_ACCENT
          case 0x00f3: str_ergebnis += "\u00f3"; break; // LOWERCASE_OACUTE_ACCENT
          case 0x00f4: str_ergebnis += "\u00f4"; break; // LOWERCASE_OCIRCUMFLEX_ACCENT
          case 0x00f5: str_ergebnis += "\u00f5"; break; // LOWERCASE_OTILDE
          case 0x00f6: str_ergebnis += "\u00f6"; break; // LOWERCASE_OUMLAUT
          case 0x00f7: str_ergebnis += "\u00f7"; break; // DIVISION_SIGN
          case 0x00f8: str_ergebnis += "\u00f8"; break; // LOWERCASE_OSLASH
          case 0x00f9: str_ergebnis += "\u00f9"; break; // LOWERCASE_UGRAVE_ACCENT
          case 0x00fa: str_ergebnis += "\u00fa"; break; // LOWERCASE_UACUTE_ACCENT
          case 0x00fb: str_ergebnis += "\u00fb"; break; // LOWERCASE_UCIRCUMFLEX_ACCENT
          case 0x00fc: str_ergebnis += "\u00fc"; break; // LOWERCASE_UUMLAUT
          case 0x00fd: str_ergebnis += "\u00fd"; break; // LOWERCASE_YACUTE_ACCENT
          case 0x00fe: str_ergebnis += "\u00fe"; break; // LOWERCASE_THORN_ICELANDIC
          case 0x00ff: str_ergebnis += "\u00ff"; break; // LOWERCASE_YUMLAUT
          case 0x0152: str_ergebnis += "\u0152"; break; // LATIN_CAPITAL_LIGATURE_OE
          case 0x0153: str_ergebnis += "\u0153"; break; // LATIN_SMALL_LIGATURE_OE
          case 0x0160: str_ergebnis += "\u0160"; break; // LATIN_CAPITAL_LETTER_SWITH_CARON
          case 0x0161: str_ergebnis += "\u0161"; break; // LATIN_SMALL_LETTER_SWITH_CARON
          case 0x0178: str_ergebnis += "\u0178"; break; // LATIN_CAPITAL_LETTER_YWITH_DIAERESIS
          case 0x0192: str_ergebnis += "\u0192"; break; // LATIN_SMALL_LETTER_FWITH_HOOK
          case 0x02c6: str_ergebnis += "\u02c6"; break; // MODIFIER_LETTER_CIRCUMFLEX_ACCENT
          case 0x02dc: str_ergebnis += "\u02dc"; break; // SMALL_TILDE
          case 0x0391: str_ergebnis += "\u0391"; break; // GREEK_CAPITAL_LETTER_ALPHA
          case 0x0392: str_ergebnis += "\u0392"; break; // GREEK_CAPITAL_LETTER_BETA
          case 0x0393: str_ergebnis += "\u0393"; break; // GREEK_CAPITAL_LETTER_GAMMA
          case 0x0394: str_ergebnis += "\u0394"; break; // GREEK_CAPITAL_LETTER_DELTA
          case 0x0395: str_ergebnis += "\u0395"; break; // GREEK_CAPITAL_LETTER_EPSILON
          case 0x0396: str_ergebnis += "\u0396"; break; // GREEK_CAPITAL_LETTER_ZETA
          case 0x0397: str_ergebnis += "\u0397"; break; // GREEK_CAPITAL_LETTER_ETA
          case 0x0398: str_ergebnis += "\u0398"; break; // GREEK_CAPITAL_LETTER_THETA
          case 0x0399: str_ergebnis += "\u0399"; break; // GREEK_CAPITAL_LETTER_IOTA
          case 0x039a: str_ergebnis += "\u039a"; break; // GREEK_CAPITAL_LETTER_KAPPA
          case 0x039b: str_ergebnis += "\u039b"; break; // GREEK_CAPITAL_LETTER_LAMDA
          case 0x039c: str_ergebnis += "\u039c"; break; // GREEK_CAPITAL_LETTER_MU
          case 0x039d: str_ergebnis += "\u039d"; break; // GREEK_CAPITAL_LETTER_NU
          case 0x039e: str_ergebnis += "\u039e"; break; // GREEK_CAPITAL_LETTER_XI
          case 0x039f: str_ergebnis += "\u039f"; break; // GREEK_CAPITAL_LETTER_OMICRON
          case 0x03a0: str_ergebnis += "\u03a0"; break; // GREEK_CAPITAL_LETTER_PI
          case 0x03a1: str_ergebnis += "\u03a1"; break; // GREEK_CAPITAL_LETTER_RHO
          case 0x03a3: str_ergebnis += "\u03a3"; break; // GREEK_CAPITAL_LETTER_SIGMA
          case 0x03a4: str_ergebnis += "\u03a4"; break; // GREEK_CAPITAL_LETTER_TAU
          case 0x03a5: str_ergebnis += "\u03a5"; break; // GREEK_CAPITAL_LETTER_UPSILON
          case 0x03a6: str_ergebnis += "\u03a6"; break; // GREEK_CAPITAL_LETTER_PHI
          case 0x03a7: str_ergebnis += "\u03a7"; break; // GREEK_CAPITAL_LETTER_CHI
          case 0x03a8: str_ergebnis += "\u03a8"; break; // GREEK_CAPITAL_LETTER_PSI
          case 0x03a9: str_ergebnis += "\u03a9"; break; // GREEK_CAPITAL_LETTER_OMEGA
          case 0x03b1: str_ergebnis += "\u03b1"; break; // GREEK_SMALL_LETTER_ALPHA
          case 0x03b2: str_ergebnis += "\u03b2"; break; // GREEK_SMALL_LETTER_BETA
          case 0x03b3: str_ergebnis += "\u03b3"; break; // GREEK_SMALL_LETTER_GAMMA
          case 0x03b4: str_ergebnis += "\u03b4"; break; // GREEK_SMALL_LETTER_DELTA
          case 0x03b5: str_ergebnis += "\u03b5"; break; // GREEK_SMALL_LETTER_EPSILON
          case 0x03b6: str_ergebnis += "\u03b6"; break; // GREEK_SMALL_LETTER_ZETA
          case 0x03b7: str_ergebnis += "\u03b7"; break; // GREEK_SMALL_LETTER_ETA
          case 0x03b8: str_ergebnis += "\u03b8"; break; // GREEK_SMALL_LETTER_THETA
          case 0x03b9: str_ergebnis += "\u03b9"; break; // GREEK_SMALL_LETTER_IOTA
          case 0x03ba: str_ergebnis += "\u03ba"; break; // GREEK_SMALL_LETTER_KAPPA
          case 0x03bb: str_ergebnis += "\u03bb"; break; // GREEK_SMALL_LETTER_LAMDA
          case 0x03bc: str_ergebnis += "\u03bc"; break; // GREEK_SMALL_LETTER_MU
          case 0x03bd: str_ergebnis += "\u03bd"; break; // GREEK_SMALL_LETTER_NU
          case 0x03be: str_ergebnis += "\u03be"; break; // GREEK_SMALL_LETTER_XI
          case 0x03bf: str_ergebnis += "\u03bf"; break; // GREEK_SMALL_LETTER_OMICRON
          case 0x03c0: str_ergebnis += "\u03c0"; break; // GREEK_SMALL_LETTER_PI
          case 0x03c1: str_ergebnis += "\u03c1"; break; // GREEK_SMALL_LETTER_RHO
          case 0x03c2: str_ergebnis += "\u03c2"; break; // GREEK_SMALL_LETTER_FINAL_SIGMA
          case 0x03c3: str_ergebnis += "\u03c3"; break; // GREEK_SMALL_LETTER_SIGMA
          case 0x03c4: str_ergebnis += "\u03c4"; break; // GREEK_SMALL_LETTER_TAU
          case 0x03c5: str_ergebnis += "\u03c5"; break; // GREEK_SMALL_LETTER_UPSILON
          case 0x03c6: str_ergebnis += "\u03c6"; break; // GREEK_SMALL_LETTER_PHI
          case 0x03c7: str_ergebnis += "\u03c7"; break; // GREEK_SMALL_LETTER_CHI
          case 0x03c8: str_ergebnis += "\u03c8"; break; // GREEK_SMALL_LETTER_PSI
          case 0x03c9: str_ergebnis += "\u03c9"; break; // GREEK_SMALL_LETTER_OMEGA
          case 0x03d1: str_ergebnis += "\u03d1"; break; // GREEK_THETA_SYMBOL
          case 0x03d2: str_ergebnis += "\u03d2"; break; // GREEK_UPSILON_WITH_HOOK_SYMBOL
          case 0x03d6: str_ergebnis += "\u03d6"; break; // GREEK_PI_SYMBOL
          case 0x2002: str_ergebnis += "\u2002"; break; // EN_SPACE
          case 0x2003: str_ergebnis += "\u2003"; break; // EM_SPACE
          case 0x2009: str_ergebnis += "\u2009"; break; // THIN_SPACE
          case 0x200c: str_ergebnis += "\u200c"; break; // ZERO_WIDTH_NON_JOINER
          case 0x200d: str_ergebnis += "\u200d"; break; // ZERO_WIDTH_JOINER
          case 0x200e: str_ergebnis += "\u200e"; break; // LEFT_TO_RIGHT_MARK
          case 0x200f: str_ergebnis += "\u200f"; break; // RIGHT_TO_LEFT_MARK
          case 0x2013: str_ergebnis += "\u2013"; break; // EN_DASH
          case 0x2014: str_ergebnis += "\u2014"; break; // EM_DASH
          case 0x2018: str_ergebnis += "\u2018"; break; // LEFT_SINGLE_QUOTE
          case 0x2019: str_ergebnis += "\u2019"; break; // RIGHT_SINGLE_QUOTE
          case 0x201a: str_ergebnis += "\u201a"; break; // SINGLE_LOW_9_QUOTE
          case 0x201c: str_ergebnis += "\u201c"; break; // LEFT_DOUBLE_QUOTE
          case 0x201d: str_ergebnis += "\u201d"; break; // RIGHT_DOUBLE_QUOTE
          case 0x201e: str_ergebnis += "\u201e"; break; // DOUBLE_LOW_9_QUOTE
          case 0x2020: str_ergebnis += "\u2020"; break; // DAGGER
          case 0x2021: str_ergebnis += "\u2021"; break; // DOUBLE_DAGGER
          case 0x2022: str_ergebnis += "\u2022"; break; // BULLET
          case 0x2026: str_ergebnis += "\u2026"; break; // ELLIPSES
          case 0x2030: str_ergebnis += "\u2030"; break; // PER_MILL_SIGN
          case 0x2032: str_ergebnis += "\u2032"; break; // PRIME
          case 0x2033: str_ergebnis += "\u2033"; break; // DOUBLE_PRIME
          case 0x2039: str_ergebnis += "\u2039"; break; // SINGLE_LEFT_POINTING_ANGLE_QUOTE
          case 0x203a: str_ergebnis += "\u203a"; break; // SINGLE_RIGHT_POINTING_ANGLE_QUOTE
          case 0x203e: str_ergebnis += "\u203e"; break; // OVERLINE_SPACING_OVERSCORE
          case 0x2044: str_ergebnis += "\u2044"; break; // SLASH
          case 0x20ac: str_ergebnis += "\u20ac"; break; // EURO_SIGN
          case 0x2111: str_ergebnis += "\u2111"; break; // BLACK_LETTER_CAPITAL_I
          case 0x2118: str_ergebnis += "\u2118"; break; // SCRIPT_CAPITAL_P
          case 0x211c: str_ergebnis += "\u211c"; break; // BLACK_LETTER_CAPITAL_R
          case 0x2122: str_ergebnis += "\u2122"; break; // TRADEMARK_SIGN
          case 0x2135: str_ergebnis += "\u2135"; break; // ALEF_SYMBOL
          case 0x2190: str_ergebnis += "\u2190"; break; // LEFTWARD_ARROW
          case 0x2191: str_ergebnis += "\u2191"; break; // UPWARD_ARROW
          case 0x2192: str_ergebnis += "\u2192"; break; // RIGHTWARD_ARROW
          case 0x2193: str_ergebnis += "\u2193"; break; // DOWNWARD_ARROW
          case 0x2194: str_ergebnis += "\u2194"; break; // LEFT_RIGHT_ARROW
          case 0x21b5: str_ergebnis += "\u21b5"; break; // DOWNWARDS_ARROW_WITH_CORNER_LEFTWARDS
          case 0x21d0: str_ergebnis += "\u21d0"; break; // LEFTWARDS_DOUBLE_ARROW
          case 0x21d1: str_ergebnis += "\u21d1"; break; // UPWARDS_DOUBLE_ARROW
          case 0x21d2: str_ergebnis += "\u21d2"; break; // RIGHTWARDS_DOUBLE_ARROW
          case 0x21d3: str_ergebnis += "\u21d3"; break; // DOWNWARDS_DOUBLE_ARROW
          case 0x21d4: str_ergebnis += "\u21d4"; break; // LEFT_RIGHT_DOUBLE_ARROW
          case 0x2200: str_ergebnis += "\u2200"; break; // FOR_ALL
          case 0x2202: str_ergebnis += "\u2202"; break; // PARTIAL_DIFFERENTIAL
          case 0x2203: str_ergebnis += "\u2203"; break; // THERE_EXISTS
          case 0x2205: str_ergebnis += "\u2205"; break; // EMPTY_SET
          case 0x2207: str_ergebnis += "\u2207"; break; // NABLA
          case 0x2208: str_ergebnis += "\u2208"; break; // ELEMENT_OF
          case 0x2209: str_ergebnis += "\u2209"; break; // NOT_AN_ELEMENT_OF
          case 0x220b: str_ergebnis += "\u220b"; break; // CONTAINS_AS_MEMBER
          case 0x220f: str_ergebnis += "\u220f"; break; // NARY_PRODUCT
          case 0x2211: str_ergebnis += "\u2211"; break; // NARY_SUMMATION
          case 0x2212: str_ergebnis += "\u2212"; break; // MINUS_SIGN
          case 0x2217: str_ergebnis += "\u2217"; break; // ASTERISK_OPERATOR
          case 0x221a: str_ergebnis += "\u221a"; break; // SQUARE_ROOT
          case 0x221d: str_ergebnis += "\u221d"; break; // PROPORTIONAL_TO
          case 0x221e: str_ergebnis += "\u221e"; break; // INFINITY
          case 0x2220: str_ergebnis += "\u2220"; break; // ANGLE
          case 0x2227: str_ergebnis += "\u2227"; break; // LOGICAL_AND
          case 0x2228: str_ergebnis += "\u2228"; break; // LOGICAL_OR
          case 0x2229: str_ergebnis += "\u2229"; break; // INTERSECTION
          case 0x222a: str_ergebnis += "\u222a"; break; // UNION
          case 0x222b: str_ergebnis += "\u222b"; break; // INTEGRAL
          case 0x2234: str_ergebnis += "\u2234"; break; // THEREFORE
          case 0x223c: str_ergebnis += "\u223c"; break; // TILDE_OPERATOR
          case 0x2245: str_ergebnis += "\u2245"; break; // APPROXIMATELY_EQUAL_TO
          case 0x2248: str_ergebnis += "\u2248"; break; // ALMOST_EQUAL_TO
          case 0x2260: str_ergebnis += "\u2260"; break; // NOT_EQUAL_TO
          case 0x2261: str_ergebnis += "\u2261"; break; // IDENTICAL_TO
          case 0x2264: str_ergebnis += "\u2264"; break; // LESS_THAN_OR_EQUAL_TO
          case 0x2265: str_ergebnis += "\u2265"; break; // GREATER_THAN_OR_EQUAL_TO
          case 0x2282: str_ergebnis += "\u2282"; break; // SUBSET_OF
          case 0x2283: str_ergebnis += "\u2283"; break; // SUPERSET_OF
          case 0x2284: str_ergebnis += "\u2284"; break; // NOT_ASUBSET_OF
          case 0x2286: str_ergebnis += "\u2286"; break; // SUBSET_OF_OR_EQUAL_TO
          case 0x2287: str_ergebnis += "\u2287"; break; // SUPERSET_OF_OR_EQUAL_TO
          case 0x2295: str_ergebnis += "\u2295"; break; // CIRCLED_PLUS
          case 0x2297: str_ergebnis += "\u2297"; break; // CIRCLED_TIMES
          case 0x22a5: str_ergebnis += "\u22a5"; break; // UP_TACK
          case 0x22c5: str_ergebnis += "\u22c5"; break; // DOT_OPERATOR
          case 0x2308: str_ergebnis += "\u2308"; break; // LEFT_CEILING
          case 0x2309: str_ergebnis += "\u2309"; break; // RIGHT_CEILING
          case 0x230a: str_ergebnis += "\u230a"; break; // LEFT_FLOOR
          case 0x230b: str_ergebnis += "\u230b"; break; // RIGHT_FLOOR
          case 0x2329: str_ergebnis += "\u2329"; break; // LEFT_POINTING_ANGLE_BRACKET
          case 0x232a: str_ergebnis += "\u232a"; break; // RIGHT_POINTING_ANGLE_BRACKET
          case 0x25ca: str_ergebnis += "\u25ca"; break; // LOZENGE
          case 0x2660: str_ergebnis += "\u2660"; break; // BLACK_SPADE_SUIT
          case 0x2663: str_ergebnis += "\u2663"; break; // BLACK_CLUB_SUIT
          case 0x2665: str_ergebnis += "\u2665"; break; // BLACK_HEART_SUIT
          case 0x2666: str_ergebnis += "\u2666"; break; // BLACK_DIAMOND_SUIT

          default:
            str_ergebnis += akt_zeichen;
        }

        index_eingabe++;
      }

    }
    catch (err_inst) {
      console.log(err_inst.message);

      //Console.WriteLine( "Fehler: errexportFragenKatalog2Json\n" + err_inst.Message + "\n\n" + err_inst.StackTrace );
    }

    return str_ergebnis;
  },



/**
   * <pre>
   * A simple implementation to pretty-print JSON file.
   * 
   * https://stackoverflow.com/questions/4105795/pretty-print-json-in-java/7310424
   * </pre>
   *
   * @param pJsonString der zu formatierende JSON-String
   * @return einen formatierten JSON-String
   */
prettyPrintJSON : function ( pJsonString )
{
  /*
   * Pruefung: Ist "pJsonString" gleich "undefined" ?
   * 
   * Ist der Parameter nicht geseztzt, wird "undefined" zurueckgegeben.
   */
  if ( pJsonString == undefined )
  {
    return undefined;
  }

  /*
   * Stringbuilder fuer die Aufnahme des Ergebnisses erstellen.
   */
  var string_json_formatiert = "";

  /*
   * Variable fuer den zu setzenden TAB-Einzug definieren.
   */
  var string_einzug_json = '  ';

  /*
   * Die Variable "einzug_anzahl" speichert die Anzahl der 
   * Tabulatoren-Strings fuer den Einzug der Elemente
   */
  var einzug_anzahl = 0;

  /*
   * Kennzeichen, ob sich der Leseprozess in einem String befindet.
   */
  var knz_in_string = false;

  /*
   * Variable fuer das aktuelle Zeichen aus dem Eingabestring
   */
  var akt_zeichen = '';

  /*
   * 
   */
  var knz_ist_leeres_element = false;

  /*
   * Laenge des Eingabestrings ermitteln und in der 
   * Variablen "eingabe_str_len" speichern.
   */
  var eingabe_str_len = pJsonString.length;

  /*
   * Leseposition auf das erste Zeichen stellen
   */
  var index_eingabe = 0;

  /*
   * While-Schleife ueber alle Zeichen der Eingabe
   */
  while ( index_eingabe < eingabe_str_len )
  {
    /*
     * Aktuelles Zeichen an der Leseposition ermitteln
     */
    akt_zeichen = pJsonString.charAt( index_eingabe );

    switch ( akt_zeichen )
    {
      case '"' :

        /* 
         * Anfuehrungszeichen
         * 
         * Ein Anfuehrungszeichen schaltet das Kennzeichen "knz_in_string" um.
         * 
         * Sollen nur Teil-JSON-Strings formatiert werden, kann dieses zu 
         * Fehlern in der Ausgabe fuehren. Diese Funktion ist so ausgelegt, 
         * dass sie sich selber wieder synchronisiert, indem Klammern das
         * Kennzeichen "knz_in_string" wieder auf FALSE stellen.
         */

        knz_in_string = !knz_in_string;

        /*
         * Das Anfuerungszeichen wird in den Ergebnisstring aufgenommen
         */

        string_json_formatiert += akt_zeichen;

        break;

      case '\n' :

        /* 
         * Zeilenumbruch ueberlesen
         * 
         * Ein Zeilenumbruchszeichen aus dem Eingabe-Json-String wird ueberlesen.
         * Die Zeilenumbrueche werden von dieser Funktion selbst erstellt. 
         */

        break;

      case '\r' :

        /* 
         * Linefeed ueberlesen
         */

        break;

      case ':' :

        /* 
         * Doppelpunkt
         * 
         * Befindet sich der Doppelpunkt in einem String, wird
         * nur der Doppelpunkt uebernommen.
         * 
         * Befindet sich der Doppelpunkt ausserhalb eines Strings,
         * wird dieser mit 2 Leerzeichen umschlossen. Diese beiden
         * Leerzeichen wuerden sonst von dieser Funktion eleminiert
         * werden. Sie dienen der besseren Uebersichtlichkeit.
         */

        if ( knz_in_string )
        {
          string_json_formatiert += akt_zeichen;
        }
        else
        {
          string_json_formatiert += ' ';
          string_json_formatiert += akt_zeichen;
          string_json_formatiert += ' ';
        }

        break;

      case ' ' :

        /* 
         * Leerzeichen
         * 
         * Leerzeichen in Strings werden uebernommen.
         * 
         * Leerzeichen ausserhalb von Strings werden ueberlesen.
         */

        if ( knz_in_string )
        {
          string_json_formatiert += akt_zeichen;
        }

        break;

      case '{' :
      case '[' :

        /* 
         * Oeffnende Klammern
         * 
         * - beendet einen String
         * - erhoeht die Tab-Einzugsanzahl
         * - die Einzugsanzahl darf nicht mehr als 200 betragen
         * 
         * - Aktuelle Zeichen + CR + TAB-Einzug
         */

        einzug_anzahl++;

        if ( einzug_anzahl === 201 )
        {
          einzug_anzahl = 200;
        }

        knz_in_string = false;

        string_json_formatiert += akt_zeichen;

        string_json_formatiert += '\n';

        string_json_formatiert += this.getStringXmal( string_einzug_json, einzug_anzahl );

        break;

      case '}' :
      case ']' :

        /* 
         * Schliessende Klammern
         * 
         * - beendet einen String
         * - vermindert die Tab-Einzugsanzahl
         * - die Einzugsanzahl darf nicht negativ werden
         * 
         * - CR + TAB-Einzug + Aktuelle Zeichen
         */

        einzug_anzahl--;

        if ( einzug_anzahl === -1 )
        {
          einzug_anzahl = 0;
        }

        knz_in_string = false;

        string_json_formatiert += '\n';

        string_json_formatiert += this.getStringXmal( string_einzug_json, einzug_anzahl );

        string_json_formatiert += akt_zeichen;

        break;

      case ',' :

        /* 
         * Komma
         * 
         * - das Zeichen wird in die aktuelle Zeile uebernommen
         * - ausserhalb eines Stringes beedet das Komma ein Element.
         *   Es wird ein CR und ein Tab-Einzug hinzugefuegt.
         */

        string_json_formatiert += akt_zeichen;

        if ( knz_in_string == false )
        {
          string_json_formatiert += '\n';

          string_json_formatiert += this.getStringXmal( string_einzug_json, einzug_anzahl );
        }

        break;

      default :

        /* 
         * Zeichen ohne JSON-Sonderfunktion werden in den Ergebnisstring uebernommen
         */

        string_json_formatiert += akt_zeichen;
    }

    index_eingabe++;
  }

  /* 
   * Der Aufrufer bekommt am Funktionsende den Ergebnisstring zurueck.
   */
  return string_json_formatiert;
},



/**
 * Gibt den Aufrufer eine Stringverkettung von xMal "pString" zurueck.
 * Werden die Anzahl der Wiederholungen negativ angegeben, gibt es einen Leerstring.
 * 
 * FkString.getStringXmal( "[a-z]", 4 ) = [a-z][a-z][a-z][a-z]
 * 
 * FkString.getStringXmal( "A-",    1 ) = "A-"
 * FkString.getStringXmal( "A-",    3 ) = "A-A-A-"
 * FkString.getStringXmal( "A-",   -3 ) = ""
 * FkString.getStringXmal(   "",   10 ) = ""
 * 
 * PARAMETER: pEingabe der zu wiederholende String
 * PARAMETER: pAnzahlWiederholungen die Anzahl der Wiederholungen
 * 
 * RETURN : Eine Stringverkettung der Eingabezeichenfolge x-Mal
 */
getStringXmal : function ( pEingabe, pAnzahlWiederholungen )
{
  var ergebnis_str = "";

  var zaehler_schleife = 0;

  /*
   * Pruefung: Ist "pEingabe" gleich "undefined" ?
   * 
   * Ist der Parameter nicht geseztzt, wird "undefined" zurueckgegeben.
   */
  if ( pEingabe == undefined )
  {
    return undefined;
  }

  /* 
   * Pruefung: "pEingabe" ungleich Leerstring ?
   * 
   * Ist die Eingabe ein Leerstring, bekommt der Aufrufer gleich
   * einen Leerstring zurueck. Es muss keine Schleife ausgefuehrt
   * werden.
   */
  if ( pEingabe !== "" )
  {
    /* 
     * Der Zaehler startet bei 0
     */
    zaehler_schleife = 0;

    /* 
     * In einer While-Schleife, wird der Ergebnisstring aufgebaut.
     * Die While-Schleife laeuft solange, bis der Zaehler gleich
     * der geforderten Wiederholungsanzahl ist.
     */
    while ( zaehler_schleife < pAnzahlWiederholungen )
    {
      ergebnis_str = ergebnis_str + pEingabe;

      zaehler_schleife++;
    }
  }

  /* 
   * Am Funktionsende wird der aufgebaute Ergebnisstring zurueckgegeben.
   */
  return ergebnis_str;
}




}
