export interface Isale {
  type: string;
  tag: string;
  item: string;
  remark: string;
  unit: string;
  pc: string;
  grwt: string;
  less: string;
  nwt: string;
  tunch: string;
  wstg: string;
  rate: string;
  lbr: string;
  on: string;
  other: string;
  dis: string;
  total: string;
  stkVale: string;
  tgCode: string;
  fine: string;
  mrp: string;
  getCalculation(data: any): number;
}
