 
 
Feature: Visit cucumber wikipedia and do normal screenshot , fullscreen page snapshot, then compare them
  Background: A user visits a site and do normal screenshot
    Given visit to sitepath "https://en.wikipedia.org/wiki/Cucumber"

  Scenario: Do normal screenshot
    Then I screenshot with name "normal-screenshot"
  Scenario: Do fullpage fullscreen screenshot
    And I fullpage screenshot with name "fullpage-screenshot"
  Scenario: Compare normal vs fullscreen screen snapshot
    And I compare a screenshot with name "normal-screenshot" vs "fullpage-screenshot" = "difference-screenshot"