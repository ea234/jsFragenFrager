  
  function clsStringArray()
  {
    this.m_array_strings = undefined;
  }


  /**
   * @return die Vektorinstanz. Ist diese noch nicht vorhanden, wird diese erstellt.
   */
  clsStringArray.prototype.getVektor = function()
  {
    /*
     * Pruefung: Array-Instanz noch nicht erstellt ?
     */
    if ( this.m_array_strings == undefined )
    {
      /*
       * Ist die Instanz noch undefined, wird eine neue 
       * Instanz der Klasse Array erstellt und der 
       * Membervariablen zugewiesen.
       */
      this.m_array_strings = new Array();
    }

    return this.m_array_strings;
  }


  /**
   * @return die Anzahl, der im Vektor gespeicherten Elemente
   */
  clsStringArray.prototype.getAnzahlStrings = function()
  {
    /*
     * Pruefung: Ist der Vektor vorhanden ?
     * 
     * Ist der Vektor vorhanden, bekommt der Aufrufer den Wert der Funktion "length" zurueck.
     * 
     * Ist der Vektor nicht vorhanden, sind keine Elemente
     * vorhanden. Der Aufrufer bekommt 0 zurueck.
     * 
     */
    if ( this.m_array_strings != undefined )
    {
      return this.m_array_strings.length;
    }

    return 0;
  }


  /**
   * Loescht alle Elemente im Vektor und stellt die Vektorinstanz auf "undefined".
   */
  clsStringArray.prototype.clear = function()
  {
    /*
     * Pruefung: Variable "m_array_strings" ungleich undefined?
     *
     * Ist der Vektor nicht vorhanden, sind auch keine Elemente zum loeschen vorhanden
     */
    if ( this.m_array_strings != undefined )
    {
      var aktueller_index = 0;

      var frage_vector_anzahl = this.getAnzahlStrings();

      /*
       * While-Schleife ueber alle Vektor-Elemente
       */
      while ( aktueller_index < frage_vector_anzahl )
      {
        try
        {
          /*
           * Jedes Vektor-Element wird auf "undefined" gesetzt
           */
          this.m_array_strings[ aktueller_index ] = undefined;
        }
        catch ( err_inst )
        {
          //
        }

        aktueller_index++;
      }
    }

    /*
     * Am Funktionsende wird die Vektorinstanz auf "undefined" gestellt.
     */
    this.m_array_strings = undefined;
  }


  /**
   * @param pString der String, welcher dem Vektor hinzugefuegt werden soll
   */
  clsStringArray.prototype.addString = function( pString )
  {
    this.getVektor().push( pString );
  }


  /**
   * @param pIndex der abzufragende Index
   *
   * @return den gespeicherten String am Index, oder "undefined", wenn der Index nicht existiert
   */
  clsStringArray.prototype.getStringIndex = function( pIndex )
  {
    if ( ( pIndex > 0 ) && ( pIndex < this.getAnzahlStrings() ) )
    {
      return this.m_array_strings[ pIndex ];
    }

    return undefined;
  }


  /**
   * Quicksort fuer die gespeicherten Strings
   */
  clsStringArray.prototype.QuickSort = function( pIndexStart, pIndexEnde, pKnzAufsteigend )
  {
    var temp_string = "";

    var index_start = pIndexStart;
    var index_ende = pIndexEnde;

    var vergleichs_string_mitte = this.m_array_strings[ this.ConvertToInt32( ( index_start + index_ende ) * 0.5 ) ];

    while ( index_start <= index_ende )
    {
      if ( pKnzAufsteigend )
      {
        while ( this.strcmp( this.m_array_strings[ index_start ], vergleichs_string_mitte ) < 0 )
        {
          index_start++;
        }

        while ( this.strcmp( this.m_array_strings[ index_ende ], vergleichs_string_mitte ) > 0 )
        {
          index_ende--;
        }
      }
      else
      {
        while ( this.strcmp( this.m_array_strings[ index_start ], vergleichs_string_mitte ) > 0 )
        {
          index_start++;
        }

        while ( this.strcmp( this.m_array_strings[ index_ende ], vergleichs_string_mitte ) < 0 )
        {
          index_ende--;
        }
      }

      if ( index_start <= index_ende )
      {
        temp_string = this.m_array_strings[ index_start ];

        this.m_array_strings[ index_start ] = this.m_array_strings[ index_ende ];

        this.m_array_strings[ index_ende ] = temp_string;

        index_start++;

        index_ende--;
      }
    }

    if ( pIndexStart < index_ende )
    {
      this.QuickSort( pIndexStart, index_ende, pKnzAufsteigend );
    }

    if ( index_start < pIndexEnde )
    {
      this.QuickSort( index_start, pIndexEnde, pKnzAufsteigend );
    }
  }


  clsStringArray.prototype.startSortierungAufsteigend = function()
  {
    /*
     * Wichtig: Diese Stringklasse ist auf den Fragenfrager abgestimmt. 
     *          Das erste Element am Index (0) soll nicht sortiert werden.
     *          Daher beginnt die Sortierung am Index 1.
     */
    this.QuickSort( 1, this.m_array_strings.length - 1, true );
  }


  clsStringArray.prototype.ConvertToInt32 = function( pDoubleZahl )
  {
    return parseInt( pDoubleZahl, 10 );
  }


  clsStringArray.prototype.strcmp = function( pStringA, pStringB )
  {
     return ( pStringA < pStringB ? - 1 : ( pStringA > pStringB ? 1 : 0 ) );  
  }

