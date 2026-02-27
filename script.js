/**
 * STRELECKÝ KLUB BELLATOR - Rezervačný systém (KOMPLETNÁ VERZIA)
 */

let kapacity = {
    "20.2.2026": 6,
    "12.3.2026": 10
};

// --- 1. FUNKCIA PRE MOBILNÉ MENU (HAMBURGER) ---
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Zatvorenie menu po kliknutí na odkaz
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// --- 2. HLAVNÁ FUNKCIA OTVORENIA DETAILU ---
function otvoritDetail(typKurzu) {
    const modal = document.getElementById('courseModal');
    const textPanel = document.querySelector('.modal-text');
    const infoPanel = document.querySelector('.modal-info-panel');

    if (typKurzu === 'domov') {
        // --- OCHRANA OBYDLIA ---
        textPanel.innerHTML = `
            <h2 id="modalTitle">Ochrana obydlia (Home Defence)</h2>
            <img src="img/HS-home.webp" class="modal-img-small" alt="Ochrana obydlia">
            
            <div style="background: rgba(138, 154, 91, 0.1); border: 1px solid var(--army-olive); padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                <h3 style="margin: 0; color: var(--army-olive); letter-spacing: 1px;"><i class="fas fa-calendar-plus"></i> NOVÉ TERMÍNY PRIPRAVUJEME</h3>
                <p style="color: #ccc; font-size: 0.9rem; margin-top: 5px;">Aktuálne zostavujeme harmonogram výcvikov na nadchádzajúce obdobie.</p>
            </div>

            <h4><i class="fas fa-bullseye"></i> CIEĽOM KURZU JE:</h4>
            <ul>
                <li>zvýšiť bezpečnostné povedomie jednotlivca v prostredí vlastného obydlia,</li>
                <li>naučiť účastníkov bezpečne a zákonne reagovať na hrozbu v obydlí,</li>
                <li>zdokonaliť manipuláciu so zbraňou v stresovom prostredí.</li>
            </ul>

            <h4><i class="fas fa-book"></i> OBSAH KURZU:</h4>
            <div class="obsah-sekcia"><i class="fas fa-gavel"></i> <div><strong>1. Teoretická časť:</strong> Právny rámec, nutná obrana.</div></div>
            <div class="obsah-sekcia"><i class="fas fa-map-signs"></i> <div><strong>2. Taktická príprava:</strong> Pohyb v priestore, práca s krytom.</div></div>
            <div class="obsah-sekcia"><i class="fas fa-crosshairs"></i> <div><strong>3. Strelecká časť:</strong> Manipulácia v interiéri.</div></div>
        `;

        infoPanel.innerHTML = `
            <div class="info-box-modern">
                <i class="fas fa-location-dot"></i>
                <span><strong>Miesto výcviku:</strong><br>Strelnica Bellator Trenčín</span>
            </div>
            
            <h4 class="select-title">Dostupné termíny:</h4>
            <div class="terminy-container">
                <p style="color: #bbb; font-size: 0.9rem; text-align: center; padding: 20px; border: 1px dashed #444; border-radius: 6px;">
                    Nové termíny budú zverejnené čoskoro.
                </p>
            </div>

            <button onclick="zatvoritDetail()" style="background: transparent; color: #ffffff !important; border: 1px solid #ffffff; margin-top: 20px; width: 100%; cursor: pointer; padding: 12px; border-radius: 6px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px;">
                <i class="fas fa-arrow-left" style="color: #ffffff !important;"></i> 
                <span style="color: #ffffff !important;">Späť na ponuku</span>
            </button>
            
            <div class="price-tag">120 € <span>vč. DPH</span></div>
        `;

    } else if (typKurzu === 'aktivny_utocnik') {
        // --- OBRANA PRED AKTÍVNYM ÚTOČNÍKOM ---
        textPanel.innerHTML = `
            <h2 id="modalTitle">Obrana pred aktívnym útočníkom</h2>
            <img src="img/HS-obrana.png" class="modal-img-small" alt="Obrana pred aktívnym útočníkom">
            
            <p style="color: var(--army-olive); font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Strelecko - taktický kurz</p>
            
            <p>Kurz je zameraný na praktickú prípravu civilných osôb na zvládnutie situácie s aktívnym útočníkom v uzavretých aj otvorených priestoroch (verejné budovy, pracovisko, školy, obchodné centrá).</p>
            <p>Účastníci sa naučia rozpoznať hrozbu, správne reagovať a zvýšiť šancu na prežitie pomocou jednoduchých, realistických a právne obhájiteľných postupov.</p>

            <h4><i class="fas fa-bullseye"></i> CIEĽ KURZU:</h4>
            <ul>
                <li>Rýchle rozpoznanie aktívnej hrozby.</li>
                <li>Správne rozhodovanie v krízovej situácii.</li>
                <li>Minimalizovanie rizika pre seba a ostatných.</li>
                <li>Bezpečné ukrytie, únik alebo obranu podľa situácie.</li>
            </ul>

            <h4><i class="fas fa-list-ul"></i> OBSAH KURZU:</h4>
            <div class="obsah-sekcia"><div><i class="fas fa-skull-crossbones"></i> Čo je aktívny útočník a ako sa správa.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-eye"></i> Včasné varovné signály a prevencia.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-shield-alt"></i> Zásady reakcie (ukrytie, únik, obrana).</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-walking"></i> Pohyb v budovách, využitie krytu a prostredia.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-headset"></i> Komunikácia s okolím a zložkami IZS.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-user-ninja"></i> Modelové situácie a praktický nácvik.</div></div>
        `;

        infoPanel.innerHTML = `
            <div class="info-box-modern">
                <i class="fas fa-location-dot"></i>
                <span><strong>Miesto výcviku:</strong><br>Strelnica Bellator Trenčín</span>
            </div>
            
            <h4 class="select-title">Dostupné termíny:</h4>
            <div class="terminy-container">
                <p style="color: #bbb; font-size: 0.9rem; text-align: center; padding: 20px; border: 1px dashed #444; border-radius: 6px;">
                    Aktuálne pripravujeme nové termíny pre tento kurz.
                </p>
            </div>

            <button onclick="zatvoritDetail()" style="background: transparent; color: #ffffff !important; border: 1px solid #ffffff; margin-top: 20px; width: 100%; cursor: pointer; padding: 12px; border-radius: 6px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px;">
                <i class="fas fa-arrow-left" style="color: #ffffff !important;"></i> 
                <span style="color: #ffffff !important;">Späť na ponuku</span>
            </button>
            
            <div class="price-tag">110 € <span>vč. DPH</span></div>
        `;

    } else if (typKurzu === 'auto') { 
    // --- STREĽBA Z AUTA ---
        textPanel.innerHTML = `
            <h2 id="modalTitle">Streľba z auta: Obrana proti útočníkovi vo vozidle</h2>
            <img src="img/HS-auto.jpg" class="modal-img-small" alt="Streľba z auta">
            
            <p style="color: var(--army-olive); font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Strelecko-taktický kurz</p>
            
            <p>Realistický výcvik zameraný na obranu civilnej osoby pri násilnom útoku vo vozidle alebo v jeho bezprostrednom okolí. Kurz vás pripraví na situácie, kde rozhodujú sekundy, správne rozhodnutie a bezpečná manipulácia so zbraňou v obmedzenom priestore.</p>
            <p>Výcvik je postavený na reálnych civilných scenároch, nie na športovej streľbe. Dôraz kladieme na funkčné taktické postupy, bezpečnosť a použiteľnosť v reálnom živote.</p>

            <h4><i class="fas fa-users"></i> PRE KOHO JE KURZ URČENÝ:</h4>
            <ul>
                <li>Držitelia zbrojného preukazu.</li>
            </ul>

            <h4><i class="fas fa-list-ul"></i> OBSAH KURZU:</h4>
            <div class="obsah-sekcia"><div><i class="fas fa-eye"></i> Rozpoznanie hrozby a včasná reakcia pri prepadnutí.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-shuffle"></i> Rozhodovanie: únik alebo zotrvanie vo vozidle.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-gun"></i> Bezpečná manipulácia so zbraňou vo vozidle.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-car-side"></i> Streľba z vozidla a pri vozidle (využitie vozidla ako krytu).</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-walking"></i> Pohyb, krytie a opustenie vozidla.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-user-ninja"></i> Modelové situácie a praktické scenáre.</div></div>

            <h4><i class="fas fa-graduation-cap"></i> PRÍNOS KURZU:</h4>
            <ul>
                <li>Lepšie situačné povedomie.</li>
                <li>Schopnosť správne reagovať v kritických situáciách.</li>
                <li>Praktické postupy použiteľné v reálnom živote.</li>
            </ul>
        `;

        infoPanel.innerHTML = `
            <div class="info-box-modern">
                <i class="fas fa-location-dot"></i>
                <span><strong>Miesto výcviku:</strong><br>Strelnica Bellator Trenčín</span>
            </div>
            
            <h4 class="select-title">Dostupné termíny:</h4>
            <div class="terminy-container">
                <p style="color: #bbb; font-size: 0.9rem; text-align: center; padding: 20px; border: 1px dashed #444; border-radius: 6px;">
                    Aktuálne pripravujeme nové termíny pre tento kurz.
                </p>
            </div>

            <button onclick="zatvoritDetail()" style="background: transparent; color: #ffffff !important; border: 1px solid #ffffff; margin-top: 20px; width: 100%; cursor: pointer; padding: 12px; border-radius: 6px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px;">
                <i class="fas fa-arrow-left" style="color: #ffffff !important;"></i> 
                <span style="color: #ffffff !important;">Späť na ponuku</span>
            </button>
            
            <div class="price-tag">110 € <span>vč. DPH</span></div>
        `;

    } else if (typKurzu === 'sutaz_liga' || typKurzu === 'sutaz_tactical') {
        // Zistíme, na ktorú kartu používateľ klikol, aby sme dali správny nadpis a obrázok
        const jeLiga = typKurzu === 'sutaz_liga';
        const nazov = jeLiga ? 'Klubová liga Bellator' : 'Tactical Challenge';
        const obrazok = jeLiga ? 'img/sutaz-klubova.jpg' : 'img/sutaz-trauma.jpg';

        textPanel.innerHTML = `
            <h2 id="modalTitle">${nazov}</h2>
            <img src="${obrazok}" class="modal-img-small" alt="${nazov}" onerror="this.style.display='none'">
            
            <div style="background: rgba(138, 154, 91, 0.1); border: 1px solid var(--army-olive); padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center;">
                <i class="fas fa-tools" style="font-size: 2rem; color: var(--army-olive); margin-bottom: 15px;"></i>
                <h3 style="margin: 0; color: #fff; letter-spacing: 1px;">PRIPRAVUJEME PODROBNOSTI</h3>
                <p style="color: #ccc; margin-top: 10px;">Momentálne finalizujeme propozície a presný harmonogram pre nadchádzajúci ročník.</p>
            </div>

            <h4 style="margin-top: 30px;"><i class="fas fa-trophy"></i> O ČOM JE TÁTO SÚŤAŽ?</h4>
            <p>Naše súťaže sú navrhnuté tak, aby preverili streleckú techniku, rozhodovanie pod tlakom a bezpečnú manipuláciu v dynamickom prostredí.</p>
            <ul>
                <li><strong>Kategórie:</strong> Budú upresnené v propozíciách.</li>
                <li><strong>Náročnosť:</strong> Vhodné pre skúsených strelcov aj ambicióznych začiatočníkov.</li>
                <li><strong>Lokalita:</strong> Strelnica Bellator Trenčín.</li>
            </ul>
        `;

        infoPanel.innerHTML = `
            <div class="info-box-modern" style="border-color: #444; opacity: 0.8;">
                <i class="fas fa-calendar-alt"></i>
                <span><strong>Termín:</strong><br>Pripravujeme na rok 2026</span>
            </div>
            
            <div style="padding: 15px; background: #222; border-radius: 8px; margin: 20px 0; font-size: 0.9rem; color: #aaa; text-align: center;">
                Sledujte naše sociálne siete, kde oznámime spustenie registrácie.
            </div>

            <button onclick="zatvoritDetail()" class="btn-main-modern" style="width:100%; background: transparent; border: 1px solid var(--army-olive);">
                <span>SPÄŤ NA STRÁNKU</span>
            </button>
        `;


    } else {
        textPanel.innerHTML = "<h2>Pripravujeme...</h2><p>Obsah pre tento kurz momentálne finalizujeme.</p>";
        infoPanel.innerHTML = '<button onclick="zatvoritDetail()" class="btn-main-modern">ZAVRIEŤ</button>';
    }

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// --- 3. POMOCNÉ FUNKCIE PRE KURZY ---
function vybratTermin(element, datum) {
    document.querySelectorAll('.termin-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
    document.getElementById('termin-select').value = datum;
}

function potvrditRezervaciu(povodniTyp) {
    const termin = document.getElementById('termin-select').value;
    const textPanel = document.querySelector('.modal-text');
    const infoPanel = document.querySelector('.modal-info-panel');

    textPanel.innerHTML = `
        <h3><i class="fas fa-shield-halved"></i> Podmienky rezervácie</h3>
        <p>Pre záväznú rezerváciu miesta na kure je potrebné <strong>uhradiť poplatok</strong>. Vaše miesto bude garantované okamžite po úspešnej realizácii platby.</p>
        
        <div style="background: rgba(138, 154, 91, 0.1); border-left: 4px solid var(--army-olive); padding: 15px; border-radius: 4px; margin: 20px 0;">
            <h4 style="margin-top:0; color:var(--army-olive);"><i class="fas fa-user-clock"></i> Čo v prípade neúčasti?</h4>
            <p style="margin-bottom:0;">Ak sa na kurz nebudete môcť dostaviť, poplatok sa nevracia, ale <strong>v plnej výške sa prenáša ako kredit</strong> na váš ďalší termín alebo iný kurz z našej ponuky.</p>
        </div>

        <p style="font-size: 0.9em; color: var(--text-secondary); margin-top: 20px;">
            Po dokončení platby vám systém automaticky zašle potvrdenie o rezervácii a podrobné organizačné pokyny ku kurzu na váš e-mail.
        </p>
    `;

    infoPanel.innerHTML = `
        <h4 style="margin-bottom:20px;">Registračné údaje</h4>
        
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 1;">
                <label style="display:block; margin-bottom:5px;">Meno *</label>
                <input type="text" id="reg-meno" placeholder="Jozef" style="width:100%;">
            </div>
            <div style="flex: 1;">
                <label style="display:block; margin-bottom:5px;">Priezvisko *</label>
                <input type="text" id="reg-priezvisko" placeholder="Mrkva" style="width:100%;">
            </div>
        </div>

        <label style="display:block; margin-bottom:5px;">E-mail *</label>
        <input type="email" id="reg-email" placeholder="vas@email.com" style="margin-bottom:15px; width:100%;">
        
        <label style="display:block; margin-bottom:5px;">Telefónne číslo *</label>
        <input type="tel" id="reg-tel" placeholder="+421 900 000 000" style="margin-bottom:15px; width:100%;">
        
        <div style="font-size: 0.8rem; color: #bbb; margin-bottom: 20px; display:flex; gap:10px; align-items:flex-start;">
            <input type="checkbox" id="souhlas" style="width:auto; margin:0; cursor:pointer;"> 
            <span>Súhlasím s podmienkami a beriem na vedomie prenos poplatku na kredit. *</span>
        </div>
        
        <button class="btn-main-modern" onclick="odoslatFinalnuRezervaciu('${termin}')" style="width:100%; margin-bottom: 10px;">
            <span>PREJSŤ K PLATBE</span>
            <i class="fas fa-credit-card"></i>
        </button>
        
        <button onclick="otvoritDetail('${povodniTyp}')" style="background: transparent; color: #ffffff !important; border: 1px solid #ffffff; width: 100%; cursor: pointer; padding: 12px; border-radius: 6px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px;">
            <i class="fas fa-arrow-left"></i> <span>Späť</span>
        </button>
    `;
}

function odoslatFinalnuRezervaciu(termin) {
    const meno = document.getElementById('reg-meno').value;
    const priezvisko = document.getElementById('reg-priezvisko').value;
    const email = document.getElementById('reg-email').value;
    const suhlas = document.getElementById('souhlas').checked;

    if (!meno || !priezvisko || !email || !suhlas) {
        alert("Prosím vyplňte všetky povinné údaje a potvrďte súhlas.");
        return;
    }
    
    if(kapacity[termin]) kapacity[termin] -= 1;
    alert(`Ďakujeme, ${meno} ${priezvisko}! Budete presmerovaný k platbe.`);
    zatvoritDetail();
}

function zatvoritDetail() {
    document.getElementById('courseModal').style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    const modal = document.getElementById('courseModal');
    if (event.target == modal) zatvoritDetail();
}

function otvoritModalVseobecny(typ) {
    const modal = document.getElementById('courseModal');
    const textPanel = document.querySelector('.modal-text');
    const infoPanel = document.querySelector('.modal-info-panel');

    if (typ === 'stanovy') {
        // --- SEKCIA STANOVY ---
        textPanel.innerHTML = `
            <div class="stanovy-header" style="border-bottom: 2px solid var(--army-olive); margin-bottom: 20px; padding-bottom: 10px;">
                <h2 style="margin:0; color: #ffffff;">STANOVY</h2>
                <p style="color: var(--army-olive); font-weight: bold; margin: 5px 0 0 0;">Strelecký klub Bellator o.z.</p>
            </div>
            
            <div class="stanovy-content" style="text-align: justify; font-size: 0.9rem; line-height: 1.6; color: #eee; max-height: 60vh; overflow-y: auto; padding-right: 15px;">
                <p style="font-style: italic; font-size: 0.8rem; color: #aaa;">Založené v súlade so zákonom č. 83/1990 Zb. o združovaní občanov.</p>

                <h3 style="color: var(--army-olive); border-left: 3px solid var(--army-olive); padding-left: 10px;">Článok 1: Názov, sídlo a postavenie</h3>
                <p><strong>1.1.</strong> Názov občianskeho združenia je: <strong>Strelecký klub Bellator o.z.</strong></p>
                <p><strong>1.2.</strong> Sídlo združenia: <strong>Hurbanova 1592/40, 911 01 Trenčín</strong>.</p>
                <p><strong>1.3.</strong> Združenie je nezávislá, samostatná právnická osoba.</p>

                <h3 style="color: var(--army-olive); border-left: 3px solid var(--army-olive); padding-left: 10px; margin-top: 25px;">Článok 2: Ciele združenia</h3>
                <p>Hlavným cieľom je presadzovať záujmy streleckého športu, podporovať všestranný rozvoj športovej streľby a spoluprácu so streleckými organizáciami.</p>
                <ul style="list-style-type: none; padding-left: 0;">
                    <li><i class="fas fa-check" style="color: var(--army-olive); margin-right: 8px;"></i> Odborné poradenstvo a výcvik so zbraňou.</li>
                    <li><i class="fas fa-check" style="color: var(--army-olive); margin-right: 8px;"></i> Realizácia kurzov a práca s mládežou.</li>
                </ul>

                <h3 style="color: var(--army-olive); border-left: 3px solid var(--army-olive); padding-left: 10px; margin-top: 25px;">Článok 3: Členstvo</h3>
                <p><strong>3.5.</strong> Členstvo vzniká prijatím Výkonnou radou na základe písomnej žiadosti a zaplatení členského poplatku.</p>
                
                <div style="margin-top: 30px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 5px; font-size: 0.8rem;">
                    <p>Schválené dňa: <strong>07.12.2025</strong><br>Miesto: Trenčín</p>
                </div>
            </div>
        `;

        infoPanel.innerHTML = `
            <div class="info-box-modern" style="border-color: var(--army-olive); background: rgba(138, 154, 91, 0.1); padding: 15px; border-radius: 8px; text-align: center;">
                <i class="fas fa-file-alt" style="color: #ffffff; font-size: 1.5rem; margin-bottom: 5px;"></i><br>
                <span style="color: #ffffff;"><strong>Formát:</strong><br>PDF Dokument</span>
            </div>
            
            <p style="font-size: 0.9rem; color: #ffffff; margin: 20px 0; line-height: 1.4; text-align: center;">
                Tento text slúži na oboznámenie sa s pravidlami klubu.
            </p>
            
            <a href="docs/stanovy_bellator_info.pdf" target="_blank" class="btn-main-modern" style="text-decoration: none; width: 100%; display: flex; justify-content: center; align-items: center; background: var(--army-olive); color: #ffffff !important; border: none; padding: 15px; border-radius: 6px; font-weight: bold; cursor: pointer;">
                <span>OTVORIŤ STANOVY</span>
                <i class="fas fa-file-pdf" style="margin-left: 10px;"></i>
            </a>    

            <button onclick="zatvoritDetail()" style="background: transparent; border: 1px solid #ffffff; color: #ffffff !important; width: 100%; margin-top: 15px; padding: 12px; cursor: pointer; border-radius: 6px; font-weight: bold;">
                ZATVORIŤ
            </button>
        `;

    } else if (typ === 'clenstvo') {
        // --- UPRAVENÁ SEKCIA ČLENSTVO S BENEFITMI ---
        textPanel.innerHTML = `
            <div class="stanovy-header" style="border-bottom: 2px solid var(--army-olive); margin-bottom: 20px; padding-bottom: 10px;">
                <h2 style="margin:0; color: #ffffff;">ČLENSTVO V KLUBE</h2>
                <p style="color: var(--army-olive); font-weight: bold; margin: 5px 0 0 0;">Strelecký klub Bellator o.z.</p>
            </div>
            
            <div class="membership-content" style="color: #ffffff; line-height: 1.6; font-size: 0.95rem;">
                
                <div style="background: rgba(138, 154, 91, 0.15); border: 1px solid var(--army-olive); padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                    <h4 style="color: var(--army-olive); margin-top: 0; display: flex; align-items: center;">
                        <i class="fas fa-id-card" style="margin-right: 10px;"></i> ČLENSKÝ PRÍSPEVOK A VÝHODY
                    </h4>
                    <p style="font-size: 1.1rem; font-weight: bold; margin-bottom: 10px;">Ročný poplatok (365 dní): <span style="color: var(--army-olive);">120 €</span></p>
                    <ul style="list-style: none; padding-left: 0; margin-bottom: 0;">
                        <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                            <i class="fas fa-star" style="color: var(--army-olive); margin-right: 10px; margin-top: 5px;"></i>
                            <span><strong>Karta člena:</strong> Každý člen obdrží členskú kartu.</span>
                        </li>
                        <li style="margin-bottom: 8px; display: flex; align-items: flex-start;">
                            <i class="fas fa-check" style="color: var(--army-olive); margin-right: 10px; margin-top: 5px;"></i>
                            <span><strong>20x voľný vstup:</strong> Nárok na 20 vstupov (30 min.) na dráhu na strelnici <strong>Bellator Armory v Trenčíne</strong>.</span>
                        </li>
                        <li style="margin-bottom: 0; display: flex; align-items: flex-start;">
                            <i class="fas fa-percent" style="color: var(--army-olive); margin-right: 10px; margin-top: 5px;"></i>
                            <span><strong>Zľava 20%:</strong> Po vyčerpaní kreditov plynule pokračuje zľava na prenájom streleckej dráhy.</span>
                        </li>
                    </ul>
                </div>

                <h4 style="color: var(--army-olive);"><i class="fas fa-clipboard-list"></i> AKO SA STAŤ ČLENOM:</h4>
<ul style="list-style: none; padding-left: 0; margin-bottom: 25px;">
    <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
        <i class="fas fa-1" style="background: var(--army-olive); color: #000; padding: 4px 8px; border-radius: 50%; margin-right: 12px; font-weight: bold; font-size: 0.75rem;"></i>
        <div>
            <strong>Získanie prihlášky:</strong> Tlačivo si môžete stiahnuť v pravom paneli, alebo si ho 
            <strong>vyžiadať osobne</strong> priamo na recepcii strelnice <strong>Bellator Armory</strong>.
        </div>
    </li>
                    <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                        <i class="fas fa-2" style="background: var(--army-olive); color: #000; padding: 4px 8px; border-radius: 50%; margin-right: 12px; font-weight: bold; font-size: 0.75rem;"></i>
                        <div><strong>Osobné doručenie:</strong> Prihlášku prineste osobne na strelnicu Bellator Armory v Trenčíne.</div>
                    </li>
                    <li style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                        <i class="fas fa-3" style="background: var(--army-olive); color: #000; padding: 4px 8px; border-radius: 50%; margin-right: 12px; font-weight: bold; font-size: 0.75rem;"></i>
                        <div><strong>Schválenie a karta:</strong> Po posúdení výkonnou radou a zaplatení príspevku vám bude vystavená <strong>karta člena a potvrdenie</strong>.</div>
                    </li>
                </ul>

                <h4 style="color: var(--army-olive); border-top: 1px solid #444; margin-top: 25px; padding-top: 15px;">
                    <i class="fas fa-gavel"></i> ZÁPISNICE ZO ZASADNUTÍ:
                </h4>
                <div class="meeting-list" style="display: grid; gap: 10px; margin-top: 10px;">
                    <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; border-left: 3px solid var(--army-olive);">
                        <div>
                            <span style="display: block; font-weight: bold;">Zápisnica z členskej schôdze</span>
                            <span style="font-size: 0.8rem; color: #888;">Dátum: 18.02.2026 | Trenčín</span>
                        </div>
                        <a href="docs/zapisnica_2026_2_18.pdf" target="_blank" style="color: var(--army-olive); font-size: 1.2rem;">
                            <i class="fas fa-file-pdf"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;

        infoPanel.innerHTML = `
            <div class="info-box-modern" style="background: #2b5797; color: #fff; padding: 20px; border-radius: 8px; text-align: center; border: none;">
                <i class="fas fa-file-word" style="font-size: 2rem; margin-bottom: 10px;"></i><br>
                <span style="font-size: 0.8rem; text-transform: uppercase;">Dokument na stiahnutie</span>
                <div style="font-size: 1.1rem; font-weight: bold; margin: 5px 0;">PRIHLÁŠKA ZA ČLENA</div>
            </div>

            <a href="docs/Prihlaska_Bellator.docx" download class="btn-main-modern" style="text-decoration: none; width: 100%; display: flex; justify-content: center; align-items: center; background: #ffffff; color: #000 !important; border: none; padding: 15px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 20px;">
                <span>STIAHNUŤ TLAČIVO</span>
                <i class="fas fa-download" style="margin-left: 10px;"></i>
            </a>

            <button onclick="zatvoritDetail()" style="background: transparent; border: 1px solid #ffffff; color: #ffffff !important; width: 100%; margin-top: 15px; padding: 12px; cursor: pointer; border-radius: 6px; font-weight: bold;">
                ZAVRIEŤ
            </button>
        `;
    }

    // --- TOTO JE DÔLEŽITÉ PRE ZOBRAZENIE MODALU ---
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}