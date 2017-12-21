<h1 align="center">PT2ITP</h1>

<p align="center">
  <a href="https://coveralls.io/github/ingalls/pt2itp?branch=master"><img src="https://coveralls.io/repos/github/ingalls/pt2itp/badge.svg?branch=master"/></a>
  <a href="https://circleci.com/gh/ingalls/pt2itp/tree/master"><img src="https://circleci.com/gh/ingalls/pt2itp/tree/master.svg?style=shield"/></a>
  <a href="https://david-dm.org/ingalls/pt2itp"><img src="https://david-dm.org/ingalls/pt2itp.svg"/></a>
  <a href="https://david-dm.org/ingalls/pt2itp?type=dev"><img src="https://david-dm.org/ingalls/pt2itp/dev-status.svg"/></a>
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/ingalls/pt2itp.svg"/></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/pt2itp"><img src="https://nodei.co/npm/pt2itp.png?downloads=true&downloadRank=true"/></a>
</p>

## Brief

Given a road network and a set of address points as line delimited geojson; output an interpolation network.

## `map` Mode

### Basic Usage

`map` mode is the core mode that PT2ITP exposes. It is responsible for taking the input street network and address points
and generating the interpolation network.

Basic Usage:
```
./index.js map --in-network=<FILE.geojson> --in-address=<File.geojson> --output=<File.geojson> --tokens=./lib/tokens/en.json"
```

Full Options:
```
./index.js map --help
```

### Input Data

#### Address Input

Input line-delimited geojson features of points. Each point should have a property called `street` containing the street name
and `number` containing the street address.

#### Properties

| Property | Function |
| :------: | -------- |
| `number` | `String` The Housenumber for a given pt including any unit information. ie: `10a` |
| `street` | `String` The name of the street - preferably non-abbreviated |
| `source` | `String` The source name of the data so a single input file can have a combination of multiple sources |
| `output` | `Boolean` A boolean allowing pts to be used to calculate the ITP segement but not output in the final cluster |

##### Example

```
{ "type": "Feature", "geometry": { "type": "Point", ... }, "properties": { "street": "Main Street", "number": 10 } }
{ "type": "Feature", "geometry": { "type": "Point", ... }, "properties": { "street": "Main Street", "number": 11 } }
...
```

#### Street Network Input

Input line-delimited geojson features of lines. Each line should have a property called `street` containing the street name.

##### Example

```
{ "type": "Feature", "geometry": { "type": "LineString", ... }, "properties": { "street": "Main Street" } }
{ "type": "Feature", "geometry": { "type": "LineString", ... }, "properties": { "street": "Main Street" } }
...
```

## `convert` Mode

### Basic Usage

Converts the PT2ITP standard of line delimited geojson features into the more widely
supported GeoJSON FeatureCollections. Note that since GeoJSON is a text based format
this should not be used for huge numbers of features as most parsing software will
run out of memory.

Basic Usage:
```
./index.js convert --input linedelimited.geojson --output featurecollection.geojson
```

Full Options:
```
./index.js convert --help
```

## Version Numbers

PT2ITP follows the [Semver](http://semver.org/) spec for it's **CLI interface**.

This means that breaking changes to the CLI tools will result in a `MAJOR` release.
New features will result in a `MINOR` release and bug fixes a `PATCH`.

Internal functions may change in breaking ways with a `MINOR` release so long as they
don't change/break the CLI interface.
