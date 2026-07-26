'use client';

import { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS  (source: org profile 2026, mission/values doc, ERA-KZ grant)
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  ru: {
    nav: { mission: 'Миссия', programs: 'Программы', team: 'Команда', contact: 'Контакты' },
    hero: {
      foundation: 'Общественный Фонд · г. Шымкент, Казахстан',
      identity:   'Я есть · Мен бармын · I am',
      nameNote:   '«bala» — ребёнок (каз.) + «I am» — «Я есть» (англ.)',
      tagline:    '«Я есть, я могу, я нужен»',
      mission:
        'Мы создаём инклюзивное общество, в котором каждый человек — независимо от возраста, способностей или обстоятельств — имеет равный доступ к образованию, развитию, здоровью и достойной жизни.',
      cta: 'Узнать больше', ctaContact: 'Связаться с нами',
      partners: 'Партнёры и грантодатели',
    },
    missionSec: {
      label: 'Зачем мы существуем',
      title: 'Наша миссия',
      text:
        'Мы работаем с детьми с ОВЗ и их семьями, пожилыми людьми, беженцами и всеми, кто оказался в уязвимом положении — не как благотворители, а как партнёры на пути к полноценному участию в жизни общества. Каждый ребёнок имеет право сказать: «Я есть, я могу, я нужен».',
      visionLabel: 'Наше видение к 2028 году',
      vision:
        '«Казахстан, в котором каждый ребёнок знает: «Я есть, я могу, я нужен». ОФ «IamBALA» — признанный национальный фонд, работающий в 5+ городах с 1 000+ благополучателями в год к 2028 году.»',
      stat1: '4',    stat1Label: 'завершённых проекта',
      stat2: '100+', stat2Label: 'прямых благополучателей',
      stat3: '15 000+', stat3Label: 'онлайн-просмотров',
    },
    values: {
      label: 'Что нами движет',
      title: 'Ценности',
      items: [
        { name: 'Достоинство',
          icon: '💛',
          text: 'Каждый человек ценен вне зависимости от способностей и статуса.' },
        { name: 'Инклюзия',
          icon: '🤲',
          text: 'Общество становится сильнее, когда принимает каждого.' },
        { name: 'Доказательность',
          icon: '🔬',
          text: 'Решения, основанные на данных и лучших практиках.' },
        { name: 'Партнёрство',
          icon: '🤝',
          text: 'Семья, специалисты и сообщество работают как единая команда.' },
        { name: 'Расширение возможностей',
          icon: '🚀',
          text: 'Мы не опекаем — мы создаём условия для самостоятельности.' },
        { name: 'Устойчивость',
          icon: '🌱',
          text: 'Долгосрочный эффект важнее быстрого результата.' },
      ],
    },
    programs: {
      label: 'Наш опыт',
      title: 'Реализованные проекты',
      items: [
        { title: 'Творчество без границ',
          sub:  'Инклюзивное творческое пространство',
          text: 'Инклюзивные мастер-классы по живописи, лепке и ДПИ. Смешанные группы — люди с и без ОВЗ вместе. Публичная выставка работ участников.',
          icon: '🎨', accent: '#4DC8D8',
          result: '60 участников · 8 мастер-классов', budget: '1 000 000 ₸' },
        { title: 'Гармония развития',
          sub:  'Обучение и поддержка семей',
          text: 'Образовательные тренинги для родителей по сенсорной интеграции, ABA-терапии, правам семей с особенными детьми и взаимодействию со специалистами.',
          icon: '🤝', accent: '#8DC63F',
          result: '10 обучающих модулей', budget: '705 000 ₸' },
        { title: 'Играя развиваемся',
          sub:  'Видео-инициатива',
          text: 'Обучающие видеоролики по инклюзивным игровым методикам для родителей и специалистов. Открытый бесплатный доступ.',
          icon: '🎬', accent: '#F7941D',
          result: '15 000 просмотров · 12 детей', budget: '430 000 ₸' },
        { title: 'Цифровая инклюзия',
          sub:  'ИИ-грамотность',
          text: 'Онлайн-программа по практическому применению инструментов ИИ для родителей и НПО. PDF-гид «30 дней с ИИ». Охват по всему Казахстану.',
          icon: '💻', accent: '#F15A29',
          result: '25 участников · онлайн', budget: '1 000 000 ₸' },
      ],
    },
    strategy: {
      label: 'Стратегия',
      title: 'Программы 2026–2028',
      subtitle: 'Четыре стратегических направления развития',
      items: [
        { title: 'Инклюзивное образование',
          desc: 'Ранняя помощь детям с ОВЗ, сопровождение семей, центр компетенций по инклюзии.',
          target: '400+ семей / год', icon: '📚' },
        { title: 'Цифровая инклюзия',
          desc: 'ИИ-грамотность, цифровые навыки и ассистивные технологии для детей, родителей и НКО.',
          target: '200+ участников / год', icon: '💻' },
        { title: 'Творчество и арт-инклюзия',
          desc: 'Мастер-классы, арт-терапия, инклюзивные культурные события и выставки.',
          target: '250+ участников / год', icon: '🎨' },
        { title: 'Спорт и активная жизнь',
          desc: 'Адаптивный спорт, инклюзивные лагеря и оздоровительные программы.',
          target: '150+ участников / год', icon: '⚽' },
      ],
      roadmap: [
        { year: '2026', value: '300+', label: 'благополучателей' },
        { year: '2027', value: '600+', label: 'благополучателей' },
        { year: '2028', value: '1 000+', label: 'благополучателей' },
      ],
      funding: 'Источники финансирования',
      funders: ['ГСЗ (акимат)', 'ЭРА-KZ', 'ЮНИСЕФ', 'Soros-KZ', 'Halyk Foundation', 'Kaspi Bank'],
    },
    team: {
      label: 'Люди за миссией',
      title: 'Наша команда',
      members: [
        { name: 'Даниярова Шолпан Бахт-Полатовна',
          title: 'Директор',
          bio: 'Директор Общественного фонда «IamBALA». Руководит всеми программами фонда в области инклюзивного образования, поддержки семей и цифрового развития. Инициатор проектов «Гармония развития» и «Цифровая инклюзия».',
          ig: '@dr.shlpandaniyarova',
          featured: true },
        { name: 'Даниярова Аманкул Жуманазаровна',
          title: 'Учредитель',
          bio: 'Со-основатель ОФ «IamBALA». Участвует в стратегическом развитии фонда и продвижении инклюзивных практик в Казахстане.',
          ig: null, featured: false },
        { name: 'Подольская Татьяна Алымжановна',
          title: 'Учредитель',
          bio: 'Со-основатель ОФ «IamBALA». Поддерживает развитие фонда и его миссию по расширению возможностей для уязвимых групп населения.',
          ig: null, featured: false },
      ],
      regInfo: {
        label: 'Правовая информация',
        date: 'Зарегистрирован: 5 октября 2022 г.',
        bin: 'БИН: 221040005731',
        addr: 'Шымкент, Аль-Фарабийский р-н, ул. Жангельдина 17/2',
      },
    },
    contact: {
      label: 'Напишите нам',
      title: 'Связаться с нами',
      subtitle: 'Открыты для партнёрства, финансирования и сотрудничества',
      emailLabel: 'Email',    email:    'kz.iambala@gmail.com',
      locLabel:   'Адрес',   location: 'г. Шымкент, ул. Жангельдина 17/2',
      igLabel:    'Instagram', ig:      '@workshop_iambala_',
      coop: 'Направления сотрудничества',
      coopItems: ['Грантовая поддержка', 'Корпоративное КСО', 'Экспертиза и методика', 'Волонтёрство'],
      formName: 'Ваше имя', formEmail: 'Ваш email',
      formMsg: 'Сообщение',  formBtn:  'Отправить',
      formOk:  'Спасибо! Мы свяжемся с вами в ближайшее время.',
    },
    footer: {
      quote:   '«Каждый ребёнок имеет право сказать: я есть, я могу, я нужен.»',
      rights:  '© 2022–2026 Общественный Фонд «IamBALA»',
      city:    'г. Шымкент, Казахстан',
      tagline: 'Я есть · Мен бармын · I am',
    },
  },

  en: {
    nav: { mission: 'Mission', programs: 'Programs', team: 'Team', contact: 'Contact' },
    hero: {
      foundation: 'Public Foundation · Shymkent, Kazakhstan',
      identity:   'Я есть · Мен бармын · I am',
      nameNote:   '"bala" — child (Kaz.) + "I am" (Eng.)',
      tagline:    '"I am, I can, I matter"',
      mission:
        'We build an inclusive society where every person — regardless of age, ability, or circumstance — has equal access to education, development, healthcare, and a dignified life.',
      cta: 'Learn More', ctaContact: 'Contact Us',
      partners: 'Partners & Grantors',
    },
    missionSec: {
      label: 'Why We Exist',
      title: 'Our Mission',
      text:
        'We work with children with disabilities and their families, elderly people, refugees, and all those in vulnerable situations — not as benefactors, but as partners toward full participation in society. Every child has the right to say: "I am, I can, I matter."',
      visionLabel: 'Our Vision for 2028',
      vision:
        '"A Kazakhstan where every child knows: «I am, I can, I matter.» IamBALA — a recognized national foundation operating in 5+ cities with 1,000+ beneficiaries per year by 2028."',
      stat1: '4',    stat1Label: 'completed projects',
      stat2: '100+', stat2Label: 'direct beneficiaries',
      stat3: '15,000+', stat3Label: 'online views',
    },
    values: {
      label: 'What drives us',
      title: 'Values',
      items: [
        { name: 'Dignity',
          icon: '💛',
          text: 'Every person is valued regardless of their abilities or status.' },
        { name: 'Inclusion',
          icon: '🤲',
          text: 'Society grows stronger when it welcomes everyone.' },
        { name: 'Evidence-based',
          icon: '🔬',
          text: 'Decisions grounded in data and best practices.' },
        { name: 'Partnership',
          icon: '🤝',
          text: 'Families, specialists and communities work as one team.' },
        { name: 'Empowerment',
          icon: '🚀',
          text: 'We don\'t patronize — we create conditions for independence.' },
        { name: 'Sustainability',
          icon: '🌱',
          text: 'Long-term impact matters more than quick results.' },
      ],
    },
    programs: {
      label: 'Our Track Record',
      title: 'Completed Projects',
      items: [
        { title: 'Creativity Without Limits',
          sub:  'Inclusive Creative Space',
          text: 'Inclusive master classes in painting, sculpture, and applied arts. Mixed groups — people with and without disabilities working together.',
          icon: '🎨', accent: '#4DC8D8',
          result: '60 participants · 8 master classes', budget: '1,000,000 ₸' },
        { title: 'Harmony of Development',
          sub:  'Family Training & Support',
          text: 'Educational trainings for parents on sensory integration, ABA therapy, family rights, and working with specialists.',
          icon: '🤝', accent: '#8DC63F',
          result: '10 training modules', budget: '705,000 ₸' },
        { title: 'Developing Through Play',
          sub:  'Video Initiative',
          text: 'Educational video series on inclusive play-based methods for parents and specialists. Free open access.',
          icon: '🎬', accent: '#F7941D',
          result: '15,000 views · 12 children', budget: '430,000 ₸' },
        { title: 'Digital Inclusion',
          sub:  'AI Literacy',
          text: 'Online program on practical AI tools for parents and NGOs. PDF guide «30 Days with AI». Nationwide reach.',
          icon: '💻', accent: '#F15A29',
          result: '25 participants · online', budget: '1,000,000 ₸' },
      ],
    },
    strategy: {
      label: 'Strategy',
      title: 'Programs 2026–2028',
      subtitle: 'Four strategic directions for development',
      items: [
        { title: 'Inclusive Education',
          desc: 'Early support for children with disabilities, family accompaniment, and an inclusion competency center.',
          target: '400+ families / year', icon: '📚' },
        { title: 'Digital Inclusion',
          desc: 'AI literacy, digital skills, and assistive technologies for children, parents, and NGOs.',
          target: '200+ participants / year', icon: '💻' },
        { title: 'Arts & Culture',
          desc: 'Master classes, art therapy, inclusive cultural events and exhibitions.',
          target: '250+ participants / year', icon: '🎨' },
        { title: 'Sport & Active Life',
          desc: 'Adaptive sports, inclusive camps, and wellness programs.',
          target: '150+ participants / year', icon: '⚽' },
      ],
      roadmap: [
        { year: '2026', value: '300+', label: 'beneficiaries' },
        { year: '2027', value: '600+', label: 'beneficiaries' },
        { year: '2028', value: '1,000+', label: 'beneficiaries' },
      ],
      funding: 'Funding Sources',
      funders: ['State Social Orders', 'ERA-KZ', 'UNICEF', 'Soros-KZ', 'Halyk Foundation', 'Kaspi Bank'],
    },
    team: {
      label: 'People Behind the Mission',
      title: 'Our Team',
      members: [
        { name: 'Sholpan Daniyarova',
          title: 'Director',
          bio: 'Director of IamBALA Public Foundation. Leads all programs in inclusive education, family support, and digital inclusion. Initiator of the "Harmony of Development" and "Digital Inclusion" projects.',
          ig: '@dr.shlpandaniyarova',
          featured: true },
        { name: 'Amankul Daniyarova',
          title: 'Co-Founder',
          bio: 'Co-founder of IamBALA. Involved in strategic development and promotion of inclusive practices in Kazakhstan.',
          ig: null, featured: false },
        { name: 'Tatyana Podolskaya',
          title: 'Co-Founder',
          bio: 'Co-founder of IamBALA. Supports the foundation\'s development and its mission to expand opportunities for vulnerable populations.',
          ig: null, featured: false },
      ],
      regInfo: {
        label: 'Legal Information',
        date: 'Registered: 5 October 2022',
        bin: 'BIN: 221040005731',
        addr: 'Shymkent, Al-Farabi district, Zhangeldin St. 17/2',
      },
    },
    contact: {
      label: 'Get In Touch',
      title: 'Contact Us',
      subtitle: 'Open for partnership, funding, and collaboration',
      emailLabel: 'Email',    email:    'kz.iambala@gmail.com',
      locLabel:   'Address', location: 'Shymkent, Zhangeldin St. 17/2',
      igLabel:    'Instagram', ig:      '@workshop_iambala_',
      coop: 'Ways to Collaborate',
      coopItems: ['Grant Support', 'Corporate CSR', 'Expert Mentoring', 'Volunteering'],
      formName: 'Your Name', formEmail: 'Your Email',
      formMsg: 'Message',    formBtn:  'Send Message',
      formOk:  'Thank you! We will be in touch shortly.',
    },
    footer: {
      quote:   '"Every child has the right to say: I am, I can, I matter."',
      rights:  '© 2022–2026 IamBALA Public Foundation',
      city:    'Shymkent, Kazakhstan',
      tagline: 'Я есть · Мен бармын · I am',
    },
  },

  kz: {
    nav: { mission: 'Миссия', programs: 'Бағдарламалар', team: 'Команда', contact: 'Байланыс' },
    hero: {
      foundation: 'Қоғамдық Қор · Шымкент, Қазақстан',
      identity:   'Я есть · Мен бармын · I am',
      nameNote:   '«bala» — бала (қаз.) + «I am» — «Мен бармын» (ағыл.)',
      tagline:    '«Мен бармын, мен істей аламын, мен керекпін»',
      mission:
        'Біз инклюзивті қоғам қалыптастырамыз — онда әрбір адам жасына, мүмкіндіктеріне немесе жағдайына қарамастан білімге, дамуға, денсаулыққа және лайықты өмірге тең қол жеткізе алады.',
      cta: 'Толығырақ', ctaContact: 'Байланысу',
      partners: 'Серіктестер мен грантодатушылар',
    },
    missionSec: {
      label: 'Неге бар болдық',
      title: 'Біздің миссиямыз',
      text:
        'Біз мүгедектігі бар балалармен және олардың отбасыларымен, қарт адамдармен, босқындармен және барлық осал топтармен жұмыс істейміз — қамқоршылар ретінде емес, қоғамға толыққанды қатысуға жол ашатын серіктестер ретінде.',
      visionLabel: '2028 жылға арналған ой-арманымыз',
      vision:
        'Қазақстан, онда әрбір бала «Мен бармын, мен істей аламын, мен керекпін» деп біледі. «IamBALA» — 2028 жылға қарай 5+ қалада жылына 1 000+ пайдаланушымен жұмыс істейтін мойындалған ұлттық қор.',
      stat1: '4',    stat1Label: 'жүзеге асырылған жоба',
      stat2: '100+', stat2Label: 'тікелей пайдаланушы',
      stat3: '15 000+', stat3Label: 'онлайн-көрініс',
    },
    values: {
      label: 'Бізді не қозғайды',
      title: 'Құндылықтар',
      items: [
        { name: 'Қадір-қасиет',
          icon: '💛',
          text: 'Әрбір адам мүмкіндіктеріне немесе мәртебесіне қарамастан бағалы.' },
        { name: 'Инклюзия',
          icon: '🤲',
          text: 'Қоғам барлығын қабылдаған кезде күшейеді.' },
        { name: 'Дәлелділік',
          icon: '🔬',
          text: 'Шешімдер деректер мен үздік тәжірибелерге негізделеді.' },
        { name: 'Әріптестік',
          icon: '🤝',
          text: 'Отбасы, мамандар және қауымдастық бір команда болып жұмыс істейді.' },
        { name: 'Мүмкіндіктерді кеңейту',
          icon: '🚀',
          text: 'Біз қамқорлық жасамаймыз — тәуелсіздік үшін жағдай жасаймыз.' },
        { name: 'Тұрақтылық',
          icon: '🌱',
          text: 'Ұзақ мерзімді әсер жылдам нәтижеден маңыздырақ.' },
      ],
    },
    programs: {
      label: 'Біздің тәжірибеміз',
      title: 'Жүзеге асырылған жобалар',
      items: [
        { title: 'Шексіз шығармашылық',
          sub:  'Инклюзивті шығармашылық кеңістік',
          text: 'Сурет салу, мүсін және қолданбалы өнер бойынша инклюзивті шеберханалар. Мүгедектігі бар және онсыз адамдар бірге жұмыс істеді.',
          icon: '🎨', accent: '#4DC8D8',
          result: '60 қатысушы · 8 шеберхана', budget: '1 000 000 ₸' },
        { title: 'Дамудың үйлесімдігі',
          sub:  'Отбасыларды оқыту',
          text: 'Сенсорлық интеграция, ABA-терапия, отбасы құқықтары және мамандармен өзара іс-қимыл бойынша тренингтер.',
          icon: '🤝', accent: '#8DC63F',
          result: '10 оқу модулі', budget: '705 000 ₸' },
        { title: 'Ойнай дамимыз',
          sub:  'Бейне бастама',
          text: 'Ата-аналар мен мамандарға арналған инклюзивті ойындық әдістемелер бойынша оқыту бейнероликтері. Тегін ашық қолжетімділік.',
          icon: '🎬', accent: '#F7941D',
          result: '15 000 көрініс · 12 бала', budget: '430 000 ₸' },
        { title: 'Цифрлық инклюзия',
          sub:  'ЖИ-сауаттылық',
          text: 'Ата-аналар мен ҮЕҰ-ларға арналған ЖИ құралдарын практикалық пайдалану бойынша онлайн-бағдарлама. «ЖИ-мен 30 күн» PDF нұсқаулығы.',
          icon: '💻', accent: '#F15A29',
          result: '25 қатысушы · онлайн', budget: '1 000 000 ₸' },
      ],
    },
    strategy: {
      label: 'Стратегия',
      title: '2026–2028 жылдарға арналған бағдарламалар',
      subtitle: 'Дамудың төрт стратегиялық бағыты',
      items: [
        { title: 'Инклюзивті білім беру',
          desc: 'Мүгедектігі бар балаларға ерте көмек, отбасыларды сүйемелдеу, инклюзия бойынша құзыреттілік орталығы.',
          target: 'Жылына 400+ отбасы', icon: '📚' },
        { title: 'Цифрлық инклюзия',
          desc: 'Балалар, ата-аналар және ҮЕҰ-лар үшін ЖИ-сауаттылық, цифрлық дағдылар және ассистивті технологиялар.',
          target: 'Жылына 200+ қатысушы', icon: '💻' },
        { title: 'Шығармашылық және арт-инклюзия',
          desc: 'Шеберханалар, арт-терапия, инклюзивті мәдени іс-шаралар және көрмелер.',
          target: 'Жылына 250+ қатысушы', icon: '🎨' },
        { title: 'Спорт және белсенді өмір',
          desc: 'Бейімдеп алынған спорт, инклюзивті лагерьлер және сауықтыру бағдарламалары.',
          target: 'Жылына 150+ қатысушы', icon: '⚽' },
      ],
      roadmap: [
        { year: '2026', value: '300+', label: 'пайдаланушы' },
        { year: '2027', value: '600+', label: 'пайдаланушы' },
        { year: '2028', value: '1 000+', label: 'пайдаланушы' },
      ],
      funding: 'Қаржыландыру көздері',
      funders: ['МӘТ (Акимат)', 'ЭРА-KZ', 'ЮНИСЕФ', 'Soros-KZ', 'Halyk Foundation', 'Kaspi Bank'],
    },
    team: {
      label: 'Миссия артындағы адамдар',
      title: 'Біздің команда',
      members: [
        { name: 'Даниярова Шолпан Бахт-Полатовна',
          title: 'Директор',
          bio: '«IamBALA» Қоғамдық Қорының директоры. Инклюзивті білім беру, отбасыларды қолдау және цифрлық даму саласындағы барлық бағдарламаларды басқарады.',
          ig: '@dr.shlpandaniyarova',
          featured: true },
        { name: 'Даниярова Аманкул Жуманазаровна',
          title: 'Негізін қалаушы',
          bio: '«IamBALA» Қоғамдық Қорының негізін қалаушы. Қордың стратегиялық дамуына қатысады.',
          ig: null, featured: false },
        { name: 'Подольская Татьяна Алымжановна',
          title: 'Негізін қалаушы',
          bio: '«IamBALA» Қоғамдық Қорының негізін қалаушы. Осал топтардың мүмкіндіктерін кеңейту миссиясын қолдайды.',
          ig: null, featured: false },
      ],
      regInfo: {
        label: 'Құқықтық ақпарат',
        date: 'Тіркелген: 5 қазан 2022 ж.',
        bin: 'БСН: 221040005731',
        addr: 'Шымкент, Әл-Фараби ауданы, Жангелдин к. 17/2',
      },
    },
    contact: {
      label: 'Хабарласыңыз',
      title: 'Бізбен байланысыңыз',
      subtitle: 'Серіктестік, қаржыландыру және ынтымақтастыққа ашықпыз',
      emailLabel: 'Email',    email:    'kz.iambala@gmail.com',
      locLabel:   'Мекенжай', location: 'Шымкент, Жангелдин к. 17/2',
      igLabel:    'Instagram', ig:      '@workshop_iambala_',
      coop: 'Ынтымақтастық бағыттары',
      coopItems: ['Грант қолдауы', 'КӘЖ', 'Сараптамалық қолдау', 'Волонтерлік'],
      formName: 'Атыңыз', formEmail: 'Email',
      formMsg: 'Хабарлама',  formBtn:  'Жіберу',
      formOk:  'Рахмет! Сізбен жақын арада байланысамыз.',
    },
    footer: {
      quote:   '«Әрбір баланың айтуға хақы бар: мен бармын, мен істей аламын, мен керекпін.»',
      rights:  '© 2022–2026 «IamBALA» Қоғамдық Қоры',
      city:    'Шымкент, Қазақстан',
      tagline: 'Я есть · Мен бармын · I am',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO MARK
// ─────────────────────────────────────────────────────────────────────────────
function LogoMark({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="15" cy="26" r="13" fill="#4DC8D8" fillOpacity="0.93" />
      <circle cx="29" cy="26" r="13" fill="#8DC63F" fillOpacity="0.93" />
      <circle cx="22" cy="14" r="13" fill="#F7941D" fillOpacity="0.88" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
function Header({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const goto = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const links = [['mission', t.nav.mission], ['programs', t.nav.programs], ['team', t.nav.team], ['contact', t.nav.contact]];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/96 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 focus:outline-none">
            <LogoMark size={40} />
            <div className="leading-tight">
              <div className={`font-display text-lg font-bold transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>IamBALA</div>
              <div className={`text-[10px] font-medium transition-colors ${scrolled ? 'text-gray-400' : 'text-white/65'}`}>{t.hero.nameNote}</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(([id, label]) => (
              <button key={id} onClick={() => goto(id)}
                className={`text-sm font-medium transition-colors hover:text-brand-teal ${scrolled ? 'text-gray-600' : 'text-white/85'}`}>
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className={`flex rounded-full p-0.5 ${scrolled ? 'bg-gray-100' : 'bg-white/20'}`}>
              {['ru', 'en', 'kz'].map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                    lang === l ? 'bg-brand-teal text-white shadow-sm'
                    : scrolled ? 'text-gray-500 hover:text-brand-teal' : 'text-white/80 hover:text-white'
                  }`}>{l.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none" onClick={() => setOpen(o => !o)}>
              {[0, 1, 2].map((i) => (
                <span key={i} className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-gray-700' : 'bg-white'}
                  ${open && i === 0 ? 'rotate-45 translate-y-2' : ''}
                  ${open && i === 1 ? 'opacity-0 scale-x-0' : ''}
                  ${open && i === 2 ? '-rotate-45 -translate-y-2' : ''}`} />
              ))}
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        {links.map(([id, label]) => (
          <button key={id} onClick={() => goto(id)}
            className="block w-full text-left px-6 py-3 text-sm font-medium text-gray-700 hover:text-brand-teal hover:bg-gray-50 transition-colors">
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ t }) {
  const h = t.hero;
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#065968] via-[#0d8fa0] to-[#4DC8D8]" />
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-white/[0.04] animate-float-slow pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-[#8DC63F]/10 animate-float pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#F7941D]/10 animate-float-slow pointer-events-none" />
      <div className="absolute top-16 right-8 opacity-[0.06] hidden lg:block pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="140" cy="250" r="130" fill="#FFFFFF" />
          <circle cx="260" cy="250" r="130" fill="#8DC63F" />
          <circle cx="200" cy="140" r="130" fill="#F7941D" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
            <LogoMark size={20} />
            <span className="text-white/90 text-sm font-semibold tracking-wide">{h.identity}</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-2">IamBALA</h1>
          <p className="text-white/50 text-xs font-medium mb-2 tracking-wide">{h.nameNote}</p>
          <p className="text-white/55 text-xs mb-6 tracking-wide">{h.foundation}</p>

          <p className="text-2xl sm:text-3xl text-white/90 font-light leading-snug mb-7 max-w-xl">{h.tagline}</p>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-2xl">{h.mission}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-white text-brand-teal font-semibold rounded-full hover:bg-white/90 transition-all hover:shadow-xl hover:-translate-y-0.5 text-center">
              {h.cta}
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/80 transition-all text-center">
              {h.ctaContact}
            </button>
          </div>

          <div className="mt-20 pt-8 border-t border-white/15">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">{h.partners}</p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {['ERA-KZ', 'UNICEF', 'Soros-KZ', 'Halyk Foundation', 'Арман Алана', 'АРДИ'].map((n) => (
                <span key={n} className="text-white/50 font-semibold text-sm hover:text-white/70 transition-colors">{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 pointer-events-none">
        <span className="text-white text-[10px] tracking-widest uppercase">scroll</span>
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
  const m = t.missionSec;
  return (
    <section id="mission" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#4DC8D8]/5 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#8DC63F]/5 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-section">
          <div className="max-w-2xl mx-auto text-center mb-16 stagger-1">
            <p className="inline-flex items-center gap-3 text-brand-teal text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-brand-teal" />{m.label}<span className="w-8 h-px bg-brand-teal" />
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-brand-text">{m.title}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 items-start mb-16 stagger-2">
            <div className="space-y-6">
              <blockquote className="text-gray-700 text-lg leading-relaxed border-l-4 border-brand-teal pl-6">
                {m.text}
              </blockquote>
              <div className="bg-gradient-to-br from-[#4DC8D8]/8 to-[#8DC63F]/8 rounded-2xl p-6 border border-[#4DC8D8]/15">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-3">{m.visionLabel}</p>
                <p className="text-gray-600 leading-relaxed text-sm italic">{m.vision}</p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 flex-shrink-0">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-[#4DC8D8]/30 bg-[#4DC8D8]/8" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-[#8DC63F]/30 bg-[#8DC63F]/8" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border-2 border-[#F7941D]/30 bg-[#F7941D]/8" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-1">
                  <div className="text-5xl">👨‍👩‍👧‍👦</div>
                  <div className="text-xs text-gray-400 font-semibold px-6">Я есть · Мен бармын · I am</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-3">
            {[
              { v: m.stat1, l: m.stat1Label, c: '#4DC8D8' },
              { v: m.stat2, l: m.stat2Label, c: '#F7941D' },
              { v: m.stat3, l: m.stat3Label, c: '#8DC63F' },
            ].map(({ v, l, c }, i) => (
              <div key={i} className="text-center p-10 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow" style={{ borderTop: `4px solid ${c}` }}>
                <div className="font-display text-5xl font-bold mb-3" style={{ color: c }}>{v}</div>
                <div className="text-gray-500 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VALUES
// ─────────────────────────────────────────────────────────────────────────────
function Values({ t }) {
  const ref = useFadeIn();
  const v = t.values;
  const accents = ['#4DC8D8', '#8DC63F', '#F7941D', '#F15A29', '#4DC8D8', '#8DC63F'];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-1/3 w-48 h-48 rounded-full bg-[#4DC8D8]/5 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-section">
          <div className="max-w-2xl mx-auto text-center mb-14 stagger-1">
            <p className="inline-flex items-center gap-3 text-brand-teal text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-brand-teal" />{v.label}<span className="w-8 h-px bg-brand-teal" />
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-brand-text">{v.title}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-2">
            {v.items.map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${accents[i]}18` }}>
                  {item.icon}
                </div>
                <h3 className="font-display text-base font-bold text-brand-text mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: accents[i] }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMS (completed projects)
// ─────────────────────────────────────────────────────────────────────────────
function Programs({ t }) {
  const ref = useFadeIn();
  const p = t.programs;

  return (
    <section id="programs" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute -top-12 right-0 w-64 h-64 rounded-full bg-[#4DC8D8]/5 translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-section">
          <div className="max-w-2xl mx-auto text-center mb-16 stagger-1">
            <p className="inline-flex items-center gap-3 text-brand-teal text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-brand-teal" />{p.label}<span className="w-8 h-px bg-brand-teal" />
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-brand-text">{p.title}</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 stagger-2">
            {p.items.map((card, i) => (
              <div key={i}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl" style={{ background: card.accent }} />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${card.accent}14` }}>
                  {card.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-brand-text mb-1">{card.title}</h3>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: card.accent }}>{card.sub}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{card.text}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-400">
                  <span className="font-semibold">{card.result}</span>
                  <span className="font-bold" style={{ color: card.accent }}>{card.budget}</span>
                </div>
                <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-125 transition-all duration-500"
                  style={{ background: card.accent }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STRATEGY 2026–2028
// ─────────────────────────────────────────────────────────────────────────────
function Strategy({ t }) {
  const ref = useFadeIn();
  const s = t.strategy;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Teal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#065968] to-[#0d8fa0]" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/[0.04] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-[#8DC63F]/10 animate-float pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-section">

          <div className="max-w-2xl mx-auto text-center mb-16 stagger-1">
            <p className="inline-flex items-center gap-3 text-white/60 text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-white/40" />{s.label}<span className="w-8 h-px bg-white/40" />
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-3">{s.title}</h2>
            <p className="text-white/60 text-sm">{s.subtitle}</p>
          </div>

          {/* 4 program cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 stagger-2">
            {s.items.map((item, i) => {
              const colors = ['#4DC8D8', '#8DC63F', '#F7941D', '#F15A29'];
              return (
                <div key={i} className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-display text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-4">{item.desc}</p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: `${colors[i]}50` }}>
                    🎯 {item.target}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Growth roadmap */}
          <div className="grid grid-cols-3 gap-4 mb-12 stagger-3">
            {s.roadmap.map((r, i) => (
              <div key={i} className="text-center bg-white/10 rounded-2xl p-6 border border-white/10">
                <div className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">{r.year}</div>
                <div className="font-display text-4xl font-bold text-white mb-1">{r.value}</div>
                <div className="text-white/55 text-xs">{r.label}</div>
              </div>
            ))}
          </div>

          {/* Funders */}
          <div className="text-center stagger-3">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">{s.funding}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {s.funders.map((f) => (
                <span key={f} className="text-white/55 font-semibold text-sm hover:text-white/80 transition-colors">{f}</span>
              ))}
            </div>
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
  const tm = t.team;
  const [featured, ...others] = tm.members;

  return (
    <section id="team" className="py-28 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#4DC8D8]/5 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-section">
          <div className="max-w-2xl mx-auto text-center mb-16 stagger-1">
            <p className="inline-flex items-center gap-3 text-brand-teal text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-brand-teal" />{tm.label}<span className="w-8 h-px bg-brand-teal" />
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-brand-text">{tm.title}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 stagger-2">
            {/* Director — featured */}
            <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#4DC8D8] to-[#065968] flex items-center justify-center ring-4 ring-[#4DC8D8]/20 group-hover:ring-[#4DC8D8]/40 transition-all">
                    <span className="text-5xl select-none">👩‍💼</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#8DC63F] border-2 border-white flex items-center justify-center text-white font-bold shadow">✓</div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-display text-xl font-bold text-brand-text mb-0.5">{featured.name}</h3>
                  <p className="text-brand-teal font-semibold text-sm mb-4">{featured.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{featured.bio}</p>
                  {featured.ig && (
                    <a href="#" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-brand-teal transition-colors">
                      <span>📸</span>{featured.ig}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {others.map((m, i) => (
                <div key={i} className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl select-none">{['👩', '👩‍💻'][i]}</span>
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-brand-text mb-0.5">{m.name}</h4>
                    <p className="text-xs font-semibold text-brand-orange mb-2">{m.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              ))}

              {/* Legal info */}
              <div className="rounded-2xl p-5 bg-gradient-to-br from-[#4DC8D8]/8 to-[#8DC63F]/8 border border-[#4DC8D8]/15 space-y-1.5">
                <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2">{tm.regInfo.label}</p>
                {[tm.regInfo.date, tm.regInfo.bin, tm.regInfo.addr].map((line, i) => (
                  <p key={i} className="text-gray-600 text-xs">{['📅', '🔢', '📍'][i]} {line}</p>
                ))}
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
  const c = t.contact;
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);

  const items = [
    { icon: '✉️', label: c.emailLabel,  value: c.email,    href: `mailto:${c.email}` },
    { icon: '📍', label: c.locLabel,    value: c.location, href: null },
    { icon: '📸', label: c.igLabel,     value: c.ig,       href: '#' },
  ];

  return (
    <section id="contact" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 -right-16 w-64 h-64 rounded-full bg-[#4DC8D8]/6 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="fade-section">
          <div className="max-w-2xl mx-auto text-center mb-16 stagger-1">
            <p className="inline-flex items-center gap-3 text-brand-teal text-xs font-bold uppercase tracking-widest mb-5">
              <span className="w-8 h-px bg-brand-teal" />{c.label}<span className="w-8 h-px bg-brand-teal" />
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-brand-text mb-3">{c.title}</h2>
            <p className="text-gray-400 text-sm">{c.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 stagger-2">
            <div className="space-y-4">
              {items.map(({ icon, label, value, href }, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#4DC8D8]/10 flex items-center justify-center text-2xl flex-shrink-0">{icon}</div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</div>
                    {href
                      ? <a href={href} className="text-brand-text font-medium text-sm hover:text-brand-teal transition-colors">{value}</a>
                      : <span className="text-brand-text font-medium text-sm">{value}</span>}
                  </div>
                </div>
              ))}

              {/* Cooperation directions */}
              <div className="p-5 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{c.coop}</p>
                <div className="flex flex-wrap gap-2">
                  {c.coopItems.map((item, i) => {
                    const cols = ['#4DC8D8', '#8DC63F', '#F7941D', '#F15A29'];
                    return (
                      <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ background: cols[i] }}>{item}</span>
                    );
                  })}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="w-full h-44 rounded-2xl border-2 border-dashed border-[#4DC8D8]/25 bg-gradient-to-br from-[#4DC8D8]/6 to-[#8DC63F]/6 flex flex-col items-center justify-center gap-2 text-gray-400">
                <div className="text-4xl">🗺️</div>
                <div className="text-sm font-medium">Shymkent, Kazakhstan</div>
                <div className="text-xs">ул. Жангельдина 17/2</div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#8DC63F]/10 flex items-center justify-center text-4xl">✅</div>
                  <p className="text-brand-text font-semibold text-lg">{c.formOk}</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                  {[['name', c.formName, 'text'], ['email', c.formEmail, 'email']].map(([key, label, type]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                      <input type={type} required placeholder={label} value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white text-brand-text placeholder-gray-300 focus:border-brand-teal focus:ring-2 focus:ring-[#4DC8D8]/20 transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{c.formMsg}</label>
                    <textarea required rows={5} placeholder={c.formMsg} value={form.msg}
                      onChange={(e) => setForm({ ...form, msg: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white text-brand-text placeholder-gray-300 focus:border-brand-teal focus:ring-2 focus:ring-[#4DC8D8]/20 transition-all resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full py-3.5 bg-brand-teal text-white font-semibold rounded-xl hover:bg-[#3ab8c8] transition-all hover:shadow-lg hover:-translate-y-0.5">
                    {c.formBtn}
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
  const f = t.footer;
  return (
    <footer className="bg-[#0d1f23] text-white py-14 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-36 h-36 rounded-full bg-[#4DC8D8]/8 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-white/35 text-sm italic">{f.quote}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <LogoMark size={40} />
            <div>
              <div className="font-display text-xl font-bold">IamBALA</div>
              <div className="text-white/40 text-xs">{f.tagline}</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-white/40 text-sm">{f.rights}</div>
            <div className="text-white/25 text-xs mt-1">{f.city}</div>
          </div>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <span>kz.iambala@gmail.com</span>
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
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  const [lang, setLang] = useState('ru');
  const t = T[lang];
  return (
    <main>
      <Header   lang={lang} setLang={setLang} t={t} />
      <Hero     t={t} />
      <Mission  t={t} />
      <Values   t={t} />
      <Programs t={t} />
      <Strategy t={t} />
      <Team     t={t} />
      <Contact  t={t} />
      <Footer   t={t} />
    </main>
  );
}
