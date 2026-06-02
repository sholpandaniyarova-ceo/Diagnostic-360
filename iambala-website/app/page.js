'use client';

import { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  ru: {
    nav: {
      mission:   'Миссия',
      programs:  'Программы',
      team:      'Команда',
      contact:   'Контакты',
    },
    hero: {
      foundation: 'Общественный Фонд',
      tagline:    'Каждый ребёнок заслуживает шанса на развитие',
      mission:
        'Мы улучшаем жизнь детей с нарушениями нейроразвития в Центральной Азии — через раннюю диагностику, доказательную реабилитацию и обучение специалистов.',
      cta:        'Узнать больше',
      ctaContact: 'Связаться с нами',
      partners:   'Партнёры и организации',
    },
    mission: {
      sectionLabel: 'Зачем мы существуем',
      title:  'Наша миссия',
      text1:
        'Большинство детей с расстройствами нейроразвития — аутизмом, детским церебральным параличом, задержками развития — в Центральной Азии не имеют доступа к ранней диагностике и доказательной реабилитации.',
      text2:
        'IamBALA работает над изменением этой реальности: мы создаём инфраструктуру помощи — от цифровых инструментов скрининга до мультимодальной реабилитации и обучения врачей.',
      stat1:      '80%',
      stat1Label: 'детей без ранней диагностики',
      stat2:      '1 из 36',
      stat2Label: 'рождается с признаками аутизма',
      stat3:      '72 ч',
      stat3Label: 'критическое окно вмешательства',
    },
    programs: {
      sectionLabel: 'Три направления',
      title:    'Что мы делаем',
      card1: {
        title: 'Прямая реабилитация',
        sub:   'Basqa Development Space',
        text:
          'Мультимодальная терапия: сенсорная интеграция ASI®, рТМС, костюм «Атлант». Индивидуальные программы для детей с РАС, ДЦП и задержками развития в Шымкенте.',
        icon: '🧩',
      },
      card2: {
        title: 'Ранний скрининг',
        sub:   'Diagnostic 360',
        text:
          'Цифровая платформа нейроразвивающего скрининга для педиатров и семей. Оценка 6 доменов развития, автоматический отчёт с маршрутом к специалисту.',
        icon: '🔬',
      },
      card3: {
        title: 'Наращивание потенциала',
        sub:   'Обучение специалистов',
        text:
          'Тренинги для педиатров, неврологов и психологов по доказательным методам ранней интервенции. Сертификация по ASI®, DDST-II, рТМС.',
        icon: '🎓',
      },
    },
    team: {
      sectionLabel:  'Люди за миссией',
      title:         'Наша команда',
      founderName:   'Д-р Шолпан Джаксыбекова',
      founderTitle:  'Основатель · Генеральный директор',
      founderBio:
        'Врач-невролог-нейрофизиолог, более 20 лет клинического опыта. Основатель Basqa Development Space. Член Европейского общества детской неврологии (EPNS). Сертифицированный специалист по сенсорной интеграции ASI®, транскраниальной магнитной стимуляции (рТМС) и денверскому скринингу DDST-II.',
      badges: ['EPNS Member', 'ASI® Certified', 'rTMS Certified', 'DDST-II'],
    },
    contact: {
      sectionLabel:  'Напишите нам',
      title:         'Связаться с нами',
      subtitle:      'Для партнёрств, гранторов и семей',
      emailLabel:    'Email',
      email:         'info@iambala.org',
      locationLabel: 'Локация',
      location:      'Шымкент, Казахстан',
      igLabel:       'Instagram',
      ig:            '@iambala_kz',
      formName:      'Ваше имя',
      formEmail:     'Ваш email',
      formMessage:   'Сообщение',
      formSubmit:    'Отправить сообщение',
      formSuccess:   'Спасибо! Мы свяжемся с вами в ближайшее время.',
    },
    footer: {
      rights:  '© 2024 Общественный Фонд «IamBALA»',
      city:    'Шымкент, Казахстан',
      tagline: 'Меняем жизни детей в Центральной Азии',
    },
  },

  en: {
    nav: {
      mission:  'Mission',
      programs: 'Programs',
      team:     'Team',
      contact:  'Contact',
    },
    hero: {
      foundation: 'Public Foundation',
      tagline:    'Every Child Deserves a Chance to Thrive',
      mission:
        'We improve outcomes for children with neurodevelopmental disorders in Central Asia through early diagnosis, evidence-based rehabilitation, and specialist training.',
      cta:        'Learn More',
      ctaContact: 'Contact Us',
      partners:   'Partners & Organizations',
    },
    mission: {
      sectionLabel: 'Why We Exist',
      title:  'Our Mission',
      text1:
        'The majority of children with neurodevelopmental disorders — autism, cerebral palsy, developmental delays — in Central Asia lack access to early diagnosis and evidence-based rehabilitation.',
      text2:
        'IamBALA is changing this reality by building the infrastructure of care — from digital screening tools to multimodal rehabilitation and physician training.',
      stat1:      '80%',
      stat1Label: 'of children without early diagnosis',
      stat2:      '1 in 36',
      stat2Label: 'children born with signs of autism',
      stat3:      '72 hrs',
      stat3Label: 'critical intervention window',
    },
    programs: {
      sectionLabel: 'Three Pillars',
      title:    'What We Do',
      card1: {
        title: 'Direct Rehabilitation',
        sub:   'Basqa Development Space',
        text:
          'Multimodal therapy: sensory integration ASI®, rTMS, Atlant suit. Individualized programs for children with ASD, cerebral palsy, and developmental delays in Shymkent.',
        icon: '🧩',
      },
      card2: {
        title: 'Early Screening',
        sub:   'Diagnostic 360',
        text:
          'Digital neurodevelopmental screening platform for primary care providers and families. 6-domain assessment with automated specialist referral report.',
        icon: '🔬',
      },
      card3: {
        title: 'Capacity Building',
        sub:   'Specialist Training',
        text:
          'Training programs for pediatricians, neurologists, and psychologists in evidence-based early intervention. Certification in ASI®, DDST-II, and rTMS.',
        icon: '🎓',
      },
    },
    team: {
      sectionLabel:  'People Behind the Mission',
      title:         'Our Team',
      founderName:   'Dr. Sholpan Dzhaksybekova',
      founderTitle:  'Founder · CEO',
      founderBio:
        'Pediatric neurologist-neurophysiologist with 20+ years of clinical experience. Founder of Basqa Development Space. Member of the European Paediatric Neurology Society (EPNS). Certified specialist in sensory integration ASI®, transcranial magnetic stimulation (rTMS), and the Denver Developmental Screening Test (DDST-II).',
      badges: ['EPNS Member', 'ASI® Certified', 'rTMS Certified', 'DDST-II'],
    },
    contact: {
      sectionLabel:  'Get In Touch',
      title:         'Contact Us',
      subtitle:      'For partnerships, grantors & families',
      emailLabel:    'Email',
      email:         'info@iambala.org',
      locationLabel: 'Location',
      location:      'Shymkent, Kazakhstan',
      igLabel:       'Instagram',
      ig:            '@iambala_kz',
      formName:      'Your Name',
      formEmail:     'Your Email',
      formMessage:   'Message',
      formSubmit:    'Send Message',
      formSuccess:   'Thank you! We will be in touch shortly.',
    },
    footer: {
      rights:  '© 2024 IamBALA Public Foundation',
      city:    'Shymkent, Kazakhstan',
      tagline: 'Transforming children\'s lives in Central Asia',
    },
  },

  kz: {
    nav: {
      mission:  'Миссия',
      programs: 'Бағдарламалар',
      team:     'Команда',
      contact:  'Байланыс',
    },
    hero: {
      foundation: 'Қоғамдық Қор',
      tagline:    'Әр баланың дамуға мүмкіндігі болуы керек',
      mission:
        'Біз Орталық Азиядағы нейродаму бұзылыстары бар балалардың нәтижелерін жақсартамыз — ерте диагностика, дәлелді реабилитация және мамандарды оқыту арқылы.',
      cta:        'Толығырақ',
      ctaContact: 'Байланысу',
      partners:   'Серіктестер мен ұйымдар',
    },
    mission: {
      sectionLabel: 'Неге бар болдық',
      title:  'Біздің миссиямыз',
      text1:
        'Орталық Азиядағы нейродаму бұзылыстары бар — аутизм, балалар церебралды сал, дамудың кешігуі — балалардың көпшілігінде ерте диагностика мен дәлелді реабилитацияға қол жетімділік жоқ.',
      text2:
        'IamBALA осы шынайылықты өзгерту үшін жұмыс істейді: цифрлық скрининг құралдарынан бастап мультимодалды реабилитация мен дәрігерлерді оқытуға дейін.',
      stat1:      '80%',
      stat1Label: 'ерте диагностикасыз балалар',
      stat2:      '1/36',
      stat2Label: 'аутизм белгілерімен туылады',
      stat3:      '72 сағ',
      stat3Label: 'интервенцияның критикалық терезесі',
    },
    programs: {
      sectionLabel: 'Үш бағыт',
      title:    'Не істейміз',
      card1: {
        title: 'Тікелей реабилитация',
        sub:   'Basqa Development Space',
        text:
          'Мультимодалды терапия: сенсорлық интеграция ASI®, рТМС, Атлант костюмі. РАС, БЦС және дамудың кешігуі бар балаларға жеке бағдарламалар.',
        icon: '🧩',
      },
      card2: {
        title: 'Ерте скрининг',
        sub:   'Diagnostic 360',
        text:
          'Педиатрлар мен отбасыларға арналған нейродаму скринингінің цифрлық платформасы. 6 даму саласын бағалау, маман жолдамасымен автоматты есеп.',
        icon: '🔬',
      },
      card3: {
        title: 'Мүмкіндіктерді арттыру',
        sub:   'Мамандарды оқыту',
        text:
          'Педиатрлар, неврологтар және психологтар үшін дәлелді ерте интервенция бойынша оқу бағдарламалары. ASI®, DDST-II және рТМС сертификаттау.',
        icon: '🎓',
      },
    },
    team: {
      sectionLabel:  'Миссия артындағы адамдар',
      title:         'Біздің команда',
      founderName:   'Д-р Шолпан Джаксыбекова',
      founderTitle:  'Негізін қалаушы · Бас директор',
      founderBio:
        '20 жылдан астам клиникалық тәжірибесі бар бала невролог-нейрофизиологы. Basqa Development Space негізін қалаушы. Еуропалық педиатриялық неврология қоғамының (EPNS) мүшесі. ASI® сенсорлық интеграция, транскраниалды магниттік стимуляция (рТМС) және DDST-II скринингі бойынша сертификатталған маман.',
      badges: ['EPNS Member', 'ASI® Certified', 'rTMS Certified', 'DDST-II'],
    },
    contact: {
      sectionLabel:  'Хабарласыңыз',
      title:         'Бізбен байланысыңыз',
      subtitle:      'Серіктестіктер, грантторлар және отбасылар үшін',
      emailLabel:    'Email',
      email:         'info@iambala.org',
      locationLabel: 'Мекенжай',
      location:      'Шымкент, Қазақстан',
      igLabel:       'Instagram',
      ig:            '@iambala_kz',
      formName:      'Атыңыз',
      formEmail:     'Email',
      formMessage:   'Хабарлама',
      formSubmit:    'Жіберу',
      formSuccess:   'Рахмет! Сізбен жақын арада байланысамыз.',
    },
    footer: {
      rights:  '© 2024 «IamBALA» Қоғамдық Қоры',
      city:    'Шымкент, Қазақстан',
      tagline: 'Орталық Азиядағы балалардың өмірін өзгертеміз',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HOOK: Intersection Observer fade-in
// ─────────────────────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO MARK  (three overlapping circles — mirrors the brand identity)
// ─────────────────────────────────────────────────────────────────────────────
function LogoMark({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="15" cy="26" r="13" fill="#4DC8D8" fillOpacity="0.92" />
      <circle cx="29" cy="26" r="13" fill="#8DC63F" fillOpacity="0.92" />
      <circle cx="22" cy="14" r="13" fill="#F7941D" fillOpacity="0.88" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
function Header({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    ['mission',  t.nav.mission],
    ['programs', t.nav.programs],
    ['team',     t.nav.team],
    ['contact',  t.nav.contact],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/96 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 focus:outline-none"
            aria-label="Back to top"
          >
            <LogoMark size={40} />
            <div className="leading-tight">
              <div className={`font-display text-lg font-bold transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>
                IamBALA
              </div>
              <div className={`text-xs font-medium transition-colors ${scrolled ? 'text-gray-400' : 'text-white/75'}`}>
                {t.hero.foundation}
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-sm font-medium transition-colors hover:text-brand-teal ${
                  scrolled ? 'text-gray-600' : 'text-white/85'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right: lang switcher + hamburger */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className={`flex rounded-full p-0.5 ${scrolled ? 'bg-gray-100' : 'bg-white/20'}`}>
              {['ru', 'en', 'kz'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                    lang === l
                      ? 'bg-brand-teal text-white shadow-sm'
                      : scrolled
                      ? 'text-gray-500 hover:text-brand-teal'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${
                    scrolled ? 'bg-gray-700' : 'bg-white'
                  } ${menuOpen && i === 0 ? 'rotate-45 translate-y-2' : ''}
                    ${menuOpen && i === 1 ? 'opacity-0 scale-x-0' : ''}
                    ${menuOpen && i === 2 ? '-rotate-45 -translate-y-2' : ''}`}
                />
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="py-2">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block w-full text-left px-6 py-3 text-sm font-medium text-gray-700 hover:text-brand-teal hover:bg-gray-50 transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ t }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#076070] via-[#0e8fa0] to-[#4DC8D8]" />

      {/* Decorative circles — logo motif echoed large in background */}
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-white/[0.04] animate-float-slow" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-[#8DC63F]/10 animate-float" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#F7941D]/10 animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-white/[0.06] animate-float" />

      {/* Large decorative triple-circle — top right, desktop only */}
      <div className="absolute top-16 right-8 opacity-[0.07] hidden lg:block pointer-events-none">
        <svg width="380" height="380" viewBox="0 0 380 380" fill="none" aria-hidden="true">
          <circle cx="130" cy="230" r="120" fill="#FFFFFF" />
          <circle cx="250" cy="230" r="120" fill="#8DC63F" />
          <circle cx="190" cy="120" r="120" fill="#F7941D" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">

          {/* Label chip */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#8DC63F] inline-block" />
            <span className="text-white/90 text-sm font-medium">{t.hero.foundation}</span>
          </div>

          {/* Org name */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-4">
            IamBALA
          </h1>

          {/* Tagline */}
          <p className="text-2xl sm:text-3xl text-white/90 font-light leading-snug mb-7 max-w-2xl">
            {t.hero.tagline}
          </p>

          {/* Mission */}
          <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-2xl">
            {t.hero.mission}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-white text-brand-teal font-semibold rounded-full hover:bg-white/90 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              {t.hero.cta}
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/80 transition-all duration-200 text-center"
            >
              {t.hero.ctaContact}
            </button>
          </div>

          {/* Partner strip */}
          <div className="mt-20 pt-8 border-t border-white/15">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">
              {t.hero.partners}
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {['UNICEF', 'MIT Solve', 'Global Fund for Children', 'EPNS', 'WHO'].map((name) => (
                <span key={name} className="text-white/50 font-semibold text-sm hover:text-white/70 transition-colors">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
        <span className="text-white text-xs tracking-widest uppercase">scroll</span>
        <div className="w-px h-8 bg-white animate-bounce" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MISSION
// ─────────────────────────────────────────────────────────────────────────────
function Mission({ t }) {
  const ref = useFadeIn();

  const stats = [
    { value: t.mission.stat1, label: t.mission.stat1Label, color: '#4DC8D8' },
    { value: t.mission.stat2, label: t.mission.stat2Label, color: '#F7941D' },
    { value: t.mission.stat3, label: t.mission.stat3Label, color: '#8DC63F' },
  ];

  return (
    <section id="mission" className="py-28 bg-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#4DC8D8]/5 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#8DC63F]/5 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-section">

          {/* Section header */}
          <div className="max-w-2xl mx-auto text-center mb-16 stagger-1">
            <p className="inline-flex items-center gap-3 text-brand-teal text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-brand-teal" />
              {t.mission.sectionLabel}
              <span className="w-8 h-px bg-brand-teal" />
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-brand-text">{t.mission.title}</h2>
          </div>

          {/* Two-column content */}
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-20 stagger-2">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">{t.mission.text1}</p>
              <p className="text-gray-600 text-lg leading-relaxed">{t.mission.text2}</p>
            </div>

            {/* Decorative circle motif illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 h-72">
                {/* Three overlapping circles reflecting the logo */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full border-2 border-[#4DC8D8]/30 bg-[#4DC8D8]/10" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full border-2 border-[#8DC63F]/30 bg-[#8DC63F]/10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full border-2 border-[#F7941D]/30 bg-[#F7941D]/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2">👶</div>
                    <div className="text-xs text-gray-400 font-medium">Every child counts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-3">
            {stats.map(({ value, label, color }, i) => (
              <div
                key={i}
                className="text-center p-10 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow duration-300"
                style={{ borderTop: `4px solid ${color}` }}
              >
                <div
                  className="font-display text-5xl font-bold mb-3"
                  style={{ color }}
                >
                  {value}
                </div>
                <div className="text-gray-500 text-sm leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMS
// ─────────────────────────────────────────────────────────────────────────────
function Programs({ t }) {
  const ref = useFadeIn();

  const cards = [
    { ...t.programs.card1, accent: '#4DC8D8', bgLight: 'rgba(77,200,216,0.08)' },
    { ...t.programs.card2, accent: '#8DC63F', bgLight: 'rgba(141,198,63,0.08)' },
    { ...t.programs.card3, accent: '#F7941D', bgLight: 'rgba(247,148,29,0.08)' },
  ];

  return (
    <section id="programs" className="py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-[#4DC8D8]/5 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-[#F7941D]/5 translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-section">

          {/* Section header */}
          <div className="max-w-2xl mx-auto text-center mb-16 stagger-1">
            <p className="inline-flex items-center gap-3 text-brand-teal text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-brand-teal" />
              {t.programs.sectionLabel}
              <span className="w-8 h-px bg-brand-teal" />
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-brand-text">{t.programs.title}</h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8 stagger-2">
            {cards.map((card, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 overflow-hidden cursor-default"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl" style={{ background: card.accent }} />

                {/* Icon bubble */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: card.bgLight }}
                >
                  {card.icon}
                </div>

                {/* Text */}
                <h3 className="font-display text-xl font-bold text-brand-text mb-1">{card.title}</h3>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: card.accent }}>
                  {card.sub}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">{card.text}</p>

                {/* Decorative circle (bottom-right) */}
                <div
                  className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full opacity-[0.08] group-hover:opacity-[0.18] group-hover:scale-125 transition-all duration-500"
                  style={{ background: card.accent }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEAM
// ─────────────────────────────────────────────────────────────────────────────
function Team({ t }) {
  const ref = useFadeIn();
  const badgeColors = ['#4DC8D8', '#8DC63F', '#F7941D', '#F15A29'];

  return (
    <section id="team" className="py-28 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#4DC8D8]/5 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#8DC63F]/5 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-section">

          {/* Section header */}
          <div className="max-w-2xl mx-auto text-center mb-16 stagger-1">
            <p className="inline-flex items-center gap-3 text-brand-teal text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-brand-teal" />
              {t.team.sectionLabel}
              <span className="w-8 h-px bg-brand-teal" />
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-brand-text">{t.team.title}</h2>
          </div>

          {/* Founder card */}
          <div className="flex justify-center stagger-2">
            <div className="group max-w-2xl w-full bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#4DC8D8] to-[#076070] flex items-center justify-center ring-4 ring-[#4DC8D8]/20 group-hover:ring-[#4DC8D8]/40 transition-all">
                    <span className="text-6xl md:text-7xl select-none">👩‍⚕️</span>
                  </div>
                  {/* Verified badge */}
                  <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-[#8DC63F] border-2 border-white flex items-center justify-center text-white text-lg font-bold shadow">
                    ✓
                  </div>
                  {/* Small decorative circles */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#F7941D]/30 animate-float" />
                  <div className="absolute top-1/2 -right-6 w-4 h-4 rounded-full bg-[#4DC8D8]/30 animate-float-slow" />
                </div>

                {/* Info */}
                <div className="text-center md:text-left flex-1">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-text mb-1">
                    {t.team.founderName}
                  </h3>
                  <p className="text-brand-teal font-semibold text-sm mb-5">{t.team.founderTitle}</p>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base mb-6">
                    {t.team.founderBio}
                  </p>

                  {/* Credential badges */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {t.team.badges.map((badge, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                        style={{ background: badgeColors[i] }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────────────────
function Contact({ t }) {
  const ref = useFadeIn();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const contactItems = [
    { icon: '✉️', label: t.contact.emailLabel,    value: t.contact.email,    href: `mailto:${t.contact.email}` },
    { icon: '📍', label: t.contact.locationLabel, value: t.contact.location, href: null },
    { icon: '📸', label: t.contact.igLabel,       value: t.contact.ig,       href: '#' },
  ];

  return (
    <section id="contact" className="py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 -right-16 w-64 h-64 rounded-full bg-[#4DC8D8]/8 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-40 h-40 rounded-full bg-[#F7941D]/5 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-12 left-8 w-20 h-20 rounded-full bg-[#8DC63F]/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-section">

          {/* Section header */}
          <div className="max-w-2xl mx-auto text-center mb-16 stagger-1">
            <p className="inline-flex items-center gap-3 text-brand-teal text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-brand-teal" />
              {t.contact.sectionLabel}
              <span className="w-8 h-px bg-brand-teal" />
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-brand-text mb-3">{t.contact.title}</h2>
            <p className="text-gray-400 text-sm">{t.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 stagger-2">

            {/* Left: info cards */}
            <div className="space-y-5">
              {contactItems.map(({ icon, label, value, href }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#4DC8D8]/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-brand-text font-medium text-sm hover:text-brand-teal transition-colors">
                        {value}
                      </a>
                    ) : (
                      <span className="text-brand-text font-medium text-sm">{value}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-dashed border-[#4DC8D8]/25 bg-gradient-to-br from-[#4DC8D8]/8 to-[#8DC63F]/8 flex flex-col items-center justify-center gap-2 text-gray-400">
                <div className="text-5xl">🗺️</div>
                <div className="text-sm font-medium">Shymkent, Kazakhstan</div>
                <div className="text-xs">42.3417° N, 69.5901° E</div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#8DC63F]/10 flex items-center justify-center text-4xl">
                    ✅
                  </div>
                  <p className="text-brand-text font-semibold text-lg">{t.contact.formSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.formName}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.contact.formName}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-brand-text placeholder-gray-300
                                 focus:border-brand-teal focus:ring-2 focus:ring-[#4DC8D8]/20 transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.formEmail}</label>
                    <input
                      type="email"
                      required
                      placeholder={t.contact.formEmail}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-brand-text placeholder-gray-300
                                 focus:border-brand-teal focus:ring-2 focus:ring-[#4DC8D8]/20 transition-all duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.formMessage}</label>
                    <textarea
                      required
                      rows={5}
                      placeholder={t.contact.formMessage}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-brand-text placeholder-gray-300
                                 focus:border-brand-teal focus:ring-2 focus:ring-[#4DC8D8]/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-teal text-white font-semibold rounded-xl
                               hover:bg-[#3ab8c8] active:bg-[#2ea8b8] transition-all duration-200
                               hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {t.contact.formSubmit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer className="bg-[#0d1f23] text-white py-14 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-1/4 w-36 h-36 rounded-full bg-[#4DC8D8]/8 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-24 h-24 rounded-full bg-[#8DC63F]/8 translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <LogoMark size={42} />
            <div>
              <div className="font-display text-xl font-bold leading-none">IamBALA</div>
              <div className="text-white/40 text-xs mt-0.5">{t.footer.tagline}</div>
            </div>
          </div>

          {/* Rights */}
          <div className="text-center">
            <div className="text-white/40 text-sm">{t.footer.rights}</div>
            <div className="text-white/25 text-xs mt-1">{t.footer.city}</div>
          </div>

          {/* Colour dots */}
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <span>Basqa Development Space</span>
            <div className="flex gap-1 ml-2">
              {['#4DC8D8', '#8DC63F', '#F7941D'].map((c) => (
                <span key={c} className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  const [lang, setLang] = useState('ru');
  const t = T[lang];

  return (
    <main>
      <Header lang={lang} setLang={setLang} t={t} />
      <Hero     t={t} />
      <Mission  t={t} />
      <Programs t={t} />
      <Team     t={t} />
      <Contact  t={t} />
      <Footer   t={t} />
    </main>
  );
}
