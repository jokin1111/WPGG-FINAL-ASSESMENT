-- MySQL dump 10.13  Distrib 8.4.8, for Linux (x86_64)
--
-- Host: localhost    Database: wpgg_api
-- ------------------------------------------------------
-- Server version	8.4.8

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
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_requests`
--

DROP TABLE IF EXISTS `friend_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_requests` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` bigint unsigned NOT NULL,
  `receiver_id` bigint unsigned NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `friend_requests_sender_id_foreign` (`sender_id`),
  KEY `friend_requests_receiver_id_foreign` (`receiver_id`),
  KEY `friend_requests_status_index` (`status`),
  CONSTRAINT `friend_requests_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `friend_requests_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_requests`
--

LOCK TABLES `friend_requests` WRITE;
/*!40000 ALTER TABLE `friend_requests` DISABLE KEYS */;
INSERT INTO `friend_requests` VALUES (1,1,2,'accepted','2026-03-12 02:16:55','2026-05-01 16:28:49'),(2,1,2,'accepted','2026-05-01 17:08:49','2026-05-01 17:09:08'),(3,1,2,'accepted','2026-05-01 17:09:57','2026-05-01 17:10:00'),(4,1,2,'accepted','2026-05-02 12:05:17','2026-05-02 12:06:03');
/*!40000 ALTER TABLE `friend_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `friend_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `friends_user_id_friend_id_unique` (`user_id`,`friend_id`),
  KEY `friends_friend_id_foreign` (`friend_id`),
  CONSTRAINT `friends_friend_id_foreign` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `friends_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_03_10_163344_create_player_profiles_table',1),(5,'2026_03_11_180946_create_personal_access_tokens_table',1),(6,'2026_03_11_182941_create_posts_table',1),(7,'2026_03_12_000456_create_friend_requests_table',1),(8,'2026_03_12_000516_create_friends_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'auth_token','e1c1eb3fc5a0e553a2915eea6fed082f7f6a11e1d8ff047498c1dde9ad20f98b','[\"*\"]',NULL,NULL,'2026-03-12 02:15:21','2026-03-12 02:15:21'),(2,'App\\Models\\User',2,'auth_token','417236bb2288b543cdf18d41315e2244dde495437b61409130193042dc61a4b7','[\"*\"]',NULL,NULL,'2026-03-12 02:15:35','2026-03-12 02:15:35'),(3,'App\\Models\\User',1,'auth_token','5aa26e16177cf7d676cb11907957d699609f3a4db161e1d06fe5d1ef13897bca','[\"*\"]','2026-05-01 17:06:08',NULL,'2026-03-12 02:15:47','2026-05-01 17:06:08'),(8,'App\\Models\\User',1,'auth_token','1ebe13012b3309a254615edbe175be2c4b531d95612268e5b3a08aa82f9d7977','[\"*\"]','2026-05-01 11:17:19',NULL,'2026-05-01 11:17:07','2026-05-01 11:17:19'),(13,'App\\Models\\User',2,'auth_token','02075e4db4362d91411d137c31c974ba6b7f0a78e83fc2a022db6d4baeca7eab','[\"*\"]',NULL,NULL,'2026-05-01 16:21:28','2026-05-01 16:21:28'),(14,'App\\Models\\User',1,'auth_token','4b475b2e5c446eae8e6a547ac99fdae7a4096be3b01a366407aacdde79f52346','[\"*\"]',NULL,NULL,'2026-05-01 16:21:35','2026-05-01 16:21:35'),(15,'App\\Models\\User',2,'auth_token','afdb0e8f9208d1d82ba53f1f1b2216f332e57a350bc002e3539b2a9e386f3c3c','[\"*\"]','2026-05-01 16:28:49',NULL,'2026-05-01 16:22:21','2026-05-01 16:28:49'),(16,'App\\Models\\User',1,'auth_token','a97131aab0446c4c0d263b68f778b3b363316489713f4f9d1675f14e0fe4dbda','[\"*\"]','2026-05-01 17:02:31',NULL,'2026-05-01 17:02:22','2026-05-01 17:02:31'),(17,'App\\Models\\User',2,'auth_token','89c7b6ec8ccae0e1308fa26d4b2d73742f35d026d5962eb393f5daa76ef49b97','[\"*\"]',NULL,NULL,'2026-05-01 17:02:59','2026-05-01 17:02:59'),(18,'App\\Models\\User',1,'auth_token','df0449ced3d795a9c71878aca8581f8da45cb6e518d086ab213f7820bd3a5d31','[\"*\"]',NULL,NULL,'2026-05-01 17:03:03','2026-05-01 17:03:03'),(19,'App\\Models\\User',2,'auth_token','aa044c7e3d0716751a9560e1a90e858e539838fd7969c7ad816cbdb2c0301f19','[\"*\"]',NULL,NULL,'2026-05-01 17:03:47','2026-05-01 17:03:47'),(20,'App\\Models\\User',2,'auth_token','2a02362c4753222844f92fca55aabedce3a064cffb1b17eb016243ef563add7a','[\"*\"]','2026-05-01 17:04:43',NULL,'2026-05-01 17:04:06','2026-05-01 17:04:43'),(21,'App\\Models\\User',1,'auth_token','391e43786dd7ac1df5d88bd3b43423f9109552a0cd6be99cbdd6b52237992a3c','[\"*\"]','2026-05-01 17:09:57',NULL,'2026-05-01 17:06:19','2026-05-01 17:09:57'),(23,'App\\Models\\User',1,'auth_token','9ed42abfb875e5175df7a162be075afaae263e0f6185a0c9521d62f572d212dc','[\"*\"]','2026-05-01 17:38:40',NULL,'2026-05-01 17:31:15','2026-05-01 17:38:40'),(24,'App\\Models\\User',1,'auth_token','3d4dd51fcca9024fff60f701dd8332ffe08d7197fa9deeb0975c4600b086e1ee','[\"*\"]','2026-05-01 17:40:23',NULL,'2026-05-01 17:40:07','2026-05-01 17:40:23'),(25,'App\\Models\\User',2,'auth_token','4dbc9072becf9a814a34fe9cef789f95c9c5ed86cdddac9bf361c79e5ca2f133','[\"*\"]','2026-05-01 18:41:03',NULL,'2026-05-01 17:40:35','2026-05-01 18:41:03'),(28,'App\\Models\\User',2,'auth_token','f5b626c88fa0132d6c67e725dec0ec2f5e7ea4faa693b0d5561c3a05cd224931','[\"*\"]','2026-05-01 18:13:58',NULL,'2026-05-01 18:13:03','2026-05-01 18:13:58'),(29,'App\\Models\\User',1,'auth_token','bf3d760ae279143b2e7b2b1b722a2647e3b5111829537fbc6c846587b7b303e6','[\"*\"]','2026-05-01 18:15:13',NULL,'2026-05-01 18:14:19','2026-05-01 18:15:13'),(36,'App\\Models\\User',3,'auth_token','73022743a026becf15817d184fcb353af2c40f46ad4ea8b8460afefb565e25ac','[\"*\"]','2026-05-02 14:48:45',NULL,'2026-05-02 12:26:10','2026-05-02 14:48:45');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_profiles`
--

DROP TABLE IF EXISTS `player_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_profiles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `summoner_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `riot_region` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferred_role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secondary_role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rank_tier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `availability_text` text COLLATE utf8mb4_unicode_ci,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `is_public` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `player_profiles_user_id_foreign` (`user_id`),
  KEY `player_profiles_preferred_role_index` (`preferred_role`),
  KEY `player_profiles_rank_tier_index` (`rank_tier`),
  CONSTRAINT `player_profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_profiles`
--

LOCK TABLES `player_profiles` WRITE;
/*!40000 ALTER TABLE `player_profiles` DISABLE KEYS */;
INSERT INTO `player_profiles` VALUES (1,1,'lolololol edit lololo','EUW','Support','Mid','Gold','Evenings and weekends','Support main looking for duo queue teammates.',1,'2026-03-12 02:15:21','2026-05-01 18:41:31'),(2,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-03-12 02:15:35','2026-03-12 02:15:35'),(3,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-05-02 12:26:10','2026-05-02 12:26:10');
/*!40000 ALTER TABLE `player_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `preferred_role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rank_tier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mic_required` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_user_id_foreign` (`user_id`),
  KEY `posts_preferred_role_index` (`preferred_role`),
  KEY `posts_rank_tier_index` (`rank_tier`),
  KEY `posts_region_index` (`region`),
  KEY `posts_status_index` (`status`),
  CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (5,1,'Post editado con éxito','Post editado con éxito','Ranked Duo','ADC','Gold','EUW',0,'active','2026-05-01 11:35:49','2026-05-01 11:36:07'),(7,2,'Post histórico para la bbdd','KEKW','Ranked Duo','ADC','Gold','EUW',1,'active','2026-05-02 12:07:24','2026-05-02 12:07:24');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'joaquin','joaquin@test.com',NULL,'$2y$12$Xln19RDYTR0F8ucFNc5Z8.eOnUqoeATlvxM3nKOf7wsasHE9AnVd6',NULL,'2026-03-12 02:15:21','2026-03-12 02:15:21'),(2,'miriam','miriam@test.com',NULL,'$2y$12$RphnaOvM0Ljb.AC.bR5Gne4EqYfl/zM9iJAOiPTlgOpiboUJAfjA.',NULL,'2026-03-12 02:15:35','2026-03-12 02:15:35'),(3,'CarmeloLosa','Carmelolosa@gmail.com',NULL,'$2y$12$jIPxYDSvchitlBEf5GXnQO1E928GK9zNF6gY4xs30FkcxwHmY8NPK',NULL,'2026-05-02 12:26:10','2026-05-02 12:26:10');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-02 15:16:57
