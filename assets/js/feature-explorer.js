/* ============================================================
   NexaFlow Digital: Feature explorer (service pages)
   Each tab shows a small, hands-on sample of that feature.
   All names and numbers are made-up sample data.
   ============================================================ */
(function () {
  function h(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  var R = {
    /* ---------- Custom Software & Automation ---------- */
    portal: function (el) {
      var roles = {
        Admin: ['Dashboard', 'Clients', 'Invoices', 'Team settings', 'Reports'],
        Staff: ['My jobs', 'Clients', 'Time log'],
        Client: ['My projects', 'Invoices', 'Messages']
      };
      el.innerHTML = '<div class="fx-mini"><div class="fx-row"><span class="fx-muted">Signed in as</span>' +
        '<div class="fx-seg">' + Object.keys(roles).map(function (r, i) { return '<button type="button" aria-pressed="' + (i === 0) + '">' + r + '</button>'; }).join('') + '</div></div>' +
        '<ul class="fx-modules"></ul><p class="fx-note">Each role only sees what it needs.</p></div>';
      function show(r) {
        el.querySelector('.fx-modules').innerHTML = roles[r].map(function (m, i) { return '<li style="animation-delay:' + i * 60 + 'ms"><i class="fas fa-folder"></i>' + m + '</li>'; }).join('');
      }
      el.querySelectorAll('.fx-seg button').forEach(function (b) {
        b.onclick = function () { el.querySelectorAll('.fx-seg button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); show(b.textContent); };
      });
      show('Admin');
    },
    webapp: function (el) {
      var jobs = [['Install, 412 Elm St', 'Scheduled'], ['Repair, 88 Oak Ave', 'In progress'], ['Inspection, 9 Pine Ct', 'Scheduled'], ['Repair, 150 Birch Ln', 'In progress']];
      el.innerHTML = '<div class="fx-mini"><div class="fx-row"><b>Today\'s jobs</b><span class="fx-muted" id="fxDone">0 of 4 done</span></div><ul class="fx-jobs">' +
        jobs.map(function (j) { return '<li><button type="button" data-s="' + j[1] + '"><span>' + j[0] + '</span><em>' + j[1] + '</em></button></li>'; }).join('') +
        '</ul><p class="fx-note">Tap a job to mark it complete.</p></div>';
      var done = 0;
      el.querySelectorAll('.fx-jobs button').forEach(function (b) {
        b.onclick = function () {
          var on = !b.classList.contains('done'); b.classList.toggle('done', on);
          b.querySelector('em').textContent = on ? 'Complete' : b.getAttribute('data-s');
          done += on ? 1 : -1; el.querySelector('#fxDone').textContent = done + ' of 4 done';
        };
      });
    },
    workflow: function (el) {
      el.innerHTML = '<div class="fx-mini"><div class="fx-flow"><div><i class="fas fa-file-alt"></i>Order form</div><div><i class="fas fa-address-book"></i>Client records</div><div><i class="fas fa-file-invoice-dollar"></i>Invoice</div><span class="fx-dot"></span></div>' +
        '<p class="fx-big">Order #2207 synced to 3 systems</p><p class="fx-note">No copy and paste. The same data lands everywhere it belongs.</p>' +
        '<button type="button" class="fx-btn">Send another order</button></div>';
      var n = 2207;
      el.querySelector('.fx-btn').onclick = function () {
        n++; var d = el.querySelector('.fx-dot'); d.style.animation = 'none'; void d.offsetWidth; d.style.animation = '';
        el.querySelector('.fx-big').textContent = 'Order #' + n + ' synced to 3 systems';
      };
    },
    notify: function (el) {
      var steps = [['fa-envelope', 'Day 1', 'Thank-you email sent'], ['fa-bell', 'Day 3', 'Reminder sent: review your proposal'], ['fa-phone-alt', 'Day 7', 'Follow-up call added to Sam\'s task list'], ['fa-check', 'Day 8', 'Client signs, reminders stop']];
      el.innerHTML = '<div class="fx-mini"><b>New lead: Avery Brooks</b><ul class="fx-timeline">' +
        steps.map(function (s, i) { return '<li style="animation-delay:' + (i * 450) + 'ms"><i class="fas ' + s[0] + '"></i><span><em>' + s[1] + '</em>' + s[2] + '</span></li>'; }).join('') +
        '</ul><p class="fx-note">Every follow-up goes out on time, without anyone remembering to send it.</p></div>';
    },
    intake: function (el) {
      var items = ['Client account created', 'Welcome email sent', 'Documents requested', 'Kickoff call booked', 'Team notified'];
      el.innerHTML = '<div class="fx-mini"><div class="fx-row"><b>New client: Lakeview Dental</b><span class="fx-muted">Onboarding</span></div><ul class="fx-checks">' +
        items.map(function (t, i) { return '<li style="animation-delay:' + (i * 380) + 'ms"><i class="fas fa-check-circle"></i>' + t + '</li>'; }).join('') +
        '</ul><p class="fx-note">The same steps, in the same order, every time.</p></div>';
    },
    sheet: function (el) {
      el.innerHTML = '<div class="fx-mini"><div class="fx-seg fx-seg-full"><button type="button" aria-pressed="true">Before</button><button type="button" aria-pressed="false">After</button></div><div class="fx-sheetwrap"></div></div>';
      function before() {
        var rows = [['Client', 'Status', 'Due', 'Notes'], ['Brooks', 'pending??', '3/4', 'call back'], ['Lakeview', 'DONE', '', 'see email'], ['Hill Co', 'pending', '3/9 (moved)', 'ask Sam'], ['Ortiz', '', '3/12', '']];
        return '<table class="fx-sheet">' + rows.map(function (r, i) { return '<tr>' + r.map(function (c) { return i ? '<td>' + c + '</td>' : '<th>' + c + '</th>'; }).join('') + '</tr>'; }).join('') + '</table><p class="fx-note">Version 14 of a file 6 people edit.</p>';
      }
      function after() {
        var c = [['Brooks', 'Waiting on client', 'warn'], ['Lakeview', 'Complete', 'good'], ['Hill Co', 'Due Mar 9', 'info'], ['Ortiz', 'Due Mar 12', 'info']];
        return '<div class="fx-cards">' + c.map(function (x) { return '<div><b>' + x[0] + '</b><span class="fx-chip ' + x[2] + '">' + x[1] + '</span></div>'; }).join('') + '</div><p class="fx-note">1 shared system with statuses, owners, and history.</p>';
      }
      var wrap = el.querySelector('.fx-sheetwrap'); wrap.innerHTML = before();
      el.querySelectorAll('.fx-seg button').forEach(function (b, i) {
        b.onclick = function () { el.querySelectorAll('.fx-seg button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); wrap.innerHTML = i ? after() : before(); };
      });
    },

    /* ---------- Dashboards & Reporting ---------- */
    live: function (el) {
      var k = [['Sales today', 18420, '$'], ['Open orders', 37, ''], ['Avg. rating', 4.8, '']];
      el.innerHTML = '<div class="fx-mini"><div class="fx-row"><b>Operations</b><span class="fx-live"><i></i>Updated <span id="fxAgo">0</span>s ago</span></div><div class="fx-kpis">' +
        k.map(function (x) { return '<div><span>' + x[0] + '</span><b data-to="' + x[1] + '" data-pre="' + x[2] + '">0</b></div>'; }).join('') +
        '</div><svg class="fx-spark" viewBox="0 0 300 70" preserveAspectRatio="none"><polyline points="0,60 30,52 60,55 90,40 120,44 150,30 180,34 210,22 240,26 270,12 300,16"/></svg></div>';
      el.querySelectorAll('[data-to]').forEach(function (b) {
        var to = +b.getAttribute('data-to'), pre = b.getAttribute('data-pre'), t0 = performance.now(), dec = to % 1 ? 1 : 0;
        (function step(t) { var p = Math.min(1, (t - t0) / 900); b.textContent = pre + (to * p).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); if (p < 1) requestAnimationFrame(step); })(t0);
      });
      var s = 0, ago = el.querySelector('#fxAgo');
      var iv = setInterval(function () { if (!document.body.contains(ago)) return clearInterval(iv); s = (s + 1) % 30; ago.textContent = s; }, 1000);
    },
    reports: function (el) {
      el.innerHTML = '<div class="fx-mini fx-mail"><div class="fx-mailhead"><i class="fas fa-envelope-open-text"></i><div><b>Weekly Operations Report</b><span>To: leadership team, Monday 7:00 AM</span></div></div>' +
        '<table class="fx-table"><tr><th>Metric</th><th>This week</th><th>Change</th></tr><tr><td>Revenue</td><td>$46,800</td><td class="up">+8%</td></tr><tr><td>Jobs completed</td><td>164</td><td class="up">+5%</td></tr><tr><td>Past due invoices</td><td>3</td><td class="down">+1</td></tr></table>' +
        '<p class="fx-note">Built and sent on its own every week. Nobody exports anything.</p></div>';
    },
    consolidate: function (el) {
      el.innerHTML = '<div class="fx-mini"><div class="fx-merge"><div class="fx-srcs"><span><i class="fas fa-table"></i>Sales sheet</span><span><i class="fas fa-calendar-alt"></i>Scheduling app</span><span><i class="fas fa-calculator"></i>Accounting</span></div>' +
        '<div class="fx-lines"><i></i><i></i><i></i></div><div class="fx-target"><i class="fas fa-tachometer-alt"></i>1 dashboard</div></div><p class="fx-note">Everyone reads the same numbers from the same place.</p></div>';
    },
    alerts: function (el) {
      el.innerHTML = '<div class="fx-mini"><div class="fx-row"><b>Inventory: Air filters</b><span class="fx-muted">On hand: 42</span></div>' +
        '<label class="fx-label" for="fxTh">Alert me when stock drops below <b id="fxThV">50</b></label><input type="range" id="fxTh" min="10" max="80" value="50" class="fx-range">' +
        '<div class="fx-alert"></div></div>';
      var r = el.querySelector('#fxTh'), out = el.querySelector('.fx-alert');
      function upd() {
        var v = +r.value; el.querySelector('#fxThV').textContent = v;
        out.className = 'fx-alert ' + (42 < v ? 'on' : 'off');
        out.innerHTML = 42 < v ? '<i class="fas fa-bell"></i>Alert sent to Jordan: air filters are at 42, below your limit of ' + v + '.' : '<i class="fas fa-check-circle"></i>No alert. Stock is above your limit.';
      }
      r.oninput = upd; upd();
    },
    goals: function (el) {
      var data = { 'North': [92, 74, 61], 'South': [68, 88, 79] };
      el.innerHTML = '<div class="fx-mini"><div class="fx-row"><b>Q3 goals</b><div class="fx-seg"><button type="button" aria-pressed="true">North</button><button type="button" aria-pressed="false">South</button></div></div><div class="fx-bars"></div></div>';
      var names = ['Revenue goal', 'New clients', 'On-time delivery'];
      function show(loc) {
        el.querySelector('.fx-bars').innerHTML = data[loc].map(function (v, i) { return '<div><span>' + names[i] + '<b>' + v + '%</b></span><i><em style="width:' + v + '%"></em></i></div>'; }).join('');
      }
      el.querySelectorAll('.fx-seg button').forEach(function (b) { b.onclick = function () { el.querySelectorAll('.fx-seg button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); show(b.textContent); }; });
      show('North');
    },
    exports: function (el) {
      el.innerHTML = '<div class="fx-mini"><b>Board report, September</b><div class="fx-files">' +
        [['fa-file-pdf', 'PDF'], ['fa-file-excel', 'Excel'], ['fa-file-csv', 'CSV']].map(function (f) { return '<button type="button"><i class="fas ' + f[0] + '"></i>' + f[1] + '<span>Download</span></button>'; }).join('') +
        '</div><p class="fx-note">Formatted and ready for leadership, boards, and compliance. Try a button.</p></div>';
      el.querySelectorAll('.fx-files button').forEach(function (b) {
        b.onclick = function () { b.classList.add('got'); b.querySelector('span').textContent = 'Ready'; };
      });
    },

    /* ---------- Websites ---------- */
    design: function (el) {
      var themes = [['#1F3B4D', '#E9A23B', 'Warm and established'], ['#14213D', '#3B82F6', 'Modern and sharp'], ['#2F4858', '#86BBA7', 'Calm and welcoming']];
      var i = 0;
      el.innerHTML = '<div class="fx-mini"><div class="fx-site"><div class="fx-site-nav"><b>Oakridge Clinic</b><span>About</span><span>Services</span><span>Contact</span></div><div class="fx-site-hero"><b>Care that fits your schedule</b><em>Book a visit</em></div></div><div class="fx-row"><span class="fx-muted" id="fxTheme"></span><button type="button" class="fx-btn">Try another direction</button></div></div>';
      function apply() {
        var t = themes[i]; var s = el.querySelector('.fx-site');
        s.style.setProperty('--a', t[0]); s.style.setProperty('--b', t[1]); el.querySelector('#fxTheme').textContent = t[2];
      }
      el.querySelector('.fx-btn').onclick = function () { i = (i + 1) % themes.length; apply(); };
      apply();
    },
    mobile: function (el) {
      el.innerHTML = '<div class="fx-mini"><div class="fx-seg fx-seg-full"><button type="button" aria-pressed="true">Phone</button><button type="button" aria-pressed="false">Desktop</button></div>' +
        '<div class="fx-device phone"><div class="fx-site-nav"><b>Oakridge</b><i class="fas fa-bars"></i></div><div class="fx-dev-hero"><b>Care that fits your schedule</b><em>Book a visit</em></div><div class="fx-dev-cols"><span></span><span></span><span></span></div></div></div>';
      var d = el.querySelector('.fx-device');
      el.querySelectorAll('.fx-seg button').forEach(function (b, i) {
        b.onclick = function () { el.querySelectorAll('.fx-seg button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); d.className = 'fx-device ' + (i ? 'desk' : 'phone'); };
      });
    },
    speed: function (el) {
      el.innerHTML = '<div class="fx-mini fx-center"><div class="fx-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"/><circle class="fx-ring-v" cx="60" cy="60" r="50"/></svg><b>96</b></div>' +
        '<p class="fx-big">Example performance score</p><p class="fx-note">Lean code, compressed images, and no page-builder bloat.</p></div>';
    },
    convert: function (el) {
      el.innerHTML = '<div class="fx-mini"><div class="fx-form"><input value="Taylor Morgan" aria-label="Name"><input value="Need a quote for 2 rooms" aria-label="Message"><button type="button" class="fx-btn">Send</button></div><div class="fx-inbox"><span class="fx-muted">Your inbox</span><ul></ul></div></div>';
      var n = 0, names = ['Taylor Morgan', 'Chris Patel', 'Dana Lee', 'Sam Rivera'];
      el.querySelector('.fx-btn').onclick = function () {
        var name = el.querySelector('.fx-form input').value.trim() || names[n % 4];
        el.querySelector('.fx-inbox ul').insertAdjacentHTML('afterbegin', '<li><i class="fas fa-user-plus"></i>New lead: ' + h(name) + '<span>just now</span></li>');
        n++; el.querySelector('.fx-form input').value = names[n % 4];
      };
    },
    seo: function (el) {
      el.innerHTML = '<div class="fx-mini"><div class="fx-search"><i class="fas fa-search"></i><span class="fx-type">family dentist near me</span></div>' +
        '<div class="fx-result"><span>oakridgeclinic.com</span><b>Oakridge Clinic | Family Dentist in Frisco, TX</b><p>Same-week appointments for kids and adults. Most insurance accepted. Book online in 2 minutes.</p></div>' +
        '<p class="fx-note">Page titles, descriptions, and structure set up so search engines can read every page.</p></div>';
    },
    updates: function (el) {
      el.innerHTML = '<div class="fx-mini"><span class="fx-muted">Click the headline and type</span><div class="fx-edit" contenteditable="true" spellcheck="false">Now booking fall appointments</div><div class="fx-saved"><i class="fas fa-check"></i><span>Saved</span></div><p class="fx-note">We set up the editing that fits your team and walk you through it.</p></div>';
      var t, s = el.querySelector('.fx-saved');
      el.querySelector('.fx-edit').oninput = function () { s.classList.remove('on'); clearTimeout(t); t = setTimeout(function () { s.classList.add('on'); }, 500); };
    },

    /* ---------- Branding & Design ---------- */
    identity: function (el) {
      var marks = [['50%', '#1F2A44', '#B08D57'], ['1.2rem', '#14213D', '#3B82F6'], ['0.3rem', '#1D1A2F', '#FF5A36']];
      var i = 0;
      el.innerHTML = '<div class="fx-mini fx-center"><div class="fx-lockup"><span class="fx-mark">PH</span><div><b>Pine &amp; Harbor</b><em>Interior Studio</em></div></div><button type="button" class="fx-btn">See another concept</button></div>';
      function apply() { var m = marks[i], mk = el.querySelector('.fx-mark'); mk.style.borderRadius = m[0]; mk.style.background = m[2]; mk.style.color = '#fff'; el.querySelector('.fx-lockup b').style.color = m[1]; }
      el.querySelector('.fx-btn').onclick = function () { i = (i + 1) % marks.length; apply(); };
      apply();
    },
    guide: function (el) {
      var sw = [['#1F2A44', 'Primary'], ['#B08D57', 'Accent'], ['#F6F1E7', 'Background'], ['#6B6455', 'Text']];
      el.innerHTML = '<div class="fx-mini"><b>Pine &amp; Harbor brand guide</b><div class="fx-swatches">' +
        sw.map(function (s) { return '<button type="button" style="background:' + s[0] + '"><span>' + s[1] + '<br>' + s[0] + '</span></button>'; }).join('') +
        '</div><div class="fx-typeset"><b style="font-family:Georgia,serif">Headings: Serif, bold</b><span>Body: Sans serif, regular, 16px minimum</span></div><p class="fx-note" id="fxCopied">Tap a color to copy its code.</p></div>';
      el.querySelectorAll('.fx-swatches button').forEach(function (b, i) {
        b.onclick = function () { if (navigator.clipboard) navigator.clipboard.writeText(sw[i][0]).catch(function () {}); el.querySelector('#fxCopied').textContent = 'Copied ' + sw[i][0] + ' (' + sw[i][1] + ')'; };
      });
    },
    messaging: function (el) {
      var v = ['We provide quality services for all of your needs.', 'Same-week HVAC repair for homes across Collin County.'];
      el.innerHTML = '<div class="fx-mini"><div class="fx-seg fx-seg-full"><button type="button" aria-pressed="true">Before</button><button type="button" aria-pressed="false">After</button></div><p class="fx-quote"></p><p class="fx-note"></p></div>';
      var notes = ['Could describe any business.', 'Says what, how fast, and where in 1 line.'];
      function show(i) { el.querySelector('.fx-quote').textContent = v[i]; el.querySelector('.fx-note').textContent = notes[i]; }
      el.querySelectorAll('.fx-seg button').forEach(function (b, i) { b.onclick = function () { el.querySelectorAll('.fx-seg button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); show(i); }; });
      show(0);
    },
    decks: function (el) {
      var slides = [['Pine &amp; Harbor', 'Fall 2026 proposal'], ['The problem', '3 showrooms, 0 shared booking system'], ['Our plan', '1 booking flow across every location'], ['Investment', 'Phased over 3 months']];
      var i = 0;
      el.innerHTML = '<div class="fx-mini"><div class="fx-slide"><b></b><span></span></div><div class="fx-row"><button type="button" class="fx-btn fx-ghost" data-d="-1"><i class="fas fa-chevron-left"></i></button><span class="fx-muted" id="fxSlideN"></span><button type="button" class="fx-btn fx-ghost" data-d="1"><i class="fas fa-chevron-right"></i></button></div></div>';
      function show() { var s = el.querySelector('.fx-slide'); s.querySelector('b').innerHTML = slides[i][0]; s.querySelector('span').textContent = slides[i][1]; s.classList.remove('in'); void s.offsetWidth; s.classList.add('in'); el.querySelector('#fxSlideN').textContent = (i + 1) + ' of ' + slides.length; }
      el.querySelectorAll('[data-d]').forEach(function (b) { b.onclick = function () { i = (i + +b.getAttribute('data-d') + slides.length) % slides.length; show(); }; });
      show();
    },
    social: function (el) {
      var posts = [['Now booking', 'Fall consultations', '#B08D57'], ['New project', 'Lakeside kitchen refresh', '#2F5D50'], ['Tip of the week', '3 ways to brighten a small room', '#7A2E3A']];
      var i = 0;
      el.innerHTML = '<div class="fx-mini fx-center"><div class="fx-post"><span class="fx-post-tag"></span><b></b><em>Pine &amp; Harbor</em></div><button type="button" class="fx-btn">Next post</button><p class="fx-note">1 template, many posts, always on brand.</p></div>';
      function show() { var p = el.querySelector('.fx-post'); p.style.background = posts[i][2]; p.querySelector('.fx-post-tag').textContent = posts[i][0]; p.querySelector('b').textContent = posts[i][1]; }
      el.querySelector('.fx-btn').onclick = function () { i = (i + 1) % posts.length; show(); };
      show();
    },
    print: function (el) {
      el.innerHTML = '<div class="fx-mini fx-center"><button type="button" class="fx-card" aria-label="Flip business card"><span class="fx-card-in"><span class="fx-front"><b>Pine &amp; Harbor</b><em>Interior Studio</em></span><span class="fx-back"><b>Morgan Ellis</b><em>Lead Designer</em><small>(555) 010-4471<br>hello@pineandharbor.co</small></span></span></button><p class="fx-note">Tap the card to flip it.</p></div>';
      var c = el.querySelector('.fx-card'); c.onclick = function () { c.classList.toggle('flip'); };
    }
  };

  document.querySelectorAll('.fx').forEach(function (box) {
    var tabs = box.querySelectorAll('.fx-tab');
    var title = box.querySelector('.fx-title'), desc = box.querySelector('.fx-desc'), stage = box.querySelector('.fx-stage');
    function select(i, focus) {
      tabs.forEach(function (t, n) { t.setAttribute('aria-selected', n === i ? 'true' : 'false'); t.tabIndex = n === i ? 0 : -1; });
      var t = tabs[i];
      title.textContent = t.getAttribute('data-title');
      desc.textContent = t.getAttribute('data-desc');
      stage.innerHTML = '';
      var fn = R[t.getAttribute('data-fx')];
      if (fn) fn(stage);
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length, true); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
      });
    });
    select(0);
  });
})();
