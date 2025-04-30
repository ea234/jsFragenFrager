
function clsExportJSonFrageBogen() {
    this.EXPORT_LERN_FABRIK_ALLES = 1;
    this.EXPORT_LERN_FABRIK_KORREKT = 2;
    this.EXPORT_LERN_FABRIK_FALSCH = 3;

    this.KNZ_LOESUNGSBOGEN_VERSON_1 = false;
    this.KNZ_SET_TRENNZEILE = true;

    this.MINDEST_ZEILEN_LOESUNGSBOGEN = 10;
    this.VORGABE_ANZ_STELLEN = 74;
    this.ANZ_STELLEN_FRAGENNR = 8;
    this.ANZ_STELLEN_ANTWORTBEZEICHNUNG = 8;
    this.LEERZEICHEN = " ";
    this.NEW_LINE = "\n";
    this.STR_TRENN_STRING = " - ";
    this.ALTERNATIVE_ANTWORT_BEZEICHNUNG = "#)";
    this.ABSTAND_FBEZ_ANTWORT = " ";
    this.ABSTAND_FNR_FRAGE = " ";
    this.VORGABE_KORREKT_MARKIERUNG = "**";

    this.LOESUNGSBOGEN_ANTWORT_A = "A";
    this.LOESUNGSBOGEN_ANTWORT_B = "B";
    this.LOESUNGSBOGEN_ANTWORT_C = "C";
    this.LOESUNGSBOGEN_ANTWORT_D = "D";
    this.LOESUNGSBOGEN_ANTWORT_E = "E";
    this.LOESUNGSBOGEN_ANTWORT_F = "F";
    this.LOESUNGSBOGEN_ANTWORT_G = "G";
    this.LOESUNGSBOGEN_ANTWORT_H = "H";

    this.m_loesungsbogen_antwort_a = "";
    this.m_loesungsbogen_antwort_b = "";
    this.m_loesungsbogen_antwort_c = "";
    this.m_loesungsbogen_antwort_d = "";
    this.m_loesungsbogen_antwort_e = "";
    this.m_loesungsbogen_antwort_f = "";
    this.m_loesungsbogen_antwort_g = "";
    this.m_loesungsbogen_antwort_h = "";

    this.m_knz_loesungsbogen_version_1 = false;

    this.m_max_anzahl_vorhandene_antworten = 0;
    this.m_max_anzahl_korrekte_antworten = 0;

    this.m_einzug_frage = undefined;
    this.m_einzug_antwort = undefined;

    this.knz_use_lfd_nr = false;

    this.textFile = null;

    this.str_trennzeile_fragen = "--------------------------------------------------------------------------------------------------------------";
}


/** 
 * Initialisierung der internen Variablen
 */
