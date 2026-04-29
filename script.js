const kapacity = {
    "11.04.2026": 10,
    "16.05.2026": 10,
    "13.04.2026": 10
};
// 1. Inicializácia (Doplň svoje údaje zo Settings -> API)
const SUPABASE_URL = 'https://ihcliqqmqkccymuabakw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_COnhxm99zSxyQ5sT9qc58w_FxzAZb2D';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Definícia aktualizujVolneMesta je nižšie (jedna čistá verzia s try/catch)

// Definícia odoslatFinalnuRezervaciu je nižšie (jedna čistá verzia s validáciou)

// --- 2. HLAVNÁ FUNKCIA OTVORENIA DETAILU ---
async function otvoritDetail(typKurzu) {
    console.log("Kliknuté na kurz:", typKurzu); // Toto uvidíš v konzole (F12)

    const modal = document.getElementById('courseModal');
    const textPanel = document.querySelector('.modal-text');
    const infoPanel = document.querySelector('.modal-info-panel');

    // 1. POISTKA: Ak JS nenájde tieto prvky, vypíše chybu a nespadne
    if (!modal || !textPanel || !infoPanel) {
        console.error("CHYBA: V HTML chýba .modal-text alebo .modal-info-panel!");
        return;
    }

    // 2. Vyčistenie panelov (aby tam nezostal starý kurz)
    textPanel.innerHTML = "Načítavam...";
    infoPanel.innerHTML = "";
    
    // Nastavenie URL mriežky
    window.history.pushState({kurz: typKurzu}, "", "#kurz-" + typKurzu);

    // 3. LOGIKA PRE JEDNOTLIVÉ KURZY
    
if (typKurzu === 'aktivny_utocnik') {
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
                <i class="fas fa-arrow-left"></i> 
                <span>Späť na ponuku</span>
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
            <div id="side-content-wrapper">
                <div class="info-box-modern">
                    <i class="fas fa-location-dot"></i>
                    <span><strong>Miesto výcviku:</strong><br>Strelnica Bellator Trenčín</span>
                </div>

                <h4 class="select-title">Nadchádzajúce termíny:</h4>
                <div style="background: rgba(138, 154, 91, 0.08); border: 1px dashed var(--army-olive); border-radius: 8px; padding: 18px; text-align: center; margin-bottom: 15px;">
                    <i class="fas fa-calendar-plus" style="font-size: 1.6rem; color: var(--army-olive); margin-bottom: 10px; display: block;"></i>
                    <p style="color: #fff; font-weight: bold; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 1px;">Pripravujeme nové termíny</p>
                    <p style="color: #aaa; font-size: 0.85rem; margin: 0;">Sledujte nás alebo nás kontaktujte pre viac informácií.</p>
                </div>

                <button onclick="zatvoritDetail()" style="background: transparent; color: #ffffff !important; border: 1px solid #ffffff; margin-top: 20px; width: 100%; cursor: pointer; padding: 12px; border-radius: 6px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <i class="fas fa-arrow-left"></i>
                    <span>Späť na ponuku</span>
                </button>

                <div style="margin-top: 20px; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; border: 1px solid #333;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="color: #aaa; font-size: 0.85rem; text-transform: uppercase;">Člen klubu</span>
                        <span style="color: #8a9a5b; font-weight: bold; font-size: 1.4rem;">130 €</span>
                    </div>
                    <div style="height: 1px; background: #333; margin: 10px 0;"></div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #aaa; font-size: 0.85rem; text-transform: uppercase;">Bežná cena</span>
                        <span style="color: #fff; font-weight: bold; font-size: 1.4rem;">150 €</span>
                    </div>
                    <p style="text-align: center; font-size: 0.7rem; color: #666; margin: 10px 0 0 0;">Ceny sú uvedené vrátane DPH</p>
                </div>
            </div>
        `;
        } else if (typKurzu === 'civil') {
        // --- CIVILNÁ PRIPRAVENOSŤ ---
        textPanel.innerHTML = `
            <h2 id="modalTitle">Civilná pripravenosť na mimoriadne situácie</h2>
            <img src="img/HS-civil.jpg" class="modal-img-small" alt="Civilná pripravenosť">

            <p style="color: var(--army-olive); font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Komplexný prípravný kurz</p>

            <p>Kurz je zameraný na komplexnú prípravu civilných osôb na zvládnutie krízových situácií — od evakuácie a prežitia v mestskom prostredí až po základy taktickej medicíny a komunikácie v núdzi.</p>

            <div style="background: rgba(138, 154, 91, 0.1); border: 1px dashed var(--army-olive); padding: 15px; margin-bottom: 25px; border-radius: 8px;">
                <h4 style="color: var(--army-olive); margin-top: 0; font-size: 0.9rem; letter-spacing: 1px;">
                    <i class="fas fa-info-circle"></i> INFORMÁCIA:
                </h4>
                <p style="margin: 0; font-size: 0.9rem; color: #fff; line-height: 1.4;">
                    Obsah kurzu momentálne finalizujeme. Pridajte sa na náš newsletter alebo sledujte sociálne siete.
                </p>
            </div>

            <h4><i class="fas fa-bullseye"></i> ZAMERANIE KURZU:</h4>
            <div class="obsah-sekcia"><div><i class="fas fa-map-signs"></i> Evakuácia a orientácia v mestskom prostredí.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-kit-medical"></i> Základy taktickej medicíny a prvej pomoci.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-water"></i> Prežitie bez bežnej infraštruktúry (voda, jedlo, teplo).</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-walkie-talkie"></i> Komunikácia a koordinácia v krízových situáciách.</div></div>
            <div class="obsah-sekcia"><div><i class="fas fa-shield-halved"></i> Ochrana rodiny a domácnosti pri mimoriadnych udalostiach.</div></div>
        `;
        infoPanel.innerHTML = `
            <div id="side-content-wrapper">
                <div class="info-box-modern">
                    <i class="fas fa-location-dot"></i>
                    <span><strong>Miesto výcviku:</strong><br>Strelnica Bellator Trenčín</span>
                </div>

                <h4 class="select-title">Nadchádzajúce termíny:</h4>
                <div style="background: rgba(138, 154, 91, 0.08); border: 1px dashed var(--army-olive); border-radius: 8px; padding: 18px; text-align: center; margin-bottom: 15px;">
                    <i class="fas fa-calendar-plus" style="font-size: 1.6rem; color: var(--army-olive); margin-bottom: 10px; display: block;"></i>
                    <p style="color: #fff; font-weight: bold; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 1px;">Pripravujeme nové termíny</p>
                    <p style="color: #aaa; font-size: 0.85rem; margin: 0;">Sledujte nás alebo nás kontaktujte pre viac informácií.</p>
                </div>

                <button onclick="zatvoritDetail()" style="background: transparent; color: #ffffff !important; border: 1px solid #ffffff; margin-top: 20px; width: 100%; cursor: pointer; padding: 12px; border-radius: 6px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <i class="fas fa-arrow-left"></i>
                    <span>Späť na ponuku</span>
                </button>
            </div>
        `;
        } else if (typKurzu === 'domov') {
        // 1. Definujeme dátum pre tento kurz
        const datumKurzu = "16.05.2026"; // Zjednotil som ti ho s textom v paneli, mala si tam 05.05.

        // 2. Získame aktuálny počet voľných miest
        const volneMesta = await aktualizujVolneMesta(datumKurzu);
        const jePlno = volneMesta <= 0;

       // --- ĽAVÝ PANEL (Popis kurzu) ---
textPanel.innerHTML = `
    <h2 id="modalTitle">Ochrana obydlia (Home Defence)</h2>

    <img src="img/HS-home.webp" class="modal-img-small" alt="Ochrana obydlia">
    
    <div style="background: rgba(138, 154, 91, 0.1); border: 1px dashed var(--army-olive); padding: 15px; margin-bottom: 25px; border-radius: 8px;">
        <h4 style="color: var(--army-olive); margin-top: 0; font-size: 0.9rem; letter-spacing: 1px;">
            <i class="fas fa-exclamation-triangle"></i> DÔLEŽITÉ INFORMÁCIE:
        </h4>
        <p style="margin: 0; font-size: 0.9rem; color: #fff; line-height: 1.4;">
            KURZ JE URČENÝ PRE <strong>DRŽITEĽOV ZP</strong> A PRE TÝCH, KTORÍ ABSOLVOVALI <strong> ZÁKLADNÝ KURZ </strong>.
        </p>
    </div>

    <p style="font-style: italic; color: var(--army-olive); margin-bottom: 25px; border-left: 3px solid var(--army-olive); padding-left: 15px;">
        "Váš domov je váš hrad, naučte sa ho brániť bezpečne a efektívne."
    </p>

    <h4 style="color: var(--army-olive); letter-spacing: 1px;"><i class="fas fa-graduation-cap"></i> OBSAH STRELECKO-TAKTICKÉHO KURZU:</h4>
    
    <div class="obsah-sekcia" style="margin-bottom: 15px; display: flex; align-items: flex-start; gap: 15px;">
        <i class="fas fa-gavel" style="color: var(--army-olive); margin-top: 5px;"></i> 
        <div>
            <strong>1. Zákon a hranice konania</strong><br>
            <span style="font-size: 0.9rem; color: var(--text-secondary);">Získaš jasný prehľad o tom, čo si môžeš dovoliť a ako konať v súlade so zákonom pri ochrane domova.</span>
        </div>
    </div>

    <div class="obsah-sekcia" style="margin-bottom: 15px; display: flex; align-items: flex-start; gap: 15px;">
        <i class="fas fa-shoe-prints" style="color: var(--army-olive); margin-top: 5px;"></i> 
        <div>
            <strong>2. Taktický pohyb a kontrola priestoru</strong><br>
            <span style="font-size: 0.9rem; color: var(--text-secondary);">Naučíš sa bezpečne pohybovať v budove, efektívne využívať kryt a chrániť seba aj svojich blízkych.</span>
        </div>
    </div>

    <div class="obsah-sekcia" style="margin-bottom: 25px; display: flex; align-items: flex-start; gap: 15px;">
        <i class="fas fa-crosshairs" style="color: var(--army-olive); margin-top: 5px;"></i> 
        <div>
            <strong>3. Streľba v reálnych podmienkach</strong><br>
            <span style="font-size: 0.9rem; color: var(--text-secondary);">Tréning streľby v obmedzenom priestore, z využitia krytu a pozícií, ktoré situácia vyžaduje.</span>
        </div>
    </div>

    <h4 style="color: var(--army-olive); letter-spacing: 1px;"><i class="fas fa-bullseye"></i> CIEĽOM STRELECKO-TAKTICKÉHO KURZU JE:</h4>
    <ul style="margin-bottom: 20px; list-style-type: none; padding-left: 0;">
        <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--army-olive); font-size: 0.8rem; margin-right: 10px;"></i>Zvýšiť úroveň osobnej bezpečnosti a pripravenosti v prostredí vlastného obydlia.</li>
        <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--army-olive); font-size: 0.8rem; margin-right: 10px;"></i>Naučiť účastníkov reagovať na hrozby rýchlo, efektívne a v súlade s legislatívou.</li>
        <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--army-olive); font-size: 0.8rem; margin-right: 10px;"></i>Zdokonaliť bezpečnú manipuláciu so zbraňou v dynamických situáciách.</li>
        <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--army-olive); font-size: 0.8rem; margin-right: 10px;"></i>Osvojiť si základy taktického pohybu a správneho využívania krytu.</li>
        <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--army-olive); font-size: 0.8rem; margin-right: 10px;"></i>Rozvíjať schopnosť rýchleho rozhodovania v krízových momentoch.</li>
    </ul>

    <p style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; font-size: 0.95rem; border-left: 2px solid var(--army-olive);">
        <strong>Záver kurzu:</strong> Cieľom kurzu je, aby jeho absolvent na záver dokázal úspešne zvládnuť rôzne modelové situácie zamerané na ochranu obydlia.
    </p>
