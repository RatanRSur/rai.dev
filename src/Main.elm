module Main exposing (main)

import Html exposing (Html)
import Svg exposing (svg, rect, circle)
import Svg.Attributes exposing (width, height, viewBox, x, y, rx, ry, cx, cy, r)

main : Html a
main =
  svg
    [ width "120"
    , height "120"
    , viewBox "0 0 120 120"
    ]
    [ rect
        [ x "10"
        , y "10"
        , width "100"
        , height "100"
        , rx "15"
        , ry "15"
        ]
        []
    , circle
        [ cx "50"
        , cy "50"
        , r "50"
        ]
        []
    ]
