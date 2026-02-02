/**
 * STRELECKÝ KLUB BELLATOR - Rezervačný systém (MODERNÁ VERZIA)
 */

let kapacity = {
    "20.2.2026": 6,
    "12.3.2026": 10
};

function otvoritDetail(typKurzu) {
    const modal = document.getElementById('courseModal');
    const textPanel = document.querySelector('.modal-text');
    const infoPanel = document.querySelector('.modal-info-panel');

    if (typKurzu === 'domov') {
        // 1. NAPLNÍME ĽAVÚ STRANU (TEXT + PODROBNOSTI)
        textPanel.innerHTML = `
            <h2 id="modalTitle">Ochrana obydlia (Home Defence)</h2>
            <img src="img/HS-home.webp" class="modal-img-small" alt="Ochrana obydlia">
            
            <h4><i class="fas fa-bullseye"></i> CIEĽOM KURZU JE:</h4>
            <ul>
                <li>zvýšiť bezpečnostné povedomie jednotlivca v prostredí vlastného obydlia,</li>
                <li>naučiť účastníkov bezpečne a zákonne reagovať na hrozbu v obydlí,</li>
                <li>zdokonaliť manipuláciu so zbraňou v defenzívnom a stresovom prostredí,</li>
                <li>zlepšiť rozhodovanie, orientáciu a sebaovládanie v krízovej situácii.</li>
            </ul>

            <h4><i class="fas fa-users"></i> CIEĽOVÁ SKUPINA:</h4>
            <ul>
                <li>civilné osoby – držitelia zbrojného preukazu,</li>
                <li>jednotlivci zaujímajúci sa o osobnú a rodinnú bezpečnosť,</li>
                <li>osoby vykonávajúce sebaobranu v rámci zákona.</li>
            </ul>

            <h4><i class="fas fa-book"></i> OBSAH KURZU:</h4>
            <div class="obsah-sekcia">
                <i class="fas fa-gavel"></i>
                <div><strong>1. Teoretická časť:</strong> Právny rámec, nutná obrana a krajná núdza, základné bezpečnostné princípy ochrany obydlia.</div>
            </div>
            <div class="obsah-sekcia">
                <i class="fas fa-map-signs"></i>
                <div><strong>2. Taktická príprava (defenzívna):</strong> Bezpečný pohyb v priestore, práca s krytom a uhlami, nízke svetelné podmienky.</div>
            </div>
            <div class="obsah-sekcia">
                <i class="fas fa-crosshairs"></i>
                <div><strong>3. Strelecká časť:</strong> Bezpečná manipulácia v interiéri, streľba v obmedzenom priestore a z defenzívnych pozícií.</div>
            </div>
            <div class="obsah-sekcia">
                <i class="fas fa-bolt"></i>
                <div><strong>4. Modelové situácie:</strong> Narušenie obydlia, rozhodovanie medzi únikom a obranou, ukončenie situácie.</div>
            </div>

            <h4><i class="fas fa-shield-alt"></i> DÔLEŽITÉ INFORMÁCIE</h4>
            <div class="obsah-sekcia"><span><i class="fas fa-check" style="color:var(--army-olive)"></i> Účasť možná <strong>aj bez zbrojného preukazu</strong>.</span></div>
            <div class="obsah-sekcia"><span><i class="fas fa-gun"></i> Prenájom zbrane: 10 €/kurz. Podmienkou je zakúpenie munície u nás.</span></div>
            <div class="obsah-sekcia"><span><i class="fas fa-hand-holding-heart"></i> Prenájom výstroja (puzdro, ochrana sluchu a zraku) je <strong>zdarma</strong>.</span></div>

            <h4><i class="fas fa-credit-card"></i> INFO K REGISTRÁCII</h4>
            <p style="font-size: 0.85rem; color: #aaa; line-height: 1.4;">
                Pre <strong>záväzné zajednanie miesta</strong> je potrebné uhradiť kurzovné ihneď po odoslaní prihlášky. 
                Pri neúčasti sa poplatok presúva ako kredit na váš náhradný termín.
            </p>
        `;

        // 2. NAPLNÍME PRAVÚ STRANU (MODERNÉ KARTY TERMÍNOV)
        infoPanel.innerHTML = `
            <div class="info-box-modern">
                <i class="fas fa-location-dot"></i>
                <span><strong>Miesto výcviku:</strong><br>Strelnica Bellator Trenčín</span>
            </div>
            
            <h4 class="select-title">Dostupné termíny:</h4>
            <div class="terminy-container">
                <div class="termin-card active" onclick="vybratTermin(this, '20.2.2026')">
                    <div class="date">20. Február 2026</div>
                    <div class="time">Piatok o 10:00</div>
                    <div class="slots" id="slots-20-2" style="color: ${kapacity["20.2.2026"] <= 3 ? '#ff4444' : '#8a9a5b'}">
                        Voľné miesta: ${kapacity["20.2.2026"]} / 10
                    </div>
                </div>

                <div class="termin-card" onclick="vybratTermin(this, '12.3.2026')">
                    <div class="date">12. Marec 2026</div>
                    <div class="time">Štvrtok o 10:00</div>
                    <div class="slots" id="slots-12-3" style="color: ${kapacity["12.3.2026"] <= 3 ? '#ff4444' : '#8a9a5b'}">
                        Voľné miesta: ${kapacity["12.3.2026"]} / 10
                    </div>
                </div>
            </div>

            <input type="hidden" id="termin-select" value="20.2.2026">

            <button class="btn-main-modern" onclick="potvrditRezervaciu()">
                <span>POTVRDIŤ REZERVÁCIU</span>
                <i class="fas fa-chevron-right"></i>
            </button>

            <div class="price-tag">120 € <span>vč. DPH</span></div>
        `;

    } else {
        textPanel.innerHTML = "<h2>Pripravujeme...</h2><p>Obsah pre tento kurz momentálne finalizujeme.</p>";
        infoPanel.innerHTML = "";
    }

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// Funkcia na prepínanie vizuálneho výberu termínu
function vybratTermin(element, datum) {
    document.querySelectorAll('.termin-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
    document.getElementById('termin-select').value = datum;
}

function potvrditRezervaciu() {
    const termin = document.getElementById('termin-select').value;
    const textPanel = document.querySelector('.modal-text');
    const infoPanel = document.querySelector('.modal-info-panel');

    textPanel.innerHTML = `
        <h3><i class="fas fa-user-edit"></i> Dokončenie registrácie</h3>
        <p>Kurz: <strong>Ochrana obydlia</strong><br>Termín: <strong>${termin}</strong></p>
        <hr style="border:0; border-top:1px solid #333; margin:20px 0;">
        <div style="text-align:center; padding: 40px 20px;">
            <i class="fas fa-arrow-right" style="font-size: 3rem; color: var(--army-olive); opacity: 0.5;"></i>
            <p style="margin-top:20px;">Vyplňte údaje vpravo pre prechod k platobnej bráne.</p>
        </div>
    `;

    infoPanel.innerHTML = `
        <h4 style="margin-bottom:20px;">Kontaktné údaje</h4>
        <label>Meno a priezvisko</label>
        <input type="text" id="reg-meno" placeholder="napr. Jozef Mrkva">
        
        <label>E-mail</label>
        <input type="email" id="reg-email" placeholder="jozef@email.com">
        
        <label>Telefónne číslo</label>
        <input type="tel" id="reg-tel" placeholder="+421 900 000 000">
        
        <div style="font-size: 0.8rem; color: #888; margin-bottom: 20px; display:flex; gap:10px; align-items:flex-start;">
            <input type="checkbox" id="souhlas" style="width:auto; margin:0;"> 
            <span>Súhlasím so spracovaním údajov a podmienkami kurzu.</span>
        </div>
        
        <button class="btn-main-modern" onclick="odoslatFinalnuRezervaciu('${termin}')">
            <span>ODOSLAŤ A ZAPLATIŤ</span>
            <i class="fas fa-credit-card"></i>
        </button>
        <button onclick="otvoritDetail('domov')" style="background:none; color:#888; border:1px solid #444; margin-top:10px; width:100%; cursor:pointer; padding:10px; border-radius:6px;">SPÄŤ</button>
    `;
}

function odoslatFinalnuRezervaciu(termin) {
    const meno = document.getElementById('reg-meno').value;
    const email = document.getElementById('reg-email').value;
    const suhlas = document.getElementById('souhlas').checked;

    if (!meno || !email || !suhlas) {
        alert("Prosím vyplňte všetky povinné údaje a potvrďte súhlas.");
        return;
    }
    
    kapacity[termin] -= 1;
    alert(`Ďakujeme, ${meno}! Vaša prihláška bola prijatá. Budete presmerovaný k platbe.`);
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