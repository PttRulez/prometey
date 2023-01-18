import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/home/HomePage';
import TimeTable from '../pages/timetable/TimeTable';
import Report from '../pages/report/Report';
import NotExist from '../pages/NotExist/NotExist';
import Cashier from '../pages/cashier/Cashier';
import Accounts from '../pages/accounts/Accounts';
import BobIds from '../pages/bob-ids/BobIds';
import Networks from '../pages/networks/Networks';
import Login from '../pages/login/Login';
import Auth from '../components/Auth';
import routes from './routes';
import SingleNetwork from '../pages/networks/SingleNetwork';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<Auth />}>
            <Route path={routes.login} element={<Login />} />
            <Route index element={<TimeTable />} />
            {/* <Route path='timetable' element={<TimeTable />} /> */}
            <Route path={routes.accounts.index} element={<Accounts />} />
            <Route path={routes.bobIds.index} element={<BobIds />} />
            <Route path={routes.cashier.index} element={<Cashier />} />
            <Route path={routes.networks.index} element={<Networks />} />
            <Route path={routes.networks.show} element={<SingleNetwork />} />
            <Route path={routes.report.index} element={<Report />} />

            <Route path='*' element={<NotExist />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