`;

        // --- PRAVÝ PANEL (Upravený pre registráciu a kapacity) ---
        infoPanel.innerHTML = `
            <div id="side-content-wrapper">
                <div class="info-box-modern">
                    <i class="fas fa-location-dot"></i>
                    <span><strong>Miesto výcviku:</strong><br>Strelnica Bellator Trenčín</span>
                </div>
                
                <h4 class="select-title">Dostupné termíny:</h4>
                <div class="terminy-container">
                    <div class="termin-item">
                        <div class="termin-info">
                            <i class="far fa-calendar-check"></i>
                            <span style="display:block;">16. 05. 2026 (Sobota) o 10:00</span>
                            <span style="font-size: 0.8rem; display:block; margin-top: 5px; color: ${volneMesta < 3 ? '#ff4d4d' : '#88b04b'};">
                                Voľné miesta: <strong>${volneMesta} / 10</strong>
                            </span>
                        </div>
                        <button class="btn-rezervovat" 
                                ${jePlno ? 'disabled style="background:#444; color:#888; border-color:#444; cursor:not-allowed;"' : ''}
                                onclick="zobrazitRegistraciu('${datumKurzu}', 'domov')">
                            ${jePlno ? 'OBSADENÉ' : 'Vybrať <i class="fas fa-chevron-right"></i>'}
                        </button>
                    </div>
                </div>

                <button onclick="zatvoritDetail()" style="background: transparent; color: #ffffff !important; border: 1px solid #ffffff; margin-top: 20px; width: 100%; cursor: pointer; padding: 12px; border-radius: 6px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <i class="fas fa-arrow-left"></i> 
                    <span>Späť na ponuku</span>
                </button>
                
                <div style="margin-top: 20px; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; border: 1px solid #333;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span style="color: #aaa; font-size: 0.85rem; text-transform: uppercase;">Člen klubu</span>
        <span style="color: #8a9a5b; font-weight: bold; font-size: 1.4rem;">100 €</span>
    </div>
    <div style="height: 1px; background: #333; margin: 10px 0;"></div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #aaa; font-size: 0.85rem; text-transform: uppercase;">Bežná cena</span>
        <span style="color: #fff; font-weight: bold; font-size: 1.4rem;">123 €</span>
    </div>
    <p style="text-align: center; font-size: 0.7rem; color: #666; margin: 10px 0 0 0;">Ceny sú uvedené vrátane DPH</p>
