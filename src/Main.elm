module Main exposing (Model, Msg, init, update, view)

import Browser
import Color exposing (black)
import Html exposing (Html, div)
import List exposing (append, foldl, head, sortBy)
import Maybe exposing (andThen)
import Maybe.Extra exposing (toList)
import Random
import TypedSvg exposing (circle, polygon, svg)
import TypedSvg.Attributes exposing (cx, cy, height, noFill, points, r, stroke, width)
import TypedSvg.Core exposing (Svg)
import TypedSvg.Types exposing (Length(..), Paint(..), pc, px)



-- see http://www.s-hull.org/paper/s_hull.pdf
--main : Program () ( Model, Cmd Msg ) Msg


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    { points : List Point }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model [], Random.generate RandomPoints (Random.list 20 randomPoint) )


type Msg
    = RandomPoints (List Point)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( case msg of
        RandomPoints points ->
            { model | points = points }
    , Cmd.none
    )


view : Model -> Html Msg
view model =
    div
        []
        [ svg [ height (pc 100), width (pc 100) ]
            (smallestCircumcircleAndRemainingPoints model.points
                |> Maybe.map (\( circle, _ ) -> drawPolygon circle.circumscribedPoints)
                |> toList
                |> append (List.map drawDot testPoints)
            )
        ]


sortByDistanceToInitialCircumcircle : Point -> List Point -> List Point
sortByDistanceToInitialCircumcircle circumcircleCenter =
    List.sortBy (euclidian circumcircleCenter)


nonOverlappingTriangulation : Triangulation -> List Point -> Triangulation
nonOverlappingTriangulation initialCircumcircleTriangulation otherPoints =
    foldl addPointToConvexHull initialCircumcircleTriangulation otherPoints


addPointToConvexHull : Point -> Triangulation -> Triangulation
addPointToConvexHull point triangulation =
    Debug.todo ""


smallestCircumcircleAndRemainingPoints : List Point -> Maybe ( Circumcircle, List Point )
smallestCircumcircleAndRemainingPoints points =
    head points
        |> andThen
            (\seedPoint ->
                case sortBy (euclidian seedPoint) points of
                    --we want to make sure we have at least 3 points in the list
                    alsoSeedPoint :: pointClosestToSeed :: initialThirdPoint :: rest ->
                        Just
                            (smallestCircumcircleAndRemainingPointsGivenAtLeast3Points
                                alsoSeedPoint
                                pointClosestToSeed
                                initialThirdPoint
                                rest
                            )

                    _ ->
                        Nothing
            )


smallestCircumcircleAndRemainingPointsGivenAtLeast3Points : Point -> Point -> Point -> List Point -> ( Circumcircle, List Point )
smallestCircumcircleAndRemainingPointsGivenAtLeast3Points seedPoint pointClosestToSeed anyThirdPoint rest =
    -- find, from among all the points, the smallest circumcircle that includes the seed point and the point closest to the seed point
    let
        fullyDetermineCircle =
            circumcircle seedPoint pointClosestToSeed

        evaluateCandidatePoint candidatePoint ( bestPoint, bestCircle, eliminatedPoints ) =
            let
                candidateCircle =
                    fullyDetermineCircle candidatePoint
            in
            if candidateCircle.radius < bestCircle.radius then
                ( candidatePoint, candidateCircle, bestPoint :: eliminatedPoints )

            else
                ( bestPoint, bestCircle, candidatePoint :: eliminatedPoints )

        ( _, finalCircle, otherPoints ) =
            foldl
                evaluateCandidatePoint
                ( anyThirdPoint, fullyDetermineCircle anyThirdPoint, [] )
                rest
    in
    ( finalCircle, otherPoints )


circumcircle : Point -> Point -> Point -> Circumcircle
circumcircle a b c =
    let
        d =
            1 / (2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)))

        center =
            { x = d * ((a.x ^ 2 + a.y ^ 2) * (b.y - c.y) + (b.x ^ 2 + b.y ^ 2) * (c.y - a.y) + (c.x ^ 2 + c.y ^ 2) * (a.y - b.y))
            , y = d * ((a.x ^ 2 + a.y ^ 2) * (c.x - b.x) + (b.x ^ 2 + b.y ^ 2) * (a.x - c.x) + (c.x ^ 2 + c.y ^ 2) * (b.x - a.x))
            }
    in
    { center = center
    , radius = euclidian a center
    , circumscribedPoints = [ a, b, c ]
    }


euclidian : Point -> Point -> Float
euclidian p1 p2 =
    sqrt ((p1.x - p2.x) ^ 2 + (p1.y - p2.y) ^ 2)


testPoints : List Point
testPoints =
    [ { x = 500, y = 220 }
    , { x = 450, y = 450 }
    , { x = 200, y = 500 }
    , { x = 700, y = 200 }
    , { x = 300, y = 200 }
    , { x = 500, y = 200 }
    , { x = 20, y = 20 }
    , { x = 30, y = 150 }
    , { x = 700, y = 700 }
    ]


randomCoordinate : Random.Generator Float
randomCoordinate =
    Random.float 0 500


randomPoint : Random.Generator Point
randomPoint =
    Random.map2 Point randomCoordinate randomCoordinate


drawPolygon : List Point -> Svg msg
drawPolygon verticies =
    polygon
        [ noFill, stroke (Paint black), points (List.map toFloats verticies) ]
        []


toFloats : Point -> ( Float, Float )
toFloats point =
    ( point.x, point.y )


drawDot : Point -> Svg msg
drawDot center =
    circle [ cx (px center.x), cy (px center.y), r (px 5) ] []


type alias Triangulation =
    { edges : List Line
    , convexHull : List Point
    }


type alias Line =
    { a : Point
    , b : Point
    }


type alias Point =
    { x : Float
    , y : Float
    }


type alias Circumcircle =
    { center : Point
    , radius : Float
    , circumscribedPoints : List Point
    }
