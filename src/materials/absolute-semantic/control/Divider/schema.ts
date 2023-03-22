type TDividerEditData = Array<>;

export interface IDividerConfig {}

interface IDividerSchema {
  editData: TDividerEditData;
  config: IDividerConfig;
}

const Divider: IDividerSchema = {
  editData: [],
  config: {},
};

export default Divider;
