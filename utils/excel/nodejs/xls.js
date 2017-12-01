let XLSX = require('xlsx');
let fs = require("fs");

/*
 * file names
 */

let infile = '1127_1130_1148_1521_1527.xls';
// let file_bairong = 'module_bairong.xlsx';
// let file_tongdun = 'module_tongdun.xls';

/*
 * read files
 */

let src = []

let workbook_src = XLSX.readFile(infile);
// let workbook_bairong = XLSX.readFile(file_bairong);
// let workbook_tongdun = XLSX.readFile(file_tongdun);

/*
 * src
 */

const comparison_table = {
    'C': '证件号码',
    'G': '客户名称',
    'O': '教育程度',
    'Q': '发生地详细地址',
    'R': '户籍地址',
    'S': '居住详细地址',
    'V': '通讯地址',
    'Y': '手机号码',
    'AA': '单位名称',
    'AB': '单位详细地址',
    'AD': '单位固话',
    'AP': '亲属联系人姓名',
    'AS': '亲属联系人手机',
    'AT': '其他联系人姓名',
    'AW': '其他联系人手机',
    'AU': '其他联系人关系',
    'BD': '收款卡号',
    'BH': '申请日期',
    'BI': '申请金额',
    'BK': '贷款期限'
};

let sheet_name_src = workbook_src.SheetNames[0];
let worksheet_src = workbook_src.Sheets[sheet_name_src];
let line_number_src = CountLines(worksheet_src)


for (let i = 0; i < line_number_src; i++) {
    let line_data = {};
    const hoffset = 2;

    line_data[comparison_table['C']] = worksheet_src['C' + (i + hoffset)] ? worksheet_src['C' + (i + hoffset)].v : undefined;
    line_data[comparison_table['G']] = worksheet_src['G' + (i + hoffset)] ? worksheet_src['G' + (i + hoffset)].v : undefined;
    line_data[comparison_table['O']] = worksheet_src['O' + (i + hoffset)] ? worksheet_src['O' + (i + hoffset)].v : undefined;
    line_data[comparison_table['Q']] = worksheet_src['Q' + (i + hoffset)] ? worksheet_src['Q' + (i + hoffset)].v : undefined;
    line_data[comparison_table['R']] = worksheet_src['R' + (i + hoffset)] ? worksheet_src['R' + (i + hoffset)].v : undefined;
    line_data[comparison_table['S']] = worksheet_src['S' + (i + hoffset)] ? worksheet_src['S' + (i + hoffset)].v : undefined;
    line_data[comparison_table['V']] = worksheet_src['V' + (i + hoffset)] ? worksheet_src['V' + (i + hoffset)].v : undefined;
    line_data[comparison_table['Y']] = worksheet_src['Y' + (i + hoffset)] ? worksheet_src['Y' + (i + hoffset)].v : undefined;

    line_data[comparison_table['AA']] = worksheet_src['AA' + (i + hoffset)] ? worksheet_src['AA' + (i + hoffset)].v : undefined;
    line_data[comparison_table['AB']] = worksheet_src['AB' + (i + hoffset)] ? worksheet_src['AB' + (i + hoffset)].v : undefined;
    line_data[comparison_table['AD']] = worksheet_src['AD' + (i + hoffset)] ? ((worksheet_src['AD' + (i + hoffset)].v.length == 13) ? worksheet_src['AD' + (i + hoffset)].v : '') : undefined;
    line_data[comparison_table['AP']] = worksheet_src['AP' + (i + hoffset)] ? worksheet_src['AP' + (i + hoffset)].v : undefined;
    line_data[comparison_table['AS']] = worksheet_src['AS' + (i + hoffset)] ? worksheet_src['AS' + (i + hoffset)].v : undefined;
    line_data[comparison_table['AT']] = worksheet_src['AT' + (i + hoffset)] ? worksheet_src['AT' + (i + hoffset)].v : undefined;
    line_data[comparison_table['AW']] = worksheet_src['AW' + (i + hoffset)] ? worksheet_src['AW' + (i + hoffset)].v : undefined;
    line_data[comparison_table['AU']] = worksheet_src['AU' + (i + hoffset)] ? worksheet_src['AU' + (i + hoffset)].v : undefined;
    line_data[comparison_table['BD']] = worksheet_src['BD' + (i + hoffset)] ? worksheet_src['BD' + (i + hoffset)].v : undefined;
    line_data[comparison_table['BH']] = worksheet_src['BH' + (i + hoffset)] ? worksheet_src['BH' + (i + hoffset)].v : undefined;
    line_data[comparison_table['BI']] = worksheet_src['BI' + (i + hoffset)] ? worksheet_src['BI' + (i + hoffset)].v : undefined;
    line_data[comparison_table['BK']] = worksheet_src['BK' + (i + hoffset)] ? worksheet_src['BK' + (i + hoffset)].v : undefined;

    src[i] = line_data;
}

