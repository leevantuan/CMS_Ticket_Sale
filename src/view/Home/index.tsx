import ManagerTicket from '../../layout/content/managerTicket';
import Menu from '../../layout/menu';
import NavBar from '../../layout/navBar';
import Chart from '../../layout/content/chart';

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Menu />
        </div>
        <div className="col-9">
          <NavBar />
          <ManagerTicket />
          {/* <Chart /> */}
        </div>
      </div>
    </div>
  );
}
