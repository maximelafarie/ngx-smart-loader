<a name="2.0.0"></a>
# 2.0.0 (Feb 21, 2019)

### Bug Fixes
* Fix the execution of loader methods in early Angular cycles such as ngOnInit (pull #12, fixes #8)

### Features
* **BREAKING CHANGE**: remove the ability to declare several loaders with same identifier
* **BREAKING CHANGE**: make `getLoader()` method private to avoid buggy cases  (pull #12, fixes #10 #11)
* Add new `onVisibleChange` event for any loader
* Add a method to stop all runing loaders (pull #12, fixes #9)
* Add a method to start all existing loaders

### Misc
* Code refactoring
* Code quality enhancements
* Add more unit tests on the library service