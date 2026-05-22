-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: localhost    Database: gaiadb
-- ------------------------------------------------------
-- Server version	5.5.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table `audit_transaction_log`
--

DROP TABLE IF EXISTS `audit_transaction_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_transaction_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL COMMENT 'Date of the event',
  `pid` int(11) DEFAULT NULL COMMENT 'Patient ID',
  `eid` int(11) DEFAULT NULL COMMENT 'Encounter ID',
  `uid` int(11) DEFAULT NULL COMMENT 'User ID',
  `fid` int(11) DEFAULT NULL COMMENT 'Facility ID',
  `event` varchar(10) DEFAULT NULL COMMENT 'Event UPDATE INSERT DELETE',
  `table_name` varchar(60) DEFAULT NULL,
  `sql_string` mediumtext,
  `data` mediumtext COMMENT 'serialized data',
  `ip` varchar(40) DEFAULT NULL,
  `checksum` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`),
  KEY `eid` (`eid`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8 COMMENT='Data INSERT UPDATE DELETE Logs';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line1` varchar(255) DEFAULT NULL,
  `line2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(35) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `plus_four` varchar(4) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `foreign_id` int(11) DEFAULT NULL,
  `create_uid` int(11) DEFAULT NULL COMMENT 'create user ID',
  `write_uid` int(11) DEFAULT NULL COMMENT 'update user ID',
  `create_date` datetime DEFAULT NULL COMMENT 'create date',
  `update_date` datetime DEFAULT NULL COMMENT 'last update date',
  `address_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `foreign_id` (`foreign_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `acl_role_perms`
--

DROP TABLE IF EXISTS `acl_role_perms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_role_perms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` tinyint(1) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `perm_id` int(11) DEFAULT NULL,
  `add_date` datetime DEFAULT NULL COMMENT 'Date Added',
  PRIMARY KEY (`id`),
  KEY `IK_role_id` (`role_id`),
  KEY `IK_perm_id` (`perm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1050 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `documents_templates`
--

DROP TABLE IF EXISTS `documents_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `template_type` varchar(50) DEFAULT NULL,
  `body` text,
  `date` datetime DEFAULT NULL COMMENT 'to be replace by created_date',
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `created_by_uid` int(11) DEFAULT NULL,
  `updated_by_uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `template_type` (`template_type`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `combo_lists`
--

DROP TABLE IF EXISTS `combo_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `combo_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT 'Title of the combo',
  `active` tinyint(1) DEFAULT NULL COMMENT 'Active?',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `geo_country_reference`
--

DROP TABLE IF EXISTS `geo_country_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `geo_country_reference` (
  `countries_id` int(5) NOT NULL AUTO_INCREMENT,
  `countries_name` varchar(64) DEFAULT NULL,
  `countries_iso_code_2` char(2) NOT NULL DEFAULT '',
  `countries_iso_code_3` char(3) NOT NULL DEFAULT '',
  PRIMARY KEY (`countries_id`),
  KEY `IDX_COUNTRIES_NAME` (`countries_name`)
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `combo_lists_options`
--

DROP TABLE IF EXISTS `combo_lists_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `combo_lists_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list_id` int(11) NOT NULL DEFAULT '0' COMMENT 'List ID',
  `option_value` varchar(255) NOT NULL DEFAULT '' COMMENT 'Value',
  `option_name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `code` varchar(15) DEFAULT NULL COMMENT 'value code',
  `code_type` varchar(10) DEFAULT NULL COMMENT 'CPT4 LOINC SNOMEDCT ICD9 ICD10 RXNORM',
  `seq` int(11) DEFAULT NULL COMMENT 'Sequence',
  `notes` varchar(255) DEFAULT NULL COMMENT 'Notes',
  `active` tinyint(1) DEFAULT NULL COMMENT 'Active?',
  PRIMARY KEY (`id`,`list_id`,`option_value`),
  KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=1203 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users_sessions`
--

DROP TABLE IF EXISTS `users_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_sessions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sid` varchar(255) DEFAULT NULL COMMENT 'Session ID',
  `uid` int(11) DEFAULT NULL COMMENT 'User ID',
  `login` int(11) DEFAULT NULL,
  `logout` int(11) DEFAULT NULL,
  `last_request` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3403 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `version`
--

DROP TABLE IF EXISTS `version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `version` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `v_major` int(11) NOT NULL DEFAULT '0',
  `v_minor` int(11) NOT NULL DEFAULT '0',
  `v_patch` int(11) NOT NULL DEFAULT '0',
  `v_tag` varchar(31) NOT NULL DEFAULT '',
  `v_database` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `acl_permissions`
--

DROP TABLE IF EXISTS `acl_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `perm_key` varchar(255) DEFAULT NULL,
  `perm_name` varchar(255) DEFAULT NULL COMMENT 'Permission Name',
  `perm_cat` varchar(255) DEFAULT NULL COMMENT 'Permission Category',
  `seq` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permKey` (`perm_key`),
  KEY `IK_perm_key` (`perm_key`),
  KEY `IK_seq` (`seq`),
  KEY `IK_active` (`active`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `geo_zone_reference`
--

DROP TABLE IF EXISTS `geo_zone_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `geo_zone_reference` (
  `zone_id` int(5) NOT NULL AUTO_INCREMENT,
  `zone_country_id` int(5) NOT NULL DEFAULT '0',
  `zone_code` varchar(5) DEFAULT NULL,
  `zone_name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`zone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification_settings`
--

DROP TABLE IF EXISTS `notification_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_settings` (
  `SettingsId` int(3) NOT NULL AUTO_INCREMENT,
  `Send_SMS_Before_Hours` int(3) NOT NULL,
  `Send_Email_Before_Hours` int(3) NOT NULL,
  `SMS_gateway_username` varchar(100) NOT NULL,
  `SMS_gateway_password` varchar(100) NOT NULL,
  `SMS_gateway_apikey` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`SettingsId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `acl_user_roles`
--

DROP TABLE IF EXISTS `acl_user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_user_roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` longtext,
  `user` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_sencha_model`
--

DROP TABLE IF EXISTS `_sencha_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_sencha_model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(150) DEFAULT NULL,
  `modelData` varchar(21000) DEFAULT NULL,
  `modelLastChange` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `globals`
--

DROP TABLE IF EXISTS `globals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `globals` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gl_name` varchar(255) DEFAULT NULL COMMENT 'Global Setting Unique Name or Key',
  `gl_index` int(11) DEFAULT NULL COMMENT 'Global Setting Index',
  `gl_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Global Setting Value',
  `gl_category` varchar(255) DEFAULT NULL COMMENT 'Category',
  PRIMARY KEY (`id`),
  KEY `gl_name` (`gl_name`,`gl_index`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `phone_numbers`
--

DROP TABLE IF EXISTS `phone_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phone_numbers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country_code` varchar(5) DEFAULT NULL,
  `area_code` char(3) DEFAULT NULL,
  `prefix` char(3) DEFAULT NULL,
  `number` varchar(4) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `foreign_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `foreign_id` (`foreign_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `event` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `facility` varchar(255) NOT NULL,
  `comments` longtext,
  `user_notes` longtext,
  `patient_id` bigint(20) DEFAULT NULL,
  `success` tinyint(1) DEFAULT '1',
  `checksum` longtext,
  `crt_user` varchar(255) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_settings`
--

DROP TABLE IF EXISTS `user_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_settings` (
  `setting_user` bigint(20) NOT NULL DEFAULT '0',
  `setting_label` varchar(63) NOT NULL,
  `setting_value` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`setting_user`,`setting_label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `acl_groups`
--

DROP TABLE IF EXISTS `acl_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IK_active` (`active`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `acl_user_perms`
--

DROP TABLE IF EXISTS `acl_user_perms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_user_perms` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL COMMENT 'Value',
  `add_date` datetime DEFAULT NULL COMMENT 'Date Added',
  `perm_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IK_perm_id` (`perm_id`),
  KEY `IK_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `acl_roles`
--

DROP TABLE IF EXISTS `acl_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL COMMENT 'Role Name',
  `seq` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IK_group_id` (`group_id`),
  KEY `IK_seq` (`seq`),
  KEY `IK_active` (`active`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `eid` int(11) DEFAULT NULL COMMENT 'Encounter ID',
  `pid` int(11) DEFAULT NULL COMMENT 'Patient ID',
  `uid` int(11) DEFAULT NULL COMMENT 'User ID',
  `fid` int(11) DEFAULT NULL COMMENT 'Facility ID',
  `event` varchar(200) DEFAULT NULL COMMENT 'Event description',
  `date` datetime DEFAULT NULL COMMENT 'Date of the event',
  PRIMARY KEY (`id`),
  KEY `eid` (`eid`),
  KEY `pid` (`pid`),
  KEY `uid` (`uid`),
  KEY `fid` (`fid`)
) ENGINE=InnoDB AUTO_INCREMENT=5228 DEFAULT CHARSET=utf8 COMMENT='Audit Logs';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `modules_data`
--

DROP TABLE IF EXISTS `modules_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modules_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) DEFAULT NULL,
  `version` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `data` longtext,
  PRIMARY KEY (`id`),
  KEY `data` (`data`(767))
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='this table if a convivnient table to store module related data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL COMMENT 'acl_user_roles relation',
  `facility_id` int(11) DEFAULT NULL COMMENT 'default facility',
  `warehouse_id` int(11) DEFAULT NULL COMMENT 'default warehouse',
  `username` varchar(20) DEFAULT NULL COMMENT 'username',
  `password` blob COMMENT 'password',
  `pwd_history1` blob COMMENT 'first password history backwards',
  `pwd_history2` blob COMMENT 'second password history backwards',
  `title` varchar(10) DEFAULT NULL COMMENT 'title (Mr. Mrs.)',
  `fname` varchar(80) DEFAULT NULL COMMENT 'first name',
  `mname` varchar(80) DEFAULT NULL COMMENT 'middle name',
  `lname` varchar(120) DEFAULT NULL COMMENT 'last name',
  `pin` varchar(10) DEFAULT NULL COMMENT 'pin number',
  `npi` varchar(15) DEFAULT NULL COMMENT 'National Provider Identifier',
  `lic` varchar(80) DEFAULT NULL,
  `ess` varchar(80) DEFAULT NULL,
  `upin` varchar(80) DEFAULT NULL,
  `fedtaxid` varchar(80) DEFAULT NULL COMMENT 'federal tax id',
  `feddrugid` varchar(80) DEFAULT NULL COMMENT 'federal drug id',
  `notes` varchar(300) DEFAULT NULL COMMENT 'notes',
  `email` varchar(150) DEFAULT NULL COMMENT 'email',
  `specialty` mediumtext COMMENT 'specialty',
  `taxonomy` varchar(40) DEFAULT NULL COMMENT 'taxonomy',
  `calendar` tinyint(1) DEFAULT NULL COMMENT 'has calendar? 0=no 1=yes',
  `authorized` tinyint(1) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `direct_address` varchar(150) DEFAULT NULL COMMENT 'direct_address',
  `city` varchar(55) DEFAULT NULL,
  `state` varchar(55) DEFAULT NULL,
  `postal_code` varchar(15) DEFAULT NULL,
  `street` varchar(55) DEFAULT NULL,
  `street_cont` varchar(55) DEFAULT NULL,
  `country_code` varchar(15) DEFAULT NULL,
  `phone` varchar(80) DEFAULT NULL,
  `mobile` varchar(80) DEFAULT NULL,
  `create_uid` int(11) DEFAULT NULL COMMENT 'create user ID',
  `update_uid` int(11) DEFAULT NULL COMMENT 'update user ID',
  `create_date` datetime DEFAULT NULL COMMENT 'create date',
  `update_date` datetime DEFAULT NULL COMMENT 'last update date',
  PRIMARY KEY (`id`),
  KEY `fname` (`fname`),
  KEY `mname` (`mname`),
  KEY `lname` (`lname`),
  KEY `npi` (`npi`),
  KEY `email` (`email`),
  KEY `facility_id` (`facility_id`),
  KEY `username` (`username`),
  KEY `direct_address` (`direct_address`),
  KEY `IK_taxonomy` (`taxonomy`),
  KEY `IK_calendar` (`calendar`),
  KEY `IK_phone` (`phone`),
  KEY `IK_active` (`active`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8 COMMENT='User accounts';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_name` varchar(120) DEFAULT NULL,
  `pvt_key` varchar(80) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `enable` tinyint(1) DEFAULT NULL,
  `installed_version` varchar(20) DEFAULT NULL,
  `licensekey` varchar(255) DEFAULT NULL,
  `localkey` varchar(255) DEFAULT NULL,
  `title` varchar(80) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(5) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-16 15:45:49
