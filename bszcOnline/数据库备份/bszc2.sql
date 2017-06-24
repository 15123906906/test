-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-06-05 11:42:34
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bdm256312113_db`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `AdminID` int(11) NOT NULL,
  `AdminUserName` varchar(16) DEFAULT NULL,
  `AdminPwd` varchar(16) DEFAULT NULL,
  `AdminName` varchar(16) DEFAULT NULL,
  `AdminTelNum` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`AdminID`, `AdminUserName`, `AdminPwd`, `AdminName`, `AdminTelNum`) VALUES
(1, '15123906906', 'liujiang33', '发卡方', '15123906906');

-- --------------------------------------------------------

--
-- 表的结构 `img`
--

CREATE TABLE `img` (
  `imgID` int(11) NOT NULL,
  `carID` int(11) DEFAULT NULL,
  `imgLinkBig` varchar(100) DEFAULT NULL,
  `imgLink` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `img`
--

INSERT INTO `img` (`imgID`, `carID`, `imgLinkBig`, `imgLink`) VALUES
(1, 1, 'imgBig/baoma525big.jpg', 'img/baoma525little.jpg'),
(2, 2, 'imgBig/benchiejibig.jpg', 'img/benchiejilittle.jpg'),
(3, 3, 'imgBig/aodia4big.jpg', 'img/aodia4little.jpg'),
(4, 4, 'imgBig/aodia6big.jpg', 'img/aodia6little.jpg'),
(5, 5, 'imgBig/aodeshaibig.jpg', 'img/aodeshailittle.jpg'),
(6, 6, 'imgBig/fengfanbig.jpg', 'img/fengfanlittle.jpg'),
(7, 7, 'imgBig/geruibig.jpg', 'img/geruilittle.jpg'),
(8, 8, 'imgBig/jiedebig.jpg', 'img/jiedelittle.jpg'),
(9, 9, 'imgBig/siyubig.jpg', 'img/siyulittle.jpg'),
(10, 10, 'imgBig/feidubig.jpg', 'img/feidulittle.jpg'),
(11, 11, 'imgBig/yagebig.jpg', 'img/yagelittle.jpg'),
(12, 12, 'imgBig/bentianlinianbig.jpg', 'img/bentianlinianlittle.jpg'),
(13, 13, 'imgBig/fengtianguaguanbig.jpg', 'img/fengtianguaguanlittle.jpg'),
(14, 14, 'imgBig/kalolabig.jpg', 'img/kalolalittle.jpg'),
(15, 15, 'imgBig/kaimeiruibig.jpg', 'img/kaimeiruilittle.jpg'),
(16, 16, 'imgBig/leilinbig.jpg', 'img/leilinlittle.jpg'),
(17, 17, 'imgBig/ruizhibig.jpg', 'img/ruizhilittle.jpg'),
(18, 18, 'imgBig/sikesalabig.jpg', 'img/sikesalalittle.jpg'),
(19, 19, 'imgBig/xinpingbig.jpg', 'img/xinpinglittle.jpg'),
(20, 20, 'imgBig/biekebig.jpg', 'img/biekelittle.jpg'),
(21, 21, 'imgBig/nv200big.jpg', 'img/nv200little.jpg'),
(22, 22, 'imgBig/caiyouruifengbig.jpg', 'img/caiyouruifenglittle.jpg'),
(23, 23, 'imgBig/linmutianyubig.jpg', 'img/linmutianyulittle.jpg'),
(24, 24, 'imgBig/dababig.jpg', 'img/dabalittle.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `orderi`
--

CREATE TABLE `orderi` (
  `orderID` int(11) NOT NULL,
  `orderDate` date DEFAULT NULL,
  `orderStart` date DEFAULT NULL,
  `orderStop` date DEFAULT NULL,
  `getTime` varchar(10) NOT NULL,
  `dispatching` tinyint(1) DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  `send` tinyint(1) NOT NULL,
  `arrive` int(2) NOT NULL DEFAULT '0',
  `confirmDate` date NOT NULL,
  `orderPay` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `orderi`
--

INSERT INTO `orderi` (`orderID`, `orderDate`, `orderStart`, `orderStop`, `getTime`, `dispatching`, `address`, `send`, `arrive`, `confirmDate`, `orderPay`) VALUES
(1, '2017-06-05', '2017-06-05', '2017-06-06', '14:00', 0, '上门取车', 2, 0, '0000-00-00', 1),
(2, '2017-06-05', '2017-06-05', '2017-06-07', '16:00', 1, '重庆市巴南区红光大道69号正门', 0, 0, '0000-00-00', 1),
(3, '2017-06-05', '2017-06-05', '2017-06-08', '12:00', 1, '重庆市巴南区 李家沱南桥头 红灯区', 1, 1, '2017-06-05', 1),
(4, '2017-06-05', '2017-06-15', '2017-06-16', '12:00', 0, '上门取车', 0, 0, '0000-00-00', 0);

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL,
  `carID` int(11) DEFAULT NULL,
  `orderNum` int(11) DEFAULT NULL,
  `orderPirce` int(11) DEFAULT NULL,
  `userName` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`orderID`, `carID`, `orderNum`, `orderPirce`, `userName`) VALUES
(1, 1, 1, 800, '807163565'),
(2, 1, 2, 2400, '11111111'),
(3, 2, 1, 1592, '22222222'),
(4, 3, 1, 530, '22222222');

-- --------------------------------------------------------

--
-- 表的结构 `producti`
--

CREATE TABLE `producti` (
  `carID` int(11) NOT NULL,
  `carStyleID` int(11) DEFAULT NULL,
  `car` varchar(16) DEFAULT NULL,
  `brand` varchar(16) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `pirce` int(11) DEFAULT NULL,
  `summary` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `producti`
--

INSERT INTO `producti` (`carID`, `carStyleID`, `car`, `brand`, `stock`, `pirce`, `summary`) VALUES
(1, 1, '宝马525', '宝马', 1, 400, '当您首次审视全新5系列轿车时，动感、优雅、强健的外观特色跃然眼前，任何人都会立即被这款宝马商务级轿车所吸引。就外观设计而言，新车型所体现出的美学造诣已经达到了一个崭新的境界，同时却不失宝马5系列的传统与根本。在风格和外观上，宝马新5系被认为是：动感、运动型的3系列与高贵、华丽的7系列的完美组合。'),
(2, 2, '奔驰E级', '奔驰', 4, 398, '奔驰E级轿车是奔驰开发出的介于C级与S级之间的一款中大型高端商务轿车，跑车，旅行车，目前公认E级车的鼻祖是1947年的奔驰170，它是战后奔驰开发的第一批车型之一。与同一年代的170s相比，170的外形较少修饰，装备也进一步简化。'),
(3, 3, '奥迪A4', '奥迪', 5, 265, '作为国际著名豪华汽车品牌,一汽-大众奥迪始终秉承"突破科技 启迪未来"的品牌理念和"进取、尊贵、动感"的品牌价值。'),
(4, 3, '奥迪A6', '奥迪', 5, 298, '作为国际著名豪华汽车品牌,一汽-大众奥迪始终秉承"突破科技 启迪未来"的品牌理念和"进取、尊贵、动感"的品牌价值。'),
(5, 4, '奥德赛', '本田', 7, 245, '现代英文中的奥德赛本是旅行者的意思，源于古希腊神话，是浪漫冒险的象征。当初，日本本田的研究设计人员在进行开发研究时，循着当年古希腊英雄史诗所叙述的历程，足迹跑遍了半个欧洲去寻求其浪漫理念的源头。最终设计出了颇具欧洲浪漫舒适风格的奥德赛原型。'),
(6, 4, '锋范', '本田', 4, 204, '本田锋范（City）在同级别中属于比较省油的车型。整体质量稳定，偶发细节之处异响，车主用车过程中比较省心。大量爱卡车主表示锋范的音响效果非常出色，而且还配备了AUX接口和USB接口，这让车主感到十分方便。同时车主们普遍反映锋范动力表现十分出色，起步提速都非常带劲儿。'),
(7, 4, '哥瑞', '本田', 7, 198, '2015年9月22日，东风本田正式发布了全新入门级紧凑型车型哥瑞（GREIZ）概念车，这款紧凑型三厢车的量产版将会于2015年11月7日上市，官方起售价将低于8万元。量产版车型将搭载1.5L地球梦发动机，并且与广汽本田锋范同平台。'),
(8, 4, '杰德', '本田', 5, 210, 'JADE（杰德）是一款针对中国市场设计的车型，但追溯其根源，该车是本田全新一代Stream的雏形，这款车定位于紧凑型MPV。未来上市后，该车将会与大众途安、丰田逸致等产品形成竞争关系。'),
(9, 4, '思域', '本田', 6, 254, '内饰做工有所提升，设计层次感较强；储物空间比较合理，乘坐空间和后备箱空间都比较大；提速较快；换挡顺畅，方向盘灵活；采用ECON技术，油耗表现较为理想；售后网点覆盖全面，维修保养比较方便；安全配置比较丰富，安全性较好。'),
(10, 5, '飞度', '广汽本田', 7, 231, '飞度（FIT），Honda全球战略车型，作为最早进入中国两厢车市场的车型之一，推出的两代产品均获得巨大成功。2014年5月29日，定位为“劲酷两厢车”的第三代飞度（FIT）革新上市，瞄准充满时尚活力以及追求个性的“85后”新生代群体。'),
(11, 5, '雅阁', '广汽本田', 5, 265, '雅阁（Accord），本田创新精神与全球领先技术的践行者，全球历史38年。雅阁原配轮胎为米其林著名的超高性能跑胎Pilot Super Sport 2013年9月，中国首款配备Honda“地球梦科技”车型——广汽本田第九代雅阁登场。'),
(12, 6, '本田理念', '理念', 4, 254, '2010年12月广州车展，中国首个合资汽车企业自主品牌——理念（Everus）的首款量产车正式发布，并将于春季在广汽本田销售网络正式上市。'),
(13, 7, '丰田花冠', '丰田', 2, 246, '花冠（COROLLA）是丰田汽车旗下的老牌产品，于1966年在日本下线，寓意“花中之冠”。1970年、1974年、1979年、1983年、1987年、1991年、1995年和2000年分别推出新一代花冠，到现在已经是第9代车型。全球累计销量超过3600万辆，达成单一品牌累计销量总冠军'),
(14, 7, '卡罗拉', '丰田', 2, 302, '卡罗拉（Corolla），是丰田汽车的一个品牌。卡罗拉采用的是米其林轮胎215/45 R17轮胎、TRD Sportivo高性能减震器、TRD TF4 17寸运动型轮毂、强化离合器、高性能刹车片则保证其拥有比较理想的运动性能。'),
(15, 7, '凯美瑞', '丰田', 3, 310, '凯美瑞自1982年创立以来，平均每一分钟就有一位新车主选择凯美瑞。34年来，历代凯美瑞都持续领先，赢得全球1600万车主的信赖，成为真正意义上的全球车中高级轿车之王者归来——广汽丰田凯美瑞 无论从哪个角度看，凯美瑞都是一款完美的产品。'),
(16, 7, '雷凌', '丰田', 4, 324, '雷凌是一款基于丰田MC平台专为中国消费者深度定制的‘新感观领秀紧凑型轿车，于2014年4月18日登场亮相， 2014年夏天正式上市。'),
(17, 7, '锐志', '丰田', 3, 196, '锐志（REIZ）是日本丰田MARK X车型国产后的名称，它于2005年10月在天津一汽丰田二厂与皇冠共线生产、共用底盘，配备与皇冠相同的六速手自一体变速器。MARK X则是MARK II 的后续车型，它采用前置后驱设计，在丰田所有车型中销量排第三位，在定位上仅次于皇冠。'),
(18, 8, '昂克赛拉', '马自达', 5, 333, '由长安马自达汽车投产，预计今年五月上市的全新“Mazda3 Axela昂克赛拉”是2014北京车展首发的马自达主打车型。“Mazda3 Axela昂克赛拉”是全面采用新一代“创驰蓝天”技术和全新设计主题“魂动”的马自达新一代产品群中的第三款车型，也是凝聚新生马自达深厚价值内涵的主力车型。'),
(19, 8, '马自达3星骋', '马自达', 2, 314, '马自达3星骋是长安马自达预计于2011年10月上市的新马自达3车型。6月23日，长安马自达正式确定了它的中文名为Mazda3星骋，其售价预计为12.5-16.5万元。Mazda3星骋2.0L车型将换装6速手动或5速手自一体变速器。外观上也有了全新的设计。2011年6月23日，长安马自达公布了新Mazda3的中文名——Mazda3星骋。'),
(20, 9, '别克GL8', '别克', 3, 199, '别克GL8作为顶级MPV的典范，以其豪华气派、动力强劲、宽敞舒适的优势实现批量出口，被东南亚媒体誉为“完美MPV”；更成为北京申奥、APEC会议等重大国际级外事活动的礼宾用车，比尔盖茨、马友友、帕瓦洛蒂都曾是其座上客。'),
(21, 10, '日产NV200', '日产', 3, 197, 'NISSAN NV200是一款基于日产B级轿车平台延伸出来的厢式车。郑州日产在国内量产的NV200采用与东风日产骊威相同的HR16 1.6L汽油发动机。在中国的同平台车型有骊威、骐达、轩逸、启辰D50/R50、风神A60。'),
(22, 11, '柴油瑞风', '瑞风', 2, 156, '江淮瑞风推出三款非常具有冲击力的车型组合：其中包括向高端MPV延伸的瑞风系列的旗舰性新产品--瑞风祥和；带来公商务用车实用可靠新境界的--瑞风彩色之旅；推动轻客市场革命性升级的瑞风穿梭系列。'),
(23, 12, '铃木天语', '长安铃木', 5, 236, '天语SX4两厢的外形兼具了轿车的时尚感和SUV得粗犷感，能够赢得很多追求创新的消费者的青睐。此外，天语SX4在配置和空间上也在同级车中处于领先地位。1.6L VVT发动机动力和油耗能够兼顾。总体来看，天语SX4在同级车中绝对是个性之选的不二选择。目前新天语已经上市，增加了配置且新增了一款1.8L发动机。'),
(24, 13, '大巴', '大巴', 3, 1199, '大巴车，这个简介我也不知道怎么写~~~~！！');

-- --------------------------------------------------------

--
-- 表的结构 `staffi`
--

CREATE TABLE `staffi` (
  `staffID` int(11) NOT NULL,
  `staffName` varchar(16) NOT NULL,
  `staffTel` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `staffi`
--

INSERT INTO `staffi` (`staffID`, `staffName`, `staffTel`) VALUES
(1, '柯豆豆', '15123906905'),
(2, '李翔翔', '15123908045'),
(3, '贾丸丸', '15123905904'),
(4, '刘一首', '15123906906');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `userName` varchar(16) DEFAULT NULL,
  `userPwd` varchar(16) DEFAULT NULL,
  `name` varchar(16) DEFAULT NULL,
  `IDCard` varchar(19) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `telNum` varchar(16) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `userDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`userID`, `userName`, `userPwd`, `name`, `IDCard`, `gender`, `telNum`, `email`, `userDate`) VALUES
