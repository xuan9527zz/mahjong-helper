export const questionSet1 = [
  {
    "id": "Q001",
    "title": "第1题｜十三幺的舍牌权衡",
    "round": "模拟对局",
    "wallRemaining": 31,
    "prompt": "模拟第1局，牌墙剩余31张，你刚摸入六条。只根据公开牌面，A–D中应优先打哪一张？",
    "hint": "这是正常摸牌后的舍牌节点；先比较向听和受入，再检查同牌此前无人响应形成的安全度变化。",
    "answerTile": "4s",
    "candidates": [
      "6s",
      "7p",
      "4s",
      "6p"
    ],
    "self": {
      "label": "你",
      "wind": "S",
      "hand": [
        "1m",
        "2m",
        "8m",
        "9m",
        "5p",
        "6p",
        "7p",
        "4s",
        "E",
        "E",
        "N",
        "C",
        "P",
        "6s"
      ],
      "river": [
        "6m",
        "6m",
        "4p",
        "4p",
        "2s",
        "6p",
        "8p",
        "4m",
        "5m",
        "F",
        "W",
        "S",
        "3p"
      ],
      "discardModes": [
        "hand",
        "draw",
        "draw",
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "draw",
        "draw"
      ],
      "melds": [],
      "drawnIndex": 13
    },
    "opponents": {
      "left": {
        "label": "上家",
        "wind": "E",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.39299999999999996,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "2p",
          "4m",
          "7p",
          "F",
          "9m",
          "9p",
          "8s",
          "S",
          "9s",
          "2p",
          "5m",
          "3s",
          "W"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "draw",
          "draw",
          "draw",
          "hand",
          "draw"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩31张。听牌概率为公开信息启发式粗估。"
      },
      "top": {
        "label": "对家",
        "wind": "N",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.39299999999999996,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "8s",
          "6p",
          "6p",
          "F",
          "8s",
          "8s",
          "9m",
          "8p",
          "4m",
          "9p",
          "3p",
          "S",
          "4s"
        ],
        "discardModes": [
          "hand",
          "hand",
          "draw",
          "hand",
          "draw",
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "hand",
          "draw",
          "hand"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩31张。听牌概率为公开信息启发式粗估。"
      },
      "right": {
        "label": "下家",
        "wind": "W",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.39299999999999996,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "6m",
          "1p",
          "4p",
          "7p",
          "7p",
          "8p",
          "S",
          "4m",
          "2p",
          "2p",
          "2s",
          "9m",
          "3p"
        ],
        "discardModes": [
          "draw",
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "draw",
          "hand",
          "draw",
          "hand"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩31张。听牌概率为公开信息启发式粗估。"
      }
    },
    "explanation": "四条。四条的模型效用最高（-6.43），舍后3向听、受入32张、潜在分20、危险度0.282。次选六条效用-7.32。判定依据：追求高分值路线、行为合理。 候选顺序已为题库版重新排列，正确选项为C。",
    "source": {
      "method": "完整136张事件回放＋公开信息行为模型V1.1",
      "ruleVersion": "GD-DEF-V1",
      "workbook": "广东麻将模拟对局10题_题库版.xlsx"
    },
    "candidateOverrides": {
      "4s": {
        "probability": 0.11966055825021081,
        "expectedLoss": 0.25013664,
        "summary": "题库综合模型首选：已计入向听、受入、潜在分与公开牌面风险"
      }
    }
  },
  {
    "id": "Q002",
    "title": "第2题｜七小对的舍牌权衡",
    "round": "模拟对局",
    "wallRemaining": 53,
    "prompt": "模拟第2局，牌墙剩余53张，你刚摸入五条。只根据公开牌面，A–D中应优先打哪一张？",
    "hint": "这是正常摸牌后的舍牌节点；先比较向听和受入，再检查同牌此前无人响应形成的安全度变化。",
    "answerTile": "2p",
    "candidates": [
      "2p",
      "9m",
      "6s",
      "4m"
    ],
    "self": {
      "label": "你",
      "wind": "S",
      "hand": [
        "3m",
        "4m",
        "4m",
        "5m",
        "9m",
        "9m",
        "2p",
        "2p",
        "1s",
        "2s",
        "6s",
        "6s",
        "7s",
        "5s"
      ],
      "river": [
        "N",
        "C",
        "8m",
        "1m",
        "1m",
        "W",
        "1p"
      ],
      "discardModes": [
        "hand",
        "hand",
        "hand",
        "hand",
        "draw",
        "hand",
        "draw"
      ],
      "melds": [],
      "drawnIndex": 13
    },
    "opponents": {
      "left": {
        "label": "上家",
        "wind": "E",
        "threat": "triplets",
        "focusSuit": "unknown",
        "readyLikelihood": 0.35300000000000004,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "6p",
          "8m",
          "4s",
          "1p",
          "1m",
          "9p",
          "W",
          "2m"
        ],
        "discardModes": [
          "hand",
          "hand",
          "draw",
          "hand",
          "hand",
          "hand",
          "draw",
          "hand"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "F",
              "F",
              "F"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰发；牌墙剩53张。听牌概率为公开信息启发式粗估。"
      },
      "top": {
        "label": "对家",
        "wind": "N",
        "threat": "triplets",
        "focusSuit": "unknown",
        "readyLikelihood": 0.24700000000000003,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "6p",
          "C",
          "1p",
          "F",
          "6p",
          "2m",
          "2m"
        ],
        "discardModes": [
          "hand",
          "hand",
          "draw",
          "draw",
          "hand",
          "hand",
          "draw"
        ],
        "melds": [
          {
            "type": "暗杠",
            "tiles": [
              "P",
              "P",
              "P",
              "P"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：暗杠白；牌墙剩53张。听牌概率为公开信息启发式粗估。"
      },
      "right": {
        "label": "下家",
        "wind": "W",
        "threat": "triplets",
        "focusSuit": "unknown",
        "readyLikelihood": 0.34700000000000003,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "5p",
          "5p",
          "8m",
          "2p",
          "2p",
          "9p",
          "5p"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "draw"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "N",
              "N",
              "N"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰北；牌墙剩53张。听牌概率为公开信息启发式粗估。"
      }
    },
    "explanation": "二筒。二筒的模型效用最高（-3.12），舍后2向听、受入43张、潜在分8、危险度0.000。次选九万效用-4.20。判定依据：追求高分值路线、行为合理。 候选顺序已为题库版重新排列，正确选项为A。",
    "source": {
      "method": "完整136张事件回放＋公开信息行为模型V1.1",
      "ruleVersion": "GD-DEF-V1",
      "workbook": "广东麻将模拟对局10题_题库版.xlsx"
    },
    "candidateOverrides": {
      "2p": {
        "probability": 0.12391614562091446,
        "expectedLoss": 0.2582708,
        "summary": "题库综合模型首选：已计入向听、受入、潜在分与公开牌面风险"
      }
    }
  },
  {
    "id": "Q003",
    "title": "第3题｜七小对的舍牌权衡",
    "round": "模拟对局",
    "wallRemaining": 41,
    "prompt": "模拟第3局，牌墙剩余41张，你刚摸入二万。只根据公开牌面，A–D中应优先打哪一张？",
    "hint": "这是正常摸牌后的舍牌节点；先比较向听和受入，再检查同牌此前无人响应形成的安全度变化。",
    "answerTile": "6s",
    "candidates": [
      "9s",
      "9p",
      "7m",
      "6s"
    ],
    "self": {
      "label": "你",
      "wind": "S",
      "hand": [
        "2m",
        "3m",
        "4m",
        "4m",
        "7m",
        "9m",
        "9m",
        "9p",
        "5s",
        "6s",
        "9s",
        "9s",
        "9s",
        "2m"
      ],
      "river": [
        "1p",
        "S",
        "1p",
        "1s",
        "F",
        "7p",
        "W",
        "6m",
        "7p",
        "4p"
      ],
      "discardModes": [
        "draw",
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "draw",
        "draw"
      ],
      "melds": [],
      "drawnIndex": 13
    },
    "opponents": {
      "left": {
        "label": "上家",
        "wind": "E",
        "threat": "triplets",
        "focusSuit": "s",
        "readyLikelihood": 0.431,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "E",
          "C",
          "P",
          "9s",
          "F",
          "S",
          "W",
          "8p",
          "6p",
          "8s",
          "4p"
        ],
        "discardModes": [
          "hand",
          "draw",
          "hand",
          "draw",
          "draw",
          "draw",
          "draw",
          "hand",
          "hand",
          "hand",
          "hand"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "6s",
              "6s",
              "6s"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰六条；牌墙剩41张。听牌概率为公开信息启发式粗估。"
      },
      "top": {
        "label": "对家",
        "wind": "N",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.32499999999999996,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "1s",
          "S",
          "1p",
          "E",
          "7p",
          "4p",
          "3s",
          "6m",
          "3m",
          "8s"
        ],
        "discardModes": [
          "hand",
          "hand",
          "draw",
          "hand",
          "hand",
          "hand",
          "draw",
          "draw",
          "draw",
          "draw"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩41张。听牌概率为公开信息启发式粗估。"
      },
      "right": {
        "label": "下家",
        "wind": "W",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.33099999999999996,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "C",
          "S",
          "P",
          "3s",
          "1s",
          "1p",
          "4s",
          "8p",
          "6p",
          "8p",
          "4s"
        ],
        "discardModes": [
          "hand",
          "draw",
          "hand",
          "hand",
          "draw",
          "draw",
          "draw",
          "draw",
          "hand",
          "draw",
          "draw"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩41张。听牌概率为公开信息启发式粗估。"
      }
    },
    "explanation": "六条。六条的模型效用最高（-3.92），舍后2向听、受入33张、潜在分8、危险度0.000。次选九条效用-4.72。判定依据：追求高分值路线、行为合理。 候选顺序已为题库版重新排列，正确选项为D。",
    "source": {
      "method": "完整136张事件回放＋公开信息行为模型V1.1",
      "ruleVersion": "GD-DEF-V1",
      "workbook": "广东麻将模拟对局10题_题库版.xlsx"
    },
    "candidateOverrides": {
      "6s": {
        "probability": 0.1405836997570716,
        "expectedLoss": 0.2972237976,
        "summary": "题库综合模型首选：已计入向听、受入、潜在分与公开牌面风险"
      }
    }
  },
  {
    "id": "Q004",
    "title": "第4题｜对对胡的舍牌权衡",
    "round": "模拟对局",
    "wallRemaining": 35,
    "prompt": "模拟第4局，牌墙剩余35张，你刚摸入六筒。只根据公开牌面，A–D中应优先打哪一张？",
    "hint": "这是正常摸牌后的舍牌节点；先比较向听和受入，再检查同牌此前无人响应形成的安全度变化。",
    "answerTile": "2s",
    "candidates": [
      "6p",
      "2s",
      "7p",
      "9s"
    ],
    "self": {
      "label": "你",
      "wind": "S",
      "hand": [
        "3p",
        "3p",
        "5p",
        "6p",
        "7p",
        "2s",
        "4s",
        "9s",
        "9s",
        "9s",
        "6p"
      ],
      "river": [
        "7m",
        "W",
        "2m",
        "C",
        "8s",
        "F",
        "S",
        "1s",
        "1s",
        "C",
        "8p",
        "1p"
      ],
      "discardModes": [
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "draw",
        "hand",
        "draw",
        "hand",
        "hand"
      ],
      "melds": [
        {
          "type": "碰",
          "tiles": [
            "P",
            "P",
            "P"
          ]
        }
      ],
      "drawnIndex": 10
    },
    "opponents": {
      "left": {
        "label": "上家",
        "wind": "E",
        "threat": "triplets",
        "focusSuit": "m",
        "readyLikelihood": 0.467,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "E",
          "W",
          "C",
          "8s",
          "8s",
          "S",
          "S",
          "2m",
          "7p",
          "5s",
          "2p",
          "1m"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "draw",
          "draw",
          "draw",
          "hand",
          "hand",
          "hand",
          "draw"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "3m",
              "3m",
              "3m"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰三万；牌墙剩35张。听牌概率为公开信息启发式粗估。"
      },
      "top": {
        "label": "对家",
        "wind": "N",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.361,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "7m",
          "9p",
          "2m",
          "6m",
          "1s",
          "2s",
          "1m",
          "5m",
          "7p",
          "2s",
          "2s"
        ],
        "discardModes": [
          "hand",
          "draw",
          "hand",
          "hand",
          "draw",
          "draw",
          "draw",
          "draw",
          "draw",
          "draw",
          "draw"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩35张。听牌概率为公开信息启发式粗估。"
      },
      "right": {
        "label": "下家",
        "wind": "W",
        "threat": "triplets",
        "focusSuit": "s",
        "readyLikelihood": 0.47300000000000003,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "2p",
          "6m",
          "1p",
          "6s",
          "2p",
          "F",
          "W",
          "N",
          "5m",
          "E",
          "8p",
          "N",
          "1p"
        ],
        "discardModes": [
          "hand",
          "draw",
          "draw",
          "hand",
          "draw",
          "hand",
          "draw",
          "draw",
          "draw",
          "draw",
          "hand",
          "draw",
          "draw"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "3s",
              "3s",
              "3s"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰三条；牌墙剩35张。听牌概率为公开信息启发式粗估。"
      }
    },
    "explanation": "二条。二条的模型效用最高（-1.36），舍后1向听、受入24张、潜在分4、危险度0.000。次选六筒效用-1.72。判定依据：追求高分值路线、行为合理。 候选顺序已为题库版重新排列，正确选项为B。",
    "source": {
      "method": "完整136张事件回放＋公开信息行为模型V1.1",
      "ruleVersion": "GD-DEF-V1",
      "workbook": "广东麻将模拟对局10题_题库版.xlsx"
    },
    "candidateOverrides": {
      "2s": {
        "probability": 0.1430473135681943,
        "expectedLoss": 0.30182616000000007,
        "summary": "题库综合模型首选：已计入向听、受入、潜在分与公开牌面风险"
      }
    }
  },
  {
    "id": "Q005",
    "title": "第5题｜七小对的舍牌权衡",
    "round": "模拟对局",
    "wallRemaining": 41,
    "prompt": "模拟第5局，牌墙剩余41张，你刚摸入八万。只根据公开牌面，A–D中应优先打哪一张？",
    "hint": "这是正常摸牌后的舍牌节点；先比较向听和受入，再检查同牌此前无人响应形成的安全度变化。",
    "answerTile": "4p",
    "candidates": [
      "8m",
      "6s",
      "4p",
      "2s"
    ],
    "self": {
      "label": "你",
      "wind": "S",
      "hand": [
        "2m",
        "2m",
        "2m",
        "4m",
        "4m",
        "7m",
        "8m",
        "9m",
        "2p",
        "4p",
        "2s",
        "6s",
        "7s",
        "8m"
      ],
      "river": [
        "W",
        "6p",
        "5p",
        "7p",
        "S",
        "F",
        "5m",
        "9m",
        "4p"
      ],
      "discardModes": [
        "hand",
        "draw",
        "draw",
        "hand",
        "draw",
        "hand",
        "hand",
        "hand",
        "draw"
      ],
      "melds": [],
      "drawnIndex": 13
    },
    "opponents": {
      "left": {
        "label": "上家",
        "wind": "E",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.33099999999999996,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "1m",
          "W",
          "S",
          "S",
          "3p",
          "3p",
          "3m",
          "7p",
          "5p",
          "1p",
          "3s"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "hand",
          "draw",
          "hand"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩41张。听牌概率为公开信息启发式粗估。"
      },
      "top": {
        "label": "对家",
        "wind": "N",
        "threat": "triplets",
        "focusSuit": "unknown",
        "readyLikelihood": 0.437,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "1p",
          "3m",
          "S",
          "N",
          "6p",
          "1p",
          "F",
          "3p",
          "3s",
          "5p",
          "N",
          "9p"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "draw",
          "draw",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "draw",
          "hand"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "E",
              "E",
              "E"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰东；牌墙剩41张。听牌概率为公开信息启发式粗估。"
      },
      "right": {
        "label": "下家",
        "wind": "W",
        "threat": "triplets",
        "focusSuit": "s",
        "readyLikelihood": 0.425,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "W",
          "C",
          "1m",
          "7p",
          "5s",
          "W",
          "6p",
          "E",
          "3m",
          "5m"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "draw",
          "hand",
          "hand"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "1s",
              "1s",
              "1s"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰一条；牌墙剩41张。听牌概率为公开信息启发式粗估。"
      }
    },
    "explanation": "四筒。四筒的模型效用最高（-4.16），舍后2向听、受入37张、潜在分8、危险度0.205。次选八万效用-4.72。判定依据：追求高分值路线、行为合理。 候选顺序已为题库版重新排列，正确选项为C。",
    "source": {
      "method": "完整136张事件回放＋公开信息行为模型V1.1",
      "ruleVersion": "GD-DEF-V1",
      "workbook": "广东麻将模拟对局10题_题库版.xlsx"
    },
    "candidateOverrides": {
      "4p": {
        "probability": 0.17054889142695753,
        "expectedLoss": 0.36505800000000005,
        "summary": "题库综合模型首选：已计入向听、受入、潜在分与公开牌面风险"
      }
    }
  }
];
