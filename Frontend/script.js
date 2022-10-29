//definice místa v kterém budeme pracovat při tvorbě html a ukázek
var prostor = document.getElementById("prostor")

//ukázka pro seřazování
const ukazka_serazeni =
    ["Aplikační vrstva"
        , "Prezentační vrstva"
        , "Relační vrstva"
        , "Transportní vrstva"
        , "Síťová vrstva"
        , "Linková vrstva"
        , "Fyzická vrstva"]

//ukázka pro kartičky
const ukazka_karty =
    [["1?", "yes"]
        , ["0?", "no"]
        , ["Is it hot today?", "nope"]
        , ["Are orcs actually smart?", "hell yes"]
        , ["<img src=https://i.imgur.com/faZa8Dy.jpg width='90' height='90'></img>", "ZČU"]]

//ukázka pro kvíz
const ukazka_kviz =
    [["Jaké je hlavní město Prahy?", "Plzeň", "Olomouc", "Praha", "Praha není stát", "Praha není stát"]
        , ["Jaké je hlavní město České Republiky?", "Plzeň", "Olomouc", "Praha", "Mysleli jste Československo?", "Praha"]
        , ["Jaké je hlavní město Spojených Států Amerických?", "New York", "York", "Washington D.C.", "USA nemá hlavní město", "Washington D.C."]
        , ["Jaké je hlavní město Ameriky?", "Amerika je kontinent", "New York", "Washington D.C.", "York", "Amerika je kontinent"]]

//ukázka pro osu
const ukazka_osa =
    [["1234", "rok kanonizace papeže Říhy"]
        , ["1355", "nevím co se tento rok stalo, ale určitě byl zajímavý"]
        , ["1416", "co já vím co sem dát, třeba někomu umřela babička"]
        , ["1989", "je nutno abych řekl co se stalo v tomto roce?"]]

//--------------------------------------------------------------------------------------------------------------------------------------------------------
//class pro seřazování

