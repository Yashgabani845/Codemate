-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: techtitans
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `problemset`
--

DROP TABLE IF EXISTS `problemset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problemset` (
  `ptitle` varchar(100) DEFAULT NULL,
  `pid` int DEFAULT NULL,
  `difficulty` varchar(45) DEFAULT NULL,
  `pstatement` varchar(4500) DEFAULT NULL,
  `input1` varchar(750) DEFAULT NULL,
  `output1` varchar(750) DEFAULT NULL,
  `input2` varchar(750) DEFAULT NULL,
  `output2` varchar(750) DEFAULT NULL,
  `solution` varchar(4500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problemset`
--

LOCK TABLES `problemset` WRITE;
/*!40000 ALTER TABLE `problemset` DISABLE KEYS */;
INSERT INTO `problemset` VALUES (' Sum of Squares',1,'easy','Given a positive integer n, calculate the sum of squares of all integers from 1 to n.','3','14','5','55','#include <iostream>\r\n\r\nint sumOfSquares(int n) {\r\n    int sum = 0;\r\n    for (int i = 1; i <= n; ++i) {\r\n        sum += i * i;\r\n    }\r\n    return sum;\r\n}\r\n\r\nint main() {\r\n    int n1 = 3;\r\n    std::cout << \"Sum of squares for n = \" << n1 << \": \" << sumOfSquares(n1) << std::endl;\r\n\r\n    int n2 = 5;\r\n    std::cout << \"Sum of squares for n = \" << n2 << \": \" << sumOfSquares(n2) << std::endl;\r\n\r\n    return 0;\r\n}\r\n'),('Reverse Array',2,'easy','Given an array of integers, reverse it in-place.','1 2 3 4 5','5 4 3 2 1','7 5 4 3','3 4 5 7','#include <iostream>\r\n#include <vector>\r\n#include <algorithm>\r\n\r\nvoid reverseArray(std::vector<int>& nums) {\r\n    std::reverse(nums.begin(), nums.end());\r\n}\r\n\r\nint main() {\r\n    std::vector<int> arr1 = {1, 2, 3, 4, 5};\r\n    reverseArray(arr1);\r\n    std::cout << \"Reversed array: \";\r\n    for (int num : arr1) {\r\n        std::cout << num << \" \";\r\n    }\r\n    std::cout << std::endl;\r\n\r\n    std::vector<int> arr2 = {7, 3, 9, 2};\r\n    reverseArray(arr2);\r\n    std::cout << \"Reversed array: \";\r\n    for (int num : arr2) {\r\n        std::cout << num << \" \";\r\n    }\r\n    std::cout << std::endl;\r\n\r\n    return 0;\r\n}\r\n'),(' Count Vowels',3,'easy','Given a string, count the number of vowels (a, e, i, o, u) it contains.','hello','2','programming','3','#include <iostream>\r\n#include <string>\r\n\r\nint countVowels(std::string str) {\r\n    int count = 0;\r\n    for (char ch : str) {\r\n        if (ch == \'a\' || ch == \'e\' || ch == \'i\' || ch == \'o\' || ch == \'u\' ||\r\n            ch == \'A\' || ch == \'E\' || ch == \'I\' || ch == \'O\' || ch == \'U\') {\r\n            count++;\r\n        }\r\n    }\r\n    return count;\r\n}\r\n\r\nint main() {\r\n    std::string str1 = \"hello\";\r\n    std::cout << \"Number of vowels in \\\"\" << str1 << \"\\\": \" << countVowels(str1) << std::endl;\r\n\r\n    std::string str2 = \"programming\";\r\n    std::cout << \"Number of vowels in \\\"\" << str2 << \"\\\": \" << countVowels(str2) << std::endl;\r\n\r\n    return 0;\r\n}\r\n'),('Check Prime Number',4,'medium','Given a positive integer n, determine if it is a prime number.','7','true','12','false','#include <iostream>\r\n\r\nbool isPrime(int n) {\r\n    if (n <= 1) return false;\r\n    for (int i = 2; i * i <= n; ++i) {\r\n        if (n % i == 0) return false;\r\n    }\r\n    return true;\r\n}\r\n\r\nint main() {\r\n    int n1 = 7;\r\n    std::cout << \"Is \" << n1 << \" a prime number? \" << std::boolalpha << isPrime(n1) << std::endl;\r\n\r\n    int n2 = 12;\r\n    std::cout << \"Is \" << n2 << \" a prime number? \" << std::boolalpha << isPrime(n2) << std::endl;\r\n\r\n    return 0;\r\n}\r\n'),('Find Max.t in Array',5,'easy','Given an array of integers, find the maximum element.','5 7 8 5 9','9','1 3 4 2 5','5','#include <iostream>\r\n#include <vector>\r\n#include <climits>\r\n\r\nint findMax(std::vector<int>& nums) {\r\n    int maxNum = INT_MIN;\r\n    for (int num : nums) {\r\n        if (num > maxNum) {\r\n            maxNum = num;\r\n        }\r\n    }\r\n    return maxNum;\r\n}\r\n\r\nint main() {\r\n    std::vector<int> arr1 = {5, 9, 3, 7, 2};\r\n    std::cout << \"Maximum element in array 1: \" << findMax(arr1) << std::endl;\r\n\r\n    std::vector<int> arr2 = {10, 4, 8, 12, 6};\r\n    std::cout << \"Maximum element in array 2: \" << findMax(arr2) << std::endl;\r\n\r\n    return 0;\r\n}\r\n'),('Find Max. in Array',5,'easy','Given an array of integers, find the maximum element.','5 9 3 7 2','9','10 4 8 12 6','12','#include <iostream>\r\n#include <vector>\r\n#include <climits>\r\n\r\nint findMax(std::vector<int>& nums) {\r\n    int maxNum = INT_MIN;\r\n    for (int num : nums) {\r\n        if (num > maxNum) {\r\n            maxNum = num;\r\n        }\r\n    }\r\n    return maxNum;\r\n}\r\n\r\nint main() {\r\n    std::vector<int> arr1 = {5, 9, 3, 7, 2};\r\n    std::cout << \"Maximum element in array 1: \" << findMax(arr1) << std::endl;\r\n\r\n    std::vector<int> arr2 = {10, 4, 8, 12, 6};\r\n    std::cout << \"Maximum element in array 2: \" << findMax(arr2) << std::endl;\r\n\r\n    return 0;\r\n}\r\n'),('Reverse Integer',6,'hard','Given a 32-bit signed integer, reverse its digits.','123','321','-123','-321','#include <iostream>\r\n#include <limits>\r\n\r\nint reverse(int x) {\r\n    long rev = 0;\r\n    while (x != 0) {\r\n        rev = rev * 10 + x % 10;\r\n        x /= 10;\r\n    }\r\n    return (rev < INT_MIN || rev > INT_MAX) ? 0 : rev;\r\n}\r\n\r\nint main() {\r\n    int num1 = 123;\r\n    std::cout << \"Reverse of \" << num1 << \": \" << reverse(num1) << std::endl;\r\n\r\n    int num2 = -123;\r\n    std::cout << \"Reverse of \" << num2 << \": \" << reverse(num2) << std::endl;\r\n\r\n    return 0;\r\n}\r\n'),(' Check Armstrong Number',7,'hard',' Given a positive integer, check if it is an Armstrong number.','153','true','123','false','#include <iostream>\r\n#include <cmath>\r\n\r\nbool isArmstrong(int n) {\r\n    int sum = 0, original = n;\r\n    int digits = (int)log10(n) + 1;\r\n    while (n != 0) {\r\n        int digit = n % 10;\r\n        sum += pow(digit, digits);\r\n        n /= 10;\r\n    }\r\n    return sum == original;\r\n}\r\n\r\nint main() {\r\n    int num1 = 153;\r\n    std::cout << num1 << \" is Armstrong? \" << std::boolalpha << isArmstrong(num1) << std::endl;\r\n\r\n    int num2 = 123;\r\n    std::cout << num2 << \" is Armstrong? \" << std::boolalpha << isArmstrong(num2) << std::endl;\r\n\r\n    return 0;\r\n}\r\n'),(' Check Leap Year',8,'medium','Given a year, determine if it is a leap year.','2020','true','2021','false','#include <iostream>\r\n\r\nbool isLeapYear(int year) {\r\n    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))\r\n        return true;\r\n    else\r\n        return false;\r\n}\r\n\r\nint main() {\r\n    int year1 = 2020;\r\n    std::cout << year1 << \" is a leap year? \" << std::boolalpha << isLeapYear(year1) << std::endl;\r\n\r\n    int year2 = 2021;\r\n    std::cout << year2 << \" is a leap year? \" << std::boolalpha << isLeapYear(year2) << std::endl;\r\n\r\n    return 0;\r\n}\r\n'),('Linear Search',9,'easy','Given an array of integers and a target value, return the index of the target value in the array (or -1 if it is not present).','4 6 2 8 3\r\n6','1','1 2 3 4 5\r\n9','-1','#include <iostream>\r\n#include <vector>\r\n\r\nint linearSearch(std::vector<int>& nums, int target) {\r\n    for (int i = 0; i < nums.size(); ++i) {\r\n        if (nums[i] == target) {\r\n            return i;\r\n        }\r\n    }\r\n    return -1;\r\n}\r\n\r\nint main() {\r\n    std::vector<int> arr1 = {4, 6, 2, 8, 3};\r\n    int target1 = 6;\r\n    std::cout << \"Index of target \" << target1 << \" in array 1: \" << linearSearch(arr1, target1) << std::endl;\r\n\r\n    std::vector<int> arr2 = {1, 2, 3, 4, 5};\r\n    int target2 = 9;\r\n    std::cout << \"Index of target \" << target2 << \" in array 2: \" << linearSearch(arr2, target2) << std::endl;\r\n\r\n    return 0;\r\n}\r\n'),(' Calculate Factorial',10,'medium','Given a non-negative integer n, calculate its factorial.','5','120','0','1','#include <iostream>\r\n\r\nunsigned long long factorial(int n) {\r\n    if (n == 0) return 1;\r\n    unsigned long long result = 1;\r\n    for (int i = 1; i <= n; ++i) {\r\n        result *= i;\r\n    }\r\n    return result;\r\n}\r\n\r\nint main() {\r\n    int num1 = 5;\r\n    std::cout << \"Factorial of \" << num1 << \": \" << factorial(num1) << std::endl;\r\n\r\n    int num2 = 0;\r\n    std::cout << \"Factorial of \" << num2 << \": \" << factorial(num2) << std::endl;\r\n\r\n    return 0;\r\n}\r\n');
/*!40000 ALTER TABLE `problemset` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-25 19:56:54
