// Шаг 1: Выполняем скрипт на активной вкладке
const button = document.getElementById('grabBtn');
const button2 = document.getElementById('grabBtn2');
const button3 = document.getElementById('grabBtn3');


//Кнопка для Headless
button.addEventListener('click', function() {
    extractUrlParams(([gameId, accId, gameDate, brainServer]) => {
            const accIdnumber = Number(accId);

            const datePlusFive = new Date(gameDate);
            datePlusFive.setMinutes(datePlusFive.getMinutes() + 5);
            const newDatePlusFiveString = datePlusFive.toISOString();

            const dateMinusFive = new Date(gameDate);
            dateMinusFive.setMinutes(dateMinusFive.getMinutes() - 5);
            const newDateMinusFiveString = dateMinusFive.toISOString();

            // Пример использования массива: создание новой вкладки с изменённым URL
            // JackPoker
            if ((accIdnumber > 242000000 && accIdnumber < 242003691) || (accIdnumber > 242004560 && accIdnumber < 242999999))
                chrome.tabs.create({url: `https://loggia.ecoinfra.io/?q=AccountId~eq~${accId}&q=HandId~eq~${gameId}&log=&from=${newDateMinusFiveString}&to=${newDatePlusFiveString}&az=selectel-ru-9-jp&ns=jackpoker-trainer-prod2`});
            // JackPokerTest
            else if (accIdnumber >= 242003691 && accIdnumber <= 242004560)
                chrome.tabs.create({url: `https://loggia.ecoinfra.io/?q=AccountId~eq~${accId}&q=HandId~eq~${gameId}&log=&from=${newDateMinusFiveString}&to=${newDatePlusFiveString}`});
            // ClubGG
            else if (accIdnumber > 235000000 && accIdnumber < 235999999)
                chrome.tabs.create({url: `https://loggia.ecoinfra.io/?q=AccountId~eq~${accId}&q=HandId~eq~${gameId}&log=&from=${newDateMinusFiveString}&to=${newDatePlusFiveString}&az=aws-eu-central-1-eco&ns=eco-clubgg-prod`});
            // PokerMaster (HHPoker)
            else if (accIdnumber > 118000000 && accIdnumber < 118999999)
                chrome.tabs.create({url: `https://loggia.ecoinfra.io/?q=AccountId~eq~${accId}&q=HandId~eq~${gameId}&log=&from=${newDateMinusFiveString}&to=${newDatePlusFiveString}&az=aws-ap-southeast-1-eco&ns=eco-hh-prod`});
            // JackPokerClub
            else if (accIdnumber > 296000000 && accIdnumber < 296999999)
                chrome.tabs.create({url: `https://loggia.ecoinfra.io/?q=AccountId~eq~${accId}&q=HandId~eq~${gameId}&log=&from=${newDateMinusFiveString}&to=${newDatePlusFiveString}&az=aws-ap-southeast-1-eco&ns=shinji-trainer-prod`});
            else 
                chrome.tabs.create({url: `https://loggia.ecoinfra.io/?q=AccountId~eq~${accId}&q=HandId~eq~${gameId}&log=&from=${newDateMinusFiveString}&to=${newDatePlusFiveString}`});
        });
    });

// Кнопка для NEOAdviser
button2.addEventListener('click', function() {
    extractUrlParams(([gameId, accId, gameDate, brainServer]) => {

                const accIdnumber = Number(accId);
                
                const datePlusFive = new Date(gameDate);
                datePlusFive.setMinutes(datePlusFive.getMinutes() + 5);
                const newDatePlusFiveString = datePlusFive.toISOString();
                
                const dateMinusFive = new Date(gameDate);
                dateMinusFive.setMinutes(dateMinusFive.getMinutes() - 5);
                const newDateMinusFiveString = dateMinusFive.toISOString();

                // Пример использования массива: создание новой вкладки с изменённым URL
                    chrome.tabs.create({url: `https://loggia.ecoinfra.io/?az=selectel-ru-2-hint&ns=hint-nzt-trainer-prod&from=${newDateMinusFiveString}&to=${newDatePlusFiveString}&text=${gameId}`});
               
               });
        });

    
// Кнопка мозговых логов
button3.addEventListener('click', function() {
    extractUrlParams(([gameId, accId, gameDate, brainServer]) => {
        const accIdnumber = Number(accId);

        const datePlusFive = new Date(gameDate);
        datePlusFive.setMinutes(datePlusFive.getMinutes() + 5);
        const newDatePlusFiveString = datePlusFive.toISOString();
        
        const dateMinusFive = new Date(gameDate);
        dateMinusFive.setMinutes(dateMinusFive.getMinutes() - 5);
        const newDateMinusFiveString = dateMinusFive.toISOString();

        chrome.tabs.create({
                // url: `https://loggia.ecoinfra.io/?az=brains&ns=brain-platform&log=${dateGame}&q=node~eq~${brainServer}&q=component~eq~system&text=${accIdnumber}+${gameId}`
                url: `https://loggia.ecoinfra.io/?az=brains&ns=brain-platform&from=${newDateMinusFiveString}&to=${newDatePlusFiveString}&q=node~eq~${brainServer}&q=component~eq~system&text=${accIdnumber}+${gameId}`
         });
    });
  });


    // Парсинг ссылки в ХИ
    function extractUrlParams(callback) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const tabId = tabs[0].id;
            
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                func: () => {
                    const url = window.location.href;
                    const parsedUrl = new URL(url);
                    const gameId = parsedUrl.searchParams.get('gameId');
                    const accId = parsedUrl.searchParams.get('accId');
                    const gameDate = parsedUrl.searchParams.get('gameDate');
                    const brainServer = parsedUrl.searchParams.get('serverCode');
                    
                    return [gameId, accId, gameDate, brainServer];
                }
            }, (results) => {
                if (results && results[0] && results[0].result) {
                    callback(results[0].result);
                } else {
                    console.error('Failed to extract URL parameters');
                }
            });
        });
    }