(1, '807163565', 'liujiang33', '刘江', '500382199405120052', '男', '15123906906', '807163565@qq.com', '2017-06-05'),
(2, '11111111', '111111', '马先驱', '500382199408120062', '女', '15123906904', '807163665@qq.com', '2017-06-05'),
(3, '22222222', '222222', '李飞翔', '500382199405120053', '男', '15123906904', '807153568@qq.com', '2017-06-05');

-- --------------------------------------------------------

--
-- 表的结构 `wordsi`
--

CREATE TABLE `wordsi` (
  `wordsID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `carID` int(11) DEFAULT NULL,
  `words` varchar(150) DEFAULT NULL,
  `wordsDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `wordsi`
--

INSERT INTO `wordsi` (`wordsID`, `userID`, `carID`, `words`, `wordsDate`) VALUES
(1, 1, 1, '这个车有点贵呀！', '2017-06-05'),
(2, 2, 1, '这个车挺便宜的呀！？？', '2017-06-05'),
(3, 3, 1, '都是菜鸡！！~~~~~', '2017-06-05'),
(4, 3, 2, '这个可以~~！！', '2017-06-05'),
(5, 3, 3, '租车玩！！！', '2017-06-05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`imgID`);

--
-- Indexes for table `orderi`
--
ALTER TABLE `orderi`
  ADD PRIMARY KEY (`orderID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`);

--
-- Indexes for table `producti`
--
ALTER TABLE `producti`
  ADD PRIMARY KEY (`carID`);

--
-- Indexes for table `staffi`
--
ALTER TABLE `staffi`
  ADD PRIMARY KEY (`staffID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `wordsi`
--
ALTER TABLE `wordsi`
  ADD PRIMARY KEY (`wordsID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `img`
--
ALTER TABLE `img`
  MODIFY `imgID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- 使用表AUTO_INCREMENT `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `producti`
--
ALTER TABLE `producti`
  MODIFY `carID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- 使用表AUTO_INCREMENT `staffi`
--
ALTER TABLE `staffi`
  MODIFY `staffID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `wordsi`
--
ALTER TABLE `wordsi`
  MODIFY `wordsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
