const kapacity = {
    "11.04.2026": 10,
    "12.04.2026": 10,
    "13.04.2026": 10
};
// 1. Inicializácia (Doplň svoje údaje zo Settings -> API)
const SUPABASE_URL = 'https://ihcliqqmqkccymuabakw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_COnhxm99zSxyQ5sT9qc58w_FxzAZb2D';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
async function aktualizujVolneMesta(datum) {
    try {
        // Spýtame sa Supabase na počet riadkov pre tento dátum
        const { count, error } = await _supabase
            .from('rezervacie')
            .select('*', { count: 'exact', head: true })
            .eq('datum_kurzu', datum);

        if (error) throw error;

        // Výpočet: Maximálna kapacita (10) mínus počet prihlásených
        const maximalnaKapacita = 10;
        const aktualnePrihlasenych = count || 0;
        
        return maximalnaKapacita - aktualnePrihlasenych;

    } catch (err) {
        console.error("Chyba pri načítaní kapacity:", err);
        return 10; // Ak zlyhá spojenie, vrátime pôvodnú hodnotu
    }
}
// 2. Funkcia na uloženie do DB
async function odoslatFinalnuRezervaciu(datum, typ) {
    console.log("Pokus o odoslanie rezervácie..."); // Toto uvidíš v konzole (F12)

    try {
        // Získanie hodnôt
        const meno = document.getElementById('reg-meno').value;
        const priezvisko = document.getElementById('reg-priezvisko').value;
        const email = document.getElementById('reg-email').value;
        const telefon = document.getElementById('reg-tel').value;
        const clen = document.getElementById('reg-clen').value;
        const suhlas = document.getElementById('souhlas').checked;

        if (!meno || !priezvisko || !email || !suhlas) {
            alert("Prosím vyplňte povinné údaje a zaškrtnite súhlas.");
            return;
        }

        console.log("Dáta pripravené, posielam do Supabase...");

        // Uloženie do Supabase
        const { data, error } = await _supabase
            .from('rezervacie')
            .insert([
                { 
                    meno: meno, 
                    priezvisko: priezvisko, 
                    email: email, 
                    telefon: telefon,
                    clen_klubu: clen,
                    datum_kurzu: datum,
                    typ_kurzu: typ
                }
            ]);

        if (error) throw error; // Ak je chyba v DB, skočí to do sekcie catch

        // Zobrazenie poďakovania
        // Toto vlož namiesto toho alertu:
const wrapper = document.getElementById('side-content-wrapper');
wrapper.innerHTML = `
    <div style="text-align: center; padding: 40px 20px; animation: fadeIn 0.5s;">
        <i class="fas fa-check-circle" style="font-size: 5rem; color: #8a9a5b; margin-bottom: 25px;"></i>
        <h2 style="color: #fff; margin-bottom: 15px; font-family: 'Rajdhani', sans-serif; text-transform: uppercase;">Rezervácia prijatá</h2>
        
        <p style="color: #ccc; line-height: 1.6; margin-bottom: 20px;">
            Ďakujeme, <strong>${meno}</strong>. Vaše miesto na kurz sme úspešne zaregistrovali.
        </p>

        <div style="background: rgba(138, 154, 91, 0.1); border: 1px solid #8a9a5b; padding: 15px; border-radius: 8px; margin-bottom: 30px; text-align: left;">
            <p style="color: #ddd; font-size: 0.9rem; margin: 0;">
                <i class="fas fa-info-circle" style="color: #8a9a5b; margin-right: 8px;"></i>
                Podrobné informácie k výstroji a <strong>podklady k platbe</strong> sme vám práve odoslali na mail <strong>${email}</strong>.
            </p>
        </div>

        <button onclick="zatvoritDetail()" style="width: 100%; padding: 15px; background: #8a9a5b; color: #fff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase; letter-spacing: 2px;">
            ROZUMIEM
        </button>
    </div>
`;

    } catch (err) {
        console.error("CHYBA:", err);
        alert("Nastal problém: " + err.message);
    }
}
// --- 2. HLAVNÁ FUNKCIA OTVORENIA DETAILU ---
async function otvoritDetail(typKurzu) {
    const modal = document.getElementById('courseModal');
    const textPanel = document.querySelector('.modal-text');
    const infoPanel = document.querySelector('.modal-info-panel');
    

    // 1. VYČISTENIE PANELOV
    textPanel.innerHTML = "";
    infoPanel.innerHTML = "";

    // 2. AKTUALIZÁCIA URL (Pre účely propagácie)
    // Ak niekto klikne na kurz, v adresnom riadku sa zjaví napr. #kurz-zakladny
    window.history.pushState({kurz: typKurzu}, "", "#kurz-" + typKurzu);
    
if (typKurzu === 'domov') {
        // --- OCHRANA OBYDLIA (HOME DEFENCE) ---
        textPanel.innerHTML = `
            <h2 id="modalTitle">Ochrana obydlia (Home Defence)</h2>
            <img src="img/HS-home.webp" class="modal-img-small" alt="Ochrana obydlia">
            
            <div style="background: rgba(138, 154, 91, 0.1); border: 1px solid var(--army-olive); padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                <h3 style="margin: 0; color: var(--army-olive); letter-spacing: 1px;"><i class="fas fa-calendar-plus"></i> NOVÉ TERMÍNY PRIPRAVUJEME</h3>
                <p style="color: #ccc; font-size: 0.9rem; margin-top: 5px;">Aktuálne zostavujeme harmonogram výcvikov na nadchádzajúce obdobie.</p>
            </div>

            <h4><i class="fas fa-bullseye"></i> CIEĽOM KURZU JE:</h4>
            <ul style="margin-bottom: 20px;">
                <li>zvýšiť bezpečnostné povedomie jednotlivca v prostredí vlastného obydlia,</li>
                <li>naučiť účastníkov bezpečne a zákonne reagovať na hrozbu v obydlí,</li>
                <li>zdokonaliť manipuláciu so zbraňou v <strong>defenzívnom a stresovom prostredí</strong>,</li>
                <li>zlepšiť rozhodovanie, orientáciu a sebaovládanie v krízovej situácii.</li>
            </ul>

            <h4><i class="fas fa-users"></i> CIEĽOVÁ SKUPINA:</h4>
            <ul style="margin-bottom: 20px;">
                <li>civilné osoby – držitelia zbrojného preukazu,</li>
                <li>jednotlivci zaujímajúci sa o osobnú a rodinnú bezpečnosť,</li>
                <li>osoby vykonávajúce sebaobranu v rámci zákona.</li>
            </ul>

            <h4><i class="fas fa-book"></i> OBSAH KURZU:</h4>
            <div class="obsah-sekcia"><i class="fas fa-gavel"></i> 
                <div><strong>1. Teoretická časť:</strong> Právny rámec použitia zbrane (nutná obrana, krajná núdza), prevencia a vyhodnocovanie rizík.</div>
            </div>
            <div class="obsah-sekcia">
    <i class="fas fa-shield-alt"></i> 
    <div><strong>2. Taktická príprava (defenzívna):</strong> Bezpečný pohyb v obydlí, práca s krytom a uhlami, ochrana blízkych.</div>
</div>
            <div class="obsah-sekcia"><i class="fas fa-crosshairs"></i> 
                <div><strong>3. Strelecká časť:</strong> Manipulácia v interiéri, streľba v obmedzenom priestore a z defenzívnych pozícií.</div>
            </div>
            <div class="obsah-sekcia"><i class="fas fa-user-shield"></i> 
                <div><strong>4. Modelové situácie:</strong> Narušenie obydlia, reakcia jednotlivca, rozhodovanie (únik vs. obrana) a ukončenie situácie.</div>
            </div>
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
     } else if (typKurzu === 'zakladny') {
    // 1. Definovanie dátumu pre tento konkrétny kurz
    const datumKurzu = "11.04.2026";

    // 2. ZÍSKANIE AKTUÁLNEHO POČTU MIEST Z DATABÁZY
    // (Použijeme pomocnú funkciu, ktorú pridáme nižšie)
    const volneMesta = await zistiVolneMesta(datumKurzu);
    const jePlno = volneMesta <= 0;
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
            <div class="obsah-sekcia"><i class="fas fa-clock"></i> <div><strong>Trvanie:</strong> 4 hodiny</div></div>
            <div class="obsah-sekcia"><i class="fas fa-briefcase"></i> <div><strong>Vybavenie:</strong> Nemáte vlastnú výstroj? Vhodnú zbraň aj pomôcky si môžete vybrať na mieste.</div></div>
            <div class="obsah-sekcia"><i class="fas fa-gun"></i> <div><strong>Strelivo:</strong> Vlastné, alebo možnosť zakúpenia priamo na strelnici.</div></div>
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
                            <span style="display:block;">11. 04. 2026 (Sobota) o 12:00</span>
                            <span style="font-size: 0.8rem; display:block; margin-top: 5px; color: ${volneMesta < 3 ? '#ff4d4d' : '#88b04b'};">
                                Voľné miesta: <strong>${volneMesta} / 10</strong>
                            </span>
                        </div>
                        <button class="btn-rezervovat" 
                                ${jePlno ? 'disabled style="background:#444; color:#888; border-color:#444; cursor:not-allowed;"' : ''}
                                onclick="zobrazitRegistraciu('${datumKurzu}', 'zakladny')">
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
        <span style="color: #8a9a5b; font-weight: bold; font-size: 1.4rem;">70 €</span>
    </div>
    <div style="height: 1px; background: #333; margin: 10px 0;"></div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #aaa; font-size: 0.85rem; text-transform: uppercase;">Bežná cena</span>
        <span style="color: #fff; font-weight: bold; font-size: 1.4rem;">86 €</span>
    </div>
    <p style="text-align: center; font-size: 0.7rem; color: #666; margin: 10px 0 0 0;">Ceny sú uvedené vrátane DPH</p>
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
        <select id="reg-clen" onchange="aktualizujCenuVRegistracii()" style="margin-bottom:15px; width:100%; padding: 8px; background: #111; color: #fff; border: 1px solid #444; border-radius: 4px;">
            <option value="Nie">Nie, nie som členom (86 €)</option>
            <option value="Ano">Áno, som členom ŠK Bellator (70 €)</option>
        </select>

        <div id="cena-v-reg" style="text-align: center; font-weight: bold; font-size: 1.2rem; margin-bottom: 15px; color: var(--army-olive);">
            Cena k úhrade: 86 €
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
function aktualizujCenuVRegistracii() {
    const clen = document.getElementById('reg-clen').value;
    const cenaDisplay = document.getElementById('cena-v-reg');
    if (clen === 'Ano') {
        cenaDisplay.innerText = "Cena k úhrade: 70 €";
    } else {
        cenaDisplay.innerText = "Cena k úhrade: 86 €";
    }

}

async function odoslatFinalnuRezervaciu(datum, typ) {
    // 1. Získanie hodnôt z polí
    const meno = document.getElementById('reg-meno').value.trim();
    const priezvisko = document.getElementById('reg-priezvisko').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const tel = document.getElementById('reg-tel').value.trim();
    const clen = document.getElementById('reg-clen').value;
    const suhlas = document.getElementById('souhlas').checked;

    // 2. Kontrola, či niečo nie je prázdne
    if (!meno || !priezvisko || !email || !tel) {
        alert("⚠️ Prosím, vyplňte všetky povinné polia.");
        return; // Zastaví funkciu
    }

    // 3. Kontrola formátu e-mailu (musí mať @ a bodku)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("⚠️ Zadajte platnú e-mailovú adresu (napr. meno@email.sk).");
        return; // Zastaví funkciu
    }

    // 4. Kontrola telefónu (aspoň 10 číslic, môže začať +)
    // Odstránime medzery pre kontrolu
    const cisteCislo = tel.replace(/\s/g, '');
    const telRegex = /^(\+421|0)9[0-9]{8}$/; // Štandard pre SK čísla
    
    if (!telRegex.test(cisteCislo)) {
        alert("⚠️ Zadajte platné slovenské telefónne číslo (napr. 09xx xxx xxx).");
        return; // Zastaví funkciu
    }

    // 5. Kontrola súhlasu s podmienkami
    if (!suhlas) {
        alert("⚠️ Musíte súhlasiť s podmienkami rezervácie.");
        return; // Zastaví funkciu
    }

    // --- AK KÓD PREŠIEL AŽ SEM, ÚDAJE SÚ SPRÁVNE A MÔŽEME ICH ODOSLAŤ ---
    
    try {
        const { data, error } = await _supabase
            .from('rezervacie')
            .insert([
                { 
                    meno: meno, 
                    priezvisko: priezvisko, 
                    email: email, 
                    telefon: tel, 
                    je_clen: clen === 'Ano',
                    datum_kurzu: datum,
                    typ_kurzu: typ
                }
            ]);

        if (error) throw error;

        alert("✅ Registrácia bola úspešná! Skontrolujte si e-mail.");
        zatvoritDetail();

    } catch (err) {
        console.error("Chyba pri zápise:", err);
        alert("Nepodarilo sa odoslať dáta: " + err.message);
    }

    if (!meno || !priezvisko || !email || !suhlas) {
        alert("Prosím vyplňte všetky povinné údaje.");
        return;
    }

    try {
        console.log("Pripravujem zápis do Supabase pre:", meno);

        // 2. ZÁPIS DO DATABÁZY (tu používame await, aby kód počkal na odpoveď)
        const { data, error } = await _supabase
            .from('rezervacie')
            .insert([
                { 
                    meno: meno, 
                    priezvisko: priezvisko, 
                    email: email, 
                    telefon: telefon,
                    clen_klubu: clen,
                    datum_kurzu: datum,
                    typ_kurzu: typ
                }
            ]);

        // 3. Kontrola, či Supabase nevrátila chybu
        if (error) {
            console.error("Supabase error:", error);
            alert("Chyba v databáze: " + error.message);
            return; // Zastavíme funkciu, aby sa neukázalo poďakovanie
        }

        // 4. Ak všetko prebehlo OK, až vtedy prepíšeme panel
        console.log("Zápis úspešný!");
        
        const wrapper = document.getElementById('side-content-wrapper');
        wrapper.innerHTML = `
            <div style="text-align: center; padding: 40px 10px;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #8a9a5b; margin-bottom: 20px;"></i>
                <h3 style="color: #fff;">Rezervácia úspešná!</h3>
                <p style="color: #ccc;">Ďakujeme, ${meno}. Vaše miesto je rezervované.</p>
                <button onclick="zatvoritDetail()" style="margin-top:20px; padding:10px 20px; background:#8a9a5b; color:#fff; border:none; border-radius:4px; cursor:pointer;">ZAVRIEŤ</button>
            </div>
        `;

    } catch (err) {
        // 5. Zachytenie neočakávaných chýb (napr. zlá URL k Supabase)
        console.error("Kritická chyba:", err);
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
        modal.style.display = "none"; // Skryje celý čierny panel
    }
    document.body.style.overflow = "auto"; // Vráti možnosť skrolovania stránky
    
    // Vyčistíme URL (odstránime #kurz-xxx)
    window.history.pushState({}, "", window.location.pathname);
}
async function zistiVolneMesta(datum) {
    const { count, error } = await _supabase
        .from('rezervacie')
        .select('*', { count: 'exact', head: true })
        .eq('datum_kurzu', datum);

    if (error) {
        console.error("Chyba pri počítaní:", error);
        return 10; // Ak je chyba, vrátime predvolených 10
    }
    
    const maximalnaKapacita = 10;
    return maximalnaKapacita - (count || 0);
}
async function zistiVolneMesta(datum) {
    try {
        const { count, error } = await _supabase
            .from('rezervacie')
            .select('*', { count: 'exact', head: true })
            .eq('datum_kurzu', datum);

        if (error) throw error;

        const maximalnaKapacita = 10;
        return maximalnaKapacita - (count || 0);
    } catch (err) {
        console.error("Chyba pri načítaní kapacity:", err);
        return 10;
    }
}