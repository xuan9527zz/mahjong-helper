export const questionSet2 = [
  {
    "id": "Q006",
    "title": "第6题｜对对胡＋小三元的舍牌权衡",
    "round": "模拟对局",
    "wallRemaining": 0,
    "prompt": "模拟第6局，牌墙剩余0张，你刚摸入三万。只根据公开牌面，A–D中应优先打哪一张？",
    "hint": "这是正常摸牌后的舍牌节点；先比较向听和受入，再检查同牌此前无人响应形成的安全度变化。",
    "answerTile": "3m",
    "candidates": [
      "7s",
      "5s",
      "3p",
      "3m"
    ],
    "self": {
      "label": "你",
      "wind": "S",
      "hand": [
        "2p",
        "2p",
        "3p",
        "4p",
        "4p",
        "5p",
        "5p",
        "5s",
        "7s",
        "C",
        "C",
        "P",
        "P",
        "3m"
      ],
      "river": [
        "N",
        "8p",
        "1s",
        "9m",
        "6p",
        "2m",
        "9m",
        "F",
        "S",
        "F",
        "9p",
        "4s",
        "8p",
        "2m",
        "1s",
        "8s",
        "W",
        "3m",
        "E"
      ],
      "discardModes": [
        "hand",
        "hand",
        "hand",
        "draw",
        "draw",
        "draw",
        "draw",
        "hand",
        "hand",
        "draw",
        "draw",
        "hand",
        "draw",
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
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.57,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "3s",
          "W",
          "8s",
          "8m",
          "9m",
          "8m",
          "9s",
          "9s",
          "W",
          "4m",
          "3s",
          "7p",
          "9p",
          "8p",
          "2s",
          "6p",
          "7p",
          "2m",
          "1p",
          "1s",
          "1s"
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
          "hand",
          "hand",
          "hand",
          "draw",
          "draw",
          "draw",
          "hand",
          "draw",
          "draw",
          "draw",
          "draw",
          "draw"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩0张。听牌概率为公开信息启发式粗估。"
      },
      "top": {
        "label": "对家",
        "wind": "N",
        "threat": "mixedFlush",
        "focusSuit": "m",
        "readyLikelihood": 0.7699999999999999,
        "valueWeight": 8,
        "openCount": 6,
        "river": [
          "N",
          "3m",
          "7p",
          "9p",
          "6p",
          "9p",
          "F",
          "7p",
          "2s",
          "4s",
          "N",
          "9s",
          "8m",
          "4s",
          "4m",
          "E",
          "6p",
          "1m",
          "1m",
          "8s",
          "1p",
          "3m"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "draw",
          "draw",
          "hand",
          "hand",
          "draw",
          "hand",
          "draw",
          "hand",
          "hand",
          "draw",
          "draw",
          "draw",
          "draw",
          "hand",
          "hand",
          "draw"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "S",
              "S",
              "S"
            ]
          },
          {
            "type": "明杠",
            "tiles": [
              "7m",
              "7m",
              "7m",
              "7m"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露2组：碰南、明杠七万；牌墙剩0张。听牌概率为公开信息启发式粗估。"
      },
      "right": {
        "label": "下家",
        "wind": "W",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.57,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "N",
          "W",
          "8p",
          "E",
          "9m",
          "1p",
          "9s",
          "F",
          "8m",
          "2s",
          "3s",
          "6s",
          "4m",
          "E",
          "6m",
          "8s",
          "2s",
          "5m",
          "2m",
          "2p"
        ],
        "discardModes": [
          "draw",
          "draw",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "draw",
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "draw",
          "hand",
          "draw",
          "draw"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩0张。听牌概率为公开信息启发式粗估。"
      }
    },
    "explanation": "三万。三万的模型效用最高（-0.40），舍后1向听、受入9张、潜在分16、危险度0.000。次选七条效用-2.20。判定依据：行为合理。 候选顺序已为题库版重新排列，正确选项为D。",
    "source": {
      "method": "完整136张事件回放＋公开信息行为模型V1.1",
      "ruleVersion": "GD-DEF-V1",
      "workbook": "广东麻将模拟对局10题_题库版.xlsx"
    },
    "candidateOverrides": {
      "3m": {
        "probability": 0.20228933431864976,
        "expectedLoss": 0.70509744,
        "summary": "题库综合模型首选：已计入向听、受入、潜在分与公开牌面风险"
      }
    }
  },
  {
    "id": "Q007",
    "title": "第7题｜十三幺的舍牌权衡",
    "round": "模拟对局",
    "wallRemaining": 35,
    "prompt": "模拟第7局，牌墙剩余35张，你刚摸入九条。只根据公开牌面，A–D中应优先打哪一张？",
    "hint": "这是正常摸牌后的舍牌节点；先比较向听和受入，再检查同牌此前无人响应形成的安全度变化。",
    "answerTile": "C",
    "candidates": [
      "C",
      "1p",
      "5m",
      "1m"
    ],
    "self": {
      "label": "你",
      "wind": "S",
      "hand": [
        "1m",
        "5m",
        "7m",
        "1p",
        "1p",
        "6p",
        "8p",
        "9p",
        "2s",
        "7s",
        "C",
        "C",
        "P",
        "9s"
      ],
      "river": [
        "S",
        "5s",
        "5s",
        "N",
        "5p",
        "5p",
        "3p",
        "4m",
        "2m",
        "8s",
        "W",
        "N"
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
        "hand",
        "draw",
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
        "readyLikelihood": 0.47300000000000003,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "6s",
          "6s",
          "E",
          "S",
          "5p",
          "6s",
          "8s",
          "4m",
          "3p",
          "W",
          "C",
          "E",
          "4m"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "draw",
          "draw",
          "draw",
          "draw"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "4s",
              "4s",
              "4s"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰四条；牌墙剩35张。听牌概率为公开信息启发式粗估。"
      },
      "top": {
        "label": "对家",
        "wind": "N",
        "threat": "triplets",
        "focusSuit": "unknown",
        "readyLikelihood": 0.467,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "S",
          "3s",
          "N",
          "5s",
          "2m",
          "4p",
          "4p",
          "3s",
          "E",
          "4s",
          "C",
          "3m"
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
          "draw",
          "draw",
          "hand",
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
        "inference": "公开副露1组：碰发；牌墙剩35张。听牌概率为公开信息启发式粗估。"
      },
      "right": {
        "label": "下家",
        "wind": "W",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.361,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "S",
          "3s",
          "3s",
          "N",
          "4p",
          "3p",
          "2p",
          "4m",
          "1p",
          "5m",
          "F"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
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
      }
    },
    "explanation": "中。中的模型效用最高（-9.20），舍后4向听、受入40张、潜在分20、危险度0.000。次选一筒效用-9.54。判定依据：追求高分值路线、行为合理。 候选顺序已为题库版重新排列，正确选项为A。",
    "source": {
      "method": "完整136张事件回放＋公开信息行为模型V1.1",
      "ruleVersion": "GD-DEF-V1",
      "workbook": "广东麻将模拟对局10题_题库版.xlsx"
    },
    "candidateOverrides": {
      "C": {
        "probability": 0.1752353589323572,
        "expectedLoss": 0.37306160000000005,
        "summary": "题库综合模型首选：已计入向听、受入、潜在分与公开牌面风险"
      }
    }
  },
  {
    "id": "Q008",
    "title": "第8题｜十三幺的舍牌权衡",
    "round": "模拟对局",
    "wallRemaining": 59,
    "prompt": "模拟第8局，牌墙剩余59张，你刚摸入六筒。只根据公开牌面，A–D中应优先打哪一张？",
    "hint": "这是正常摸牌后的舍牌节点；先比较向听和受入，再检查同牌此前无人响应形成的安全度变化。",
    "answerTile": "8m",
    "candidates": [
      "E",
      "8m",
      "6p",
      "4p"
    ],
    "self": {
      "label": "你",
      "wind": "S",
      "hand": [
        "7m",
        "8m",
        "1p",
        "2p",
        "3p",
        "4p",
        "8p",
        "9p",
        "1s",
        "1s",
        "E",
        "C",
        "P",
        "6p"
      ],
      "river": [
        "4m",
        "E",
        "3s",
        "9p",
        "5m"
      ],
      "discardModes": [
        "hand",
        "draw",
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
        "readyLikelihood": 0.21100000000000005,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "9s",
          "E",
          "5m",
          "5p",
          "1m",
          "N"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "draw"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩59张。听牌概率为公开信息启发式粗估。"
      },
      "top": {
        "label": "对家",
        "wind": "N",
        "threat": "triplets",
        "focusSuit": "unknown",
        "readyLikelihood": 0.317,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "1p",
          "S",
          "9s",
          "1p",
          "3s",
          "9p",
          "8m"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "hand",
          "hand"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "W",
              "W",
              "W"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰西；牌墙剩59张。听牌概率为公开信息启发式粗估。"
      },
      "right": {
        "label": "下家",
        "wind": "W",
        "threat": "triplets",
        "focusSuit": "unknown",
        "readyLikelihood": 0.31100000000000005,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "9s",
          "S",
          "5m",
          "N",
          "9m",
          "N"
        ],
        "discardModes": [
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
              "F",
              "F",
              "F"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰发；牌墙剩59张。听牌概率为公开信息启发式粗估。"
      }
    },
    "explanation": "八万。八万的模型效用最高（-6.85），舍后3向听、受入29张、潜在分20、危险度0.282。次选东效用-7.35。判定依据：追求高分值路线、行为合理。 候选顺序已为题库版重新排列，正确选项为B。",
    "source": {
      "method": "完整136张事件回放＋公开信息行为模型V1.1",
      "ruleVersion": "GD-DEF-V1",
      "workbook": "广东麻将模拟对局10题_题库版.xlsx"
    },
    "candidateOverrides": {
      "8m": {
        "probability": 0.11735375367253342,
        "expectedLoss": 0.24430360000000007,
        "summary": "题库综合模型首选：已计入向听、受入、潜在分与公开牌面风险"
      }
    }
  },
  {
    "id": "Q009",
    "title": "第9题｜受入与风险的舍牌权衡",
    "round": "模拟对局",
    "wallRemaining": 34,
    "prompt": "模拟第9局，牌墙剩余34张，你刚碰出白，尚未舍牌。只根据公开牌面，A–D中应优先打哪一张？",
    "hint": "碰后必须从当前暗手中手切一张；先比较向听和受入，再检查同牌此前无人响应形成的安全度变化。",
    "answerTile": "1p",
    "candidates": [
      "8m",
      "5m",
      "8s",
      "1p"
    ],
    "self": {
      "label": "你",
      "wind": "S",
      "hand": [
        "4m",
        "5m",
        "8m",
        "8m",
        "8m",
        "1p",
        "2p",
        "1s",
        "2s",
        "3s",
        "8s"
      ],
      "river": [
        "7s",
        "2m",
        "7m",
        "7p",
        "E",
        "N",
        "F",
        "2m",
        "1m",
        "N",
        "1m",
        "7p",
        "5p"
      ],
      "discardModes": [
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "hand",
        "draw",
        "draw",
        "hand",
        "draw",
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
      "drawnIndex": -1
    },
    "opponents": {
      "left": {
        "label": "上家",
        "wind": "E",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.372,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "2m",
          "S",
          "W",
          "E",
          "N",
          "F",
          "C",
          "1s",
          "7p",
          "3p",
          "7s",
          "5m"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "hand",
          "draw",
          "draw",
          "hand",
          "hand",
          "hand",
          "hand"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩34张。听牌概率为公开信息启发式粗估。"
      },
      "top": {
        "label": "对家",
        "wind": "N",
        "threat": "triplets",
        "focusSuit": "m",
        "readyLikelihood": 0.47200000000000003,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "9m",
          "3p",
          "1s",
          "3p",
          "2s",
          "3m",
          "3m",
          "9m",
          "5p",
          "E",
          "F",
          "1p"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "draw",
          "draw",
          "hand"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "7m",
              "7m",
              "7m"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰七万；牌墙剩34张。听牌概率为公开信息启发式粗估。"
      },
      "right": {
        "label": "下家",
        "wind": "W",
        "threat": "unknown",
        "focusSuit": "unknown",
        "readyLikelihood": 0.372,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "7s",
          "S",
          "8p",
          "8p",
          "8p",
          "3m",
          "8p",
          "2s",
          "1s",
          "1m",
          "1m",
          "W"
        ],
        "discardModes": [
          "hand",
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
          "draw"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩34张。听牌概率为公开信息启发式粗估。"
      }
    },
    "explanation": "一筒。一筒的模型效用最高（-3.75），舍后1向听、受入11张、潜在分0、危险度0.303。次选八万效用-4.04。判定依据：行为合理。 候选顺序已为题库版重新排列，正确选项为D。",
    "source": {
      "method": "完整136张事件回放＋公开信息行为模型V1.1",
      "ruleVersion": "GD-DEF-V1",
      "workbook": "广东麻将模拟对局10题_题库版.xlsx"
    },
    "candidateOverrides": {
      "1p": {
        "probability": 0.1549689336291985,
        "expectedLoss": 0.32883984000000005,
        "summary": "题库综合模型首选：已计入向听、受入、潜在分与公开牌面风险"
      }
    }
  },
  {
    "id": "Q010",
    "title": "第10题｜十三幺的舍牌权衡",
    "round": "模拟对局",
    "wallRemaining": 36,
    "prompt": "模拟第10局，牌墙剩余36张，你刚摸入七万。只根据公开牌面，A–D中应优先打哪一张？",
    "hint": "这是正常摸牌后的舍牌节点；先比较向听和受入，再检查同牌此前无人响应形成的安全度变化。",
    "answerTile": "7m",
    "candidates": [
      "2m",
      "N",
      "7m",
      "5m"
    ],
    "self": {
      "label": "你",
      "wind": "S",
      "hand": [
        "1m",
        "2m",
        "5m",
        "9m",
        "9m",
        "1p",
        "2p",
        "6s",
        "7s",
        "8s",
        "9s",
        "E",
        "N",
        "7m"
      ],
      "river": [
        "7p",
        "7p",
        "7m",
        "3m",
        "2s",
        "C",
        "C",
        "3m",
        "C",
        "1m",
        "3m"
      ],
      "discardModes": [
        "hand",
        "hand",
        "hand",
        "hand",
        "draw",
        "hand",
        "hand",
        "hand",
        "draw",
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
        "readyLikelihood": 0.356,
        "valueWeight": 2,
        "openCount": 0,
        "river": [
          "C",
          "9p",
          "9p",
          "F",
          "P",
          "4p",
          "2s",
          "1m",
          "F",
          "3p",
          "5s"
        ],
        "discardModes": [
          "hand",
          "hand",
          "draw",
          "draw",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "hand",
          "hand"
        ],
        "melds": [],
        "passedTiles": [],
        "inference": "没有副露，只能从牌河和巡目判断进度；牌墙剩36张。听牌概率为公开信息启发式粗估。"
      },
      "top": {
        "label": "对家",
        "wind": "N",
        "threat": "triplets",
        "focusSuit": "p",
        "readyLikelihood": 0.462,
        "valueWeight": 2,
        "openCount": 3,
        "river": [
          "4m",
          "9p",
          "8m",
          "4m",
          "1p",
          "4s",
          "W",
          "4p",
          "4s",
          "N",
          "3p",
          "5s"
        ],
        "discardModes": [
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "hand",
          "draw",
          "draw",
          "draw",
          "hand",
          "draw",
          "hand"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "8p",
              "8p",
              "8p"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露1组：碰八筒；牌墙剩36张。听牌概率为公开信息启发式粗估。"
      },
      "right": {
        "label": "下家",
        "wind": "W",
        "threat": "mixedFlush",
        "focusSuit": "m",
        "readyLikelihood": 0.568,
        "valueWeight": 8,
        "openCount": 6,
        "river": [
          "8m",
          "E",
          "9p",
          "4m",
          "4m",
          "P",
          "2s",
          "8m",
          "2m",
          "6m",
          "1m",
          "4s",
          "N"
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
          "hand",
          "draw",
          "draw",
          "hand",
          "draw"
        ],
        "melds": [
          {
            "type": "碰",
            "tiles": [
              "W",
              "W",
              "W"
            ]
          },
          {
            "type": "碰",
            "tiles": [
              "6m",
              "6m",
              "6m"
            ]
          }
        ],
        "passedTiles": [],
        "inference": "公开副露2组：碰西、碰六万；牌墙剩36张。听牌概率为公开信息启发式粗估。"
      }
    },
    "explanation": "七万。七万的模型效用最高（-7.78），舍后3向听、受入28张、潜在分20、危险度0.450。次选二万效用-7.88。判定依据：追求高分值路线、行为合理。 候选顺序已为题库版重新排列，正确选项为C。",
    "source": {
      "method": "完整136张事件回放＋公开信息行为模型V1.1",
      "ruleVersion": "GD-DEF-V1",
      "workbook": "广东麻将模拟对局10题_题库版.xlsx"
    },
    "candidateOverrides": {
      "7m": {
        "probability": 0.16706100785478975,
        "expectedLoss": 0.7913362449600001,
        "summary": "题库综合模型首选：已计入向听、受入、潜在分与公开牌面风险"
      }
    }
  }
];
