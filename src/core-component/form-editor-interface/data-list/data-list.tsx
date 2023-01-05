import React, { memo, useState, useEffect, useCallback } from 'react';
import { EditOutlined, MinusCircleOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {
  DragSource,
  DropTarget,
  DndProvider,
  ConnectDropTarget,
  DragSourceSpec,
  DropTargetConnector,
  DragSourceMonitor,
  DragSourceConnector,
  DropTargetSpec,
  ConnectDragSource,
  ConnectDragPreview,
} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EditorModal from './editor-modal';
import {uuid} from '../../../core-utils/tool';





