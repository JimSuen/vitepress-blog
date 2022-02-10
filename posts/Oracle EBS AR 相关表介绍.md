---
layout: mypost
date: 2021-08-28
title: Oracle EBS AR 相关表介绍
categories: [Oracle EBS]
---

工作需要，从 Oracle EBS 系统得数据库中挖数据，但是相关文档很少，并且都是英文版，整理并记录一下翻译内容方便使用。

> 翻译自 [Technical Perspective: Transactions](https://docs.oracle.com/cd/A60725_05/html/comnls/us/ar/techessy.htm)

本文描述了 Receivables 用于存储应收账款交易的关键表和列

### RA_CUSTOMER_TRX（ra_customer_trx）

存储**发票**(`invoice`)、**借项通知单**(`credit memo`)、委托(`commitment` )和**贷项通知单**(`credit memo`)抬头信息。

- `customer_trx_id`：主键
- `trx_number`：交易编号
- `trx_date`：交易日期
- `bill_to_customer_id`：计费客户

### RA_CUSTOMER_TRX_LINES（ra_customer_trx_lines）

存储**发票**(`invoice`)、**借项通知单**(`credit memo`)、委托(`commitment` )和**贷项通知单**(`credit memo`)行级别信息。

- `customer_trx_line_id ` 主键
- `customer_trx_id `：RA_CUSTOMER_TRX 表的外键
- `line_type `：记录中包含的数据类型，有：CHARGES、FREIGHT、LINE 和 TAX
- `link_to_cust_trx_line_id `： 用来引用原始发票行，只有行类型为 TAX 或 FREIGHT 的记录有
- `extended_amount `：交易行的总金额

### RA_CUST_TRX_LINE_SALESREPS（ra_cust_trx_line_salesreps）

存储发票行的销售信用分配。

- `cust_trx_line_salesrep_id `： 主键
- `sales_rep_id`： 接收此交易信用的销售人员
- `customer_trx_line_id`： RA_CUSTOMER_TRX_LINES 表的外键
- `Revenue_amount_split`： 分配给该销售人员的发票行的金额
- `non_revenue_amount_split `： 分配给该销售人员的非标题运费和税金行的金额

  如果销售信用是基于交易行的百分比而不是特定金额派生的

- `revenue_percent_split`： 配给该销售人员的发票行的百分比
- `non_revenue_percent_split`： 配给该销售人员非标题运费和税金行的百分比
- `prev_cust_trx_line_salesrep_id`：引用另一个销售信用分配,当前记录正在应用到该分配

### RA_CUST_TRX_LINE_GL_DIST（ra_cust_trx_line_gl_dist）

存储**发票**(`invoice`)、**借项通知单**(`credit memo`)、委托(`commitment` )和**贷项通知单**(`credit memo`)交易的会计分配。

- `cust_trx_line_gl_dist_id`：主键
- `customer_trx_line_id`：RA_CUSTOMER_TRX_LINES 表的外键
- `account_class`：帐户类型
- `code_combination_id`：标识总帐帐户，有效的帐户类别为 CHARGES、FREIGHT、REC、REV、SUSPENSE、TAX、UNBILL 和 UNEARN

> The account_class column describes the account type, while the code_combination_id column identifies the general ledger account. Valid account classes are CHARGES, FREIGHT, REC, REV, SUSPENSE, TAX, UNBILL and UNEARN. The account_class, REC, represents the receivable account distribution. The amount column for REC records is equal to the sum of all i > nvoice lines. Therefore, there is no link to RA_CUSTOMER_TRX_LINES and the column customer_trx_line_id is null for these records. The REC record is linked to the table, RA_CUSTOMER_TRX, via the customer_trx_id column. For all other account classes, credits are represented by positive numbers and debits are represented by negative numbers.
