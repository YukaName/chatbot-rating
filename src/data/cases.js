export const cases = [
  // #1 Сбер
  { brandRank: 1, brand: 'Сбер', industry: 'Банки', botName: 'Салют (Сбер, Афина, Джой)', developer: 'SberDevices', developerSlug: 'sberdevices', techType: 'Код', botType: 'Виртуальный ассистент', details: 'Голосовой ассистент на ruGPT-3/GigaChat. 50%+ экономия нагрузки на поддержку', source: 'https://developers.sber.ru/docs/ru/salutebot' },
  { brandRank: 1, brand: 'Сбер', industry: 'Банки', botName: 'СберБизнесБот', developer: 'SberDevices', developerSlug: 'sberdevices', techType: 'Конструктор (SaluteBot + Jivo)', botType: 'B2B-конструктор ботов', details: 'Конструктор чат-ботов для бизнеса на платформе Jivo, 20+ готовых шаблонов', source: 'https://sberbs.ru/page/bot' },
  { brandRank: 1, brand: 'Сбер', industry: 'Банки', botName: 'Бот VK + VK Apps СберКот', developer: 'KTS', developerSlug: 'kts', techType: 'Код', botType: 'Маркетинг/Геймификация', details: 'Бот VK и приложения VK Apps из экосистемы СберКот. Маркетинговое приложение Сбер Инвестиции', source: 'https://kts.tech/projects' },

  // #2 Газпром нефть
  { brandRank: 2, brand: 'Газпром нефть', industry: 'Нефть и газ', botName: 'HR-бот адаптации', developer: 'Personik', developerSlug: 'personik', techType: 'Конструктор (Personik)', botType: 'HR', details: 'Бот в Telegram для пребординга/онбординга сотрудников', source: 'https://personik.ai/cases/gazprom_neft' },
  { brandRank: 2, brand: 'Газпром нефть', industry: 'Нефть и газ', botName: 'Лео (обучающий бот)', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Обучение/HR', details: 'Чат-бот для развития эмоционального интеллекта, микрообучение', source: 'https://skillbox.ru/media/corptrain/story-chat-bot-in-gazprom-neft/' },

  // #5 Пятёрочка (X5)
  { brandRank: 5, brand: 'Пятёрочка (X5)', industry: 'Розничная торговля', botName: 'Робот Вера', developer: 'Stafory', developerSlug: 'stafory', techType: 'Код', botType: 'HR', details: 'HR-бот для найма (2017): обзвон + чат-бот WhatsApp/Viber. 16.6к обзвонено, 1.3к согласились на собеседование', source: 'https://vc.ru/flood/25009-pyaterochka-robots' },
  { brandRank: 5, brand: 'Пятёрочка (X5)', industry: 'Розничная торговля', botName: 'X5 Клуб VK бот', developer: 'NC Team', developerSlug: 'nc-team', techType: 'Конструктор (Smartbot Pro)', botType: 'Маркетинг/Лояльность', details: 'Бот в VK для теста ачивок программы лояльности: 25к клиентов, подписчики x3.5, охват с 600 до 2500', source: 'https://www.smartbotpro.ru/blog/kak-my-ispolzovali-instrumenty-marketinga-chtoby-protestirovat-novuyu-fichu' },
  { brandRank: 5, brand: 'Пятёрочка (X5)', industry: 'Розничная торговля', botName: 'Event-бот с ChatGPT', developer: 'Okkam MarTech', developerSlug: 'okkam', techType: 'Код', botType: 'Мероприятия', details: 'Чат-бот с предсказаниями на ChatGPT для бизнес-завтраков X5', source: 'https://www.sostav.ru/publication/kak-vybrat-i-integrirovat-chat-bot-pod-zadachi-biznesa-kejsy-i-rekomendatsii-69204.html' },
  { brandRank: 5, brand: 'Пятёрочка (X5)', industry: 'Розничная торговля', botName: 'Внутр. бот для сотрудников', developer: 'KTS', developerSlug: 'kts', techType: 'Код', botType: 'Внутренние коммуникации', details: 'Чат-бот для коммуникаций сотрудников Пятёрочки', source: '' },
  { brandRank: 5, brand: 'Пятёрочка (X5)', industry: 'Розничная торговля', botName: 'NPS-опрос (TWIN)', developer: 'TWIN', developerSlug: 'twin', techType: 'Конструктор (платформа TWIN)', botType: 'Голосовой бот', details: 'NPS-опросы, в 2 раза сократили затраты', source: 'https://twin24.ai/clients/kak-twin-v-2-raza-sokratil-zatraty-na-nps-oprosy-v-x5-group/' },

  // #6 Магнит
  { brandRank: 6, brand: 'Магнит', industry: 'Розничная торговля', botName: 'HR-бот найма', developer: 'EORA', developerSlug: 'eora', techType: 'Код', botType: 'HR', details: 'Бот в Telegram для автоматизации найма продавцов', source: 'https://eora.ru/cases/chat-boty/hr-bot-dlya-magnit' },
  { brandRank: 6, brand: 'Магнит', industry: 'Розничная торговля', botName: 'Бот для поставщиков', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'B2B-поддержка', details: 'Бот в Telegram для автоматизации коммуникации с поставщиками', source: 'https://www.cnews.ru/news/line/2021-04-28_magnit_zapustil_chatbota' },

  // #7 Яндекс
  { brandRank: 7, brand: 'Яндекс', industry: 'Интернет и технологии', botName: 'Алиса AI', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Виртуальный ассистент', details: 'Голосовой ассистент на YandexGPT (с 2017). 43 млн пользователей/мес. Платформа Яндекс.Диалоги', source: 'https://ru.wikipedia.org/wiki/Алиса_AI' },

  // #8 ВТБ
  { brandRank: 8, brand: 'ВТБ', industry: 'Банки', botName: 'Чат-бот ВТБ Онлайн', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Поддержка клиентов', details: '7 млн+ обращений, 75% без человека, 1800 тем, экономия ~3 млрд ₽/год', source: 'https://www.comnews.ru/content/235007/2024-09-03/2024-w36/1008/otvechayut-roboty-ne-chelovek' },
  { brandRank: 8, brand: 'ВТБ', industry: 'Банки', botName: 'Помощник ВТБ в Алисе', developer: 'Наносемантика', developerSlug: 'nanosemantics', techType: 'Код (Dialog OS)', botType: 'Голосовой ассистент', details: 'Навык в Алисе: оплата сотовой, штрафов, ЖКУ. OAuth 2.0 авторизация', source: 'https://www.vtb.ru/personal/online-servisy/alisa/' },

  // #9 Wildberries
  { brandRank: 9, brand: 'Wildberries', industry: 'Онлайн-торговля', botName: 'Бот «Лина»', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Поддержка клиентов', details: 'Виртуальный помощник на сайте и в приложении', source: 'https://gogov.ru/articles/chat-wildberries' },
  { brandRank: 9, brand: 'Wildberries', industry: 'Онлайн-торговля', botName: 'WBot', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Аналитика для продавцов', details: 'Чат-бот аналитики для продавцов в ЛК (2025, тариф Джем)', source: 'https://www.computerra.ru/321979/wildberries-testiruet-chat-bota-wbot-dlya-prodavtsov/' },

  // #10 Т-Банк
  { brandRank: 10, brand: 'Т-Банк', industry: 'Банки', botName: 'Олег', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Голосовой ассистент + секретарь', details: 'Голосовой помощник (с 2019). 35% автоматизации, ~50 млн ₽/мес экономия. Телефонный секретарь (2021)', source: 'https://ru.wikipedia.org/wiki/Олег_(голосовой_помощник)' },

  // #12 РЖД
  { brandRank: 12, brand: 'РЖД', industry: 'Транспорт', botName: 'Клиентский бот поддержки', developer: 'Voxys', developerSlug: 'voxys', techType: 'Код', botType: 'Поддержка клиентов', details: 'Бот на сайте и в TG: 5000+ обращений/день, 100+ тем, 85% ответов по существу', source: 'https://www.voxys.ru/case/umnyj-chat-bot-podderzhki-rzhd.html' },
  { brandRank: 12, brand: 'РЖД', industry: 'Транспорт', botName: 'ВиКо', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Внутренний IT-помощник', details: 'Внутр. бот (с дек. 2022): информсистемы РЖД, время решения с 13ч до 2мин', source: 'https://rzddigital.ru/projects/evolyutsiya-viko-ot-chat-bota-k-intellektualnomu-pomoshchniku/' },
  { brandRank: 12, brand: 'РЖД', industry: 'Транспорт', botName: 'Голосовой бот ЕИСЦ', developer: 'TWIN', developerSlug: 'twin', techType: 'Конструктор (платформа TWIN)', botType: 'Голосовой бот', details: 'Пассажирский бот ЕИСЦ РЖД, 60%+ обращений без оператора', source: 'https://twin24.ai/clients/kak-naladit-obshhenie-s-passazhirami-bez-privlecheniya-operatorov/' },

  // #13 Ozon
  { brandRank: 13, brand: 'Ozon', industry: 'Онлайн-торговля', botName: 'Чат-бот поддержки Ozon', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код + Конструктор', botType: 'Поддержка клиентов', details: '62% обращений закрывает бот (сотни тысяч тикетов/день). Внутренний no-code конструктор', source: 'https://habr.com/ru/companies/ozontech/articles/677986/' },
  { brandRank: 13, brand: 'Ozon', industry: 'Онлайн-торговля', botName: 'Бот Ozon.travel', developer: 'Just AI + Webim', developerSlug: 'just-ai', techType: 'Код (JAICP + Webim)', botType: 'Поддержка клиентов', details: 'Бот на Just AI + Webim. 40% обращений в чате, в 3р дешевле звонков, CSAT 95%', source: 'https://webim.ru/blog/11954-ozon-travel-case/' },

  // #15 Ростелеком
  { brandRank: 15, brand: 'Ростелеком', industry: 'Телеком', botName: 'Чат-бот поддержки клиентов', developer: 'ЦРТ', developerSlug: 'crt', techType: 'Код', botType: 'Поддержка клиентов', details: '25% обращений, 128 тем, 150+ скриптов, 100 нейросетей, CSI 89%, 5к одновременно', source: 'https://cio.osp.ru/articles/070423-Rostelekom-chat-bot-kotorogo-putayut-s-operatorom' },
  { brandRank: 15, brand: 'Ростелеком', industry: 'Телеком', botName: 'B2B бот для техподдержки', developer: 'AutoFAQ', developerSlug: 'autofaq', techType: 'Код (AutoFAQ)', botType: 'Техподдержка B2B', details: 'Сервис для операторов связи: -3x расходы, 50% без человека', source: 'https://www.company.rt.ru/press/news/d462825' },
  { brandRank: 15, brand: 'Ростелеком', industry: 'Телеком', botName: 'Голосовой бот удержания', developer: 'TWIN', developerSlug: 'twin', techType: 'Конструктор (платформа TWIN)', botType: 'Продажи/Удержание', details: '500 QA-конструкций, 9-13% удержание, 3 версии за 2 мес', source: 'https://twin24.ai/company/news/golosovye-boty-twin-pomogayut-rostelekomu-sohranit-napravlenie-biznesa/' },
  { brandRank: 15, brand: 'Ростелеком', industry: 'Телеком', botName: 'Обучающий бот для продаж', developer: 'Way2Win Group', developerSlug: 'way2win', techType: 'Код', botType: 'HR/Обучение', details: '2000 сотрудников отдела продаж, микрообучение в мессенджере', source: 'https://pro.rbc.ru/demo/618d459a9a79472663c0b38e' },

  // #16 МТС
  { brandRank: 16, brand: 'МТС', industry: 'Телеком', botName: 'Смарти', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Поддержка клиентов', details: 'Чат-бот на NLP: 1 млн обращений/мес, моб. приложение и ЛК', source: 'https://ai-russia.ru/library/mts-chat-bot' },
  { brandRank: 16, brand: 'МТС', industry: 'Телеком', botName: 'Бот для салонов', developer: 'AutoFAQ', developerSlug: 'autofaq', techType: 'Код (AutoFAQ)', botType: 'Внутренняя поддержка', details: 'AutoFAQ в 3400+ салонах: -60% нагрузки на колл-центр, ~50к обращений/мес', source: 'https://autofaq.ai/case/mts' },

  // #18 Альфа-Банк
  { brandRank: 18, brand: 'Альфа-Банк', industry: 'Банки', botName: 'Альфа-Помощник', developer: 'Just AI', developerSlug: 'just-ai', techType: 'Код (JAICP)', botType: 'Поддержка клиентов', details: '40% внутр. разработка + 60% Just AI. Лучший чат-бот России', source: 'https://vc.ru/alfabank/581645-kak-v-alfa-banke-sozdali-chat-bot-kotoryi-ponimaet-i-otvechaet-slovno-chelovek' },
  { brandRank: 18, brand: 'Альфа-Банк', industry: 'Банки', botName: 'AI-агент на GigaChat', developer: 'SberDevices', developerSlug: 'sberdevices', techType: 'Код', botType: 'Поддержка клиентов', details: 'Виртуальный сотрудник на GigaChat (2024) во всех текстовых чатах', source: 'https://bankinform.ru/news/135739' },
  { brandRank: 18, brand: 'Альфа-Банк', industry: 'Банки', botName: 'Боби', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Бизнес-ассистент', details: 'TG-бот на генеративных нейросетях для предпринимателей: идеи, нейминг, логотипы', source: 'https://alfabank.ru/news/t/release/alfa-bank-zapustil-pervogo-biznes-bota-na-osnove-neirosetei/' },

  // #20 Газпромбанк
  { brandRank: 20, brand: 'Газпромбанк', industry: 'Банки', botName: 'HR-бот', developer: 'AutoFAQ', developerSlug: 'autofaq', techType: 'Код (AutoFAQ)', botType: 'Внутренняя поддержка/HR', details: '77% запросов закрывает бот, время ответа с 24ч до 5мин, NPS 73%', source: 'https://www.gazprombank.tech/blog/1010/' },

  // #21 Мегафон
  { brandRank: 21, brand: 'Мегафон', industry: 'Телеком', botName: 'Елена', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Голосовой ассистент + чат-бот', details: 'С 2014 года. 300к обращений/день. Первый голосовой ассистент в России на входящих', source: 'https://corp.megafon.ru/press/news/federalnye_novosti/federal/20240417-1000.html' },
  { brandRank: 21, brand: 'Мегафон', industry: 'Телеком', botName: 'Вика (робот обзвона)', developer: 'Just AI', developerSlug: 'just-ai', techType: 'Код (JAICP)', botType: 'Продажи/обзвон', details: 'Голосовой робот для продаж: 90к абонентов за 3 дня, конверсия как у оператора, -60% затрат', source: 'https://just-ai.com/blog/megafon_robot_vika' },

  // #25 Аэрофлот
  { brandRank: 25, brand: 'Аэрофлот', industry: 'Транспорт', botName: 'Чат-бот на сайте', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Поддержка клиентов', details: 'Пилотная версия с генеративным ИИ (2024): подбор билетов, статус рейса, FAQ', source: 'https://itspeaker.ru/news/aeroflot-sozdal-chat-bot-dlya-obsluzhivaniya-klientov/' },

  // #26 DNS
  { brandRank: 26, brand: 'DNS', industry: 'Розничная торговля', botName: 'Корпоративный HR-бот', developer: 'УЛЕЙ', developerSlug: 'wehive', techType: 'Код', botType: 'HR/Внутренний', details: 'Бот для 1800+ магазинов: адаптация, поиск инфо, интеграция 1С', source: 'https://wehive.digital/projects/dns/' },
  { brandRank: 26, brand: 'DNS', industry: 'Розничная торговля', botName: 'NPS-обзвон бот', developer: 'Just AI', developerSlug: 'just-ai', techType: 'Код (JAICP)', botType: 'Обратная связь', details: 'Автоматизация NPS-обзвонов', source: 'https://just-ai.com/success-stories' },

  // #27 РУСАЛ
  { brandRank: 27, brand: 'РУСАЛ', industry: 'Добыча и металлургия', botName: 'Твой помощник', developer: 'AutoFAQ', developerSlug: 'autofaq', techType: 'Код (AutoFAQ)', botType: 'HR/IT-поддержка', details: 'Поддержка 50К сотрудников в 5 часовых поясах, 49% обращений, x2 скорость', source: 'https://autofaq.ai/case/rusal' },

  // #28 Билайн
  { brandRank: 28, brand: 'Билайн', industry: 'Телеком', botName: 'Чат-бот поддержки', developer: 'ЦРТ', developerSlug: 'crt', techType: 'Код (ChatNavigator)', botType: 'Поддержка клиентов', details: 'Чат-бот на AI/NLP от ЦРТ: сайт, приложение, IVR', source: 'https://www.speechpro.ru/media/news/10-04-2017' },

  // #29 T2 (Tele2)
  { brandRank: 29, brand: 'T2 (Tele2)', industry: 'Телеком', botName: 'Чат-бот поддержки', developer: 'ЦРТ', developerSlug: 'crt', techType: 'Код (ChatNavigator)', botType: 'Поддержка клиентов', details: '420к+ вопросов/мес, 2000 тем, 80% без оператора, 6.7 млн сообщений в 2023', source: 'https://www.speechpro.ru/media/news/11-06-2020' },

  // #37 Дикси
  { brandRank: 37, brand: 'Дикси', industry: 'Розничная торговля', botName: 'Бот клиентской поддержки', developer: 'ChatMe.ai', developerSlug: 'chatme', techType: 'Конструктор (ChatMe.ai)', botType: 'Поддержка клиентов', details: 'TG-бот с NLU: 71% по заказам, 91% довольны. Собран за 1 день на Excel-дереве', source: 'https://chatme.ai/blog/bot-klientskoj-podderzhki-v-telegram-dlya-ritejla/' },

  // #39 М.Видео
  { brandRank: 39, brand: 'М.Видео', industry: 'Розничная торговля', botName: 'Алёна', developer: 'Just AI + edna', developerSlug: 'just-ai', techType: 'Код (JAICP)', botType: 'Поддержка клиентов', details: '98% распознавание, CSI 85%, автоматизация 60% запросов', source: 'https://just-ai.com/success-stories/m-video' },

  // #42 Avito
  { brandRank: 42, brand: 'Avito', industry: 'Интернет и технологии', botName: 'Чат-бот поддержки', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Поддержка клиентов', details: 'Встроенный чат-бот поддержки на сайте и в приложении', source: '' },

  // #43 ВкусВилл
  { brandRank: 43, brand: 'ВкусВилл', industry: 'Розничная торговля', botName: 'AI-бот рецептов', developer: 'NC Team', developerSlug: 'nc-team', techType: 'Конструктор (Smartbot Pro)', botType: 'Маркетинг/Вовлечение', details: 'AI-бот в TG групповом чате: 1500 рецептов, активность x6, 2 недели', source: 'https://www.smartbotpro.ru/blog/keys-vkusvill-razrabotali-ai-bot-dlya-podbora-receptov' },

  // #46 VK
  { brandRank: 46, brand: 'VK (VK Маркет)', industry: 'Интернет и технологии', botName: 'Квиз «Подбери подарок»', developer: 'NC Team', developerSlug: 'nc-team', techType: 'Конструктор (Smartbot Pro)', botType: 'Игровой/Маркетинг', details: 'Игровой квиз для мужской аудитории VK Маркет: 9 вопросов, подбор подарков из каталога', source: 'https://www.smartbotpro.ru/blog/geymifikaciya-v-chat-botah-keysy-formaty-i-stoimost-razrabotki' },
  { brandRank: 46, brand: 'VK (Праздники)', industry: 'Интернет и технологии', botName: 'Чат-бот про организацию праздников', developer: 'KTS', developerSlug: 'kts', techType: 'Код', botType: 'Игровой/Маркетинг', details: 'RPG-механика, рейтинги, таймеры и стикеры', source: 'https://kts.tech/projects?fieldTag=chatbots' },
  { brandRank: 46, brand: 'VK (Video)', industry: 'Интернет и технологии', botName: 'Бот VK Video', developer: 'KTS', developerSlug: 'kts', techType: 'Код', botType: 'Маркетинг', details: 'Данные от партнёра', source: '' },

  // #47 Самокат
  { brandRank: 47, brand: 'Самокат', industry: 'Онлайн-торговля', botName: 'Тамагочи с мини-играми', developer: 'KTS', developerSlug: 'kts', techType: 'Код', botType: 'Маркетинг/Геймификация', details: 'Игра с виртуальной пандой внутри приложения — пользователи растят персонажа и получают призы', source: 'https://kts.tech/projects' },

  // #50 ПИК
  { brandRank: 50, brand: 'ПИК', industry: 'Недвижимость', botName: 'TG-бот поиска квартир', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Продажи', details: 'TG-бот: пользователь вводит стоимость аренды, бот подбирает квартиры с таким же ипотечным платежом', source: '' },

  // #51 КАМАЗ
  { brandRank: 51, brand: 'КАМАЗ', industry: 'Авто', botName: 'КАМАЗ Компас', developer: 'TextBack', developerSlug: 'textback', techType: 'Конструктор (TextBack)', botType: 'Продажи/B2B', details: 'Каталог авто, сортировка лидов, рассылки. 200 лидов на 1 млрд ₽ за месяц', source: 'https://textback.ru/cases/kamaz-kompas-chat-bot-na-milliard-kak-za-mesyacz-poluchit-200-lidov-na-1-milliard-rublej/' },

  // #52 Райффайзен
  { brandRank: 52, brand: 'Райффайзен Банк', industry: 'Банки', botName: 'Виртуальный помощник Рэя', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код (Python 3, ML)', botType: 'Поддержка клиентов', details: '350к+ диалогов/мес, 11 каналов, 80% диалогов с участием бота', source: 'https://trends.rbc.ru/trends/industry/604f3b0e9a794795d700f408' },

  // #57 Золотое яблоко
  { brandRank: 57, brand: 'Золотое яблоко', industry: 'Косметика', botName: 'ИИ-бот Зоя', developer: 'Sherlock Platform', developerSlug: 'sherlock', techType: 'Код (ML + Sherlock)', botType: 'Поддержка клиентов', details: 'ИИ-бот Зоя с аватаром (2026), время реакции 1-2сек (x3). Сотни тысяч диалогов/мес', source: 'https://sherlock.im/goldapple' },

  // #60 Додо Пицца
  { brandRank: 60, brand: 'Додо Пицца', industry: 'Общепит', botName: 'Голосовой бот контакт-центра', developer: 'EORA', developerSlug: 'eora', techType: 'Код (zDialog)', botType: 'Поддержка клиентов (голос)', details: 'Автоматизация контакт-центра с 2018, интеграция с Dodo IS', source: 'https://vc.ru/services/237141-chat-bot-na-million-kak-my-avtomatizirovali-kontakt-centr-dodo-piccy' },
  { brandRank: 60, brand: 'Додо Пицца', industry: 'Общепит', botName: 'Чат в приложении', developer: 'edna', developerSlug: 'edna', techType: 'Код (edna)', botType: 'Поддержка клиентов', details: '100к обращений/мес, 20% закрывает бот, 78% клиентов возвращаются', source: 'https://edna.ru/cases/dodo-pizza/' },
  { brandRank: 60, brand: 'Додо Пицца', industry: 'Общепит', botName: 'Лия (AI-бот)', developer: 'Lia.chat', developerSlug: 'lia-chat', techType: 'Код (Lia.chat)', botType: 'Поддержка клиентов', details: '80% обращений обрабатывает ИИ, сегментация и маршрутизация', source: 'https://lia.chat/dodo' },
  { brandRank: 60, brand: 'Додо Пицца', industry: 'Общепит', botName: 'ВК-бот промокодов', developer: 'BotCreators', developerSlug: 'botcreators', techType: 'Код', botType: 'Маркетинг', details: 'Акция «Кусочек»: 10к клиентов, масштабирование на регионы', source: 'https://botcreators.ru/blog/marketingovyj-bot-dlya-dodo-picca/' },
  { brandRank: 60, brand: 'Додо Пицца', industry: 'Общепит', botName: 'HR-бот найма', developer: 'TWIN', developerSlug: 'twin', techType: 'Конструктор (платформа TWIN)', botType: 'HR', details: '100% автоматизация найма, 9 часовых поясов, 70+ каналов', source: 'https://twin24.ai/clients/kak-twin-boty-sokratili-rutinnuyu-rabotu-i-100-avtomatizirovali-proczess-najma-personala-v-seti-dodo-piczcza/' },

  // #62 Lamoda
  { brandRank: 62, brand: 'Lamoda', industry: 'Онлайн-торговля', botName: 'ИИ-стилист', developer: 'Внутренняя разработка', developerSlug: null, techType: 'Код', botType: 'Продажи/Консультант', details: '17к пользователей за 1 месяц, 70к диалогов. Подбор одежды, стиль, размеры', source: 'https://retail-life.ru/ii-stilist-ot-lamoda/' },

  // #70 Бургер Кинг
  { brandRank: 70, brand: 'Бургер Кинг', industry: 'Общепит', botName: 'Маркетинговые акции', developer: 'KTS', developerSlug: 'kts', techType: 'Код', botType: 'Маркетинг/Геймификация', details: 'Приложение для проведения маркетинговых акций', source: 'https://kts.tech/projects' },

  // #72 Детский мир
  { brandRank: 72, brand: 'Детский мир', industry: 'Розничная торговля', botName: 'Умный бот поддержки', developer: 'Яндекс SupportAI', developerSlug: 'yandex-supportai', techType: 'Код (SupportAI)', botType: 'Поддержка клиентов', details: 'До 80% обращений, 98% не отличают от человека. VK, WhatsApp', source: 'https://helpdeskeddy.ru/obnovlenija/183-quotdetskij-mirquot-vnedril-umnogo-bota-ot-jandekssupportai-v-helpdeskeddy' },

  // #74 S7 Airlines
  { brandRank: 74, brand: 'S7 Airlines', industry: 'Транспорт', botName: 'Чат-бот + навык Алисы', developer: 'EORA', developerSlug: 'eora', techType: 'Код (zDialog)', botType: 'Поддержка/Продажи', details: 'Бот подбора авиабилетов (FB Messenger + Навык Алисы). Нейросети, NLU', source: 'https://eora.ru/cases/s7-navyk-dlya-podbora-aviabiletov' },

  // #79 Почта России
  { brandRank: 79, brand: 'Почта России', industry: 'Логистика', botName: 'Чат-бот в мессенджерах', developer: 'JetStyle', developerSlug: 'jetstyle', techType: 'Код', botType: 'Поддержка клиентов', details: 'Трекинг посылок, FAQ, снижение нагрузки на колл-центр', source: 'https://ruward.ru/cases/1359/' },

  // #85 Совкомбанк
  { brandRank: 85, brand: 'Совкомбанк', industry: 'Банки', botName: 'Катюша', developer: 'Just AI', developerSlug: 'just-ai', techType: 'Код (JAICP)', botType: 'Поддержка клиентов', details: '1 млн обращений/мес. Топ-5 лучших ботов (Naumen 2023). Навык Алисы для Халвы', source: 'https://just-ai.com/blog/tipy-chat-botov-scenarnyi-ai-agent-gibrid' },

  // #90 ПСБ
  { brandRank: 90, brand: 'ПСБ', industry: 'Банки', botName: 'Бизнес-ассистент Катюша', developer: 'BSS', developerSlug: 'bss', techType: 'Код (Digital2Speech + RAG)', botType: 'Чат-банк для бизнеса', details: '40/40 сценариев (лидер Markswebb), RAG x8 ускорение, оплата по QR/фото', source: 'https://bssys.com/about/press-center/newsc/chat-bank-psb-dlya-biznesa-luchshee-primenenie-tekhnologiy-iskusstvennogo-intellekta/' },

  // #95 2ГИС
  { brandRank: 95, brand: '2ГИС', industry: 'Технологии', botName: 'Чат-бот актуализации', developer: 'TWIN', developerSlug: 'twin', techType: 'Конструктор (платформа TWIN)', botType: 'Чат-бот B2B', details: 'Актуализация данных клиентов, +80% эффективность КЦ', source: 'https://twin24.ai/clients/kak-twin-boty-podnyali-effektivnost-koll-centra-2gis-na-80-i-aktualizirovali-dannye-soten-tysyach-klientov/' },

  // #100 Flowwow
  { brandRank: 100, brand: 'Flowwow', industry: 'Онлайн-торговля', botName: 'ИИ-бот поддержки курьеров', developer: 'NC Team', developerSlug: 'nc-team', techType: 'Конструктор (Smartbot Pro)', botType: 'Поддержка курьеров', details: '100% типовых обращений решает ИИ, 24/7, 2 недели', source: 'https://www.smartbotpro.ru/blog/kak-flowwow-avtomatizirovali-podderzhku-dlya-kurerov-s-pomoshchyu-ii' },

  // #11 Росатом
  { brandRank: 11, brand: 'Росатом', industry: 'Энергетика', botName: 'Квест-бот Гринатом', developer: 'SaleBot', developerSlug: 'salebot', techType: 'Конструктор (SaleBot)', botType: 'Геймификация/Внутренний', details: 'Квест-бот для IT-компании Росатома', source: 'https://cases.salebot.pro' },

  // #19 Лента
  { brandRank: 19, brand: 'Лента', industry: 'Розничная торговля', botName: 'TG-бот + веб-апп', developer: 'Kokoc Tech', developerSlug: 'kokoc-tech', techType: 'Код', botType: 'Маркетинг/CRM', details: 'TG-бот: рассылки, бонусная карта, акции', source: 'https://kokoc.tech/case/lenta/' },
];

export const getCasesByBrand = (brand) => cases.filter(c => c.brand === brand);
export const getCasesByDeveloper = (slug) => cases.filter(c => c.developerSlug === slug);

export const industries = [...new Set(cases.map(c => c.industry))].sort();
export const botTypes = [...new Set(cases.map(c => c.botType))].sort();
export const brands = [...new Set(cases.map(c => c.brand))].sort();
