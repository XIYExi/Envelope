export const nodes1 = [
  {
    position: { x: 150, y: 110 },
    size: { width: 100, height: 50 },
    attrs: {
      body: { stroke: '#A8D7CD', strokeWidth: 1, fill: '#d0fff5' },
      label: {
        text: 'Trigger',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'ellipse',
    id: '22560874-ed43-4d40-8c07-a921066b282a',
    data: { actionType: 'TRIGGER', initialization: false, tooltip: 'Trigger' },
    ports: {
      items: [{ group: 'port_g', id: 'p_bottom' }],
      groups: {
        port_g: {
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
          position: 'bottom',
        },
      },
    },
    zIndex: 1,
  },
  {
    position: { x: 175, y: 236 },
    size: { width: 50, height: 50 },
    attrs: {
      body: {
        transform: 'rotate(-45,25,25)',
        stroke: '#FDBE94',
        strokeWidth: 1,
        fill: '#ffe6bc',
        rx: 5,
        ry: 5,
      },
      label: {
        text: 'Condition',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: '8f609250-f17d-46e6-a726-ebf1397cdcf6',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: {
      actionType: 'CONDITION',
      initialization: false,
      tooltip: 'Condition',
    },
    ports: {
      items: [
        { group: 'in', id: 'p_top', connected: true },
        { group: 'out', id: 'p_bottom' },
      ],
      groups: {
        in: {
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
              transform: 'translate(0, -7)',
            },
          },
          position: 'top',
        },
        out: {
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
              transform: 'translate(0, 7)',
            },
          },
          position: 'bottom',
        },
      },
    },
    zIndex: 2,
  },
  {
    position: { x: 150, y: 372 },
    size: { width: 100, height: 50 },
    attrs: {
      body: { stroke: '#C4C4C4', strokeWidth: 1, fill: '#ececec' },
      label: {
        text: 'Action',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: '69cd77ef-6b89-4e15-ae31-bed2192bf6ab',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: { actionType: 'ACTION', initialization: false, tooltip: 'Action' },
    ports: {
      items: [
        { group: 'port-top', id: 'p_top', connected: true },
        { group: 'port-bottom', id: 'p_bottom' },
      ],
      groups: {
        'port-top': {
          position: 'top',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        'port-bottom': {
          position: 'bottom',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
    zIndex: 3,
  },
];
export const edges1 = [
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: 'eb63384f-4792-4e5e-afbc-e0e3817752c5',
    zIndex: -1,
    source: { cell: '22560874-ed43-4d40-8c07-a921066b282a', port: 'p_bottom' },
    target: { cell: '8f609250-f17d-46e6-a726-ebf1397cdcf6', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: '69e70454-c971-4366-ad10-8aa0bb792d5d',
    zIndex: -1,
    source: { cell: '8f609250-f17d-46e6-a726-ebf1397cdcf6', port: 'p_bottom' },
    target: { cell: '69cd77ef-6b89-4e15-ae31-bed2192bf6ab', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
];

export const nodes2 = [
  {
    position: { x: 180, y: 10 },
    size: { width: 100, height: 50 },
    attrs: {
      body: { stroke: '#A4C2FF', strokeWidth: 1, fill: '#cceaff' },
      label: {
        text: 'new Vue()',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'ellipse',
    id: '0e896b7d-3bcd-47e3-8f26-f9c2626d4edf',
    data: {
      actionType: 'TRIGGER',
      initialization: false,
      tooltip: 'new Vue()',
    },
    ports: {
      items: [{ group: 'port_g', id: 'p_bottom' }],
      groups: {
        port_g: {
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
          position: 'bottom',
        },
      },
    },
    zIndex: 1,
  },
  {
    position: { x: 180, y: 108 },
    size: { width: 100, height: 50 },
    attrs: {
      body: { stroke: '#C4C4C4', strokeWidth: 1, fill: '#ececec' },
      label: {
        text: 'Init Events & Lifecycle',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: '6952de6d-8ef8-488c-b8e9-b4b333527afa',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: {
      actionType: 'ACTION',
      initialization: false,
      tooltip: 'Init Events & Lifecycle',
    },
    ports: {
      items: [
        { group: 'port-top', id: 'p_top', connected: true },
        { group: 'port-bottom', id: 'p_bottom' },
      ],
      groups: {
        'port-top': {
          position: 'top',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        'port-bottom': {
          position: 'bottom',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
    zIndex: 2,
  },
  {
    position: { x: 180, y: 213 },
    size: { width: 100, height: 50 },
    attrs: {
      body: { stroke: '#C4C4C4', strokeWidth: 1, fill: '#ececec' },
      label: {
        text: 'Init injections & reactivity',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: 'a06749ba-a388-43a0-8c64-00f7ce910622',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: {
      actionType: 'ACTION',
      initialization: false,
      tooltip: 'Init injections * reactivity',
    },
    ports: {
      items: [
        { group: 'port-top', id: 'p_top', connected: true },
        { group: 'port-bottom', id: 'p_bottom' },
      ],
      groups: {
        'port-top': {
          position: 'top',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        'port-bottom': {
          position: 'bottom',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
    zIndex: 3,
  },
  {
    position: { x: 205, y: 321 },
    size: { width: 50, height: 50 },
    attrs: {
      body: {
        transform: 'rotate(-45,25,25)',
        stroke: '#FDBE94',
        strokeWidth: 1,
        fill: '#ffe6bc',
        rx: 5,
        ry: 5,
      },
      label: {
        text: 'Has "el" option ?',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: '1924add4-3658-438b-9a42-a1583a3fddcf',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: {
      actionType: 'CONDITION',
      initialization: false,
      tooltip: 'Has "el" option?',
    },
    ports: {
      items: [
        { group: 'in', id: 'p_top', connected: true },
        { group: 'out', id: 'p_bottom' },
      ],
      groups: {
        in: {
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
              transform: 'translate(0, -7)',
            },
          },
          position: 'top',
        },
        out: {
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
              transform: 'translate(0, 7)',
            },
          },
          position: 'bottom',
        },
      },
    },
    zIndex: 4,
  },
  {
    position: { x: 205, y: 435 },
    size: { width: 50, height: 50 },
    attrs: {
      body: {
        transform: 'rotate(-45,25,25)',
        stroke: '#FDBE94',
        strokeWidth: 1,
        fill: '#ffe6bc',
        rx: 5,
        ry: 5,
      },
      label: {
        text: 'Has "template" option?',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: '416e0d0a-4966-47bf-8d44-aa77dd2dc059',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: {
      actionType: 'CONDITION',
      initialization: false,
      tooltip: 'Has "template" option ?',
    },
    ports: {
      items: [
        { group: 'in', id: 'p_top', connected: true },
        { group: 'out', id: 'p_bottom' },
      ],
      groups: {
        in: {
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
              transform: 'translate(0, -7)',
            },
          },
          position: 'top',
        },
        out: {
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
              transform: 'translate(0, 7)',
            },
          },
          position: 'bottom',
        },
      },
    },
    zIndex: 5,
  },
  {
    position: { x: 40, y: 550 },
    size: { width: 100, height: 50 },
    attrs: {
      body: { stroke: '#C4C4C4', strokeWidth: 1, fill: '#ececec' },
      label: {
        text: 'Complile template into render function *',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: '8e8ce231-bc70-4607-97b0-2e5252c6df7a',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: {
      actionType: 'ACTION',
      initialization: false,
      tooltip: 'Complie template into render function *',
    },
    ports: {
      items: [
        { group: 'port-top', id: 'p_top', connected: true },
        { group: 'port-bottom', id: 'p_bottom' },
      ],
      groups: {
        'port-top': {
          position: 'top',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        'port-bottom': {
          position: 'bottom',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
    zIndex: 6,
  },
  {
    position: { x: 332, y: 550 },
    size: { width: 100, height: 50 },
    attrs: {
      body: { stroke: '#C4C4C4', strokeWidth: 1, fill: '#ececec' },
      label: {
        text: "Complile el's outerHTML as tempalte *",
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: 'eb6c6092-cc83-4fed-9c09-e3dfede4ad76',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: {
      actionType: 'ACTION',
      initialization: false,
      tooltip: "Complie el's outerHTML as template *",
    },
    ports: {
      items: [
        { group: 'port-top', id: 'p_top', connected: true },
        { group: 'port-bottom', id: 'p_bottom' },
      ],
      groups: {
        'port-top': {
          position: 'top',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        'port-bottom': {
          position: 'bottom',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
    zIndex: 7,
  },
  {
    position: { x: 180, y: 649 },
    size: { width: 100, height: 50 },
    attrs: {
      body: { stroke: '#C4C4C4', strokeWidth: 1, fill: '#ececec' },
      label: {
        text: 'Create vm$el and replace "el" with it',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: 'a0f8c15b-da8c-45f2-83df-1488d966438e',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: {
      actionType: 'ACTION',
      initialization: false,
      tooltip: 'Create vm.$el and replace "el" with it',
    },
    ports: {
      items: [
        { group: 'port-top', id: 'p_top', connected: true },
        { group: 'port-bottom', id: 'p_bottom' },
      ],
      groups: {
        'port-top': {
          position: 'top',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        'port-bottom': {
          position: 'bottom',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
    zIndex: 8,
  },
  {
    position: { x: 180, y: 754 },
    size: { width: 100, height: 50 },
    attrs: {
      body: { stroke: '#C4C4C4', strokeWidth: 1, fill: '#ececec' },
      label: {
        text: 'Teardown watchers, child components and event listeners',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: 'e1096a8e-fade-470e-b6de-47e1c73dd7a4',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: {
      actionType: 'ACTION',
      initialization: false,
      tooltip: 'Teardown watchers, child components and event listeners',
    },
    ports: {
      items: [
        { group: 'port-top', id: 'p_top', connected: true },
        { group: 'port-bottom', id: 'p_bottom' },
      ],
      groups: {
        'port-top': {
          position: 'top',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        'port-bottom': {
          position: 'bottom',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
    zIndex: 9,
  },
  {
    position: { x: 180, y: 857 },
    size: { width: 100, height: 50 },
    attrs: {
      body: { stroke: '#C4C4C4', strokeWidth: 1, fill: '#ececec' },
      label: {
        text: 'Destroyed',
        fill: '#7D7671',
        strokeWidth: 0.4,
        fontSize: 12,
      },
    },
    shape: 'rect',
    id: 'da4717b9-f873-4f9e-9af8-34353e27be78',
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    data: { actionType: 'ACTION', initialization: false, tooltip: 'Destroyed' },
    ports: {
      items: [
        { group: 'port-top', id: 'p_top', connected: true },
        { group: 'port-bottom', id: 'p_bottom' },
      ],
      groups: {
        'port-top': {
          position: 'top',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        'port-bottom': {
          position: 'bottom',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
    zIndex: 10,
  },
];
export const edges2 = [
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: '7470c9f4-f760-4226-9330-aa9b5267d118',
    zIndex: -1,
    source: { cell: '0e896b7d-3bcd-47e3-8f26-f9c2626d4edf', port: 'p_bottom' },
    target: { cell: '6952de6d-8ef8-488c-b8e9-b4b333527afa', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: 'cb1e0738-20de-4830-bd74-b91bae026490',
    zIndex: -1,
    source: { cell: '6952de6d-8ef8-488c-b8e9-b4b333527afa', port: 'p_bottom' },
    target: { cell: 'a06749ba-a388-43a0-8c64-00f7ce910622', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: '05d85808-8f64-49c0-92f8-2166b1e48101',
    zIndex: -1,
    source: { cell: 'a06749ba-a388-43a0-8c64-00f7ce910622', port: 'p_bottom' },
    target: { cell: '1924add4-3658-438b-9a42-a1583a3fddcf', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: '50f30684-8c7b-4717-98ab-962d988300d5',
    zIndex: -1,
    source: { cell: '1924add4-3658-438b-9a42-a1583a3fddcf', port: 'p_bottom' },
    target: { cell: '416e0d0a-4966-47bf-8d44-aa77dd2dc059', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: 'e055bf42-ee31-4518-8581-fe50e235a639',
    zIndex: -1,
    source: { cell: '416e0d0a-4966-47bf-8d44-aa77dd2dc059', port: 'p_bottom' },
    target: { cell: '8e8ce231-bc70-4607-97b0-2e5252c6df7a', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: 'cf1eea96-94be-47c9-8208-922e8507eda7',
    zIndex: -1,
    source: { cell: '416e0d0a-4966-47bf-8d44-aa77dd2dc059', port: 'p_bottom' },
    target: { cell: 'eb6c6092-cc83-4fed-9c09-e3dfede4ad76', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: 'e4356c92-c9ba-4e17-b350-619326cb5c2c',
    zIndex: -1,
    source: { cell: '8e8ce231-bc70-4607-97b0-2e5252c6df7a', port: 'p_bottom' },
    target: { cell: 'a0f8c15b-da8c-45f2-83df-1488d966438e', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: 'a9cb7c20-c70f-438a-9ad7-3b58a534ebd2',
    zIndex: -1,
    source: { cell: 'eb6c6092-cc83-4fed-9c09-e3dfede4ad76', port: 'p_bottom' },
    target: { cell: 'a0f8c15b-da8c-45f2-83df-1488d966438e', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: '70e9025e-6f94-413f-884f-ebd22ba677a3',
    zIndex: -1,
    source: { cell: 'a0f8c15b-da8c-45f2-83df-1488d966438e', port: 'p_bottom' },
    target: { cell: 'e1096a8e-fade-470e-b6de-47e1c73dd7a4', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
  {
    shape: 'edge',
    attrs: { line: { stroke: '#7c68fc', strokeDasharray: '' } },
    id: '0c1ebf39-70ba-4c67-ad55-b4d0df27d9eb',
    zIndex: -1,
    source: { cell: 'e1096a8e-fade-470e-b6de-47e1c73dd7a4', port: 'p_bottom' },
    target: { cell: 'da4717b9-f873-4f9e-9af8-34353e27be78', port: 'p_top' },
    labels: [{ attrs: { label: { text: '' } } }],
  },
];
