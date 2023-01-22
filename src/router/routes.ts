const routes = {
  accounts: {
    index: '/accounts',
    show: '/accounts/:id',
    edit: '/accounts/:id/edit',
    create: '/accounts/:id/edit',
  },
  bobIds: {
    index: '/bob-ids',
    show: '/bob-ids/:id',
    edit: '/bob-ids/:id/edit',
    create: '/bob-ids/:id/edit',
  },
  cashier: { index: '/cashier' },
  home: '/',
  login: '/login',
  networks: {
    index: '/networks',
    show: '/networks/:id',
    edit: '/networks/:id/edit',
    create: '/networks/:id/edit',
  },
  contracts: {
    index: '/contracts',
  },
  profiles: {
    index: '/profiles',
  },
  report: {
    index: '/report',
  },
  rooms: {
    index: '/rooms',
    show: '/rooms/:id',
    edit: '/rooms/:id/edit',
    create: '/rooms/:id/edit',
  },
};

export default routes;
