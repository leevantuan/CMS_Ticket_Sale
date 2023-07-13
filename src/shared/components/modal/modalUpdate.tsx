import '../../../view/styles/managerTicket.scss';
import { modalUpdate } from '../../../@types/types';

import { useState } from 'react';
import dayjs from 'dayjs';
import moment from 'moment';

import { DatePicker, DatePickerProps, Modal } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

export default function ModalUpdate(props: modalUpdate) {
  const HandleClickUpdate = () => {};
  return (
    <Modal
      open={props.openUpdate}
      onCancel={props.HandleClickModalUpdate}
      title="Đổi ngày sử dụng vé"
      footer={
        <>
          <button onClick={HandleClickUpdate} className="btn btn-outline-warning pe-5 ps-5 mt-3">
            Hủy
          </button>
          <button onClick={HandleClickUpdate} className="btn btn-outline-warning pe-5 ps-5 mt-3">
            Lưu
          </button>
        </>
      }
    ></Modal>
  );
}
