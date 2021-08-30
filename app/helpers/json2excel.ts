import Excel from 'exceljs';
import fs from 'fs';

const jsonToExcel = (name: string, data: any): number => {
  var start_time = Math.round(new Date().getTime() / 1000) + Math.floor(Math.random() * 10);
  const fileName = start_time;

  // 创建 xlsx 文件
  fs.writeFile(__dirname + '/../../files/download/' + fileName + '.xlsx', '', 'utf8', function (error) {
    if (error) {
      throw Error();
    }
  })

  var workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: __dirname + '/../../files/download/' + fileName + '.xlsx'
  });
  var worksheet = workbook.addWorksheet(name);

  // 样式设置
  worksheet.headerFooter.firstHeader = name;
  worksheet.properties.defaultRowHeight = 35;
  worksheet.properties.defaultColWidth = 20;
  worksheet.pageSetup.horizontalCentered = true;

  if (name.indexOf("未兑换充值卡") != -1) {
    worksheet.columns = [{
      header: '金额',
      key: 'cardValue'
    },
    {
      header: '卡号',
      key: 'cardCode'
    },
    {
      header: '卡密',
      key: 'cardPwd'
    },
    {
      header: '创建日期',
      key: 'createdAt'
    },
    {
      header: '兑换地址',
      key: 'redeemUrl'
    }
    ];
  } else if (name.indexOf("已兑换充值卡") != -1) {
    worksheet.columns = [{
      header: '金额',
      key: 'cardValue'
    },
    {
      header: '卡号',
      key: 'cardCode'
    },
    {
      header: '卡密',
      key: 'cardPwd'
    },
    {
      header: '创建日期',
      key: 'createdAt'
    },
    {
      header: '兑换者电话号码',
      key: 'phoneNumber'
    },
    ];
  } else {
    worksheet.columns = [
      {
        header: '兑换者电话号码',
        key: 'phoneNumber'
      },
      {
        header: '总金额',
        key: 'totalValue'
      },
      {
        header: '更新日期',
        key: 'modifiedAt'
      }
    ];
  }

  // 添加数据
  for (let i in data) {
    worksheet.addRow(data[i]).commit();
  }
  workbook.commit();

  return fileName;
}

export default jsonToExcel;