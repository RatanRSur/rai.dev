module Main exposing (main)

import Html exposing (Html)
import TypedSvg exposing (circle, svg)
import TypedSvg.Attributes exposing (cx, cy, height, r, width)
import TypedSvg.Core exposing (Svg)
import TypedSvg.Types exposing (Length(..), pc, px)


type alias Point =
    { x : Float
    , y : Float
    }


pointA : Point
pointA =
    { x = 20, y = 20 }


pointB : Point
pointB =
    { x = 450, y = 450 }


midPoint : Point -> Point -> Point
midPoint a b =
    { x = (a.x + b.x) / 2, y = (a.y + b.y) / 2 }


myCircle : Point -> List (Html.Attribute msg) -> List (Svg msg) -> Html.Html msg
myCircle center attrs =
    circle ([ cx (px center.x), cy (px center.y), r (px 5) ] ++ attrs)


main : Html a
main =
    svg [ height (pc 100), width (pc 100) ]
        [ myCircle pointB
            []
            []
        , myCircle pointA
            []
            []
        , myCircle (midPoint pointA pointB)
            []
            []
        ]
