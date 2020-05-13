module Main exposing (main)

import Debug exposing (toString)
import Html exposing (Html, div, text)
import List exposing (map, sortBy, sortWith)
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


pointC : Point
pointC =
    { x = 750, y = 200 }


myCircle : Point -> List (Html.Attribute msg) -> List (Svg msg) -> Html.Html msg
myCircle center attrs =
    circle ([ cx (px center.x), cy (px center.y), r (px 5) ] ++ attrs)



-- see https://www.wikiwand.com/en/Delaunay_triangulation for how to compute


points : List Point
points =
    [ pointA, pointB, pointC ]


euclidian : Point -> Point -> Float
euclidian p1 p2 =
    sqrt ((p1.x - p2.x) ^ 2 + (p1.y - p2.y) ^ 2)


main : Html a
main =
    div []
        (map
            (text << toString)
            (sortBy (euclidian pointB) points)
            ++ [ svg [ height (pc 100), width (pc 100) ]
                    [ myCircle pointB
                        []
                        []
                    , myCircle pointA
                        []
                        []
                    , myCircle pointC
                        []
                        []
                    ]
               ]
        )