console.log(src);

/*
 * bairong
 */

// let sheet_name_bairong = workbook_bairong.SheetNames[0];
// let worksheet_bairong = workbook_bairong.Sheets[sheet_name_bairong];
let string_bairong = new String();
for (let i = 0; i < line_number_src; i++) {
    string_bairong += src[i]['客户名称'] + ',' +
        src[i]['手机号码'] + ',' +
        src[i]['证件号码'] + ',' +
        src[i]['收款卡号'] + ',' + ',' + ',' + ',' +
        '网络申请' + ',' +
        '信用贷款' + ',' +
        src[i]['申请金额'] + ',' +
        src[i]['贷款期限'] + ',' +
        src[i]['教育程度'] + ',' + ',' + ',' +
        src[i]['单位名称'] + ',' +
        src[i]['居住详细地址'] + ',' +
        src[i]['单位详细地址'] + ',' +
        src[i]['户籍地址'] + ',' +
        src[i]['发生地详细地址'] + ',' +
        src[i]['单位固话'] + ',' + ',' +
        src[i]['亲属联系人姓名'] + ',' +
        src[i]['亲属联系人手机'] + ',' +
        '亲戚' + ',' +
        src[i]['其他联系人姓名'] + ',' +
        src[i]['其他联系人手机'] + ',' +
        src[i]['其他联系人关系'];
    string_bairong += '\n';
}

console.log('------------百融-----------\n');
console.log(string_bairong);
console.log('---------------------------');

// fs.writeFileSync('bairong.txt', string_bairong);


/*
 * tongdun
 */

let string_tongdun = new String();
for (let i = 0; i < line_number_src; i++) {
    string_tongdun += src[i]['申请日期'].replace(/\//g, '-') + ',' +
        src[i]['申请金额'] + ',' +
        src[i]['贷款期限'] + ',' + ',' + ',' + ',' + ',' + ',' +
        src[i]['客户名称'] + ',' +
        src[i]['证件号码'] + ',' +
        src[i]['手机号码'] + ',' + ',' + ',' + ',' +
        src[i]['收款卡号'] + ',' +
        src[i]['居住详细地址'] + ',' + ',' +
        src[i]['单位名称'] + ',' +
        src[i]['单位详细地址'] + ',' + ',' + ',' + ',' + ',' + ',' + ',' + ',' +
        src[i]['单位固话'] + ',' + ',' + ',' + ',' + ',' + ',' +
        src[i]['通讯地址'] + ',' + ',' +
        src[i]['亲属联系人姓名'] + ',' +
        src[i]['亲属联系人手机'] + ',' +
        src[i]['其他联系人姓名'] + ',' +
        src[i]['其他联系人手机'];

    string_tongdun += '\n';
}

console.log('------------同盾-----------\n');
console.log(string_tongdun);
console.log('---------------------------');

// fs.writeFileSync('tongdun.txt', string_tongdun);


/*
 * count lines
 */

function CountLines(worksheet) {

    const offset = 2;
    const prefix = 'C';
    let nlines = 1;

    while (true) {
        let cell = worksheet[prefix + nlines];
        if (!cell) {
            break;
        }
        nlines++;
    }
    return nlines - offset;
}


// let desired_cell = worksheet_src['A1'];
// let desired_value = (desired_cell ? desired_cell.v : undefined);
// console.log(desired_value);

