# Stacked Vertical Bar Chart

<iframe width="100%" height="550" frameborder="0" src="https://embed.plnkr.co/THIN2SfIIjSXB1ICJUnu?show=preview"></iframe>

# Inputs
* view
* results
* scheme
* customColors
* legend
* xAxis
* yAxis
* showXAxisLabel
* showYAxisLabel
* xAxisLabel
* yAxisLabel
* gradient

# Outputs
* clickHandler

# Data Format
The data format is multi series:

```
[
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  }
]
```
