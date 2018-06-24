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

## [Unreleased]
### Added
- added display of number of movies in collection [#53]
- catalog can be set/unset to public visibility [#55]
### Changed
- [migrated to Angular 6](https://github.com/dArignac/treasury/projects/3)
    - introduced changelog file [#72]
    - fixed broken movie addition [#63]
    - updated all other libs than Angular to most current usable version [#66]
- migrated Firebase Cloud Functions to version 1 [#59]


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


[Unreleased]: https://github.com/darignac/treasury/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/darignac/treasury/compare/v1.0.0...v1.0.1
[#72]: https://github.com/dArignac/treasury/issues/72
[#66]: https://github.com/dArignac/treasury/issues/66
[#63]: https://github.com/dArignac/treasury/issues/63
[#59]: https://github.com/dArignac/treasury/issues/59
[#55]: https://github.com/dArignac/treasury/pull/55
[#53]: https://github.com/dArignac/treasury/pull/53