</div>
        `;
     } else if (typKurzu === 'zakladny') {
        // --- ĽAVÝ PANEL (tvoj pôvodný kód) ---
        textPanel.innerHTML = `
            <h2 id="modalTitle">Bezpečná manipulácia a základy streľby (Úroveň 1)</h2>
            <p style="font-style: italic; color: var(--army-olive); margin-bottom: 20px;">
                „Pochopenie zbrane začína rešpektom a správnymi návykmi.“
            </p>
            <img src="img/HS-zaklad.webp" class="modal-img-small" alt="Základný kurz">
            <p>Tento kurz je určený pre úplných začiatočníkov a budúcich držiteľov ZP. Naším cieľom nie je len naučiť vás strieľať, ale vybudovať absolútnu istotu v manipulácii.</p>
            <h4><i class="fas fa-bullseye"></i> ČO VÁS NAUČÍME:</h4>
            <ul>
                <li><strong>Štyri základné pravidlá bezpečnosti:</strong> Alfa a omega každého strelca.</li>
                <li><strong>Konštrukcia a funkcia:</strong> Ako pištoľ skutočne funguje.</li>
                <li><strong>Správny úchop a postoj:</strong> Základ pre presnú streľbu.</li>
                <li><strong>Mierenie a práca so spúšťou:</strong> Ako trafiť presne tam, kam sa pozeráte.</li>
                <li><strong>Drily bez nábojov (Sušenie):</strong> Správne návyky pri nabíjaní a kontrole.</li>
                <li><strong>Streľba na terč:</strong> Prenesenie teórie do praxe pod dohľadom inštruktora.</li>
            </ul>
            <h4><i class="fas fa-info-circle"></i> TECHNICKÉ DETAILY:</h4>
            <div class="obsah-sekcia"><i class="fas fa-clock"></i> <div><strong>Trvanie:</strong> 3 hodiny</div></div>
            <div class="obsah-sekcia"><i class="fas fa-briefcase"></i> <div><strong>Vybavenie:</strong> Nemáte vlastnú výstroj? Vhodnú zbraň aj pomôcky si môžete vybrať na mieste.</div></div>
            <div class="obsah-sekcia"><i class="fas fa-gun"></i> <div><strong>Strelivo:</strong> Vlastné, alebo možnosť zakúpenia priamo na strelnici.</div></div>
        `;

        // --- PRAVÝ PANEL ---
        infoPanel.innerHTML = `
            <div id="side-content-wrapper">
                <div class="info-box-modern">
                    <i class="fas fa-location-dot"></i>
                    <span><strong>Miesto výcviku:</strong><br>Strelnica Bellator Trenčín</span>
                </div>

                <h4 class="select-title">Nadchádzajúce termíny:</h4>

                <div style="background: rgba(138, 154, 91, 0.08); border: 1px dashed var(--army-olive); border-radius: 8px; padding: 18px; text-align: center; margin-bottom: 15px;">
                    <i class="fas fa-calendar-plus" style="font-size: 1.6rem; color: var(--army-olive); margin-bottom: 10px; display: block;"></i>
                    <p style="color: #fff; font-weight: bold; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 1px;">Pripravujeme nové termíny</p>
                    <p style="color: #aaa; font-size: 0.85rem; margin: 0;">Sledujte nás alebo nás kontaktujte pre viac informácií.</p>
                </div>

                <h4 class="select-title" style="margin-top: 20px; color: #666; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">
                    <i class="fas fa-history" style="margin-right: 6px;"></i> Prebehnuté termíny
                </h4>
                <div class="terminy-container">
                    <div class="termin-item" style="opacity: 0.5;">
                        <div class="termin-info">
                            <i class="fas fa-calendar-check" style="color: #666;"></i>
                            <span style="display:block; text-decoration: line-through; color: #888;">11. 04. 2026 (Sobota) o 10:00</span>
                            <span style="font-size: 0.8rem; display:block; margin-top: 5px; color: #666;">
                                Kurz sa konal
                            </span>
                        </div>
                        <span style="background: #333; color: #666; padding: 6px 12px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; white-space: nowrap;">PREBEHOL</span>
                    </div>
                </div>

                <button onclick="zatvoritDetail()" style="background: transparent; color: #ffffff !important; border: 1px solid #ffffff; margin-top: 20px; width: 100%; cursor: pointer; padding: 12px; border-radius: 6px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <i class="fas fa-arrow-left"></i>
                    <span>Späť na ponuku</span>
                </button>

                <div style="margin-top: 20px; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; border: 1px solid #333;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="color: #aaa; font-size: 0.85rem; text-transform: uppercase;">Člen klubu</span>
                        <span style="color: #8a9a5b; font-weight: bold; font-size: 1.4rem;">70 €</span>
                    </div>
                    <div style="height: 1px; background: #333; margin: 10px 0;"></div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #aaa; font-size: 0.85rem; text-transform: uppercase;">Bežná cena</span>
                        <span style="color: #fff; font-weight: bold; font-size: 1.4rem;">86 €</span>
                    </div>
                    <p style="text-align: center; font-size: 0.7rem; color: #666; margin: 10px 0 0 0;">Ceny sú uvedené vrátane DPH</p>
                </div>
            </div>
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
// --- 2. FUNKCIA PRE ČLENSTVO A STANOVY (Všeobecné info) ---
function otvoritModalVseobecny(typ) {
    const modal = document.getElementById('courseModal');
    const textPanel = document.querySelector('.modal-text');
    const infoPanel = document.querySelector('.modal-info-panel');

    if (!modal) return;

    textPanel.innerHTML = "";
    infoPanel.innerHTML = "";

    if (typ === 'clenstvo') {
        textPanel.innerHTML = `
            <div class="stanovy-header" style="border-bottom: 2px solid #8a9a5b; margin-bottom: 20px; padding-bottom: 10px;">
                <h2 style="margin:0; color: #ffffff;">ČLENSTVO V KLUBE</h2>
                <p style="color: #8a9a5b; font-weight: bold; margin: 5px 0 0 0;">Strelecký klub Bellator o.z.</p>
            </div>
            <div class="membership-content" style="color: #ffffff; line-height: 1.6; font-size: 0.95rem;">
                <div style="background: rgba(138, 154, 91, 0.15); border: 1px solid #8a9a5b; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                    <h4 style="color: #8a9a5b; margin-top: 0;">
                        <i class="fas fa-id-card" style="margin-right: 10px;"></i> ČLENSKÝ PRÍSPEVOK A VÝHODY
                    </h4>
                    <p style="font-size: 1.1rem; font-weight: bold; margin-bottom: 10px;">Ročný poplatok (365 dní): <span style="color: #8a9a5b;">120 €</span></p>
                    <ul style="list-style: none; padding-left: 0;">
                        <li><i class="fas fa-star" style="color:#8a9a5b;"></i> <strong>Karta člena:</strong> Každý člen obdrží kartu.</li>
                        <li><i class="fas fa-check" style="color:#8a9a5b;"></i> <strong>20x voľný vstup:</strong> 30 min. na dráhu Bellator Armory.</li>
                        <li><i class="fas fa-percent" style="color:#8a9a5b;"></i> <strong>Zľava 20%:</strong> Na prenájom dráhy po vyčerpaní kreditu.</li>
                    </ul>
                </div>
                <h4 style="color: #8a9a5b;">AKO SA STAŤ ČLENOM:</h4>
                <p>1. Stiahnite si prihlášku vpravo.<br>2. Doručte ju osobne na strelnicu v Trenčíne.<br>3. Po schválení obdržíte kartu.</p>
            </div>
        `;

        infoPanel.innerHTML = `
            <div style="background: #2b5797; color: #fff; padding: 20px; border-radius: 8px; text-align: center;">
                <i class="fas fa-file-word" style="font-size: 2rem;"></i><br>
                <strong>PRIHLÁŠKA ZA ČLENA</strong>
            </div>
            <a href="docs/Prihlaska_Bellator.docx" download class="btn-main-modern" style="text-decoration:none; display:block; text-align:center; background:#fff; color:#000; padding:15px; border-radius:6px; margin-top:20px; font-weight:bold;">
                STIAHNUŤ TLAČIVO <i class="fas fa-download"></i>
            </a>
            <button onclick="zatvoritDetail()" style="background:transparent; border:1px solid #fff; color:#fff; width:100%; margin-top:15px; padding:10px; cursor:pointer;">ZAVRIEŤ</button>
        `;

    } else if (typ === 'stanovy') {

        textPanel.innerHTML = `
            <div class="stanovy-header" style="border-bottom: 2px solid var(--army-olive); margin-bottom: 20px; padding-bottom: 10px;">
                <h2 style="margin:0; color: #ffffff;">STANOVY</h2>
                <p style="color: var(--army-olive); font-weight: bold; margin: 5px 0 0 0;">Strelecký klub Bellator o.z.</p>
            </div>
            
            <div class="stanovy-content" style="text-align: justify; font-size: 0.9rem; line-height: 1.6; color: #eee; padding-right: 15px;">
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
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// --- 3. POMOCNÉ FUNKCIE PRE KURZY ---
function zobrazitRegistraciu(datum, typ) {
    const wrapper = document.getElementById('side-content-wrapper');
    
    wrapper.innerHTML = `
        <h4 style="margin-bottom:20px; color: var(--army-olive);">Registrácia na ${datum}</h4>
        
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 1;">
                <label style="display:block; margin-bottom:5px; font-size: 0.9rem;">Meno *</label>
                <input type="text" id="reg-meno" style="width:100%; padding: 8px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px;">
            </div>
            <div style="flex: 1;">
                <label style="display:block; margin-bottom:5px; font-size: 0.9rem;">Priezvisko *</label>
                <input type="text" id="reg-priezvisko" style="width:100%; padding: 8px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px;">
            </div>
        </div>

        <label style="display:block; margin-bottom:5px; font-size: 0.9rem;">E-mail *</label>
        <input type="email" id="reg-email" style="margin-bottom:15px; width:100%; padding: 8px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px;">
        
        <label style="display:block; margin-bottom:5px; font-size: 0.9rem;">Telefónne číslo *</label>
        <input type="tel" id="reg-tel" style="margin-bottom:15px; width:100%; padding: 8px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px;">
        
        
<label style="display:block; margin-bottom:5px; font-size: 0.9rem;">Ste členom ŠK Bellator? *</label>
<select id="reg-clen" onchange="aktualizujCenuVRegistracii('${typ}')" style="margin-bottom:15px; width:100%; padding: 8px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px;">
    <option value="Nie">Nie, nie som členom</option>
    <option value="Ano">Áno, som členom ŠK Bellator</option>
</select>

<div id="cena-v-reg" style="text-align: center; font-weight: bold; font-size: 1.2rem; margin-bottom: 15px; color: var(--army-olive);">
    Cena k úhrade: 123 € 
</div>
        
       <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 25px;">
    <input type="checkbox" id="souhlas" style="width: 18px; height: 18px; cursor: pointer; accent-color: #8a9a5b;"> 
    <label for="souhlas" style="color: #bbb; font-size: 0.8rem; cursor: pointer;">
        Súhlasím s <span onclick="document.getElementById('modalPodmienky').style.display='flex'" style="color: #8a9a5b; text-decoration: underline; font-weight: bold;">podmienkami rezervácie</span> *
    </label>
</div>
        
        <button onclick="odoslatFinalnuRezervaciu('${datum}', '${typ}')" class="btn-main-modern" style="width:100%; margin-bottom: 10px; padding: 12px; background: var(--army-olive); color: #fff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
            POTVRDIŤ REGISTRÁCIU
        </button>
        
        <button onclick="otvoritDetail('${typ}')" style="background: transparent; color: #fff; border: 1px solid #fff; width: 100%; padding: 10px; border-radius: 6px; cursor: pointer;">
            Späť
        </button>
    `;
}

// TÚTO FUNKCIU PRIDAJ NIEKDE DO SCRIPT.JS
function aktualizujCenuVRegistracii(typ) {
    const clen = document.getElementById('reg-clen').value;
    const cenaDisplay = document.getElementById('cena-v-reg');
    
    let cenaBezna = 0;
    let cenaClen = 0;
    let pociatocnaCena = (typ === 'domov') ? 123 : 100;

    // Logika pre určenie cien podľa typu kurzu
    if (typ === 'zakladny') {
        cenaBezna = 86;
        cenaClen = 70;
    } 
    else if (typ === 'domov') {
        cenaBezna = 123;
        cenaClen = 100;
    } 
    else if (typ === 'auto') {
        cenaBezna = 150; // Doplň si reálnu cenu
        cenaClen = 130;  // Doplň si reálnu cenu
    } 
    else if (typ === 'aktivny_utocnik') {
        cenaBezna = 110; // Doplň si reálnu cenu
        cenaClen = 90;   // Doplň si reálnu cenu
    }
    // Ak pridáš ďalšie kurzy, pridáš len ďalšie "else if"

    // Samotné zobrazenie ceny
    if (clen === 'Ano') {
        cenaDisplay.innerText = `Cena k úhrade: ${cenaClen} €`;
    } else {
        cenaDisplay.innerText = `Cena k úhrade: ${cenaBezna} €`;
    }
}

async function odoslatFinalnuRezervaciu(datum, typ) {
    // 1. Získanie hodnôt z polí
    const meno = document.getElementById('reg-meno').value.trim();
    const priezvisko = document.getElementById('reg-priezvisko').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const tel = document.getElementById('reg-tel').value.trim();
    const clen = document.getElementById('reg-clen').value; // Tu berieme text z výberu (Áno/Nie)
    const suhlas = document.getElementById('souhlas').checked;

    // 2. Základné kontroly
    if (!meno || !priezvisko || !email || !tel) {
        alert("⚠️ Prosím, vyplňte všetky povinné polia.");
        return;
    }
    if (!suhlas) {
        alert("⚠️ Pre pokračovanie musíte súhlasiť s podmienkami.");
        return;
    }

    // 3. Zápis do Supabase - Názvy vľavo musia SEDIEŤ s tvojím screenshotom!
    try {
        const { data, error } = await _supabase
            .from('rezervacie')
            .insert([
                { 
                    meno: meno, 
                    priezvisko: priezvisko, 
                    email: email, 
                    telefon: tel,           // tvoja tabuľka má stĺpec 'telefon'
                    clen_klubu: clen,      // tvoja tabuľka má stĺpec 'clen_klubu'
                    datum_kurzu: datum,    // tvoja tabuľka má stĺpec 'datum_kurzu'
                    typ_kurzu: typ         // tvoja tabuľka má stĺpec 'typ_kurzu'
                }
            ]);

        if (error) throw error;

        // 4. Úspech - zobrazenie potvrdenia
        document.getElementById('side-content-wrapper').innerHTML = `
            <div style="text-align: center; padding: 40px 10px;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #8a9a5b; margin-bottom: 20px;"></i>
                <h3 style="color: #fff;">REZERVÁCIA ÚSPEŠNÁ!</h3>
                <p style="color: #ccc;">Ďakujeme, ${meno}. Vaša registrácia na kurz bola uložená.</p>
                <button onclick="zatvoritDetail()" style="margin-top:20px; width:100%; padding:12px; background:#8a9a5b; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">ZAVRIEŤ</button>
            </div>
        `;

    } catch (err) {
        console.error("Chyba:", err);
        alert("Nepodarilo sa odoslať dáta: " + err.message);
    }





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
function zatvoritDetail() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.style.display = "none";
    }
    document.body.style.overflow = "auto";
    // Vyčistíme URL (odstránime #kurz-xxx)
    window.history.pushState({}, "", window.location.pathname);
}
// Spustí sa automaticky pri načítaní stránky
async function aktualizujVolneMesta(datum) {
    try {
        const { count, error } = await _supabase
            .from('rezervacie')
            .select('*', { count: 'exact', head: true })
            .eq('datum_kurzu', datum);

        if (error) throw error;

        const MAX_KAPACITA = 10;
        return MAX_KAPACITA - (count || 0);
    } catch (err) {
        console.error("Chyba pri načítaní kapacity:", err);
        return 10;
    }
}
// TOTO ZABEZPEČÍ OTVORENIE PRI NAČÍTANÍ STRÁNKY
window.addEventListener('popstate', (event) => {
    // Ak používateľ klikne na tlačidlo "Späť" v prehliadači
    if (event.state && event.state.kurz) {
        otvoritDetail(event.state.kurz);
    } else {
        zatvoritDetail();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const kurzZLinku = urlParams.get('kurz');

    if (kurzZLinku) {
        // Počkáme sekundu, kým sa všetko načíta a potom otvoríme
        setTimeout(() => {
            otvoritDetail(kurzZLinku);
        }, 300);
    }
});
// Funkcia, ktorá skontroluje mriežku v URL a otvorí kurz
function checkUrlHash() {
    const hash = window.location.hash; // získa napr. "#kurz-zakladny"
    if (hash && hash.startsWith('#kurz-')) {
        const typZHashu = hash.replace('#kurz-', '');
        
        // Malé oneskorenie, aby sa stihlo načítať HTML
        setTimeout(() => {
            if (typeof otvoritDetail === 'function') {
                otvoritDetail(typZHashu);
            }
        }, 300);
    }
}

// Spusti kontrolu pri načítaní stránky
window.addEventListener('load', checkUrlHash);

// Spusti kontrolu, ak niekto klikne na tlačidlo "Späť" alebo zmení hash ručne
window.addEventListener('hashchange', checkUrlHash);

// Zatvorenie modalu klávesou Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('courseModal');
        if (modal && modal.style.display === 'flex') {
            zatvoritDetail();
        }
        const podmienky = document.getElementById('modalPodmienky');
        if (podmienky && podmienky.style.display === 'flex') {
            podmienky.style.display = 'none';
        }
    }
});

// Zatvorenie modalu kliknutím na tmavé pozadie
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                zatvoritDetail();
            }
        });
    }
});