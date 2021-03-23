 
 
Feature: Do screenshot compare between two images
  Background: A user visits a site
    Given visit to sitepath "http://www.example.com"

  Scenario: Compare different image should have failed
    Then I compare a screenshot with name "image-screenshot-1" vs "image-screenshot-2" = "different-1-vs-2-screenshot"
  Scenario: Compare same image should have passed
    And I compare a screenshot with name "image-screenshot-1" vs "image-screenshot-1" = "same-screenshot"