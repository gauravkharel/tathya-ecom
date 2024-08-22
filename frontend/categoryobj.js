//example of data transformation 

const flatarray = [
    {
        "id": 1,
        "name": "Women",
        "description": null,
        "parentId": null,
        "parent": null
    },
    {
        "id": 2,
        "name": "Men",
        "description": null,
        "parentId": null,
        "parent": null
    },
    {
        "id": 3,
        "name": "Kids",
        "description": null,
        "parentId": null,
        "parent": null
    },
    {
        "id": 101,
        "name": "Dresses",
        "description": null,
        "parentId": 1,
        "parent": {
            "id": 1,
            "name": "Women",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 102,
        "name": "Tops",
        "description": null,
        "parentId": 1,
        "parent": {
            "id": 1,
            "name": "Women",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 103,
        "name": "Bottoms",
        "description": null,
        "parentId": 1,
        "parent": {
            "id": 1,
            "name": "Women",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 104,
        "name": "Outerwear",
        "description": null,
        "parentId": 1,
        "parent": {
            "id": 1,
            "name": "Women",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 105,
        "name": "Swimwear",
        "description": null,
        "parentId": 1,
        "parent": {
            "id": 1,
            "name": "Women",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 201,
        "name": "Shirts",
        "description": null,
        "parentId": 2,
        "parent": {
            "id": 2,
            "name": "Men",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 202,
        "name": "Pants",
        "description": null,
        "parentId": 2,
        "parent": {
            "id": 2,
            "name": "Men",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 203,
        "name": "Suits",
        "description": null,
        "parentId": 2,
        "parent": {
            "id": 2,
            "name": "Men",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 204,
        "name": "Outerwear",
        "description": null,
        "parentId": 2,
        "parent": {
            "id": 2,
            "name": "Men",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 205,
        "name": "Swimwear",
        "description": null,
        "parentId": 2,
        "parent": {
            "id": 2,
            "name": "Men",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 301,
        "name": "Girls",
        "description": null,
        "parentId": 3,
        "parent": {
            "id": 3,
            "name": "Kids",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 302,
        "name": "Boys",
        "description": null,
        "parentId": 3,
        "parent": {
            "id": 3,
            "name": "Kids",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 303,
        "name": "Babies",
        "description": null,
        "parentId": 3,
        "parent": {
            "id": 3,
            "name": "Kids",
            "description": null,
            "parentId": null
        }
    },
    {
        "id": 1001,
        "name": "Casuals",
        "description": null,
        "parentId": 101,
        "parent": {
            "id": 101,
            "name": "Dresses",
            "description": null,
            "parentId": 1
        }
    },
    {
        "id": 1002,
        "name": "Formals",
        "description": null,
        "parentId": 101,
        "parent": {
            "id": 101,
            "name": "Dresses",
            "description": null,
            "parentId": 1
        }
    },
    {
        "id": 1003,
        "name": "Maxi",
        "description": null,
        "parentId": 101,
        "parent": {
            "id": 101,
            "name": "Dresses",
            "description": null,
            "parentId": 1
        }
    },
    {
        "id": 2001,
        "name": "T-Shirts",
        "description": null,
        "parentId": 201,
        "parent": {
            "id": 201,
            "name": "Shirts",
            "description": null,
            "parentId": 2
        }
    },
    {
        "id": 2002,
        "name": "Dress Shirts",
        "description": null,
        "parentId": 201,
        "parent": {
            "id": 201,
            "name": "Shirts",
            "description": null,
            "parentId": 2
        }
    },
    {
        "id": 2003,
        "name": "Polo Shirts",
        "description": null,
        "parentId": 201,
        "parent": {
            "id": 201,
            "name": "Shirts",
            "description": null,
            "parentId": 2
        }
    },
    {
        "id": 3001,
        "name": "Girls' Dresses",
        "description": null,
        "parentId": 301,
        "parent": {
            "id": 301,
            "name": "Girls",
            "description": null,
            "parentId": 3
        }
    },
    {
        "id": 3002,
        "name": "Girls' Tops",
        "description": null,
        "parentId": 301,
        "parent": {
            "id": 301,
            "name": "Girls",
            "description": null,
            "parentId": 3
        }
    },
    {
        "id": 3003,
        "name": "Girls' Bottoms",
        "description": null,
        "parentId": 301,
        "parent": {
            "id": 301,
            "name": "Girls",
            "description": null,
            "parentId": 3
        }
    }
]


const nestedArray = [{
    "id": 1,
    "name": "Women",
    "description": null,
    "parentId": null,
    "parent": null,
    "children": [
      {
        "id": 101,
        "name": "Dresses",
        "description": null,
        "parentId": 1,
        "parent": {
          "id": 1,
          "name": "Women",
          "description": null,
          "parentId": null
        },
        "children": [
          {
            "id": 1001,
            "name": "Casuals",
            "description": null,
            "parentId": 101,
            "parent": {
              "id": 101,
              "name": "Dresses",
              "description": null,
              "parentId": 1
            },
            "children": []
          },
          {
            "id": 1002,
            "name": "Formals",
            "description": null,
            "parentId": 101,
            "parent": {
              "id": 101,
              "name": "Dresses",
              "description": null,
              "parentId": 1
            },
            "children": []
          },
          {
            "id": 1003,
            "name": "Maxi",
            "description": null,
            "parentId": 101,
            "parent": {
              "id": 101,
              "name": "Dresses",
              "description": null,
              "parentId": 1
            },
            "children": []
          }
        ]
      },
      {
        "id": 102,
        "name": "Tops",
        "description": null,
        "parentId": 1,
        "parent": {
          "id": 1,
          "name": "Women",
          "description": null,
          "parentId": null
        },
        "children": []
      },
      {
        "id": 103,
        "name": "Bottoms",
        "description": null,
        "parentId": 1,
        "parent": {
          "id": 1,
          "name": "Women",
          "description": null,
          "parentId": null
        },
        "children": []
      },
      {
        "id": 104,
        "name": "Outerwear",
        "description": null,
        "parentId": 1,
        "parent": {
          "id": 1,
          "name": "Women",
          "description": null,
          "parentId": null
        },
        "children": []
      },
      {
        "id": 105,
        "name": "Swimwear",
        "description": null,
        "parentId": 1,
        "parent": {
          "id": 1,
          "name": "Women",
          "description": null,
          "parentId": null
        },
        "children": []
      }
    ]
  }, {
    "id": 2,
    "name": "Men",
    "description": null,
    "parentId": null,
    "parent": null,
    "children": [
      {
        "id": 201,
        "name": "Shirts",
        "description": null,
        "parentId": 2,
        "parent": {
          "id": 2,
          "name": "Men",
          "description": null,
          "parentId": null
        },
        "children": [
          {
            "id": 2001,
            "name": "T-Shirts",
            "description": null,
            "parentId": 201,
            "parent": {
              "id": 201,
              "name": "Shirts",
              "description": null,
              "parentId": 2
            },
            "children": []
          },
          {
            "id": 2002,
            "name": "Dress Shirts",
            "description": null,
            "parentId": 201,
            "parent": {
              "id": 201,
              "name": "Shirts",
              "description": null,
              "parentId": 2
            },
            "children": []
          },
          {
            "id": 2003,
            "name": "Polo Shirts",
            "description": null,
            "parentId": 201,
            "parent": {
              "id": 201,
              "name": "Shirts",
              "description": null,
              "parentId": 2
            },
            "children": []
          }
        ]
      },
      {
        "id": 202,
        "name": "Pants",
        "description": null,
        "parentId": 2,
        "parent": {
          "id": 2,
          "name": "Men",
          "description": null,
          "parentId": null
        },
        "children": []
      },
      {
        "id": 203,
        "name": "Suits",
        "description": null,
        "parentId": 2,
        "parent": {
          "id": 2,
          "name": "Men",
          "description": null,
          "parentId": null
        },
        "children": []
      },
      {
        "id": 204,
        "name": "Outerwear",
        "description": null,
        "parentId": 2,
        "parent": {
          "id": 2,
          "name": "Men",
          "description": null,
          "parentId": null
        },
        "children": []
      },
      {
        "id": 205,
        "name": "Swimwear",
        "description": null,
        "parentId": 2,
        "parent": {
          "id": 2,
          "name": "Men",
          "description": null,
          "parentId": null
        },
        "children": []
      }
    ]
  }, {
    "id": 3,
    "name": "Kids",
    "description": null,
    "parentId": null,
    "parent": null,
    "children": [
      {
        "id": 301,
        "name": "Girls",
        "description": null,
        "parentId": 3,
        "parent": {
          "id": 3,
          "name": "Kids",
          "description": null,
          "parentId": null
        },
        "children": [
          {
            "id": 3001,
            "name": "Girls' Dresses",
            "description": null,
            "parentId": 301,
            "parent": {
              "id": 301,
              "name": "Girls",
              "description": null,
              "parentId": 3
            },
            "children": []
          },
          {
            "id": 3002,
            "name": "Girls' Tops",
            "description": null,
            "parentId": 301,
            "parent": {
              "id": 301,
              "name": "Girls",
              "description": null,
              "parentId": 3
            },
            "children": []
          },
          {
            "id": 3003,
            "name": "Girls' Bottoms",
            "description": null,
            "parentId": 301,
            "parent": {
              "id": 301,
              "name": "Girls",
              "description": null,
              "parentId": 3
            },
            "children": []
          }
        ]
      },
      {
        "id": 302,
        "name": "Boys",
        "description": null,
        "parentId": 3,
        "parent": {
          "id": 3,
          "name": "Kids",
          "description": null,
          "parentId": null
        },
        "children": []
      },
      {
        "id": 303,
        "name": "Babies",
        "description": null,
        "parentId": 3,
        "parent": {
          "id": 3,
          "name": "Kids",
          "description": null,
          "parentId": null
        },
        "children": []
      }
    ]
  }] 
  