class Xserazeni {
    //helper je zde jako přechod mezi kreslením a vykreslením html struktury
    helper = "";
    //controller je dělaný pro kontrolu správnosti řešení
    controller = [];
    //pro přehazování prvků
    switcher = [];
    constructor(polozka = []) {
        this.polozka = polozka;

    }
    //metoda vytvořená pro tvorbu html struktury
    htmlcreation() {
        this.helper = ""
        this.submenu();
        this.mixer();
        this.list();
        this.sorter();
        prostor.innerHTML = this.helper

    }
    //míchání
    mixer() {
        let m = this.polozka.length, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            [this.polozka[m], this.polozka[i]] = [this.polozka[i], this.polozka[m]];
        }
    }

    //hlavní menu hry kde máme tlačítko pro Editování, Demo, Start, Kontrolu a přečištění
    submenu() {
        this.helper +=
            "<button class='submenu' onclick='sera.edit()'>Edit</button>"
            + "<button class='submenu' onclick='sera.ukazka_serazeni()'>Demo</button>"
            + "<button class='submenu' onclick='sera.htmlcreation()'>Run</button>"
            + "<button class='submenu' onclick='sera.check()'>Check</button>"
            + "<button class='submenu' onclick='sera.deleter()'>Clear</button>"
            + "<br>";
    }
    //vykreslení jednotlivých položek k seřazení
    list() {
        for (let i = 0; i < this.polozka.length; i++) {
            this.helper += "<button class='serazovacka' onclick=sera.change(" + i + ")>" + this.polozka[i].text + "</button>";
        }
    }
    //vykreslí demo hry, veme z ukazky její prvky a postupně je přidá do položek a do controlleru, pak zavolá tvorbu html aby se html překreslilo
    ukazka_serazeni() {
        clears()
        this.helper = ""
        for (let i = 0; i < ukazka_serazeni.length; i++) {
            this.polozka.push(new Xpolozka(ukazka_serazeni[i]))
            this.controller.push(new Xkontrola(ukazka_serazeni[i], (i+1)))
        }
        this.htmlcreation()
    }


    //zamění text dvou položek pokud byli vybrány dvě, pokud ne, přidá číslo položky kterou jsme klikli jako první do switcheru a bude si ho pamatovat než klikneme na druhou
    change(j) {
        if (this.switcher.length < 1) {
            this.switcher.push(j)
        }
        else {
            let a = this.polozka[this.switcher[0]].text
            let b = this.polozka[j].text
            this.polozka[j].text = a
            this.polozka[this.switcher[0]].text = b
            this.helper = ""
            this.submenu();
            this.list();
            prostor.innerHTML = this.helper
            this.switcher = []

        }

    }
    //vykreslí editační html kde si můžeme vytvořit vlastní aktivitu
    edit() {
        this.helper = "";
        this.submenu();
        this.helper +=
            "<input class='inputer' id='input3' placeholder='Text pro seřazení'></input>"
            + "<br>"
            + "<input class='inputer' id='poradnik' placeholder='pořadí položky'></input>"
            + "<br>"
            + "<button onclick='sera.adder()' class='submenu'>add to cards</button>";
        prostor.innerHTML = this.helper;
    }
    //zkontroluje správnost řešení pokud je vše správně, upozorní nás to na celkovou správnost, pokud je něco špatně, vyhodnotí to co bylo špatně pomocí metody checker()
    check() {
        let breaker = true
        for (let i = 0; i < this.polozka.length; i++) {
            if (this.controller[i].texten == this.polozka[i].text) { }
            else { breaker = false }
        }
        if (breaker == true) {
            this.helper = "";
            this.submenu();
            this.checker();
            prostor.innerHTML = this.helper;
            setTimeout(() => {
                alert("Skvělé, řešení je zcela správně!!!")
            }, 300);
        }
        if (breaker == false) {
            this.helper = "";
            this.submenu();
            this.checker();
            prostor.innerHTML = this.helper;
        }

    }
    //kontroluje které položky byli seřazený správně a které špatně a pak jim změní CSS class podle toho.
    checker() {
        for (let i = 0; i < this.polozka.length; i++) {
            if (this.controller[i].texten == this.polozka[i].text) { this.helper += "<button class='serazovackaspravne' onclick=sera.change(" + i + ")>" + this.polozka[i].text + "</button>"; }
            if (this.controller[i].texten != this.polozka[i].text) { this.helper += "<button class='serazovackaspatne' onclick=sera.change(" + i + ")>" + this.polozka[i].text + "</button>"; }
        }

    }
    //pročistí data momentální aktivity
    deleter() {
        this.polozka = [];
        this.controller = [];
        this.switcher = [];
        this.helper = "";
        this.htmlcreation();
    }
    //pro přidání vlastních položek
    adder() {
        let prechodnik = document.getElementById("input3").value
        let poradnik = document.getElementById("poradnik").value
        if(!isNaN(poradnik)){
        this.polozka.push(new Xpolozka(prechodnik))
        this.controller.push(new Xkontrola(prechodnik, poradnik))}
        else{
            alert("Do pořadí prosím zadejte číslo")
        }
    }
    //uspořádá položky v controlleru podle toho, jaké mají číslo v pořadníku
    sorter() {
        var len = this.controller.length
            , i, j, stop;
        for (i = 0; i < len; i++) {
            for (j = 0, stop = len - i - 1; j < stop; j++) {
                if (Number(this.controller[j].poradi) > Number(this.controller[j + 1].poradi)) {
                    var temp = this.controller[j];
                    this.controller[j] = this.controller[j + 1];
                    this.controller[j + 1] = temp;
                }

            }
        } return this.controller;
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//class pro časovou osu

class Xosa {
    //helper je zde jako přechod mezi kreslením a vykreslením html struktury
    helper = ""
    constructor(content = []) {
        this.content = content

    }
     //metoda vytvořená pro inicializaci tvorby html struktury a pro konečné vykreslení
    htmlcreation() {
        this.helper = ""
        this.submenu();
        if (this.content.length) {
            this.vykresleniosy();
        }
        prostor.innerHTML = this.helper;
    }
    //hlavní menu hry kde máme tlačítko pro Editování, Demo, Start a přečištění
    submenu() {
        this.helper +=
            "<button class='submenu' onclick='sosa.edit()'>Edit</button>"
            + "<button class='submenu' onclick='sosa.ukazka_serazeni()'>Demo</button>"
            + "<button class='submenu' onclick='sosa.htmlcreation()'>Run</button>"
            + "<button class='submenu' onclick='sosa.deleter()'>Clear</button>"
            + "<br><br><br>"
    }
    //metoda která vykreslí osu a prvky na ní
    vykresleniosy() {
        this.sorter();
        this.helper +=
            "<p class='divided'>"
            + "<span class='divider'></span>"
        for (let i = 0; i < this.content.length; i++) {
            this.helper +=
                "<span class='content' onclick='sosa.explanation(" + i + ")'>" + this.content[i].text_osa + "</span>"
                + "<span class='divider'></span>"
        }
        this.helper += "</p>"
    }
    //metoda která uspořádá prvky které přidal uživatel od nejmenšího po největší podle letopočtu
    sorter() {
        var len = this.content.length
            , i, j, stop;
        for (i = 0; i < len; i++) {
            for (j = 0, stop = len - i - 1; j < stop; j++) {
                if (Number(this.content[j].text_osa) > Number(this.content[j + 1].text_osa)) {
                    var temp = this.content[j];
                    this.content[j] = this.content[j + 1];
                    this.content[j + 1] = temp;
                }

            }
        } return this.content;
    }


       //vykreslí demo hry, veme z ukazky její prvky a postupně je přidá do contentu, pak zavolá tvorbu html aby se html překreslilo 
    ukazka_serazeni() {
        this.content = []
        for (let i = 0; i < ukazka_osa.length; i++) {
            this.content.push(new Polozka_Osy(ukazka_osa[i][0], ukazka_osa[i][1]))
        }
        this.htmlcreation();
    }
    //přidá do contentu položky které mu uživatel zadá
    adder() {
        let prechodnik1 = "";
        let prechodnik2 = "";
        var rocnik = document.getElementById("rocnik");
        var rocnikinfo = document.getElementById("inforocniku");
        var obrazeks2 = document.getElementById("obrazek4");
        prechodnik1 = rocnik.value
        prechodnik2 = rocnikinfo.value
        if (obrazeks2.checked) { prechodnik2 = "<img src=" + rocnikinfo.value + " width='90' height='90'></img>" }
        if (isNaN(prechodnik1)) {
            alert("prosím zadejte do prvního políčka číslo")
        }
        else {
            this.content.push(new Polozka_Osy(prechodnik1, prechodnik2))
        }
    }
    //pročistí tento objekt
    deleter() {
        this.content = [];
        this.helper = ""
        this.htmlcreation();
    }
    //vykreslí HTML pro vysvětlení k danému letopočtu
    explanation(i) {
        this.helper = ""
        this.submenu();
        this.vykresleniosy();
        this.shower(i);
        prostor.innerHTML = this.helper;
    }
    //vytvoří přímo kartičku vysvětlení
    shower(i) {
        this.helper +=
            "<br><br><br><br>"
            + "<p class='explanation'>" + this.content[i].info + "</p>"

    }
    //vytvoří editační menu aby uživatel mohl přidat vlastní letopočet apd.
    edit() {
        this.helper = ""
        this.submenu();
        this.helper +=
            "<input class='inputer' id='rocnik' placeholder='rok zobrazený na ose'></input>"
            + "<br>"
            + "<input class='inputer' id='inforocniku' placeholder='informace k danému roku'></input>"
            + "<input class='checkboxer' id='obrazek4' type='checkbox' value='checked'>Zaškrtněte pokud jde o odkaz na obrázek</input>"
            + "<br>"
            + "<button onclick='sosa.adder()' class='submenu'>add to cards</button>"
        prostor.innerHTML = this.helper
    }
}


//-----------------------------------------------------------------------------------------------
//class pro kartičky

class Xflashcards {
    //helper je zde jako přechod mezi kreslením a vykreslením html struktury
    helper = ""
    i = 0
    clickable = true
    constructor(karticka = []) {
        this.karticka = karticka

    }
     //metoda vytvořená pro tvorbu html struktury
    htmlcreation() {
        this.helper = ""
        this.clickable = true
        this.submenu();
        this.vykreslenikarty();
        prostor.innerHTML = this.helper;

    }
    //hlavní menu hry kde máme tlačítko pro Editování, Demo, Start a přečištění
    submenu() {
        this.helper +=
            "<button class='submenu' onclick='scard.edit()'>Edit</button>"
            + "<button class='submenu' onclick='scard.ukazka_serazeni()'>Demo</button>"
            + "<button class='submenu' onclick='scard.htmlcreation()'>Run</button>"
            + "<button class='submenu' onclick='scard.deleter()'>Clear</button>"
            + "<br>"
    }
    edit() {
        this.helper = ""
        this.submenu();
        this.helper +=
            "<input class='inputer' id='input1' placeholder='otázka'></input>"
            + "<input id='obrazek1' class='checkboxer' type='checkbox' value='checked'>Zaškrtněte pokud jde o odkaz na obrázek</input>"
            + "<br>"
            + "<input class='inputer' id='input2' placeholder='odpověď'></input>"
            + "<input class='checkboxer' id='obrazek2' type='checkbox' value='checked'>Zaškrtněte pokud jde o odkaz na obrázek</input>"
            + "<br>"
            + "<button onclick='scard.adder()' class='submenu'>add to cards</button>"
        prostor.innerHTML = this.helper
    }
    vykreslenikarty() {
        if (this.karticka.length) {
            this.helper += "<p class='karticka' id='kartsis' onclick='scard.odpoved()'>" + this.karticka[this.i].otazka + "</p>" + "<br>"
        }
    }

    odpoved() {
        if (this.clickable === true) {
            this.clickable = false
            document.getElementById("kartsis").className = 'kartickapotom'
            setTimeout(() => {
                document.getElementById("kartsis").innerHTML = ""
            }, 300);
            setTimeout(() => {
                document.getElementById("kartsis").innerHTML = this.karticka[this.i].odpoved
                if (this.i < this.karticka.length - 1) { this.i++ }
                else { this.i = 0 }
            }, 1000);
            setTimeout(function () {
                scard.htmlcreation();

            }, 4000);
        }
    }
    ukazka_serazeni() {
        this.karticka = [];

        for (let i = 0; i < ukazka_karty.length; i++) {
            this.karticka.push(new Xflashkarticka(ukazka_karty[i][0], ukazka_karty[i][1]));
        }
        this.htmlcreation();

    }
    adder() {
        let prechodnik1 = "";
        let prechodnik2 = "";
        var Input1 = document.getElementById("input1");
        var Input2 = document.getElementById("input2");
        var Output1 = document.getElementById("obrazek1");
        var Output2 = document.getElementById("obrazek2");
        prechodnik1 = Input1.value
        prechodnik2 = Input2.value
        if (Output1.checked) { prechodnik1 = "<img src=" + Input1.value + " width='90' height='90'></img>" }
        if (Output2.checked) { prechodnik2 = "<img src=" + Input2.value + " width='90' height='90'></img>" }
        this.karticka.push(new Xflashkarticka(prechodnik1, prechodnik2));
    }
    deleter() {
        this.karticka = [];
        this.helper = ""
        this.htmlcreation();
    }

}


//------------------------------------------------------------------------------------------------
//class pro kvíz

class Xkviz {
    //helpen je zde jako přechod mezi kreslením a vykreslením html struktury
    helpen = ""
    index = 0;
    spravna = []

    constructor(otazkys = []) {
        this.otazkys = otazkys
    }
     //metoda vytvořená pro tvorbu html struktury
    htmlcreation() {
        this.helpen = ""
        this.submenu();
        if (this.otazkys.length) {
            this.vykresleniotazky();
        }
        prostor.innerHTML = this.helpen

    }
    //hlavní menu hry kde máme tlačítko pro Editování, Demo, Start a přečištění
    submenu() {
        this.helpen +=
            "<button class='submenu' onclick='skviz.edit()'>Edit</button>"
            + "<button class='submenu' onclick='skviz.ukazka_serazeni()'>Demo</button>"
            + "<button class='submenu' onclick='skviz.htmlcreation()'>Run</button>"
            + "<button class='submenu' onclick='skviz.deleter()'>Clear</button>"
            + "<br>"
    }

    vykresleniotazky() {
        this.helpen +=
            "<p class='otazka'>" + this.otazkys[this.index].otazka + "</p>"
            + "<br>"
            + "<button class='odpoved' onclick=skviz.vyhodnotitOtazku(" + 1 + ")>" + this.otazkys[this.index].odpoved1 + "</button>"
            + "<button class='odpoved' onclick=skviz.vyhodnotitOtazku(" + 2 + ")>" + this.otazkys[this.index].odpoved2 + "</button>"
            + "<button class='odpoved' onclick=skviz.vyhodnotitOtazku(" + 3 + ")>" + this.otazkys[this.index].odpoved3 + "</button>"
            + "<button class='odpoved' onclick=skviz.vyhodnotitOtazku(" + 4 + ")>" + this.otazkys[this.index].odpoved4 + "</button>"
    }


    vyhodnotitOtazku(k) {
        switch (k) {
            case 1:
                k = this.otazkys[this.index].odpoved1;
                break;
            case 2:
                k = this.otazkys[this.index].odpoved2;
                break;
            case 3:
                k = this.otazkys[this.index].odpoved3;
                break;
            case 4:
                k = this.otazkys[this.index].odpoved4;
                break;
        }


        if (k == this.otazkys[this.index].spravnaodpoved) {

            alert("Správně!");
            this.spravna.push(this.index)
            this.index++
            this.controla()
        }
        else {
            alert("Tato odpoved je špatně, správně bylo: " + this.otazkys[this.index].spravnaodpoved);
            this.index++
            this.controla()
        }
    }

    vykreslitCelkoveVyhodnoceni() {
        if (prostor) {
            prostor.innerHTML = ""
            this.index = 0
            this.helpen = ""
            this.submenu();
            let innerHtml = "";
            innerHtml += "<p>Zodpovedeli jste všechny otázky!</p>";
            innerHtml += "<p>Vaše výsledky jsou: </p>";

            let pocetSpravne = this.spravna.length;

            let znamka = pocetSpravne / this.otazkys.length * 100;

            innerHtml += "<ul>";
            innerHtml += "<li>";
            innerHtml += "Počet správných odpovědí: " + pocetSpravne;
            innerHtml += "</li>";
            innerHtml += "<li>";
            innerHtml += "Počet špatných odpovědí: " + (this.otazkys.length - pocetSpravne);
            innerHtml += "</li>";
            innerHtml += "<li>";
            innerHtml += "🖋 Vaše známka: " + znamka + "%";
            innerHtml += "</li>";
            innerHtml += "</ul>";
            prostor.innerHTML += this.helpen;
            prostor.innerHTML += innerHtml;


        } else {
            console.error("Na stránce neexistuje místo pro kvíz.");
        }
    }

    ukazka_serazeni() {
        this.otazkys = []
        this.index = 0
        this.spravna = []
        for (let i = 0; i < ukazka_kviz.length; i++) {
            this.otazkys.push(new Otazka_Kviz(ukazka_kviz[i][0], ukazka_kviz[i][1], ukazka_kviz[i][2], ukazka_kviz[i][3], ukazka_kviz[i][4], ukazka_kviz[i][5]))

        }
        this.htmlcreation();

    }
    deleter() {
        this.otazkys = [];
        this.helpen = ""
        this.htmlcreation();
        this.index = 0
    }
    edit() {
        this.helpen = ""
        this.submenu();
        this.helpen +=
            "<input class='inputer' id='otazka1' placeholder='otázka'>Sem zadejte otázku</input>"
            + "<br>"
            + "<input class='inputer' id='odpovidac1' placeholder='odpověď 1'></input>"
            + "<input class='checkboxer' id='spravnous1' type='checkbox' value='checked'>Zaškrtněte pokud jde o správnou odpověď</input>"
            + "<br>"
            + "<input class='inputer' id='odpovidac2' placeholder='odpověď 2'></input>"
            + "<input class='checkboxer' id='spravnous2' type='checkbox' value='checked'>Zaškrtněte pokud jde o správnou odpověď</input>"
            + "<br>"
            + "<input class='inputer' id='odpovidac3' placeholder='odpověď 3'></input>"
            + "<input class='checkboxer' id='spravnous3' type='checkbox' value='checked'>Zaškrtněte pokud jde o správnou odpověď</input>"
            + "<br>"
            + "<input class='inputer' id='odpovidac4' placeholder='odpověď 4'></input>"
            + "<input class='checkboxer' id='spravnous4' type='checkbox' value='checked'>Zaškrtněte pokud jde o správnou odpověď</input>"
            + "<br>"
            + "<button onclick='skviz.adder()' class='submenu'>add to cards</button>"
        prostor.innerHTML = this.helpen

    }
    adder() {
        let numero = 0
        var spravnous1 = document.getElementById("spravnous1");
        var spravnous2 = document.getElementById("spravnous2");
        var spravnous3 = document.getElementById("spravnous3");
        var spravnous4 = document.getElementById("spravnous4");
        if (spravnous1.checked) { numero++ }
        if (spravnous2.checked) { numero++ }
        if (spravnous3.checked) { numero++ }
        if (spravnous4.checked) { numero++ }
        if (numero == 1) {
            let prechodnik1 = document.getElementById("otazka1").value;
            let prechodnik2 = document.getElementById("odpovidac1").value;
            let prechodnik3 = document.getElementById("odpovidac2").value;
            let prechodnik4 = document.getElementById("odpovidac3").value;
            let prechodnik5 = document.getElementById("odpovidac4").value;
            let prechodnik6 = "";
            if (spravnous1.checked) { prechodnik6 = prechodnik2 }
            if (spravnous2.checked) { prechodnik6 = prechodnik3 }
            if (spravnous3.checked) { prechodnik6 = prechodnik4 }
            if (spravnous4.checked) { prechodnik6 = prechodnik5 }
            this.otazkys.push(new Otazka_Kviz(prechodnik1, prechodnik2, prechodnik3, prechodnik4, prechodnik5, prechodnik6));
        }
        else { alert("Prosím zaškrtněte právě jednu správnou odpověď!") }
    }
    controla() {
        if (this.index < this.otazkys.length) {
            this.htmlcreation()
        }
        else {
            this.vykreslitCelkoveVyhodnoceni();
        }


    }

}

//-----------------------------------------------------------------------------------------------
//jednotlivé položky/kartičky do jednotlivých class

//využijeme pro tvorbu jednotlivých kartiček, každá kartička má otázku a odpověď
class Xflashkarticka {
    constructor(otazka, odpoved) {
        this.otazka = otazka
        this.odpoved = odpoved

    }



}

//Využijeme při tvorbě seřazovačky, každá položka pro seřazení má v sobě pouze text
class Xpolozka {
    constructor(text) {
        this.text = text
    }
}
//využijeme při tvorbě kontroly seřazovačky, každá položka kontroly má v sobě text který se porovnává s položkou kontroly a pořadí v kterém se mají nacházet
class Xkontrola {
    constructor(texten, poradi) {
        this.texten = texten
        this.poradi = poradi
    }
}

//využijeme při tvorbě osy, každý prvek osy má letopočet a info k němu
class Polozka_Osy {
    constructor(text_osa, info) {
        this.text_osa = text_osa
        this.info = info
    }
}
//využijeme při tvorbě kvízu, máme otázku, 4 odpovědi a správnou odpověď
class Otazka_Kviz {
    constructor(otazka, odpoved1, odpoved2, odpoved3, odpoved4, spravnaodpoved) {
        this.otazka = otazka
        this.odpoved1 = odpoved1
        this.odpoved2 = odpoved2
        this.odpoved3 = odpoved3
        this.odpoved4 = odpoved4
        this.spravnaodpoved = spravnaodpoved
    }


}


//------------------------------------------------------------------------
//vytvoření objektů

var sera = new Xserazeni();
var sosa = new Xosa();
var scard = new Xflashcards();
var skviz = new Xkviz();
//-------------------------------------------------------------------------
//funkce pro volání a čištění objektů a html

function starter(par) {
    clears();
    setTimeout(() => {
        par.htmlcreation();
    }, 200);

}

function clears() {
    prostor.innerHTML = "";
    sera.polozka = [];
    scard.karticka = [];
    skviz.otazkys = [];
    sosa.content = [];
}

//-------------------------------------------------------------------------