clsExportJSonFrageBogen.prototype.initLoesungsbogenVar = function (pKnzLoesungsbogenVersion1, pFragenKatalog) {
    this.m_knz_loesungsbogen_version_1 = pKnzLoesungsbogenVersion1;

    if (this.m_knz_loesungsbogen_version_1) {
        this.m_loesungsbogen_antwort_a = this.LOESUNGSBOGEN_ANTWORT_A;
        this.m_loesungsbogen_antwort_b = this.LOESUNGSBOGEN_ANTWORT_B;
        this.m_loesungsbogen_antwort_c = this.LOESUNGSBOGEN_ANTWORT_C;
        this.m_loesungsbogen_antwort_d = this.LOESUNGSBOGEN_ANTWORT_D;
        this.m_loesungsbogen_antwort_e = this.LOESUNGSBOGEN_ANTWORT_E;
        this.m_loesungsbogen_antwort_f = this.LOESUNGSBOGEN_ANTWORT_F;
        this.m_loesungsbogen_antwort_g = this.LOESUNGSBOGEN_ANTWORT_G;
        this.m_loesungsbogen_antwort_h = this.LOESUNGSBOGEN_ANTWORT_H;
    }
    else {
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
    this.m_max_anzahl_korrekte_antworten = pFragenKatalog.getAnzahlMaxKorrekteAntworten();

    if (pFragenKatalog.getAnzahlFragen() < 1000) {
        this.ANZ_STELLEN_FRAGENNR = 7;
    }
    else {
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

    this.m_einzug_frage = fkString.right("                                                  ", this.ANZ_STELLEN_FRAGENNR) + this.ABSTAND_FNR_FRAGE;
    this.m_einzug_antwort = fkString.right("                                                  ", this.ANZ_STELLEN_ANTWORTBEZEICHNUNG) + this.ABSTAND_FBEZ_ANTWORT;
}


/**
 * Zeigt den uebergebenen Text in einem neuem Browserfenster an.
 * 
 * @param pText der anzuzeigende Text
 */
clsExportJSonFrageBogen.prototype.showExportErgebnisInNewWindow = function (pText) {
    var new_window_inst = window.open("", "idNewWindow", "width=600,height=600,scrollbars=1,resizable=1")

    var new_window_html = "<html><head></head><body><pre>" + pText + "</pre></body></html>"

    new_window_inst.document.open();

    new_window_inst.document.write(new_window_html);

    new_window_inst.document.close();

    new_window_inst = undefined;
}


clsExportJSonFrageBogen.prototype.makeTextFile = function (pText)

// https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
{
    var text_to_write = pText; // document.getElementById("inputTextToSave").value;

    var text_file_as_blob = new Blob([text_to_write], { type: 'text/plain' });

    var text_datei_name = "DateiName.txt"; //  document.getElementById("inputtext_datei_name").value;

    var dom_download_link = document.createElement("a");

    dom_download_link.download = text_datei_name;

    dom_download_link.innerHTML = "Download File";

    if (window.webkitURL != null) 
    {
        /*
         * Chrome allows the link to be clicked
         * without actually adding it to the DOM.
         */
        dom_download_link.href = window.webkitURL.createObjectURL(text_file_as_blob);
    }
    else 
    {
        /*
         * Firefox requires the link to be added to the DOM
         * before it can be clicked.
         */
        dom_download_link.href = window.URL.createObjectURL( text_file_as_blob) ;

        dom_download_link.onclick = destroyClickedElement;

        dom_download_link.style.display = "none";

        document.body.appendChild( dom_download_link );
    }

    dom_download_link.click();
}




/** 
 * Exportstartfunktion fuer den Export eines Fragenkataloges
 */
clsExportJSonFrageBogen.prototype.startExportFbFragenKatalog2Json = function (pFragenKatalog, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen) {
    console.log("Testg");
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
    if (pFragenKatalog == undefined) {
        return fkt_ergebnis;
    }

    /*
     * Pruefung: Sind Fragen vorhanden ?
     * 
     * Sind im Fragenkatalog keine Fragen vorhanden, wird die Funktion mit FALSE verlassen.
     */
    if (pFragenKatalog.getAnzahlFragen() === 0) {
        return fkt_ergebnis;
    }

    var datei_name = "export_x.txt";

    if (datei_name != undefined) {
        /* 
         * Aufruf der Exportfunktion fuer den Fragenkatalog
         */
        fkt_ergebnis = this.exportFragenKatalog2Json(pFragenKatalog, datei_name, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen);
    }

    return fkt_ergebnis;
}


/**
 * Exportfunktion fuer den Fragenkatalog. 
 * 
 * Erstellt den Text fuer den Export und oeffnet diesen in einem neuem Browserfenster
 */
clsExportJSonFrageBogen.prototype.exportFragenKatalog2Json = function (pFragenKatalog, pDateiName, pKnzExportiereKorrekteAntworten, pKnzExportiereFalscheAntworten, pKnzExportiereAntwortBezeichnung, pKnzExportiereFragentext, pKnzMarkiereAntwortKorrekt, pKnzErstelleLoesungsbogen, pKnzAntwortReihenfolgeUmstellen) {
    if (pKnzErstelleLoesungsbogen == undefined) {
        pKnzErstelleLoesungsbogen = true;
    }

    if (pKnzMarkiereAntwortKorrekt == undefined) {
        pKnzMarkiereAntwortKorrekt = true;
    }

    var temp_frage = undefined;

    var string_datei_inhalt = "";

    string_datei_inhalt += "\n{";

    string_datei_inhalt += "\n" + fkString.jsonGetString("DateiName", pFragenKatalog.getDateiName()) + ",";

    string_datei_inhalt += "\n" + "\"Fragen\":[ ";

    var fkt_ergebnis = true;

    var index_fragen_katalog = 0;

    let str_komma = "";

    /*
     * While-Schleife ueber alle Fragen im Fragenkatalog.
     */
    while (index_fragen_katalog < pFragenKatalog.getAnzahlFragen()) {
        try {
            /* 
             * Frage am aktuellem Index aus dem Fragenkatalog holen.
             */
            temp_frage = pFragenKatalog.getIndex(index_fragen_katalog);

            /* 
             * Pruefung: Frage gesetzt ?
             * 
             * Ist an der aktuellen Indexpositon keine Frage vorhanden, ist das Ergebnis
             * der Funktion "getIndex" gleich "undefined". In so einem Fall wird mit dem
             * naechsten Index weiter gemacht.
             *
             * Ist eine Frage vorhanden, wird diese exportiert.
             */
            if (temp_frage != undefined) {
                string_datei_inhalt += str_komma + temp_frage.toJson();

                str_komma = ","
            }
        }
        catch (err_inst) {
            console.log(err_inst.message);

            //Console.WriteLine( "Fehler: errexportFragenKatalog2Json\n" + err_inst.Message + "\n\n" + err_inst.StackTrace );
        }

        /* 
         * Index der Fragen im Fragenkatalog um eins erhoehen und mit 
         * der naechsten Frage weitermachen.
         */
        index_fragen_katalog++;
    }

    string_datei_inhalt += "]";

    string_datei_inhalt += "}";

    /*
     * Erstellten Fragebogen in einem neuen Fenster darstellen.
     */
    this.showExportErgebnisInNewWindow(fkString.prettyPrintJSON(string_datei_inhalt));


    this.makeTextFile( fkString.prettyPrintJSON(string_datei_inhalt) )
    /*
     * Funktionsergebnis zurueckgeben
     */
    return fkt_ergebnis;
}




