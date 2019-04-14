# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

[//]: # "Added for new features."
[//]: # "Changed for changes in existing functionality."
[//]: # "Deprecated for soon-to-be removed features."
[//]: # "Removed for now removed features."
[//]: # "Fixed for any bug fixes."
[//]: # "Security in case of vulnerabilities."

## [Unreleased] - NO DATE YET
### Added
- integrated Cypress into CI, configured linting, fixed linting issues [#95]
- be able to set a nickname [#45]

## [1.1.2]
### Fixed
- hidden footer is visible again [#94]

## [1.1.1]
### Fixed
- optimized build artifact [#84]
- Firebase Functions do not work [#93]
- navigation drawer is now visible on big screens [#88]
- fixed that menu drawer is not fixed [#90]
- fixed huge top bar [#91]
- fixed horizontal scrollbar on home page [#89]

## [1.1.0]
### Added
- added optional imprint and data privacy statement component [#78] [#81]
- added privacy policy [#57] [#77]
- added display of number of movies in collection [#53]
- catalog can be set/unset to public visibility [#55]
### Changed
- updated several libraries
- switched to Material Design library [angular-mdc-web](https://github.com/trimox/angular-mdc-web) and changed several UI components [#40]
- [migrated to Angular 6](https://github.com/dArignac/treasury/projects/3)
    - fixed initialization of settings page [#67]
    - fixed deprecated mdb properties [#64] [#73]
    - fixed layout of movie addition input search field [#68]
    - introduced changelog file [#72]
    - fixed broken movie addition [#63]
    - updated all other libs than Angular to most current usable version [#66]
    - updated Angular itself [#58]
- migrated Firebase Cloud Functions to version 1 [#59]
### Removed
- remove storing of user profile data coming from social profile [#57] [#77]
### Fixed
- fixed initial Cloud Firestore document creation for new users [#76]


## [1.0.1] - 2018-01-06
### Added
- added clear button to movie search
### Fixed
- fixed display of navigation menu when in "Hamburger" state
- smaller bugfixes
### Changed
- updated to `@angular/* 5.1.3` and `@angular/cli 1.6.3`


## 1.0.0 - 2018-01-05
### Added
- be able to login with Google
- be able to configure a content language (EN or DE)
- be able to add movies
- be able to list movies


[Unreleased]: https://github.com/darignac/treasury/compare/v1.1.2...HEAD
[1.1.2]: https://github.com/darignac/treasury/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/darignac/treasury/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/darignac/treasury/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/darignac/treasury/compare/v1.0.0...v1.0.1
[#95]: https://github.com/dArignac/treasury/issues/95
[#94]: https://github.com/dArignac/treasury/issues/94
[#93]: https://github.com/dArignac/treasury/issues/93
[#91]: https://github.com/dArignac/treasury/issues/91
[#90]: https://github.com/dArignac/treasury/issues/90
[#89]: https://github.com/dArignac/treasury/issues/89
[#88]: https://github.com/dArignac/treasury/issues/88
[#84]: https://github.com/dArignac/treasury/issues/84
[#81]: https://github.com/dArignac/treasury/pull/81
[#78]: https://github.com/dArignac/treasury/issues/78
[#77]: https://github.com/dArignac/treasury/pull/77
[#76]: https://github.com/dArignac/treasury/issues/76
[#73]: https://github.com/dArignac/treasury/pull/73
[#72]: https://github.com/dArignac/treasury/issues/72
[#68]: https://github.com/dArignac/treasury/issues/68
[#67]: https://github.com/dArignac/treasury/issues/67
[#66]: https://github.com/dArignac/treasury/issues/66
[#64]: https://github.com/dArignac/treasury/issues/64
[#63]: https://github.com/dArignac/treasury/issues/63
[#59]: https://github.com/dArignac/treasury/issues/59
[#58]: https://github.com/dArignac/treasury/issues/58
[#57]: https://github.com/dArignac/treasury/issues/57
[#55]: https://github.com/dArignac/treasury/pull/55
[#53]: https://github.com/dArignac/treasury/pull/53
[#40]: https://github.com/dArignac/treasury/issues/40
