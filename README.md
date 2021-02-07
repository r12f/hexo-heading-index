# hexo-heading-index

[![npm version](https://badge.fury.io/js/hexo-heading-index.svg)](http://badge.fury.io/js/hexo-heading-index)

Automatically adding index to all headings for hexo.

## Installation

``` bash
$ npm install hexo-heading-index --save
```

## Usage

All you need to do is set the configurations in _config.ymal.

For example. The following config will add indexes like 1.2.3.4. to all headings.
```
heading_index:
  enable: true
  index_styles: "{1} {1} {1} {1} {1} {1}"
  connector: "."
  global_prefix: ""
  global_suffix: ". "
  start_level: 1
```

### Index styles

The indexes are generated in the following format:
```
<global_prefix><index_for_h1[><connector><index_for_h2><connector>...<index_for_h6>]<global_suffix>
```

And the format of the indexes for each heading level are defined in the "index_styles" configuration. They are connected by space and its format is:
```
<prefix>{style[:format:padding]}<suffix>
```

#### Index style
And currently we support the following styles:
* 0: Number index starts from 0
* 1: Number index starts from 1
* i: Roman numerals in lowercase
* I: Roman numerals in uppercase
* a: Alphabet in lowercase (if the index is greater than 26, then it will be treated as 26, i.e. 'z'.)
* A: Alphabet in uppercase (if the index is greater than 26, then it will be treated as 26, i.e. 'Z'.)

For example, ```{1}``` will create a number index starts from 1. That's why the "index_styles" in the configuration above will create indexes like 1.2.3.4. for all headings.

#### Formats
We also support a few formats for index styles "0" and "1":
* x: Output the number in lowercase hex.
* X: Output the number in uppoercase hex.
With this, we can use styles like ```0x{0:x:2}```, and it will create "0x00" index for the first h1.

#### Prefix and suffix
Some people prefer to have a '.' or ')' in the end of the indexes or having a '-' or '*' in the begin of the indexes. With prefix and suffix, we can easily do it.

For example:
* ```*{i}``` will give us index like "*vi"
* ```{i})``` will give us index like "vi)"

And if you would like the prefix and suffix for the whole index, we can specify it in the "global_prefix" and "global_suffix" fields.

For example. The following configuration will help us create indexes like "i.ii.iii.vi) " for the headings.
```
heading_index:
  enable: true
  index_styles: "{i} {i} {i} {i} {i} {i}"
  connector: "."
  global_prefix: ""
  global_suffix: ") "
```

#### Start index
Sometimes, we might want to use other tag than `<h1>` as the first heading. In this case, we could change the `start_level` in config or `heading_start_level` in post.

For example, if we want to use `<h2>`, then we could change the `_config.yml`, which will take effect in all posts:
```
heading_index:
  enable: true
  index_styles: "{1} {1} {1} {1} {1} {1}"
  connector: "."
  global_prefix: ""
  global_suffix: ". "
  start_level: 2
```

Or change the post config, which will only take effect in the specific post:
```
---
title: post title
heading_start_level: 2
---
```

## License

BSD v3
