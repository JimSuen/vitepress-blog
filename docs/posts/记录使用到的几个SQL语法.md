---
layout: mypost
date: 2021-08-24
title: 记录使用到的几个SQL语法
categories: [SQL]
---

这两周任务是拿着客户的 POC 数据库，从数据库里挖出来我们需要的流程数据并导出 CSV 文件上传到我们的系统进行分析和展示，我的任务就是在客户茫茫的数据库里找符合业务流程的数据并导出来。

快速学习了一下一些基础的 SQL 查询语句，趁没有忘记赶紧记录一下。

### 1. 别名

**列别名**

```sql
SELECT INVOICE_ID "case_id" FROM INVOICE_ALL
```

为`INVOICE_ID`起的别名叫`case_id`

**表别名**

```sql
SELECT INVOICE_ID "case_id" FROM INV
```

为`INVOICE_ID`起的别名叫`case_id`

### 2. 联合查询

**UNION**

用于合并两个或多个 SELECT 语句的结果集。

> **UNION 内部的每个 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每个 SELECT 语句中的列的顺序必须相同。**

```sql
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;
```

**UNION ALL**

`UNION`查出来的数据会自动去重，如果需要保留重复数据，可以使用`UNION ALL`。

```sql
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;
```

### 3. WITH AS

也叫做子查询部分（subquery factoring）。

定义一个 SQL 片断，该 SQL 片断，会被整个 SQL 语句所用到。这个语句算是公用表表达式（CTE）。有的时候，是为了让 SQL 语句的可读性更高些，也有可能是在 UNION ALL 的不同部分，作为提供数据的部分。

语法：

```sql
[ WITH <common_table_expression> [ ,n ] ]
<common_table_expression>::=
        expression_name [ ( column_name [ ,n ] ) ]
    AS
        ( CTE_query_definition )
```

```sql
-- 使用前
select * from person.StateProvince where CountryRegionCode in
         (select CountryRegionCode from person.CountryRegion where Name like 'C%')

-- 使用后
with cr as
(
    select CountryRegionCode from person.CountryRegion where Name like 'C%'
)
select * from person.StateProvince where CountryRegionCode in (select * from cr)

```

### 4. CASE...WHEN...THEN...ELSE...END

类似一个 sql 里的条件判断语句

```sql
CASE WHEN condition THEN result

[WHEN...THEN...]

ELSE result

END
```

比如：

```sql
SELECT
    name,
    CASE WHEN score < 60 THEN '不及格'
        WHEN score >= 60 AND score < 80 THEN '及格'
        WHEN score >= 80 THEN '优秀'
        ELSE '异常' END
     result, score
FROM
	student
```

从`student`表查询学生的姓名，评级以及分数， 其中评级是根据分数通过条件判断得出的。
