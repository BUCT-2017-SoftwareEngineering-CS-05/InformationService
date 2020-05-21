# 博物馆信息服务子系统
- 软件工程课程项目小组子系统
---
## 主要功能
- 一个手机应用程序，支持用户浏览“博物馆网站数据采集子系统”和“博物馆新闻采集分析子系统”中采集的数据，并对数据进行分析显示
- 数据浏览：在手机端以列表方式浏览各博物馆的介绍、参观信息、展览、教育活动、藏品、新闻
- 数据查询：按照博物馆名查询定位信息
- 用户反馈：可以按照展览、服务、环境三个方面让用户对一个博物馆进行打分并进行留言评论
- 数据分析：分析博物馆信息以及用户反馈信息，用排名列表显示分析结果

## 框架和语言
- APP： JavaScript, ReactNative
- 后端：C#, ASP.NET CORE
- 数据库：MySql

## 文件目录
- [本仓库](https://github.com/BUCT-2017-SoftwareEngineering-CS-05/InformationService)：APP前端代码，发布各版本APK文件
- [本仓库Wiki](https://github.com/BUCT-2017-SoftwareEngineering-CS-05/InformationService/wiki)：存放本项目需求规格说明书、开发周记、用户手册、设计文档、测试文档等
- [后端仓库](https://github.com/BUCT-2017-SoftwareEngineering-CS-05/InformationServiceBackEnd)：存放后端相关代码

## 其他
- ReactNative框架可以编写跨平台APP，本小组主要使用Android进行开发、测试和发布，但经过少量修改，也可以在iOS上运行
- 本仓库master分支及基于其发布的Release版本是基于本地后端服务器的，需要在本地IIS EXPRESS服务器上运行后端仓库代码才能正常运行
- 本仓库RemoteServer分支及基于其发布的Release版本是基于远程后端服务器的，可以直接运行但由于有服务器延迟，页面渲染需要很长时间
- 本项目所依赖的数据库租用期较短，在课程结束后一段时间后可能没有数据可以访问
