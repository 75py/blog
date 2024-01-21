---
title: 'Karabiner-Elements F3, F4でデスクトップを左右に切り替える'
description: ''
pubDate: '2024-01-21'
heroImage: '../../../../../images/categories/programming.png'
tags:
  - Karabiner-Elements
---

Macの仮想デスクトップを切り替えるコマンドは Ctrl + ←, Ctrl + → だが、これをF3, F4キーで行えるようにする設定。

```json
{
    "description": "Map F4 to Control+Right Arrow",
    "manipulators": [
        {
            "from": {
                "key_code": "f4"
            },
            "to": [
                {
                    "key_code": "right_arrow",
                    "modifiers": [
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        }
    ]
}
```

```json
{
    "description": "Map F3 to Control+Left Arrow",
    "manipulators": [
        {
            "from": {
                "key_code": "f3"
            },
            "to": [
                {
                    "key_code": "left_arrow",
                    "modifiers": [
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        }
    ]
}
```