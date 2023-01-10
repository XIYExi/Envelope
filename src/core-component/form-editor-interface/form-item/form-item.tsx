import React, { FC, memo } from 'react';
import styled from 'styled-components';
import {uuid} from '../../../core-utils/tool';
import EditorModal from './editor-modal';
import { MinusCircleFilled, EditFilled, PlusOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import MyPopover from 'yh-react-popover';
