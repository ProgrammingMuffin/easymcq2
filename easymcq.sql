-- MySQL dump 10.13  Distrib 8.0.18, for osx10.14 (x86_64)
--
-- Host: localhost    Database: easymcq
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin` (
  `email` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES ('deepak.r@practo.com','e756a91150ea80a4ccb4fc8299a45469d517830f06dd66514115391d75d48e21');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Answer`
--

DROP TABLE IF EXISTS `Answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Answer` (
  `ans_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `answer` varchar(1500) COLLATE utf8mb4_general_ci NOT NULL,
  `correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`ans_id`)
) ENGINE=InnoDB AUTO_INCREMENT=593 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answer`
--

LOCK TABLES `Answer` WRITE;
/*!40000 ALTER TABLE `Answer` DISABLE KEYS */;
INSERT INTO `Answer` VALUES (532,'Ramesh',0),(533,'Suhas',0),(534,'Ramnath Kovind',1),(535,'Trump',0),(536,'Venkaiah Naidu',0),(537,'Mark Zuckerberg',1),(538,'Deepak R',0),(539,'Ferrari',0),(540,'Maruti Suzuki',1),(541,'Lamborghini',0),(542,'100',1),(543,'20',0),(544,'1 million',0),(545,'Proxima Centauri',0),(546,'The Sun',1),(547,'Mars',0),(548,'Jupiter',0),(549,'tan(x)',0),(550,'-cos(x)',1),(551,'sec^2(x)',0),(552,'Floyd\'s ',0),(553,'Warshall\'s',0),(554,'Binary Search',0),(555,'Dijkstra\'s',1),(556,'Linus Torvalds',1),(557,'Deepak R',0),(558,'Bill Gates',0),(559,'Dipu Saha',0),(560,'3x10^8m/s',1),(561,'9x10^8m/s',0),(562,'3x10^6m/s',0),(563,'Polymorphism',0),(564,'Inheritance',1),(565,'Overloading',0),(566,'Downloading',0),(567,'Builder method',1),(568,'factory method',0),(569,'None of the above',0),(570,'observer pattern',0),(571,'regular expressions',0),(572,'Simon Gilchrist',0),(573,'Dennis M Ritchie',1),(574,'Harry Potter',0),(575,'11',0),(576,'3',0),(577,'1',0),(578,'None of the above',1),(579,'11',0),(580,'1',0),(581,'None of the above',1),(582,'3',0),(583,'123',0),(584,'323',1),(585,'45',0),(586,'123',0),(587,'323',1),(588,'45',0),(589,'123',0),(590,'789',0),(591,'456',0),(592,'678',1);
/*!40000 ALTER TABLE `Answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Question`
--

DROP TABLE IF EXISTS `Question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Question` (
  `quest_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `question` varchar(1500) COLLATE utf8mb4_general_ci NOT NULL,
  `type` tinyint(4) NOT NULL,
  PRIMARY KEY (`quest_id`),
  KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Question`
--

LOCK TABLES `Question` WRITE;
/*!40000 ALTER TABLE `Question` DISABLE KEYS */;
INSERT INTO `Question` VALUES (170,'Who is the president of India?',1),(171,'Who is the founder of facebook?',1),(172,'Car company that owns Alto?',1),(173,'if 1 apple costs 10 rupees, 10 apples cost?',2),(174,'Which is the nearest star?',1),(175,'Integral of sin(x)?',3),(176,'Google maps uses which algorithm?',2),(177,'Who created Linux?',2),(178,'velocity of light in vacuum?',3),(179,'Property of inheriting properties from parents in OOPs?',2),(180,'Which one of the following is an Anti-pattern?',3),(181,'Who is the creator of C?',2),(182,'what is 1+1?',1),(183,'what is 1+1?',1),(184,'test',1),(185,'test',1),(186,'hihihihihhihi',2);
/*!40000 ALTER TABLE `Question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuestionLibrary`
--

DROP TABLE IF EXISTS `QuestionLibrary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuestionLibrary` (
  `quest_id` bigint(20) NOT NULL,
  `ans_id` bigint(20) NOT NULL,
  PRIMARY KEY (`quest_id`,`ans_id`),
  KEY `ans_id` (`ans_id`),
  CONSTRAINT `questionlibrary_ibfk_1` FOREIGN KEY (`quest_id`) REFERENCES `question` (`quest_id`) ON UPDATE CASCADE,
  CONSTRAINT `questionlibrary_ibfk_2` FOREIGN KEY (`ans_id`) REFERENCES `answer` (`ans_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuestionLibrary`
--

LOCK TABLES `QuestionLibrary` WRITE;
/*!40000 ALTER TABLE `QuestionLibrary` DISABLE KEYS */;
INSERT INTO `QuestionLibrary` VALUES (170,532),(170,533),(170,534),(170,535),(171,536),(171,537),(171,538),(172,539),(172,540),(172,541),(173,542),(173,543),(173,544),(174,545),(174,546),(174,547),(174,548),(175,549),(175,550),(175,551),(176,552),(176,553),(176,554),(176,555),(177,556),(177,557),(177,558),(177,559),(178,560),(178,561),(178,562),(179,563),(179,564),(179,565),(179,566),(180,567),(180,568),(180,569),(180,570),(180,571),(181,572),(181,573),(181,574),(182,575),(182,576),(182,577),(182,578),(183,579),(183,580),(183,581),(183,582),(184,583),(184,584),(184,585),(185,586),(185,587),(185,588),(186,589),(186,590),(186,591),(186,592);
/*!40000 ALTER TABLE `QuestionLibrary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuestionPool`
--

DROP TABLE IF EXISTS `QuestionPool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuestionPool` (
  `test_id` int(11) NOT NULL,
  `quest_id` bigint(20) NOT NULL,
  PRIMARY KEY (`test_id`,`quest_id`),
  KEY `quest_id` (`quest_id`),
  CONSTRAINT `questionpool_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `test` (`test_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `questionpool_ibfk_2` FOREIGN KEY (`quest_id`) REFERENCES `question` (`quest_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuestionPool`
--

LOCK TABLES `QuestionPool` WRITE;
/*!40000 ALTER TABLE `QuestionPool` DISABLE KEYS */;
INSERT INTO `QuestionPool` VALUES (17,170),(27,170),(29,170),(17,171),(27,171),(17,172),(27,172),(29,172),(30,172),(17,173),(30,173),(17,174),(29,174),(30,174),(17,175),(29,175),(17,176),(27,176),(17,177),(27,177),(29,177),(17,178),(27,178),(17,179),(29,179),(17,180),(27,180),(29,180),(17,181),(29,181),(17,182),(27,182),(29,182),(17,183);
/*!40000 ALTER TABLE `QuestionPool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Scoreboard`
--

DROP TABLE IF EXISTS `Scoreboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Scoreboard` (
  `user_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `score` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`test_id`),
  KEY `test_id` (`test_id`),
  CONSTRAINT `scoreboard_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `scoreboard_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `test` (`test_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Scoreboard`
--

LOCK TABLES `Scoreboard` WRITE;
/*!40000 ALTER TABLE `Scoreboard` DISABLE KEYS */;
INSERT INTO `Scoreboard` VALUES (4,17,1);
/*!40000 ALTER TABLE `Scoreboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Test`
--

DROP TABLE IF EXISTS `Test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Test` (
  `test_id` int(11) NOT NULL AUTO_INCREMENT,
  `test_name` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `proctor` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `duration` smallint(6) DEFAULT NULL,
  `sched_start` bigint(20) DEFAULT NULL,
  `sched_end` bigint(20) DEFAULT NULL,
  `easy` smallint(6) DEFAULT '0',
  `medium` smallint(6) DEFAULT '0',
  `hard` smallint(6) DEFAULT '0',
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Test`
--

LOCK TABLES `Test` WRITE;
/*!40000 ALTER TABLE `Test` DISABLE KEYS */;
INSERT INTO `Test` VALUES (17,'REVA Practo Test','123123',60,1580077320,1580293440,4,3,2),(18,'BMSIT Practo Test','123123',180,885505860,1590231240,5,3,2),(19,'BMSIT Practo Test','123123',180,885505860,1590231240,5,3,2),(20,'BMSIT Practo Test','123123',180,885505860,1590231240,4,3,2),(21,'BMSIT Practo Test','123123',180,885505860,1590231240,4,3,2),(22,'dasd','adsad',232,-9223372036854775808,-9223372036854775808,222,222,222),(23,'dasd','adsad',232,-9223372036854775808,-9223372036854775808,222,222,222),(24,'dasd','adsad',232,-9223372036854775808,-9223372036854775808,222,222,222),(25,'dasdsad','asdasdas',123,-9223372036854775808,-9223372036854775808,0,0,0),(26,'dasdsad','asdasdas',123,-9223372036854775808,-9223372036854775808,23,23,23),(27,'Dipu','12312',232,-9223372036854775808,-9223372036854775808,52,51,56),(28,'','',0,-9223372036854775808,-9223372036854775808,0,0,0),(29,'IIT','iit2020',180,-9223372036854775808,-9223372036854775808,4,3,2),(30,'','',0,-9223372036854775808,-9223372036854775808,0,0,0);
/*!40000 ALTER TABLE `Test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TestInvite`
--

DROP TABLE IF EXISTS `TestInvite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TestInvite` (
  `user_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`test_id`),
  KEY `test_id` (`test_id`),
  CONSTRAINT `testinvite_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `testinvite_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `test` (`test_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TestInvite`
--

LOCK TABLES `TestInvite` WRITE;
/*!40000 ALTER TABLE `TestInvite` DISABLE KEYS */;
INSERT INTO `TestInvite` VALUES (4,17);
/*!40000 ALTER TABLE `TestInvite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` char(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `college_name` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `degree` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (4,'Deepak R','deepak.r@practo.com','9740720910','1998-08-31','REVA University','B.Tech','e756a91150ea80a4ccb4fc8299a45469d517830f06dd66514115391d75d48e21'),(5,'pruthviraj','pruthvi@gmail.com','97987987','1311-03-13','BMSIT','idk','3cc849279ba298b587a34cabaeffc5ecb3a044bbf97c516fab7ede9d1af77cfa'),(6,'Deepak Ramachandran','deepakcoder98@gmail.com','9740720910','1998-03-10','IIT Bangalore','B.Arch','e756a91150ea80a4ccb4fc8299a45469d517830f06dd66514115391d75d48e21'),(7,'Deepak Ramachandran','deepakcoder98@gmail.com','9740720910','1998-03-10','IIT Bangalore','B.Arch','e756a91150ea80a4ccb4fc8299a45469d517830f06dd66514115391d75d48e21');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAnswers`
--

DROP TABLE IF EXISTS `UserAnswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAnswers` (
  `user_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `quest_id` bigint(20) NOT NULL,
  `ans_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`test_id`,`quest_id`),
  KEY `test_id` (`test_id`),
  KEY `quest_id` (`quest_id`),
  KEY `ans_id` (`ans_id`),
  CONSTRAINT `useranswers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `useranswers_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `test` (`test_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `useranswers_ibfk_3` FOREIGN KEY (`quest_id`) REFERENCES `question` (`quest_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `useranswers_ibfk_4` FOREIGN KEY (`ans_id`) REFERENCES `answer` (`ans_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAnswers`
--

LOCK TABLES `UserAnswers` WRITE;
/*!40000 ALTER TABLE `UserAnswers` DISABLE KEYS */;
INSERT INTO `UserAnswers` VALUES (4,17,171,538),(4,17,174,547),(4,17,182,578);
/*!40000 ALTER TABLE `UserAnswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserQuestions`
--

DROP TABLE IF EXISTS `UserQuestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserQuestions` (
  `test_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quest_id` bigint(20) NOT NULL,
  PRIMARY KEY (`test_id`,`user_id`,`quest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserQuestions`
--

LOCK TABLES `UserQuestions` WRITE;
/*!40000 ALTER TABLE `UserQuestions` DISABLE KEYS */;
INSERT INTO `UserQuestions` VALUES (17,4,171),(17,4,174),(17,4,175),(17,4,176),(17,4,177),(17,4,179),(17,4,180),(17,4,182),(17,4,183),(18,4,170),(18,4,171),(18,4,172),(18,4,173),(18,4,175),(18,4,177),(18,4,179),(18,4,180);
/*!40000 ALTER TABLE `UserQuestions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-28  6:25:52
