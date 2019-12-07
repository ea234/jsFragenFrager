  
var fkTestErstellungFragenkatalog = {

  /* 
   * ################################################################################
   */
  getTestFragenKatalog : function()
  {
    var test_fragen_katalog = new clsFragenKatalog();

    var aktuelle_frage = null;

    test_fragen_katalog.setDateiName( "TestFragenkatalog1.xls" );

    var fragen_nr = 0;

    var fragen_anzahl = 2;

    var fragen_zaehler = 1;

    while ( fragen_zaehler <= fragen_anzahl )
    {
      aktuelle_frage = new clsFrage();

      aktuelle_frage.setId( "ID1_" + fragen_zaehler + "_" + fragen_nr );
      
      aktuelle_frage.setNummer( "" + fragen_nr );

      aktuelle_frage.setText1( "Fragenblock 1 Nr. " + fragen_zaehler + " von " + fragen_anzahl );

      aktuelle_frage.setAntwortA( fkTestErstellungFragenkatalog.getTestAntwort( true,               1, fragen_zaehler === 1,  "A" ) );
      aktuelle_frage.setAntwortB( fkTestErstellungFragenkatalog.getTestAntwort( true,               2, false, "B" ) );
      aktuelle_frage.setAntwortC( fkTestErstellungFragenkatalog.getTestAntwort( true,               3, false, "C" ) );
      aktuelle_frage.setAntwortD( fkTestErstellungFragenkatalog.getTestAntwort( true,               4, false, "D" ) );
      aktuelle_frage.setAntwortE( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler > 1, 5, fragen_zaehler === 2, "E" ) );
      aktuelle_frage.setAntwortF( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler > 1, 6, false, "F" ) );
      aktuelle_frage.setAntwortG( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler > 1, 7, false, "G" ) );
      aktuelle_frage.setAntwortH( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler > 1, 8, false, "H" ) );

      aktuelle_frage.setText2( "Anzahl Antworten: " + aktuelle_frage.getAnzahlVorhandeneAntworten() + "   korrekt " + aktuelle_frage.getAnzahlKorrekteAntworten() + "   falsch " + aktuelle_frage.getAnzahlFalscheAntworten() );

      test_fragen_katalog.addFrage( aktuelle_frage );

      fragen_zaehler++;
      fragen_nr++;
    }

    fragen_anzahl = 7;

    fragen_zaehler = 1;

    while ( fragen_zaehler <= fragen_anzahl )
    {
      aktuelle_frage = new clsFrage();

      aktuelle_frage.setId( "ID2_" + fragen_zaehler + "_" + fragen_nr );

      aktuelle_frage.setNummer( "" + fragen_nr );

      aktuelle_frage.setText1( "Fragenblock 2 Nr. " + fragen_zaehler + " von " + fragen_anzahl );

      aktuelle_frage.setAntwortA( fkTestErstellungFragenkatalog.getTestAntwort( true,                1, fragen_zaehler === 1,  "A" ) );
      aktuelle_frage.setAntwortB( fkTestErstellungFragenkatalog.getTestAntwort( true,                2, false, "B" ) );
      aktuelle_frage.setAntwortC( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 2, 3, fragen_zaehler === 2, "C" ) );
      aktuelle_frage.setAntwortD( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 3, 4, fragen_zaehler === 3, "D" ) );
      aktuelle_frage.setAntwortE( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 4, 5, fragen_zaehler === 4, "E" ) );
      aktuelle_frage.setAntwortF( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 5, 6, fragen_zaehler === 5, "F" ) );
      aktuelle_frage.setAntwortG( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 6, 7, fragen_zaehler === 6, "G" ) );
      aktuelle_frage.setAntwortH( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 7, 8, fragen_zaehler === 7, "H" ) );

      aktuelle_frage.setText2( "Anzahl Antworten: " + aktuelle_frage.getAnzahlVorhandeneAntworten() + "   korrekt " + aktuelle_frage.getAnzahlKorrekteAntworten() + "   falsch " + aktuelle_frage.getAnzahlFalscheAntworten() );

      test_fragen_katalog.addFrage( aktuelle_frage );

      fragen_zaehler++;
      fragen_nr++;
    }


    fragen_anzahl = 7;

    fragen_zaehler = 1;

    while ( fragen_zaehler <= fragen_anzahl )
    {
      aktuelle_frage = new clsFrage();

      aktuelle_frage.setId( "ID2_" + fragen_zaehler + "_" + fragen_nr );

      aktuelle_frage.setNummer( "" + fragen_nr );

      aktuelle_frage.setText1( "Fragenblock 3 Nr. " + fragen_zaehler + " von " + fragen_anzahl );

      aktuelle_frage.setAntwortA( fkTestErstellungFragenkatalog.getTestAntwort( true,                1, fragen_zaehler === 7, "A" ) );
      aktuelle_frage.setAntwortB( fkTestErstellungFragenkatalog.getTestAntwort( true,                2, fragen_zaehler <= 3, "B" ) );
      aktuelle_frage.setAntwortC( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 2, 3, fragen_zaehler === 3, "C" ) );
      aktuelle_frage.setAntwortD( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 3, 4, fragen_zaehler === 5, "D" ) );
      aktuelle_frage.setAntwortE( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 4, 5, fragen_zaehler === 4, "E" ) );
      aktuelle_frage.setAntwortF( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 5, 6, fragen_zaehler === 5, "F" ) );
      aktuelle_frage.setAntwortG( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 6, 7, fragen_zaehler === 6, "G" ) );
      aktuelle_frage.setAntwortH( fkTestErstellungFragenkatalog.getTestAntwort( true,                8, fragen_zaehler === 1, "H" ) );

      aktuelle_frage.setText2( "Anzahl Antworten: " + aktuelle_frage.getAnzahlVorhandeneAntworten() + "   korrekt " + aktuelle_frage.getAnzahlKorrekteAntworten() + "   falsch " + aktuelle_frage.getAnzahlFalscheAntworten() );

      test_fragen_katalog.addFrage( aktuelle_frage );

      fragen_zaehler++;
      fragen_nr++;
    }


    fragen_anzahl = 4;

    fragen_zaehler = 1;

    while ( fragen_zaehler <= fragen_anzahl )
    {
      aktuelle_frage = new clsFrage();

      aktuelle_frage.setId( "ID2_" + fragen_zaehler + "_" + fragen_nr );

      aktuelle_frage.setNummer( "" + fragen_nr );

      aktuelle_frage.setText1( "Fragenblock 4 Nr. " + fragen_zaehler + " von " + fragen_anzahl );

      aktuelle_frage.setAntwortA( fkTestErstellungFragenkatalog.getTestAntwort( true,                1, fragen_zaehler === 1, "A" ) );
      aktuelle_frage.setAntwortB( fkTestErstellungFragenkatalog.getTestAntwort( true,                2, fragen_zaehler === 2, "B" ) );
      aktuelle_frage.setAntwortC( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 4, 3, fragen_zaehler === 4, "C" ) );
      aktuelle_frage.setAntwortD( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 3, 4, fragen_zaehler === 3, "D" ) );
      aktuelle_frage.setAntwortE( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 2, 5, fragen_zaehler === 2, "E" ) );
      aktuelle_frage.setAntwortF( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 3, 6, fragen_zaehler === 3, "F" ) );
      aktuelle_frage.setAntwortG( fkTestErstellungFragenkatalog.getTestAntwort( fragen_zaehler >= 4, 7, fragen_zaehler === 4, "G" ) );
      aktuelle_frage.setAntwortH( fkTestErstellungFragenkatalog.getTestAntwort( true,                8, fragen_zaehler === 1, "H" ) );

      aktuelle_frage.setText2( "Anzahl Antworten: " + aktuelle_frage.getAnzahlVorhandeneAntworten() + " korrekt " + aktuelle_frage.getAnzahlKorrekteAntworten() + " falsch " + aktuelle_frage.getAnzahlFalscheAntworten() );

      test_fragen_katalog.addFrage( aktuelle_frage );

      fragen_zaehler++;
      fragen_nr++;
    }


    fragen_anzahl = 2;

    fragen_zaehler = 0;

    while ( fragen_zaehler < fragen_anzahl )
    {
      aktuelle_frage = new clsFrage();

      aktuelle_frage.setId( "ID3_" + fragen_zaehler + "_" + fragen_nr );

      aktuelle_frage.setNummer( "" + fragen_nr );

      aktuelle_frage.setText1( "Fragenblock 5 Nr. " + fragen_zaehler + " von " + fragen_anzahl );

      aktuelle_frage.setAntwortA( fkTestErstellungFragenkatalog.getTestAntwort( true, 1, false, "A" ) );
      aktuelle_frage.setAntwortC( fkTestErstellungFragenkatalog.getTestAntwort( true, 3, fragen_zaehler >= 1, "C" ) );
      aktuelle_frage.setAntwortD( fkTestErstellungFragenkatalog.getTestAntwort( true, 4, fragen_zaehler < 1,  "D" ) );
      aktuelle_frage.setAntwortF( fkTestErstellungFragenkatalog.getTestAntwort( true, 6, false, "F" ) );
      aktuelle_frage.setAntwortG( fkTestErstellungFragenkatalog.getTestAntwort( true, 8, fragen_zaehler >= 2, "G" ) );

      aktuelle_frage.setText2( "Anzahl Antworten: " + aktuelle_frage.getAnzahlVorhandeneAntworten() + "   korrekt " + aktuelle_frage.getAnzahlKorrekteAntworten() + "   falsch " + aktuelle_frage.getAnzahlFalscheAntworten() );

      test_fragen_katalog.addFrage( aktuelle_frage );

      fragen_zaehler++;
      fragen_nr++;
    }

    fragen_anzahl = 2;

    fragen_zaehler = 0;

    while ( fragen_zaehler < fragen_anzahl )
    {
      aktuelle_frage = new clsFrage();

      aktuelle_frage.setId( "ID4_" + fragen_zaehler + "_" + fragen_nr );

      aktuelle_frage.setNummer( "" + fragen_nr );

      aktuelle_frage.setText1( "Fragenblock 6 Nr. " + fragen_zaehler + " von " + fragen_anzahl );

      aktuelle_frage.setAntwortA( fkTestErstellungFragenkatalog.getTestAntwort( true, 1, fragen_zaehler == 2, "A" ) );
      aktuelle_frage.setAntwortC( fkTestErstellungFragenkatalog.getTestAntwort( true, 3, fragen_zaehler == 1, "C" ) );
      aktuelle_frage.setAntwortD( fkTestErstellungFragenkatalog.getTestAntwort( true, 2, fragen_zaehler == 0,  "D" ) );

      aktuelle_frage.setText2( "Anzahl Antworten: " + aktuelle_frage.getAnzahlVorhandeneAntworten() + "   korrekt " + aktuelle_frage.getAnzahlKorrekteAntworten() + "   falsch " + aktuelle_frage.getAnzahlFalscheAntworten() );

      test_fragen_katalog.addFrage( aktuelle_frage );

      fragen_zaehler++;
      fragen_nr++;
    }

    fragen_anzahl = 2;

    fragen_zaehler = 0;

    while ( fragen_zaehler < fragen_anzahl )
    {
      aktuelle_frage = new clsFrage();

      aktuelle_frage.setId( "ID5_" + fragen_zaehler + "_" + fragen_nr );

      aktuelle_frage.setNummer( "" + fragen_nr );

      aktuelle_frage.setText1( "Fragenblock 7 Nr. " + fragen_zaehler + " von " + fragen_anzahl );

      aktuelle_frage.setAntwortA( fkTestErstellungFragenkatalog.getTestAntwort( true, 1, false, "A" ) );
      aktuelle_frage.setAntwortC( fkTestErstellungFragenkatalog.getTestAntwort( true, 3, false, "C" ) );
      aktuelle_frage.setAntwortD( fkTestErstellungFragenkatalog.getTestAntwort( true, 4, true,  "D" ) );
      aktuelle_frage.setAntwortF( fkTestErstellungFragenkatalog.getTestAntwort( true, 6, fragen_zaehler >= 1, "F" ) );
      aktuelle_frage.setAntwortG( fkTestErstellungFragenkatalog.getTestAntwort( true, 7, true,  "G" ) );
      aktuelle_frage.setAntwortH( fkTestErstellungFragenkatalog.getTestAntwort( true, 8, false, "H" ) );

      aktuelle_frage.setText2( "Anzahl Antworten: " + aktuelle_frage.getAnzahlVorhandeneAntworten() + "   korrekt " + aktuelle_frage.getAnzahlKorrekteAntworten() + "   falsch " + aktuelle_frage.getAnzahlFalscheAntworten() );

      test_fragen_katalog.addFrage( aktuelle_frage );

      fragen_zaehler++;
      fragen_nr++;
    }


    test_fragen_katalog.addFrage( fkTestErstellungFragenkatalog.getTestFrageLang() );

    return test_fragen_katalog;
  },

  /* 
   * ################################################################################
   */
  getTestFrage : function()
  {
    var aktuelle_frage = new clsFrage();

    aktuelle_frage.setId( "ID1_TESTFRAGE_1" );

    aktuelle_frage.setNummer( "12" );

    aktuelle_frage.setText1( "Fragenblock 8 Nr. 1 " );

    aktuelle_frage.setAntwortA( fkTestErstellungFragenkatalog.getTestAntwort( true, 1, false, "A" ) );
    aktuelle_frage.setAntwortB( fkTestErstellungFragenkatalog.getTestAntwort( true, 2, true, "B" ) );
    aktuelle_frage.setAntwortC( fkTestErstellungFragenkatalog.getTestAntwort( true, 3, false, "C" ) );
    aktuelle_frage.setAntwortD( fkTestErstellungFragenkatalog.getTestAntwort( true, 4, false,  "D" ) );
    aktuelle_frage.setAntwortE( fkTestErstellungFragenkatalog.getTestAntwort( true, 5, false, "E" ) );
    aktuelle_frage.setAntwortH( fkTestErstellungFragenkatalog.getTestAntwort( true, 7, true, "G" ) );
    aktuelle_frage.setAntwortG( fkTestErstellungFragenkatalog.getTestAntwort( true, 8, false, "H" ) );

    aktuelle_frage.setText2( "Anzahl Antworten: " + aktuelle_frage.getAnzahlVorhandeneAntworten() + "   korrekt " + aktuelle_frage.getAnzahlKorrekteAntworten() + "   falsch " + aktuelle_frage.getAnzahlFalscheAntworten() );

    return aktuelle_frage;
  },

  /* 
   * ################################################################################
   */
  getTestFrageLang : function()
  {
    var str_zahlen = "12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 ";

    var aktuelle_frage = new clsFrage();

    aktuelle_frage.setId( "ID1_TESTFRAGE_1" );

    aktuelle_frage.setNummer( "234" );

    aktuelle_frage.setText1( "Fragenblock 8 Nr. 1 \n\n" + str_zahlen );

    aktuelle_frage.setAntwortA( fkTestErstellungFragenkatalog.getTestAntwort( true, 1, false,  "A", str_zahlen ) );
    aktuelle_frage.setAntwortB( fkTestErstellungFragenkatalog.getTestAntwort( true, 2, true, "B", "12345 67890 \n\n12345 67890 " ) );
    aktuelle_frage.setAntwortC( fkTestErstellungFragenkatalog.getTestAntwort( true, 3, false, "C", "12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345 67890 12345" ) );
    aktuelle_frage.setAntwortD( fkTestErstellungFragenkatalog.getTestAntwort( true, 4, false, "D", str_zahlen ) );
    aktuelle_frage.setAntwortE( fkTestErstellungFragenkatalog.getTestAntwort( true, 5, false, "E", "5 67890 12345 67890 12345 678\n90 12345 67890 12345 67890 12345 67890 12345 67890 12345 678\n90 12345 67890 1234" ) );


    aktuelle_frage.setAntwortH( fkTestErstellungFragenkatalog.getTestAntwort( true, 7, true, "G", "12345 67890 \n\n                                                                                        \n\n12345 67890 " ) );


    aktuelle_frage.setText2( "Anzahl Antworten: " + aktuelle_frage.getAnzahlVorhandeneAntworten() + "   korrekt " + aktuelle_frage.getAnzahlKorrekteAntworten() + "   falsch " + aktuelle_frage.getAnzahlFalscheAntworten() );

    return aktuelle_frage;
  },

  /* 
   * ################################################################################
   */
  getTestAntwort : function( pKnzAufnahme, pNummer, pKnzKorrekt, pAntwortBez, pText )
  {

    if ( pKnzAufnahme == false )
    {
      return undefined;
    }

    var aktuelle_antwort = new clsAntwort();

    aktuelle_antwort.setAntwortBez( "" + pAntwortBez );

    aktuelle_antwort.setAntwortText( "Antwort Nr. " + pNummer + " " + pAntwortBez + ( pKnzKorrekt ? " RICHTIG " : "" ) + ( pText == undefined ? "" :  " " + pText) );

    aktuelle_antwort.setKnzKorrekt( pKnzKorrekt );

    return aktuelle_antwort;
  }
}
