# 家庭記帳本
使用Node.js、Express、Handlebars、mongoose製作的家庭記帳本，可記錄自己的支出。

## 網站功能
- 可以瀏覽所有紀錄的支出，以及總支出金額。
- 可以新增支出。
- 可以依類別篩選目前記錄的支出。
- 可以修改已記錄的支出項目。
- 可以刪除已記錄的支出項目。

## 專案畫面
![image](https://github.com/jolinhappy/expense-tracker/blob/master/screen-shot.png)

## 安裝步驟
1.開啟終端機，並clone此專案。
<br>```git clone https://github.com/jolinhappy/expense-tracker```

2.進入專案資料。
<br>```cd expense-tracker```

3.在進入專案資料夾的狀態下安裝npm
<br>```npm install```

4.安裝nodemon
<br>```npm install nodemon```

5.安裝種子資料
<br>```npm run seed```

6.啟動程式
<br>```npm run dev```
<br>*成功啟動後，終端機會顯示 app is listening on port 3000

7.連結專案網址
<br>在瀏覽器上輸入 localhost:3000 進入專案網頁

## 環境建置與需求
- Node.js: v10.15.0
- Express: v4.17.1
- Express-Handlebars: v5.1.0
- Body-parser: v1.19.0
- mongoose: v5.9.25
