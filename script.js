document.addEventListener("DOMContentLoaded", function () {
    // HTML elementlerini seç
    var image = document.getElementById("imageId");
    var button = document.getElementById("partyButton");

    // Parti zamanını kontrol etmek için bir boolean
    var partyTime = false;

    // Şu anki saati al ve sayfa ilk yüklendiğinde ilgili fonksiyonları çalıştır
    var currentHour = getHour("tr-TR");
    createHourList();
    fillSelectList();

    // Her 500 milisaniyede bir saati ve resmi güncelle
    setInterval(function () {
        getHour("tr-TR");
        updateImage();
    }, 500);

    // Saat seçimlerini yapmak için kullanılan select elementlerini seç
    var wakeUpSelect = document.getElementById("wakeUp");
    var lunchSelect = document.getElementById("lunch");
    var sleepSelect = document.getElementById("sleep");

    // Seçili saatleri al (ilk yükleme için)
    var wakeUpSelected = wakeUpSelect.options[wakeUpSelect.selectedIndex].text.split(":")[0];
    var lunchSelected = lunchSelect.options[lunchSelect.selectedIndex].text.split(":")[0];
    var sleepSelected = sleepSelect.options[sleepSelect.selectedIndex].text.split(":")[0];

    // Sayfa ilk yüklendiğinde resmi güncelle
    updateImage(); 

    // Saat seçimleri değiştiğinde resmi güncelle
    wakeUpSelect.addEventListener("change", function () {
        wakeUpSelected = wakeUpSelect.options[wakeUpSelect.selectedIndex].text.split(":")[0];
        updateImage();
    });

    lunchSelect.addEventListener("change", function () {
        lunchSelected = lunchSelect.options[lunchSelect.selectedIndex].text.split(":")[0];
        updateImage();
    });

    sleepSelect.addEventListener("change", function () {
        sleepSelected = sleepSelect.options[sleepSelect.selectedIndex].text.split(":")[0];
        updateImage();
    });

    // Resmi güncelleme fonksiyonu
    function updateImage() {
        // Şu anki saati al
        currentHour = getHour("tr-TR");
        let imageUrl = "";
    
        // Eğer parti modu aktifse, parti resmini göster
        if (partyTime) {
            imageUrl = "https://i.chzbgr.com/full/9677925120/hD85B4269/party-time";
        } else {
            // Parti modu değilse, saate göre uygun resmi göster
            const hourInt = parseInt(currentHour, 10);
            // Saat değerlerini karşılaştır ve uygun resmi seç
            if (hourInt === parseInt(wakeUpSelected, 10)) {
                imageUrl = "https://i.chzbgr.com/full/8796232448/h3CB75653/morning-people-are-so-annoyingly-optimistic";
            } else if (hourInt === parseInt(lunchSelected, 10)) {
                imageUrl = "https://media.makeameme.org/created/its-time-for-aed18fee6f.jpg";
            } else if (hourInt === parseInt(sleepSelected, 10)) {
                imageUrl = "https://i.pinimg.com/736x/ec/79/a9/ec79a9cfbda11d637427b00996e09047.jpg";
            } else if (hourInt > 0 && hourInt < 12) {
                imageUrl = "https://live.staticflickr.com/3682/9882861106_3651f2f63f.jpg";
            } else if (hourInt >= 18 && hourInt <= 24) {
                imageUrl = "https://media.makeameme.org/created/good-evening-f5078decb2.jpg";
            } else {
                imageUrl = "https://i.pinimg.com/736x/bc/ff/41/bcff41a5c3b280766f28fdc1a19e81e1.jpg";
            }
        }
    
        // Seçilen resmi sayfada göster
        image.src = imageUrl;
    }
    
    // Butona tıklandığında parti modunu değiştir ve metni/görünümü güncelle
    button.addEventListener("click", function () {
        partyTime = !partyTime;
        updateImage();
        updateButton();
    });

    // Butonun metni ve rengini güncelleme fonksiyonu
    function updateButton() {
        // Eğer parti modu aktifse, butonun metni ve rengini değiştir
        if (partyTime) {
            button.innerText = "Party Overr!";
            button.style.backgroundColor = "red";
        } else {
            // Parti modu değilse, butonun metni ve rengini değiştir
            button.innerText = "Party Time!";
            button.style.backgroundColor = "black";
        }
    }

    // Şu anki saati al ve ekranda gösterme fonksiyonu
    function getHour(ulkeKodu) {
        var hourFull = new Date().toLocaleTimeString(ulkeKodu, { hour: 'numeric', minute: 'numeric', second: 'numeric' });
        document.getElementById("saatId").innerHTML = hourFull;
        var hourSplit = hourFull.split(":")[0];
        return hourSplit;
    }

    // Saat listesini oluşturma fonksiyonu
    function createHourList() {
        var originHourList = [];
        for (let i = 1; i <= 24; i++) {
            if (i === 24) {
                i = 00;
            }
            var currentHourCreate = (i < 10) ? "0" + i : i;
            var nextHourCreate = (i % 24 + 1 < 10) ? "0" + (i % 24 + 1) : (i % 24 + 1);

            if (i === 00) {
                originHourList.push(`${currentHourCreate}:00 - 01:00`);
                break;
            }
            originHourList.push(`${currentHourCreate}:00 - ${nextHourCreate}:00`);
        }
        return originHourList;
    }

    // Saat seçim listelerini doldurma fonksiyonu
    function fillSelectList() {
        var selectList = ["wakeUp", "lunch", "sleep"];
        var hoursPerDay = 24;
        var wakeUpTimeList = [8, 12, 17];

        for (let a = 0; a < selectList.length; a++) {
            var hourList = createHourList();
            var select = document.getElementById(selectList[a]);
            var wakeUpTime = wakeUpTimeList[a];

            for (let b = 0; b < hoursPerDay; b++) {
                var option = document.createElement("option");
                option.text = hourList[b];
                option.selected = (b === wakeUpTime) ? true : false;
                select.appendChild(option);
            }
        }
    }
});
