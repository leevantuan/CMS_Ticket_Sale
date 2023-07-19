import './chart.scss';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { useAppSelector } from '../../../shared/hooks/hook';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import moment from 'moment';
import { HandleListWeek, HandleTotalPrice, SoSanhMonthTicket } from '../../../handleLogic/handle';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Tooltip,
  Filler,
  Legend,
);
export default function Chart() {
  const monthFormat = 'MM/YYYY';
  const monthNow: string = moment().format('MM/YYYY');
  const listTicketStore = useAppSelector(state => state.tickets.tickets);
  const listServiceStore = useAppSelector(state => state.tickets.services);

  const [monthSearch, setMonthSearch] = useState<string>(monthNow);
  const [monthSearch1, setMonthSearch1] = useState<string>(monthNow);
  const [week, setWeek] = useState<string[]>([]);
  const [countTrueSK, setCountTrueSK] = useState<number>(0);
  const [countFalseSK, setCountFalseSK] = useState<number>(0);
  const [countTrueGD, setCountTrueGD] = useState<number>(0);
  const [countFalseGD, setCountFalseGD] = useState<number>(0);

  const [tongDoanhThu, setTongDoanhThu] = useState<number[]>([]);

  useEffect(() => {
    const filterMonth = listTicketStore.filter(ticket => {
      const listMonthSearch = SoSanhMonthTicket(ticket.ngaySuDung, monthSearch1);
      if (listMonthSearch === true) {
        return ticket;
      } else {
        return '';
      }
    });
    const goiGiaDinh = filterMonth.filter(ticket => ticket.type === 'Gói gia đình');
    const goiSuKien = filterMonth.filter(ticket => ticket.type === 'Gói sự kiện');
    const goiTrueSuKien = goiSuKien.filter(ticket => ticket.tinhTrang === true);
    const goiFalseSuKien = goiSuKien.filter(ticket => ticket.tinhTrang === false);
    const goiTrueGiaDinh = goiGiaDinh.filter(ticket => ticket.tinhTrang === true);
    const goiFalseGiaDinh = goiGiaDinh.filter(ticket => ticket.tinhTrang === false);

    setCountTrueSK(goiTrueSuKien.length);
    setCountFalseSK(goiFalseSuKien.length);
    setCountTrueGD(goiTrueGiaDinh.length);
    setCountFalseGD(goiFalseGiaDinh.length);
    // setTongDoanhThu((goiGiaDinh.length / 4) * 7500 + goiSuKien.length * 2000);
  }, [listTicketStore, monthSearch1]);

  useEffect(() => {
    const listWeekDay = HandleListWeek(monthSearch);
    setWeek(listWeekDay);
  }, [monthSearch]);

  useEffect(() => {
    const totalPrice = HandleTotalPrice(monthSearch, listServiceStore, week, listTicketStore);
    setTongDoanhThu(totalPrice);
  }, [monthSearch, listServiceStore, week, listTicketStore]);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setMonthSearch(dateString);
  };
  const onChange1: DatePickerProps['onChange'] = (date, dateString) => {
    setMonthSearch1(dateString);
  };

  const dataGoiSuKien = {
    labels: [],
    datasets: [
      {
        label: 'Số vé',
        data: [countTrueSK, countFalseSK],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const dataGoiGiaDinh = {
    labels: [],
    datasets: [
      {
        label: 'Số vé',
        data: [countTrueGD, countFalseGD],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const data = {
    labels: week,
    datasets: [
      {
        fill: true,
        label: 'Doanh thu (Tr)',
        data: tongDoanhThu,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="container-chart" style={{ marginTop: '80px', borderRadius: 18 }}>
      <p className="title-chart m-4 pt-3">Thống kê</p>
      <Space direction="vertical">
        <DatePicker
          onChange={onChange}
          defaultValue={dayjs(monthSearch, monthFormat)}
          format={monthFormat}
          picker="month"
        />
      </Space>
      <div className="chart-top-one">
        <Line data={data} />;
      </div>
      <div className="chart-bottom-one d-flex">
        <Space direction="vertical">
          <DatePicker
            onChange={onChange1}
            defaultValue={dayjs(monthSearch1, monthFormat)}
            format={monthFormat}
            picker="month"
          />
        </Space>
        <div style={{ width: 300, height: 300 }}>
          <h5 className="text-center fw-bold">Gói sự kiện</h5>
          <Doughnut data={dataGoiSuKien} />
        </div>
        <div style={{ width: 300, height: 300 }}>
          <h5 className="text-center fw-bold">Gói gia đình</h5>
          <Doughnut data={dataGoiGiaDinh} />
        </div>
      </div>
    </div>
  );
}
