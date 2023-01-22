const menu = [
  {
    title: 'Расписание',
    iconName: 'CalendarViewMonthOutlined',
    link: '/',
  },
  {
    title: 'Отчет',
    iconName: 'AssessmentOutlined',
    link: '/report',
  },
  {
    title: 'Касса',
    iconName: 'CurrencyExchange',
    link: '/cashier',
  },
  {
    title: 'Аккаунты',
    iconName: 'People',
    link: '/accounts',
  },
  {
    title: 'Боб Айди',
    iconName: 'Adb',
    link: '/bob-ids',
  },
  {
    title: 'Другое',
    children: [
      {
        title: 'Аффилейты',
        iconName: '',
        link: '/affiliates',
      },
      {
        title: 'Контракты',
        iconName: '',
        link: '/contracts',
      },
      {
        title: 'Мозги',
        iconName: '',
        link: '/brains',
      },
      {
        title: 'Провайдеры прокси',
        iconName: '',
        link: '/proxy-providers',
      },
      {
        title: 'Прокси',
        iconName: '',
        link: '/proxies',
      },
      {
        title: 'Профили',
        iconName: '',
        link: '/profiles',
      },
      {
        title: 'Румы',
        iconName: '',
        link: '/rooms',
      },
      {
        title: 'Сети',
        iconName: '',
        link: '/networks',
      },
    ],
  },
];

export default menu;
