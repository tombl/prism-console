# Snapshot report for `test/index.ts`

The actual snapshot is saved in `index.ts.snap`.

Generated by [AVA](https://ava.li).

## highlight

> Snapshot 1

    [
      '%cconsole%c.%clog%c(%c"test"%c)',
      'color:black',
      'color:#999',
      'color:#DD4A68',
      'color:#999',
      'color:#690',
      'color:#999',
    ]

## no background-color and missing token

> Snapshot 1

    [
      '%cconsole%c.%clog%c(%c"test"%c)',
      '',
      '',
      '',
      '',
      '',
      '',
    ]

## percent in input

> Snapshot 1

    [
      '%cconsole%c.%clog%c(%c"%%ctest"%c,%c %c"color:blue"%c)',
      'color:black',
      'color:#999',
      'color:#DD4A68',
      'color:#999',
      'color:#690',
      'color:#999',
      'color:black',
      'color:#690',
      'color:#999',
    ]