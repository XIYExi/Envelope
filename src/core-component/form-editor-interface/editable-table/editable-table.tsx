import React, { createContext, FC } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal, Upload } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import {uuid} from '../../../core-utils/tool';
import XLSX from 'xlsx';


const EditableContext = createContext<any>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}
