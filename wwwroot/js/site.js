document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Scroll-reveal animation ---------- */
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
            });
        }, { threshold: 0.08 });
        items.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(el); });
    } else {
        items.forEach(function (el) { el.classList.add("show"); });
    }

    /* ---------- Animated counters ---------- */
    document.querySelectorAll("[data-count]").forEach(function (el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        if (isNaN(target) || target === 0) return;
        var start = null;
        function tick(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / 900, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    });

    /* ---------- Registration form: live preview + progress ---------- */
    var form = document.getElementById("registerForm");
    if (form) {
        var f = {
            id: document.getElementById("Id"), name: document.getElementById("Name"),
            email: document.getElementById("Email"), course: document.getElementById("Course"),
            sem: document.getElementById("Semester")
        };
        var pv = {
            id: document.getElementById("pvId"), name: document.getElementById("pvName"),
            email: document.getElementById("pvEmail"), course: document.getElementById("pvCourse"),
            sem: document.getElementById("pvSem")
        };
        var dash = "\u2014";

        function mark(step, done) {
            var s = document.querySelector('.step[data-step="' + step + '"]');
            if (s) s.classList.toggle("done", done);
        }
        function refresh() {
            pv.id.textContent = f.id.value.trim() || dash;
            pv.name.textContent = f.name.value.trim() || "Student Name";
            pv.email.textContent = f.email.value.trim() || "student@email.com";
            pv.course.textContent = f.course.value || dash;
            pv.sem.textContent = f.sem.value ? "Semester " + f.sem.value : dash;
            mark("identity", !!(f.id.value.trim() && f.name.value.trim()));
            mark("contact", f.email.value.trim().indexOf("@") > 0);
            mark("programme", !!(f.course.value && f.sem.value));
        }
        form.addEventListener("input", refresh);
        form.addEventListener("change", refresh);
        refresh();

        /* Reset button: clears values AND validation messages */
        var btn = document.getElementById("resetBtn");
        if (btn) {
            btn.addEventListener("click", function () {
                form.querySelectorAll("input[type=text], input[type=number], input[type=email], input:not([type])")
                    .forEach(function (i) { if (i.name !== "__RequestVerificationToken") i.value = ""; });
                form.querySelectorAll("select").forEach(function (s) { s.selectedIndex = 0; });
                form.querySelectorAll("[data-valmsg-for]").forEach(function (m) { m.textContent = ""; });
                form.querySelectorAll(".input-validation-error").forEach(function (e) { e.classList.remove("input-validation-error"); });
                var summary = form.querySelector("[data-valmsg-summary]");
                if (summary) { summary.classList.add("d-none"); }
                refresh();
            });
        }
    }

    /* ---------- Student list: search + filters ---------- */
    var table = document.getElementById("studentTable");
    if (table) {
        var box = document.getElementById("searchBox");
        var cf = document.getElementById("courseFilter");
        var sf = document.getElementById("semFilter");
        var rows = Array.prototype.slice.call(table.querySelectorAll("tbody tr[data-search]"));
        var none = document.getElementById("noMatchRow");
        var info = document.getElementById("filterInfo");

        function apply() {
            var q = box.value.trim().toLowerCase(), shown = 0;
            rows.forEach(function (r) {
                var ok = (!q || r.dataset.search.indexOf(q) > -1) &&
                         (!cf.value || r.dataset.course === cf.value) &&
                         (!sf.value || r.dataset.sem === sf.value);
                r.classList.toggle("d-none", !ok);
                if (ok) shown++;
            });
            none.classList.toggle("d-none", shown !== 0);
            info.textContent = (shown !== rows.length) ? "(showing " + shown + ")" : "";
        }
        [box, cf, sf].forEach(function (el) { el.addEventListener("input", apply); el.addEventListener("change", apply); });
    }
});
